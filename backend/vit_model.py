"""
Vision Transformer (ViT) + Temporal Attention for Deepfake Detection
Unique Multi-Modal Architecture with:
1. Vision Transformer for spatial features
2. Temporal Attention for frame relationships
3. Frequency Analysis for deepfake artifacts
4. Attention Visualization for explainability
"""

import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
import numpy as np
from typing import Tuple, List, Dict
import cv2
from scipy import fftpack

class PatchEmbedding(nn.Module):
    """Split image into patches and embed them"""
    def __init__(self, img_size=224, patch_size=16, in_channels=3, embed_dim=768):
        super().__init__()
        self.img_size = img_size
        self.patch_size = patch_size
        self.n_patches = (img_size // patch_size) ** 2
        
        self.proj = nn.Conv2d(
            in_channels,
            embed_dim,
            kernel_size=patch_size,
            stride=patch_size
        )
        
    def forward(self, x):
        # x: (B, C, H, W)
        x = self.proj(x)  # (B, embed_dim, n_patches**0.5, n_patches**0.5)
        x = x.flatten(2)  # (B, embed_dim, n_patches)
        x = x.transpose(1, 2)  # (B, n_patches, embed_dim)
        return x

class MultiHeadAttention(nn.Module):
    """Multi-head self-attention mechanism"""
    def __init__(self, embed_dim=768, num_heads=12, dropout=0.1):
        super().__init__()
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.head_dim = embed_dim // num_heads
        
        assert self.head_dim * num_heads == embed_dim, "embed_dim must be divisible by num_heads"
        
        self.qkv = nn.Linear(embed_dim, embed_dim * 3)
        self.proj = nn.Linear(embed_dim, embed_dim)
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x):
        B, N, C = x.shape
        
        # Generate Q, K, V
        qkv = self.qkv(x).reshape(B, N, 3, self.num_heads, self.head_dim)
        qkv = qkv.permute(2, 0, 3, 1, 4)  # (3, B, num_heads, N, head_dim)
        q, k, v = qkv[0], qkv[1], qkv[2]
        
        # Attention
        attn = (q @ k.transpose(-2, -1)) * (self.head_dim ** -0.5)
        attn = F.softmax(attn, dim=-1)
        attn = self.dropout(attn)
        
        # Combine heads
        x = (attn @ v).transpose(1, 2).reshape(B, N, C)
        x = self.proj(x)
        x = self.dropout(x)
        
        return x, attn

