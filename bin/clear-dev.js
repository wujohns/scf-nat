/**
 * 测试环境清理
 *
 * @author wujohns
 * @date 20/04/07
 */
const local = require('../local')
const nodeSSH = require('node-ssh')
const ssh = new nodeSSH()

const clear = async () => {
  // 链接远端
  await ssh.connect({
    host: local.remote,
    username: local.user,
    privateKey: '/Users/pool/Codes/sshkeys/db'
  })

  // 执行命令
  await ssh.execCommand('pm2 delete proxy', { cwd: '/root' })
  await ssh.execCommand('rm -rf scf-nat', { cwd: '/root' })
}
clear().then(
  () => {
    console.log('finish clear task!')
    process.exit()
  },
  (err) => console.log(err)
)

