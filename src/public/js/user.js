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

async function getCSGO() {
    const url = "http://localhost:8080";
    const token = localStorage.token;
    console.log(token);

    fetch(`${urlBase}/authenticate`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        
    })
    .then(async (response) => {
        console.log(`response status: ${response.status}`);
        if(!response.status === 200) {

        }
        else {
            console.log("Time to fecth csgo");
            await fetch(`${url}/csgo`, {
                headers: {
                    "content-Type": "application/x-www-form-urlencoded"
                },
                method: "GET",
            })
            .then(async data => {
                console.log("DATA DO CSGO:");
                const csgoData = await data.json() 
                console.log(csgoData);
            })
        }
        
    
    });    
}

async function getVava() {
    const url = "http://localhost:8080";
    const token = localStorage.token;
    console.log(token);

    fetch(`${urlBase}/authenticate`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        
    })
    .then(async (response) => {
        console.log(`response status: ${response.status}`);
        if(!response.status === 200) {

        }
        else {
            console.log("Time to fecth vava");
            await fetch(`${url}/vava`, {
                headers: {
                    "content-Type": "application/x-www-form-urlencoded"
                },
                method: "GET",
            })
            .then(async data => {
                console.log("DATA DO vava:");
                const vavaData = await data.json() 
                console.log(vavaData);
            })
        }
        
    
    });    
}

async function getOverw() {
    const url = "http://localhost:8080";
    const token = localStorage.token;
    console.log(token);

    fetch(`${urlBase}/authenticate`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        
    })
    .then(async (response) => {
        console.log(`response status: ${response.status}`);
        if(!response.status === 200) {

        }
        else {
            console.log("Time to fecth overw");
            await fetch(`${url}/overw`, {
                headers: {
                    "content-Type": "application/x-www-form-urlencoded"
                },
                method: "GET",
            })
            .then(async data => {
                console.log("DATA DO overw:");
                const overwData = await data.json() 
                console.log(overwData);
            })
        }
        
    
    });    
}