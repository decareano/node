'use strict';

const common = require('../common');
const { deepStrictEqual, throws } = require('assert');
const { Buffer } = require('buffer');
const { runInNewContext } = require('vm');
const assert = require('assert');

const checkString = 'test';
console.log(checkString);

const check = Buffer.from(checkString);
console.log(check.toString());


class MyPrimitive {
  [Symbol.toPrimitive]() {
    return checkString;

    
  }
}

[
  {},
  new Boolean(true)		//boolean is an object here
  
]