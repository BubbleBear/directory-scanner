import * as fs from 'fs';
import * as path from 'path';
import * as utils from 'util';

const fsStat = utils.promisify(fs.stat);

interface ScannerOption {
    fileHandler?(object: object, filename: string, filepath?: string, extname?: string): any;
    [prop: string]: any;
};

class Scanner {
    private rootObj = {};

    constructor(options: ScannerOption = {}) {
        this.deconstructOptions(options);
    }

    public async scan(dirRealPath: string) {
        const rootObj = {};
        await this.recursiveScan(rootObj, dirRealPath);
        return rootObj;
    }

    public async fileHandler(object, filename, filepath, extname) {
        object[filename] = extname;
    }

    private async recursiveScan(object, dirPath) {
        const files = fs.readdirSync(dirPath);

        for (let filepath of files) {
            filepath = path.resolve(dirPath, filepath);
            const filename = path.basename(filepath);
            if (filename == '.' || filename == '..') continue;
            const stat = await fsStat(filepath);
            if (stat.isDirectory()) {
                object[filename] = {};
                await this.recursiveScan(object[filename], filepath);
            } else {
                await this.fileHandler(object, filename, filepath, path.extname(filename));
            }
        }
    }

    private deconstructOptions(options: ScannerOption) {
        ({
            fileHandler: this.fileHandler = this.fileHandler,
        } = options);
    }
}

export {
    Scanner,
    ScannerOption,
};
