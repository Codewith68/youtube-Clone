/**
 * STREAMTUBE PLAYER
 * Manages the YouTube IFrame Player API.
 */

const Player = {
    instance: null,
    ready: false,
    updateInterval: null,

    init() {
        // This global callback is required by YouTube API
        window.onYouTubeIframeAPIReady = () => {
            this.instance = new YT.Player('youtube-player', {
                height: '100%',
                width: '100%',
                playerVars: {
                    'playsinline': 1,
                    'controls': 0, // Custom controls
                    'rel': 0,
                    'modestbranding': 1
                },
                events: {
                    'onReady': this.onReady.bind(this),
                    'onStateChange': this.onStateChange.bind(this)
                }
            });
        };

        // Load API Script
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    onReady(event) {
        this.ready = true;
    },

    onStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING) {
            this.togglePlayBtn(true);
            DOM.videoLoader.classList.add('hidden');
            this.startProgress();
        } else {
            this.togglePlayBtn(false);
            this.stopProgress();
            if(event.data === YT.PlayerState.BUFFERING) {
                 DOM.videoLoader.classList.remove('hidden');
            }
        }
    },

    loadVideo(videoId) {
        if (!this.ready) return;
        this.instance.loadVideoById(videoId);
    },

    togglePlay() {
        if (!this.ready) return;
        if (this.instance.getPlayerState() === YT.PlayerState.PLAYING) {
            this.instance.pauseVideo();
        } else {
            this.instance.playVideo();
        }
    },

    stop() {
        if (this.ready && this.instance) {
            this.instance.stopVideo();
        }
        this.stopProgress();
    },

    // UI Updates for Player controls
    togglePlayBtn(isPlaying) {
        if (isPlaying) {
            DOM.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            DOM.bigPlayBtn.classList.add('opacity-0', 'hidden'); 
        } else {
            DOM.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            DOM.bigPlayBtn.classList.remove('hidden');
            setTimeout(() => DOM.bigPlayBtn.classList.remove('opacity-0'), 50);
        }
    },

    startProgress() {
        this.stopProgress();
        this.updateInterval = setInterval(() => {
            if (!this.ready || !this.instance.getDuration) return;
            
            const currentTime = this.instance.getCurrentTime();
            const duration = this.instance.getDuration();
            
            if (duration > 0) {
                const percent = (currentTime / duration) * 100;
                DOM.progressFilled.style.width = `${percent}%`;
                DOM.progressScrubber.style.left = `${percent}%`;
                
                DOM.currentTime.textContent = Utils.formatTime(currentTime);
                DOM.duration.textContent = Utils.formatTime(duration);
            }
        }, 1000);
    },

    stopProgress() {
        if (this.updateInterval) clearInterval(this.updateInterval);
    },

    seek(percent) {
        if (!this.ready) return;
        const duration = this.instance.getDuration();
        this.instance.seekTo((percent / 100) * duration, true);
    },

    setVolume(vol) {
        if (!this.ready) return;
        this.instance.setVolume(vol);
        if (vol === 0) {
            DOM.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            this.instance.unMute();
            DOM.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    },

    toggleMute() {
        if (!this.ready) return;
        if (this.instance.isMuted()) {
            this.instance.unMute();
            DOM.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            DOM.volumeSlider.value = this.instance.getVolume() / 100;
        } else {
            this.instance.mute();
            DOM.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            DOM.volumeSlider.value = 0;
        }
    },

    setSpeed(speed) {
        if (!this.ready) return;
        this.instance.setPlaybackRate(speed);
        DOM.speedBtn.textContent = `${speed}x`;
    }
};
