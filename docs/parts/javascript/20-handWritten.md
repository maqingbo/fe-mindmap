---
title: '手写系列-常见需求'
---

## 参考

- [死磕 36 个 JS 手写题](https://juejin.cn/post/6946022649768181774#heading-45)

## 数据类型判断

typeof 可以正确识别：Undefined、Boolean、Number、String、Symbol、Function 等类型的数据，但是对于其他的都会认为是 object，比如 Null、Date 等，所以通过 typeof 来判断数据类型会不准确。但是可以使用 Object.prototype.toString 实现。

```js
function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

typeOf([])        // 'array'
typeOf({})        // 'object'
typeOf(new Date)  // 'date'
```

## 继承

### 原型链继承

```js
function Animal() {
    this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() {
    return this.colors
}
function Dog() {}
Dog.prototype =  new Animal()

let dog1 = new Dog()
dog1.colors.push('brown')
let dog2 = new Dog()
console.log(dog2.colors)  // ['black', 'white', 'brown']
```

原型链继承存在的问题：

*   问题 1：原型中包含的引用类型属性将被所有实例共享；
*   问题 2：子类在实例化的时候不能给父类构造函数传参；

### 借用构造函数实现继承

```js
function Animal(name) {
    this.name = name
    this.getName = function() {
        return this.name
    }
}
function Dog(name) {
    Animal.call(this, name)
}
Dog.prototype =  new Animal()
```

借用构造函数实现继承解决了原型链继承的 2 个问题：引用类型共享问题以及传参问题。但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一遍方法。

### 组合继承

组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```js
function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}
Animal.prototype.getName = function() {
    return this.name
}
function Dog(name, age) {
    Animal.call(this, name)
    this.age = age
}
Dog.prototype =  new Animal()
Dog.prototype.constructor = Dog

let dog1 = new Dog('奶昔', 2)
dog1.colors.push('brown')
let dog2 = new Dog('哈赤', 1)
console.log(dog2) 
// { name: "哈赤", colors: ["black", "white"], age: 1 }
```

### 寄生式组合继承

组合继承已经相对完善了，但还是存在问题，它的问题就是调用了 2 次父类构造函数，第一次是在 new Animal()，第二次是在 Animal.call() 这里。

所以解决方案就是不直接调用父类构造函数给子类原型赋值，而是通过创建空函数 F 获取父类原型的副本。

寄生式组合继承写法上和组合继承基本类似，区别是如下这里：

```js
function F() {}
F.prototype = Animal.prototype
let f = new F()
f.constructor = Dog
Dog.prototype = f
```

稍微封装下上面添加的代码后：

```js
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function inheritPrototype(child, parent) {
    let prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
inheritPrototype(Dog, Animal)
```

如果你嫌弃上面的代码太多了，还可以基于组合继承的代码改成最简单的寄生式组合继承：

```js
Dog.prototype =  Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
```

### class 实现继承

```js
class Animal {
    constructor(name) {
        this.name = name
    } 
    getName() {
        return this.name
    }
}
class Dog extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }
}
```

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

## 字符串模板

```js
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
    if (reg.test(template)) { // 判断模板里是否有模板字符串
        const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
        template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
        return render(template, data); // 递归的渲染并返回渲染后的结构
    }
    return template; // 如果模板没有模板字符串直接返回
}
```

测试：

```js
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let person = {
    name: '布兰',
    age: 12
}
render(template, person); // 我是布兰，年龄 12，性别 undefined
```

## 图片懒加载

与普通的图片懒加载不同，如下这个多做了 2 个精心处理：

*   图片全部加载完成后移除事件监听；
*   加载完的图片，从 imgList 移除；

```js
let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

// 修正错误，需要加上自执行
const imgLazyLoad = (function() {
    let count = 0

   return function() {
        let deleteIndexList = []
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                deleteIndexList.push(index)
                count++
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
   }
})()

// 这里最好加上防抖处理
document.addEventListener('scroll', imgLazyLoad)
```

参考：[图片懒加载](https://juejin.cn/post/6844903856489365518#heading-19 "https://juejin.cn/post/6844903856489365518#heading-19")

## 函数防抖

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

## 函数节流

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