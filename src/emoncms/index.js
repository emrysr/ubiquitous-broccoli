/* eslint-disable indent */
const crypto = require('crypto')
// var AES = require('aes')
const APIKEY = 'cb9579be83678b89a5eb0faea08ad839'

class EmonCms {
    constructor () {
        this.APIKEY = APIKEY // Must be 256 bytes (32 characters)
        this.APIKEYLEN = APIKEY.length
        this.HASH = this.getHash('123')
        this.IV = crypto.randomBytes(16) // 2. create an initalization vector
    }
    emrys (data) {

/*
1. Start with a request string conforming with the API options above e.g: node=emontx&data={power1:100,power2:200,power3:300}
2. Create an initialization vector.
3. Encrypt using AES-128-CBC.
4. Create a single string starting with the initialization vector followed by the cipher-text result of the AES-128-CBC encryption.
5. Convert to a base64 encoded string.
6. Generate a HMAC_HASH of the data string together, using the emoncms apikey for authorization.
7. Send the encrypted string in the POST body of a request to either input/post or input/bulk with headers properties 'Content-type' and 'Authorization' set as below
8. Verify the result. The result is a base64 encoded sha256 hash of the json data string.
*/
    }
    getHash (string) {
        let hmac = crypto.createHmac('sha1', APIKEY)
        hmac.update(string)
        return hmac.digest('base64')
    }

    encrypt (text) {
        // const hash = crypto.createHmac('sha256', this.IV)
        // .update(data)
        // .digest('hex')

        let cipher = crypto.createCipheriv('aes-128-cbc', Buffer.alloc(APIKEY.length / 2), this.IV)
        let encrypted = cipher.update(text)

        encrypted = Buffer.concat([encrypted, cipher.final()])
        return this.IV.toString('hex') + ':' + encrypted.toString('hex')
    }
}

export default new EmonCms()
