"""Featured data science projects portfolio.

Each project includes:
- title: Project name
- description: Detailed project overview
- tech: List of technologies used
- impact: Business impact or achievements
- url: Link to project repository
- image: Project image filename
"""

PROJECTS = [
    {
        'title': 'Logistics Optimization Algorithm',
        'description': (
            'Implementation of optimization models for a core logistics algorithm determining '
            'key values for seller strategy classification. Replaced experience-based decisions '
            'with ML-driven recommendations using mathematical optimization.'
        ),
        'tech': ['Python', 'Optimization', 'PySpark', 'GCP', 'AWS'],
        'impact': 'Replaced ad-hoc analysis with data-driven seller strategy optimization',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project1.jpg'
    },
    {
        'title': 'Customer Probability Classification Model',
        'description': (
            'Classification models estimating customer probability of adopting a product. '
            'Addressed class imbalance using specialized strategies and behavioral analysis '
            'modeling instead of point-in-time snapshots.'
        ),
        'tech': ['Python', 'Scikit-learn', 'XGBoost', 'PySpark', 'AWS'],
        'impact': 'Improved product adoption prediction accuracy by modeling customer behavior',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project2.jpg'
    },
    {
        'title': 'Industrial Accident Prediction Algorithm',
        'description': (
            'Developed open-source algorithm for predicting accidents in industrial environments. '
            'Selected among 15 global candidates for Silicon Valley incubator program (4 months, California).'
        ),
        'tech': ['Python', 'Machine Learning', 'Industrial IoT', 'Data Analysis'],
        'impact': 'Predictive model for industrial safety - Silicon Valley incubator program',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project3.jpg'
    },
    {
        'title': 'Quality Parameter Estimation System',
        'description': (
            'ML models estimating product quality parameters during production. Reduced wait time '
            'from months to hours. Applied time-series analysis, distribution comparisons, and '
            'decision tree models with PyCaret for model selection.'
        ),
        'tech': ['Python', 'Spark', 'Time Series', 'Decision Trees', 'PyCaret'],
        'impact': 'Reduced quality parameter estimation from months to hours',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project4.jpg'
    },
    {
        'title': 'No-Show Prediction for Car Rental',
        'description': (
            'Machine learning model determining probability of customers making reservations but '
            'not picking up vehicles. Developed risk scoring system to enable strategic changes.'
        ),
        'tech': ['Python', 'Machine Learning', 'Classification', 'Power BI'],
        'impact': 'Enabled data-driven strategy changes through risk scoring system',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project5.jpg'
    },
    {
        'title': 'E-commerce User Behavior Analysis',
        'description': (
            'Analysis of user behavior for users searching products but not completing purchases. '
            'Utilized Google Analytics tracking, Hotjar, surveys and A/B testing to validate hypotheses.'
        ),
        'tech': ['Google Analytics', 'Hotjar', 'A/B Testing', 'Data Analysis', 'Power BI'],
        'impact': 'Identified conversion barriers through behavior analysis and testing',
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project6.jpg'
    }
]
