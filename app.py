"""
Brayan Ksenhuck - Data Scientist Portfolio
Personal landing page with SEO optimization
"""

from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Personal Information
PERFIL = {
    'nome': 'Brayan C Ksenhuck',
    'titulo': 'Data Scientist',
    'bio': 'Transforming data into actionable insights and building ML solutions that drive business impact.',
    'email': 'brayan@brayanksenhuck.dev',
    'github': 'https://github.com/brayanksenhuck',
    'linkedin': 'https://linkedin.com/in/brayanksenhuck',
    'foto': 'profile.jpg',
    'domain': 'brayanksenhuck.dev'
}

# Skills
SKILLS = [
    {'nome': 'Python', 'nivel': 95, 'categoria': 'programming'},
    {'nome': 'SQL', 'nivel': 90, 'categoria': 'database'},
    {'nome': 'Machine Learning', 'nivel': 90, 'categoria': 'ml'},
    {'nome': 'Statistics', 'nivel': 85, 'categoria': 'analysis'},
    {'nome': 'Data Visualization', 'nivel': 88, 'categoria': 'viz'},
    {'nome': 'Cloud (AWS/Azure)', 'nivel': 80, 'categoria': 'cloud'},
]

# Featured Projects
PROJETOS = [
    {
        'titulo': 'Customer Churn Prediction',
        'descricao': 'ML model predicting customer churn with 92% accuracy, reducing retention costs by 30%.',
        'tech': ['Python', 'Scikit-learn', 'XGBoost', 'SQL'],
        'impacto': '30% reduction in retention costs',
        'url': 'https://github.com/brayanksenhuck/churn-prediction',
        'imagem': 'project1.jpg'
    },
    {
        'titulo': 'Sales Forecasting Dashboard',
        'descricao': 'Real-time sales forecasting system with interactive dashboards for business decision-making.',
        'tech': ['Python', 'Prophet', 'Plotly', 'PostgreSQL'],
        'impacto': 'Improved forecast accuracy by 25%',
        'url': 'https://github.com/brayanksenhuck/sales-forecast',
        'imagem': 'project2.jpg'
    },
    {
        'titulo': 'NLP Sentiment Analysis',
        'descricao': 'Sentiment analysis pipeline processing 100K+ customer reviews to extract actionable insights.',
        'tech': ['Python', 'Transformers', 'BERT', 'AWS'],
        'impacto': 'Processed 100K+ reviews',
        'url': 'https://github.com/brayanksenhuck/sentiment-analysis',
        'imagem': 'project3.jpg'
    }
]

# Experience
EXPERIENCIA = [
    {
        'cargo': 'Senior Data Scientist',
        'empresa': 'Tech Company',
        'periodo': '2022 - Present',
        'descricao': 'Leading ML initiatives and building predictive models for business optimization.'
    },
    {
        'cargo': 'Data Analyst',
        'empresa': 'Analytics Firm',
        'periodo': '2020 - 2022',
        'descricao': 'Developed data pipelines and created business intelligence dashboards.'
    }
]

@app.route('/')
def home():
    return render_template('index.html', 
                         perfil=PERFIL, 
                         projetos=PROJETOS,
                         skills=SKILLS,
                         experiencia=EXPERIENCIA)

@app.route('/static/translations/<path:filename>')
def translations(filename):
    """Serve translation files"""
    return send_from_directory('translations', filename)

if __name__ == '__main__':
    app.run(debug=True)
