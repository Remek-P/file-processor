import {MongoClient} from "mongodb";

export default async function handler(req, res) {

  if (req.method === 'GET') {

    let client;

    const uri = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=data-to-JS`

    try {
      client = await MongoClient.connect(uri);
    } catch (error) {
      res.status(500).json({message: "Could not connect to the database"})
    }

    let data;
    const { page = 1, limit = 10000 } = req.query;

    try {
      const db = client.db(`data-to-JS`);

      const collectionToConnect = "data-to-JS";
      // const collectionToConnect = "formated";

      data = await db
          .collection(collectionToConnect)
          .find({})
          .skip((page - 1) * limit) // skip the first `page - 1` chunks
          .limit(parseInt(limit)) // limit the number of documents
          .toArray();

      const totalDocuments = await db.collection(collectionToConnect).countDocuments();

      res.status(200).json({ data, totalDocuments, totalPages: Math.ceil(totalDocuments / limit) });
    } catch (error) {
      await client.close();
      res.status(500).json({message: "Fetching data failed"});
    } finally {
      await client.close();
    }
  }
}