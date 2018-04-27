import * as fs from 'fs';
import * as path from 'path';

function scanner(dirRealPath: string, fileHandler = defaultFileHandler): object{
    const rootObj = {};
    const pathStack: Array<string> = [dirRealPath];
    const stackTrace: Array<object> = [];
    let curLvlObj = rootObj;

    while (pathStack.length) {
        const curPath: string | undefined = pathStack.pop();
        let files;

        try {
            files = fs.readdirSync(curPath!);
        } catch (e) {
            throw e;
        }

        const pathName = path.basename(curPath!);
        curLvlObj[pathName] && stackTrace.push(curLvlObj[pathName]);

        for (const filePath of files) {
            const fileName = path.basename(filePath);
            if (fileName == '.' || fileName == '..') continue;
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                pathStack.push(filePath);
                curLvlObj[fileName] = {};
            } else {
                curLvlObj[fileName] = null;
                fileHandler(curLvlObj, fileName, filePath);
            }
        }
    }

    return rootObj;
}

function defaultFileHandler(curLvlObj, fileName, filePath) {
    curLvlObj[fileName] = path.extname(fileName);
}

export default scanner;
