module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],
      alias: {
        // '@': 'src', //已经配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}