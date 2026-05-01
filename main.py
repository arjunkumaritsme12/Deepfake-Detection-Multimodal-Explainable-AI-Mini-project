import os
import sys
import uvicorn
from pathlib import Path

# Add the current directory and backend directory to the path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))
sys.path.append(str(BASE_DIR / "backend"))

# Handle encoding for Windows terminal emojis
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

def main():
    """
    Main entry point for the Deepfake Detection project.
    Starts the FastAPI backend server.
    """
    port = int(os.getenv("PORT", 8000))
    
    print("\n" + "="*60)
    print("🚀 Deepfake Detection - Local Development Server")
    print("="*60)
    print(f"📡 API URL: http://localhost:{port}")
    print(f"🏥 Health:  http://localhost:{port}/health")
    print(f"📄 Docs:    http://localhost:{port}/docs")
    print("="*60 + "\n")
    
    # Start the server using the backend.main:app
    uvicorn.run(
        "backend.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
