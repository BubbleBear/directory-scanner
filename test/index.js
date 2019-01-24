const { Scanner } = require('../dist');
const path = require('path');

const ds = new Scanner({
    fileHandler(o, fn, fp, ext) {
        o[fn] = ext;
    },
});

const obj = ds.scan(path.resolve(__dirname, '../'));

console.dir(obj);
