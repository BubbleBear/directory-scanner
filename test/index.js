const { Scanner } = require('../dist');
const path = require('path');

const ds = new Scanner();

const obj = ds.scan(path.resolve(__dirname, '../'));

console.dir(obj);
