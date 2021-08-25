const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage }).single('file')

module.exports = { upload }