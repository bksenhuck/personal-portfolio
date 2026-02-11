"""Backend package initializer (no app exported).

This file makes `backend` importable as a package so the root `app.py`
can import configuration and data modules with `backend.config` and
`backend.data` while keeping the single WSGI entrypoint at project root.
"""

__all__ = []
