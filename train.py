import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset, random_split
from torchvision import transforms, models
import os
from PIL import Image
from tqdm import tqdm
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score
import numpy as np

# ==========================================
# Configuration
# ==========================================
# Automatically detect dataset location
DATA_DIR = "Model Creation/Model Creation/dataset/real_and_fake_face"
if not os.path.exists(DATA_DIR):
    DATA_DIR = "dataset" # Fallback to root dataset

MODEL_SAVE_PATH = "model.pth"
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 1e-4
IMG_SIZE = 224

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class DeepfakeDataset(Dataset):
    """
    Custom Dataset to load images from 'real' and 'fake' folders.
    Labels: real = 0, fake = 1
    """
    def __init__(self, root_dir, transform=None):
        self.root_dir = root_dir
        self.transform = transform
        self.classes = ['real', 'fake']
        self.data = []
        
        if not os.path.exists(root_dir):
            raise FileNotFoundError(f"Dataset directory '{root_dir}' not found. Please ensure it exists.")

        # Handle different naming conventions: ['real', 'fake'] or ['training_real', 'training_fake']
        possible_real = ['real', 'training_real', 'REAL', 'Training_Real']
        possible_fake = ['fake', 'training_fake', 'FAKE', 'Training_Fake']
        
        found_real = None
        found_fake = None
        
        for r in possible_real:
            if os.path.exists(os.path.join(root_dir, r)):
                found_real = r
                break
        
        for f in possible_fake:
            if os.path.exists(os.path.join(root_dir, f)):
                found_fake = f
                break
        
        if not found_real or not found_fake:
            raise RuntimeError(f"Could not find both real and fake subfolders in {root_dir}. "
                               f"Found: real={found_real}, fake={found_fake}")

        # Load real images
        real_dir = os.path.join(root_dir, found_real)
        for img_name in os.listdir(real_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.data.append((os.path.join(real_dir, img_name), 0))
        
        # Load fake images
        fake_dir = os.path.join(root_dir, found_fake)
        for img_name in os.listdir(fake_dir):
            if img_name.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                self.data.append((os.path.join(fake_dir, img_name), 1))
        
        if len(self.data) == 0:
            raise RuntimeError(f"No valid images found in {root_dir}. Expected subfolders: 'real/' and 'fake/'.")
        
        real_count = sum(1 for _, label in self.data if label == 0)
        fake_count = sum(1 for _, label in self.data if label == 1)
        print(f"Dataset loaded: {len(self.data)} images ({real_count} real, {fake_count} fake)")

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img_path, label = self.data[idx]
        try:
            image = Image.open(img_path).convert('RGB')
            if self.transform:
                image = self.transform(image)
            return image, torch.tensor(label, dtype=torch.long)
        except Exception as e:
            print(f"Error loading {img_path}: {e}")
            # Return a blank tensor to prevent crash
            return torch.zeros((3, IMG_SIZE, IMG_SIZE)), torch.tensor(label, dtype=torch.long)

def get_vit_model(num_classes=2):
    """
    Initialize Vision Transformer (ViT-B/16) with Pretrained Weights
    """
    try:
        # Modern torchvision API (v0.13+)
        from torchvision.models import vit_b_16, ViT_B_16_Weights
        model = vit_b_16(weights=ViT_B_16_Weights.IMAGENET1K_V1)
    except (ImportError, AttributeError):
        # Legacy torchvision API
        model = models.vit_b_16(pretrained=True)
    
    # Replace classification head
    in_features = model.heads.head.in_features
    model.heads.head = nn.Linear(in_features, num_classes)
    
    return model.to(device)

def train_pipeline():
    """
    Complete training and evaluation pipeline
    """
    print(f"Starting training pipeline on {device}...")

    # 1. Transforms (Augmentation for training, simple resize for validation)
    train_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.1, contrast=0.1),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    val_transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    # 2. Data Preparation
    try:
        full_dataset = DeepfakeDataset(DATA_DIR, transform=train_transform)
    except Exception as e:
        print(f"❌ Error: {e}")
        return

    train_size = int(0.8 * len(full_dataset))
    val_size = len(full_dataset) - train_size
    train_dataset, val_dataset = random_split(full_dataset, [train_size, val_size])
    
    # Apply validation transforms specifically to val_dataset
    val_dataset.dataset.transform = val_transform

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=2 if os.name == 'posix' else 0)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=2 if os.name == 'posix' else 0)
    
    # 3. Model Setup
    model = get_vit_model()
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=LEARNING_RATE)
    
    # 4. Training Loop
    best_acc = 0.0
    
    for epoch in range(EPOCHS):
        model.train()
        train_loss = 0.0
        train_correct = 0
        train_total = 0
        
        pbar = tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}")
        for images, labels in pbar:
            images, labels = images.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            train_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            train_total += labels.size(0)
            train_correct += (predicted == labels).sum().item()
            
            pbar.set_postfix({'loss': f"{train_loss/len(train_loader):.4f}", 'acc': f"{100*train_correct/train_total:.2f}%"})
            
        # Validation Phase
        model.eval()
        val_correct = 0
        val_total = 0
        y_true, y_pred = [], []
        
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                _, predicted = torch.max(outputs.data, 1)
                
                val_total += labels.size(0)
                val_correct += (predicted == labels).sum().item()
                y_true.extend(labels.cpu().numpy())
                y_pred.extend(predicted.cpu().numpy())
        
        val_acc = 100 * val_correct / val_total
        print(f"Validation Accuracy: {val_acc:.2f}%")
        
        # Save Best Model
        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f"Best model saved to {MODEL_SAVE_PATH}")

    # 5. Final Evaluation Metrics
    print("\n" + "="*30)
    print("📈 FINAL EVALUATION")
    print("="*30)
    print(f"Confusion Matrix:\n{confusion_matrix(y_true, y_pred)}")
    print(f"\nClassification Report:\n{classification_report(y_true, y_pred, target_names=['Real', 'Fake'])}")
    print("="*30)

def predict_image(image_path):
    """
    Predict if an image is Real or Fake.
    Returns: String "Real" or "Fake"
    """
    model = get_vit_model()
    if os.path.exists(MODEL_SAVE_PATH):
        model.load_state_dict(torch.load(MODEL_SAVE_PATH, map_location=device))
    else:
        print(f"Warning: {MODEL_SAVE_PATH} not found. Using untrained weights.")
    
    model.eval()
    
    transform = transforms.Compose([
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    
    try:
        image = Image.open(image_path).convert('RGB')
        image = transform(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            output = model(image)
            _, predicted = torch.max(output.data, 1)
            
        return "Fake" if predicted.item() == 1 else "Real"
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    # Ensure dataset exists before starting
    if not os.path.exists(DATA_DIR):
        print(f"❌ Error: '{DATA_DIR}' folder not found in current directory.")
        print("Please place your 'real' and 'fake' folders inside a 'dataset' directory.")
    else:
        train_pipeline()
        
        # Example prediction (if a file exists)
        # print(f"Prediction for test.jpg: {predict_image('test.jpg')}")
