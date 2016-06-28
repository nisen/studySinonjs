var chai = require('chai');
var assert = chai.assert;
//var expect = require('expect.js');
var expect = chai.expect;
var sinon=require("sinon");

/*  */
function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}


describe('JavaScript addition operator',function() {
    //建立it块
    it('adds two numbers together', function () {
        //测试1+2是否等于3
        expect(1 + 2).equal(3);
    });

    it("calls the original function only once", function () {
        var callback = sinon.spy();
        var proxy = once(callback);

        proxy();
        proxy();

        assert(callback.called);
    });


    it("returns the return value from the original function", function () {
        var callback = sinon.stub().returns(42);
        var proxy = once(callback);

        assert.equals(proxy(), 42);
    });


    it("calls original function with right this and args", function () {
        var callback = sinon.spy();
        var proxy = once(callback);
        var obj = {};

        proxy.call(obj, 1, 2, 3);

        assert(callback.calledOn(obj));
        assert(callback.calledWith(1, 2, 3));
    });

    it("calls the original function", function () {
        var callback = sinon.spy();
        var proxy = once(callback);

        proxy();

        assert(callback.called);
    });
});