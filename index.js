var reg = {};
reg.IP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
reg.email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
reg.number = /^-?\d+\.?\d*$/;
reg.json = /^{}$|^\[\]$/;
reg.internalIP = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;
reg.URL = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;
reg.ObjectID = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

var textype = function () {};
textype.is = function (type, text) {
	var rs;
	if(reg[type] && typeof(reg[type].test) == 'function') {
		rs = reg[type].test(text);
	}
	return rs;

};
textype.isIP = function (text) {
	return reg.IP.test(text);
};
textype.isPublicIP = function (text) {
	return reg.IP.test(text) && !reg.internalIP.test(text);
};
textype.isInternalIP = function (text) {
	return reg.IP.test(text) && reg.internalIP.test(text);
};
textype.isEmail = function (text) {
	return reg.email.test(text);
};
textype.isNumber = function (text) {
	return reg.number.test(text);
};
textype.isURL = function (text) {
	return reg.URL.test(text);
};
textype.isObjectID = function (text) {
	return reg.ObjectID.test(text);
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
			else {
				rs = 2;
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
			else if(this.isNumber(data)) {
				rs = 91;
			}
			break;
		case 'undefined':
		default:
			break;
	}

	return rs;
};

textype.multiType = function (text) {
	var type = [];
	for(var k in reg) {
		if(reg[k].test(text)) {
			type.push(k);
		}
	}
	return type;
};

module.exports = textype;
