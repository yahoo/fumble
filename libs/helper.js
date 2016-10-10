/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

var STATUS_CODES = require('http-status');
var camelCase = require('camelcase');

module.exports = {
    httpErrorMessageToMethodName: camelCase,
    mapHTTPStatusCodesToMessagesAndMethodNames: function (statusCodes) {
        var mapping = [];
        statusCodes.forEach(function (status) {
            var message = STATUS_CODES[status];
            var method = camelCase(message);
            mapping.push({
                status: status,
                message: message,
                method: method
            });
        });

        return mapping;
    }
};
