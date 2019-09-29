module.exports = {
  presets: [
    "@babel/preset-env", {
      // 配置babel-polify按需加载（编译es6/7/8的新的api到es5）
      // todo 好像不起作用
      // "useBuiltIns": "usage"
    }
  ]
}