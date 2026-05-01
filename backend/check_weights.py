import torch
from vit_model import ViTDeepfakeDetector
import os

def check_model():
    model_path = 'model.pth'
    if not os.path.exists(model_path):
        print(f"File {model_path} not found")
        return
    
    try:
        checkpoint = torch.load(model_path, map_location='cpu')
        print("Keys in checkpoint:", checkpoint.keys() if isinstance(checkpoint, dict) else "Not a dict")
        
        model = ViTDeepfakeDetector(
            img_size=224,
            patch_size=16,
            embed_dim=192,
            depth=3,
            num_heads=3,
            dropout=0.1
        )
        
        if isinstance(checkpoint, dict) and 'model_state_dict' in checkpoint:
            model.load_state_dict(checkpoint['model_state_dict'])
        else:
            model.load_state_dict(checkpoint)
        
        print("Model loaded successfully!")
        
        # Check some weights
        for name, param in model.named_parameters():
            if 'head.6.weight' in name:
                print(f"{name} mean: {param.mean().item():.6f}, std: {param.std().item():.6f}")
                print(f"{name} values: {param.detach().numpy()}")
            if 'head.6.bias' in name:
                print(f"{name} values: {param.detach().numpy()}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_model()
