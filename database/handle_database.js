let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

module.exports = {
    characterCreate: (name, description, id) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {name: name, description: description, id: id, Power: 1, Intellect: 1, Agility: 1, Luck: 1, experience: 0};
            dbo.collection("Characters").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
},
    listCharacter: (id) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Characters").findOne({id: id}, function (err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    resolve(result);
                });
            });
        });
    }
}
