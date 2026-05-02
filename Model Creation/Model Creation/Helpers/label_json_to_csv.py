
# coding: utf-8

# In[1]:


import pandas as pd


# In[40]:


import os
from pathlib import Path

# Base directory for datasets
BASE_DIR = Path(__file__).resolve().parents[3] / "datasets"

for i in range(8):
    path_json = BASE_DIR / f"dfdc_train_part_{i}" / "metadata.json"
    path_csv = BASE_DIR / f"dfdc_train_part_{i}" / "metadata.csv"
    
    if not path_json.exists():
        print(f"Skipping part {i}: {path_json} not found")
        continue
        
    print(f"Processing: {path_json}")
    read_json = pd.read_json(path_json)
    df = pd.DataFrame(read_json)
    df_2 = pd.DataFrame(df.transpose())
    df_2.to_csv(path_csv)
    read_csv = pd.read_csv(path_csv)
    read_csv.columns = ["URI","label","original","split"]
    read_csv.to_csv(path_csv,index=False)
    print(read_csv.head(5))

