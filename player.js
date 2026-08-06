// ==========================================
// Logged-in User
// ==========================================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    alert("Please login first.");
    window.location.href = "index.html";
}

// ==========================================
// Selected Movie
// ==========================================

const movieId = localStorage.getItem("movieId");

if (!movieId) {
    alert("No movie selected.");
    window.location.href = "home.html";
}

// ==========================================
// Video Player
// ==========================================

const video = document.getElementById("video");

// Replace this with your actual HLS file path
const videoSource = "HLS/master.m3u8";

if (Hls.isSupported()) {

    const hls = new Hls();

    hls.loadSource(videoSource);

    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {

        console.log("HLS Manifest Loaded");

    });

} else if (video.canPlayType("application/vnd.apple.mpegurl")) {

    video.src = videoSource;

}

// ==========================================
// Save Analytics
// ==========================================

function saveAnalytics(eventType, playbackTime) {

    fetch("https://ott-streaming-backend-production.up.railway.app/analytics", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userId: loggedInUser.id,
            movieId: Number(movieId),
            eventType: eventType,
            playbackTime: playbackTime

        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to save analytics");
        }

        return response.json();

    })

    .then(data => {

        console.log("Analytics Saved:", data);

    })

    .catch(error => {

        console.error(error);

    });

}

// ==========================================
// PLAY
// ==========================================

video.addEventListener("play", () => {

    console.log("PLAY");

    saveAnalytics("PLAY", video.currentTime);

});

// ==========================================
// PAUSE
// ==========================================

video.addEventListener("pause", () => {

    console.log("PAUSE");

    saveAnalytics("PAUSE", video.currentTime);

});

// ==========================================
// SEEK
// ==========================================

let previousTime = 0;

video.addEventListener("seeked", () => {

    if (video.currentTime > previousTime) {

        saveAnalytics("SEEK_FORWARD", video.currentTime);

    } else {

        saveAnalytics("SEEK_BACKWARD", video.currentTime);

    }

    previousTime = video.currentTime;

});

// ==========================================
// VOLUME CHANGE
// ==========================================

video.addEventListener("volumechange", () => {

    saveAnalytics("VOLUME_CHANGE", video.currentTime);

});

// ==========================================
// WATCH TIMER
// ==========================================

let watchTimer = null;

video.addEventListener("play", () => {

    watchTimer = setInterval(() => {

        console.log("Watching: " + video.currentTime.toFixed(2) + " sec");

    }, 10000);

});

video.addEventListener("pause", () => {

    clearInterval(watchTimer);

});

video.addEventListener("ended", () => {

    clearInterval(watchTimer);

});

// ==========================================
// COMPLETED
// ==========================================

video.addEventListener("ended", () => {

    console.log("Video Completed");

    saveAnalytics("COMPLETED", video.currentTime);

});