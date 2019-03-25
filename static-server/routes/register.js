const multer = require('multer');
const path = require('path');

const DIR = './uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      // cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

function fileFilter(req, file, cb) {
  console.log('under fileFilter');
  // console.log('req = ', req);
  console.log('file = ', file);
  if (!file.mimetype) {
    console.log('under first if block');
    return cb('file not found for upload', false);
  }
  if (!file.mimetype.startsWith('image/')) {
    console.log('under second if block');
    return cb('Uploaded file should be an image', false);
  }
  cb(null, true);
}

const fileLimit = 1024 * 1024 * 5;

// const upload = multer({storage: storage});
const upload = multer({storage: storage, fileFilter: fileFilter, limits: { fileSize: fileLimit }});
// const upload = multer({storage: storage, fileFilter: fileFilter});

module.exports = function(app) {
  app.post('/api/register', upload.single('profilePic'), (req, res, next) => {
    // console.log('req.body = ', req.body);
    // console.log('req.file = ', req.file);
    res.sendFile(path.join(__dirname, '..', 'data', 'register.json'));
  });
}
