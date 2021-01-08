let MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

module.exports = {
    characterCreate: (name, race, description, id, Power, Intellect, Agility, Luck) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {name: name, description: description, race: race, id: id, Power: Power, Intellect: Intellect, Agility: Agility, Luck: Luck, experience: 0, level: 1, talent: 0};
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
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    listEnemy: (diff) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Characters").find({diff: diff}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    updateCharacter: (char, xp) => {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                let myquery = { id: char.id };
                let newXp = char.experience + xp;
                let newvalues = { $set: {experience: newXp } };
                dbo.collection("Characters").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                });
            });
    },

    levelUpCharacter: (char, xp) => {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                let myquery = { id: char.id };
                let newvalues = { $set: {level: char.level+1, talent: char.talent+1, experience: char.experience-xp } };
                dbo.collection("Characters").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                });
            });
    },

    addTalentCharacter: (char, ability) => {
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                let myquery = { id: char.id };
                let newvalues;
                if (ability === 'power') {newvalues = { $set: {Power: char.Power+1, talent: char.talent-1} };}
                if (ability === 'intellect') {newvalues = { $set: {Intellect: char.Intellect+1, talent: char.talent-1} };}
                if (ability === 'agility') {newvalues = { $set: {Agility: char.Agility+1, talent: char.talent-1} };}
                if (ability === 'luck') {newvalues = { $set: {Luck: char.Luck+1, talent: char.talent-1} };}
                dbo.collection("Characters").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                    db.close();
                });
            });
    },

    createLottoTip: (name, id, tipp) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {name: name, id: id, tipp: tipp, type: 'lotto'};
            dbo.collection("Lotto").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    updateLottoTip: (name, id, tipp) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myquery = { id: id };
            let newvalues = { $set: {tipp: tipp}};
            dbo.collection("Lotto").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    getLottoTips: () => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Lotto").find({type: 'lotto'}).toArray(function (err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    deleteLottoTips: () => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myquery = { type: 'lotto' };
            dbo.collection("customers").deleteMany(myquery, function (err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
                db.close();
            });
        });
    },

}
