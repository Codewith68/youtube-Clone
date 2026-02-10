/**
 * STREAMTUBE UI
 * Responsible for generating HTML and updating the DOM visually.
 * Functional approach: Pure functions where possible.
 */

const UI = {
    // --- Video Cards ---

    createVideoCard(video, index) {
        const card = document.createElement('div');
        card.className = "flex flex-col gap-2.5 cursor-pointer group fade-in video-card-glow";
        card.style.animationDelay = `${index * CONFIG.ANIMATION_DELAY_MS}ms`;
        
        // Attach data to element for event delegation or direct access
        card.dataset.id = video.id;

        const duration = video.duration || Utils.randomDuration();
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
        return card;
    },

    renderVideos(videos, title = null, append = false) {
        if (!append) {
            UI.toggleLoader(false);
            DOM.grid.innerHTML = '';
        }
        
        if (title) DOM.sectionTitle.textContent = title;

        if (videos.length === 0 && !append) {
            UI.renderEmptyState(title);
            return;
        }

        videos.forEach((video, index) => {
            const card = this.createVideoCard(video, index);
            card.onclick = () => App.openVideo(video); // Call global App method
            DOM.grid.appendChild(card);
        });
    },

    renderEmptyState(title) {
        let msg = "No videos found";
        if (title === 'Watch History') msg = "You haven't watched any videos yet.";
        if (title === 'Watch Later') msg = "Your Watch Later list is empty.";
        if (title === 'Liked Videos') msg = "You haven't liked any videos yet.";

        DOM.grid.innerHTML = `<div class="col-span-full text-center text-gray-500 mt-10 flex flex-col items-center">
            <i class="fas fa-video-slash text-4xl mb-3 opacity-50"></i>
            <p class="text-lg font-medium">${msg}</p>
            <button onclick="document.getElementById('nav-home').click()" class="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors">
                Browse Videos
            </button>
        </div>`;
    },

    toggleLoader(show) {
        if (show) {
            DOM.grid.classList.add('hidden');
            DOM.gridLoader.classList.remove('hidden');
        } else {
            DOM.gridLoader.classList.add('hidden');
            DOM.grid.classList.remove('hidden');
        }
    },

    // --- Shorts ---

    renderShorts(shorts) {
        if (!DOM.shortsContainer) return;
        DOM.shortsContainer.innerHTML = '';
        
        shorts.forEach((short, i) => {
            const card = document.createElement('div');
            card.className = 'short-card fade-in cursor-pointer';
            card.style.animationDelay = `${i * 80}ms`;
            card.onclick = () => App.openVideo({ 
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
            DOM.shortsContainer.appendChild(card);
        });
    },

    // --- History Sidebar ---

    updateHistory(history) {
        this.renderHistoryList(DOM.sidebarHistory, history, true);
        this.renderHistoryList(DOM.mobileHistory, history, false);
    },

    renderHistoryList(container, history, isCompact) {
        if(!container) return;
        container.innerHTML = '';
        
        if (history.length === 0) {
            if(isCompact) container.innerHTML = '<p class="text-xs text-gray-500 px-2 italic">No history yet</p>';
            return;
        }

        history.slice(0, 5).forEach(video => {
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
            item.onclick = () => App.openVideo(video);
            container.appendChild(item);
        });
    },

    // --- Toast ---

    showToast(message, duration = CONFIG.TOAST_DURATION) {
        DOM.toastMsg.innerText = message;
        DOM.toast.classList.remove('translate-y-20', 'opacity-0');
        
        setTimeout(() => {
            DOM.toast.classList.add('translate-y-20', 'opacity-0');
        }, duration);
    },

    updateActionButtons(isLiked, isSaved) {
        // Update Like Btn
        if (isLiked) {
            DOM.btnLike.innerHTML = '<i class="fas fa-thumbs-up"></i> <span class="ml-2">Liked</span>';
            DOM.btnLike.classList.add('text-blue-500');
        } else {
            DOM.btnLike.innerHTML = '<i class="far fa-thumbs-up"></i> <span class="ml-2">Like</span>';
            DOM.btnLike.classList.remove('text-blue-500');
        }
    
        // Update Watch Later Btn
        if (isSaved) {
            DOM.btnWatchLater.innerHTML = '<i class="fas fa-check"></i> <span class="ml-2">Saved</span>';
            DOM.btnWatchLater.classList.add('text-green-500');
        } else {
            DOM.btnWatchLater.innerHTML = '<i class="far fa-clock"></i> <span class="ml-2">Save</span>';
            DOM.btnWatchLater.classList.remove('text-green-500');
        }
    }
};
