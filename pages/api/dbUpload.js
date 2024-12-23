import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';  // AWS SDK v3
import fs from 'fs';

// Initialize S3 client with AWS credentials
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp'); // Temporarily store files in /tmp directory (for Next.js serverless deployment)
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Disable the default Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Use multer to handle file upload
    upload.single('csv')(req, res, async (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).json({ error: 'Error uploading the file' });
      }

      // File uploaded successfully, now upload it to S3
      const uploadedFile = req.file;
      const filePath = uploadedFile.path;
      const fileName = uploadedFile.filename;

      try {
        // Create a read stream from the temporary file
        const fileStream = fs.createReadStream(filePath);

        // Prepare S3 upload parameters
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `uploads/${fileName}`, // Store in the "uploads" folder in S3
          Body: fileStream,
          ContentType: 'text/csv', // Set MIME type to CSV
        };

        // Upload the file to S3
        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);

        // Clean up the temporary file
        fs.unlinkSync(filePath); // Delete the temporary file after upload

        // Return the file URL
        const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/uploads/${fileName}`;
        res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
      } catch (uploadError) {
        console.error('Error uploading file to S3:', uploadError);
        res.status(500).json({ error: 'Failed to upload the CSV file to S3' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
