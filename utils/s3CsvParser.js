import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";  // Import from AWS SDK v3
import csvParser from 'csv-parser';  // CSV parsing

// Create a new S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Function to fetch CSV from S3 using the SDK v3
export const fetchCsvFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    // Create GetObjectCommand to fetch the CSV
    const command = new GetObjectCommand(params);
    const data = await s3Client.send(command); // Send command to fetch object from S3
    const csvData = [];

    // Parse CSV using csv-parser
    return new Promise((resolve, reject) => {
      data.Body.pipe(csvParser())
          .on('data', (row) => {
            csvData.push(row);
          })
          .on('end', () => {
            resolve(csvData);
          })
          .on('error', (error) => {
            reject(error);
          });
    });
  } catch (error) {
    console.error('Error fetching CSV from S3:', error);
    if (error.name === 'NoSuchKey') {
      throw new Error(`File with key ${key} does not exist in S3`);
    }
    throw new Error('Error fetching CSV data');
  }
};

// Function to filter CSV data based on query
export const filterCsvData = (data, query) => {
  return data.filter((row) => {
    // Assume query could be an ID or other text search, adjust based on your CSV structure
    const rowValues = Object.values(row).map((value) => value.toString().toLowerCase());
    return rowValues.some((value) => value.includes(query.toLowerCase()));
  });
};
