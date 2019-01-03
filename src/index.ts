import * as fs from 'fs';
import * as path from 'path';

class Scanner {
    private rootObj = {};

    constructor(options) {
        ;
    }

    public scan(dirRealPath: string) {
        const rootObj = {};
        this.recursiveScan(rootObj, dirRealPath);
        return rootObj;
    }

    private recursiveScan(object, dirPath) {
        const files = fs.readdirSync(dirPath);

        for (let filepath of files) {
            filepath = path.resolve(dirPath, filepath);
            const filename = path.basename(filepath);
            if (filename == '.' || filename == '..') continue;
            const stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                object[filename] = {};
                this.recursiveScan(object[filename], filepath);
            } else {
                this.fileHandler(object, filename, filepath);
            }
        }
    }

    public fileHandler(object, filename, filepath) {
        object[filename] = path.extname(filename);
    }
}

export { Scanner };
