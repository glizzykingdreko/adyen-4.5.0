function getCurrentTimestamp() {
    return new Date().toISOString();
}

function w(e) {
    var t = e;
    ht = new TextEncoder
    "string" == typeof t && (t = ht.encode(t));
    for (var r = [], n = 0; n < t.length; n += 32768)
        r.push(String.fromCharCode.apply(null, t.subarray(n, n + 32768)));
    return btoa(r.join(""))
}

function _(e) {
    return w(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function k(e) {
    if (!e)
        return new Uint8Array(0);
    e.length % 2 == 1 && (e = "0" + e);
    for (var t = e.length / 2, r = new Uint8Array(t), n = 0; n < t; n++)
        r[n] = parseInt(e.substr(2 * n, 2), 16);
    return r
}

let bt = Math.pow(2, 32);

function mt(e, t, r) {
    if (t < 0 || t >= bt)
        throw new RangeError(`value must be >= 0 and <= ${bt - 1}. Received ${t}`);
    e.set([t >>> 24, t >>> 16, t >>> 8, 255 & t], r);
}

module.exports = {
    w,
    _,
    k,
    getCurrentTimestamp,
    bt,
    mt
};