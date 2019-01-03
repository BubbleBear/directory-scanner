"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Scanner {
    constructor(options) {
        this.rootObj = {};
        ;
    }
    scan(dirRealPath) {
        const rootObj = {};
        this.recursiveScan(rootObj, dirRealPath);
        return rootObj;
    }
    recursiveScan(object, dirPath) {
        const files = fs.readdirSync(dirPath);
        for (let filepath of files) {
            filepath = path.resolve(dirPath, filepath);
            const filename = path.basename(filepath);
            if (filename == '.' || filename == '..')
                continue;
            const stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                object[filename] = {};
                this.recursiveScan(object[filename], filepath);
            }
            else {
                this.fileHandler(object, filename, filepath);
            }
        }
    }
    fileHandler(object, filename, filepath) {
        object[filename] = path.extname(filename);
    }
}
exports.Scanner = Scanner;
