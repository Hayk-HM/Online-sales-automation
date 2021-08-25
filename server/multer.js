const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, 'public/image')
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'public/pdf')
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, 'public/excel')
    } else if (file.mimetype === 'application/vnd.ms-excel') {
      cb(null, 'public/excel')
    } else {
      cb(null, 'public')
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage }).single('file')

module.exports = { upload }