"""
Fast Vision Transformer deepfake detector training using local images.
Optimized for quick convergence on CPU.
"""

import argparse
from pathlib import Path
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim.lr_scheduler import CosineAnnealingLR
import numpy as np
import cv2
from glob import glob
import random
from vit_model import ViTDeepfakeDetector


def load_images_fast(root_dir: Path, max_samples=None):
    """Load and preprocess all images quickly"""
    fake_dir = root_dir / "training_fake"
    real_dir = root_dir / "training_real"
    
    data = []
    
    # Load fake images
    fake_files = sorted(glob(str(fake_dir / "*.jpg")))
    if max_samples:
        fake_files = fake_files[:max_samples]
    
    print(f"Loading {len(fake_files)} fake images...")
    for i, path in enumerate(fake_files):
        if i % 100 == 0:
            print(f"  {i}/{len(fake_files)}")
        try:
            img = cv2.imread(path)
            if img is not None:
                img = cv2.resize(img, (224, 224))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = img.astype(np.float32) / 255.0
                data.append((img, 1))  # 1 = fake
        except:
            pass
    
    # Load real images
    real_files = sorted(glob(str(real_dir / "*.jpg")))
    if max_samples:
        real_files = real_files[:max_samples]
    
    print(f"Loading {len(real_files)} real images...")
    for i, path in enumerate(real_files):
        if i % 100 == 0:
            print(f"  {i}/{len(real_files)}")
        try:
            img = cv2.imread(path)
            if img is not None:
                img = cv2.resize(img, (224, 224))
                img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img = img.astype(np.float32) / 255.0
                data.append((img, 0))  # 0 = real
        except:
            pass
    
    random.shuffle(data)
    print(f"Loaded {len(data)} total images")
    return data


def normalize_image(img):
    """Normalize image with ImageNet stats"""
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    return (img - mean) / std


def create_sequence(img, seq_len=5):
    """Create sequence by repeating image (simulates video frames)"""
    img_tensor = torch.from_numpy(normalize_image(img).transpose(2, 0, 1)).float()
    return img_tensor.unsqueeze(0).repeat(seq_len, 1, 1, 1)


def train_epoch(model, data, optimizer, device):
    model.train()
    total_loss = 0.0
    correct = 0
    total = 0
    criterion = nn.CrossEntropyLoss()
    
    for i, (img, label) in enumerate(data):
        sequence = create_sequence(img, seq_len=3).to(device)
        label_t = torch.tensor(label, device=device).long()
        
        optimizer.zero_grad()
        logits = model(sequence.unsqueeze(0))
        loss = criterion(logits, label_t.unsqueeze(0))
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        
        total_loss += loss.item()
        preds = logits.argmax(dim=1)
        correct += (preds == label_t.unsqueeze(0)).sum().item()
        total += 1
        
        if (i + 1) % 200 == 0:
            print(f"  Batch {i+1}/{len(data)} | Loss: {loss.item():.4f} | Acc: {correct/total:.4f}")
    
    return total_loss / len(data), correct / total


def eval_epoch(model, data, device):
    model.eval()
    correct = 0
    total = 0
    criterion = nn.CrossEntropyLoss()
    total_loss = 0.0
    
    with torch.no_grad():
        for img, label in data:
            sequence = create_sequence(img, seq_len=3).to(device)
            label_t = torch.tensor(label, device=device).long()
            
            logits = model(sequence.unsqueeze(0))
            loss = criterion(logits, label_t.unsqueeze(0))
            total_loss += loss.item()
            
            preds = logits.argmax(dim=1)
            correct += (preds == label_t.unsqueeze(0)).sum().item()
            total += 1
    
    return total_loss / len(data), correct / total


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data-dir", type=Path, default=Path(__file__).resolve().parents[1] / "Model Creation" / "Model Creation" / "datasets" / "real_and_fake_face")
    parser.add_argument("--epochs", type=int, default=3)
    parser.add_argument("--save-path", type=Path, default=Path(__file__).resolve().parent / "model.pth")
    args = parser.parse_args()
    
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")
    
    # Load data
    if not args.data_dir.exists():
        print(f"❌ ERROR: Dataset directory not found at {args.data_dir}")
        print("Please check your local filesystem.")
        return

    data = load_images_fast(args.data_dir)
    split = int(len(data) * 0.9)
    train_data = data[:split]
    val_data = data[split:]
    
    print(f"Train: {len(train_data)}, Val: {len(val_data)}")
    
    # Model
    model = ViTDeepfakeDetector(
        img_size=224, patch_size=16, embed_dim=192, depth=3, num_heads=3, dropout=0.1
    ).to(device)
    
    optimizer = optim.AdamW(model.parameters(), lr=1e-2, weight_decay=1e-4)
    
    best_val_acc = 0.0
    for epoch in range(args.epochs):
        print(f"\nEpoch {epoch+1}/{args.epochs}")
        train_loss, train_acc = train_epoch(model, train_data, optimizer, device)
        val_loss, val_acc = eval_epoch(model, val_data, device)
        
        print(f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f}")
        print(f"Val Loss: {val_loss:.4f} | Val Acc: {val_acc:.4f}")
        
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            args.save_path.parent.mkdir(parents=True, exist_ok=True)
            torch.save({'model_state_dict': model.state_dict()}, args.save_path)
            print(f"✓ Saved best model ({best_val_acc:.4f}) to {args.save_path}")
    
    print(f"\n✓ Training complete. Best val acc: {best_val_acc:.4f}")


if __name__ == "__main__":
    main()
