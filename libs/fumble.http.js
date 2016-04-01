/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var HttpError = require('./../HttpError');

function create (status, message, options) {
    return new HttpError(status, message, options);
}

function generateMethod (status, defaultMessage) {
    return function createMethod (message, options) {
        return create(status, message || defaultMessage, options || {});
    };
}

var fumbleHttp = {
    create: create
};

var config = require('./../config').http;
var helper = require('./helper');
var SUPPORTED_METHODS = helper.mapHTTPStatusCodesToMessagesAndMethodNames(config.SUPPORTED_METHODS);

SUPPORTED_METHODS.forEach(function eachMethod (supported) {
    var method = generateMethod(supported.status, supported.message);
    fumbleHttp[supported.method] = method;
});

module.exports = fumbleHttp;
