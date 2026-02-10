/**
 * StreamTube - YouTube Clone Logic
 * Handles Video Data (YouTube API), Rendering, Player Controls (IFrame API), Search, and Theme.
 */

/* =========================================
   1. Configuration & State
   ========================================= */

// ⚠️ REPLACE WITH YOUR REAL API KEY
const API_KEY = 'AIzaSyCbsxj1oQCQFUyHsSoVrOV6hu7ECOy25KU'; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

let currentVideos = [];
let watchedHistory = JSON.parse(localStorage.getItem('watchedHistory')) || [];
let player; // YouTube Player instance
let isPlayerReady = false;
let progressInterval; 

/* =========================================
   2. DOM Elements
   ========================================= */

const elements = {
    grid: document.getElementById('video-grid'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    voiceBtn: document.getElementById('voice-search-btn'),
    mobileSearchInput: document.getElementById('mobile-search-input'),
    mobileSearchBtn: document.getElementById('mobile-search-btn'),
    mobileVoiceBtn: document.getElementById('mobile-voice-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    
    // Modal & Player
    modal: document.getElementById('video-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    // Note: 'main-video' tag is removed, we use 'youtube-player' div for IFrame
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
    loader: document.getElementById('video-loader'),
    
    // Info
    modalTitle: document.getElementById('modal-title'),
    infoTitle: document.getElementById('info-title'),
    infoChannel: document.getElementById('info-channel'),
    infoViews: document.getElementById('info-views'),
    infoChannelIcon: document.getElementById('info-channel-icon'),
    btnLike: document.getElementById('btn-like'),
    btnWatchLater: document.getElementById('btn-watch-later'),
    btnShare: document.getElementById('btn-share'),

    // History & Sidebar
    sidebarHistory: document.getElementById('sidebar-history-list'),
    mobileHistory: document.getElementById('mobile-history-list'),
    
    // Navigation items
    navHome: document.getElementById('nav-home'),
    navTrending: document.getElementById('nav-trending'),
    navSubscriptions: document.getElementById('nav-subscriptions'),
    navHistory: document.getElementById('nav-history'),
    navWatchLater: document.getElementById('nav-watch-later'),
    navLiked: document.getElementById('nav-liked'),
    
    // Chips
    categoryChips: document.getElementById('category-chips'),

    // Titles & Loaders
    sectionTitle: document.getElementById('section-title'),
    gridLoader: document.getElementById('grid-loader'),

    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toast-msg')
};

let likedVideos = JSON.parse(localStorage.getItem('likedVideos')) || [];
let watchLaterVideos = JSON.parse(localStorage.getItem('watchLaterVideos')) || [];
let currentActiveVideo = null; // Track currently open video for Like/Save actions

/* =========================================
   3. Initialization
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 2. Initial Data Fetch
    fetchVideos('coding trends 2025');
    renderShorts();

    // 3. UI Setup
    updateHistoryUI();
    loadTheme();
    setupEventListeners();
    setupNavigation();
});

// YouTube IFrame API Ready Callback
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        playerVars: {
            'playsinline': 1,
            'controls': 0, // We use custom controls
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    isPlayerReady = true;
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        updatePlayBtnState(true);
        elements.loader.classList.add('hidden');
        startProgressLoop();
    } else {
        updatePlayBtnState(false);
        stopProgressLoop();
        if(event.data === YT.PlayerState.BUFFERING) {
             elements.loader.classList.remove('hidden');
        }
    }
}

let isLoadingMore = false;
async function handleInfiniteScroll() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    if (mainContent.scrollTop + mainContent.clientHeight >= mainContent.scrollHeight - 100) {
        if (isLoadingMore) return;
        isLoadingMore = true;
        
        // Show small loader at bottom (conceptually, or just append)
        showToast("Loading more videos...", 1000);

        // Simulate fetch delay
        setTimeout(() => {
            // Mock appending current videos again to simulate infinite content
            // In a real app, we'd fetch page 2 with tokens
            const newVideos = currentVideos.map(v => ({...v, id: v.id + Math.random()})); // unique-ish IDs
            renderVideos(newVideos, null, true);
            isLoadingMore = false;
        }, 1500);
    }
}

/* =========================================
   4. API Data Fetching
   ========================================= */

// Video data is now loaded from videos_data.js (VIDEO_DATABASE)
// See: searchLocalVideos(), getVideosByCategory(), getTrendingVideos()

// Shorts data for the Shorts section
const mockShorts = [
    { id: "SqcY0GlETPk", title: "Mind-blowing CSS trick 🤯", thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg", views: "2.1M" },
    { id: "71h8MZshGSs", title: "JavaScript in 60 seconds ⚡", thumbnail: "https://i.ytimg.com/vi/71h8MZshGSs/maxresdefault.jpg", views: "850K" },
    { id: "KRA26LhuTP4", title: "This AI tool is insane 🤖", thumbnail: "https://i.ytimg.com/vi/KRA26LhuTP4/maxresdefault.jpg", views: "5.3M" },
    { id: "rfscVS0vtbw", title: "React vs Vue in 2025", thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg", views: "1.2M" },
    { id: "jfKfPfyJRdk", title: "Day in my life as a dev 💻", thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg", views: "3.7M" },
    { id: "M7lc1UVf-VE", title: "How I learned to code in 3 months", thumbnail: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg", views: "990K" },
    { id: "LXb3EKWsInQ", title: "Satisfying code compilation ✨", thumbnail: "https://i.ytimg.com/vi/LXb3EKWsInQ/maxresdefault.jpg", views: "4.1M" },
    { id: "dQw4w9WgXcQ", title: "One line of code that changes everything", thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", views: "6.2M" }
];

async function fetchVideos(query, title = null) {
    try {
        if (!query) query = 'trending';
        
        // Visual feedback
        showGridLoader();
        updateActiveChip(query);

        // Use local video database for search/filtering
        let results;
        const lowerQuery = query.toLowerCase();

        // Check if query matches a category
        const categories = ['coding', 'music', 'gaming', 'news', 'live', 'ai', 'travel', 'science', 'podcasts', 'design'];
        if (categories.includes(lowerQuery) || lowerQuery === 'all') {
            results = getVideosByCategory(lowerQuery);
        } else {
            results = searchLocalVideos(query);
        }

        // Fallback: if no results, show all
        if (results.length === 0) {
            results = shuffleArray([...VIDEO_DATABASE]).slice(0, 12);
            if (!title) title = `No exact matches for "${query}" — Showing recommendations`;
        }

        currentVideos = results;

        if (title) elements.sectionTitle.textContent = title;
        else elements.sectionTitle.textContent = `Results for "${query}"`;

        // Simulate a brief loading delay for UX feel
        await new Promise(resolve => setTimeout(resolve, 300));
        renderVideos(currentVideos);

    } catch (error) {
        console.error("Error:", error);
        showToast("Something went wrong");
        renderVideos(shuffleArray([...VIDEO_DATABASE]).slice(0, 12), "Recommended");
    }
}

async function fetchTrendingVideos() {
    try {
        showGridLoader();
        elements.sectionTitle.textContent = "🔥 Trending Now";
        
        // Reset chips
        document.querySelectorAll('.chip-btn').forEach(c => c.classList.remove('active'));

        // Use local trending data
        const trendingVideos = getTrendingVideos();
        currentVideos = trendingVideos;

        await new Promise(resolve => setTimeout(resolve, 300));
        renderVideos(currentVideos);

    } catch (error) {
        console.error("Error:", error);
        showToast("Something went wrong");
        renderVideos(shuffleArray([...VIDEO_DATABASE]).slice(0, 12), "Trending Now");
    }
}

function showGridLoader() {
    elements.grid.classList.add('hidden');
    elements.gridLoader.classList.remove('hidden');
}

function hideGridLoader() {
    elements.gridLoader.classList.add('hidden');
    elements.grid.classList.remove('hidden');
}

/* =========================================
   5. Rendering Logic
   ========================================= */

function renderVideos(videos, titleOverride = null, append = false) {
    hideGridLoader();
    if (!append) {
        elements.grid.innerHTML = '';
    }
    
    if (titleOverride) elements.sectionTitle.textContent = titleOverride;
    
    if (videos.length === 0 && !append) {
        let msg = "No videos found";
        if (titleOverride === 'Watch History') msg = "You haven't watched any videos yet.";
        if (titleOverride === 'Watch Later') msg = "Your Watch Later list is empty.";
        if (titleOverride === 'Liked Videos') msg = "You haven't liked any videos yet.";

        elements.grid.innerHTML = `<div class="col-span-full text-center text-gray-500 mt-10 flex flex-col items-center">
            <i class="fas fa-video-slash text-4xl mb-3 opacity-50"></i>
            <p class="text-lg font-medium">${msg}</p>
            <button onclick="document.getElementById('nav-home').click()" class="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
                Browse Videos
            </button>
        </div>`;
        return;
    }

    videos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = "flex flex-col gap-2.5 cursor-pointer group fade-in video-card-glow";
        card.style.animationDelay = `${index * 50}ms`;
        card.onclick = () => openVideo(video);

        const duration = video.duration || `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
        const isLive = video.publishedAt === 'Live';

        card.innerHTML = `
            <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800/50">
                <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy">
                <div class="play-overlay absolute inset-0 flex items-center justify-center">
                    <div class="w-11 h-11 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                        <i class="fas fa-play text-white text-sm ml-0.5"></i>
                    </div>
                </div>
                ${isLive 
                    ? '<div class="absolute bottom-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>LIVE</div>'
                    : `<div class="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">${duration}</div>`
                }
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-1.5 bg-black/60 backdrop-blur-sm rounded-full hover:bg-black/80 transition" onclick="event.stopPropagation()" title="Watch Later">
                        <i class="far fa-clock text-white text-xs"></i>
                    </button>
                </div>
            </div>
            <div class="flex gap-3 px-0.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] shrink-0 mt-0.5">
                     <div class="w-full h-full rounded-full bg-[#0f0f0f] flex items-center justify-center text-white font-bold text-xs">
                        ${video.channel[0]}
                     </div>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-[13px] font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug group-hover:text-white transition-colors">${video.title}</h3>
                    <p class="text-[12px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1 hover:text-gray-300 transition-colors cursor-pointer">
                        ${video.channel}
                        <i class="fas fa-check-circle text-[9px] text-blue-400" title="Verified"></i>
                    </p>
                    <p class="text-[11px] text-gray-500 dark:text-gray-500">${video.views && video.views !== 'Unknown views' ? video.views + ' • ' : ''}${video.publishedAt}</p>
                </div>
                <button class="self-start mt-1 p-1 rounded-full hover:bg-white/10 transition opacity-0 group-hover:opacity-100" onclick="event.stopPropagation()">
                    <i class="fas fa-ellipsis-v text-gray-400 text-xs"></i>
                </button>
            </div>
        `;
        elements.grid.appendChild(card);
    });
}

// Render Shorts Section
function renderShorts() {
    const container = document.getElementById('shorts-container');
    if (!container) return;
    container.innerHTML = '';
    
    mockShorts.forEach((short, i) => {
        const card = document.createElement('div');
        card.className = 'short-card fade-in cursor-pointer';
        card.style.animationDelay = `${i * 80}ms`;
        card.onclick = () => openVideo({ 
            id: short.id, 
            title: short.title, 
            thumbnail: short.thumbnail, 
            channel: "StreamTube Shorts", 
            views: short.views + " views",
            publishedAt: "Short"
        });
        card.innerHTML = `
            <img src="${short.thumbnail}" alt="${short.title}" loading="lazy">
            <div class="short-info">
                <h4>${short.title}</h4>
                <p>${short.views} views</p>
            </div>
            <div class="absolute top-2 left-2">
                <span class="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <i class="fas fa-bolt text-[8px]"></i>SHORT
                </span>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateHistoryUI() {
    renderHistoryList(elements.sidebarHistory, true);
    renderHistoryList(elements.mobileHistory, false);
}

function renderHistoryList(container, isCompact) {
    container.innerHTML = '';
    if (watchedHistory.length === 0) {
        if(isCompact) container.innerHTML = '<p class="text-xs text-gray-500 px-2 italic">No history yet</p>';
        return;
    }

    watchedHistory.slice(0, 5).forEach(video => {
        const item = document.createElement('div');
        if (isCompact) {
            item.className = "flex items-center gap-3 py-2 px-4 cursor-pointer hover:opacity-80 transition-opacity duration-200 group";
            item.innerHTML = `
                <div class="w-24 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-700 relative shadow-sm">
                    <img src="${video.thumbnail}" class="w-full h-full object-cover">
                </div>
                <div class="min-w-0 flex-1 flex flex-col justify-center">
                    <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">${video.title}</h4>
                    <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 truncate flex items-center gap-1">
                        ${video.channel}
                    </p>
                </div>
            `;
        } else {
             item.innerHTML = `
                <div class="w-32 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-700">
                    <img src="${video.thumbnail}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">${video.title}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${video.channel}</p>
                </div>
            `;
        }
        container.appendChild(item);
    });
}

const mockSubscriptions = [
    { name: "Traversy Media", icon: "T" },
    { name: "Fireship", icon: "F" },
    { name: "Web Dev Simplified", icon: "W" },
    { name: "The Net Ninja", icon: "N" },
    { name: "FreeCodeCamp", icon: "C" },
    { name: "Kevin Powell", icon: "K" }
];

function renderSubscriptions() {
    hideGridLoader();
    elements.grid.innerHTML = '';
    elements.sectionTitle.textContent = "Subscriptions";

    // Subscriptions Header List
    const subHeader = document.createElement('div');
    subHeader.className = "col-span-full flex gap-4 overflow-x-auto pb-4 mb-2 no-scrollbar";
    mockSubscriptions.forEach(sub => {
        const item = document.createElement('div');
        item.className = "flex flex-col items-center gap-2 min-w-[80px] cursor-pointer hover:scale-105 transition";
        item.innerHTML = `
            <div class="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold border-2 border-transparent hover:border-white transition">
                ${sub.icon}
            </div>
            <span class="text-xs text-center text-gray-700 dark:text-gray-300 w-full truncate">${sub.name}</span>
        `;
        subHeader.appendChild(item);
    });
    elements.grid.appendChild(subHeader);

    if (currentVideos.length > 0) {
        const title = document.createElement('div');
        title.className = "col-span-full font-bold text-lg text-gray-900 dark:text-white mt-2";
        title.textContent = "New Videos";
        elements.grid.appendChild(title);
        
        currentVideos.forEach(video => {
            const card = document.createElement('div');
            card.className = "flex flex-col gap-2 cursor-pointer group";
            card.onclick = () => openVideo(video);
            card.innerHTML = `
                <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800">
                    <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    <div class="play-overlay absolute inset-0 flex items-center justify-center">
                        <i class="fas fa-play text-white text-3xl drop-shadow-lg"></i>
                    </div>
                </div>
                <div class="flex gap-3 mt-1 px-1">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                        ${video.channel[0]}
                    </div>
                    <div class="flex-1">
                        <h3 class="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-blue-500 transition-colors">${video.title}</h3>
                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-1 hover:text-gray-900 dark:hover:text-white">${video.channel}</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">${video.views && video.views !== 'Unknown views' ? video.views + ' • ' : ''} ${video.publishedAt}</p>
                    </div>
                </div>
            `;
            elements.grid.appendChild(card);
        });
    }
}

/* =========================================
   6. Player Logic (Custom Controls -> IFrame)
   ========================================= */

function openVideo(video) {
    currentActiveVideo = video;
    addToHistory(video);
    
    // Update Info
    elements.modalTitle.textContent = video.title;
    elements.infoTitle.textContent = video.title;
    elements.infoChannel.textContent = video.channel;
    elements.infoViews.textContent = video.views || 'Like';
    elements.infoChannelIcon.textContent = video.channel[0];

    // Update Action Buttons State
    updateActionButtons(video);

    // Show Modal
    elements.modal.classList.remove('hidden');
    elements.modal.classList.add('flex');
    
    if (isPlayerReady) {
        player.loadVideoById(video.id);
    } 

    // Render Related Videos in Modal
    renderRelatedVideos(video);
}

function renderRelatedVideos(currentVideo) {
    // Find container or create it if not exists
    let relatedContainer = document.getElementById('related-videos-container');
    if (!relatedContainer) {
        const infoSection = elements.modal.querySelector('.w-full.max-w-5xl.mt-4'); // Target info section wrapper
        relatedContainer = document.createElement('div');
        relatedContainer.id = 'related-videos-container';
        relatedContainer.className = 'mt-8 border-t border-gray-800 pt-6';
        relatedContainer.innerHTML = '<h3 class="text-white font-bold text-lg mb-4">Up Next</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="related-grid"></div>';
        infoSection.appendChild(relatedContainer);
    }

    const startIdx = Math.floor(Math.random() * (currentVideos.length - 4));
    const related = currentVideos.slice(Math.max(0, startIdx), Math.max(0, startIdx) + 3); 
    const grid = relatedContainer.querySelector('#related-grid');
    grid.innerHTML = ''; // Clear previous

    related.forEach(v => {
        if(v.id === currentVideo.id) return;
        const item = document.createElement('div');
        item.className = 'flex gap-2 cursor-pointer group';
        item.onclick = () => {
             // Close modal and reopen (or just load) - simple way for now
             if(isPlayerReady) player.loadVideoById(v.id);
             // Update info without closing
             elements.modalTitle.textContent = v.title;
             elements.infoTitle.textContent = v.title;
             elements.infoChannel.textContent = v.channel;
             // re-render related
             renderRelatedVideos(v);
        };
        item.innerHTML = `
            <div class="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0 relative">
                <img src="${v.thumbnail}" class="w-full h-full object-cover">
                 <div class="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                    ${Math.floor(Math.random() * 10) + 1}:00
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition">${v.title}</h4>
                <p class="text-xs text-gray-400 mt-1">${v.channel}</p>
                <p class="text-xs text-gray-500">${v.views || '10K views'}</p>
            </div>
        `;
        grid.appendChild(item);
    });
}

function closePlayer() {
    elements.modal.classList.add('hidden');
    elements.modal.classList.remove('flex');
    if (isPlayerReady) {
        player.stopVideo();
    }
    currentActiveVideo = null;
}

// Controls
function togglePlay() {
    if (!isPlayerReady) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function updatePlayBtnState(isPlaying) {
    if (isPlaying) {
        elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        elements.bigPlayBtn.classList.add('opacity-0', 'hidden'); 
    } else {
        elements.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        elements.bigPlayBtn.classList.remove('hidden');
        setTimeout(() => elements.bigPlayBtn.classList.remove('opacity-0'), 50);
    }
}

function startProgressLoop() {
    stopProgressLoop();
    progressInterval = setInterval(() => {
        if (!isPlayerReady || !player.getDuration) return;
        
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        
        if (duration > 0) {
            const percent = (currentTime / duration) * 100;
            elements.progressFilled.style.width = `${percent}%`;
            elements.progressScrubber.style.left = `${percent}%`;
            
            elements.currentTime.textContent = formatTime(currentTime);
            elements.duration.textContent = formatTime(duration);
        }
    }, 1000);
}

function stopProgressLoop() {
    if (progressInterval) clearInterval(progressInterval);
}

// Seek
const seek = (e) => {
    if (!isPlayerReady) return;
    const rect = elements.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const duration = player.getDuration();
    player.seekTo(pos * duration, true);
};

// Volume
elements.muteBtn.addEventListener('click', () => {
    if (!isPlayerReady) return;
    if (player.isMuted()) {
        player.unMute();
        elements.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        elements.volumeSlider.value = player.getVolume() / 100;
    } else {
        player.mute();
        elements.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        elements.volumeSlider.value = 0;
    }
});

elements.volumeSlider.addEventListener('input', (e) => {
    if (!isPlayerReady) return;
    const vol = e.target.value * 100;
    player.setVolume(vol);
    if (vol === 0) {
        elements.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        player.unMute();
        elements.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
});

// Speed
const speeds = [1, 1.5, 2];
let speedIdx = 0;
elements.speedBtn.addEventListener('click', () => {
    if (!isPlayerReady) return;
    speedIdx = (speedIdx + 1) % speeds.length;
    const newSpeed = speeds[speedIdx];
    player.setPlaybackRate(newSpeed);
    elements.speedBtn.textContent = `${newSpeed}x`;
});

// --- Action Buttons (Like / Watch Later) ---

function updateActionButtons(video) {
    const isLiked = likedVideos.some(v => v.id === video.id);
    const isWatchLater = watchLaterVideos.some(v => v.id === video.id);

    // Update Like Btn
    if (isLiked) {
        elements.btnLike.innerHTML = '<i class="fas fa-thumbs-up"></i> <span class="ml-2">Liked</span>';
        elements.btnLike.classList.add('text-blue-500');
    } else {
        elements.btnLike.innerHTML = '<i class="far fa-thumbs-up"></i> <span class="ml-2">Like</span>';
        elements.btnLike.classList.remove('text-blue-500');
    }

    // Update Watch Later Btn
    if (isWatchLater) {
        elements.btnWatchLater.innerHTML = '<i class="fas fa-check"></i> <span class="ml-2">Saved</span>';
        elements.btnWatchLater.classList.add('text-green-500');
    } else {
        elements.btnWatchLater.innerHTML = '<i class="far fa-clock"></i> <span class="ml-2">Save</span>';
        elements.btnWatchLater.classList.remove('text-green-500');
    }
}

function toggleLike() {
    if (!currentActiveVideo) return;
    const idx = likedVideos.findIndex(v => v.id === currentActiveVideo.id);
    
    if (idx === -1) {
        likedVideos.push(currentActiveVideo);
        showToast("Added to Liked Videos");
    } else {
        likedVideos.splice(idx, 1);
        showToast("Removed from Liked Videos");
    }
    
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
    updateActionButtons(currentActiveVideo);
}

function toggleWatchLater() {
    if (!currentActiveVideo) return;
    const idx = watchLaterVideos.findIndex(v => v.id === currentActiveVideo.id);
    
    if (idx === -1) {
        watchLaterVideos.push(currentActiveVideo);
        showToast("Saved to Watch Later");
    } else {
        watchLaterVideos.splice(idx, 1);
        showToast("Removed from Watch Later");
    }
    
    localStorage.setItem('watchLaterVideos', JSON.stringify(watchLaterVideos));
    updateActionButtons(currentActiveVideo);
}


/* =========================================
   7. Event Listeners & Helpers
   ========================================= */

function setupEventListeners() {
    // Search
    elements.searchInput.addEventListener('change', (e) => fetchVideos(e.target.value)); 
    elements.searchBtn.addEventListener('click', () => fetchVideos(elements.searchInput.value));
    
    // Voice - (Previous logic)
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';

        const startVoice = () => {
            showToast("Listening...", 2000);
            recognition.start();
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            elements.searchInput.value = transcript;
            elements.mobileSearchInput.value = transcript;
            fetchVideos(transcript);
        };

        elements.voiceBtn.addEventListener('click', startVoice);
        elements.mobileVoiceBtn.addEventListener('click', startVoice);
    }

    // Theme & Modal
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.closeModalBtn.addEventListener('click', closePlayer);

    // Sidebar Toggle
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-collapsed');
        });
    }
    
    elements.playPauseBtn.addEventListener('click', togglePlay);
    elements.bigPlayBtn.addEventListener('click', togglePlay);
    elements.categoryChips.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        elements.categoryChips.scrollLeft += evt.deltaY;
    });

    // Infinite Scroll
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.addEventListener('scroll', handleInfiniteScroll);
    }
    
    // Actions
    elements.btnLike.addEventListener('click', toggleLike);
    elements.btnWatchLater.addEventListener('click', toggleWatchLater);

    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', () => {
        const container = document.getElementById('player-container');
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    // Seek bindings
    let isDragging = false;
    elements.progressContainer.addEventListener('click', seek);
    elements.progressContainer.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', (e) => {
        if (isDragging) seek(e);
    });

    // Share
    elements.btnShare.addEventListener('click', () => {
        if (!currentActiveVideo) return;
        const link = `https://youtube.com/watch?v=${currentActiveVideo.id}`;
        navigator.clipboard.writeText(link).then(() => {
            showToast("Link copied to clipboard!");
        }).catch(() => {
            showToast("Failed to copy link");
        });
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (elements.modal.classList.contains('hidden')) return; // Only if player open
        // Ignore if typing in inputs (though modal covers them, good safety)
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        switch(e.key.toLowerCase()) {
            case ' ': // Space
            case 'k':
                e.preventDefault();
                togglePlay();
                break;
            case 'm':
                elements.muteBtn.click();
                break;
            case 'f':
                elements.fullscreenBtn.click();
                break;
            case 'arrowright':
                if (isPlayerReady) {
                    const t = player.getCurrentTime() + 5;
                    player.seekTo(t, true);
                    showToast("+5s", 500);
                }
                break;
            case 'arrowleft':
                if (isPlayerReady) {
                    const t = player.getCurrentTime() - 5;
                    player.seekTo(t, true);
                    showToast("-5s", 500);
                }
                break;
        }
    });
}

function setupNavigation() {
    // Helper to set active sidebar item
    const setActive = (el) => {
        document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active-nav'));
        el.classList.add('active-nav');
        elements.categoryChips.classList.remove('hidden');
        // Show shorts section on home
        const shortsSection = document.getElementById('shorts-section');
        if (shortsSection) shortsSection.style.display = (el === elements.navHome) ? 'block' : 'none';
    };

    elements.navHome.addEventListener('click', () => {
        setActive(elements.navHome);
        fetchVideos('coding trends 2025', 'Recommended');
    });

    elements.navTrending.addEventListener('click', () => {
        setActive(elements.navTrending);
        fetchTrendingVideos();
    });

    elements.navSubscriptions.addEventListener('click', () => {
        setActive(elements.navSubscriptions);
        renderSubscriptions();
        elements.categoryChips.classList.add('hidden');
    });
    
    elements.navHistory.addEventListener('click', () => {
        setActive(elements.navHistory);
        renderVideos(watchedHistory, 'Watch History');
        elements.categoryChips.classList.add('hidden'); 
    });

    elements.navWatchLater.addEventListener('click', () => {
        setActive(elements.navWatchLater);
        renderVideos(watchLaterVideos, 'Watch Later');
        elements.categoryChips.classList.add('hidden');
    });

    elements.navLiked.addEventListener('click', () => {
        setActive(elements.navLiked);
        renderVideos(likedVideos, 'Liked Videos');
        elements.categoryChips.classList.add('hidden');
    });

    // Chip Filtering (new chip-btn class)
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const category = chip.getAttribute('data-category');
            if (category === 'All') fetchVideos('coding trends 2025', 'Recommended');
            else fetchVideos(category, category);
        });
    });
}

