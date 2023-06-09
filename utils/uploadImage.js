import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};
const uploadImages = (resultPhoto) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(resultPhoto, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve({ file: result.secure_url });
      }
      return reject({ msg: error.message });
    });
  });
};

const uploadUniqueImage = (resultPhoto) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(resultPhoto, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve({
          file: result.secure_url,
          namePhoto: result.public_id,
        });
      }
      return reject({ msg: error.message });
    });
  });
};

const uploadMultipleImages = (resultPhoto) => {
  return new Promise((resolve, reject) => {
    const uploads = resultPhoto.map((base) => uploadUniqueImage(base));
    Promise.all(uploads)
      .then((values) => resolve(values))
      .catch((err) => reject(err));
  });
};

const DeleteUniqueImage = (resultPhoto) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(resultPhoto, (error, result) => {
      if (result) {
        return resolve(result);
      }
      return reject({ msg: error.message });
    });
  });
};

// const uploadImages = async (imageURL) => {
//   const upload = await cloudinary.v2.uploader.upload(imageURL, opts);
//   return {
//     file: upload.secure_url,
//   };
// };

export { uploadImages, uploadMultipleImages, DeleteUniqueImage };
