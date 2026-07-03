// This is the client that runs in the browser. It will act as the waiter that runs info to my server.
document.querySelector('#submitBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const userData = {
        userName: username,
        userPassword: password,
        userEmail: email
    };

    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const serverReply = await response.json();
        console.log("Server says:", serverReply.message);
    } catch (err) {
        console.error("Failed to send user data:", err);
    }
});