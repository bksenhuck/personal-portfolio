"""Top-level WSGI entrypoint.

Loads `backend/app.py` dynamically and exposes the Flask `app` instance
as a module-level variable. This keeps the root `app.py` as the single
entrypoint required by some hosting providers.
"""
import os
from flask import Flask, jsonify, send_file
from flask_cors import CORS

# Import backend package modules
from backend.config import config
from backend.data import PROFILE, SKILLS, PROJECTS, EXPERIENCE, EDUCATION, FUN_FACTS


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')

    # Serve frontend static files from the `frontend` folder so the root
    # domain returns the SPA while API endpoints remain under /api/*.
    # Use an absolute path for static_folder so deploys with different
    # working directories still find the frontend files.
    base_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_path = os.path.join(base_dir, 'frontend')
    app = Flask(__name__, static_folder=frontend_path, static_url_path='')
    # Log static folder info to help diagnose missing/static-file deploy issues
    try:
        files = os.listdir(frontend_path)
    except Exception as e:
        files = None
        app.logger.warning('Could not list frontend static folder %s: %s', frontend_path, e)
    app.logger.info('Static folder path: %s', frontend_path)
    app.logger.info('Static folder contents: %s', files if files is not None else 'unavailable')
    app.config.from_object(config[config_name])

    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })

    register_api_routes(app)
    return app


def register_api_routes(app):
    @app.route('/', methods=['GET'])
    def index():
        # Serve the frontend index.html at the site root using an absolute path.
        # If the file is missing in the deployed bundle, return the JSON docs
        # so we can see a clear fallback and log the problem.
        index_path = os.path.join(app.static_folder, 'index.html')
        if os.path.exists(index_path):
            try:
                return send_file(index_path)
            except Exception as e:
                app.logger.error('Failed to send index.html: %s', e)
        app.logger.warning('index.html not found at %s; returning API docs fallback', index_path)
        return jsonify({
            "service": "Portfolio API",
            "version": "1.0.0",
            "endpoints": {
                "health": "/api/health",
                "all_data": "/api/all",
                "portfolio": "/api/portfolio",
                "projects": "/api/projects",
                "experience": "/api/experience",
                "education": "/api/education"
            },
            "docs": "All endpoints return JSON. Access /api/* routes for data."
        }), 200

    # SPA fallback: serve index.html for any non-API path so client-side
    # routing works and the root doesn't accidentally return JSON docs.
    @app.route('/<path:requested>')
    def spa_fallback(requested):
        # If the path starts with 'api/', return 404 so API routes still work
        if requested.startswith('api/'):
            return jsonify({"error": "Not found"}), 404
        return app.send_static_file('index.html')

    @app.route('/api/health', methods=['GET'])
    def health():
        return jsonify({"status": "healthy", "service": "portfolio-api", "version": "1.0.0"})

    @app.route('/api/portfolio', methods=['GET'])
    def get_portfolio():
        return jsonify({"profile": PROFILE, "skills": SKILLS, "fun_facts": FUN_FACTS})

    @app.route('/api/projects', methods=['GET'])
    def get_projects():
        return jsonify({"projects": PROJECTS})

    @app.route('/api/experience', methods=['GET'])
    def get_experience():
        return jsonify({"experience": EXPERIENCE})

    @app.route('/api/education', methods=['GET'])
    def get_education():
        return jsonify({"education": EDUCATION})

    @app.route('/api/all', methods=['GET'])
    def get_all_data():
        return jsonify({
            "profile": PROFILE,
            "skills": SKILLS,
            "projects": PROJECTS,
            "experience": EXPERIENCE,
            "education": EDUCATION,
            "fun_facts": FUN_FACTS
        })


# Create application instance exposed as module-level `app` for hosts
app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
