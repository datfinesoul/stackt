'use strict;'
const stackt = require('./index');

const error = new Error('stackt!!!');

console.log('```javascript\nconsole.log(error.message, error.stack)\n```');
console.log('\n```');
console.log(error.message, error.name, error.stack);
console.log('```\n')

console.log('```javascript\nconsole.log(error.message, stackt(error.stack))\n```');
console.log('\n```');
console.log(error.message, error.name, stackt(error.stack));
console.log('```\n')
