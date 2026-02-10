/**
 * STREAMTUBE CONFIGURATION
 * Centralized constants for the application.
 */

const CONFIG = {
    // API & External Services
    API_KEY: 'AIzaSyCbsxj1oQCQFUyHsSoVrOV6hu7ECOy25KU', // ⚠️ Public Demo Key
    BASE_URL: 'https://www.googleapis.com/youtube/v3',
    
    // Player Settings
    DEFAULT_VOLUME: 100,
    SPEED_OPTIONS: [1, 1.5, 2],
    
    // UI Settings
    ANIMATION_DELAY_MS: 50,
    TOAST_DURATION: 3000,
    SCROLL_THRESHOLD: 100, // px from bottom for infinite scroll
    
    // Categories
    CATEGORIES: [
        'coding', 'music', 'gaming', 'news', 'live', 
        'ai', 'travel', 'science', 'podcasts', 'design'
    ]
};
