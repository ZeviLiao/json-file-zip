


var JSZip = require("jszip");
var fs = require("fs");
var path = require("path");
var zip = new JSZip();
var file_content = fs.readFileSync(path.join(__dirname,'./archive/presentation-48.json'));
zip.file("presentation-48.json", file_content);
// zip.file("Hello.txt", "Hello World\n");
// var img = zip.folder("images");
// img.file("smile.gif", imgData, {base64: true});
zip.generateAsync({type:"nodebuffer"})
.then(function(content) {
    fs.writeFile("presentation-48.zip", content, function (err) {
        if (err) throw err;
    });
});
