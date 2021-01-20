import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://dawe:V5vSixleH7xS1SlM@uwuniverzum.cegga.mongodb.net/test';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = {name: 'Fox',
        description: 'woof',
        race: 'Beast',
        id: 'A-1',
        level: 1,
        hp: 30,
        maxHp: 30,
        armor: 0,
        defense: 0,
        strength: 4,
        intellect: 2,
        agility: 3,
        gold: 10,
        experience: 10,
        mage: false,
        diff: 'critter',
        type: 'monster'};
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
