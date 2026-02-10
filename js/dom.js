/**
 * STREAMTUBE DOM ELEMENTS
 * Centralized references to all DOM elements used in the app.
 */

const DOM = {
    // Layout
    grid: document.getElementById('video-grid'),
    mainContent: document.getElementById('main-content'),
    sidebar: document.getElementById('sidebar'),
    menuBtn: document.getElementById('menu-btn'),
    
    // Search
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    voiceBtn: document.getElementById('voice-search-btn'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    mobileSearchBtn: document.getElementById('mobile-search-btn'),
    mobileVoiceBtn: document.getElementById('mobile-voice-btn'),
    
    // Theme & UI
    themeToggle: document.getElementById('theme-toggle'),
    categoryChips: document.getElementById('category-chips'),
    sectionTitle: document.getElementById('section-title'),
    gridLoader: document.getElementById('grid-loader'),
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg'),

    // Player Modal
    modal: document.getElementById('video-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    playerContainer: document.getElementById('player-container'),
    youtubePlayer: document.getElementById('youtube-player'),
    videoLoader: document.getElementById('video-loader'),
    
    // Player Controls
    playPauseBtn: document.getElementById('play-pause-btn'),
    bigPlayBtn: document.getElementById('big-play-btn'),
    muteBtn: document.getElementById('mute-btn'),
    volumeSlider: document.getElementById('volume-slider'),
    progressContainer: document.getElementById('progress-container'),
    progressFilled: document.getElementById('progress-filled'),
    progressScrubber: document.getElementById('progress-scrubber'),
    currentTime: document.getElementById('current-time'),
    duration: document.getElementById('duration'),
    speedBtn: document.getElementById('speed-btn'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    
    // Video Info in Modal
    modalTitle: document.getElementById('modal-title'),
    infoTitle: document.getElementById('info-title'),
    infoChannel: document.getElementById('info-channel'),
    infoViews: document.getElementById('info-views'),
    infoChannelIcon: document.getElementById('info-channel-icon'),
    btnLike: document.getElementById('btn-like'),
    btnWatchLater: document.getElementById('btn-watch-later'),
    btnShare: document.getElementById('btn-share'),

    // History & Shorts
    sidebarHistory: document.getElementById('sidebar-history-list'),
    mobileHistory: document.getElementById('mobile-history-list'),
    shortsContainer: document.getElementById('shorts-container'),

    // Navigation Items
    navHome: document.getElementById('nav-home'),
    navTrending: document.getElementById('nav-trending'),
    navSubscriptions: document.getElementById('nav-subscriptions'),
    navHistory: document.getElementById('nav-history'),
    navWatchLater: document.getElementById('nav-watch-later'),
    navLiked: document.getElementById('nav-liked'),
};
