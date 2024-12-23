import { fetchCsvFromS3, filterCsvData } from "@/utils/s3CsvParser";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;
    const csvKey = process.env.CSV_KEY; // You can set this in the environment or pass via query

    if (!query || !csvKey) {
      console.error('Missing query or csvKey:', { query, csvKey });
      return res.status(400).json({ message: 'Query and CSV key are required' });
    }

    try {
      // Fetch CSV data from S3
      const csvData = await fetchCsvFromS3(csvKey);

      // Filter data based on query
      const filteredData = filterCsvData(csvData, query);
      console.log("csvKey", csvKey)
      // Return the filtered data
      res.status(200).json(filteredData);
    } catch (error) {
      console.error('Error processing CSV data:', error);
      res.status(500).json({ message: 'Failed to process CSV data', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

