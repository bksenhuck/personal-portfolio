"""
Brayan Ksenhuck - Data Scientist Portfolio.

Personal landing page with SEO optimization and multilingual support.
"""

import os

from flask import Flask, render_template, send_from_directory

from config import config
from data import PROFILE, SKILLS, PROJECTS, EXPERIENCE, EDUCATION


def create_app(config_name=None):
    """
    Create and configure Flask application instance.
    
    Args:
        config_name: Configuration environment name
                    ('development', 'production', or 'default')
    
    Returns:
        Configured Flask application
    """
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Register routes
    register_routes(app)
    
    return app


def register_routes(app):
    """
    Register application routes.
    
    Args:
        app: Flask application instance
    """
    @app.route('/')
    def home():
        """Render main portfolio page with all sections."""
        return render_template(
            'index.html',
            profile=PROFILE,
            projects=PROJECTS,
            skills=SKILLS,
            experience=EXPERIENCE,
            education=EDUCATION
        )

    @app.route('/static/translations/<path:filename>')
    def translations(filename):
        """
        Serve translation JSON files.
        
        Args:
            filename: Translation file name (e.g., 'en.json', 'pt.json')
        
        Returns:
            Translation file content
        """
        return send_from_directory('translations', filename)


# Create application instance
app = create_app()


if __name__ == '__main__':
    app.run(debug=True)
