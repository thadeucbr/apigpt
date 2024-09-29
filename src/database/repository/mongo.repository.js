import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  if (!db) {
    await client.connect();
    const dbName = uri.split('/').pop();
    db = client.db(dbName);
  }
};

const mongoRepository = async ({ collection, operation, query }) => {
  try {
    await connectDB();
    const coll = db.collection(collection);
    
    let result;

    if (operation === 'find' || operation === 'findOne') {
      result = await coll[operation](query).toArray();
      if (operation === 'findOne') {
        result = result[0];
      }
    } else if (operation === 'create') {
      result = await coll.insertOne(query);
    } else {
      result = await coll[operation](query);
    }

    return { status: 'success', data: result };
  } catch (err) {
    return { status: 'error', message: err.message };
  }
};

export default mongoRepository;
