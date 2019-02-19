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
const fsStat = utils.promisify(fs.stat);
;
class Scanner {
    constructor(options = {}) {
        this.rootObj = {};
        this.deconstructOptions(options);
    }
    scan(dirRealPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootObj = {};
            yield this.recursiveScan(rootObj, dirRealPath);
            return rootObj;
        });
    }
    fileHandler(object, filename, filepath, extname) {
        return __awaiter(this, void 0, void 0, function* () {
            object[filename] = extname;
        });
    }
    recursiveScan(object, dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = fs.readdirSync(dirPath);
            for (let filepath of files) {
                filepath = path.resolve(dirPath, filepath);
                const filename = path.basename(filepath);
                if (filename == '.' || filename == '..')
                    continue;
                const stat = yield fsStat(filepath);
                if (stat.isDirectory()) {
                    object[filename] = {};
                    yield this.recursiveScan(object[filename], filepath);
                }
                else {
                    yield this.fileHandler(object, filename, filepath, path.extname(filename));
                }
            }
        });
    }
    deconstructOptions(options) {
        ({
            fileHandler: this.fileHandler = this.fileHandler,
        } = options);
    }
}
exports.Scanner = Scanner;
