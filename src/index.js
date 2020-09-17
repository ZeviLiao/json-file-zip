


// var JSZip = require("jszip");
// var fs = require("fs");
// var path = require("path");
import JSZip  from 'jszip';
import fs  from 'fs';
import path  from 'path';

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
        fs.writeFile(`presentation-${+ new Date()}.zip`, content, function (err) {
            if (err) throw err;
            console.log('done')
        });
    });
