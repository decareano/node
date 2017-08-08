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

class MyString extends String {
  constructor() {
    super(checkString);

  }

}

console.log(MyString);

class MyPrimitive {
  [Symbol.toPrimitive]() {
    return checkString;

    
  }
}
console.log(checkString);

class MyBadPrimitive {
  [Symbol.toPrimitive]() {
    return 1;
  }
}
console.log(MyBadPrimitive);


// assert.deepStrictEqual(Buffer.from(new String(checkString)), check);
// // console.log(checkString);

// assert.deepStrictEqual(Buffer.from(new MyPrimitive()), check);
console.log(check);
console.log(checkString);

[
  {},
  new Boolean(true),		//boolean is an object here
  { valueOf() { return null; } },
  { valueOf() { return undefined; } },
  { valueOf: null },
  Object.create(null)
].forEach((input) => {
	console.log(input);
  const err = common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE',
    type: TypeError,
    message: 'The first argument must be one of type string, buffer, ' +
    'arrayBuffer, array, or array-like object'
  });
  throws(() => Buffer.from(input), err);
});




