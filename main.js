const mod = {

	async HandleRequest (req, res) {
		try {
			const base = mod.DataDomainMap()[req.headers.host];

			if (!base) {
				res.statusCode = 404;
				throw new Error('domain not in REMIT_DOMAIN_MAP');
			}

			const extension = req.path.match(/\.(\w+)$/);

			const fetchPath = (function(url) {
				if (extension) {
					return url;
				}

				if (!url.endsWith('/')) {
					url += '/';
				}

				if (!url.endsWith('index.html')) {
					url += 'index.html';
				}

				return url;
			})(req.url);

			const fetchURL = base.split('/index.html').shift() + fetchPath;

			return res.send({
				base,
				path: req.url,
				fetchPath,
				fetchURL,
			});
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
