# 简介

`reactseed` 是一个基于 `react16 redux react-route webpack4 eslint css-module postcss autoprefixer` 的脚手架工程

# 初始化项目

```bash
npm init
```

# webpack

```bash
npm i webpack webpack-cli webpack-merge --save-dev
```

参考[**webpack 官方文档**](https://webpack.js.org/get-started/)编写基础的配置文件

# Babel

- [**babel-loader**](https://github.com/babel/babel-loader)
- [**@babel/core**](https://github.com/babel/babel/tree/master/packages/babel-core)
- [**@babel/preset-react**](https://github.com/babel/babel/tree/master/packages/babel-preset-react) 用于解析 JSX
- [**@babel/preset-env**](https://github.com/babel/babel/tree/master/packages/babel-preset-env) 用于解析 ES 新特性（ES6 ES7 ES8 等）
- [**@babel/runtime**](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime) 解析 ES 新特性所需环境
- [**@babel/plugin-transform-runtime**](https://babel.docschina.org/docs/en/babel-plugin-transform-runtime) 解析 ES 新特性所需环境

### 添加.babelrc 文件

```js
{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": [
    // 集成await async等ES6、7、8的新特性
    ["@babel/plugin-transform-runtime"]
  ]
}
```

### babel 解析装饰器

```js
{
  "plugins": [
    // 集成装饰器
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
}
```

### babel 解析 class 中静态属性

[**class 的静态属性**](https://blog.csdn.net/qq_30100043/article/details/53542966)

```js
{
  "plugins": [
    // 集成class中的属性 ES7 有一个静态属性的提案， 目前 Babel 转码器支持 https://blog.csdn.net/qq_30100043/article/details/53542966
    ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ]
}
```

# react

```bash
npm i react react-dom --save-dev
```

参考[**react 中文文档**](https://react.docschina.org/)编写 `react` 组件

# antd

### ant-design

```bash
npm i antd --save
```

参考[**antd 按需引入**](https://ant.design/docs/react/introduce-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)，修改 `.babelrc` 文件

```js
{
  "plugins": [
      // 集成antd按需加载
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css" // `style: true` 会加载 less 文件
        },
        "antd"
      ]
  ]
}
```

### ant-design-pro

```bash
npm i ant-design-pro --save
```

参考[**ant-design-pro 按需引入**](https://pro.ant.design/docs/use-components-alone-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)，修改 `.babelrc` 文件

```js
{
  "plugins": [
      // 集成ant-design-pro按需加载
      [
        "import",
        {
          "libraryName": "ant-design-pro",
          "libraryDirectory": "lib",
          "style": "css",
          "camel2DashComponentName": false
        },
        "ant-design-pro"
      ]
  ]
}
```

# redux

```bash
npm i redux --save
```

参考[**redux 官方文档**](http://cn.redux.js.org/)，创建`actions` `reducer` `store`

# react-redux

```bash
npm i react-redux --save
```

参考[**react-redux 官方文档**](https://react-redux.js.org/)

`react-redux`提供了一个方法`connect`，可以接收 2 个参数：

- **mapStateToProps** 把`redux`的`state`转化成组件的`props`的属性
- **mapDispatchToProps** 把`dispatch actions`的方法，转为`props`属性函数

`connect`方法中如果省略`mapDispatchToProps`参数，`dispatch` 会注入到你的组件`props` 中，即可以用`this.props.dispatch`

```js
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Button, List } from 'antd'
import DemoService from '../../services/demoService'
import Service from '../../utils/service'
import styles from './index.css'

class Demo extends React.Component {
  @Service(DemoService) static demoService

  constructor() {
    super()
    this.state = {
      inputText: ''
    }
  }
  onChange(e) {
    this.setState({
      inputText: e.target.value
    })
  }
  addItem() {
    this.props.dispatch(this.demoService.test(this.state.inputText))
  }
  render() {
    const url = this.props.match.url
    // 匹配的route中的:id
    const id = this.props.match.params.id
    return (
      <div className={styles.demo}>
        <div>
          <h1>React Router Demo</h1>
          <h3>url为：{url}</h3>
          <h3>匹配的route中的:id为：{id}</h3>
          <h1>Redux Demo</h1>
        </div>
        <div>
          <Input
            className={styles.input}
            placeholder="请输入文字"
            allowClear
            value={this.state.inputText}
            onChange={this.onChange.bind(this)}
          />
          <Button
            className={styles.button}
            type="primary"
            onClick={this.addItem.bind(this)}
            disabled={this.state.inputText === ''}
          >
            新增
          </Button>
          <List
            className={styles.list}
            bordered
            dataSource={this.props.textList}
            renderItem={item => (
              <List.Item>
                <div className={styles.listItem}>{item}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

Demo.propTypes = {
  match: PropTypes.object,
  textList: PropTypes.array
}
const mapStateToProps = state => {
  return {
    textList: state.demo.textList
  }
}
// connect方法中省略mapDispatchToProps参数，这样子处理的话，dispatch 会注入到你的组件props 中，即可以用this.props.dispatch
// const mapDispatchToProps = (dispatch) => {
//   return {
//   }
// }
export default connect(mapStateToProps)(Demo)
```

# redux 中间件

目前项目只用了`redux-thunk` `redux-logger`，由于在开发环境中需要看`redux`的值，需要用到`redux-devtool`，需要集成`redux-devtools-extension`

**store/index.js**

```js
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { request } from '../utils'

const logger = createLogger({
  collapsed: true,
  duration: true,
  timestamp: true
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ request }), logger)
  )
)
export default store
```

## redux-thunk

```bash
npm install redux-thunk
```

参考[**redux-thunk 官方文档**](https://github.com/reduxjs/redux-thunk)配置 `service` 方法：

```js
test(inputText) {
  return async (dispatch, getState, { request }) => {
    console.log(getState().demo.textList)
    const res = await request.get('/test', { params: { inputText } })
    return dispatch(DemoAction.addItem(res.data.result))
  }
}
```

## redux-logger

```bash
npm install redux-logger
```

参考[**redux-logger 官方文档**](https://github.com/LogRocket/redux-logger)配置`logger`

```js
const logger = createLogger({
  collapsed: true, // 折叠
  duration: true, // 打印action耗时
  timestamp: true // 打印action发出的时间戳
})
```

# react-hot-loader

```bash
npm install react-hot-loader
```

配置`.babelrc`

```js
{
  "plugins": ["react-hot-loader/babel"]
}
```

在入口文件中引入 `hot`

```js
import { hot } from 'react-hot-loader/root'
export default hot(withRouter(Home))
```

# react-router

```bash
npm i react-router-dom
```

创建 `routes/index.js`

```js
const routes = [
  {
    name: '销售页',
    link: '/sale',
    icon: 'icon-sale',
    children: [
      {
        name: '销售分析',
        link: '/sale/analysis'
      },
      {
        name: '销售管理',
        link: '/sale/manage'
      }
    ]
  }
]
export default routes
```

根据`antd`自动生成菜单，见`home/index.js`

# 装饰器实现类似 spring 注入 service

工程化配置：[babel 解析装饰器](#babel-解析装饰器)

创建 `service.js`

```js
const Service = ServiceName => {
  return (target, name) => {
    target.prototype[name] = new ServiceName()
  }
}
export default Service
```

`demo/index.js`

```js
import DemoService from '../../services/demoService'

class Demo extends React.Component {
  @Service(DemoService) static demoService
  addItem() {
    this.props.dispatch(this.demoService.test(this.state.inputText))
  }
  render() {
    return ()
  }
}
```

# postcss css-module

参考[**postcss 官方文档**](https://github.com/postcss/postcss)

```bash
npm i --save-dev autoprefixer postcss-flexbugs-fixes postcss-loader
```

创建`postcss.config.js`

```js
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    }
  }
}
```

`webpack`增加配置

```js
module: {
  rules: [
    // 不包括antd的css编译
    {
      test: /\.css$/,
      exclude: /node_modules|antd\.css/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // css modules的开关
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss'
          }
        }
      ]
    },
    // 包括antd的css编译
    {
      test: /\.css$/,
      include: /node_modules|antd\.css/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss'
          }
        }
      ]
    }
  ]
}
```

# axios

参考[**axios 官方文档**](https://github.com/axios/axios)

```bash
npm install axios
```

创建 `request.js`

```js
import axios from 'axios'
import { notification } from 'antd'

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// 给实例绑定axios.all方法
instance.all = axios.all

// 请求拦截器
instance.interceptors.request.use(
  config => {
    let token = getCookie('token')
    if (token) {
      config.params = config.params || {}
      config.params.__sid = token
    }
    return config
  },
  err => {
    notification.error({ message: '请求异常！' })
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  config => {
    return config.data
  },
  err => {
    // 401
    if (err.response.status === 401) {
      // cookie中的token失效处理，跳转登陆
    }
    notification.error({
      message: `请求异常！ ${err.response.status} ${err.response.statusText}`
    })
    return Promise.reject(err)
  }
)

const getCookie = name => {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  }
  return null
}

const request = {
  post: (url, params) => {
    return instance
      .post(url, params)
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      })
  },
  get: (url, params) => {
    return instance
      .get(url, { params })
      .then(res => {
        return res
      })
      .catch(err => {
        return err
      })
  }
}

export { request, getCookie }
```

在`redux-thunk`中集成`request.js`

`store/index.js`

```js
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { request } from '../utils'

const logger = createLogger({
  collapsed: true, // 折叠
  duration: true, // 打印action耗时
  timestamp: true // 打印action发出的时间戳
})
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ request }), logger)
  )
)
export default store
```

`service` 中调用

```js
import DemoAction from '../actions/demoAction'

export default class DemoService {
  test(inputText) {
    return async (dispatch, getState, { request }) => {
      /* eslint-disable */
      console.log(getState().demo.textList)
      const res = await request.get('/test', { params: { inputText } })
      return dispatch(DemoAction.addItem(res.data.result))
    }
  }
}
```

# eslint

```bash
npm i --save-dev eslint babel-eslint eslint-loader eslint-plugin-import eslint-config-standard eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard
```

修改`webpack`配置

```js
{
  test: /\.js$/,
  enforce: 'pre',
  exclude: /node_modules/,
  loader: 'eslint-loader'
}
```

`package.json`中添加`eslint`命令

```js
"scripts": {
  "lint": "eslint --ext .js,.jsx ./"
}
```

创建`.eslintrc.js`

```js
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'standard'],
  plugins: ['react'],
  // 全局变量
  globals: {
    process: true,
    __dirname: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 7
  },
  // 解决Warning: React version not specified in eslint-plugin-react settings. See https://github.com/yannickcr/eslint-plugin-react#configuration.
  settings: {
    react: {
      version: 'detect'
    }
  },
  /* 
    "off" or 0 关闭规则
    "warn" or 1 打开规则，不符合出现警告提示
    "error" or 2 打开规则，不符合出现错误提示
  */
  rules: {
    // 单引号
    quotes: [2, 'single'],
    // 缩进，switch case缩进问题
    indent: [2, 2, { SwitchCase: 1 }],
    // 分号不检查
    semi: 0,
    // 对var警告
    'no-var': 2,
    // standard规范中函数定义时括号前面要有空格（禁用此规则）
    'space-before-function-paren': [0, 'always'],
    // react proptype不检查
    'react/prop-types': 0
  }
}
```

创建`.eslintignore` 忽略文件

```bash
node_modules/
package-lock.json
dist/
```

# stylelint

```bash
npm i --save-dev stylelint stylelint-config-css-modules stylelint-config-standard stylelint-webpack-plugin
```

修改`webpack`配置

```js
const StyleLintPlugin = require('stylelint-webpack-plugin')

// plugins数组中增加StyleLintPlugin插件
new StyleLintPlugin({
  context: 'src',
  configFile: path.resolve(__dirname, './.stylelintrc.js'),
  files: '**/*.css',
  failOnError: false,
  quiet: true
})
```

`package.json`中添加`stylelint`命令

```js
"scripts": {
  "stylelint": "stylelint src/**/*.css",
  "stylelint:fix": "stylelint src/**/*.css --fix"
}
```

创建`.stylelintrc.js`

```js
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  rules: {
    // css module中composes警告处理
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes']
      }
    ]
  }
}
```

# webpack4 splitChunk 代码分离

`webpack`中增加配置

```js
splitChunks: {
  chunks: 'async',
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    // node_modules内的依赖库
    vendor: {
      chunks: 'all',
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor',
      minChunks: 1, // 被不同entry引用次数(import),1次的话没必要提取
      maxInitialRequests: 5,
      minSize: 0,
      priority: 100
    }
  }
}
```

# webpack4 bundle 太大怎么处理

### webpack-bundle-analyzer

```bash
npm i --save-dev webpack-bundle-analyzer
```

`webpack`增加配置

```js
// 增加BundleAnalyzerPlugin配置
if (config.bundleAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin()) // webpack bundle分析工具
}
```

### mockjs 移出生产环境

最开始，我在代码中直接引入了`mockjs`，然后生产环境打出来的包特别大，因为包含了`mockjs`，然后考虑要怎么把`mockjs`从生产环境包中移除。

于是想到了不在代码中直接引入`mockjs`，在开发环境的`entry`中配置`mock/index.js`的入口，这样由于代码中没有引入`mockjs`，生成环境中就不会将`mockjs`打包进来

# webpack4 提取 css 插件 mini-css-extract-plugin

```bash
npm i --save-dev mini-css-extract-plugin
```

`webpack`增加配置

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// plugins增加MiniCssExtractPlugin
new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: 'vendor.[hash].css' // 和webpack.base.conf.js中的vendor名字一致
})

// module rules中增加MiniCssExtractPlugin.loader
module: {
  rules: [
    // 不包括antd的css编译
    {
      test: /\.css$/,
      exclude: /node_modules|antd\.css/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            // css modules的开关
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss'
          }
        }
      ]
    },
    // 包括antd的css编译
    {
      test: /\.css$/,
      include: /node_modules|antd\.css/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss'
          }
        }
      ]
    }
  ]
}
```

# webpack4 css 优化压缩插件 optimize-css-assets-webpack-plugin

```bash
npm i --save-dev optimize-css-assets-webpack-plugin
```

`webpack`增加配置

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// optimization中增加OptimizeCSSAssetsPlugin
optimization: {
  minimizer: [new OptimizeCSSAssetsPlugin({})]
}
```

# webpack4 js 优化压缩插件 uglifyjs-webpack-plugin

```bash
npm i --save-dev uglifyjs-webpack-plugin
```

`webpack`增加配置

```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// optimization中增加UglifyJsPlugin
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true // set to true if you want JS source maps
    })
  ]
}
```

# CSS Modules 使用技巧

CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

- 不使用选择器，只使用 class 名来定义样式
- 不层叠多个 class，只使用一个 class 把所有样式定义好
- 所有样式通过 composes 组合来实现复用
- 不嵌套

上面两条原则相当于削弱了样式中最灵活的部分，初使用者很难接受。第一条实践起来难度不大，但第二条如果模块状态过多时，class 数量将成倍上升。

上面之所以称为建议，是因为 CSS Modules 并不强制你一定要这么做。听起来有些矛盾，由于多数 CSS 项目存在深厚的历史遗留问题，过多的限制就意味着增加迁移成本和与外部合作的成本。初期使用中肯定需要一些折衷。幸运的是，CSS Modules 这点做的很好：

- 可以但不建议对一个元素使用多个 class
- 可以在 CSS 文件中使用伪类，标签选择器，所有这些选择器将不被转换，原封不动的出现在编译后的 CSS 中。也就是说 CSS Modules 只会转换 class 名和 id 选择器名相关的样式

例：

    .logo {
      height: 60px;
      line-height: 60px;
      margin-left: 24px;
      overflow: hidden;
    }
    .logoText {
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      color: #fff;
      margin-left: 5px;
    }
    /* 属性选择器不被转换，编译成[data-text="manager"]*/
    [data-text="manager"] {
      color: #fff;
    }
    /* 标签选择器不被转换，编译成.index__logo__2Bw2v span*/
    .logo span {
      color: #fff;
    }
    .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color .3s;
    }
    /* 伪类选择器不被转换，编译成.index__trigger__2Bw2v:hover*/
    .trigger:hover {
      color: #1890ff;
    }

# 参考资料

### 开发参考

- [**webpack 官方文档**](https://webpack.js.org/get-started/)
- [**react 中文文档**](https://react.docschina.org/)
- [**react 中文文档**](https://react.docschina.org/)
- [**antd 按需引入**](https://ant.design/docs/react/introduce-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
- [**ant-design-pro 按需引入**](https://pro.ant.design/docs/use-components-alone-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
- [**redux 官方文档**](http://cn.redux.js.org/)
- [**react-redux 官方文档**](https://react-redux.js.org/)
- [**redux-thunk 官方文档**](https://github.com/reduxjs/redux-thunk)
- [**redux-logger 官方文档**](https://github.com/LogRocket/redux-logger)
- [**postcss 官方文档**](https://github.com/postcss/postcss)
- [**axios 官方文档**](https://github.com/axios/axios)
- [**react 全家桶搭建教程**](https://github.com/brickspert/blog/issues/1#intro)
- [**DocToc生成**](https://github.com/thlorenz/doctoc)

### 部署参考

- [**部署参考**](https://www.jianshu.com/p/09d6440e625f)
- [**pm2**](https://www.cnblogs.com/chyingp/p/pm2-documentation.html)
- [**github服务器配置**](https://www.cnblogs.com/zhuyc110/p/6823023.html)
- [**mysql部署参考**](https://www.cnblogs.com/silentdoer/articles/7258232.html)

# 部署问题

1. 服务器上 npm run build 提示内存溢出，可以修改 package.json 中，改为 node --max_old_space_size=512 尝试下在服务器打包，如果还是不行，就只能本地打包部署到服务器上去
