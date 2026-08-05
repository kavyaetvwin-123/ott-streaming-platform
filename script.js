// ==========================================
// Store Users
// ==========================================

const users = [
    {
        userId: 101,
        name: "Kavya",
        email: "kavya@gmail.com"
    },
    {
        userId: 102,
        name: "Praveen",
        email: "praveen@gmail.com"
    },
    {
        userId: 103,
        name: "Sirisha",
        email: "sirisha@gmail.com"
    }
];

// Simulate Logged-in User
const loggedInUser = users[1];

// Movie Details
const movie = {

    movieId: Number(localStorage.getItem("movieId")),

    title: "Sample Movie"

};

// ==========================================
// Send Analytics to Spring Boot
// ==========================================

function saveAnalytics(eventType, playbackTime) {

    fetch("http://localhost:8080/analytics", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            userId: loggedInUser.userId,

            movieId: movie.movieId,

            event: eventType,

            playbackTime: playbackTime

        })

    })
        .then(response => response.json())
        .then(data => {

            console.log("✅ Analytics Saved:", data);

        })
        .catch(error => {

            console.error("❌ Error Saving Analytics:", error);

        });

}

// ==========================================
// HLS Video Player
// ==========================================

const video = document.getElementById("video");

if (Hls.isSupported()) {

    const hls = new Hls();

    hls.loadSource("HLS/master.m3u8");

    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {

        console.log("HLS Manifest Loaded");

    });

}
else if (video.canPlayType("application/vnd.apple.mpegurl")) {

    video.src = "HLS/master.m3u8";

}

// ==========================================
// PLAY
// ==========================================

video.addEventListener("play", () => {

    console.log("▶ PLAY");

    saveAnalytics(
        "PLAY",
        video.currentTime
    );

});

// ==========================================
// PAUSE
// ==========================================

video.addEventListener("pause", () => {

    console.log("⏸ PAUSE");

    saveAnalytics(
        "PAUSE",
        video.currentTime
    );

});

// ==========================================
// SEEK
// ==========================================

let previousTime = 0;

video.addEventListener("seeked", () => {

    if (video.currentTime > previousTime) {

        console.log("⏩ SEEK FORWARD");

        saveAnalytics(
            "SEEK_FORWARD",
            video.currentTime
        );

    } else {

        console.log("⏪ SEEK BACKWARD");

        saveAnalytics(
            "SEEK_BACKWARD",
            video.currentTime
        );

    }

    previousTime = video.currentTime;

});

// ==========================================
// VOLUME
// ==========================================

video.addEventListener("volumechange", () => {

    console.log("🔊 Volume Changed");

    saveAnalytics(
        "VOLUME_CHANGE",
        video.currentTime
    );

});

// ==========================================
// WATCH TIME
// ==========================================

let watchTimer = null;

video.addEventListener("play", () => {

    watchTimer = setInterval(() => {

        console.log("Watching:", video.currentTime.toFixed(2));

    }, 10000);

});

video.addEventListener("pause", () => {

    clearInterval(watchTimer);

});

video.addEventListener("ended", () => {

    clearInterval(watchTimer);

});

// ==========================================
// VIDEO COMPLETED
// ==========================================

video.addEventListener("ended", () => {

    console.log("✅ VIDEO COMPLETED");

    saveAnalytics(
        "COMPLETED",
        video.currentTime
    );

});