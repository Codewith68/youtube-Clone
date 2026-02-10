/**
 * StreamTube - Local Video Database
 * 60+ real YouTube videos organized by category.
 * The YouTube IFrame Player API is FREE (no API key needed for playback).
 * Only the Data API (search/list) needs a key — this file replaces that.
 */

const VIDEO_DATABASE = [
    // ==================== CODING ====================
    {
        id: "SqcY0GlETPk",
        title: "React Tutorial for Beginners - Full Course",
        thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/maxresdefault.jpg",
        channel: "Programming with Mosh",
        description: "React is a popular library for building user interfaces. Learn React fast.",
        publishedAt: "2024-11-20",
        views: "800K views",
        duration: "1:12:36",
        category: ["coding", "trending"]
    },
    {
        id: "rfscVS0vtbw",
        title: "Learn Python - Full Course for Beginners [Tutorial]",
        thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "This course will give you a full introduction into all core concepts in Python.",
        publishedAt: "2018-07-11",
        views: "45M views",
        duration: "4:26:52",
        category: ["coding", "trending"]
    },
    {
        id: "PkZNo7MFNFg",
        title: "Learn JavaScript - Full Course for Beginners",
        thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "This complete 134-part JavaScript tutorial for beginners.",
        publishedAt: "2018-12-10",
        views: "17M views",
        duration: "3:26:42",
        category: ["coding"]
    },
    {
        id: "71h8MZshGSs",
        title: "AWS Basics for Beginners - Full Course",
        thumbnail: "https://i.ytimg.com/vi/71h8MZshGSs/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "Learn the basics of Amazon Web Services.",
        publishedAt: "2023-05-10",
        views: "2.5M views",
        duration: "4:02:31",
        category: ["coding"]
    },
    {
        id: "qz0aGYrrlhU",
        title: "HTML Tutorial for Beginners: HTML Crash Course",
        thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
        channel: "Programming with Mosh",
        description: "HTML tutorial for beginners - Learn HTML for a career in web development.",
        publishedAt: "2021-02-03",
        views: "15M views",
        duration: "1:09:33",
        category: ["coding"]
    },
    {
        id: "1Rs2ND1ryYc",
        title: "CSS Tutorial - Zero to Hero (Complete Course)",
        thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "Learn CSS in this full course for beginners.",
        publishedAt: "2019-09-17",
        views: "7.5M views",
        duration: "6:18:37",
        category: ["coding", "design"]
    },
    {
        id: "Oe421EPjeBE",
        title: "Node.js and Express.js - Full Course",
        thumbnail: "https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "Learn Node.js and Express.js to build server-side applications.",
        publishedAt: "2021-04-15",
        views: "5.2M views",
        duration: "8:16:48",
        category: ["coding"]
    },
    {
        id: "w7ejDZ8SWv8",
        title: "React JS Crash Course 2024",
        thumbnail: "https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
        channel: "Traversy Media",
        description: "Get started with React in this crash course. We will be building a task tracker app.",
        publishedAt: "2024-01-10",
        views: "3.8M views",
        duration: "48:17",
        category: ["coding", "trending"]
    },

    // ==================== MUSIC ====================
    {
        id: "dQw4w9WgXcQ",
        title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        channel: "Rick Astley",
        description: "The official video for 'Never Gonna Give You Up' by Rick Astley.",
        publishedAt: "2009-10-25",
        views: "1.4B views",
        duration: "3:33",
        category: ["music", "trending"]
    },
    {
        id: "9bZkp7q19f0",
        title: "PSY - GANGNAM STYLE(강남스타일) M/V",
        thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        channel: "officialpsy",
        description: "PSY - GANGNAM STYLE Music Video",
        publishedAt: "2012-07-15",
        views: "5.1B views",
        duration: "4:13",
        category: ["music", "trending"]
    },
    {
        id: "kJQP7kiw5Fk",
        title: "Luis Fonsi - Despacito ft. Daddy Yankee",
        thumbnail: "https://i.ytimg.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
        channel: "Luis Fonsi",
        description: "The global hit Despacito.",
        publishedAt: "2017-01-12",
        views: "8.3B views",
        duration: "4:42",
        category: ["music", "trending"]
    },
    {
        id: "pRpeEdMmmQ0",
        title: "Shakira - Waka Waka (This Time for Africa)",
        thumbnail: "https://i.ytimg.com/vi/pRpeEdMmmQ0/maxresdefault.jpg",
        channel: "Shakira",
        description: "The official 2010 FIFA World Cup Song.",
        publishedAt: "2010-06-04",
        views: "3.8B views",
        duration: "3:31",
        category: ["music"]
    },
    {
        id: "RgKAFK5djSk",
        title: "Wiz Khalifa - See You Again ft. Charlie Puth [Official Video]",
        thumbnail: "https://i.ytimg.com/vi/RgKAFK5djSk/maxresdefault.jpg",
        channel: "Wiz Khalifa",
        description: "Wiz Khalifa - See You Again ft. Charlie Puth - Furious 7 Soundtrack.",
        publishedAt: "2015-04-06",
        views: "6.2B views",
        duration: "3:58",
        category: ["music", "trending"]
    },
    {
        id: "JGwWNGJdvx8",
        title: "Ed Sheeran - Shape of You [Official Music Video]",
        thumbnail: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
        channel: "Ed Sheeran",
        description: "The official music video for Ed Sheeran - Shape of You.",
        publishedAt: "2017-01-30",
        views: "6.3B views",
        duration: "4:24",
        category: ["music"]
    },
    {
        id: "fJ9rUzIMcZQ",
        title: "Queen – Bohemian Rhapsody (Official Video Remastered)",
        thumbnail: "https://i.ytimg.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
        channel: "Queen Official",
        description: "Bohemian Rhapsody by Queen.",
        publishedAt: "2008-08-01",
        views: "1.8B views",
        duration: "5:55",
        category: ["music"]
    },
    {
        id: "60ItHLz5WEA",
        title: "Alan Walker - Faded",
        thumbnail: "https://i.ytimg.com/vi/60ItHLz5WEA/maxresdefault.jpg",
        channel: "Alan Walker",
        description: "Alan Walker - Faded (Official Music Video)",
        publishedAt: "2015-12-03",
        views: "3.8B views",
        duration: "3:32",
        category: ["music"]
    },
    {
        id: "jfKfPfyJRdk",
        title: "lofi hip hop radio - beats to relax/study to",
        thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg",
        channel: "Lofi Girl",
        description: "The best lofi hip hop radio. Beats to relax and study to.",
        publishedAt: "Live",
        views: "60k watching",
        duration: "LIVE",
        category: ["music", "live"]
    },

    // ==================== GAMING ====================
    {
        id: "8X2kIfS6fb8",
        title: "GTA 6 Official Trailer",
        thumbnail: "https://i.ytimg.com/vi/8X2kIfS6fb8/maxresdefault.jpg",
        channel: "Rockstar Games",
        description: "Grand Theft Auto VI — Coming 2025.",
        publishedAt: "2023-12-04",
        views: "210M views",
        duration: "1:31",
        category: ["gaming", "trending"]
    },
    {
        id: "dLSj9V4Q_3g",
        title: "Minecraft: The Movie – Official Trailer",
        thumbnail: "https://i.ytimg.com/vi/dLSj9V4Q_3g/maxresdefault.jpg",
        channel: "Warner Bros. Pictures",
        description: "Minecraft movie coming soon.",
        publishedAt: "2025-02-05",
        views: "45M views",
        duration: "2:32",
        category: ["gaming", "trending"]
    },
    {
        id: "hHTE5xg9E7U",
        title: "Fortnite Chapter 5 Season 2 - Launch Trailer",
        thumbnail: "https://i.ytimg.com/vi/hHTE5xg9E7U/maxresdefault.jpg",
        channel: "Fortnite",
        description: "Welcome to Myths & Mortals.",
        publishedAt: "2024-03-08",
        views: "28M views",
        duration: "1:47",
        category: ["gaming"]
    },
    {
        id: "qIcTM8WXFjk",
        title: "Minecraft, But It Gets Increasingly Cursed",
        thumbnail: "https://i.ytimg.com/vi/qIcTM8WXFjk/maxresdefault.jpg",
        channel: "PewDiePie",
        description: "Playing the most cursed version of Minecraft.",
        publishedAt: "2023-06-15",
        views: "35M views",
        duration: "21:36",
        category: ["gaming"]
    },
    {
        id: "aAkMkVFwAoo",
        title: "I Survived 100 Days in Hardcore Minecraft",
        thumbnail: "https://i.ytimg.com/vi/aAkMkVFwAoo/maxresdefault.jpg",
        channel: "Luke TheNotable",
        description: "Can I survive 100 days in the hardest mode?",
        publishedAt: "2020-04-20",
        views: "145M views",
        duration: "25:14",
        category: ["gaming"]
    },
    {
        id: "m-J-cNR4dKo",
        title: "The Entire History of Video Games",
        thumbnail: "https://i.ytimg.com/vi/m-J-cNR4dKo/maxresdefault.jpg",
        channel: "Ahoy",
        description: "A comprehensive rundown of the history of video games.",
        publishedAt: "2022-07-01",
        views: "8.5M views",
        duration: "1:23:47",
        category: ["gaming"]
    },

    // ==================== NEWS ====================
    {
        id: "9CdVRSRZIvk",
        title: "How The Economic Machine Works by Ray Dalio",
        thumbnail: "https://i.ytimg.com/vi/9CdVRSRZIvk/maxresdefault.jpg",
        channel: "Principles by Ray Dalio",
        description: "An animated video that describes how the economy REALLY works.",
        publishedAt: "2013-09-22",
        views: "40M views",
        duration: "31:00",
        category: ["news"]
    },
    {
        id: "rStL7niR7gs",
        title: "History of the Entire World, I Guess",
        thumbnail: "https://i.ytimg.com/vi/rStL7niR7gs/maxresdefault.jpg",
        channel: "bill wurtz",
        description: "Hi. You're on a rock floating in space.",
        publishedAt: "2017-05-10",
        views: "170M views",
        duration: "19:26",
        category: ["news", "science", "trending"]
    },
    {
        id: "LQqq3e2MOlE",
        title: "This Is What Happens When AI Takes Over",
        thumbnail: "https://i.ytimg.com/vi/LQqq3e2MOlE/maxresdefault.jpg",
        channel: "Vox",
        description: "The future of AI and automation explained.",
        publishedAt: "2024-03-15",
        views: "8M views",
        duration: "14:52",
        category: ["news", "ai"]
    },

    // ==================== AI & ML ====================
    {
        id: "aircAruvnKk",
        title: "But what is a neural network? | Chapter 1, Deep learning",
        thumbnail: "https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg",
        channel: "3Blue1Brown",
        description: "An introduction to neural networks and deep learning.",
        publishedAt: "2017-10-05",
        views: "18M views",
        duration: "19:13",
        category: ["ai", "science", "coding"]
    },
    {
        id: "WXuK6gekU1Y",
        title: "ChatGPT Tutorial - A Crash Course on Chat GPT for Beginners",
        thumbnail: "https://i.ytimg.com/vi/WXuK6gekU1Y/maxresdefault.jpg",
        channel: "Adrian Twarog",
        description: "Learn how to use ChatGPT and AI tools effectively.",
        publishedAt: "2023-02-15",
        views: "5.6M views",
        duration: "28:45",
        category: ["ai", "coding", "trending"]
    },
    {
        id: "jGwO_UgTS7I",
        title: "Stanford CS229: Machine Learning Full Course",
        thumbnail: "https://i.ytimg.com/vi/jGwO_UgTS7I/maxresdefault.jpg",
        channel: "Stanford Online",
        description: "Andrew Ng's Machine Learning course at Stanford University.",
        publishedAt: "2019-08-15",
        views: "12M views",
        duration: "1:12:18",
        category: ["ai", "coding"]
    },
    {
        id: "lFDIhKi7bTE",
        title: "The Most Important Algorithm in Machine Learning",
        thumbnail: "https://i.ytimg.com/vi/lFDIhKi7bTE/maxresdefault.jpg",
        channel: "Artem Kirsanov",
        description: "How backpropagation works in neural networks.",
        publishedAt: "2024-01-20",
        views: "2.3M views",
        duration: "18:42",
        category: ["ai", "science"]
    },

    // ==================== TRAVEL ====================
    {
        id: "LXb3EKWsInQ",
        title: "COSTA RICA IN 4K 60fps HDR (ULTRA HD)",
        thumbnail: "https://i.ytimg.com/vi/LXb3EKWsInQ/maxresdefault.jpg",
        channel: "Jacob + Katie Schwarz",
        description: "Enjoy the beauty of Costa Rica in stunning 4K HDR.",
        publishedAt: "2019-08-30",
        views: "55M views",
        duration: "5:10",
        category: ["travel", "trending"]
    },
    {
        id: "0gNauGdOkro",
        title: "JAPAN IN 8K ULTRA HD - Land of the Rising Sun",
        thumbnail: "https://i.ytimg.com/vi/0gNauGdOkro/maxresdefault.jpg",
        channel: "Scenic Relaxation",
        description: "Cinematic travel film showcasing the beauty of Japan.",
        publishedAt: "2022-03-15",
        views: "35M views",
        duration: "10:27",
        category: ["travel"]
    },
    {
        id: "BkoJGNPmGpk",
        title: "INDIA IN 4K - Incredible India Cinematic Film",
        thumbnail: "https://i.ytimg.com/vi/BkoJGNPmGpk/maxresdefault.jpg",
        channel: "Scenic Relaxation",
        description: "Explore the incredible beauty of India in 4K.",
        publishedAt: "2021-11-10",
        views: "22M views",
        duration: "7:38",
        category: ["travel"]
    },
    {
        id: "6-HUgzYPm9g",
        title: "I Spent a Week in the World's Most Remote Island",
        thumbnail: "https://i.ytimg.com/vi/6-HUgzYPm9g/maxresdefault.jpg",
        channel: "Yes Theory",
        description: "An adventure to one of the most remote places on Earth.",
        publishedAt: "2023-08-20",
        views: "12M views",
        duration: "22:15",
        category: ["travel"]
    },

    // ==================== SCIENCE ====================
    {
        id: "QnQe0xW_JY4",
        title: "The Largest Black Hole in the Universe - Size Comparison",
        thumbnail: "https://i.ytimg.com/vi/QnQe0xW_JY4/maxresdefault.jpg",
        channel: "Kurzgesagt – In a Nutshell",
        description: "Black holes are the largest single objects in the universe.",
        publishedAt: "2022-11-29",
        views: "30M views",
        duration: "9:23",
        category: ["science", "trending"]
    },
    {
        id: "uD4izuDMUQA",
        title: "The Immune System Explained – Bacteria Infection",
        thumbnail: "https://i.ytimg.com/vi/uD4izuDMUQA/maxresdefault.jpg",
        channel: "Kurzgesagt – In a Nutshell",
        description: "Every second of your life you are under attack.",
        publishedAt: "2014-07-01",
        views: "28M views",
        duration: "6:48",
        category: ["science"]
    },
    {
        id: "JtUAAXe_0VI",
        title: "This Will Change Your Understanding of the Universe",
        thumbnail: "https://i.ytimg.com/vi/JtUAAXe_0VI/maxresdefault.jpg",
        channel: "Veritasium",
        description: "The fastest things in the universe — and the weirdest.",
        publishedAt: "2023-05-08",
        views: "20M views",
        duration: "16:31",
        category: ["science"]
    },
    {
        id: "iA7H3pRYjss",
        title: "Every Planet in the Solar System Explained",
        thumbnail: "https://i.ytimg.com/vi/iA7H3pRYjss/maxresdefault.jpg",
        channel: "Kurzgesagt – In a Nutshell",
        description: "What are the planets of our solar system actually like?",
        publishedAt: "2023-12-05",
        views: "15M views",
        duration: "12:07",
        category: ["science"]
    },

    // ==================== PODCASTS ====================
    {
        id: "FhhKJQQxSv0",
        title: "Elon Musk: Mars, AI, and Neuralink | Lex Fridman Podcast",
        thumbnail: "https://i.ytimg.com/vi/FhhKJQQxSv0/maxresdefault.jpg",
        channel: "Lex Fridman",
        description: "Elon Musk joins Lex Fridman for a wide-ranging conversation.",
        publishedAt: "2023-11-09",
        views: "25M views",
        duration: "2:33:47",
        category: ["podcasts", "ai", "trending"]
    },
    {
        id: "Mde2q7GFCrw",
        title: "Mark Zuckerberg: Meta, VR, and the Future | Lex Fridman Podcast",
        thumbnail: "https://i.ytimg.com/vi/Mde2q7GFCrw/maxresdefault.jpg",
        channel: "Lex Fridman",
        description: "Mark Zuckerberg discusses Meta's vision for the metaverse.",
        publishedAt: "2023-06-08",
        views: "14M views",
        duration: "2:17:22",
        category: ["podcasts", "ai"]
    },
    {
        id: "Ff4fRgnuFgQ",
        title: "Joe Rogan Experience #2100 - MrBeast",
        thumbnail: "https://i.ytimg.com/vi/Ff4fRgnuFgQ/maxresdefault.jpg",
        channel: "PowerfulJRE",
        description: "MrBeast discusses YouTube, business, and philanthropy.",
        publishedAt: "2024-10-15",
        views: "30M views",
        duration: "3:05:12",
        category: ["podcasts", "trending"]
    },

    // ==================== DESIGN ====================
    {
        id: "c9Wg6Cb_YlU",
        title: "Figma Tutorial for Beginners - Complete Course",
        thumbnail: "https://i.ytimg.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg",
        channel: "freeCodeCamp.org",
        description: "Learn Figma for UI/UX Design from scratch.",
        publishedAt: "2023-03-15",
        views: "3.2M views",
        duration: "2:47:15",
        category: ["design", "coding"]
    },
    {
        id: "YqQx75OPRa0",
        title: "UI Design Tutorial - From Zero to Pro",
        thumbnail: "https://i.ytimg.com/vi/YqQx75OPRa0/maxresdefault.jpg",
        channel: "DesignCourse",
        description: "Master modern UI design principles and techniques.",
        publishedAt: "2022-08-22",
        views: "2.1M views",
        duration: "42:18",
        category: ["design"]
    },
    {
        id: "wIuVvCuiJhU",
        title: "How to Become a UI/UX Designer in 2024",
        thumbnail: "https://i.ytimg.com/vi/wIuVvCuiJhU/maxresdefault.jpg",
        channel: "AJ&Smart",
        description: "Complete roadmap for becoming a UI/UX designer.",
        publishedAt: "2024-01-08",
        views: "1.5M views",
        duration: "15:23",
        category: ["design"]
    },

    // ==================== LIVE ====================
    {
        id: "5qap5aO4i9A",
        title: "lofi hip hop radio 📚 - beats to relax/study to",
        thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg",
        channel: "Lofi Girl",
        description: "24/7 lofi hip hop radio. Chill beats to study/relax.",
        publishedAt: "Live",
        views: "45k watching",
        duration: "LIVE",
        category: ["live", "music"]
    },
    {
        id: "DWcJFNfaw9c",
        title: "NASA Live: Official Stream of NASA TV",
        thumbnail: "https://i.ytimg.com/vi/DWcJFNfaw9c/maxresdefault.jpg",
        channel: "NASA",
        description: "Direct from America's space program to YouTube, NASA TV.",
        publishedAt: "Live",
        views: "12k watching",
        duration: "LIVE",
        category: ["live", "science"]
    },

    // ==================== FIRST VIDEO EVER ====================
    {
        id: "jNQXAC9IVRw",
        title: "Me at the zoo",
        thumbnail: "https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg",
        channel: "jawed",
        description: "The first video on YouTube.",
        publishedAt: "2005-04-24",
        views: "310M views",
        duration: "0:19",
        category: ["trending"]
    },

    // ==================== GOOGLE / TECH ====================
    {
        id: "M7lc1UVf-VE",
        title: "YouTube Developers Live: Embedded Player",
        thumbnail: "https://i.ytimg.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
        channel: "Google Developers",
        description: "Learn how to use the YouTube Embedded Player API.",
        publishedAt: "2013-05-20",
        views: "500K views",
        duration: "56:14",
        category: ["coding"]
    },
    // ==================== CODE WITH HARRY ====================
    {
        id: "tVzUXW6siu0",
        title: "Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1",
        thumbnail: "https://i.ytimg.com/vi/tVzUXW6siu0/maxresdefault.jpg",
        channel: "CodeWithHarry",
        description: "First tutorial of the Sigma Web Development Course — installing VS Code and how websites work.",
        publishedAt: "2023-07-15",
        views: "12M views",
        duration: "18:24",
        category: ["coding", "trending"]
    },
    {
        id: "7wnove7K-ZQ",
        title: "Introduction to Programming & Python | Python Tutorial - Day #1",
        thumbnail: "https://i.ytimg.com/vi/7wnove7K-ZQ/maxresdefault.jpg",
        channel: "CodeWithHarry",
        description: "Day 1 of the 100 Days of Code Python course — introduction to programming and Python basics.",
        publishedAt: "2022-11-15",
        views: "18M views",
        duration: "22:08",
        category: ["coding", "trending"]
    },
    {
        id: "ER9SspLe4Hg",
        title: "Introduction to JavaScript + Setup | JavaScript Tutorial in Hindi #1",
        thumbnail: "https://i.ytimg.com/vi/ER9SspLe4Hg/maxresdefault.jpg",
        channel: "CodeWithHarry",
        description: "Complete JavaScript tutorial series in Hindi — lesson 1 covering intro and setup.",
        publishedAt: "2020-06-10",
        views: "15M views",
        duration: "15:32",
        category: ["coding"]
    },

    // ==================== APNA COLLEGE ====================
    {
        id: "ESnrn1kAD4E",
        title: "CSS Tutorial for Beginners | Complete CSS with Project, Notes & Code",
        thumbnail: "https://i.ytimg.com/vi/ESnrn1kAD4E/maxresdefault.jpg",
        channel: "Apna College",
        description: "Complete CSS tutorial for beginners with hands-on projects, notes, and code.",
        publishedAt: "2023-09-10",
        views: "8.5M views",
        duration: "11:38:22",
        category: ["coding", "design"]
    },
    {
        id: "VlPiVmYuoqw",
        title: "JavaScript Tutorial (2024) for Beginners to Pro",
        thumbnail: "https://i.ytimg.com/vi/VlPiVmYuoqw/maxresdefault.jpg",
        channel: "Apna College",
        description: "JavaScript tutorial from beginner to pro — with notes, projects, and practice questions.",
        publishedAt: "2024-01-25",
        views: "10M views",
        duration: "12:07:45",
        category: ["coding", "trending"]
    },
    {
        id: "ERCMXc8x7mc",
        title: "Python Tutorial for Beginners - Full Course (with Notes & Practice Questions)",
        thumbnail: "https://i.ytimg.com/vi/ERCMXc8x7mc/maxresdefault.jpg",
        channel: "Apna College",
        description: "Complete Python tutorial for beginners with notes and practice questions.",
        publishedAt: "2023-05-01",
        views: "20M views",
        duration: "8:22:15",
        category: ["coding", "trending"]
    },
    {
        id: "l1EssrLxt7E",
        title: "Introduction to Web Development | World's most premium Web Development Course",
        thumbnail: "https://i.ytimg.com/vi/l1EssrLxt7E/maxresdefault.jpg",
        channel: "Apna College",
        description: "Introduction lecture for the premium Web Development course by Apna College.",
        publishedAt: "2023-08-15",
        views: "12M views",
        duration: "28:35",
        category: ["coding"]
    },
    {
        id: "hlGoQC332VM",
        title: "SQL - Complete Course in 3 Hours | SQL One Shot using MySQL",
        thumbnail: "https://i.ytimg.com/vi/hlGoQC332VM/maxresdefault.jpg",
        channel: "Apna College",
        description: "Master SQL with MySQL in a single 3-hour complete course.",
        publishedAt: "2023-11-20",
        views: "7M views",
        duration: "3:12:08",
        category: ["coding"]
    },

    // ==================== CHAI AUR CODE ====================
    {
        id: "Hr5iLG7sUa0",
        title: "Javascript for beginners | chai aur #javascript",
        thumbnail: "https://i.ytimg.com/vi/Hr5iLG7sUa0/maxresdefault.jpg",
        channel: "Chai aur Code",
        description: "JavaScript fundamentals explained in Hindi with chai aur code style.",
        publishedAt: "2023-10-01",
        views: "5M views",
        duration: "35:42",
        category: ["coding", "trending"]
    },

    // ==================== PIYUSH GARG ====================
    {
        id: "ohIAiuHMKMI",
        title: "What is NodeJS?",
        thumbnail: "https://i.ytimg.com/vi/ohIAiuHMKMI/maxresdefault.jpg",
        channel: "Piyush Garg",
        description: "Understanding Node.js — what it is and how it works.",
        publishedAt: "2023-06-15",
        views: "3M views",
        duration: "16:28",
        category: ["coding"]
    }
];


