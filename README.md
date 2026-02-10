# Portfólio Pessoal Minimalista

Site pessoal simples e elegante desenvolvido com Flask.

## 🚀 Tecnologias

- Python 3.x
- Flask 3.0.0
- CSS puro (sem frameworks)
- HTML5
- JavaScript vanilla

## ✨ Funcionalidades

- ✅ **Header fixo** com navegação suave
- ✅ **Tema claro/escuro** com persistência em localStorage
- ✅ **Multi-idioma** (Português, Inglês, Espanhol)
- ✅ Design responsivo (mobile-first)
- ✅ Animações CSS suaves
- ✅ SEO otimizado
- ✅ Pronto para produção

## 📁 Estrutura do Projeto

```
project/
├── app.py              # Aplicação Flask
├── requirements.txt    # Dependências
├── Procfile           # Config para deploy
├── templates/
│   └── index.html     # Template principal
├── static/
│   ├── css/
│   │   └── style.css  # Estilos
│   ├── js/
│   │   └── main.js    # Lógica de tema e i18n
│   └── images/        # Imagens (coloque seus arquivos aqui)
├── translations/
│   ├── pt.json        # Tradução Português
│   ├── en.json        # Tradução Inglês
│   └── es.json        # Tradução Espanhol
├── cursor/
│   └── prompt.md      # Diretrizes do projeto
└── README.md
```

## 🔧 Instalação e Execução Local (Windows)

### 1. Clone ou baixe o projeto

```cmd
cd C:\Users\seu-usuario\Documents\projects\personal-portfolio
```

### 2. Crie e ative um ambiente virtual

```cmd
python -m venv venv
venv\Scripts\activate
```

### 3. Instale as dependências

```cmd
pip install -r requirements.txt
```

### 4. Execute o projeto

```cmd
python app.py
```

Ou usando Flask CLI:

```cmd
flask run
```

Acesse: http://localhost:5000

## 🎨 Personalização

### Editar seus dados pessoais

Abra `app.py` e modifique o dicionário `PERFIL`:

```python
PERFIL = {
    'nome': 'Seu Nome',
    'titulo': 'Seu Título',
    'bio': 'Sua bio',
    'email': 'seu@email.com',
    'github': 'https://github.com/seu-usuario',
    'linkedin': 'https://linkedin.com/in/seu-perfil',
    'foto': 'profile.jpg'  # coloque em static/images/
}
```

### Adicionar projetos

Edite a lista `PROJETOS` em `app.py`:

```python
PROJETOS = [
    {
        'titulo': 'Nome do Projeto',
        'descricao': 'Descrição curta',
        'tech': ['Python', 'Flask', 'etc'],
        'url': 'https://github.com/seu-usuario/projeto',
        'imagem': 'projeto.jpg'  # coloque em static/images/
    }
]

### Editar traduções

As traduções estão em arquivos JSON separados em `translations/`:

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
    "bio": "Sua bio aqui...",
    ...
  }
}
```

Edite cada arquivo (`pt.json`, `en.json`, `es.json`) para atualizar as traduções. A estrutura é a mesma em todos os idiomas, apenas os valores mudam.

### Mudança de tema

O tema (claro/escuro) é controlado por:
- Botão no header (ícone sol/lua)
- Salva preferência em localStorage
- Aplica automaticamente na próxima visita
```

### Adicionar imagens

Coloque suas imagens na pasta `static/images/`:

- `profile.jpg` - Foto de perfil (150x150px recomendado)
- `project1.jpg`, `project2.jpg` - Banners dos projetos (400x250px recomendado)

## 🌐 Deploy no Render

### 1. Faça login no Render

Acesse: https://render.com

### 2. Novo Web Service

- Clique em **New +** → **Web Service**
- Conecte seu repositório GitHub/GitLab
- Ou faça upload manual dos arquivos

### 3. Configurações

```
Name: seu-portfolio
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: gunicorn app:app
```

### 4. Variáveis de ambiente (opcional)

Se necessário, adicione:

```
PYTHON_VERSION=3.11
```

### 5. Deploy

Clique em **Create Web Service**

Seu site estará disponível em: `https://seu-portfolio.onrender.com`

## 📦 Deploy em outras plataformas

### Heroku

```bash
heroku login
heroku create seu-portfolio
git push heroku main
```

### PythonAnywhere

1. Upload dos arquivos via FTP ou Git
2. Configure um Web App (Flask)
3. Aponte para `app.py`

### Vercel

```bash
npm install -g vercel
vercel
```

## 🎯 Recursos

✅ Design minimalista dark  
✅ Totalmente responsivo  
✅ Animações CSS suaves  
✅ Pronto para produção  
✅ Sem banco de dados necessário  
✅ Fácil personalização  
✅ SEO-friendly  

## 📝 Licença

Livre para uso pessoal e comercial.

## 🤝 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ e Flask**
