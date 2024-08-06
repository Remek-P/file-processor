import { MongoClient } from "mongodb";

export default async function helpers(req, res) {

  if (req.method === 'GET') {

    let client;
    
    const uri = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=data-to-JS`

    try {
      client = await MongoClient.connect(uri);
    } catch (error) {
      res.status(500).json({message: "Could not connect to the database"})
    }


    let data

    try {
      const db = client.db(`data-to-JS`);
      data = await db
          // .collection("data-to-JS")
          .collection("test")
          .find({}, {projection:{ _id: 0 }})
          .toArray();
    } catch (error) {
      await client.close();
      res.status(500).json({message: "Fetching data failed"});
    }

    await client.close();

    res.status(200).json(data);
  }
  //
  // if (req.method === 'POST') {
  //
  // }

}