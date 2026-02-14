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
        'title': {
            'pt': 'Logistics Optimization Algorithm',
            'en': 'Logistics Optimization Algorithm',
            'es': 'Logistics Optimization Algorithm',
        },
        'description': {
            'pt': (
                'Implementation of optimization models for a core logistics algorithm determining '
                'key values for seller strategy classification. Replaced experience-based decisions '
                'with ML-driven recommendations using mathematical optimization.'
            ),
            'en': (
                'Implementation of optimization models for a core logistics algorithm determining '
                'key values for seller strategy classification. Replaced experience-based decisions '
                'with ML-driven recommendations using mathematical optimization.'
            ),
            'es': (
                'Implementation of optimization models for a core logistics algorithm determining '
                'key values for seller strategy classification. Replaced experience-based decisions '
                'with ML-driven recommendations using mathematical optimization.'
            ),
        },
        'tech': ['Python', 'Optimization', 'PySpark', 'GCP', 'AWS'],
        'impact': {
            'pt': 'Replaced ad-hoc analysis with data-driven seller strategy optimization',
            'en': 'Replaced ad-hoc analysis with data-driven seller strategy optimization',
            'es': 'Replaced ad-hoc analysis with data-driven seller strategy optimization',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project1.jpg'
    },
    {
        'title': {
            'pt': 'Customer Probability Classification Model',
            'en': 'Customer Probability Classification Model',
            'es': 'Customer Probability Classification Model',
        },
        'description': {
            'pt': (
                'Classification models estimating customer probability of adopting a product. '
                'Addressed class imbalance using specialized strategies and behavioral analysis '
                'modeling instead of point-in-time snapshots.'
            ),
            'en': (
                'Classification models estimating customer probability of adopting a product. '
                'Addressed class imbalance using specialized strategies and behavioral analysis '
                'modeling instead of point-in-time snapshots.'
            ),
            'es': (
                'Classification models estimating customer probability of adopting a product. '
                'Addressed class imbalance using specialized strategies and behavioral analysis '
                'modeling instead of point-in-time snapshots.'
            ),
        },
        'tech': ['Python', 'Scikit-learn', 'XGBoost', 'PySpark', 'AWS'],
        'impact': {
            'pt': 'Improved product adoption prediction accuracy by modeling customer behavior',
            'en': 'Improved product adoption prediction accuracy by modeling customer behavior',
            'es': 'Improved product adoption prediction accuracy by modeling customer behavior',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project2.jpg'
    },
    {
        'title': {
            'pt': 'Industrial Accident Prediction Algorithm',
            'en': 'Industrial Accident Prediction Algorithm',
            'es': 'Industrial Accident Prediction Algorithm',
        },
        'description': {
            'pt': (
                'Developed open-source algorithm for predicting accidents in industrial environments. '
                'Selected among 15 global candidates for Silicon Valley incubator program (4 months, California).'
            ),
            'en': (
                'Developed open-source algorithm for predicting accidents in industrial environments. '
                'Selected among 15 global candidates for Silicon Valley incubator program (4 months, California).'
            ),
            'es': (
                'Developed open-source algorithm for predicting accidents in industrial environments. '
                'Selected among 15 global candidates for Silicon Valley incubator program (4 months, California).'
            ),
        },
        'tech': ['Python', 'Machine Learning', 'Industrial IoT', 'Data Analysis'],
        'impact': {
            'pt': 'Predictive model for industrial safety - Silicon Valley incubator program',
            'en': 'Predictive model for industrial safety - Silicon Valley incubator program',
            'es': 'Predictive model for industrial safety - Silicon Valley incubator program',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project3.jpg'
    },
    {
        'title': {
            'pt': 'Quality Parameter Estimation System',
            'en': 'Quality Parameter Estimation System',
            'es': 'Quality Parameter Estimation System',
        },
        'description': {
            'pt': (
                'ML models estimating product quality parameters during production. Reduced wait time '
                'from months to hours. Applied time-series analysis, distribution comparisons, and '
                'decision tree models with PyCaret for model selection.'
            ),
            'en': (
                'ML models estimating product quality parameters during production. Reduced wait time '
                'from months to hours. Applied time-series analysis, distribution comparisons, and '
                'decision tree models with PyCaret for model selection.'
            ),
            'es': (
                'ML models estimating product quality parameters during production. Reduced wait time '
                'from months to hours. Applied time-series analysis, distribution comparisons, and '
                'decision tree models with PyCaret for model selection.'
            ),
        },
        'tech': ['Python', 'Spark', 'Time Series', 'Decision Trees', 'PyCaret'],
        'impact': {
            'pt': 'Reduced quality parameter estimation from months to hours',
            'en': 'Reduced quality parameter estimation from months to hours',
            'es': 'Reduced quality parameter estimation from months to hours',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project1.jpg'
    },
    {
        'title': {
            'pt': 'No-Show Prediction for Car Rental',
            'en': 'No-Show Prediction for Car Rental',
            'es': 'No-Show Prediction for Car Rental',
        },
        'description': {
            'pt': (
                'Machine learning model determining probability of customers making reservations but '
                'not picking up vehicles. Developed risk scoring system to enable strategic changes.'
            ),
            'en': (
                'Machine learning model determining probability of customers making reservations but '
                'not picking up vehicles. Developed risk scoring system to enable strategic changes.'
            ),
            'es': (
                'Machine learning model determining probability of customers making reservations but '
                'not picking up vehicles. Developed risk scoring system to enable strategic changes.'
            ),
        },
        'tech': ['Python', 'Machine Learning', 'Classification', 'Power BI'],
        'impact': {
            'pt': 'Enabled data-driven strategy changes through risk scoring system',
            'en': 'Enabled data-driven strategy changes through risk scoring system',
            'es': 'Enabled data-driven strategy changes through risk scoring system',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project2.jpg'
    },
    {
        'title': {
            'pt': 'E-commerce User Behavior Analysis',
            'en': 'E-commerce User Behavior Analysis',
            'es': 'E-commerce User Behavior Analysis',
        },
        'description': {
            'pt': (
                'Analysis of user behavior for users searching products but not completing purchases. '
                'Utilized Google Analytics tracking, Hotjar, surveys and A/B testing to validate hypotheses.'
            ),
            'en': (
                'Analysis of user behavior for users searching products but not completing purchases. '
                'Utilized Google Analytics tracking, Hotjar, surveys and A/B testing to validate hypotheses.'
            ),
            'es': (
                'Analysis of user behavior for users searching products but not completing purchases. '
                'Utilized Google Analytics tracking, Hotjar, surveys and A/B testing to validate hypotheses.'
            ),
        },
        'tech': ['Google Analytics', 'Hotjar', 'A/B Testing', 'Data Analysis', 'Power BI'],
        'impact': {
            'pt': 'Identified conversion barriers through behavior analysis and testing',
            'en': 'Identified conversion barriers through behavior analysis and testing',
            'es': 'Identified conversion barriers through behavior analysis and testing',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project3.jpg'
    }
]
