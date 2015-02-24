/* globals describe, before, it */

'use strict';

var ROOT_DIR = require('path').resolve(__dirname + '/../..');

var expect = require('chai').expect;
var STATUS_CODES = require('http-status');

describe('HttpError', function () {
    var HttpError;

    before(function () {
        HttpError = require(ROOT_DIR + '/HttpError');
    });

    it('shoudl have a #name', function () {
        expect(HttpError).to.have.property('name', 'HttpError');
    });

    describe('#constructor', function () {
        var defaultError = {
            status: 500,
            message: STATUS_CODES[500]
        };

        it('should be a constructor', function () {
            expect(new HttpError()).to.be.an.instanceof(HttpError);
        });

        it('should extend Error', function () {
            expect(new HttpError()).to.be.an.instanceof(Error);
        });

        it('should return the default status and error if passed nothing', function () {
            var error = new HttpError();
            expect(error).to.be.an('object').and.have.property('statusCode', defaultError.status);
            expect(error).to.have.property('message', defaultError.message);
        });

        it('should set the proper error messge for the passed in status', function () {
            var error = new HttpError(400);
            expect(error).to.be.an('object').and.have.property('statusCode', 400);
            expect(error).to.have.property('message', STATUS_CODES[400]);
        });

        it('should set a custom message', function () {
            var message = 'missing foo param when calling the bar service';
            var error = new HttpError(400, message);
            expect(error).to.be.an('object').and.have.property('statusCode', 400);
            expect(error).to.have.property('message', message);
        });

        it('should set the default status if passed an invalid status code', function () {
            var error = new HttpError(9001);
            expect(error).to.be.an('object').and.have.property('statusCode', defaultError.status);
            expect(error).to.have.property('message', defaultError.message);
        });

        it('should set a debug prop if passed in as opts.debug', function () {
            var message = 'missing foo param when calling the bar service';
            var debug = ['guid=1234', 'params=baz'];

            var error = new HttpError(400, message, {
                debug: debug
            });

            expect(error).to.be.an('object').and.have.property('statusCode', 400);
            expect(error).to.have.property('message', message);
            expect(error).to.have.property('debug', debug).that.has.length(2);
        });
    });
});
