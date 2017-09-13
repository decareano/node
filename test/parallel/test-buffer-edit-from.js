
'use strict';

const common = require('../common');
const { deepStrictEqual, throws } = require('assert');
const { Buffer } = require('buffer');
const { runInNewContext } = require('vm');
const assert = require('assert');
const checkString = 'test';
console.log(checkString);

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


class MyBadPrimitive {
  [Symbol.toPrimitive]() {  //should always throw cuz it returns a number
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
  throws(() => Buffer.from(input), err);//if (input.ValueOf() == null) throw new Exception("null value 
  //something xxxxx")
  //throws is an assertion the first argument throws an error that can be validated with ERR
  //is err the callback
});

[
  new Number(true),
  new MyBadPrimitive()
].forEach((input) => {
  console.log(input);
  const errMsg = common.expectsError({
    code: 'ERR_INVALID_ARG_TYPE',
    type: TypeError,
    message: 'The "value" argument must not be of type number. ' +
             'Received type number'
  });
  throws(() => Buffer.from(input), errMsg);
});