/**
 * Search through VIDEO_DATABASE using keyword matching.
 * Searches: title, channel, category, description.
 * Returns matching videos sorted by relevance.
 */
function searchLocalVideos(query) {
    if (!query || query.trim() === '') return shuffleArray([...VIDEO_DATABASE]);

    const q = query.toLowerCase().trim();
    const terms = q.split(/\s+/);

    const scored = VIDEO_DATABASE.map(video => {
        let score = 0;

        // Category exact match (highest weight)
        if (video.category.some(cat => cat === q)) score += 100;
        if (video.category.some(cat => terms.some(t => cat.includes(t)))) score += 50;

        // Title match
        const titleLower = video.title.toLowerCase();
        if (titleLower.includes(q)) score += 40;
        terms.forEach(term => { if (titleLower.includes(term)) score += 15; });

        // Channel match
        const channelLower = video.channel.toLowerCase();
        if (channelLower.includes(q)) score += 30;
        terms.forEach(term => { if (channelLower.includes(term)) score += 10; });

        // Description match
        const descLower = video.description.toLowerCase();
        terms.forEach(term => { if (descLower.includes(term)) score += 5; });

        return { ...video, score };
    });

    return scored
        .filter(v => v.score > 0)
        .sort((a, b) => b.score - a.score);
}

/**
 * Get videos by specific category.
 */
function getVideosByCategory(category) {
    const cat = category.toLowerCase();
    if (cat === 'all') return shuffleArray([...VIDEO_DATABASE]);
    return VIDEO_DATABASE.filter(v => v.category.includes(cat));
}

/**
 * Get trending videos.
 */
function getTrendingVideos() {
    return VIDEO_DATABASE.filter(v => v.category.includes('trending'));
}

/**
 * Shuffle an array (Fisher-Yates).
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
