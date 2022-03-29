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
            let newValues = { $set: { level: char.level+1, hp: char.maxHp, maxHp: char.maxHp+20, armor: char.armor+50, talent: char.talent+3, experience: char.experience-xp } };
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

    getList: () => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("List").find().toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    updateList: (listPart) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { Line: listPart };
            let newValues = { $set: { Checked: true } };
            dbo.collection("List").updateOne(myQuery, newValues, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    resetList: () => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = {Checked: true};
            let newValues = { $set: { Checked: false } };
            dbo.collection("List").updateMany(myQuery, newValues, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },
};
