const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const port = process.env.PORT || 8080
const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Add CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      const parsedUrl = parse(req.url, true)
      
      // Add basic logging
      console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
      
      // Handle OPTIONS request for CORS
      if (req.method === 'OPTIONS') {
        res.statusCode = 200
        res.end()
        return
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log('> Environment:', process.env.NODE_ENV)
    console.log('> Client ID:', process.env.NEXT_PUBLIC_CLIENT_ID)
  })
})
