// ===============================
// Check Logged-in User
// ===============================

const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "index.html";
} else {
    document.getElementById("username").innerText = user.name;
}

// ===============================
// Fetch Movies
// ===============================

fetch("https://borrower-diploma-ergonomic.ngrok-free.dev/movies")

.then(response => {

    if (!response.ok) {
        throw new Error("Unable to fetch movies");
    }

    return response.json();

})

.then(movies => {

    console.log("Movies received:", movies);

    const container = document.getElementById("movieContainer");

    container.innerHTML = "";

    if (movies.length === 0) {

        container.innerHTML = "<h2>No Movies Available</h2>";
        return;

    }

    movies.forEach(movie => {

        const card = document.createElement("div");
        card.className = "movie-card";

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h2>${movie.title}</h2>

                <p><strong>Genre:</strong> ${movie.genre}</p>

                <p><strong>Language:</strong> ${movie.language}</p>

                <p><strong>Duration:</strong> ${movie.duration} mins</p>

                <button onclick="watchMovie(${movie.id})">
                    ▶ Watch Movie
                </button>

            </div>
        `;

        container.appendChild(card);

    });

})

.catch(error => {

    console.error("Movie Fetch Error:", error);

    document.getElementById("movieContainer").innerHTML =
        `<h2 style="color:red;">${error.message}</h2>`;

});

// ===============================
// Watch Movie
// ===============================

function watchMovie(movieId) {

    localStorage.setItem("movieId", movieId);

    window.location.href = "player.html";

}

// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out Successfully!");

    window.location.href = "index.html";

}
