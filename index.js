var reg = {};
reg.publicIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
reg.email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
reg.json = /^{}$|^\[\]$/;

var textype = function () {};
textype.isPublicIP = function (text) {
	return reg.publicIP.test(text);
};
textype.isEmail = function (text) {
	return reg.email.test(text);
};
textype.isJSON = function (text) {
	var rs = false;
	try {
		if(reg.json.test(text)) {
			JSON.parse(text);
			return true;
		}
	} catch (e) {
		return false;
	}

	return rs;
};

// 1: Buffer, 2: JSON, 90: Boolean, 91: Number, 99: String, 0: Undefined
textype.typeOf = function (data) {
	var rs = 0;
	var type = typeof(data);
	switch (type) {
		case 'object':
			if(Buffer.isBuffer(data)) {
				rs = 1;
			}
			break;
		case 'boolean':
			rs = 90;
			break;
		case 'number':
			rs = 91;
			break;
		case 'string':
			rs = 99;
			if(this.isJSON(data)) {
				rs = 2;
			}
			break;
		case 'undefined':
		default:
			break;
	}

	return rs;
};

textype.multiType = function () {
	var type = [];
	for(var k in reg) {
		if(reg[k].test(text)) {
			type.push(k);
		}
	}
	return type;
};

module.exports = textype;
