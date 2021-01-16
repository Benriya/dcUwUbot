import pkg from 'mongodb';
const { MongoClient } = pkg;

const url = 'mongodb+srv://Kuroko:Madamadadane@uwuniverzum.cegga.mongodb.net/test';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("mydb");
    let myobj = {name: 'RightHandOfGod', description: 'IsteniChest', price: 10, id: 'chest', img: 'https://cdnb.artstation.com/p/assets/images/images/011/265/521/large/sarah-wang-01.jpg?1528699835',
        type: 'rightHandOfGod'};
    dbo.collection("Characters").insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
