/**
MIT License

Copyright (c) 2018 JCC Dex

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
/**
 * @author https://github.com/GinMu
 */
'use strict';

const bin2hex = (b) => {
    let i = 0
    let l = 0
    let o = ''
    let s = b + ''
    let n
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16)
        /* istanbul ignore next */
        o += n.length < 2 ? '0' + n : n
    }
    return o
}

/**
 * finger print
 * @returns {String} hex value
 */
const getUUID = () => {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    var txt = 'http://security.tencent.com/'
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.textBaseline = 'tencent'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText(txt, 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText(txt, 4, 17)
    var b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
    var bin = atob(b64)
    return bin2hex(bin.slice(-16, -12))
}

const filterOx = (str) => {
    if (typeof str !== 'string') {
        return str
    }
    if (str.startsWith('0x')) {
        return str.substring(2);
    }
    return str;
}

const isEmptyObject = (obj) => {
    for (let name in obj) {
        return false;
    }
    return true;
}

const dedupe = (arr) => {
    if (!Array.isArray(arr)) {
        return [];
    }
    return Array.from(new Set(arr));
}

const isNumber = (num) => {
    return !Number.isNaN(num) && Number.isFinite(num);
}

const isInteger = (num) => {
    let reg = /^-?\d+$/;
    return reg.test(num);
}

const scientificToDecimal = (num) => {
    // if the number is in scientific notation remove it
    if (/\d+\.?\d*e[+-]*\d+/i.test(num)) {
        var zero = '0';
        var parts = String(num).toLowerCase().split('e'); // split into coeff and exponent
        var e = parts.pop(); // store the exponential part
        var l = Math.abs(e); // get the number of zeros
        var sign = e / l;
        var coeffArray = parts[0].split('.');
        if (sign === -1) {
            num = zero + '.' + new Array(l).join(zero) + coeffArray.join('');
        } else {
            var dec = coeffArray[1];
            if (dec) l = l - dec.length;
            num = coeffArray.join('') + new Array(l + 1).join(zero);
        }
    }
    return num;
};

const toThousandSeperator = (n) => {
    let num = parseFloat(n);
    if (!isNumber(num)) {
        return n;
    }
    return num.toLocaleString();
}

const browser = {
    versions: (function () {
        let u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, // IE
            presto: u.indexOf('Presto') > -1, // Opera
            webKit: u.indexOf('AppleWebKit') > -1, // Apple、Chrome
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // Firefox
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), // mobile
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android
            iPhone: u.indexOf('iPhone') > -1, // iPhone、QQHD
            iPad: u.indexOf('iPad') > -1, // iPad
            webApp: u.indexOf('Safari') === -1, // web
            weixin: u.indexOf('MicroMessenger') > -1, // wechat
            qq: u.match(/\sQQ/i) === " qq" // QQ
        };
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

exports = module.exports = {
    getUUID,
    filterOx,
    isEmptyObject,
    dedupe,
    isNumber,
    isInteger,
    scientificToDecimal,
    toThousandSeperator,
    browser
}