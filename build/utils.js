'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 环境变量，开发环境或者生产环境，npm将通过这个值来区分打包。
const isDev = process.env.NODE_ENV === 'development';
// 绝对路径生成器
exports.resolve = (localPath, ...dir) => path.join(process.cwd(), localPath, ...dir)
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
/* 这里是添加的部分 ---------------------------- 开始 */

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/views')
// 用于做相应的merge处理
var merge = require('webpack-merge')

// 文件分离
exports.getEntries = (Path, type) => {
  let pathDir = Path,
    entry, // 文件完整路径
    dirName, // 传入的文件夹路径
    baseName, // 文件名
    pathName, // 文件夹路劲
    relativeName, // 键名所需,相对传入文件地址路径
    extName // 文件格式

  const files = glob.sync(`${Path}/${type}`)  
  const entries = {}
  for (const i in files) {
    entry = files[i]
    extName = path.extname(entry)
    dirName = path.dirname(entry)
    baseName = path.basename(entry, extName)
    pathName = path.normalize(path.join(dirName, baseName))
    pathDir = path.normalize(pathDir)
    
    // 逻辑部分
    relativeName = path.relative(pathDir, dirName)
    pathName = path.basename(pathName)
    if (relativeName.includes('\\') || relativeName.includes('\/')) {
      continue
    }
    else {
      if (extName === '.html') {
        entries[relativeName] = entry
      }
      else if (pathName === 'index') {
        entries[relativeName] = ['babel-polyfill',entry]        
      }
    }
  }
  return entries
}
// 创建多页
exports.createPages = (plugins, pages) => {
  Object.keys(pages).map(key => {
    // 配置生成的html文件，定义路径等
    const conf = {
      title: "来访通",
      filename: key + '.html',
      template: pages[key],
      inject: true,  // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
      chunks: ['manifest', 'vendor', key],
      favicon: "",
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }
    if (!isDev) {
      conf.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minify: {}, //{} | false , 传递 html-minifier 选项给 minify 输出
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        showErrors: true | false, //如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
        cache: true | false, //如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
        hash: true,       // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。 
        chunksSortMode: 'none', //允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
        chunks: "", //允许只添加某些块 (比如，仅仅 unit test 块)
        excludeChunks: "", //允许跳过某些块，(比如，跳过单元测试的块) 
      }
    }
    plugins.push(new HtmlWebpackPlugin(conf))
  })
};
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    let arr = []
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            // 模板来源
            template: filePath,
            // 文件名称
            filename: filename + '.html',
            favicon: path.resolve(__dirname, './src/assets/img/favicon.png'),
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}
/* 这里是添加的部分 ---------------------------- 结束 */