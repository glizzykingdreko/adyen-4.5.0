const crypto = require("crypto");
const jwkToPem = require('jwk-to-pem'); 
const { _, k, bt, mt } = require('./utils/helper');

class Adyen {
    constructor(site_key) {
        this.site_key = site_key;
    }

    // Create a function to generate the key
    generateKey() {
        var parts, part1, part2, decodedPart1, decodedPart2, encodedPart1, encodedPart2, keyObject;
        parts = this.site_key.split("|");
        if (parts.length !== 2) {
            throw new Error("Malformed public key: incorrect split parts");
        }
        part1 = parts[0];
        part2 = parts[1];
        decodedPart1 = k(part1);
        decodedPart2 = k(part2);
        encodedPart1 = _(decodedPart1);
        encodedPart2 = _(decodedPart2);
        keyObject = {
            kty: "RSA",
            kid: "asf-key",
            e: encodedPart1,
            n: encodedPart2,
            "alg":"RSA-OAEP",
        };
        this.keyObject = keyObject;
        return keyObject;
    }

    encryptData(plain_text) {
        const pem = jwkToPem(this.keyObject);
        
        let byteLength = 64;
        let randomString = crypto.randomBytes(byteLength);
        const encryptedData = crypto.publicEncrypt(pem, Buffer.from(randomString));
        
        const uint8Array = new Uint8Array(encryptedData);
        
        const returndata = {
            cek: new Uint8Array(randomString),
            encryptedKey: uint8Array
        }
        
        const protectedHeader = {"alg":"RSA-OAEP","enc":"A256CBC-HS512","version":"1"};
        const protectedHeader2 = Buffer.from(
            _(JSON.stringify(protectedHeader))
        );

        const _iv = crypto.randomBytes(16);
        const _plaintext = Buffer.from(JSON.stringify(plain_text));

        // Assume n is your Uint8Array key source
        const n = returndata.cek;

        const aesKey = n.slice(32);
        const hmacKey = n.slice(0, 32);

        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(aesKey), _iv);
        let encrypted = cipher.update(_plaintext);
        let finalBuffer = cipher.final();
        encrypted = Buffer.concat([encrypted, finalBuffer]);
        
        // Difference between 4.5.0 and 4.4.1 is this part
        let f = protectedHeader2.length << 3;
        let d = Math.floor(f / bt);
        let h = f % bt;
        let y = new Uint8Array(8);
        mt(y, d, 0);
        mt(y, h, 4);

        // Calculate HMAC
        const hmac = crypto.createHmac('sha512', Buffer.from(hmacKey));
        
        // In the 4.5.0 we wanna pass the 'y' value in the hmac as well
        hmac.update(Buffer.concat([protectedHeader2, _iv, encrypted, y]));
        const hmacDigest = hmac.digest().slice(0, 32);  // Get the first 32 bytes

        const result = {
            ciphertext: encrypted,
            tag: hmacDigest
        };


        let final = {
            ciphertext: _(result.ciphertext),
            iv: _(_iv),
            tag: _(result.tag),
            encrypted_key: _(returndata.encryptedKey),
            protected: new TextDecoder().decode(protectedHeader2)
        }
        return [final.protected, final.encrypted_key, final.iv, final.ciphertext, final.tag].join(".");
    }
}

/*
const args = process.argv.slice(2);
const card = args[0];
const month = args[1];
const year = args[2];
const cvc = args[3];
const adyenKey = args[4] || ""
const stripeKey = args[5] || "live_2WKDYLJCMBFC5CFHBXY2CHZF4MUUJ7QU";

console.log(encryptCardData(card, month, year, cvc, adyenKey, stripeKey));
*/
module.exports = Adyen;