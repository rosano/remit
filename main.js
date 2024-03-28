const mod = {

	async HandleRequest (req, res) {
		try {
			const domainMap = mod.DataDomainMap();
		} catch (error) {
			res.statusCode = res.statusCode === 200 ? 500 : res.statusCode;

			return res.send(error.message);
		}
	},

	DataDomainMap() {
		if (!process.env.REMIT_DOMAIN_MAP) {
			throw new Error('REMIT_DOMAIN_MAP not defined');
		}

		return JSON.parse(process.env.REMIT_DOMAIN_MAP);
	},

	// LIFECYCLE

	LifecycleDidLoad () {
		const app = require('express')();

		app.get('*', mod.HandleRequest);

		app.listen(parseInt(process.env.PORT || 3000));
	},

};

if (process.env.npm_lifecycle_script === 'node main.js') {
	mod.LifecycleDidLoad();
};

Object.assign(exports, mod);
