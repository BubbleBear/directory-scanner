const { scan, scanSync } = require('../dist');
const path = require('path');

scan(path.resolve(__dirname), (_, fp) => require(fp)).then(obj => console.dir(obj, { depth: null }));

// const obj = scanSync(path.resolve(__dirname));

// console.dir(obj, {
//     depth: null
// });
