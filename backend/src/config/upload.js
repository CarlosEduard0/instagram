const { diskStorage } = require('multer');
const path = require('path');

module.exports = {
    storage: diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function(request, file, cb) {
            cb(null, file.originalname);
        }
    })
}