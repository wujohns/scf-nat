/**
 * 测试环境部署
 *
 * @author wujohns
 * @date 20/04/07
 */
const local = require('../local')
const path = require('path')
const _ = require('lodash')
const nodeSSH = require('node-ssh')
const ssh = new nodeSSH()

const deploy = async () => {
  // 链接远端
  await ssh.connect({
    host: local.remote,
    username: local.user,
    privateKey: '/Users/pool/Codes/sshkeys/db'
  })

  // 上传文件
  const status = await ssh.putDirectory(
    path.join(__dirname, '../'),  // 本地上传路径
    '/root/scf-nat',
    {
      recursive: true,  // 是否递归上传
      concurrency: 1,  // 上传并发数
      validate: (itemPath) => {
        if (
          _.includes(itemPath, 'node_modules') ||
          _.includes(itemPath, 'logs') ||
          _.includes(itemPath, 'run') ||
          _.includes(itemPath, '.git')
        ) {
          return false
        }
        return true
      },
      tick: (localPath, remotePath, err) => {
        if (err) console.log(`upload failed: ${ localPath }`)
        else console.log(`upload successful: ${ localPath }`)
      }
    }
  )
  if (!status) {
    throw new Error('update files failed !')
  }

  // 启动命令
  await ssh.execCommand('make dev', { cwd: '/root/scf-nat' })
}
deploy().then(
  () => {
    console.log('finish deploy task!')
    process.exit()
  },
  (err) => console.log(err)
)
