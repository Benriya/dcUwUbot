import pkg from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();

const { MongoClient } = pkg;
const url = process.env.MONGODB_URI;

export default {
    characterCreate: (name, race, img, description, id, maxHp, regen, armor, defense, strength, intellect, agility, luck, gold) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = {name: name, description: description, img: img, race: race, id: id, hp: maxHp, maxHp: maxHp, regen: regen, armor: armor, defense: defense, strength: strength, intellect: intellect, agility: agility, luck: luck, gold: gold, experience: 0, level: 1, talent: 0, type: 'Player', timeout: 0};
            dbo.collection("Characters").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    listCharacter: (id) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
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

    getEnemy: (query) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Characters").find(query).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    getMiscellaneous: (query) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Characters").findOne(query, function (err, result) {
                    if (err) throw err;
                    //console.log(result);
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    levelUpCharacter: (char, xp) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { id: char.id };
            let newValues = { $set: {level: char.level+1, hp: char.maxHp, maxHp: char.maxHp+20, armor: char.armor+50, talent: char.talent+3, experience: char.experience-xp } };
            dbo.collection("Characters").updateOne(myQuery, newValues, function(err, res) {
                if (err) throw err;
                console.log('levelup');
                db.close();
            });
        });
    },

    updateCharacter: (char, args) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { id: char };
            let newValues = { $set: args };
            dbo.collection("Characters").updateOne(myQuery, newValues, function(err, res) {
                if (err) throw err;
                console.log('updateHero');
                db.close();
            });
        });
    },

    createLottoTip: (name, id, tipp) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
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
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { id: id };
            let newValues = { $set: {tipp: tipp}};
            dbo.collection("Lotto").updateOne(myQuery, newValues, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    },

    getLottoTips: () => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Lotto").find({type: 'lotto'}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    getLotto: (id) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Lotto").findOne({id: id}, function (err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    deleteLottoTips: () => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { type: 'lotto' };
            dbo.collection("Lotto").deleteMany(myQuery, function (err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
                db.close();
            });
        });
    },

    subscribeForPing: (kurzus, id) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myobj = { id: id, type: 'ping' };
            dbo.collection(kurzus).insertOne(myobj, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    unsubscribeForPing: (kurzus, id) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            dbo.collection(kurzus).deleteOne({id: id}, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    getPinger: (kurzus, id) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection(kurzus).findOne({id: id}, function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    getAllSubscriber: (kurzus) => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection(kurzus).find({type: 'ping'}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    increaseCigNig: (type) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { type: type };
            let newValues = { $inc: {counter: 1} };
            dbo.collection("CigNigList").updateOne(myQuery, newValues, function(err, res) {
                if (err) throw err;
                console.log('cignig: ' + type);
                db.close();
            });
        });
    },

    getCigNig: () => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection('CigNigList').find({find: 'CigNig'}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },
};
