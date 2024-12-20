// // pages/api/upload-csv.js
// import formidable from 'formidable';
// import fs from 'fs';
// import csv from 'csv-parser';
// import { MongoClient } from 'mongodb';
//
// const mongoUri = 'mongodb://localhost:27017'; // MongoDB URI
// const dbName = 'your_database'; // Database name
// const collectionName = 'your_collection'; // Collection name
//
// const BATCH_SIZE = 1000; // Adjust batch size as needed
//
// // Sanitize headers by removing spaces and special characters
// const sanitizeHeader = (header) => {
//   return header.replace(/\s+/g, '_').replace(/[^\w\s]/g, '');
// };
//
// // Parse CSV and upload to MongoDB in batches
// const processCSV = (filePath, headers, collection) => {
//   return new Promise((resolve, reject) => {
//     const results = [];
//     fs.createReadStream(filePath)
//         .pipe(csv())
//         .on('headers', (csvHeaders) => {
//           // Modify the headers
//           headers = csvHeaders.map(sanitizeHeader);
//         })
//         .on('data', (row) => {
//           const sanitizedRow = {};
//           Object.keys(row).forEach((key, index) => {
//             const sanitizedKey = headers[index]; // Use sanitized header as key
//             sanitizedRow[sanitizedKey] = row[key];
//           });
//           results.push(sanitizedRow);
//
//           // Insert in batches
//           if (results.length >= BATCH_SIZE) {
//             collection.insertMany(results).catch((err) => console.error('Error inserting batch:', err));
//             results.length = 0; // Clear batch after insertion
//           }
//         })
//         .on('end', async () => {
//           if (results.length > 0) {
//             // Insert remaining rows if any
//             await collection.insertMany(results);
//           }
//           resolve();
//         })
//         .on('error', (err) => reject(err));
//   });
// };
//
// // API route to handle file upload and CSV processing
// export const config = {
//   api: {
//     bodyParser: false, // Disable body parser to handle file upload manually
//   },
// };
//
// export default async (req, res) => {
//   if (req.method === 'POST') {
//     // Handle file upload using formidable
//     const form = new formidable.IncomingForm();
//     form.uploadDir = './'; // Set temporary file directory
//     form.keepExtensions = true; // Keep file extensions
//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: 'File processing error.' });
//       }
//
//       const filePath = files.csv[0].filepath;
//
//       try {
//         const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
//         await client.connect();
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//
//         // Process CSV and insert into MongoDB in batches
//         await processCSV(filePath, [], collection);
//
//         // Remove the temporary file after processing
//         fs.unlinkSync(filePath);
//
//         return res.status(200).json({ success: true, message: 'CSV uploaded and data inserted.' });
//       } catch (error) {
//         console.error('Error processing CSV:', error);
//         return res.status(500).json({ success: false, message: 'Failed to process CSV file.' });
//       }
//     });
//   } else {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// };
