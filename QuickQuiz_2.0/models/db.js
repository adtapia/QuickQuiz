const { MongoClient } = require('mongodb');

const dbURL = "mongodb+srv://aroojmanzar87:IPXNSuzadO0kmMq9@cluster0.kh6hr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


let db;

async function connectToDB() {
  try {
    const client = new MongoClient(dbURL, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db("quickquiz_db");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getCollection(collectionName) {
  if (!db) {
    throw new Error('Database connection not established. Call connectToDB first.');
  }
  return db.collection(collectionName);
}

module.exports = {
  connectToDB,
  getCollection,
};
