const mongoDB = require("mongodb");

const Mclient = mongoDB.MongoClient;

let database;

async function connectTodb(){
    const connection = await Mclient.connect("mongodb://localhost:27017");
    database = connection.db("e-commerce");
}

function getDB(){
    if (!database){
        throw new Error("database not connected!");
    }

    return database;
}

module.exports = {
    connectTodb: connectTodb,
    getDB: getDB
};