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
        username.value = "";
        username.value = "";
        username.value = "";
    } catch (err) {
        console.error("Failed to send user data:", err);
    }
});

document.querySelector('#display-tables-btn').addEventListener('click', async (e) => {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    // fetch(URL)
    // .then((response) => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP ERROR. Status ${response.status}`);
    //     }
    //     return response.json();
    // })
    // .then((data) => console.log(data))
    // .catch((err) => console.log(err));
    fetch(URL).then(console.log("We did it people!")).catch((err) => console.log(err));
});