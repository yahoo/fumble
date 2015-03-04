/* global describe, it, before */

'use strict';

var ROOT_DIR = require('path').resolve(__dirname, '../..');
var webpack = require('webpack');

var expect = require('chai').expect;

describe('fumble', function () {
    var fumble;

    before(function () {
        fumble = require(ROOT_DIR);
    });

    it('should provide an http object', function () {
        expect(fumble).to.have.property('http').that.is.an('object').and.is.not.empty;
        expect(fumble).to.have.deep.property('http.create').that.is.a('function');
    });

    it('should not error when requiring the webpack generated file', function (done) {
        var config = {
            entry: ROOT_DIR,
            output: {
                path: ROOT_DIR + '/artifacts/webpack-test',
                filename: 'fumble.webpack.js'
            }
        };

        webpack(config, function () {
            require([config.output.path, config.output.filename].join('/'));
            done();
        });
    });
});
