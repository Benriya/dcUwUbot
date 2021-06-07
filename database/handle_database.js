import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://dawe:V5vSixleH7xS1SlM@uwuniverzum.cegga.mongodb.net/test';
//const dbo = db.db("mydb");

export default {
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
