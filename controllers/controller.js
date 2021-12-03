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

exports.login = (req, res) => {
    
}