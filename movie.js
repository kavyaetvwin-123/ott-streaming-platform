// Fetch all movies from backend
fetch("https://ott-streaming-backend-production.up.railway.app/movies")
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load movies.");
        }

        return response.json();

    })

    .then(data => {

        if (data.length === 0) {
            document.getElementById("title").innerText = "No Movies Available";
            return;
        }

        const movie = data[0];

        document.getElementById("title").innerText = movie.title;
        document.getElementById("genre").innerText = "Genre : " + movie.genre;
        document.getElementById("language").innerText = "Language : " + movie.language;
        document.getElementById("duration").innerText = "Duration : " + movie.duration + " mins";

        document.getElementById("watchBtn").addEventListener("click", () => {

            localStorage.setItem("movieId", movie.id);

            window.location.href = "player.html";

        });

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Unable to load movie details.");

    });