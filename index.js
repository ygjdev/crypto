var crypto = require('crypto');
var Benchmark = require('benchmark');

var iv = new Buffer('')
var keyPass = '37ddy62egc83hq2y';
var bKey = new Buffer(keyPass, 'utf-8');

var encrypt = function(data) {
    var cipher = crypto.createCipheriv('AES-128-ECB', bKey, iv);
    var bInput = new Buffer(data, 'utf-8');
    var crypted = cipher.update(bInput, null, 'base64');
    crypted += cipher.final('base64');
    return crypted;
};

var decrypt = function(data) {
    var decipher = crypto.createDecipheriv('AES-128-ECB', keyPass, iv)
    //decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(data, 'base64', 'utf8')
    dec += decipher.final('utf8');
    return dec;
};
var encryptedMasterId = 'W0acS1cIm6uEPK9s6QLYmQ';
var decryptedMasterId = '0001-0162-3876';
var input = encrypt(decryptedMasterId);
var output = decrypt(input);

console.log('test endrypt:',input);
console.log('test decrypt2:',decrypt('YkGIfnlLV8lKQ6XJD7TsQw'));
console.log('test decrypt:',output);
console.log('test SSOR input decrypt:',decrypt(encryptedMasterId));

var suite = new Benchmark.Suite;

// add tests
suite.add('Decrypt MasterId Function ', decrypt(encryptedMasterId))
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('done!!!');
})
// run async
.run({ 'async': true });

