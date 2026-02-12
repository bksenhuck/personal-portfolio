import os
import sys

# Ensure project root is on sys.path so we can import top-level `app.py`
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from app import app  # noqa: E402


if __name__ == '__main__':
    # Allow running the WSGI module directly for local testing
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)), debug=True)
