// This is the client that runs in the browser. It will act as the waiter that runs info to my server.
document.querySelector('#submitBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    const userData = {
        userName: usernameInput.value,
        userPassword: passwordInput.value,
        userEmail: emailInput.value
    };

    try {
        const response = await fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error. Status ${response.status}`);
        }

        const serverReply = await response.text();
        console.log("Server says:", serverReply);

        usernameInput.value = "";
        passwordInput.value = "";
        emailInput.value = "";
    } catch (err) {
        console.error("Failed to send user data:", err);
    }
});

document.querySelector('#deleteLastBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3001/users/last', {
            method: 'DELETE'
        });

        const serverReply = await response.text();

        if (!response.ok) {
            throw new Error(serverReply);
        }

        console.log("Server says:", serverReply);
    } catch (err) {
        console.error("Failed to delete last user:", err);
    }
});

document.querySelector('#display-tables-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3001/users');

        if (!response.ok) {
            throw new Error(`HTTP error. Status ${response.status}`);
        }

        const usernames = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        usernames.forEach((name) => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            userList.appendChild(listItem);
        });
    } catch (err) {
        console.error("Failed to load users:", err);
    }
});
