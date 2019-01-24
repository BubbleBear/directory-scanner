declare class Scanner {
    private rootObj;
    constructor(options: any);
    scan(dirRealPath: string): {};
    private recursiveScan;
    fileHandler(object: any, filename: any, filepath: any): void;
}
export { Scanner };
