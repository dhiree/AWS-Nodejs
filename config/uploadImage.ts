import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'ap-south-1'
});

const uploadImageToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string) => {
    try {
        const bucketName = process.env.S3_BUCKET_NAME || "hotel-buccket"
        const params = {
            Bucket: bucketName,
            Key: `menu-images/${fileName}`,
            Body: fileBuffer,
            ContentType: mimeType,
        };

        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error(`File upload failed: ${error}`);
    }
};

export default uploadImageToS3;


// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//     region: process.env.AWS_REGION || 'ap-south-1',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     },
// });

// const uploadImageToS3 = async (fileBuffer: Buffer, fileName: string, mimeType: string) => {
//     try {
//         const bucketName = process.env.S3_BUCKET_NAME || "hotel-buccket";

//         const params = {
//             Bucket: bucketName,
//             Key: `menu-images/${fileName}`,
//             Body: fileBuffer,
//             ContentType: mimeType,
//         };

//         // Use PutObjectCommand to upload to S3
//         const command = new PutObjectCommand(params);
//         const data = await s3.send(command);

//         // Return the S3 URL for the uploaded file
//         return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/menu-images/${fileName}`;
//     } catch (error) {
//         console.error('Error uploading file to S3:', error);
//         throw new Error(`File upload failed: ${error}`);
//     }
// };

// export default uploadImageToS3;
