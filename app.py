"""Simple static Flask server.

This module serves the static frontend from the `frontend/` folder and
exposes lightweight JSON API endpoints that return data from
`backend/data/*`. The WSGI application instance is `app`.
"""

import os
from flask import Flask, send_from_directory, send_file, jsonify, request
from flask_cors import CORS

# Import data modules used by the API endpoints
from backend.data.profile import PROFILE
from backend.data.projects import PROJECTS
from backend.data.experience import EXPERIENCE
from backend.data.education import EDUCATION
from backend.data.skills import SKILLS
from backend.data.fun_facts import FUN_FACTS

# i18n helpers
from backend.i18n import get_lang, translate_dataset


# Project paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_PATH = os.path.join(BASE_DIR, "frontend")


app = Flask(__name__, static_folder=FRONTEND_PATH, static_url_path="")


# Configure CORS origins for API routes. Update with production origins
# as needed (keeps localhost entries for local development).
CORS_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "https://brayanksenhuck.dev",
    "https://www.brayanksenhuck.dev",
]

CORS(app, resources={r"/api/*": {"origins": CORS_ORIGINS}})


# Log static folder info to help diagnose deploy issues
try:
    files = os.listdir(FRONTEND_PATH)
except Exception as exc:  # pragma: no cover - diagnostic only
    files = None
    app.logger.warning("Could not list frontend static folder %s: %s", FRONTEND_PATH, exc)

app.logger.info("Static folder path: %s", FRONTEND_PATH)
app.logger.info("Static folder contents: %s", files if files is not None else "unavailable")


@app.route('/', methods=['GET'])
def index():
    index_path = os.path.join(app.static_folder, "index.html")
    return send_file(index_path)


@app.route('/<path:requested>')
def serve(requested):
    # If the requested path matches a file in the frontend folder, serve it.
    file_path = os.path.join(app.static_folder, requested)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(app.static_folder, requested)

    # Otherwise serve the SPA entrypoint so client-side routing works.
    return send_file(os.path.join(app.static_folder, "index.html"))


# Simple API endpoints to return JSON data used by the frontend
@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy"})


@app.route("/api/all", methods=["GET"])
def api_all():
    """Return all portfolio data in a single payload."""
    lang = get_lang(request)
    payload = {
        "profile": translate_dataset(PROFILE, lang),
        "projects": translate_dataset(PROJECTS, lang),
        "experience": translate_dataset(EXPERIENCE, lang),
        "education": translate_dataset(EDUCATION, lang),
        "skills": translate_dataset(SKILLS, lang),
        "fun_facts": translate_dataset(FUN_FACTS, lang),
    }
    resp = jsonify(payload)
    # Persist language selection if provided via querystring
    if request.args.get('lang'):
        resp.set_cookie('lang', lang, max_age=30 * 24 * 3600)
    return resp


@app.route("/api/portfolio", methods=["GET"])
def api_portfolio():
    """Return a portfolio summary (profile, skills, facts)."""
    lang = get_lang(request)
    payload = {"profile": translate_dataset(PROFILE, lang), "skills": translate_dataset(SKILLS, lang), "fun_facts": translate_dataset(FUN_FACTS, lang)}
    resp = jsonify(payload)
    if request.args.get('lang'):
        resp.set_cookie('lang', lang, max_age=30 * 24 * 3600)
    return resp


@app.route("/api/projects", methods=["GET"])
def api_projects():
    """Return featured projects."""
    lang = get_lang(request)
    resp = jsonify(translate_dataset(PROJECTS, lang))
    if request.args.get('lang'):
        resp.set_cookie('lang', lang, max_age=30 * 24 * 3600)
    return resp


@app.route("/api/experience", methods=["GET"])
def api_experience():
    """Return professional experience."""
    lang = get_lang(request)
    resp = jsonify(translate_dataset(EXPERIENCE, lang))
    if request.args.get('lang'):
        resp.set_cookie('lang', lang, max_age=30 * 24 * 3600)
    return resp


@app.route("/api/education", methods=["GET"])
def api_education():
    """Return education records."""
    lang = get_lang(request)
    resp = jsonify(translate_dataset(EDUCATION, lang))
    if request.args.get('lang'):
        resp.set_cookie('lang', lang, max_age=30 * 24 * 3600)
    return resp


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)), debug=True)
