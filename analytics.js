fetch("http://localhost:8080/analytics")

.then(response => response.json())

.then(data => {

    const table = document.getElementById("analyticsTable");

    data.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.userId}</td>

            <td>${item.movieId}</td>

            <td>${item.eventType}</td>

            <td>${item.playbackTime.toFixed(2)} sec</td>

            <td>${item.eventTime}</td>

        </tr>

        `;

    });

})

.catch(error => console.log(error));