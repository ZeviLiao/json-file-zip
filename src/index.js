


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
let pptId = process.argv[2];
const fileNameNoExt = `ptt-${pptId}-${+ new Date()}`

const ptt = {
    "metadata": {  // tags , category fixed value.
        "category": "宗教", // null
        "tags": []
    },
    "serials": [
        { a: 1 },
        { b: 1 }
    ]
}

zip.file(`${fileNameNoExt}.json`, JSON.stringify(ptt));
zip.generateAsync({ type: "nodebuffer" })
    .then(function (content) {
        
        const fileSize = content.toString().length
        const md5 = crypto.createHash('md5');
        let result = md5.update(content).digest('hex');

        const fileName = `${fileNameNoExt}.zip`

        fs.writeFile(fileName, content, function (err) {
            if (err) throw err;
            console.log('done', result, fileSize)
        });
    });
