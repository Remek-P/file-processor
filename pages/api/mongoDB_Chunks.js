import { COLLECTION } from "@/constants/constants";
import connectToDatabase from "@/utils/mongoDB_Utils";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const { page = 1, limit = 10000 } = req.query;
    const skip = (page - 1) * limit;

    try {
      const collection = db.collection(COLLECTION);

      if (!collection) {
        throw new Error(`Collection ${COLLECTION} not found`);
      }

      // Optional: Use an indexed field for pagination instead of skip
      const data = await collection
          .find({})
          .skip(skip)
          .limit(parseInt(limit))
          .toArray();

      const totalDocuments = await collection.countDocuments();

      res.status(200).json({ data, totalDocuments, totalPages: Math.ceil(totalDocuments / limit) });
    } catch (error) {
      res.status(500).json({ message: "Fetching data failed" });
    }
  } else return res.status(405).json({ message: "Method not allowed" });
}
