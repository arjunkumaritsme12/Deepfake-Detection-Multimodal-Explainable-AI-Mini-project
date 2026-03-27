# Backend API

FastAPI backend for deepfake detection using Vision Transformer.

## Setup

```bash
pip install -r requirements.txt
python main.py
```

Server runs on http://localhost:8000

## API Endpoints

### Health Check
```
GET /health
```

### Predict
```
POST /api/predict/
Content-Type: multipart/form-data

Parameters:
- file: video file (mp4, avi, mov, mkv)
- num_frames: number of frames to analyze (10-50, default: 30)
```

## Architecture

- **main.py** - FastAPI server and routes
- **vit_model.py** - Vision Transformer implementation
- **enhanced_processor.py** - Video processing and face detection
- **train_vit.py** - Training script (optional)

## Model

Uses Vision Transformer with:
- Patch size: 16x16
- Embedding dimension: 384
- Depth: 6 transformer blocks
- Attention heads: 6

## Processing Pipeline

1. Extract frames from video
2. Detect faces using OpenCV
3. Run through Vision Transformer
4. Analyze temporal consistency
5. Check frequency domain
6. Combine signals for prediction

## Environment Variables

- `PORT` - Server port (default: 8000)
- `ALLOWED_ORIGINS` - CORS origins (default: *)

## Docker

```bash
docker build -t deepfake-backend .
docker run -p 8000:8000 deepfake-backend
```

## Notes

- Model needs training on real data
- Currently uses mock predictions
- CPU-only inference (no GPU required)
