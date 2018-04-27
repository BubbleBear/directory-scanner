# directory-scanner instructions
this is but a simple tool used to map directory structure to a javascript object

## how to use
you will use this package like this:

    const { Scanner } = require('directory-scanner');
    const path = require('path');

    const ds = new Scanner();

    const obj = ds.scan(path.resolve(__dirname, '../'));

    console.dir(obj);

this is just a prototype, more functiosn like filter shall be implemented in future
