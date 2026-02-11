# Personal Portfolio

Modern, decoupled portfolio architecture with static frontend and REST API backend, optimized for instant loading and zero cold-start delays on the user interface.

## Architecture

This project uses a separated architecture pattern:

- **Frontend**: Static HTML/CSS/JavaScript deployed on CDN (Vercel/Netlify)
- **Backend**: Flask REST API deployed on Render

### Benefits

- Instant page load (static assets served from CDN)
- API cold starts don't block the UI
- Independent scaling and deployment
- Better developer experience with clear separation of concerns

### Structure

```
personal-portfolio/
├── backend/                  # Flask REST API
│   ├── app.py               # API endpoints
│   ├── config.py            # Configuration
│   ├── requirements.txt     # Python dependencies
│   ├── Procfile             # Render deployment config
│   └── data/                # Data modules
│       ├── __init__.py
│       ├── profile.py
│       ├── skills.py
│       ├── projects.py
│       ├── experience.py
│       ├── education.py
│       └── fun_facts.py
│
├── frontend/                 # Static website
│   ├── index.html           # Static HTML (no templates)
│   ├── vercel.json          # Vercel configuration
│   ├── netlify.toml         # Netlify configuration
│   ├── css/
│   │   └── style.css        # Responsive styles
│   ├── js/
│   │   ├── api.js           # HTTP client with caching
│   │   ├── main-api.js      # Main application
│   │   ├── carousel.js      # Image carousel
│   │   ├── navigation.js    # Menu and URL hash handling
│   │   ├── theme.js         # Dark/Light mode
│   │   └── animations.js    # Scroll animations
│   ├── images/              # Static assets
│   └── translations/        # i18n JSON files
│       ├── en.json
│       ├── es.json
│       └── pt.json
│
└── README.md                # This file
```

## Features

- **Instant Loading**: Frontend loads immediately from CDN
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Persistent theme preference
- **Multilingual**: English, Spanish, Portuguese
- **SEO Optimized**: Meta tags and semantic HTML
- **Modular Codebase**: Clean separation of concerns
- **Client-side Caching**: 5-minute cache for API responses
- **Fallback Support**: Offline data support for resilience

## Technology Stack

### Backend
- Python 3.x
- Flask 3.0.0
- Flask-CORS 4.0.0
- Gunicorn 21.2.0

### Frontend
- Vanilla JavaScript (ES6 modules)
- CSS3 (no frameworks)
- HTML5

### Deployment
- Backend: Render (Web Service)
- Frontend: Vercel or Netlify (Static Site)

## Local Development

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the API:
```bash
python app.py
```

API will be available at `http://localhost:5001`

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Start a local server:
```bash
python -m http.server 8000
```

Frontend will be available at `http://localhost:8000`

## API Endpoints

All endpoints are prefixed with `/api`:

- `GET /api/health` - Health check
- `GET /api/all` - All portfolio data (recommended for initial load)
- `GET /api/portfolio` - Profile, skills, and fun facts
- `GET /api/projects` - Featured projects
- `GET /api/experience` - Professional experience
- `GET /api/education` - Educational background

All responses are JSON formatted.

## Deployment

### Backend (Render)

1. Connect your repository to Render
2. Configure:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
   - Environment: Python 3

3. After deployment, note the API URL

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

3. Update `window.ENV.API_URL` in `index.html` with your backend URL

### Frontend (Netlify)

1. Connect repository to Netlify
2. Configure:
   - Base directory: `frontend`
   - Build command: (leave empty)
   - Publish directory: `.`

3. Update `window.ENV.API_URL` in `index.html` with your backend URL

### CORS Configuration

After deploying the frontend, update the CORS origins in `backend/app.py`:

```python
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:8000",
            "https://your-frontend.vercel.app"  # Add your production URL
        ],
        "methods": ["GET", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Configuration

### API URL

Set the backend API URL in `frontend/index.html`:

```html
<script>
window.ENV = {
    API_URL: 'https://your-api.onrender.com'
};
</script>
```

### Fallback Data

Optional: Add fallback data to `window.FALLBACK_DATA` in `index.html` for offline support.

## Performance

- **Frontend Load Time**: < 1 second (static assets on CDN)
- **API Response Time**: < 500ms (after warm-up)
- **Cold Start**: API only, does not block UI (20-40s on Render free tier)
- **Client Cache**: 5-minute TTL for API responses

## Testing

### Backend
```bash
cd backend
python app.py
curl http://localhost:5001/api/health
```

### Frontend
```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

## Monitoring

Recommended: Set up uptime monitoring (e.g., UptimeRobot) to ping your backend API every 10 minutes to prevent cold starts.

Example endpoint: `https://your-api.onrender.com/api/health`

## License

All rights reserved.

## Contact

For inquiries, please reach out via the contact information on the website.
