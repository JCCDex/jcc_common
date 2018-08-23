'use strict';

const bin2hex = (b) => {
    let i = 0
    let l = 0
    let o = ''
    let s = b + ''
    let n
    for (i = 0, l = s.length; i < l; i++) {
        n = s.charCodeAt(i).toString(16)
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
    return !Number.isNaN(parseFloat(num)) && Number.isFinite(parseFloat(num));
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
    if (!isNumber(n)) {
        return n;
    }
    return parseFloat(n).toLocaleString();
}

module.exports = {
    getUUID,
    filterOx,
    isEmptyObject,
    dedupe,
    isNumber,
    isInteger,
    scientificToDecimal,
    toThousandSeperator
}