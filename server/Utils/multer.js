const multer = require("multer");

//Specify the storage engine
let imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, callback) {
        // var ext = path.extname(file.originalname);
        // if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') 
        
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
            let newError = new Error("Only (.png .jpg .jpeg .gif )Images are allowed");
            newError.name = "MulterError";
            callback(newError, false);
            return
        };
        callback(null, true);
       
    }
});


let videoUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 150
    },
    fileFilter: function (req, file, callback) {
        
        if (file.mimetype === "video/mp4") {
            callback(null, true)
        }
        else {
            //prevent the upload
            var newError = new Error("File type is incorrect");
            newError.name = "MulterError";
            callback(newError, false);
        }
    }
});




module.exports = {videoUpload, imageUpload}