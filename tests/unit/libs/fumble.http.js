/* globals describe, before, it */

'use strict';

var ROOT_DIR = require('path').resolve(__dirname, '../../..');

var expect = require('chai').expect;

var HTTP_STATUS_CODES = require('http-status');
var HttpError = require(ROOT_DIR + '/HttpError');
var config = require(ROOT_DIR + '/config').http;

describe('libs/fumble.http', function () {
    var httpfumble;

    var SUPPORTS = [
        'badRequest',
        'unauthorized',
        'forbidden',
        'notFound',
        'methodNotAllowed',
        'proxyAuthenticationRequired',
        'conflict',
        'gone',
        'preconditionFailed',
        'tooManyRequests',
        'internalServerError',
        'notImplemented',
        'badGateway',
        'serviceUnavailable'
    ];

    before(function () {
        httpfumble = require(ROOT_DIR + '/libs/fumble.http');
    });

    describe('#create', function () {
        it('should return an HttpError instance', function () {
            var status = 400;
            var debug = ['param=bar'];

            var errors = [httpfumble.create(status, 'message foo', {
                debug: debug
            }), httpfumble.create(status, null, {
                debug: debug
            })];

            errors.forEach(function (error) {
                expect(error).to.be.an.instanceof(HttpError).and.have.property('statusCode', status);
                expect(error).to.have.property('debug', debug).and.has.length(1);
            });

            expect(errors[0]).to.have.property('message', 'message foo');
            expect(errors[1]).to.have.property('message', HTTP_STATUS_CODES[status]);
        });
    });

    SUPPORTS.forEach(function (method, index) {
        describe('#' + method, function () {
            var status = config.SUPPORTED_METHODS[index];
            var message = HTTP_STATUS_CODES[status];

            it('should provide a ' + method + ' method', function () {
                expect(httpfumble).to.respondTo(method);
            });

            it('should return an HttpError instance', function () {
                expect(httpfumble[method]()).to.be.an.instanceof(HttpError);
            });

            it('should have the proper status code and message', function () {
                var error = httpfumble[method]();
                expect(error).to.deep.equal(new HttpError(status, message));
            });

            it('should be able to set a custom message', function () {
                var error = httpfumble[method]('foo');
                expect(error).to.deep.equal(new HttpError(status, 'foo'));
            });

            it('should set a debug prop if passed in as opts.debug', function () {
                var debug = ['foo=bar', 'foobar'];
                var error = httpfumble[method](null, {
                    debug: debug
                });

                expect(error).to.deep.equal(new HttpError(status, null, {
                    debug: debug
                }));
            });
        });
    });
});
