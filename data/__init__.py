"""
Data module for portfolio application.
Contains all static data organized by domain.
"""

from .profile import PROFILE
from .skills import SKILLS
from .projects import PROJECTS
from .experience import EXPERIENCE
from .education import EDUCATION

__all__ = ['PROFILE', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'EDUCATION']