function updateActiveChip(query) {
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
        const cat = chip.getAttribute('data-category').toLowerCase();
        if (query.toLowerCase().includes(cat) && cat !== 'all') {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        }
    });
}

function addToHistory(video) {
    watchedHistory = watchedHistory.filter(v => v.id !== video.id);
    watchedHistory.unshift(video);
    if (watchedHistory.length > 20) watchedHistory.pop();
    localStorage.setItem('watchedHistory', JSON.stringify(watchedHistory));
    updateHistoryUI();
}

function formatViews(views) {
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views;
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
        return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Ripple Effect Helper
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Attach ripple to all buttons with 'relative' class or just specific ones
function attachRippleEffects() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        // Ensure button is relative for absolute positioning of ripple
        const style = window.getComputedStyle(btn);
        if (style.position === 'static') {
            btn.classList.add('relative', 'overflow-hidden');
        } else {
             btn.classList.add('overflow-hidden');
        }
        btn.addEventListener('click', createRipple);
    });
}

// init ripple on load
// init ripple on load
document.addEventListener('DOMContentLoaded', () => { 
    setTimeout(() => {
        attachRippleEffects();
        setupCustomTooltips();
    }, 1000); 
});

function setupCustomTooltips() {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    document.body.appendChild(tooltip);

    const showTooltip = (e, text) => {
        tooltip.textContent = text;
        tooltip.classList.remove('hidden');
        tooltip.classList.add('visible');
        moveTooltip(e);
    };

    const moveTooltip = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        tooltip.style.left = `${x + 10}px`;
        tooltip.style.top = `${y + 10}px`;
        
        // Boundary check (simple)
        if (x + tooltip.offsetWidth > window.innerWidth) {
             tooltip.style.left = `${x - tooltip.offsetWidth - 10}px`;
        }
        if (y + tooltip.offsetHeight > window.innerHeight) {
             tooltip.style.top = `${y - tooltip.offsetHeight - 10}px`;
        }
    };

    const hideTooltip = () => {
        tooltip.classList.remove('visible');
    };

    document.body.addEventListener('mouseover', (e) => {
        const target = e.target.closest('[title]');
        if (target) {
            const title = target.getAttribute('title');
            if (title) {
                target.setAttribute('data-tooltip', title);
                target.removeAttribute('title');
                showTooltip(e, title);
                target.addEventListener('mousemove', moveTooltip);
                target.addEventListener('mouseleave', () => {
                    hideTooltip();
                    target.setAttribute('title', title);
                    target.removeAttribute('data-tooltip');
                    target.removeEventListener('mousemove', moveTooltip);
                }, { once: true });
            }
        }
    });
}
    


function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
}

function showToast(msg, duration = 3000) {
    elements.toastMsg.textContent = msg;
    elements.toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        elements.toast.classList.add('translate-y-20', 'opacity-0');
    }, duration);
}

// Greeting - Dynamic Sidebar Header
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting = "Welcome";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    // target specifically the "You" header
    const youHeader = Array.from(document.querySelectorAll('#sidebar h3')).find(h => h.textContent.trim() === 'You');
    
    if (youHeader) {
        youHeader.innerHTML = `${greeting}, You <i class="fas fa-chevron-right text-[10px] ml-1"></i>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
});
