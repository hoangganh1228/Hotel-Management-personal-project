const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')  


// Cloudinary

cloudinary.config({ 
  cloud_name: 'dnczc3gzn', 
  api_key: '185176958515381', 
  api_secret: '6HbsgOAVH3UloQF9JsJ5QpB3zEI' 
});

// End Cloudinary

const streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

module.exports.upload = (req, res, next) => {
  if(req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      req.body[req.file.fieldname] = result.secure_url;
      next();
    }

    upload(req);
  }
  else {
    next();

  }
}

module.exports.uploadMultiple = async (req, res, next) => {
  if (req.files && req.files.length > 0) { // Kiểm tra xem có tệp nào không
    try {
      const uploadPromises = req.files.map(file => streamUpload(file));

      const results = await Promise.all(uploadPromises);

      req.body.images = results.map(result => result.secure_url);

      next(); // Chuyển đến middleware hoặc route handler tiếp theo
    } catch (error) {
      console.error('Lỗi khi tải lên nhiều ảnh:', error);
      res.status(500).json({ error: 'Tải lên ảnh thất bại' });
    }
  } else {
    next(); // Không có tệp nào, tiếp tục xử lý tiếp theo
  }

}