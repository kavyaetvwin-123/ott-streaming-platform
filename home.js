// Show logged-in user's name
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {

    window.location.href = "index.html";

} else {

    document.getElementById("username").innerText = user.name;

}

// Fetch movie from Spring Boot
fetch("https://borrower-diploma-ergonomic.ngrok-free.dev/movies")

.then(response => response.json())
.then(movies => {

    console.log("Movies received:", movies);

    const container = document.getElementById("movieContainer");

    container.innerHTML = "";

    movies.forEach(movie => {

        container.innerHTML += `
        <div class="movie-card">

            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h2>${movie.title}</h2>

                <p><strong>Genre :</strong> ${movie.genre}</p>

                <p><strong>Language :</strong> ${movie.language}</p>

                <p><strong>Duration :</strong> ${movie.duration} mins</p>

                <button onclick="watchMovie(${movie.id})">
                    ▶ Watch Movie
                </button>

            </div>

        </div>
        `;

    });

    console.log(container.innerHTML);

})
.catch(error => {
    console.error(error);
});

function watchMovie(movieId){

    localStorage.setItem("movieId", movieId);

    window.location.href = "player.html";

}

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out Successfully!");

    window.location.href = "index.html";

}
