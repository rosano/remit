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

			if (extension && (extension[1] !== 'html')) {
				return GoDownloadAndRespondWithFile(fetchURL, extension[1], res);
			}

			const fetchResponse = await require('node-fetch')(fetchURL);

			Object.entries(fetchResponse.headers.raw()).map(function ([key, value]) {
				value.map(function (e) {
					if (!['content-encoding', 'content-disposition'].includes(key)) {
						res.set(key, e);
					}
				});
			});

			res.set('content-type', 'text/html; charset=utf-8');

			return res.send(await fetchResponse.text());
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

	// COMMAND

	async GoDownloadAndRespondWithFile (fetchURL, extension, res) {
		const destination = require('path').join(__dirname, '__download', require('crypto').createHash('md5').update(fetchURL).digest('hex') + '.' + extension);

		if (!require('fs').existsSync(require('path').dirname(destination))){
			require('fs').mkdirSync(require('path').dirname(destination));
		}

		await require('util').promisify(require('stream').pipeline)((await require('node-fetch')(fetchURL)).body, require('fs').createWriteStream(destination));

		return res.sendFile(destination);
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