class TransformerBlock(nn.Module):
    """Transformer encoder block"""
    def __init__(self, embed_dim=768, num_heads=12, mlp_ratio=4.0, dropout=0.1):
        super().__init__()
        self.norm1 = nn.LayerNorm(embed_dim)
        self.attn = MultiHeadAttention(embed_dim, num_heads, dropout)
        self.norm2 = nn.LayerNorm(embed_dim)
        
        mlp_hidden_dim = int(embed_dim * mlp_ratio)
        self.mlp = nn.Sequential(
            nn.Linear(embed_dim, mlp_hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(mlp_hidden_dim, embed_dim),
            nn.Dropout(dropout)
        )
        
    def forward(self, x):
        # Attention with residual
        attn_out, attn_weights = self.attn(self.norm1(x))
        x = x + attn_out
        
        # MLP with residual
        x = x + self.mlp(self.norm2(x))
        
        return x, attn_weights

class TemporalAttention(nn.Module):
    """Temporal attention across video frames"""
    def __init__(self, embed_dim=768, num_heads=8):
        super().__init__()
        self.attention = nn.MultiheadAttention(embed_dim, num_heads, batch_first=True)
        self.norm = nn.LayerNorm(embed_dim)
        
    def forward(self, x):
        # x: (B, T, embed_dim) where T is number of frames
        attn_out, attn_weights = self.attention(x, x, x)
        x = self.norm(x + attn_out)
        return x, attn_weights

class FrequencyAnalyzer(nn.Module):
    """Analyze frequency domain using PyTorch FFT for deepfake artifacts"""
    def __init__(self, embed_dim=768):
        super().__init__()
        self.fc = nn.Sequential(
            nn.Linear(3, 64), # Using 3 channels for simplicity
            nn.ReLU(),
            nn.Linear(64, embed_dim)
        )
        
    def forward(self, x):
        # x: (B, T, C, H, W)
        B, T, C, H, W = x.shape
        
        # Simple frequency-like feature: Global average of FFT magnitude
        # We process in batch for speed
        # Reshape to (B*T, C, H, W)
        x_reshaped = x.view(B * T, C, H, W)
        
        # Fast Fourier Transform
        # fft2 returns (B*T, C, H, W) complex
        freq = torch.fft.fft2(x_reshaped)
        freq_mag = torch.abs(freq)
        
        # Global average of magnitude per channel
        # (B*T, C)
        avg_mag = freq_mag.mean(dim=(-2, -1))
        
        # Project to embed_dim
        # (B*T, embed_dim)
        features = self.fc(avg_mag)
        
        # Reshape back to (B, T, embed_dim)
        return features.view(B, T, -1)

class ViTDeepfakeDetector(nn.Module):
    """
    Vision Transformer + Temporal Attention for Deepfake Detection
    
    Unique Features:
    1. Patch-based image processing (ViT)
    2. Temporal attention across frames
    3. Frequency domain analysis
    4. Multi-modal fusion
    5. Attention visualization for explainability
    """
    
    def __init__(
        self,
        img_size=224,
        patch_size=16,
        in_channels=3,
        num_classes=2,
        embed_dim=192,
        depth=3,
        num_heads=3,
        mlp_ratio=4.0,
        dropout=0.1
    ):
        super().__init__()
        
        # Patch embedding
        self.patch_embed = PatchEmbedding(img_size, patch_size, in_channels, embed_dim)
        num_patches = self.patch_embed.n_patches
        
        # Class token and position embeddings
        self.cls_token = nn.Parameter(torch.zeros(1, 1, embed_dim))
        self.pos_embed = nn.Parameter(torch.zeros(1, num_patches + 1, embed_dim))
        self.pos_drop = nn.Dropout(dropout)
        
        # Transformer blocks
        self.blocks = nn.ModuleList([
            TransformerBlock(embed_dim, num_heads, mlp_ratio, dropout)
            for _ in range(depth)
        ])
        
        # Temporal attention
        self.temporal_attn = TemporalAttention(embed_dim, num_heads=8)
        
        # Frequency analyzer
        self.freq_analyzer = FrequencyAnalyzer(embed_dim)
        
        # Fusion layer
        self.fusion = nn.Sequential(
            nn.Linear(embed_dim * 2, embed_dim),
            nn.ReLU(),
            nn.Dropout(dropout)
        )
        
        # Classification head
        self.norm = nn.LayerNorm(embed_dim)
        self.head = nn.Sequential(
            nn.Linear(embed_dim, 512),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(512, 256),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(256, num_classes)
        )
        
        # Initialize weights
        nn.init.trunc_normal_(self.pos_embed, std=0.02)
        nn.init.trunc_normal_(self.cls_token, std=0.02)
        
    def forward(self, x, return_attention=False):
        """
        Args:
            x: (B, T, C, H, W) - Batch of video sequences
            return_attention: Whether to return attention maps
        
        Returns:
            logits: (B, num_classes)
            attention_maps: Dict of attention visualizations (if return_attention=True)
        """
        B, T, C, H, W = x.shape
        
        # Process each frame through ViT
        frame_features = []
        spatial_attentions = []
        
        for t in range(T):
            frame = x[:, t]  # (B, C, H, W)
            
            # Patch embedding
            patches = self.patch_embed(frame)  # (B, num_patches, embed_dim)
            
            # Add class token
            cls_tokens = self.cls_token.expand(B, -1, -1)
            patches = torch.cat([cls_tokens, patches], dim=1)
            
            # Add position embedding
            patches = patches + self.pos_embed
            patches = self.pos_drop(patches)
            
            # Transformer blocks
            for block in self.blocks:
                patches, attn = block(patches)
                
            # Store attention from last block
            if return_attention:
                spatial_attentions.append(attn)
            
            # Extract class token
            cls_token = patches[:, 0]
            frame_features.append(cls_token)
        
        # Stack frame features
        frame_features = torch.stack(frame_features, dim=1)  # (B, T, embed_dim)
        
        # Temporal attention
        temporal_features, temporal_attn = self.temporal_attn(frame_features)
        
        # Frequency analysis
        freq_features = self.freq_analyzer(x)
        
        # Fusion
        combined = torch.cat([temporal_features, freq_features], dim=-1)
        fused = self.fusion(combined)
        
        # Average pooling over time
        pooled = fused.mean(dim=1)  # (B, embed_dim)
        
        # Classification
        pooled = self.norm(pooled)
        logits = self.head(pooled)
        
        if return_attention:
            attention_maps = {
                'spatial': spatial_attentions,
                'temporal': temporal_attn
            }
            return logits, attention_maps
        
        return logits

def load_vit_model(model_path: str = None, device: str = None) -> ViTDeepfakeDetector:
    """Load Vision Transformer model"""
    if device is None:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Initialize model with smaller size for faster inference
    model = ViTDeepfakeDetector(
        img_size=224,
        patch_size=16,
        embed_dim=192,
        depth=3,
        num_heads=3,
        dropout=0.1
    )
    
    weights_loaded = False
    if model_path and os.path.exists(model_path):
        try:
            checkpoint = torch.load(model_path, map_location=device)
            if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
                model.load_state_dict(checkpoint['model_state_dict'])
            else:
                model.load_state_dict(checkpoint)
            weights_loaded = True
            print(f"✓ Loaded ViT model from {model_path}")
        except Exception as e:
            print(f"⚠ Could not load weights: {e}")
    else:
        # Silent initialization if no path provided - using heuristic mode
        print("⚠ No ViT weights provided, initializing skeleton without pretrained weights")
    
    model.weights_loaded = weights_loaded
    model = model.to(device)
    model.eval()
    
    return model

def get_vit_transform():
    """Get preprocessing transform for ViT"""
    return transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])

