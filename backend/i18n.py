from flask import request


def get_lang(req: request) -> str:
    """Determine language for the current request.

    Order of precedence:
    1. Query parameter `?lang=` if provided and non-empty
    2. Cookie `lang` if present
    3. Default to 'pt'
    """
    # Query param takes precedence
    lang = None
    try:
        lang = req.args.get('lang')
    except Exception:
        lang = None

    if lang:
        return lang

    # Fallback to cookie
    try:
        lang = req.cookies.get('lang')
    except Exception:
        lang = None

    return lang or 'pt'


def translate_field(field, lang: str):
    """Translate a single field.

    If the field is a dict (language map), return the requested language
    or fall back to 'pt'. Otherwise return the field unchanged.
    """
    if isinstance(field, dict):
        # Try exact language, then fallback to pt, then any available string
        return field.get(lang) or field.get('pt') or next(iter(field.values()), None)
    return field


def _translate_value(value, lang: str):
    # Recursive translator for nested structures
    if isinstance(value, dict):
        # If this dict looks like a language map (has pt/en/es keys), translate it
        keys = set(value.keys())
        if {'pt', 'en', 'es'}.intersection(keys):
            return translate_field(value, lang)
        # Otherwise translate each value recursively
        return {k: _translate_value(v, lang) for k, v in value.items()}
    if isinstance(value, list):
        return [_translate_value(v, lang) for v in value]
    # base case: string or other
    return translate_field(value, lang)


def translate_dataset(dataset, lang: str):
    """Translate an arbitrary dataset (dict or list) returning a translated copy.

    This leaves non-text data (images, urls, numeric fields) unchanged.
    """
    return _translate_value(dataset, lang)
