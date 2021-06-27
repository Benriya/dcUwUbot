import pkg from 'mongodb';
import dotenv from 'dotenv'
dotenv.config();
const { MongoClient } = pkg;

const url = process.env.MONGODB_URI;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let myobj = {
        name: 'Nodnol',
        description: 'UwU',
        race: 'Human',
        id: 'B-22',
        level: 19,
        hp: 930,
        maxHp: 930,
        armor: 0,
        defense: 20,
        strength: 20,
        intellect: 1,
        agility: 19,
        gold: 475,
        experience: 380,
        mage: false,
        diff: 'hard',
        type: 'monster'
    };
    let dbo = db.db("mydb");
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
