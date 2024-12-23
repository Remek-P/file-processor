import { PassThrough } from 'stream';  // To pipe data through
import csvParser from 'csv-parser';   // CSV parser for streaming
import AWS from 'aws-sdk';  // AWS SDK to interact with S3

// Initialize the AWS S3 instance
const s3 = new AWS.S3();

/**
 * Function to process CSV file: Stream, clean, and upload to S3
 *
 * @param {Object} file - The uploaded file from the form.
 * @returns {Promise<string>} - The URL of the uploaded file in S3
 */
export async function streamCSVToS3(file) {
  // Create a readable stream from the uploaded file
  const fileStream = file.stream(); // For Next.js API, `file.stream()` provides the file stream

  // Create a PassThrough stream that will act as a buffer for streaming data to S3
  const passThrough = new PassThrough();

  // Define the S3 upload parameters
  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,  // The S3 bucket name (use your bucket here)
    Key: `uploads/${Date.now()}-${file.name}`,  // Unique filename based on timestamp
    Body: passThrough,  // The stream that will be uploaded to S3
    ContentType: 'text/csv',  // File type
  };

  // Initialize S3 upload (returns a promise)
  const s3Upload = s3.upload(s3Params).promise();

  // Create a CSV parser that will read and process the uploaded CSV stream
  const csvStream = fileStream
      .pipe(csvParser({ separator: ',', headers: true, skipEmptyLines: true }))  // CSV parser options
      .on('data', (row) => {
        // Clean up the row data before writing to S3
        const cleanedRow = cleanCSVRow(row);
        // Write the cleaned row into the PassThrough stream in CSV format
        passThrough.write(`${Object.values(cleanedRow).join(',')}\n`);
      })
      .on('end', () => {
        // End the PassThrough stream after all rows are processed
        passThrough.end();
      })
      .on('error', (err) => {
        console.error('Error processing CSV:', err);
        passThrough.emit('error', err);  // Forward errors to the PassThrough stream
      });

  try {
    // Wait for the S3 upload to complete and return the URL of the uploaded file
    const result = await s3Upload;
    console.log('File uploaded successfully:', result.Location);
    return result.Location;  // Return the URL of the uploaded file
  } catch (error) {
    console.error('Failed to upload to S3:', error);
    throw error;
  }
}

/**
 * Clean a single CSV row: trim headers, clean non-UTF-8 characters, etc.
 *
 * @param {Object} row - The row data from the CSV.
 * @returns {Object} - The cleaned row data.
 */
function cleanCSVRow(row) {
  const cleanedRow = {};

  Object.keys(row).forEach((header) => {
    const cleanedHeader = header
        .trim()  // Remove leading/trailing spaces from header
        .replace(/\s+/g, '_')  // Replace spaces with underscores in header names
        .replace(/[^\x00-\x7F]/g, '');  // Remove non-UTF-8 characters in header
    cleanedRow[cleanedHeader] = row[header]
        .replace(/[^\x00-\x7F]/g, '');  // Remove non-UTF-8 characters in values
  });

  return cleanedRow;
}
