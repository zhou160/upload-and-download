const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
let url = path.join(__dirname, '..', 'public', 'upload');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, url);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

let upload = multer({ storage: storage });

router.post('/', upload.any(), (req, res, next) => {
    // fs.readdir(url, (err, files) => {
    //     if (err) throw err;
    //     res.send(files);
    // })
});

router.get('/', (req, res, next) => {
    fs.readdir(url, (err, files) => {
        if (err) throw err;
        res.send(files);
    })
})

module.exports = router;