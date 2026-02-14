"""Fun facts and curiosities about the profile owner.

Each fact may be either a numeric metric (`label` + `value`) or a
short descriptive card (`title`, `description`, `image`, `position`).
All user-visible text is localized with `pt` / `en` / `es` maps.
"""

FUN_FACTS = [
    {
        'type': 'metric',
        'label': {
            'pt': 'Projetos Concluídos',
            'en': 'Completed Projects',
            'es': 'Proyectos Completados'
        },
        'value': 24
    },
    {
        'type': 'metric',
        'label': {
            'pt': 'Anos de Experiência',
            'en': 'Years of Experience',
            'es': 'Años de Experiencia'
        },
        'value': 8
    },
    {
        'type': 'metric',
        'label': {
            'pt': 'Clientes Atendidos',
            'en': 'Clients Served',
            'es': 'Clientes Atendidos'
        },
        'value': 12
    },
    {
        'type': 'card',
        'title': {
            'pt': 'Global Explorer',
            'en': 'Global Explorer',
            'es': 'Explorador Global'
        },
        'description': {
            'pt': (
                'Intercâmbio internacional e experiências no exterior que moldaram minha visão sobre ciência de dados e solução de problemas.'
            ),
            'en': (
                'International exchange and overseas experiences that shaped my perspective on data science and problem solving.'
            ),
            'es': (
                'Intercambios internacionales y experiencias en el extranjero que moldearon mi visión sobre ciencia de datos y resolución de problemas.'
            )
        },
        'image': 'images/profile.jpg',
        'position': 'right'
    },
    {
        'type': 'card',
        'title': {
            'pt': 'Open Source Contributor',
            'en': 'Open Source Contributor',
            'es': 'Contribuyente Open Source'
        },
        'description': {
            'pt': (
                'Desenvolvo e compartilho algoritmos open-source. Gosto de contribuir com a comunidade tecnológica.'
            ),
            'en': (
                'I develop and share open-source algorithms. I enjoy contributing to the tech community.'
            ),
            'es': (
                'Desarrollo y comparto algoritmos open-source. Disfruto contribuir con la comunidad tecnológica.'
            )
        },
        'image': 'images/profile.jpg',
        'position': 'left'
    },
    {
        'type': 'card',
        'title': {
            'pt': 'Aprendizado Contínuo',
            'en': 'Continuous Learner',
            'es': 'Aprendizaje Continuo'
        },
        'description': {
            'pt': (
                'Entusiasta por aprendizado contínuo, sempre explorando novas metodologias e ferramentas em ciência de dados.'
            ),
            'en': (
                'Enthusiastic about continuous learning, always exploring new methodologies and tools in data science.'
            ),
            'es': (
                'Entusiasta del aprendizaje continuo, siempre explorando nuevas metodologías y herramientas en ciencia de datos.'
            )
        },
        'image': 'images/profile.jpg',
        'position': 'right'
    }
]
