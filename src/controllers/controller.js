require("dotenv").config({path: "../.env"});
const db = require("../models/nedb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    console.log("Inside register function");
    if(!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const email = req.body.email;
        const password = hashPassword;

        db.crudRegister(email, password)
        .then((data) => {
            res.status(201).send({message: "User created successfully!"});
            console.log("Data: ");
            console.log(JSON.stringify(data));
        });
    }
    catch {
        return res.status(400).send({message: "Problems creating user"});
    }
}

exports.login = async (req, res) => {
    console.log("Inside login function");
    if(!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const email = req.body.email;
        const password = hashPassword;
    
        db.hasEmail(email)
        .then( async (data) => {
            if(data == null) {
                console.log("User not found!");
                return res.status(401).send({message: "User not found!"});
            }
    
            if(await bcrypt.compare(req.body.password, data.password)) {
                const user = {email: email};
                const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    
                res.json({acessToken: acessToken});
                console.log("Data: ");
                console.log(JSON.stringify(data));
            }
            else {
                console.log("Incorrect Password");
                return res.status(401).send({ error: "Incorrect Password"});
            }
        });
    }
    catch {
        return res.status(400).send({message: data});
    }
};

exports.authenticateToken = (req, res) => {
    console.log("Authenticating...");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);

    if(token == null) {
        console.log("Token null");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        res.send();
    });
}