const urlBase = window.location.origin;

function register() {
    console.log("Inside user.register()");
    const email = document.querySelector("#emailRegister").value;
    const password = document.querySelector("#passwordRegister").value;
    const status = document.querySelector("#statusRegister");    

    if(password.length < 4) {
        status.innerHTML = "Password must be at least 4 characters long.";
        return;
    }

    fetch(`${urlBase}/register`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `email=${email}&password=${password}`
    })
    .then(async (response) => {
        if(!response.ok) {
            const error = response.statusText;
            status.innerHTML = error;
            throw new Error(error);
        }
        const result = await response.json();
        console.log(result.message);
        status.innerHTML = result.message;
    })
    .catch((error) => {
        status.innerHTML = `Error: ${error}`;
    })
}

function login() {
    console.log("Inside user.login()");
    const email = document.querySelector("#emailLogin").value;
    const password = document.querySelector("#passwordLogin").value;
    const status = document.querySelector("#statusLogin");    

    if(password.length < 4) {
        status.innerHTML = "Password must be at least 4 characters long.";
        return;
    }

    fetch(`${urlBase}/login`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `email=${email}&password=${password}`
    })
    .then(async (response) => {
        if(!response.ok) {
            const error = response.statusText;
            status.innerHTML = error;
            throw new Error(error);
        }
        const result = await response.json();
        const token = result.acessToken;
        console.log(token);
        localStorage.setItem("token", token);
        status.innerHTML = "Success!";
    })
    .catch((error) => {
        status.innerHTML = `Error: ${error}`;
    });
};