interface ScannerOption {
    fileHandler?(object: object, filename: string, filepath?: string, extname?: string): any;
    [prop: string]: any;
}
declare class Scanner {
    private rootObj;
    constructor(options?: ScannerOption);
    scan(dirRealPath: string): Promise<{}>;
    fileHandler(object: any, filename: any, filepath: any, extname: any): Promise<void>;
    private recursiveScan;
    private deconstructOptions;
}
export { Scanner, ScannerOption, };
