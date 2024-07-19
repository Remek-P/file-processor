import {MongoClient} from "mongodb";

export default async function helpers(req, res) {


  const uri = "mongodb+srv://remekpiotrowski:tihxah-dekjow-beKpi2@data-to-js.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=data-to-JS"

  const client = await MongoClient.connect("mongodb+srv://remekpiotrowski:tihxah-dekjow-beKpi2@data-to-js.vdirdpb.mongodb.net/?retryWrites=true&w=majority&appName=data-to-JS")

  const db = client.db();

  if (req.method === 'GET') {

    const data = await db
        .collection("check")
        .find()
        .toArray();

    console.log(db)

    res.status(200).json(data);
  }

  if (req.method === 'POST') {

  }

  await client.close();
}