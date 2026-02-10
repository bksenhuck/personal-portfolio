"""
Data module for portfolio application.
Contains all static data organized by domain.
"""

from .profile import PROFILE
from .skills import SKILLS
from .projects import PROJECTS
from .experience import EXPERIENCE
from .education import EDUCATION
from .fun_facts import FUN_FACTS

__all__ = ['PROFILE', 'SKILLS', 'PROJECTS', 'EXPERIENCE', 'EDUCATION', 'FUN_FACTS']
