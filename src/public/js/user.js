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

    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

    let text = `
        <tr>          
            <th colspan="5" scope="col">CSGO</th>
        </tr>
    `;
    thead.innerHTML = text;
    text = "";

    fetch(`${urlBase}/authenticate`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        
    })
    .then(async (response) => {
        console.log(`response status: ${response.status}`);
        if(response.status !== 200) {
            text += `
                <tr>                    
                    <td>Only for registered users.</td>
                </tr>
            `;
            tbody.innerHTML = text;
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
                const csgoData = await data.json() 
        
                for(let key of Object.keys(csgoData)) {                   
                    for(let obj of csgoData[key]) {
                        text += `
                        <tr>
                            <td>${key.toString().slice(12)}</td>
                            <td>${obj.teamWon}</td>
                            <td>${obj.scoreWon} - ${obj.scoreLost}</td>
                            <td>${obj.teamLost}</td>
                            <td>${obj.eventName}</td>
                        </tr>
                    `;
                    }
                }
                tbody.innerHTML = text;
            })
            .catch(error => console.log);
        }
        
    
    }).catch(error => console.log);;    
}

async function getVava() {
    const url = "http://localhost:8080";
    const token = localStorage.token;
    console.log(token);

    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

    let text = `
        <tr>          
            <th colspan="5" scope="col">Valorant</th>
        </tr>
    `;
    thead.innerHTML = text;
    text = "";

    fetch(`${urlBase}/authenticate`, {
        headers: {
            "content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`
        },
        method: "GET",
        
    })
    .then(async (response) => {
        console.log(`response status: ${response.status}`);        
        if(response.status !== 200) {
            text += `
                <tr>                    
                    <td>Only for registered users.</td>
                </tr>
            `;
            tbody.innerHTML = text;
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
                const vavaData = await data.json() 
        
                for(let key of Object.keys(vavaData)) {                   
                    for(let obj of vavaData[key]) {
                        text += `
                        <tr>
                            <td>${key}</td>
                            <td>${obj.teamWon}</td>
                            <td>${obj.scoreWon} - ${obj.scoreLost}</td>
                            <td>${obj.teamLost}</td>
                            <td>${obj.eventName}</td>
                        </tr>
                    `;
                    }
                }
                tbody.innerHTML = text;
            }).catch(error => console.log);
        }
            
    
    }).catch(error => console.log);;    
}

async function getOverw() {
    const url = "http://localhost:8080";
    const token = localStorage.token;
    console.log(token);

    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

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
        
        let text = `
            <tr>          
                <th colspan="5" scope="col">Overwatch</th>
            </tr>
        `;
        thead.innerHTML = text;

        text = "";

        for(let key of Object.keys(overwData)) {
            console.log(key);
            for(let obj of overwData[key]) {
                text += `
                <tr>
                    <td>${key}</td>
                    <td>${obj.teamWon}</td>
                    <td>${obj.scoreWon} - ${obj.scoreLost}</td>
                    <td>${obj.teamLost}</td>
                    <td>${obj.eventName}</td>
                </tr>
            `;
            }
            
        }        
        tbody.innerHTML = text;
    })
    .catch(error => console.log);
}

window.onload = () => {
    const table = document.querySelector("table");
    table.innerHTML = `
        <thead>
            <th colspan="5" scope="col">Loading...</th>
        </thead>
        <tbody></tbody>
    `;
    getOverw();
}

const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(navLink => {
    navLink.addEventListener("click", function() {
        this.classList.toggle("active");
        disableAll(this);
    })
})

const disableAll = (notThis) => {
    navLinks.forEach((navLink) => {
        if(navLink !== notThis) {
            navLink.classList.remove("active");
        }
    })
}