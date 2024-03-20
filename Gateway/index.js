const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
const app = express()

app.use(cors())
app.use(express.json())

const handleProxyErrors = (proxyRes, res, req) => {
	if (proxyRes.statusCode !== 200) {
		res.status(502).json({ error: 'Gateway error' })
	}
	return proxyRes
}

app.use(
	'/menu',
	proxy('http://localhost:8003', { userResDecorator: handleProxyErrors }),
)

app.use(
	'/order',
	proxy('http://localhost:8004', { userResDecorator: handleProxyErrors }),
)

app.use(
	'/',
	proxy('http://localhost:8002', { userResDecorator: handleProxyErrors }),
)

app.listen(8000, () => {
	console.log('Gateway is listening to PORT 8000.')
})
