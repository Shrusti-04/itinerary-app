const B2 = require("backblaze-b2");
const path = require("path");

const b2 = new B2({
  applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
  applicationKey: process.env.B2_APPLICATION_KEY,
});

class B2Storage {
  constructor() {
    this.initialized = false;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  async initialize() {
    if (!this.initialized) {
      try {
        await this.retryOperation(() => b2.authorize());
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize B2 storage:', error);
        throw error;
      }
    }
  }

  async retryOperation(operation) {
    let lastError;
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (i < this.maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * (i + 1)));
        }
      }
    }
    throw lastError;
  }
  async uploadFile(fileBuffer, originalName) {
    await this.initialize();

    const fileName = `${Date.now()}-${path.basename(originalName)}`;
    
    const upload = async () => {
      const uploadUrl = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
      });

      const response = await b2.uploadFile({
        uploadUrl: uploadUrl.data.uploadUrl,
        uploadAuthToken: uploadUrl.data.authorizationToken,
        fileName: fileName,
        data: fileBuffer,
        onUploadProgress: (event) => {
          console.log(`Uploading ${fileName}: ${Math.round((event.loaded * 100) / event.total)}%`);
        }
      });

      return response;
    };

    const response = await this.retryOperation(upload);

    return {
      fileName,
      fileId: response.data.fileId,
      url: `https://f002.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`,
    };
  }

  async deleteFile(fileName) {
    await this.initialize();

    const response = await b2.listFileNames({
      bucketId: process.env.B2_BUCKET_ID,
      startFileName: fileName,
      maxFileCount: 1,
    });

    if (
      response.data.files.length > 0 &&
      response.data.files[0].fileName === fileName
    ) {
      await b2.deleteFileVersion({
        fileId: response.data.files[0].fileId,
        fileName: fileName,
      });
    }
  }
}

module.exports = new B2Storage();
