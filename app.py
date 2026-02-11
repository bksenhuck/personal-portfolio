"""Top-level WSGI entrypoint.

Loads `backend/app.py` dynamically and exposes the Flask `app` instance
as a module-level variable. This keeps the root `app.py` as the single
entrypoint required by some hosting providers.
"""
import os
import importlib.util
from pathlib import Path


HERE = Path(__file__).parent
BACKEND_APP_PATH = HERE / "backend" / "app.py"

if not BACKEND_APP_PATH.exists():
    raise RuntimeError(f"backend app not found at {BACKEND_APP_PATH}")

spec = importlib.util.spec_from_file_location("backend_app", str(BACKEND_APP_PATH))
backend_app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backend_app)

# Expose the Flask application instance expected by hosts
app = getattr(backend_app, "app")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)
