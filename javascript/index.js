/**
 * @author sarkiroka
 */
var encode = require('./encode');
var decode = require('./decode');
module.exports = function (password) {
	if (!password) {
		throw new Error('no password set');
	}
	var base64Password = new Buffer(password).toString('base64');
	return {
		encode: encode(base64Password),
		decode: decode(base64Password)
	};
};
