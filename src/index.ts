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

    private recursiveScan(obj, dirPath) {
        const files = fs.readdirSync(dirPath);

        for (let filePath of files) {
            filePath = path.resolve(dirPath, filePath);
            const fileName = path.basename(filePath);
            if (fileName == '.' || fileName == '..') continue;
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                obj[fileName] = {};
                this.recursiveScan(obj[fileName], filePath);
            } else {
                obj[fileName] = null;
                this.fileHandler(obj, fileName, filePath);
            }
        }
    }

    public fileHandler(obj, fileName, filePath) {
        obj[fileName] = path.extname(fileName);
    }
}

export { Scanner };
