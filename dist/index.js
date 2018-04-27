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
    recursiveScan(obj, dirPath) {
        const files = fs.readdirSync(dirPath);
        for (let filePath of files) {
            filePath = path.resolve(dirPath, filePath);
            const fileName = path.basename(filePath);
            if (fileName == '.' || fileName == '..')
                continue;
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                obj[fileName] = {};
                this.recursiveScan(obj[fileName], filePath);
            }
            else {
                obj[fileName] = null;
                this.fileHandler(obj, fileName, filePath);
            }
        }
    }
    fileHandler(obj, fileName, filePath) {
        obj[fileName] = path.extname(fileName);
    }
}
exports.Scanner = Scanner;
