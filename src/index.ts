import * as fs from 'fs';
import * as path from 'path';
import * as utils from 'util';

const fsStat = utils.promisify(fs.stat);

interface ScannerOption {
    fileHandler?(object: { [prop: string]: any }, filename: string, filepath?: string, extname?: string): any;
    [prop: string]: any;
};

class Scanner {
    private rootObj = {};

    constructor(options: ScannerOption = {}) {
        this.deconstructOptions(options);
    }

    public scan(dirRealPath: string) {
        const rootObj = {};
        this.recursiveScan(rootObj, dirRealPath);
        return rootObj;
    }

    public async scanAsync(dirRealPath: string) {
        const rootObj = {};
        await this.recursiveScanAsync(rootObj, dirRealPath);
        return rootObj;
    }

    public async fileHandler(object, filename, filepath, extname) {
        object[filename] = extname;
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
                this.fileHandler(object, filename, filepath, path.extname(filename));
            }
        }
    }

    private async recursiveScanAsync(object, dirPath) {
        const files = fs.readdirSync(dirPath);

        for (let filepath of files) {
            filepath = path.resolve(dirPath, filepath);
            const filename = path.basename(filepath);
            if (filename == '.' || filename == '..') continue;
            const stat = await fsStat(filepath);
            if (stat.isDirectory()) {
                object[filename] = {};
                await this.recursiveScanAsync(object[filename], filepath);
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
