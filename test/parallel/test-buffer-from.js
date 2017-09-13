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
    return 1;
  }
}


assert.deepStrictEqual(Buffer.from(new String(checkString)), check);
assert.deepStrictEqual(Buffer.from(new MyString()), check);
assert.deepStrictEqual(Buffer.from(new MyPrimitive()), check);
assert.deepStrictEqual(Buffer.from(
                  runInNewContext('new String(checkString)', {checkString})),
                check);
[
  [{}, 'object'],
  [new Boolean(true), 'boolean'],
  [{ valueOf() { return null; } }, 'object'],
  [{ valueOf() { return undefined; } }, 'object'],
  [{ valueOf: null }, 'object'],
  [Object.create(null), 'object']
].forEach(([input, actualType]) => {
  const err = common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE',
    type: TypeError,
    message: 'The first argument must be one of type string, buffer, ' +
             'arrayBuffer, array, or array-like object. Received ' +
             `type ${actualType}`
  });
  throws(() => Buffer.from(input), err);
});

