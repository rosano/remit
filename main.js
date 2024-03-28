const mod = {

	DataDomainMap() {
		return JSON.parse(process.env.REMIT_DOMAIN_MAP);
	},

};

Object.assign(exports, mod);
