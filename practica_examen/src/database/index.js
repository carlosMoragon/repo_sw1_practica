const database = {};

database.user = require('./models/user.models');

function initializeUsers(){
    const NAMES = ["alberto", "ana", "daniel", "silvia"];
    const EMAILS = ["alberto@gmail.com", "ana@gmail.com", "daniel@gmail.com", "silvia@gmail.com"]

    NAMES.forEach(function (username, index) {
        const email = EMAILS[index]; // Emparejar nombre con su email usando el índice
        database.user.register(username, email, "1234"); // Registrar usuario
    });
}

function initializeDB(){
    initializeUsers();
}

initializeDB();

module.exports = database;