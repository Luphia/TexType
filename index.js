var reg = {};
reg.publicIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
reg.email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var textype = function () {};
textype.isPublicIP = function (text) {
	return reg.publicIP.test(text);
};
textype.isEmail = function (text) {
	return reg.email.test(text);
};

textype.typeOf = function (text) {
	var type = [];
	for(var k in reg) {
		if(reg[k].test(text)) {
			type.push(k);
		}
	}
	return type;
}