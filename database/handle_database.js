let MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URI;

module.exports = {
    characterCreate: (name, race, description, id, Power, Intellect, Agility, Luck) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {name: name, description: description, race: race, id: id, Power: Power, Intellect: Intellect, Agility: Agility, Luck: Luck, experience: 0};
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
