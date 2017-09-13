// 'use strict';

// const common = require('../common');
// const { deepStrictEqual, throws } = require('assert');
// [
//   {},
//   new Boolean(true),		//boolean is an object here
//    { valueOf() { return null; } },
//    { valueOf() { return undefined; } },
//    { valueOf: null },
//   Object.create(null)
// ].forEach((input) => {
// 	console.log(input);
//   const err = common.expectsError({
//     code: 'ERR_INVALID_ARG_TYPE',
//     type: TypeError,
//     message: 'The first argument must be one of type string, buffer, ' +
//     'arrayBuffer, array, or array-like object'
//   });
//   throws(() => Buffer.from(input), err);
// });