function register() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (name === "" || email === "" || password === "" || confirmPassword === "") {

        alert("Please fill all fields.");
        return;

    }

    if (password !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    console.log("Sending User:", user);

    fetch("https://ott-streaming-backend-production.up.railway.app/users", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify(user)

})
    .then(response => {

        console.log("Status:", response.status);

        if (!response.ok) {

            throw new Error("Registration Failed");

        }

        return response.json();

    })

    .then(data => {

        console.log("User Saved:", data);

        alert("Registration Successful!");

        window.location.href = "index.html";

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Failed to register.\n\n" + error);

    });

}