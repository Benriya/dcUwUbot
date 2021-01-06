const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = process.env.MONGODB_URI;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

    if (err) throw err;

    console.log(client.topology.clientInfo);

    client.close();
});
