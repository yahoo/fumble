/* global describe, it, before */

'use strict';

var ROOT_DIR = require('path').resolve(__dirname, '../../..');

var expect = require('chai').expect;
var camelCase = require('lodash/string/camelCase');

describe('helper', function () {
    var helper;

    var TEST_MAPPINGS = {
        400: {
            message: 'Bad Request',
            method: 'badRequest'
        },
        403: {
            message: 'Forbidden',
            method: 'forbidden'
        },
        408: {
            message: 'Request Time-out',
            method: 'requestTimeOut'
        },
        414: {
            message: 'Request-URI Too Large',
            method: 'requestUriTooLarge'
        }
    };

    before(function () {
        helper = require(ROOT_DIR + '/libs/helper');
    });

    describe('#httpErrorMessageToMethodName', function () {
        it('should return camelCased methods removing spaces and dashes', function () {
            Object.keys(TEST_MAPPINGS).forEach(function (status) {
                var err = TEST_MAPPINGS[status];
                expect(helper.httpErrorMessageToMethodName(err.message)).to.equal(err.method);
            });
        });
    });

    describe('#mapHTTPStatusCodesToMessagesAndMethodNames', function () {
        it('should return an array of objects with the correct status, message, and method props', function () {
            var statusCodes = Object.keys(TEST_MAPPINGS);
            var mappings = helper.mapHTTPStatusCodesToMessagesAndMethodNames(statusCodes);

            expect(mappings).to.be.an('array').of.length(statusCodes.length);

            mappings.forEach(function (mapping) {
                expect(mapping).to.be.an('object').and.have.property('status');
                expect(statusCodes).to.include(mapping.status);

                expect(mapping).to.have.property('message').that.is.a('string');
                expect(mapping).to.have.property('method', camelCase(mapping.method));

                var err = TEST_MAPPINGS[mapping.status];
                expect(mapping.message).to.equal(err.message);
                expect(mapping.method).to.equal(err.method);
            });
        });
    });
});
