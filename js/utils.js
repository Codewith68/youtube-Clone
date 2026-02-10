/**
 * STREAMTUBE UTILS
 * Helper functions for formatting, math, and data manipulation.
 */

const Utils = {
    /**
     * Formats seconds into MM:SS or HH:MM:SS
     * @param {number} seconds 
     * @returns {string} Formatted time string
     */
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return "0:00";
        
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

         const mStr = m.toString().padStart(2, '0');
        const sStr = s.toString().padStart(2, '0');

        if (h > 0) {
            return `${h}:${mStr}:${sStr}`;
        }
        return `${m}:${sStr}`; // Remove leading zero for minutes if convenient, or keep it: mStr
    },

    /**
     * Shuffles an array using Fisher-Yates algorithm
     * @param {Array} array 
     * @returns {Array} Shuffled array
     */
    shuffleArray(array) {
        const arr = [...array]; // Create copy to avoid mutating original immediately
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    /**
     * Debounce function to limit rate of execution
     */
     debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    },

    /**
         * Generates a random duration string for mock data
     */
//     randomDuration() {
//         return `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
//     }
};
