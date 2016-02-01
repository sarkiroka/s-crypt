/**
 * get bit by position. 0 -> msb, 7 -> lsb
 * @author sarkiroka
 */
module.exports = function (string, position) {
	var retValue = null;
	if (string) {
		var charPosition = Math.floor((position % string.length * 8) / 8);
		var charCode = string.charCodeAt(charPosition);
		var bitPosition = 7 - (position % 8);
		retValue=(charCode & (1 << bitPosition)) >> bitPosition;
	}
	return retValue;
};
