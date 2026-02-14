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
            'pt': 'Algoritmo de Otimização Logística',
            'en': 'Logistics Optimization Algorithm',
            'es': 'Algoritmo de Optimización Logística',
        },
        'description': {
            'pt': (
                'Implementação de modelos de otimização para um algoritmo logístico central que determina '
                'valores-chave para classificação de estratégias de vendedores. Substituiu decisões baseadas em experiência '
                'por recomendações orientadas por ML usando otimização matemática.'
            ),
            'en': (
                'Implementation of optimization models for a core logistics algorithm determining '
                'key values for seller strategy classification. Replaced experience-based decisions '
                'with ML-driven recommendations using mathematical optimization.'
            ),
            'es': (
                'Implementación de modelos de optimización para un algoritmo logístico central que determina '
                'valores clave para la clasificación de estrategias de vendedores. Sustituyó decisiones basadas en la experiencia '
                'por recomendaciones impulsadas por ML mediante optimización matemática.'
            ),
        },
        'tech': ['Python', 'Optimization', 'PySpark', 'GCP', 'AWS'],
        'impact': {
            'pt': 'Substituiu análises ad-hoc por otimização de estratégia de vendedores guiada por dados',
            'en': 'Replaced ad-hoc analysis with data-driven seller strategy optimization',
            'es': 'Sustituyó análisis ad-hoc por optimización de estrategia de vendedores basada en datos',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project1.jpg'
    },
    {
        'title': {
            'pt': 'Modelo de Classificação de Probabilidade de Cliente',
            'en': 'Customer Probability Classification Model',
            'es': 'Modelo de Clasificación de Probabilidad de Cliente',
        },
        'description': {
            'pt': (
                'Modelos de classificação que estimam a probabilidade de clientes adotarem um produto. '
                'Abordou o desbalanceamento de classes usando estratégias especializadas e modelagem de comportamento '
                'em vez de snapshots pontuais.'
            ),
            'en': (
                'Classification models estimating customer probability of adopting a product. '
                'Addressed class imbalance using specialized strategies and behavioral analysis '
                'modeling instead of point-in-time snapshots.'
            ),
            'es': (
                'Modelos de clasificación que estiman la probabilidad de que los clientes adopten un producto. '
                'Abordó el desequilibrio de clases utilizando estrategias especializadas y modelado de comportamiento '
                'en lugar de instantáneas puntuales.'
            ),
        },
        'tech': ['Python', 'Scikit-learn', 'XGBoost', 'PySpark', 'AWS'],
        'impact': {
            'pt': 'Melhorou a acurácia na previsão de adoção de produto modelando o comportamento do cliente',
            'en': 'Improved product adoption prediction accuracy by modeling customer behavior',
            'es': 'Mejoró la precisión de predicción de adopción de producto modelando el comportamiento del cliente',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project2.jpg'
    },
    {
        'title': {
            'pt': 'Algoritmo de Previsão de Acidentes Industriais',
            'en': 'Industrial Accident Prediction Algorithm',
            'es': 'Algoritmo de Predicción de Accidentes Industriales',
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
            'pt': 'Modelo preditivo para segurança industrial - selecionado para incubadora no Vale do Silício',
            'en': 'Predictive model for industrial safety - Silicon Valley incubator program',
            'es': 'Modelo predictivo para seguridad industrial - programa incubadora en Silicon Valley',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project3.jpg'
    },
    {
        'title': {
            'pt': 'Sistema de Estimativa de Parâmetros de Qualidade',
            'en': 'Quality Parameter Estimation System',
            'es': 'Sistema de Estimación de Parámetros de Calidad',
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
            'pt': 'Reduziu a estimativa de parâmetros de qualidade de meses para horas',
            'en': 'Reduced quality parameter estimation from months to hours',
            'es': 'Redujo la estimación de parámetros de calidad de meses a horas',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project1.jpg'
    },
    {
        'title': {
            'pt': 'Previsão de No-Show para Locadora de Veículos',
            'en': 'No-Show Prediction for Car Rental',
            'es': 'Predicción de No-Show para Alquiler de Coches',
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
            'pt': 'Permitiu mudanças estratégicas baseadas em dados por meio de um sistema de pontuação de risco',
            'en': 'Enabled data-driven strategy changes through risk scoring system',
            'es': 'Permitió cambios estratégicos basados en datos mediante un sistema de puntuación de riesgo',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project2.jpg'
    },
    {
        'title': {
            'pt': 'Análise de Comportamento de Usuários em E-commerce',
            'en': 'E-commerce User Behavior Analysis',
            'es': 'Análisis de Comportamiento de Usuarios en E-commerce',
        },
        'description': {
            'pt': (
                'Análise do comportamento de usuários que procuram produtos, mas não concluem a compra. '
                'Utilizou Google Analytics, Hotjar, pesquisas e testes A/B para validar hipóteses.'
            ),
            'en': (
                'Analysis of user behavior for users searching products but not completing purchases. '
                'Utilized Google Analytics tracking, Hotjar, surveys and A/B testing to validate hypotheses.'
            ),
            'es': (
                'Análisis del comportamiento de usuarios que buscan productos pero no completan compras. '
                'Utilizó Google Analytics, Hotjar, encuestas y pruebas A/B para validar hipótesis.'
            ),
        },
        'tech': ['Google Analytics', 'Hotjar', 'A/B Testing', 'Data Analysis', 'Power BI'],
        'impact': {
            'pt': 'Identificou barreiras de conversão por meio de análise de comportamento e testes',
            'en': 'Identified conversion barriers through behavior analysis and testing',
            'es': 'Identificó barreras de conversión mediante análisis de comportamiento y pruebas',
        },
        'url': 'https://github.com/brayanksenhuck',
        'image': 'project3.jpg'
    }
]
