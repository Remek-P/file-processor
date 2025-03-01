// Declare variables to store MongoClient and the database
import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;
export const connectToDatabase = async (res) => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const { DB_HOST, DB_USER, DB_PASS, DB_CLUSTER, DB_APP_NAME } = process.env;
  const uri = `${ DB_HOST }://${ DB_USER }:${ DB_PASS }@${ DB_CLUSTER }.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=${ DB_APP_NAME }`;


  let client = null;
  let db = null;

  try {
    // Connect to MongoDB
    client = await MongoClient.connect(uri);
    db = client.db(DB_APP_NAME);
  } catch (error) {
    return res.status(500).json({ message: "Could not connect to the database" });
  }

  // Cache the client and db to avoid reconnecting on every request
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}