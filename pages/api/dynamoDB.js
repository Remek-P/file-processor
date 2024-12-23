import csvParser from 'csv-parser';
import fs from 'fs';
import {putItem} from "@/utils/aws";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const filePath = `./tmp/${file.name}`; // Temporary file path for uploading

      // Save file to the server's local disk (for example, using multer or FormData)
      fs.writeFileSync(filePath, file.data);

      const results = [];

      // Start reading the CSV file
      fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('headers', (headers) => {
            // Modify headers to remove spaces
            const modifiedHeaders = headers.map(header =>
                header.replace(/\s+/g, '_') // Replace spaces with underscores
            );

            results.push(modifiedHeaders); // Save the modified headers
          })
          .on('data', (row) => {
            // Process each row of the CSV
            const rowData = {};

            results[0].forEach((header, index) => {
              rowData[header] = row[results[0][index]];
            });

            // You can now upload each row to DynamoDB
            putItem('YourDynamoDBTableName', rowData);
          })
          .on('end', () => {
            // Clean up and send response
            fs.unlinkSync(filePath); // Remove temp file after processing
            res.status(200).json({ message: 'File processed and data uploaded to DynamoDB' });
          })
          .on('error', (err) => {
            console.error('Error reading CSV:', err);
            res.status(500).json({ error: 'Error processing the CSV file' });
          });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
