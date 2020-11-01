let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "Kuroko",
    password: "9813"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE csicskawall", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});
