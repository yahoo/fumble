/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var STATUS_CODES = require('http-status');
var DEFAULT_STATUS_CODE = 500;

function HttpError (status, message, options) {
    options = options || {}; // defense

    // consider throwing if 'status' is not in STATUS_CODES
    if (!STATUS_CODES[status]) {
        status = DEFAULT_STATUS_CODE;
    }

    this.statusCode = status;
    this.message = message || STATUS_CODES[this.statusCode];

    if (options.debug) {
        this.debug = options.debug;
    }

    // Stack Trace
    if (Error.captureStackTrace) {
        // if not IE
        Error.captureStackTrace(this, this.constructor);
    } else {
        // in IE
        this.stack = (new Error()).stack;
    }
}

// see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Example.3A_Custom_Error_Types
HttpError.prototype = new Error();
HttpError.prototype.constructor = HttpError;
HttpError.prototype.name = 'HttpError';

module.exports = HttpError;
