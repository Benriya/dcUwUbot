let MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

 MongoClient.connect(url, function (err, db) {
     if (err) throw err;
     let dbo = db.db("mydb");
     let myobj = {name: 'Itep Zsálab', description: 'Krumpli osztással nyeri meg a csatát', race: 'Human', id: '33', level: 37, Power: 21, Intellect: 11, Agility: 11, experience: 560, diff: 'Godlike'};
     dbo.collection("Characters").insertOne(myobj, function (err, res) {
         if (err) throw err;
         console.log("1 document inserted");
         db.close();
     });
 });
