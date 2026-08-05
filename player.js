// ======================================
// Logged-in User
// ======================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));
const movieId = localStorage.getItem("movieId");

// Current Session Start Time
const sessionStart = new Date();

if (!user) {
    alert("Please login first.");
    window.location.href = "login.html";
}

document.getElementById("username").innerText = user.name;

// ======================================
// Load Movie Details
// ======================================

fetch("https://ott-streaming-backend-production.up.railway.app/movies/" + movieId)

.then(response => response.json())

.then(movie => {

    document.getElementById("movieTitle").innerText = movie.title;

    document.getElementById("movieGenre").innerText = movie.genre;

    document.getElementById("movieLanguage").innerText = movie.language;

    document.getElementById("movieDuration").innerText =
        movie.duration + " mins";

    document.getElementById("movieDescription").innerText =
        movie.description || "Enjoy your movie.";

    const video = document.getElementById("videoPlayer");

    video.src = movie.hlsUrl;

    initializeAnalytics(video);

    loadAnalytics();

})

.catch(error => console.log(error));

// ======================================
// Analytics
// ======================================

function initializeAnalytics(video){

    let previousTime = 0;

    function sendAnalytics(eventType){
fetch("https://ott-streaming-backend-production.up.railway.app/analytics"
        ,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                userId:user.id,

                movieId:Number(movieId),

                eventType:eventType,

                playbackTime:video.currentTime

            })

        })

        .then(response=>response.json())

        .then(data=>{

            loadAnalytics();

        })

        .catch(error=>console.log(error));

    }

    // PLAY
    video.addEventListener("play",()=>{

        sendAnalytics("PLAY");

    });

    // PAUSE
    video.addEventListener("pause",()=>{

        sendAnalytics("PAUSE");

    });

    // COMPLETED
    video.addEventListener("ended",()=>{

        sendAnalytics("COMPLETED");

    });

    // FORWARD / BACKWARD

    video.addEventListener("timeupdate",()=>{

        if(video.currentTime > previousTime + 5){

            sendAnalytics("FORWARD");

        }

        if(video.currentTime < previousTime - 5){

            sendAnalytics("BACKWARD");

        }

        previousTime = video.currentTime;

    });

}

// ======================================
// Load Analytics Table
// ======================================

function loadAnalytics(){

    fetch("https://ott-streaming-backend-production.up.railway.app/analytics")

    .then(response=>response.json())

    .then(data=>{

        const tbody = document.querySelector("#analyticsTable tbody");

        tbody.innerHTML = "";

        let count = 1;

        data.forEach(item=>{

            // Only current user
            if(item.userId != user.id) return;

            // Only current movie
            if(item.movieId != Number(movieId)) return;

            // Only current session
            const eventDate = new Date(item.eventTime);

            if(eventDate < sessionStart) return;

            let icon = "";

            switch(item.eventType){

                case "PLAY":
                    icon = "▶";
                    break;

                case "PAUSE":
                    icon = "⏸";
                    break;

                case "FORWARD":
                    icon = "⏩";
                    break;

                case "BACKWARD":
                    icon = "⏪";
                    break;

                case "COMPLETED":
                    icon = "✅";
                    break;

                default:
                    icon = "🎬";

            }

            tbody.innerHTML += `

            <tr>

                <td>${count++}</td>

                <td>${icon} ${item.eventType}</td>

                <td>${Number(item.playbackTime).toFixed(2)} sec</td>

                <td>${new Date(item.eventTime).toLocaleTimeString()}</td>

                <td style="color:green;font-weight:bold;">Success</td>

            </tr>

            `;

        });

    })

    .catch(error=>console.log(error));

}

// ======================================
// Back to Home
// ======================================

function goHome(){

    window.location.href = "home.html";

}