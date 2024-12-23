import AWS from 'aws-sdk';

// Set AWS credentials and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET,
});

// Create an S3 instance
const s3 = new AWS.S3();

export default s3;