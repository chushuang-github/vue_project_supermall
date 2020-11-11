//这里面的配置会和脚手架里面的默认的配置合并到一起
module.exports = {
  //需要先写configureWebpack属性，表示准备配置webpack的config
  //extensions默认配置了.js .json .vue三个，后缀名可以省略
  configureWebpack: {
    resolve: {
      //已经有一个默认的路径别名@，@表示src文件夹
      //脚手架cli2里面不可以写@/views这样的语法，而cli3里面可以写
      alias: {
        'views': '@/views',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
      }
    }
  }
}

