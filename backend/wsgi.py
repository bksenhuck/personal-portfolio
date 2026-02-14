import os
import sys

"""WSGI wrapper to import top-level `app` when Render uses `backend/` as root.

This file allows the process to be started from inside the `backend`
directory while the main WSGI app object remains defined in the repo root
`app.py`.
"""

import os
import sys


# Ensure project root is on sys.path so the top-level `app.py` can be imported
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from app import app  # noqa: E402


if __name__ == "__main__":
    # Allow running the WSGI module directly for local testing
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8000)), debug=True)
