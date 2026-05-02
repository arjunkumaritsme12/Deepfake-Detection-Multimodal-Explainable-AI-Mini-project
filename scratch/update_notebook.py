import json
import os

notebook_path = r"d:\deepfake detection project\Deepfake-Detection-Multimodal-Explainable-AI-Mini-project\Model Creation\Model Creation\Model_and_train_csv.ipynb"

with open(notebook_path, 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Find the training cell (cell 8)
for cell in nb['cells']:
    if cell['cell_type'] == 'code' and any("train_loader = DataLoader" in line for line in cell['source']):
        source = cell['source']
        new_source = []
        for line in source:
            # Update sequence length
            if "train_dataset = LocalDeepfakeDataset" in line:
                line = '    train_dataset = LocalDeepfakeDataset(train_files, sequence_length=5, transform=train_transforms)\n'
            # Update num_epochs
            if "num_epochs = 5" in line:
                line = '    num_epochs = 2\n'
            # Update save path logic
            if 'torch.save(model.state_dict(), "../../backend/model.pth")' in line:
                # Add import os if not there
                if not any("import os" in l for l in cell['source']):
                    new_source.insert(0, "import os\n")
                line = '    MODEL_SAVE_PATH = os.path.join(str(BASE_DIR), "backend", "model.pth")\n    torch.save(model.state_dict(), MODEL_SAVE_PATH)\n    print(f"Model saved to {MODEL_SAVE_PATH}")\n'
            
            # Remove old print if we added a new one
            if 'print("Model saved to backend/model.pth")' in line:
                continue
                
            new_source.append(line)
        cell['source'] = new_source

with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=1)

print("Notebook updated successfully!")
