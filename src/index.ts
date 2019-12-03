import * as fs from 'fs';
import * as path from 'path';
import * as utils from 'util';

function defaultHandler(filename: string, filepath: string) {
    return filepath;
}

export async function scan(dirPath: string, handler = defaultHandler) {
    const fileList = await utils.promisify(fs.readdir)(dirPath);

    return (await Promise.all(
        fileList.map(async (filename) => {
            const filepath = path.resolve(dirPath, filename);

            // ln pointing to nonexistent file may lead to rejection
            try {
                const fileStat = await utils.promisify(fs.stat)(filepath);

                if (fileStat.isDirectory()) {
                    return scan(filepath, handler);
                } else {
                    return handler(filename, filepath);
                }
            } catch (e) { }
        })
    )).reduce((acc, cur, idx) => {
        if (cur !== undefined && Object.keys(cur).length > 0) {
            const filename = fileList[idx];
            acc[filename] = cur;
        }

        return acc;
    }, {} as Promise<any>);
}

export function scanSync(dirPath: string, handler = defaultHandler) {
    const fileList = fs.readdirSync(dirPath);

    return fileList.map((filename) => {
        const filepath = path.resolve(dirPath, filename);

        // ln pointing to nonexistent file may lead to error
        try {
            const fileStat = fs.statSync(filepath);

            if (fileStat.isDirectory()) {
                return scanSync(filepath, handler);
            } else {
                return handler(filename, filepath);
            }
        } catch (e) { }
    }).reduce((acc, cur, idx) => {
        if (cur !== undefined && Object.keys(cur).length > 0) {
            const filename = fileList[idx];
            acc[filename] = cur;
        }

        return acc;
    }, {});
}
