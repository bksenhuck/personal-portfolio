# Personal Portfolio - Data Scientist

Professional portfolio website built with Flask, featuring responsive design, multilingual support, and SEO optimization.

## 🚀 Technologies

- Python 3.x
- Flask 3.0.0
- Pure CSS (no frameworks)
- HTML5
- Vanilla JavaScript

## ✨ Features

- ✅ **Fixed header** with smooth, animated navigation
- ✅ **Light/Dark theme** with localStorage persistence
- ✅ **Multi-language support** (Portuguese, English, Spanish)
- ✅ **Project carousel** simplified (1 project at a time)
- ✅ **Education section** with academic highlights
- ✅ Responsive design (mobile-first)
- ✅ Smooth CSS animations with scroll reveal
- ✅ SEO optimized
- ✅ Modular architecture (PEP8 compliant)
- ✅ Production ready

## 📁 Project Structure

```
personal-portfolio/
├── app.py              # Flask application (Application Factory Pattern)
├── config.py           # Application configuration
├── requirements.txt    # Python dependencies
├── setup.cfg          # PEP8/Flake8 configuration
├── Procfile           # Heroku deployment config
├── data/              # Data modules (separated by domain)
│   ├── __init__.py    # Exports all data
│   ├── profile.py     # Personal information
│   ├── skills.py      # Technical skills
│   ├── projects.py    # Featured projects
│   ├── experience.py  # Professional experience
│   └── education.py   # Educational background
├── templates/
│   └── index.html     # Main template
├── static/
│   ├── css/
│   │   └── style.css  # Responsive styles
│   ├── js/
│   │   └── main.js    # Carousel, theme, and i18n logic
│   └── images/        # Visual assets
├── translations/      # Internationalization files
│   ├── pt.json        # Portuguese
│   ├── en.json        # English
│   └── es.json        # Spanish
└── README.md
```

## 🎯 Architecture

### Design Patterns Implemented
- **Application Factory Pattern**: `create_app()` function for flexibility
- **Separation of Concerns**: Data separated into independent modules
- **PEP 8 Compliance**: Code following Python best practices
- **Configuration Management**: Configurable dev/prod environments
- **Modular Design**: Easy maintenance and scalability

## 🔧 Installation and Local Setup (Windows)

### 1. Clone or download the project

```cmd
cd C:\Users\your-user\Documents\projects\personal-portfolio
```

### 2. Create and activate a virtual environment

```cmd
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies

```cmd
pip install -r requirements.txt
```

### 4. Run the project

```cmd
python app.py
```

Or using Flask CLI:

```cmd
flask run
```

Access: http://localhost:5000

## 🎨 Customization

### Edit Personal Information

Edit the `data/profile.py` file:

```python
PROFILE = {
    'name': 'Your Name',
    'title': 'Your Professional Title',
    'bio': 'Your professional biography',
    'email': 'your@email.com',
    'github': 'https://github.com/your-username',
    'linkedin': 'https://linkedin.com/in/your-profile',
    'photo': 'profile.jpg',  # Place in static/images/
    'domain': 'yourdomain.dev'
}
```

### Add/Edit Projects

Edit the `data/projects.py` file:

```python
PROJECTS = [
    {
        'title': 'Project Name',
        'description': 'Detailed project description',
        'tech': ['Python', 'Flask', 'SQL'],
        'impact': 'Result/impact achieved',
        'url': 'https://github.com/username/project',
        'image': 'project.jpg'  # Place in static/images/
    }
]
```

### Edit Skills

Edit the `data/skills.py` file:

```python
SKILLS = [
    {
        'name': 'Python',
        'level': 95,  # 0-100
        'category': 'programming'
    }
]
```

### Edit Experience

Edit the `data/experience.py` file:

```python
EXPERIENCE = [
    {
        'role': 'Your Job Title',
        'company': 'Company Name',
        'period': '2020 - Present',
        'description': 'Description of your responsibilities'
    }
]
```

### Edit Education

Edit the `data/education.py` file:

```python
EDUCATION = [
    {
        'degree': 'Master of Science in Data Science',
        'institution': 'University Name',
        'period': '2020 - 2022',
        'description': 'Course description and field of study',
        'highlights': [
            'GPA: 3.9/4.0',
            'Thesis: Thesis Title',
            'Awards: Awards/Honors'
        ]
    }
]
```

### Edit Translations

Translations are stored in separate JSON files in the `translations/` folder:

**translations/pt.json:**
```json
{
  "nav": {
    "about": "Sobre",
    "skills": "Habilidades",
    ...
  },
  "hero": {
    "greeting": "Olá, sou",
    "bio": "Your bio here...",
    ...
  }
}
```

Edit each file (`pt.json`, `en.json`, `es.json`) to update translations. The structure is the same in all languages; only the values change.

### Theme Toggle

Theme (light/dark) is controlled by:
- Header button (sun/moon icon)
- Saves preference to localStorage
- Automatically applies on next visit

### Adding Images

Place your images in the `static/images/` folder:

- `profile.jpg` - Profile photo (recommended 150x150px)
- `project1.jpg`, `project2.jpg` - Project banners (recommended 400x250px)

## 🌐 Deploy on Render

### 1. Login to Render

Visit: https://render.com

### 2. New Web Service

- Click **New +** → **Web Service**
- Connect your GitHub/GitLab repository
- Or upload files manually

### 3. Configuration

```
Name: your-portfolio
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

### 4. Environment Variables (optional)

If needed, add:

```
PYTHON_VERSION=3.11
```

### 5. Deploy

Click **Create Web Service**

Your site will be available at: `https://your-portfolio.onrender.com`

## 📦 Deploy on Other Platforms

### Heroku

```bash
heroku login
heroku create your-portfolio
git push heroku main
```

### PythonAnywhere

1. Upload files via FTP or Git
2. Configure a Web App (Flask)
3. Point to `app.py`

### Vercel

```bash
npm install -g vercel
vercel
```

## 🎯 Highlights

✅ Minimalist dark design  
✅ Fully responsive  
✅ Smooth CSS animations  
✅ Production ready  
✅ No database required  
✅ Easy customization  
✅ SEO-friendly  
✅ Professional code

## 📝 License

Free for personal and commercial use.

## 🤝 Support

For questions or issues, please open an issue on GitHub.

---

**Developed with ❤️ and Flask**
