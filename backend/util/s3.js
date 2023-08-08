const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const config = require("../config");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { generateRandomId } = require("./random");
const s3 = new S3Client({
  credentials: {
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretAccessKey,
  },
  region: "us-west-1",
});

const s3ProductStorage = multerS3({
  s3,
  bucket: config.s3.bucket,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    const fileName =
      "products/" +
      req.user.id +
      "/" +
      generateRandomId() +
      Date.now() +
      "_" +
      file.originalname;
    cb(null, fileName);
  },
});

function sanitizeFile(file, cb) {
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    cb("Error: File type not allowed!");
  }
}

const deleteS3Obj = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: config.s3.bucket,
    Key: key,
  });
  try {
    const response = await s3.send(command);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  s3,
  s3ProductStorage,
  sanitizeFile,
  deleteS3Obj,
};
