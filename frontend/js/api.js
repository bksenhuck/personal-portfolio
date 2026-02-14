/**
 * API Client Module
 * Handles all HTTP requests to the backend API
 * Provides data fetching and caching capabilities
 */

// API Configuration
const API_CONFIG = {
    // Use environment variable or fallback to the page origin (works in production
    // when backend serves the frontend). Prefer 127.0.0.1 instead of 'localhost'
    // because some environments resolve 'localhost' to IPv6 (::1) which can
    // point to a different server and cause 404s.
    baseURL: window.ENV?.API_URL || (function(){
        if (typeof window === 'undefined') return 'http://127.0.0.1:5001';
        const proto = window.location.protocol || 'http:';
        let host = window.location.hostname || '127.0.0.1';
        // normalize localhost to IPv4 loopback to avoid IPv6 resolution issues
        if (host === 'localhost') host = '127.0.0.1';
        // include port if present
        const port = window.location.port ? `:${window.location.port}` : '';
        return `${proto}//${host}${port}`;
    })(),
    timeout: 10000,
    cacheExpiry: 5 * 60 * 1000 // 5 minutes
};

// Simple in-memory cache
const cache = {
    data: {},
    timestamps: {},
    
    set(key, value) {
        this.data[key] = value;
        this.timestamps[key] = Date.now();
    },
    
    get(key) {
        const timestamp = this.timestamps[key];
        if (!timestamp) return null;
        
        // Check if cache expired
        if (Date.now() - timestamp > API_CONFIG.cacheExpiry) {
            delete this.data[key];
            delete this.timestamps[key];
            return null;
        }
        
        return this.data[key];
    },
    
    clear() {
        this.data = {};
        this.timestamps = {};
    }
};

/**
 * Generic fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeout);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timeout - API might be cold starting');
        }
        
        throw error;
    }
}

/**
 * Get data with caching support
 */
async function getCached(endpoint, useFallback = true) {
    // Try cache first
    const cached = cache.get(endpoint);
    if (cached) {
        return cached;
    }
    
    try {
        const url = `${API_CONFIG.baseURL}/api/${endpoint}`;
        const data = await fetchWithTimeout(url);
        cache.set(endpoint, data);
        return data;
    } catch (error) {
        console.error(`API Error fetching ${endpoint}:`, error.message);
        
        // Use fallback data if available
        if (useFallback && window.FALLBACK_DATA) {
            console.warn(`Using fallback data for ${endpoint}`);
            return window.FALLBACK_DATA[endpoint] || null;
        }
        
        throw error;
    }
}

/**
 * API Methods
 */
export const api = {
    /**
     * Get all portfolio data in one request (recommended for initial load)
     */
    async getAll() {
        return getCached('all');
    },
    
    /**
     * Get portfolio overview (profile, skills, fun_facts)
     */
    async getPortfolio() {
        return getCached('portfolio');
    },
    
    /**
     * Get projects list
     */
    async getProjects() {
        return getCached('projects');
    },
    
    /**
     * Get professional experience
     */
    async getExperience() {
        return getCached('experience');
    },
    
    /**
     * Get education/academic background
     */
    async getEducation() {
        return getCached('education');
    },
    
    /**
     * Health check
     */
    async healthCheck() {
        try {
            const url = `${API_CONFIG.baseURL}/api/health`;
            return await fetchWithTimeout(url);
        } catch (error) {
            return { status: 'unavailable', error: error.message };
        }
    },
    
    /**
     * Clear cache (useful for debugging or forced refresh)
     */
    clearCache() {
        cache.clear();
    },
    
    /**
     * Configure API (e.g., change base URL)
     */
    configure(config) {
        Object.assign(API_CONFIG, config);
    }
};

/**
 * Initialize API with environment configuration
 */
export function initAPI() {
    // Check if API is reachable
    api.healthCheck().then(health => {
        if (health.status === 'healthy') {
            console.log('✓ API connected:', API_CONFIG.baseURL);
        } else {
            console.warn('⚠ API unavailable, will use fallback data if provided');
        }
    });
}

// For non-module scripts (legacy support)
if (typeof window !== 'undefined') {
    window.api = api;
    window.initAPI = initAPI;
}
