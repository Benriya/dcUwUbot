let MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

 MongoClient.connect(url, function (err, db) {
     if (err) throw err;
     let dbo = db.db("mydb");
     let myobj = {name: 'Centipede', description: '*skrrrrrrr*', race: 'Bug', id: '37', level: 24 , Power: 11, Intellect: 5, Agility: 31, experience: 280, diff: 'Expert'};
     dbo.collection("Characters").insertOne(myobj, function (err, res) {
         if (err) throw err;
         console.log("1 document inserted");
         db.close();
     });
 });
