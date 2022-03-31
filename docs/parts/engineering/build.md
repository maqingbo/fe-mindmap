---
sidebarDepth: 1
---

## Babel

Babel 是一个 JavaScript 编译器，可以将编写的代码处理成向后兼容的 JavaScript 语法。

### 处理流程

- Tokenizer：词法分析，将代码分割成 Token 数组；
- Parser：语法分析，将 Token 数组转换成 AST；
- Traverser：遍历 AST，加载转换器；
- Transform：使用转换器，增删改查 AST 节点；
- Generator：将 AST 转换回代码。

## Gulp

是一个基于流的自动化构建工具，不包括模块化的功能，通过配置一系列的 task，例如文件压缩合并、雪碧图、启动 server、版本控制等，然后定义执行顺序来执行 task，从而构建前端项目的流程。

gulp 强调的是规范前端开发的流程，功能类似于 webpack 的插件功能。

### 核心

- task: 创建一个任务
- series：顺序执行多个任务
- parallel：并行执行多个任务
- src：读取数据源转换成 stream
- pipe：管道-可以在中间对数据流进行处理
- dest：输出数据流到目标路径
- on：事件监听
- watch：数据源监听

### 原理

核心就是把文件转换成 Node 中的 Stream 流，然后对 Stream 进行操作。

gulp 采用 pipe（管道）的概念，意味着顺着管道流淌，插件就相当于在管道中间有个过滤站，对流进行过滤处理。

### 最佳实践

```bash
.
├── gulpfile.js
├── package.json
└── workflow
    ├── common.js
    ├── lib.js
    └── task
        ├── clean.js
        ├── compass.js
        ├── include.js
        ├── initProject.js
        ├── merge.js
        ├── readToolMethod.js
        ├── start.js
        ├── version.js
        └── watch.js
```

## Webpack

### 是什么

一个静态模块打包工具，可以将不同类型的模块处理成 JS 模块，并且对模块进行一定的处理。

### 核心概念

- 入口 (entry)
- 输出 (output)
- loader
- 插件 (plugin)

### 解决了什么问题

- **编译兼容**：ES Modules 模块系统本身就存在环境兼容问题；
- **模块打包**：每一个模块都需要单独从服务器请求回来，影响性能；
- **能力拓展**：除了 JS，还有其他类型的模块；

前两个问题，Gulp 之类的工具也可以解决，第三个只能使用 webpack。

### 打包流程/运行原理

1. 读取 webpack 的配置参数；
2. 启动 webpack，创建 Compiler 对象控制流程，Compilation 对象解析项目；
3. 从入口文件 (entry) 开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 Javascript 文件；
5. 整个过程中 webpack 会通过发布订阅模式，向外抛出一些 hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。

每个模块间的依赖关系，依赖于 AST 语法树。每个模块文件在通过 Loader 解析完成之后，会通过 acorn 库生成模块代码的 AST 语法树，通过语法树就可以分析这个模块是否还有依赖的模块，进而继续循环执行下一个模块的编译解析。

最终 Webpack 打包出来的 bundle 文件是一个 IIFE （立即执行的函数表达式）。

### Loader

Webpack 内部只能够处理 JS 模块代码，Loader 负责类型转换，将其他类型的模块转化为 JS 代码模块。

针对每个文件类型，loader 是支持以数组的形式配置多个的，因此当 Webpack 在转换该文件类型的时候，会按顺序链式调用每一个 loader，前一个 loader 返回的内容会作为下一个 loader 的入参。因此 loader 的开发需要遵循一些规范，比如返回值必须是标准的 JS 代码字符串，以保证下一个 loader 能够正常工作。

- 单一原则：每个 Loader 只做一件事；
- 链式调用：Webpack 会按顺序链式调用每个 Loader；
- 统一原则：遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；

:::tip
同一类型模块使用多个 loader 处理时，从后往前调用。
:::

常用：

- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。

### Plugin

webpack 基于发布订阅模式，在运行的生命周期中会广播出许多事件，插件通过监听这些事件，就可以在特定的阶段执行自己的插件任务，从而实现自己想要的功能。

Plugin 的开发和开发 Loader 一样，需要遵循一些开发上的规范和原则：

- 插件必须是一个函数或者是一个包含 apply 方法的对象，这样才能访问 compiler 实例；
- 传给每个插件的 compiler 和 compilation 对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件；
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住；

```js
class MyPlugin {
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation: 当前打包构建流程的上下文
      console.log(compilation);
      // do something...
    })
  }
}
```

常用 plugin：

- html-webpack-plugin：可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件。
- webpack-bundle-analyzer：可视化 Webpack 输出文件的体积（业务组件、依赖第三方模块）。

### sourceMap

对应 Webpack 配置里边的 devtool 字段。

sourceMap 是一项将编译、打包、压缩后的代码映射回源代码的技术。打包压缩后的代码可读性很差，不好调试，sourceMap 可以帮助我们快速定位到源代码的位置，提高开发效率。

sourceMap 其实并不是 Webpack 特有的功能，而是 Webpack 支持 sourceMap，像 JQuery 也支持 sourceMap。

**原理**：VLQ (Variable-length quantity)，一种编码方式，使用任意位数的二进制来表示一个任意大的数字。特点就是可以非常精简地表示很大的数值，用来节省空间。webpack 中打包之后每个文件模块，都有一个对应的`.map`文件，里面存放着他们的源码路径。

### 热更新原理

其实是本地起了一个 express 应用，添加了对 webpack 编译的监听，添加了和浏览器的 websocket 长连接，当文件变化触发 webpack 编译触发监听后，会通过 socket 消息告诉浏览器准备刷新。而为了减少刷新的代价，就是不用刷新网页，而是刷新某个模块，webpack-dev-server 通过生成文件的 hash 值来比对需要更新的模块，浏览器再进行替换。

### 懒加载原理

在打包时会将懒加载的代码切割出去单独打包，然后在主包中进行按需加载，最后执行调用。

### Tree Shaking 原理

利用 es6 模块的规范

- ES6 Module 引入进行静态分析，故而编译的时候正确判断到底加载了那些模块
- 静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码

### 如何⽤webpack 来优化前端性能？

- 压缩代码：删除多余的代码、注释、简化代码的写法等等⽅式。UglifyJsPlugin 压缩 JS⽂件，利⽤ cssnano 压缩 css；
- 利⽤ CDN 加速：在构建过程中，将引⽤的静态资源路径修改为 CDN 上对应的路径；
- Tree Shaking: 将代码中永远不会⾛到的⽚段删除掉。追加参数 --optimize-minimize 来实现；
- Code Splitting: 将代码按路由维度或者组件分块 (chunk), 这样做到按需加载，同时可以充分利⽤浏览器缓存；

### 调试技巧
## 参考

- [当面试官问 Webpack 的时候他想知道什么](https://juejin.cn/post/6943468761575849992)
- [构建 webpack5.x 知识体系](https://juejin.cn/post/7023242274876162084)
- [AST 抽象语法树——最基础的 javascript 重点知识，99%的人根本不了解](https://segmentfault.com/a/1190000016231512)
- [撸一个简版的 Webpack](https://segmentfault.com/a/1190000021494964)