const urlBase = window.location.origin;

function register() {
    const email = document.querySelector("#emailRegister").value;
    const password = document.querySelector("#passwordRegister").value;
    const status = document.querySelector("#statusRegister");
    
    console.log("urlBase: ");
    console.log(urlBase);

    if(password.length < 4) {
        status.innerHTML = `
            Password must be at least 4 characters long.`;
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

}