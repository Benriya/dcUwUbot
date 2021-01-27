import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://dawe:V5vSixleH7xS1SlM@uwuniverzum.cegga.mongodb.net/test';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let myobj = {
        name: 'Parszifál',
        description: 'humolosz',
        race: 'Human',
        id: 'B-16',
        level: 13,
        hp: 630,
        maxHp: 630,
        armor: 0,
        defense: 0,
        strength: 17,
        intellect: 11,
        agility: 14,
        gold: 325,
        experience: 260,
        mage: false,
        diff: 'normal',
        type: 'monster'
    };
    let dbo = db.db("mydb");
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
