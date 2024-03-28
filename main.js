const mod = {

	async HandleRequest (req, res) {
		return res.send('hello')
	},

	DataDomainMap() {
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
