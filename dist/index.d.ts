declare function defaultHandler(filename: string, filepath: string): string;
export declare function scan(dirPath: string, handler?: typeof defaultHandler): any;
export declare function scanSync(dirPath: string, handler?: typeof defaultHandler): any;
export {};
