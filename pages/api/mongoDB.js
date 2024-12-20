import { MongoClient } from "mongodb";
import { COLLECTION } from "@/constants/constants";

let client; // Reuse the client connection
let db;

const uri = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=data-to-JS`;

async function getDbClient() {
  if (!client) {
    client = await MongoClient.connect(uri);
    db = client.db("data-to-JS");
  }
  return db;
}

async function ensureTextIndexes(collection) {
  const indexes = await collection.indexes();
  const textIndexExists = indexes.some(index => index.key && index.key.hasOwnProperty('$**')); // Check for a wildcard text index

  if (!textIndexExists) {
    // No text index found, check the keys of the third document for index creation
    const sampleDoc = await collection
        .find()
        .skip(2)
        .limit(1)
        .next();

    if (sampleDoc) {
      const keys = Object.keys(sampleDoc); // Extract keys from the third document
      const textFields = keys.filter(key => typeof sampleDoc[key] === "string"); // Filter for string fields

      if (textFields.length > 0) {
        // Create a text index on all string fields
        const indexDefinition = textFields.reduce((acc, field) => {
          acc[field] = "text";
          return acc;
        }, {});

        // Create the index
        await collection.createIndex(indexDefinition);
      }
    }
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query;
    console.log("query", query)

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    let data = [];
    try {
      const db = await getDbClient();
      const collection = db.collection(COLLECTION);

      // Ensure text indexes are created (only if they don't already exist)
      await ensureTextIndexes(collection);

      const isNumber = !isNaN(query);
      const numberQuery = parseFloat(query);
      const firstRow = await collection.find().limit(1).toArray();

      // Step 1: Query for numeric fields (like ID)
      if (isNumber) {
        data = await collection.find({ ID: numberQuery }).toArray();
        data = [...firstRow, ...data];
      }

      // Step 2: Query for text fields using $text search
      if (!isNumber && typeof query === "string" && query.trim()) {
        const textResults = await collection.find({ $text: { $search: query } }).toArray();
        data = [...firstRow, ...data, ...textResults]; // Combine results from both queries
      }


    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ message: "Fetching data failed", error: error.message });
    }

    res.status(200).json(data);
  }
}
