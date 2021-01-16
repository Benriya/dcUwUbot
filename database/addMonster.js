import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = {name: 'Ainz', description: 'none', race: 'Skeleton', id: 'T-1', level: 3, hp: 500, maxHp: 500, armor: 100, defense: 1, strength: 8, intellect: 15, agility: 9, gold: 100, experience: 160, diff: 'test'};
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
