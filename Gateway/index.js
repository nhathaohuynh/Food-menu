const express = require('express')
const cors = require('cors')
const proxy = require('express-http-proxy')
const app = express()

app.use(cors())
app.use(express.json())

const handleProxyErrors = (err, res, req, next) => {
	console.log(err)
	res.status(502).json({ error: 'Gateway error' })
}

app.use(
	'/menu',
	proxy('http://localhost:8003', { proxyErrorHandler: handleProxyErrors }),
)
app.use(
	'/order',
	proxy('http://localhost:8004', { proxyErrorHandler: handleProxyErrors }),
)
app.use(
	'/',
	proxy('http://localhost:8002', { proxyErrorHandler: handleProxyErrors }),
)

app.listen(8000, () => {
	console.log('Gateway is listening to PORT 8000.')
})
