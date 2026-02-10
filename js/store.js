/**
 * STREAMTUBE STORE
 * Manages the application state (videos, user preferences, history).
 */

const Store = {
    state: {
        currentVideos: [],
        activeVideo: null, // The video currently playing
        searchQuery: '',
        isLoading: false,
        isPlayerReady: false,
    },

    // Persistent Data (LocalStorage)
    userData: {
        history: JSON.parse(localStorage.getItem('watchedHistory')) || [],
        liked: JSON.parse(localStorage.getItem('likedVideos')) || [],
        watchLater: JSON.parse(localStorage.getItem('watchLaterVideos')) || []
    },

    // Actions
    setVideos(videos) {
        this.state.currentVideos = videos;
    },

    addToHistory(video) {
        // Remove duplicates (move to top)
        this.userData.history = this.userData.history.filter(v => v.id !== video.id);
        this.userData.history.unshift(video);
        this._save('watchedHistory', this.userData.history);
    },

    toggleLike(video) {
        const idx = this.userData.liked.findIndex(v => v.id === video.id);
        if (idx === -1) {
            this.userData.liked.push(video);
            return true; // Added
        } else {
            this.userData.liked.splice(idx, 1);
            return false; // Removed
        }
        this._save('likedVideos', this.userData.liked);
    },

    toggleWatchLater(video) {
        const idx = this.userData.watchLater.findIndex(v => v.id === video.id);
        if (idx === -1) {
            this.userData.watchLater.push(video);
            return true; // Added
        } else {
            this.userData.watchLater.splice(idx, 1);
            return false; // Removed
        }
        this._save('watchLaterVideos', this.userData.watchLater);
    },

    isLiked(videoId) {
        return this.userData.liked.some(v => v.id === videoId);
    },

    isSaved(videoId) {
        return this.userData.watchLater.some(v => v.id === videoId);
    },

    // Internal Helper
    _save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
