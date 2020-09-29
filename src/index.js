


// var JSZip = require("jszip");
// var fs = require("fs");
// var path = require("path");
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

import { sayHello } from './hello'
import crypto from 'crypto';
import filesize from 'filesize'

// sayHello()

var zip = new JSZip();

const jsonFolder = path.join(__dirname, './archive/');

fs.readdir(jsonFolder, (err, files) => {
    files.forEach(file => {
        const filePath = jsonFolder + file
        var file_content = fs.readFileSync(filePath);
        zip.file(file, file_content);
    });
});


// zip.file("Hello.txt", "Hello World\n");
// var img = zip.folder("images");
// img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({ type: "nodebuffer" })
    .then(function (content) {
        const fileSize = content.toString().length

        const md5 = crypto.createHash('md5');
        let result = md5.update(content).digest('hex');

        const fileName = `presentation-${+ new Date()}.zip`

        fs.writeFile(fileName, content, function (err) {
            if (err) throw err;
            console.log('done', result, fileSize)
            // var stats = fs.statSync(fileName)
            // var fileSizeInMb = filesize(stats.size, { round: 0 });
            // console.log(fileSizeInMb)
        });
    });