def predict_with_vit(
    model: ViTDeepfakeDetector,
    face_images: List[np.ndarray],
    device: str = None,
    return_attention: bool = False
) -> Dict:
    """
    Predict using Vision Transformer
    
    Args:
        model: ViT model
        face_images: List of face images
        device: Device to run on
        return_attention: Whether to return attention maps
    
    Returns:
        Dictionary with prediction, confidence, and optional attention maps
    """
    if device is None:
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    if not face_images:
        raise ValueError("No face images provided")
    
    # Limit to 20 frames for efficiency
    if len(face_images) > 20:
        indices = np.linspace(0, len(face_images) - 1, 20, dtype=int)
        face_images = [face_images[i] for i in indices]
    
    # Preprocess images
    transform = get_vit_transform()
    processed_images = []
    
    for img in face_images:
        try:
            # Convert to RGB if needed
            if len(img.shape) == 2:
                img = np.stack([img] * 3, axis=-1)
            elif img.shape[2] == 4:
                img = img[:, :, :3]
            
            tensor = transform(img)
            processed_images.append(tensor)
        except Exception as e:
            print(f"Error processing image: {e}")
            continue
    
    if not processed_images:
        raise ValueError("Failed to process any images")
    
    # Stack into batch
    sequence = torch.stack(processed_images).unsqueeze(0)  # (1, T, C, H, W)
    sequence = sequence.to(device)
    
    # Run inference
    with torch.no_grad():
        if return_attention:
            logits, attention_maps = model(sequence, return_attention=True)
        else:
            logits = model(sequence)
            attention_maps = None
        
        probabilities = torch.softmax(logits, dim=1)
        prediction = torch.argmax(probabilities, dim=1).item()
        confidence = probabilities[0, prediction].item()
    
    result = {
        'prediction': prediction,
        'confidence': confidence,
        'probabilities': {
            'real': probabilities[0, 0].item(),
            'fake': probabilities[0, 1].item()
        }
    }
    
    if attention_maps:
        result['attention_maps'] = attention_maps
    
    return result

import os
