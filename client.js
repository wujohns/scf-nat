/**
 * 用户测试的部分
 *
 * @author wujohns
 * @date 20/04/07
 */
const local = require('./local')
const URL = require('url')
const fetch = require('node-fetch')
const HttpProxyAgent = require('http-proxy-agent')
const HttpsProxyAgent = require('https-proxy-agent')

const proxyUrl = `http://${ local.remote }:3000`
const run = async () => {
  const url = 'http://baidu.com'
  const urlObj = new URL.parse(url)
  const { protocol } = urlObj
  let agent
  if (protocol === 'http:') {
    agent = new HttpProxyAgent(proxyUrl)
  } else if (protocol === 'https:') {
    agent = new HttpsProxyAgent(proxyUrl)
  }
  const res = await fetch(url, { agent })
  const data = await res.text()
  console.log('-----', data)
}
run().then(
  () => { console.log('finish') },
  (err) => { console.log(err) }
)
