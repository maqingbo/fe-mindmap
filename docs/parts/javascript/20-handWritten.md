---
title: '手写系列'
---

## typeof

typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
```

## instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function _instanceof(L, R) {
  const O = R.prototype
  L = L.__proto__

  while(true) {
    if (L === null) return false
    if (L === O) return true
    L = L.__proto__
  }
}
```

## new

new 做了什么：

1. 创建一个空的简单 JavaScript 对象（即`{}`）；
1. 为这个新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象 ；
2. 将新创建的对象作为 this 的上下文 ；
3. 如果该函数没有返回对象，则返回 this。

代码实现：

```js
function _new(Ctor) {
  if (typeof Ctor !== 'function') {
    throw new TypeError(Ctor + ' is not a constructor')
  }

  // es6
  _new.target = Ctor
  const obj = Object.create(Ctor.prototype) // 步骤 1，2，4
  const args = [].slice(arguments, 1)
  const result = Ctor.apply(obj, args) // 步骤 3
  const isObject = result !== null && typeof result === 'object'
  const isFunction = typeof result === 'function'
  if (isObject || isFunction) { // 步骤 5
    return result
  }
  return obj
}
```

参考：[能否模拟实现 JS 的 new 操作符 — 若川](https://juejin.cn/post/6844903704663949325)

## apply

## call

## bind

## Promise

## 调度器

```js
class Scheduler {
  constructor () {
    this.task = []
    this.curringRuning = 0
  }

  add (promiseCreator) {
    return new Promise((resolve) => {
      this.task.push(() => promiseCreator().then(() => resolve()))
      // 控制最多执行两个
      if (this.curringRuning < 2) this.doTask()
    })
  }

  doTask () {
    if (this.task.length > 0) {
      const runTask = this.task.shift()
      this.curringRuning++
      runTask().then(() => { // 完成 1 个后，开始下一个，保证最多执行 2 个
        this.curringRuning--
        this.doTask()
      })
    }
  }
}

module.exports = Scheduler
```

## deepClone

**浅拷贝**：创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

**深拷贝**：将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象

简单版（仅支持数组和对象）：

```js
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
```

## EventEmitter

## jsonp

**是什么**：jsonp（JSON with Padding）是 json 的一种"使用方法"，不是一种单独的技术。
**原理**：利用 script 标签的 src 没有跨域限制来完成跨域目的。
**过程：**

- 前端定义一个解析函数：`const jsonpCallBackFn = function (res) {}`；
- 通过 params 的形式包装 script 标签的请求参数，并且声明执行函数，如：`cb = jsonpCallBackFn`；
- 后端获取前端声明的执行函数（jsonpCallBackFn），并且带上参数且通过调用函数的方式传递给前端；
- 前端在 script 标签返回资源的时候就会执行 jsonpCallBackFn，后端返回的数据就填充（padding）在 jsonpCallBackFn 的参数之中。

**例子**：

- 如客户想访问：`https://www.baidu.com/jsonp.php?cb=jsonpCallBackFn`；
- 假设客户期望返回数据：`["data1","data2"]`；
- 真正返回到客户端的数据显示为：`jsonpCallBackFn(["data1","data2"])`；
- jsonp 中的`p`，就是 padding（填充） 的意思，把数据填充到了函数的参数位置。

**优点**：兼容性好，低版本的浏览器中可使用；
**缺点**：只能进行 get 请求；

```js
// 简单版本 - 只能进行一次请求
// 调用多次时，因为 callbackName 相同，后一个的覆盖掉前面的。
function JSONP ({
  url,
  params = {},
  callbackKey = 'cb',
  callback
}) {
  // 定义本地的一个 callback 的名称
  const callbackName = 'jsonpCallback';
  // 把这个名称加入到参数中：'cb=jsonpCallback'
  params[callbackKey] = callbackName;
  //  把这个 callback 加入到 window 对象中，这样就能执行这个回调了
  window[callbackName] = callback;

  // 得到'id=1&cb=jsonpCallback'
  const paramString = Object.keys(params).map(key => {
    return `${key}=${encodeURIComponent(params[key])}`
  }).join('&')
  // 创建 script 标签
  const script = document.createElement('script');
  script.setAttribute('src', `${url}?${paramString}`);
  document.body.appendChild(script);
}

JSONP({
  url: 'http://localhost:8080/api/jsonp',
  params: { id: 1 },
  callbackKey: 'cb',
  callback (res) {
    console.log(res)
  }
})
```

```js
// 完整版 - 可多次调用
// 让 callbackName 是一个唯一的，可以使用 id 递增的方式
// 把回调定义在 JSONP.callbacks 数组上，避免污染全局环境
function JSONP ({
  url,
  params = {},
  callbackKey = 'cb',
  callback
}) {
  // 定义本地的唯一 callbackId，若是没有的话则初始化为 1
  JSONP.callbackId = JSONP.callbackId || 1;
  let callbackId = JSONP.callbackId;
  // 把要执行的回调加入到 JSON 对象中，避免污染 window
  JSONP.callbacks = JSONP.callbacks || [];
  JSONP.callbacks[callbackId] = callback;
  // 把这个名称加入到参数中：'cb=JSONP.callbacks[1]'
  params[callbackKey] = `JSONP.callbacks[${callbackId}]`;

  // 得到'id=1&cb=JSONP.callbacks[1]'
  const paramString = Object.keys(params).map(key => {
    return `${key}=${encodeURIComponent(params[key])}`
  }).join('&')

  // 创建 script 标签
  const script = document.createElement('script');
  script.setAttribute('src', `${url}?${paramString}`);
  document.body.appendChild(script);

  // id 自增，保证唯一
  JSONP.callbackId++;
}
```

参考：[JSONP 原理及实现 - 简书](https://www.jianshu.com/p/88bb82718517)

## 数组去重

ES5 实现：

```js
function unique(arr) {
    var res = arr.filter(function(item, index, array) {
        return array.indexOf(item) === index
    })
    return res
}
```

ES6 实现：

```js
var unique = arr => [...new Set(arr)]
```

## 数组扁平化

数组扁平化就是将 [1, [2, [3]]] 这种多层的数组拍平成一层 [1, 2, 3]。使用 Array.prototype.flat 可以直接将多层数组拍平成一层：

```js
[1, [2, [3]]].flat(2)  // [1, 2, 3]
```

现在就是要实现 flat 这种效果。

ES5 实现：递归。

```js
function flatten(arr) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flatten(arr[i]))
        } else {
            result.push(arr[i])
        }
    }
    return result;
}
```

ES6 实现：

```js
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 深浅拷贝

浅拷贝：只考虑对象类型。

```js
function shallowCopy(obj) {
    if (typeof obj !== 'object') return

    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

简单版深拷贝：只考虑普通对象属性，不考虑内置对象和函数。

```js
function deepClone(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        }
    }
    return newObj;
}
```

复杂版深克隆：基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。

```js
const isObject = (target) => (typeof target === "object" || typeof target === "function") && target !== null;

function deepClone(target, map = new WeakMap()) {
    if (map.get(target)) {
        return target;
    }
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象 target 是否与正则、日期格式对象匹配
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象（正则类/日期类）的实例
        return new constructor(target);  
    }
    if (isObject(target)) {
        map.set(target, true);  // 为循环引用的对象做标记
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = deepClone(target[prop], map);
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}
```

## 事件总线（发布订阅模式）

```js
class EventEmitter {
    constructor() {
        this.cache = {}
    }
    on(name, fn) {
        if (this.cache[name]) {
            this.cache[name].push(fn)
        } else {
            this.cache[name] = [fn]
        }
    }
    off(name, fn) {
        let tasks = this.cache[name]
        if (tasks) {
            const index = tasks.findIndex(f => f === fn || f.callback === fn)
            if (index >= 0) {
                tasks.splice(index, 1)
            }
        }
    }
    emit(name, once = false, ...args) {
        if (this.cache[name]) {
            // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
            let tasks = this.cache[name].slice()
            for (let fn of tasks) {
                fn(...args)
            }
            if (once) {
                delete this.cache[name]
            }
        }
    }
}

// 测试
let eventBus = new EventEmitter()
let fn1 = function(name, age) {
	console.log(`${name} ${age}`)
}
let fn2 = function(name, age) {
	console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
// '布兰 12'
// 'hello, 布兰 12'
```

## 解析 URL 参数为对象

```js
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    let paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        if (/=/.test(param)) { // 处理有 value 的参数
            let [key, val] = param.split('='); // 分割 key 和 value
            val = decodeURIComponent(val); // 解码
            val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], val);
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = val;
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true;
        }
    })

    return paramsObj;
}
```

## 函数防抖（debounce）

触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。

简单版：函数内部支持使用 this 和 event 对象；

```js
function debounce(func, wait) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}
```

使用：

```js
var node = document.getElementById('layout')
function getUserAction(e) {
    console.log(this, e)  // 分别打印：node 这个节点 和 MouseEvent
    node.innerHTML = count++;
};
node.onmousemove = debounce(getUserAction, 1000)
```

最终版：除了支持 this 和 event 外，还支持以下功能：

*   支持立即执行；
*   函数可能有返回值；
*   支持取消功能；

```js
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function(){
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}
```

使用：

```js
var setUseAction = debounce(getUserAction, 10000, true);
// 使用防抖
node.onmousemove = setUseAction

// 取消防抖
setUseAction.cancel()
```

参考：[JavaScript 专题之跟着 underscore 学防抖](https://link.juejin.cn/?target=https://github.com/mqyqingfeng/Blog/issues/22 "https://github.com/mqyqingfeng/Blog/issues/22")

## 函数节流（throttle）

触发高频事件，且 N 秒内只执行一次。

简单版：使用时间戳来实现，立即执行一次，然后每 N 秒执行一次。

```js
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
```

最终版：支持取消节流；另外通过传入第三个参数，options.leading 来表示是否可以立即执行一次，opitons.trailing 表示结束调用的时候是否还要执行一次，默认都是 true。 注意设置的时候不能同时将 leading 或 trailing 设置为 false。

```js
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    return throttled;
}
```

节流的使用就不拿代码举例了，参考防抖的写就行。

参考：[JavaScript 专题之跟着 underscore 学节流](https://link.juejin.cn/?target=https://github.com/mqyqingfeng/Blog/issues/26 "https://github.com/mqyqingfeng/Blog/issues/26")

## 函数柯里化

什么叫函数柯里化？其实就是将使用多个参数的函数转换成一系列使用一个参数的函数的技术。还不懂？来举个例子。

```js
function add(a, b, c) {
    return a + b + c
}
add(1, 2, 3)
let addCurry = curry(add)
addCurry(1)(2)(3)
```

现在就是要实现 curry 这个函数，使函数从一次调用传入多个参数变成多次调用每次传一个参数。

```js
function curry(fn) {
    let judge = (...args) => {
        if (args.length == fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
```

## 偏函数

什么是偏函数？偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入。举个例子：

```js
function add(a, b, c) {
    return a + b + c
}
let partialAdd = partial(add, 1)
partialAdd(2, 3)
```

发现没有，其实偏函数和函数柯里化有点像，所以根据函数柯里化的实现，能够能很快写出偏函数的实现：

```js
function partial(fn, ...args) {
    return (...arg) => {
        return fn(...args, ...arg)
    }
}
```

如上这个功能比较简单，现在我们希望偏函数能和柯里化一样能实现占位功能，比如：

```js
function clg(a, b, c) {
    console.log(a, b, c)
}
let partialClg = partial(clg, '_', 2)
partialClg(1, 3)  // 依次打印：1, 2, 3
```

`_` 占的位其实就是 1 的位置。相当于：partial(clg, 1, 2)，然后 partialClg(3)。明白了原理，我们就来写实现：

```js
function partial(fn, ...args) {
    return (...arg) => {
        args[index] = 
        return fn(...args, ...arg)
    }
}
```

## JSONP

JSONP 核心原理：script 标签不受同源策略约束，所以可以用来进行跨域请求，优点是兼容性好，但是只能用于 GET 请求；

```js
const jsonp = ({ url, params, callbackName }) => {
    const generateUrl = () => {
        let dataSrc = ''
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}
```

## AJAX

```js
const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  })
}
```

## 参考

- [死磕 36 个 JS 手写题](https://juejin.cn/post/6946022649768181774#heading-45)