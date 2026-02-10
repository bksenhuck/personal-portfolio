"""Application configuration settings."""

import os


class Config:
    """Base configuration class."""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    DEBUG = False
    TESTING = False
    
    # Application settings
    JSON_AS_ASCII = False
    JSON_SORT_KEYS = False
    
    # Static files
    STATIC_FOLDER = 'static'
    TEMPLATE_FOLDER = 'templates'
    
    # Translations
    TRANSLATIONS_FOLDER = 'translations'
    DEFAULT_LANGUAGE = 'pt'
    SUPPORTED_LANGUAGES = ['en', 'es', 'pt']


class DevelopmentConfig(Config):
    """Development environment configuration."""
    
    DEBUG = True


class ProductionConfig(Config):
    """Production environment configuration."""
    
    DEBUG = False
    
    # Override with environment variable in production
    SECRET_KEY = os.environ.get('SECRET_KEY')


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
