"""
Train the Vision Transformer deepfake detector using local real/fake face images.

Expected dataset structure:
  Model Creation/Model Creation/datasets/real_and_fake_face/
    training_fake/
    training_real/

The script saves the trained weights to backend/model.pth.
"""

import argparse
from pathlib import Path
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, random_split, DataLoader
from torchvision import datasets, transforms
from vit_model import ViTDeepfakeDetector


class VideoLikeImageDataset(Dataset):
    def __init__(self, root_dir: Path, transform=None, sequence_length: int = 5):
        self.root_dir = root_dir
        self.sequence_length = sequence_length
        self.transform = transform
        self.dataset = datasets.ImageFolder(str(root_dir), transform=self.transform)
        self.class_label_map = {}
        for class_name, original_label in self.dataset.class_to_idx.items():
            normalized = class_name.lower()
            if "fake" in normalized:
                self.class_label_map[original_label] = 1
            elif "real" in normalized:
                self.class_label_map[original_label] = 0
            else:
                self.class_label_map[original_label] = original_label

    def __len__(self):
        return len(self.dataset)

    def __getitem__(self, idx):
        image, label = self.dataset[idx]
        label = self.class_label_map.get(label, label)
        sequence = image.unsqueeze(0).repeat(self.sequence_length, 1, 1, 1)
        return sequence, label


def parse_args():
    parser = argparse.ArgumentParser(description="Train ViT deepfake detector")
    parser.add_argument(
        "--data-dir",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "Model Creation" / "Model Creation" / "datasets" / "real_and_fake_face",
        help="Path to real_and_fake_face dataset root",
    )
    parser.add_argument("--epochs", type=int, default=8, help="Number of training epochs")
    parser.add_argument("--batch-size", type=int, default=16, help="Training batch size")
    parser.add_argument("--lr", type=float, default=2e-4, help="Learning rate")
    parser.add_argument("--sequence-length", type=int, default=5, help="Sequence length for repeated image frames")
    parser.add_argument("--save-path", type=Path, default=Path(__file__).resolve().parent / "model.pth", help="Output model path")
    return parser.parse_args()


def build_datasets(args):
    if not args.data_dir.exists():
        error_msg = f"❌ Dataset folder not found: {args.data_dir}\n"
        error_msg += "Please ensure your dataset is placed in 'Model Creation/Model Creation/datasets/real_and_fake_face/'"
        raise FileNotFoundError(error_msg)

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(p=0.5),
        transforms.ColorJitter(brightness=0.15, contrast=0.15, saturation=0.15, hue=0.05),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    full_dataset = VideoLikeImageDataset(args.data_dir, transform=transform, sequence_length=args.sequence_length)
    val_count = max(1, int(len(full_dataset) * 0.1))
    train_count = len(full_dataset) - val_count
    train_dataset, val_dataset = random_split(full_dataset, [train_count, val_count], generator=torch.Generator().manual_seed(42))

    return train_dataset, val_dataset


def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    for sequences, labels in loader:
        sequences = sequences.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()
        logits = model(sequences)
        loss = criterion(logits, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item() * sequences.size(0)
        predictions = logits.argmax(dim=1)
        total_correct += (predictions == labels).sum().item()
        total_samples += sequences.size(0)

    return total_loss / total_samples, total_correct / total_samples


def evaluate(model, loader, criterion, device):
    model.eval()
    total_loss = 0.0
    total_correct = 0
    total_samples = 0

    with torch.no_grad():
        for sequences, labels in loader:
            sequences = sequences.to(device)
            labels = labels.to(device)
            logits = model(sequences)
            loss = criterion(logits, labels)
            total_loss += loss.item() * sequences.size(0)
            predictions = logits.argmax(dim=1)
            total_correct += (predictions == labels).sum().item()
            total_samples += sequences.size(0)

    return total_loss / total_samples, total_correct / total_samples


def main():
    args = parse_args()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    print(f"Training dataset root: {args.data_dir}")
    print(f"Saving model to: {args.save_path}")
    print(f"Using device: {device}")

    train_dataset, val_dataset = build_datasets(args)
    print(f"Train samples: {len(train_dataset)}, Validation samples: {len(val_dataset)}")

    train_loader = DataLoader(train_dataset, batch_size=args.batch_size, shuffle=True, num_workers=2, pin_memory=(device.type == 'cuda'))
    val_loader = DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False, num_workers=2, pin_memory=(device.type == 'cuda'))

    model = ViTDeepfakeDetector(
        img_size=224,
        patch_size=16,
        embed_dim=192,
        depth=3,
        num_heads=3,
        dropout=0.1,
    ).to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = optim.AdamW(model.parameters(), lr=args.lr)

    best_val_acc = 0.0
    for epoch in range(1, args.epochs + 1):
        train_loss, train_acc = train_one_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc = evaluate(model, val_loader, criterion, device)

        print(f"Epoch {epoch}/{args.epochs} | train_loss={train_loss:.4f} train_acc={train_acc:.4f} | val_loss={val_loss:.4f} val_acc={val_acc:.4f}")

        if val_acc > best_val_acc:
            best_val_acc = val_acc
            args.save_path.parent.mkdir(parents=True, exist_ok=True)
            torch.save({'model_state_dict': model.state_dict()}, args.save_path)
            print(f"  ✓ Saved best model ({best_val_acc:.4f}) to {args.save_path}")

    print("Training complete.")
    print(f"Best validation accuracy: {best_val_acc:.4f}")


if __name__ == "__main__":
    main()
