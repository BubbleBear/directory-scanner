"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const utils = require("util");
function defaultHandler(filename, filepath) {
    return filepath;
}
function scan(dirPath, handler = defaultHandler) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileList = yield utils.promisify(fs.readdir)(dirPath);
        return (yield Promise.all(fileList.map((filename) => __awaiter(this, void 0, void 0, function* () {
            const filepath = path.resolve(dirPath, filename);
            // ln pointing to nonexistent file may lead to rejection
            try {
                const fileStat = yield utils.promisify(fs.stat)(filepath);
                if (fileStat.isDirectory()) {
                    return scan(filepath, handler);
                }
                else {
                    return handler(filename, filepath);
                }
            }
            catch (e) { }
        })))).reduce((acc, cur, idx) => {
            if (cur !== undefined && Object.keys(cur).length > 0) {
                const filename = fileList[idx];
                acc[filename] = cur;
            }
            return acc;
        }, {});
    });
}
exports.scan = scan;
function scanSync(dirPath, handler = defaultHandler) {
    const fileList = fs.readdirSync(dirPath);
    return fileList.map((filename) => {
        const filepath = path.resolve(dirPath, filename);
        // ln pointing to nonexistent file may lead to error
        try {
            const fileStat = fs.statSync(filepath);
            if (fileStat.isDirectory()) {
                return scanSync(filepath, handler);
            }
            else {
                return handler(filename, filepath);
            }
        }
        catch (e) { }
    }).reduce((acc, cur, idx) => {
        if (cur !== undefined && Object.keys(cur).length > 0) {
            const filename = fileList[idx];
            acc[filename] = cur;
        }
        return acc;
    }, {});
}
exports.scanSync = scanSync;
