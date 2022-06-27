import pkg from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();

const { MongoClient } = pkg;
const url = process.env.MONGODB_URI;

export default {
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

    getHUF: () => {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                if (err) throw err;
                let dbo = db.db("mydb");
                dbo.collection("Currency").find({HUF_id: 1}).toArray(function (err, result) {
                    if (err) throw err;
                    db.close();
                    resolve(result);
                });
            });
        });
    },

    updateHUF: (value) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) throw err;
            let dbo = db.db("mydb");
            let myQuery = { HUF_id: 1 };
            let newValues = { $set: { HUF: value } };
            dbo.collection("Currency").updateOne(myQuery, newValues, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },
};
