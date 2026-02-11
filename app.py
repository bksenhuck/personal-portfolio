"""Top-level WSGI entrypoint.

Loads `backend/app.py` dynamically and exposes the Flask `app` instance
as a module-level variable. This keeps the root `app.py` as the single
entrypoint required by some hosting providers.
"""
import os
from flask import Flask, jsonify
from flask_cors import CORS

# Import backend package modules
from backend.config import config
from backend.data import PROFILE, SKILLS, PROJECTS, EXPERIENCE, EDUCATION, FUN_FACTS


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')

    app = Flask(__name__)
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
        })

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
