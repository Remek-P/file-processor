import { COLLECTION } from "@/constants/constants";

import {connectToDatabase} from "@/utils/MongoDB_ConnectUtils";

async function createTextIndexes(collection) {
  try {
    const indexes = await collection.listIndexes().toArray();
    const hasTextIndex = indexes.some(index =>
        index.key && (index.key['$**'] || Object.values(index.key).includes('text'))
    );

    if (!hasTextIndex) {
      const sampleDoc = await collection.findOne({}, { skip: 1 });
      if (!sampleDoc) return;

      const textFields = Object.entries(sampleDoc)
          .filter(([_, value]) => typeof value === 'string')
          .reduce((acc, [key]) => ({ ...acc, [key]: 'text' }), {});

      if (Object.keys(textFields).length > 0) {
        await collection.createIndex(textFields);
      }
    }
  } catch (error) {
    console.error('Error creating text indexes:', error);
    throw error;
  }
}

async function performSearch(collection, query) {
  try {
    let results = [];

    // Get first row safely
    const firstRow = await collection.findOne();

    if (firstRow) {
      results.push(firstRow);
    }

    // Validate query
    if (!query || typeof query !== 'string') {
      console.warn('Invalid query:', query);
      return results;
    }

    const isNumber = !isNaN(query) && query.trim() !== '';

    const regexSearch = async () => {
      const regexResults = await collection.find({
        $or: Object.keys(firstRow || {})
            .filter(key => typeof firstRow[key] === 'string') // Only string fields
            .map(key => ({ [key]: { $regex: query, $options: 'i' } }))
      }).toArray();

      if (Array.isArray(regexResults)) {
        results.push(...regexResults);
      }
    }

    if (isNumber) {
      const numberQuery = parseFloat(query);
      const numericResults = await collection.find({ ID: numberQuery }).toArray();


      const notFound = numericResults.length === 0;

      // Fallback if the numeric search is partial
      if (notFound) {
        const partialResults = await collection.find({
          ID: { $toString: { $regex: query, $options: 'i' }} // Convert ID to string for regex match
        }).toArray();

        if (Array.isArray(partialResults)) {
          results.push(...partialResults);
        }
      }

      else if (Array.isArray(numericResults)) {
          results.push(...numericResults);
        }
      }

    else if (query.trim()) {
        if (query.length <= 3) {
          await regexSearch();
        }
        else {
          try {
            await createTextIndexes(collection);
            const textResults = await collection.find({
              $text: {
                $search: query,
                $caseSensitive: false,
                $diacriticSensitive: false
              }
            }).toArray();

            if (Array.isArray(textResults)) {
              results.push(...textResults);
            }
          } catch (textSearchError) {
            console.error('Text search failed, falling back to regex search:', textSearchError);
            // Fallback to regex search if text search fails
            await regexSearch();
          }
        }
    }

    // Ensure we're returning an array
    return Array.isArray(results) ? results : [];

  } catch (error) {
    console.error('Search operation failed:', error);
    // Return empty array instead of throwing
    return [];
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {

    const {query} = req.query;
    if (!query) {
      return res.status(400).json({message: "Query parameter is required"});
    }

    const { db } = await connectToDatabase(res);

    try {
      const collection = db.collection(COLLECTION);

      // Ensure collection exists
      if (!collection) {
        throw new Error(`Collection ${COLLECTION} not found`);
      }

      const data = await performSearch(collection, query);

      // Ensure we're sending an array
      const responseData = Array.isArray(data) ? data : [];

      return res.status(200).json(responseData);

    } catch (error) {
      console.error("Search operation failed:", error);
      return res.status(500).json({
        message: "Search operation failed",
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        data: [] // Always return an array even on error
      });
    }
  }
  else return res.status(405).json({ message: "Method not allowed" });
}