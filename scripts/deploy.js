const B2 = require("backblaze-b2");
const fs = require("fs").promises;
const path = require("path");
const util = require("util");
const glob = util.promisify(require("glob"));

require("dotenv").config();

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

async function uploadDirectory(directory) {
  try {
    // Authenticate with B2
    await b2.authorize();

    // Get upload URL
    const uploadUrlResponse = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID,
    });

    // Get all files from the build directory
    const files = await glob("**/*", {
      cwd: directory,
      nodir: true,
      absolute: true,
    });

    // Upload each file
    for (const file of files) {
      const fileBuffer = await fs.readFile(file);
      const fileName = path.relative(directory, file);

      await b2.uploadFile({
        uploadUrl: uploadUrlResponse.data.uploadUrl,
        uploadAuthToken: uploadUrlResponse.data.authorizationToken,
        fileName: fileName,
        data: fileBuffer,
        onUploadProgress: (event) => {
          console.log(
            `Uploading ${fileName}: ${Math.round(
              (event.loaded * 100) / event.total
            )}%`
          );
        },
      });

      console.log(`Uploaded: ${fileName}`);
    }

    console.log("Deployment completed successfully!");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

// Upload the React build directory
const buildDir = path.join(__dirname, "..", "client", "build");
uploadDirectory(buildDir);
