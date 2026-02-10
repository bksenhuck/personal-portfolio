# SEO-Focused Flask Personal Website Prompt (Data Scientist)

You are a senior full-stack developer and SEO specialist with experience building **personal brand landing pages for Data Scientists**.

I want to build a **personal landing page website** using **Python (Flask)**, focused on my professional profile as a **Data Scientist**.  
The website represents **Brayan Ksenhuck** and will be published at **https://brayanksenhuck.dev**. My name is Brayan C Ksenhuck.

The site should be **simple, fast, SEO-optimized, and visually distinctive**, suitable for showcasing skills, projects, and professional experience.

---

## Core Requirements

- Backend: **Flask (Python)**
- Deployment target: **Render**
- Static website (no database, no authentication)
- Local static assets (images, CSS)
- Clean, modern, minimal design (dark or light theme)
- Fully responsive (mobile-first)
- **Fixed navigation header** with smooth scrolling to sections
- **Theme toggle** (light/dark mode with localStorage persistence)
- **Multi-language support** (PT-BR, EN, ES) with structured translation files

---

## UI/UX Features

### Navigation Header
- Fixed header with:
  - Logo/Name
  - Navigation links: About, Skills, Projects, Experience, Contact
  - Theme toggle button (sun/moon icon)
  - Language selector dropdown (flags: 🇧🇷 🇺🇸 🇪🇸)
- Sticky on scroll with smooth animations
- Mobile hamburger menu for responsive design

### Theme System
- Light and dark themes
- CSS variables for consistent theming
- Toggle persists in localStorage
- Smooth transition animations

### Internationalization (i18n)
- Separate translation files for easy maintenance:
  - `translations/pt.json`
  - `translations/en.json`
  - `translations/es.json`
- All text content translatable
- Language preference saved in localStorage
- Flag-based visual selector

---

## SEO & Landing Page Requirements

- Semantic HTML (`header`, `main`, `section`, `article`, `footer`)
- SEO-optimized `<title>` and `<meta name="description">` referencing:
  - **Brayan Ksenhuck – Data Scientist**
- Relevant `<meta name="keywords">` for Data Science and Machine Learning
- Open Graph and Twitter meta tags using:
  - Domain: `brayanksenhuck.dev`
  - Preview title and description tailored to a Data Scientist personal brand
- Fast load time and excellent Lighthouse SEO score

### Hero Section

- Professional headline (e.g.  
  **“Brayan Ksenhuck — Data Scientist”**)
- Short value proposition emphasizing data-driven impact
- Clear call-to-action:
  - “View Projects”
  - “Get in Touch”

---

## Page Sections

- **Hero**
- **About**
  - Short professional bio for Brayan Ksenhuck as a Data Scientist
- **Skills**
  - Python, SQL, Machine Learning, Statistics, Data Visualization, Cloud
- **Projects**
  - Case-study style projects with business impact
- **Experience / Education**
- **Contact**
  - Links to GitHub, LinkedIn, and email

SEO rules:
- Use a single `<h1>`
- Logical `<h2>` / `<h3>` hierarchy
- Descriptive `alt` attributes for all images

---

## Project Structure

```text
project/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js          # Theme toggle & i18n logic
│   └── images/
│       └── profile.jpg
├── translations/
│   ├── pt.json               # Portuguese (default)
│   ├── en.json               # English
│   └── es.json               # Spanish
└── README.md
```

### Translation File Structure

Each JSON file contains all translatable strings:
```json
{
  "nav": {
    "about": "About",
    "skills": "Skills",
    "projects": "Projects",
    "experience": "Experience",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm",
    "cta_projects": "View Projects",
    "cta_contact": "Get in Touch"
  },
  "sections": { ... }
}
```
