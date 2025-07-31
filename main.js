const express = require('express')
const app = express()

require('dotenv').config({ quiet: true })

app.use(async (req, res) => {
	const base = process.env.REMIT_BASE

	if (!base || (typeof base === 'string' && !base.match(/^https?:\/\//))) {
		return res.send('Please set REMIT_BASE to a URL in .env, then restart.')
	}

	const source = base + req.host + req.path;

	const extension = source.match(/\.(\w+)$/);

	if (extension && (extension[1] !== 'html')) {
		const destination = require('path').join(process.env.DATA_DIRECTORY || __dirname, '__download', require('crypto').createHash('md5').update(source).digest('hex') + '.' + extension[1]);

		if (!require('fs').existsSync(require('path').dirname(destination))){
			require('fs').mkdirSync(require('path').dirname(destination));
		}

		await require('util').promisify(require('stream').pipeline)((await fetch(source)).body, require('fs').createWriteStream(destination));

		return res.sendFile(destination);
	}

	const response = await fetch(source);

	return res.send(await response.text())
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.info(`Listening on port ${ port }`)
})
