// const os = require('os');
// const path = require('path');

// console.log(1, os.type());
// console.log(2, os.version());

// console.log(3, path.basename(__filename)); // check current file name
// console.log(4, path.dirname(__filename)); // check current directory name
// console.log(5, path.extname(__filename)); // check current file extension
// console.log(6, path.parse(__filename));

const { add, subtract, multiply, divide } = require('./components/math.js');

console.log(add(1, 2));
console.log(subtract(4, 2));
console.log(multiply(10, 9));
console.log(divide(20, 2));
