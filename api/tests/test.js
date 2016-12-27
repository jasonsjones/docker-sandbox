'use strict';

var chai = require('chai');
var expect = chai.expect;

console.log('NODE_ENV: ' + process.env.NODE_ENV);
describe('The mocha test framework', function () {
    it('is working', function () {
        expect(true).to.be.true;
    });
});
