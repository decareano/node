'use strict';

const common = require('../common');
const { deepStrictEqual, throws } = require('assert');
const { Buffer } = require('buffer');
const { runInNewContext } = require('vm');
const assert = require('assert');

const checkString = 'test';

const check = Buffer.from(checkString);

class MyString extends String {
  constructor() {
    super(checkString);
  }
}

class MyPrimitive {
  [Symbol.toPrimitive]() {
    return checkString;
    
  }
}
//Buffer.alloc('hello');
class MyBadPrimitive {
  [Symbol.toPrimitive]() {
    return null;
  }
}

assert.deepStrictEqual(Buffer.from(new String(checkString)), check);

assert.deepStrictEqual(Buffer.from(new MyString()), check);
assert.deepStrictEqual(Buffer.from(new MyPrimitive()), check);
assert.deepStrictEqual(Buffer.from(new MyBadPrimitive()), check);
console.dir(new MyBadPrimitive());
check.toString('utf-8');

assert.deepStrictEqual(Buffer.from(
                  runInNewContext('new String(checkString)', {checkString})),
                check);

[
  {},
  new Boolean(true),
  { valueOf() { return null; } },  
  { valueOf: function () { return null }},
  //Object.prototype.valueOf = function () { return null },  //not good practice
  new Object({valueOf: function () { return null; }}),
  console.log(Object),
  
  { valueOf() { return undefined; } },
  { valueOf: null },   //object.valueOf = null...this is not an object
  Object.create(null) //build in syntax 
].forEach((input) => {
  const err = common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE',
    type: TypeError,
    message: 'The first argument must be one of type string, buffer, ' +
    'arrayBuffer, array, or array-like object'
  });
  throws(() => Buffer.from(input), err);
});

[
  new Number(true),
  new MyBadPrimitive()
].forEach((input) => {
  const errMsg = common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE',
    type: TypeError,
    message: 'The "value" argument must not be of type number. ' +
             'Received type number'
  });
  throws(() => Buffer.from(input), errMsg);
});
