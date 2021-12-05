const Datastore = require("nedb");
db = new Datastore("../users.db");
db.loadDatabase();

exports.crudRegister = (email, password) => {
    return new Promise((resolve, reject) => {
        const data = { email: email, password: password };
        db.insert(data, (err, newData) => {
            if(err) {
                reject(null);
            }
            else {
                resolve(newData);
            }
        });
    });
};

exports.hasEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.findOne({email: email}, (err, data) => {
            if(err) {
                reject("User not found!");
            }
            else {
                resolve(data);
            }
        });
    });
};