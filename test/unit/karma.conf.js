const webpackConfig = require('../../build/webpack.test')

module.exports = function(config) {
  const configuration = {
    files: ['specs/**/*.spec.js'],
    // files就是指定编写要进行测试的文件，karma会自动运行匹配到的所有文件。这里的配置为specs/**/*.spec.js，也就是specs文件夹下的所有的.spec.js文件。
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    browsers: ['ChromeHeadless'],
    // 该配置为karma的浏览器启动配置，可以控制karma启动什么浏览器
    frameworks: ['mocha', 'chai'],
    reporters: ['spec', 'coverage'],
    // reporters是karma在跑完测试之后，关于测试结果报告的配置，这边选用的配置是spec和coverage，spec是报告详细的测试结果，coverage是报告代码测试的覆盖率。下面的coverageReporter配置也是coverage reporter的相关配置。
    preprocessors: {
      'specs/**/*.spec.js': ['webpack', 'coverage']
    },
    // preprocessors是关于测试文件的预处理器配置，karma允许在启动浏览器之前对指定的文件进行预处理，这里我们使用的预处理器是webpack和coverage。webpack预处理器就是使用webpack对文件打包和编译，下面的webpack和webpackMiddleware配置都是webpack预处理器相关的配置项
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },

    // karma-coverage plugin options
    coverageReporter: {
      dir: './coverage',
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
    },

    client: {
      mocha: {
        timeout: 4000
      }
    }
    // client配置是karma-mocha插件提供的一个关于客户端的配置提供了超时时间等配置
  }

  config.set(configuration)
}
