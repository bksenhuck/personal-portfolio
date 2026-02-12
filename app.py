"""Simple static Flask server.

This version serves the compiled frontend from the `frontend/` folder
and exposes a single WSGI `app` instance for hosting as required.
No API routes are provided — the site is purely static.
"""
import os
from flask import Flask, send_from_directory, send_file, jsonify
from flask_cors import CORS

# Import static data modules for simple API responses
from backend.data.profile import PROFILE
from backend.data.projects import PROJECTS
from backend.data.experience import EXPERIENCE
from backend.data.education import EDUCATION
from backend.data.skills import SKILLS
from backend.data.fun_facts import FUN_FACTS


base_dir = os.path.dirname(os.path.abspath(__file__))
frontend_path = os.path.join(base_dir, 'frontend')

# Serve static frontend files; use absolute path so deploys with different
# working directories still find the frontend assets.
app = Flask(__name__, static_folder=frontend_path, static_url_path='')

# Enable CORS for API routes (allow local frontend during development)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:8000",
            "http://127.0.0.1:8000",
            "http://localhost:5000",
            "http://127.0.0.1:5000",
        ]
    }
})

# Log static folder info to help diagnose deploy issues
try:
    files = os.listdir(frontend_path)
except Exception as e:
    files = None
    app.logger.warning('Could not list frontend static folder %s: %s', frontend_path, e)
app.logger.info('Static folder path: %s', frontend_path)
app.logger.info('Static folder contents: %s', files if files is not None else 'unavailable')


@app.route('/', methods=['GET'])
def index():
    index_path = os.path.join(app.static_folder, 'index.html')
    return send_file(index_path)


@app.route('/<path:requested>')
def serve(requested):
    # If the requested path matches a file in the frontend folder, serve it.
    file_path = os.path.join(app.static_folder, requested)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(app.static_folder, requested)
    # Otherwise serve the SPA entrypoint so client-side routing works.
    return send_file(os.path.join(app.static_folder, 'index.html'))


# Simple API endpoints to return JSON data used by the frontend
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/api/all', methods=['GET'])
def api_all():
    return jsonify({
        'profile': PROFILE,
        'projects': PROJECTS,
        'experience': EXPERIENCE,
        'education': EDUCATION,
        'skills': SKILLS,
        'fun_facts': FUN_FACTS,
    })


@app.route('/api/portfolio', methods=['GET'])
def api_portfolio():
    return jsonify({
        'profile': PROFILE,
        'skills': SKILLS,
        'fun_facts': FUN_FACTS,
    })


@app.route('/api/projects', methods=['GET'])
def api_projects():
    return jsonify(PROJECTS)


@app.route('/api/experience', methods=['GET'])
def api_experience():
    return jsonify(EXPERIENCE)


@app.route('/api/education', methods=['GET'])
def api_education():
    return jsonify(EDUCATION)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8000)), debug=True)
