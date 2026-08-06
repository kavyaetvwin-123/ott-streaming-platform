
function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if(email.trim() === "" || password.trim() === ""){
        alert("Please enter both email and password.");
        return;
    }

    fetch("https://borrower-diploma-ergonomic.ngrok-free.dev/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Invalid Email or Password");
        }

        return response.json();

    })

    .then(user => {

        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login Successful!");

        window.location.href = "home.html";

    })

    .catch(error => {

        alert(error.message);

    });

}
