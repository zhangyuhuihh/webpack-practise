module.exports = {
  presets: [
    '@babel/preset-env',
    {
      // 配置babel-polify按需加载（编译es6/7/8的新的api到es5）
      // todo 好像不起作用
      // "useBuiltIns": "usage"
    }
  ],
  plugins: [
    // 这个插件同时和vue-router的异步加载使用，可以避免把所有的文件都打包到一个js文件内
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ]
}
