/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

'use strict';

module.exports = {
    http: {
        SUPPORTED_METHODS: [
            // client errors
            400,
            401,
            403,
            404,
            405,
            407,
            409,
            410,
            412,
            429,

            // server errors
            500,
            501,
            502,
            503
        ]
    }
};
