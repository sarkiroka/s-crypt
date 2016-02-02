/**
 * @author sarkiroka
 */
module.exports = function (password) {
	if (!password) {
		throw new Error('no password set');
	}
	var base64Password = new Buffer(password).toString('base64');
	return {
		encode: require('./encode')(base64Password),
		decode: require('./decode')(base64Password)
	};
};
