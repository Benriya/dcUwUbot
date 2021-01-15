import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = process.env.MONGODB_URI;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = {name: 'Sokal', description: 'Ez egyetem', race: 'Human', id: '40', level: 16 , Power: 8, Intellect: 15, Agility: 9, experience: 160, diff: 'Hard'};
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
