/**
 * pm2 配置文件
 *
 * @author wujohns
 * @date 20/02/17
 */
module.exports = {
  apps: [
    {
      name: 'proxy',  // 应用名称（会对应 pm2 中的 appName）
      script: './server.js',  // 启动文件地址
      cwd: `${ __dirname }`,  // 执行命令前会提前切到的路径

      // 运行时的环境变量，比如这里：process.env.NODE_ENV = development
      env: {
        NODE_ENV: 'development'
      },
      env_pro: {
        NODE_ENV: 'production'
      },

      out_file: './logs/out.log',   // 普通日志路径
      error_file: './logs/err.log', // 错误日志路径
      pid_file: './run/server.pid', // 进程文件
      merge_logs: true,
      log_data_format: 'MM-DD HH:mm:ss',

      max_memory_restart: '200M',   // 超出该内存则进行重启
      kill_timeout: 5000,    // pm2 kill 时的最长时间
      exec_mode: 'cluster',  // node工程优先使用 cluster 模式
      instances: 2           // 实例数目，（'max' 即为最大实例数）

      // watch: [],         // 监控变化的目录，一旦变化自动重启（目前用不上）
      // ignore_watch: [],  // 忽略变化的目录
      // node_args: '--harmony',  // node 的启动模式
    }
  ]
}
