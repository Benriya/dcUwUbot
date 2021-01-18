import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = {name: 'Bigger than a mountain', description: 'I can see my house from here', price: 20000, id: 'chest', img: 'https://www.flamingfun.com/wp-content/uploads/2015/03/TreasureChest.jpg',
        type: 'colossus'};
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
