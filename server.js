/**
 * nat proxy
 *
 * @author wujohns
 * @date 20/04/07
 */
const http = require('http')
const proxy = require('proxy')

const port = 3000
const server = proxy(http.createServer())
server.listen(port, () => {
  console.log(`HTTP(s) proxy server listening on port: ${ port }`)
})
