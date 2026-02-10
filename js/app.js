/**
 * STREAMTUBE APP
 * Main entry point. Glues Store, UI, and Player together.
 */

const App = {
    init() {
        this.loadTheme();
        this.setupEventListeners();
        
        // Initial Data Fetch
        this.fetchVideos('coding trends 2025');
        UI.renderShorts(this.getMockShorts()); // Using mock data for shorts
        UI.updateHistory(Store.userData.history);
        
        // Initialize Player logic
        Player.init();
    },

    loadTheme() {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },

    toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    },

    async fetchVideos(query, title = null) {
        try {
            if (!query) query = 'trending';
            
            UI.toggleLoader(true);
            Store.state.searchQuery = query;

            // Simulate Network Delay
            await new Promise(resolve => setTimeout(resolve, 300));

            // Use Local "API" from videos_data.js (simulated via global function if available, or direct if merged)
            // Assuming video_data.js defines VIDEO_DATABASE and search helper
            let results;
            if (typeof searchLocalVideos === 'function') {
                results = searchLocalVideos(query);
            } else {
                // Fallback if video_data not loaded yet
                console.warn("searchLocalVideos not found");
                results = []; 
            }

            Store.setVideos(results);
            UI.renderVideos(results, title || `Results for "${query}"`);

        } catch (error) {
            console.error("Error fetching", error);
            UI.showToast("Failed to load videos");
            UI.toggleLoader(false);
        }
    },

    openVideo(video) {
        Store.state.activeVideo = video;
        Store.addToHistory(video);
        UI.updateHistory(Store.userData.history);

        // Update Modal UI
        DOM.modalTitle.textContent = video.title;
        DOM.infoTitle.textContent = video.title;
        DOM.infoChannel.textContent = video.channel;
        DOM.infoViews.textContent = video.views || 'Like';
        DOM.infoChannelIcon.textContent = video.channel[0];
        
        // Check Like/Save status
        UI.updateActionButtons(
            Store.isLiked(video.id),
            Store.isSaved(video.id)
        );

        DOM.modal.classList.remove('hidden');
        DOM.modal.classList.add('flex');

        Player.loadVideo(video.id);
        this.renderRelatedVideos(video);
    },

    closeVideo() {
        DOM.modal.classList.add('hidden');
        DOM.modal.classList.remove('flex');
        Player.stop();
        Store.state.activeVideo = null;
    },

    renderRelatedVideos(currentVideo) {
        // Find existing or create container
        let container = document.getElementById('related-videos-container');
        if (!container) {
            const infoSection = DOM.modal.querySelector('.w-full.max-w-5xl.mt-4');
            container = document.createElement('div');
            container.id = 'related-videos-container';
            container.className = 'mt-8 border-t border-gray-800 pt-6';
            container.innerHTML = '<h3 class="text-white font-bold text-lg mb-4">Up Next</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="related-grid"></div>';
            infoSection.appendChild(container);
        }
        
        const grid = container.querySelector('#related-grid');
        grid.innerHTML = '';

        // Simple random related strategy
        const allVideos = Store.state.currentVideos;
        const related = Utils.shuffleArray(allVideos.filter(v => v.id !== currentVideo.id)).slice(0, 3);

        related.forEach(v => {
            const item = document.createElement('div');
            item.className = 'flex gap-2 cursor-pointer group';
            item.onclick = () => App.openVideo(v); // Recursive open
            item.innerHTML = `
                <div class="w-40 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0 relative">
                    <img src="${v.thumbnail}" class="w-full h-full object-cover">
                     <div class="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                        ${Utils.randomDuration()}
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-semibold text-white line-clamp-2 group-hover:text-blue-400 transition">${v.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">${v.channel}</p>
                </div>
            `;
            grid.appendChild(item);
        });
    },

    handleSearch() {
        const query = DOM.searchInput.value.trim();
        if (query) this.fetchVideos(query);
    },

    setupEventListeners() {
        // Search
        DOM.searchInput?.addEventListener('change', () => this.handleSearch());
        DOM.searchBtn?.addEventListener('click', () => this.handleSearch());

        // Voice Search
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
    
            const startVoice = () => {
                UI.showToast("Listening...", 2000);
                recognition.start();
            };
    
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (DOM.searchInput) DOM.searchInput.value = transcript;
                if (DOM.mobileSearchInput) DOM.mobileSearchInput.value = transcript;
                this.fetchVideos(transcript);
            };
    
            DOM.voiceBtn?.addEventListener('click', startVoice);
            DOM.mobileVoiceBtn?.addEventListener('click', startVoice);
        }
        
        // Theme
        DOM.themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Modal
        DOM.closeModalBtn?.addEventListener('click', () => this.closeVideo());

        // Sidebar
        DOM.menuBtn?.addEventListener('click', () => {
            DOM.sidebar.classList.toggle('sidebar-collapsed');
        });

        // Chips
        document.querySelectorAll('.chip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const cat = e.target.dataset.category || e.target.innerText;
                if (cat === 'All') this.fetchVideos('trending');
                else this.fetchVideos(cat);
            });
        });

        // Player Controls
        DOM.playPauseBtn?.addEventListener('click', () => Player.togglePlay());
        DOM.bigPlayBtn?.addEventListener('click', () => Player.togglePlay());
        
        DOM.muteBtn?.addEventListener('click', () => Player.toggleMute());
        
        DOM.volumeSlider?.addEventListener('input', (e) => {
            Player.setVolume(e.target.value * 100);
        });

        DOM.speedBtn?.addEventListener('click', () => {
            // Cycle speeds
            const currentSpeedTxt = DOM.speedBtn.textContent.replace('x', '');
            let idx = CONFIG.SPEED_OPTIONS.indexOf(parseFloat(currentSpeedTxt));
            idx = (idx + 1) % CONFIG.SPEED_OPTIONS.length;
            Player.setSpeed(CONFIG.SPEED_OPTIONS[idx]);
        });

        // Seek
        DOM.progressContainer?.addEventListener('click', (e) => {
            const rect = DOM.progressContainer.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            Player.seek(pos * 100);
        });

        // Actions
        DOM.btnLike?.addEventListener('click', () => {
            if(!Store.state.activeVideo) return;
            const isLiked = Store.toggleLike(Store.state.activeVideo);
            UI.showToast(isLiked ? "Added to Liked Videos" : "Removed from Liked Videos");
            UI.updateActionButtons(isLiked, Store.isSaved(Store.state.activeVideo.id));
        });

        DOM.btnWatchLater?.addEventListener('click', () => {
             if(!Store.state.activeVideo) return;
             const isSaved = Store.toggleWatchLater(Store.state.activeVideo);
             UI.showToast(isSaved ? "Saved to Watch Later" : "Removed from Watch Later");
             UI.updateActionButtons(Store.isLiked(Store.state.activeVideo.id), isSaved);
        });

        // Navigation
        DOM.navHome?.addEventListener('click', () => this.fetchVideos('trending', 'Trending'));
        DOM.navTrending?.addEventListener('click', () => this.fetchVideos('trending', 'Trending Now'));
        DOM.navHistory?.addEventListener('click', () => {
            Store.setVideos(Store.userData.history);
            UI.renderVideos(Store.userData.history, "Watch History");
        });
        DOM.navLiked?.addEventListener('click', () => {
            Store.setVideos(Store.userData.liked);
            UI.renderVideos(Store.userData.liked, "Liked Videos");
        });
        
        // Infinite Scroll
        DOM.mainContent?.addEventListener('scroll', Utils.debounce(() => {
            if (DOM.mainContent.scrollTop + DOM.mainContent.clientHeight >= DOM.mainContent.scrollHeight - CONFIG.SCROLL_THRESHOLD) {
                if (Store.state.isLoading) return;
                UI.showToast("Loading more...", 1000);
                // Mock infinite scroll
                Store.state.isLoading = true;
                setTimeout(() => {
                    // Append current videos again with new IDs
                    const moreVideos = Store.state.currentVideos.map(v => ({...v, id: v.id + Math.random()}));
                    UI.renderVideos(moreVideos, null, true);
                    Store.state.isLoading = false;
                }, 1000);
            }
        }, 200));
    },

    getMockShorts() {
        return [
            { id: "SqcY0GlETPk", title: "Mind-blowing CSS trick 🤯", thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg", views: "2.1M" },
            { id: "71h8MZshGSs", title: "JavaScript in 60 seconds ⚡", thumbnail: "https://i.ytimg.com/vi/71h8MZshGSs/maxresdefault.jpg", views: "850K" },
            { id: "KRA26LhuTP4", title: "This AI tool is insane 🤖", thumbnail: "https://i.ytimg.com/vi/KRA26LhuTP4/maxresdefault.jpg", views: "5.3M" },
            { id: "rfscVS0vtbw", title: "React vs Vue in 2025", thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg", views: "1.2M" },
            { id: "jfKfPfyJRdk", title: "Day in my life as a dev 💻", thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg", views: "3.7M" },
        ];
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => App.init());
