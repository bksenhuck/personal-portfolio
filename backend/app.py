"""
Portfolio Backend API - Flask REST API
Serve portfolio data as JSON endpoints for static frontend
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS

from config import config
from data import PROFILE, SKILLS, PROJECTS, EXPERIENCE, EDUCATION, FUN_FACTS


def create_app(config_name=None):
    """
    Create and configure Flask API application.
    
    Args:
        config_name: Configuration environment name
    
    Returns:
        Configured Flask application
    """
    if config_name is None:
        config_name = os.environ.get('FLASK_ENV', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Enable CORS for frontend domains
    # In production, specify exact origins: origins=["https://yourfrontend.vercel.app"]
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",  # TODO: Replace with your frontend URL in production
            "methods": ["GET", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Register API routes
    register_api_routes(app)
    
    return app


def register_api_routes(app):
    """
    Register REST API endpoints.
    All routes return JSON data for frontend consumption.
    """
    
    @app.route('/', methods=['GET'])
    def index():
        """Root endpoint - API information"""
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
        """Health check endpoint"""
        return jsonify({
            "status": "healthy",
            "service": "portfolio-api",
            "version": "1.0.0"
        })
    
    @app.route('/api/portfolio', methods=['GET'])
    def get_portfolio():
        """
        Get general portfolio data (profile, skills, fun facts).
        Used for hero section and about page.
        """
        return jsonify({
            "profile": PROFILE,
            "skills": SKILLS,
            "fun_facts": FUN_FACTS
        })
    
    @app.route('/api/projects', methods=['GET'])
    def get_projects():
        """Get all projects"""
        return jsonify({
            "projects": PROJECTS
        })
    
    @app.route('/api/experience', methods=['GET'])
    def get_experience():
        """Get professional experience"""
        return jsonify({
            "experience": EXPERIENCE
        })
    
    @app.route('/api/education', methods=['GET'])
    def get_education():
        """Get education/academic background"""
        return jsonify({
            "education": EDUCATION
        })
    
    @app.route('/api/all', methods=['GET'])
    def get_all_data():
        """
        Get all portfolio data in single request.
        Useful for initial page load to minimize API calls.
        """
        return jsonify({
            "profile": PROFILE,
            "skills": SKILLS,
            "projects": PROJECTS,
            "experience": EXPERIENCE,
            "education": EDUCATION,
            "fun_facts": FUN_FACTS
        })


# Create application instance
app = create_app()


if __name__ == '__main__':
    # Development server
    app.run(host='0.0.0.0', port=5000, debug=True)
