/**
 * @author sarkiroka
 */
var powers = [1, 2, 4, 8, 16, 32, 64, 128];
module.exports = function (passwordBuffer) {
	return function (text, isBinary) {
		var inputBuffer = Buffer.from(text, isBinary ? 'binary' : undefined);
		var output = Buffer.allocUnsafe(inputBuffer.byteLength * 2);
		var outputBytePosition = 0;
		var outputBitPosition = 0;
		var outputByte = 0;
		for (var position = 0, iMax = inputBuffer.byteLength; position < iMax; position++) {
			var dataByte = inputBuffer.readUInt8(position);
			var passwordByte = passwordBuffer.readUInt8(position % passwordBuffer.byteLength);
			for (var bit = 7; bit >= 0; bit--) {
				var passwordBit = (passwordByte & powers[bit]) >>> bit;
				var dataBit = (dataByte & powers[bit]) >>> bit;
				if (passwordBit) {
					if (Math.random() > 0.5) {
						outputByte |= powers[7 - outputBitPosition];
					}
					outputBitPosition++;
					if (outputBitPosition == 8) {
						output.writeUInt8(outputByte, outputBytePosition);
						outputBytePosition++;
						outputByte = 0;
						outputBitPosition = 0;
					}
				}
				if (dataBit) {
					outputByte |= powers[7 - outputBitPosition];
				}
				outputBitPosition++;
				if (outputBitPosition == 8) {
					output.writeUInt8(outputByte, outputBytePosition);
					outputBytePosition++;
					outputByte = 0;
					outputBitPosition = 0;
				}
			}
		}
		if (outputBitPosition) {
			output.writeInt8(outputByte, outputBytePosition);
		}
		var retValue = Buffer.allocUnsafe(outputBytePosition + 1);
		output.copy(retValue, 0, 0, outputBytePosition);
		return retValue;
	}
};
