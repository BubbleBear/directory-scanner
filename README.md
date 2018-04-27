# directory-scanner instructions
this is but a simple tool used to map directory structure to a javascript object

## how to use
you will use this package like this:

    const { Scanner } = require('directory-scanner');
    const path = require('path');

    const ds = new Scanner();

    const obj = ds.scan(path.resolve(__dirname, '../'));

    console.dir(obj);

this is just a prototype, more functions like filter shall be implemented in future

## extends
the actions **directory-scanner** will take while scanning directory can acutally be assigned by you. by rewriting **Scanner.fileHandler** you are free to manipulate it's behavior

**Scanner.fileHandler(object, filename, filepath)** can take 3 parameters, *object* is the object current level directory maps to in our mapping object. *filename* and *filepath* are literally what they are.

an example is:

    import { Scanner } from 'directory-scanner';
    import * as fs from 'fs';
    import * as path from 'path';

    const scanner = new Scanner();

    scanner.fileHandler = (o, fn, fp) => {
        const extname = path.extname(fn);
        if (extname == '.schema') {
            o[fn] = fs.readFileSync(fp).toString();
        }
    }

    const schemaLoader = function (dirRealPath) {
        const res = scanner.scan(dirRealPath);
        console.log(res)
    }

    schemaLoader(path.resolve(__dirname, '../test'));

the code above will read all files with *\.schema* extname in target directory
