'use strict';

const express = require('express');
const tus = require('tus-node-server');
const path = require('path');

const app = express();
const server = new tus.Server();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'assets')));

// A bucket is a container for objects (files).
const projectId = process.env.GCLOUD_PROJECT_ID;
const bucket = process.env.GCLOUD_STORAGE_BUCKET;
// [END config]

server.datastore = new tus.GCSDataStore({
    path: '/uploads',
    projectId: projectId,
    keyFilename: 'keyfile.json',
    bucket: bucket,
});

app.all('/uploads/*', function(req, res) {
    console.log(req);

    server.handle(req, res);
});

// Multer is required to process file uploads and make them available via
// req.files.
// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {}
// });

app.get('/', function(req, res, next){
    res.render('index');
});

//app.post('/upload', multer.single('file'), function(req, res){
// app.post('/upload', function(req, res){
//     var form = new formidable.IncomingForm();
//     form.parse(req, function(err, fields, files) {
//         // `file` is the name of the <input> field of type `file`
//         var old_path = files.file.path,
//             file_size = files.file.size,
//             file_ext = files.file.name.split('.').pop(),
//             index = old_path.lastIndexOf('/') + 1,
//             file_name = old_path.substr(index),
//             new_path = path.join(process.env.PWD, '/uploads/', file_name + '.' + file_ext);
//
//           fs.readFile(old_path, function(err, data) {
//             fs.writeFile(new_path, data, function(err) {
//                 fs.unlink(old_path, function(err) {
//                     if (err) {
//                         res.status(500);
//                         res.json({'success': false});
//                     } else {
//                         res.status(200);
//                         res.json({'success': true});
//                     }
//                 });
//             });
//         });
//         /*fs.createReadStream(old_path)
//             .pipe(upload({ bucket: bucket, file: files.file.name }))
//             .on('error', function (err) {
//                 res.status(200).send(err);
//             })
//             .on('finish', function () {
//                 const publicUrl = 'https://storage.googleapis.com/'+bucket+'/'+files.file.name;
//                 res.status(200).send(publicUrl);
//         });
//
//         */
//     });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});