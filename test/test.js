const chai = require('chai');
const expect = chai.expect;
const jcUtils = require('../src');
describe('test getUUID', function () {
    before(function () {
        const jsdom = require('jsdom')
        const {
            JSDOM
        } = jsdom
        const a = new JSDOM('<!doctype html><html><body></body></html>', {
            resources: 'usable'
        });
        const {
            window
        } = a;
        global.document = window.document
        global.atob = window.atob;
    });

    it('should get hex value when call getUUID api', function () {
        this.timeout(0);
        let uuid = jcUtils.getUUID();
        let valid = /[^0x][0-9a-fA-F]$/i.test(uuid);
        expect(valid).to.equal(true);
    });
});

describe('test filterOx', function () {

    it('should return itself if the data is not string', function () {
        let str = 1;
        let filterStr = jcUtils.filterOx(str);
        expect(filterStr).to.equal(1);
    });

    it('should filter 0x if contain 0x', function () {
        let str = '0x123456';
        let filterStr = jcUtils.filterOx(str);
        expect(filterStr).to.equal('123456');
    });

    it('should not filter 0x if not contain 0x', function () {
        let str = '1234567';
        let filterStr = jcUtils.filterOx(str);
        expect(filterStr).to.equal('1234567');
    });
});

describe('test isEmptyObject', function () {
    it('{} is empty object', function () {
        let obj = {};
        let res = jcUtils.isEmptyObject(obj);
        expect(res).to.equal(true);
    });

    it('null is empty', function () {
        let obj = null;
        let res = jcUtils.isEmptyObject(obj);
        expect(res).to.equal(true);
    });

    it('undefined is empty', function () {
        let obj = undefined;
        let res = jcUtils.isEmptyObject(obj);
        expect(res).to.equal(true);
    });

    it("'' is empty", function () {
        let obj = '';
        let res = jcUtils.isEmptyObject(obj);
        expect(res).to.equal(true);
    });

    it('{ a: 1 } is not empty object', function () {
        let obj = {
            a: 1
        };
        let res = jcUtils.isEmptyObject(obj);
        expect(res).to.equal(false);
    });
});

describe('test dedupe', function () {

    it('should return empty array if data is not array', function () {
        let arr = undefined;
        let res = jcUtils.dedupe(arr);
        expect(res).to.deep.equal([]);
    });

    it('should remove repeating data', function () {
        let arr = [1, 2, 2, 3];
        let res = jcUtils.dedupe(arr);
        expect(res).to.deep.equal([1, 2, 3]);
    });
});

describe('test isNumber', function () {

    it('1234 is number', function () {
        let a = 1234;
        let res = jcUtils.isNumber(a);
        expect(res).to.equal(true);
    });

    it('"1234" is not number', function () {
        let a = "1234";
        let res = jcUtils.isNumber(a);
        expect(res).to.equal(false);
    });

    it('Infinity is not number', function () {
        let a = Infinity;
        let res = jcUtils.isNumber(a);
        expect(res).to.equal(false);
    });

    it('NaN is not number', function () {
        let a = NaN;
        let res = jcUtils.isNumber(a);
        expect(res).to.equal(false);
    });
});

describe('test isInteger', function () {
    it('1235678900000000000 is interge', function () {
        let a = 1235678900000000000;
        let res = jcUtils.isInteger(a);
        expect(res).to.equal(true)
    });

    it('-1235678900000000000 is interge', function () {
        let a = -1235678900000000000;
        let res = jcUtils.isInteger(a);
        expect(res).to.equal(true)
    });

    it('-1.2 is not interge', function () {
        let a = -1.2;
        let res = jcUtils.isInteger(a);
        expect(res).to.equal(false)
    });

    it('1.2 is not interge', function () {
        let a = 1.2;
        let res = jcUtils.isInteger(a);
        expect(res).to.equal(false)
    });

    it('"1.2" is not interge', function () {
        let a = "1.2";
        let res = jcUtils.isInteger(a);
        expect(res).to.equal(false)
    });
});

describe('test scientificToDecimal', function () {
    it('should return "10000000000000000000000" when the data is 1e+22', function () {
        let a = 1e+22;
        let res = jcUtils.scientificToDecimal(a);
        expect(res).to.equal("10000000000000000000000")
    });

    it('should return 100 when the data is 100', function () {
        let a = 100;
        let res = jcUtils.scientificToDecimal(a);
        expect(res).to.equal(100)
    });

    it('should return "13000000000000000000000" when the data is 1.3e22', function () {
        let a = 1.3e22;
        let res = jcUtils.scientificToDecimal(a);
        expect(res).to.equal("13000000000000000000000")
    });

    it('should return "0.0000000000000001" when the data is 1e-16', function () {
        let a = 1e-16;
        let res = jcUtils.scientificToDecimal(a);
        expect(res).to.equal("0.0000000000000001")
    });
});

describe('test toThousandSeperator', function () {
    it('should return itself when the data is not number', function () {
        let a = 'aaaa';
        let res = jcUtils.toThousandSeperator(a);
        expect(res).to.equal("aaaa")
    });
    it('should return "1,000" when the data is 1000', function () {
        let a = 1000;
        let res = jcUtils.toThousandSeperator(a);
        expect(res).to.equal("1,000")
    });

    it('should return "1,000.1" when the data is 1000.1', function () {
        let a = 1000.1;
        let res = jcUtils.toThousandSeperator(a);
        expect(res).to.equal("1,000.1")
    });
});