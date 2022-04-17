## 模块化是什么，解决了什么问题

在早期 JS 模块这一概念，都是通过 script 标签引入 js 文件代码。当我们的项目越来越庞大时，我们引入的 js 文件就会越多，这时就会出现以下问题：

- js 文件作用域都是顶层，这会造成变量污染
- js 文件多，变得不好维护
- js 文件依赖问题，需要按顺序引入

为了解决以上问题 JS 社区出现了各种模块化方案，AMD、CMD、CommonJs、UMD。那么在后来 Es6 版本正式加入了 Es Module 模块，开始从语言层面支持模块化。

- 解决变量污染问题，每个文件都是独立的作用域，所以不存在变量污染
- 解决代码维护问题，一个文件一个模块，代码非常清晰
- 解决文件依赖问题，一个文件里可以清楚的看到依赖了哪些其它文件

## AMD

全称“Asynchronous Module Definition”，意思是异步模块定义。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

```js
require([module], callback);
```

AMD 规范的代表性实现是 RequireJS。

```js
// 定义 math.js 模块
define(function () {
    var basicNum = 0;
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum :basicNum
    };
});
// 定义一个依赖 underscore.js 的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在 [] 内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});

```

## CMD

与 AMD 很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行。此规范其实是在 sea.js 推广过程中产生的。

```js
/** AMD 写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没用到某个模块 b，但 b 还是提前执行了
    b.doSomething()
  } 
});

/** CMD 写法 **/
define(function(require, exports, module) {
  var a = require('./a'); // 在需要时申明
  a.doSomething();
  if (false) {
    var b = require('./b');
    b.doSomething();
  }
});
```

## CommonJS

每一个文件都是一个模块，每个模块都有一个 module 对象，这个 module 对象的 exports 属性用来导出接口，外部模块导入当前模块时，使用的也是 module 对象。

- 在 commonjs 中每一个 js 文件都是一个单独的模块，每个模块都有一个 module 对象，代表当前模块；
- 该模块中，包含 CommonJS 规范的核心变量：exports、module.exports、require；
- exports 和 module.exports 可以负责对模块中的内容进行导出；
- require 函数可以帮助我们导入其他模块（自定义模块、系统模块、第三方库模块）中的内容；

```js
// hello.js
let name = 'qb'
module.exports = function sayName  (){
  return name
}

// home.js
const sayName = require('./hello.js')
module.exports = function say(){
  return {
    name: sayName()
  }
}
```

## UMD

UMD 是一种通用模块定义规范，支持全局变量的形式，也符合 AMD 规范，还能符合 CommonJS 规范。

```js
!function (root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    // CommonJS2
    module.exports = factory()
    // define.amd 用来判断项目是否应用 require.js。
    // 更多 define.amd 介绍，请 [查看文档](https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property-)
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory)
  } else if (typeof exports === 'object') {
    // CommonJS
    exports.myLibName = factory()
  } else {
    // 全局变量
    root.myLibName = factory()
  }
}(window, function () {
  // 模块初始化要执行的代码
});
```

## ES6 Module

AMD 、 CMD 等都是在原有 JS 语法的基础上二次封装的一些方法来解决模块化的方案，ES6 module（在很多地方被简写为 ESM）是语言层面的规范，ES6 module 旨在为浏览器和服务器提供通用的模块解决方案。

与 CommonJS 的区别：

- CommonJS 和 AMD 是运行时加载，在运行时确定模块的依赖关系，ES6 module 是在编译时处理模块依赖关系。
- CommonJS 模块的 `require()` 是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

```js
// 单个导出
export const name = "蛙人"
export function fn() {}

// 导入
import { name, fn } from './var.js'
import * as var from './var.js'
```

```js
// 默认导出
export default {
  fn() {}，
  msg: "hello 蛙人"
}

// 导入
import var from './var.js'
import default as all from './var.js'
```

- export 导出的值是值的引用，并且内部有映射关系，这是 export 关键字的作用。
- 而且导入的值，不能进行修改也就是只读状态。
- import 只能声明在该文件的最顶部，不能动态加载语句