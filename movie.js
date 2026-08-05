fetch("http://localhost:8080/movies")

.then(res=>res.json())

.then(data=>{

    let movie=data[0];

    document.getElementById("title").innerText=movie.title;

    document.getElementById("genre").innerText="Genre : "+movie.genre;

    document.getElementById("language").innerText="Language : "+movie.language;

    document.getElementById("duration").innerText="Duration : "+movie.duration+" mins";

    document.getElementById("watchBtn").onclick=function(){

        window.location.href="index.html";

    }

})