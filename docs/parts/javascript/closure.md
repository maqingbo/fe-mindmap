## 什么是闭包

闭包是一个组合：

1. 一个函数；
2. 以及该函数对外部环境的引用 (outer environment reference)。

## 词法环境

前一节我们有讲 [JS 的执行过程](./03-keyConcepts.md)：JS 引擎使用函数调用栈 (Call Stack) 的方式执行代码，对不同类型的执行上下文 (Execution Context) 执行入栈出栈操作，执行上下文在创建阶段会生成词法环境，其中包含一个对外部环境的引用：

```
ExecutionContext = {
  // 词法环境
  LexicalEnvironment: {
    EnvironmentRecord: {},
    // 外部环境引用
    outer: null,
    this: <globalObject>
  }
}
```

举例：

```js
function fn1 () {
  let a = '111'
  let b = '222'
  function fn2 () {
    console.log(a);
  }
  return fn2;
}

let result = fn1();
result();
```

当我们的代码执行完`let result = fn1()`这一句的时候，`fn1`函数已经执行完毕，那它所对应的执行上下文就会从函数调用栈中出栈，词法环境也应该从内存中删除。但我们在执行下一行代码`fn2()`时却依然能打印出 **111**！这说明`fn1`的词法环境并没有被完全删除。

JavaScript 使用的是静态作用域，在函数调用栈执行函数时，执行上下文、词法环境也是被顺序创建和销毁的。但是 JS 中的函数也可以作为参数或返回一个函数，此时子函数的销毁时间晚于父函数的，假如父函数销毁了，子函数依然引用了父函数中的变量，怎么办？

闭包就是为了处理这种情况，父函数销毁前，引擎会把**子函数引用到的变量**（不是全部）保留，打包成 Closure 放到子函数的 `[[Scopes]]` 属性上，保证即使父函数销毁了，子函数也能访问这部分引用。

```yaml
# Chrome 控制台打印的 result
# console.dir(result)

ƒ fn2()
  arguments: null
  caller: null
  length: 0
  name: "fn2"
  prototype: {constructor: ƒ}
  [[FunctionLocation]]: VM1110:4
  [[Prototype]]: ƒ ()
  [[Scopes]]: Scopes[3]
    0: Closure (fn1) {a: '111'} # 闭包在这里
    1: Script {func2: ƒ, clo: ƒ, result: ƒ}
    2: Global {window: Window, self: Window, document: document, …}
```

### 一个需要注意的点

有如下代码：

```js
function fn1 () {
  const a = 1;
  const b = 2;
  const c = 3;
  function fn2() {
    console.log("xx");
  }
  function fn3() {
    console.log(a);
    console.log(c);
  }
  return fn2;
}
const clo = fn1();
console.dir(clo);
```

在 chrome 控制台执行这段代码时，会有下面的情况：

```yaml
ƒ fn2()
  arguments: null
  caller: null
  length: 0
  name: "fn2"
  prototype: {constructor: ƒ}
  [[FunctionLocation]]: VM1110:4
  [[Prototype]]: ƒ ()
  [[Scopes]]: Scopes[3]
    0: Closure (fn1) {a: 1, c: 3} # 请看这里
    1: Script {func2: ƒ, clo: ƒ, result: ƒ}
    2: Global {window: Window, self: Window, document: document, …}
```

上面代码中，fn3 对 fn1 的变量进行了引用，但我们只 return 了 fn2，为什么 fn2 的 `[[Scopes]]` 中出现了 Closure 字段？

原因是引擎在销毁父函数的词法环境时，检测到被引用的变量时，直接将相关变量打包并插入到所有子函数的`[[Scopes]]`中，不对子函数进行区分。ES 规范也并没有对这一点进行强制优化。一部分引擎在优化这一部分时，发现付出与收获并不成正比，所以放弃了优化，直接分发给所有的子函数。

我也把这个问题发到了网上，有兴趣可以去看下讨论：[segmentfault](https://segmentfault.com/q/1010000041620040)，[stackoverflow](https://stackoverflow.com/questions/71644055/javascript-closure-in-chrome)

## 出现场景

### 返回一个函数

```js
function create () {
  const a = 1
  return function () {
    console.log(a)
  }
}

const fn = create()
const a = 2
fn()  // 1  外部引用指向的是函数被定义的父环境
```

**面试题**：

编写一个函数 multiply() ，将两个数字相乘：

```js
function multiply(num1, num2) {
  // 把你的代码写在这里。..
}
```

要求：

如果用 2 个参数调用 `multiply(num1，numb2)`，则应返回这 2 个参数的乘积。

但是如果用 1 个参数调用，则该函数应返回另一个函数： `const anotherFunc = multiply(num1)` 。返回的函数在调用 `anotherFunc(num2)` 时执行乘法 `num1 * num2`。

```js
multiply(4, 5); // => 20
multiply(3, 3); // => 9

const double = multiply(2);
double(5);  // => 10
double(11); // => 22
```

一种实现方式：

```js
function multiply(number1, number2) {
  if (number2 !== undefined) {
    return number1 * number2;
  }
  return function anotherFunc(number2) {
    return number1 * number2;
  };
}

multiply(4, 5); // => 20
multiply(3, 3); // => 9

const double = multiply(2);
double(5);  // => 10
double(11); // => 22
```

这段代码中，anotherFunc 和它外部环境引用组合形成闭包。当我们执行`double(5)`时，按说`multiply(2)`已经执行完了，词法环境该被删除了，但是我们依然访问到了 multiply 词法环境中的 number1，因为 anotherFunc 对 multiply 的词法环境依然有引用。

### 函数作为参数

```js
function print (fn) {
  const a = 1
  console.dir(fn)
  fn()
}

const aa = 2
function fn1 () {
  console.log(aa)
}
print(fn1) // 2
```

### 模拟私有方法（IIFE）

编程语言中，比如 Java，是支持将方法声明为私有的，即它们只能被同一个类中的其它方法所调用。

而 JavaScript 没有这种原生支持，但我们可以使用闭包来模拟私有方法。私有方法不仅仅有利于限制对代码的访问：还提供了管理全局命名空间的强大能力，避免非核心的方法污染全局。

```js
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```

上面的例子中，三个函数`increment`、`decrement`、`value`共享一个词法环境，我们在访问这三个函数时并不会影响到这个词法环境内定义的变量 privateCounter 和函数 changeBy。

值得注意的是，两个计数器 Counter1 和 Counter2 所引用的词法环境是独立的。这是因为函数在每次调用时会生产新的执行上下文，即新的词法环境，所以互不干扰。

### 在循环中创建闭包

在 ECMAScript 2015 引入 let 关键字 之前，在循环中有一个常见的闭包创建问题。

```js
var i = 0
for (; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // i 是在全局环境被定义的
  }, 1000);
}
```

这段代码中，函数 log 可以访问外部词法环境中的变量`i`，循环了三次，所以其实是三个 log 函数共享一个外部词法环境。由于 setTimeout 的异步行为，导致 log 函数在执行时 for 循环已经结束，词法环境中的变量`i`被修改成了 3，所以三个 log 函数打印出了三个 3.

```js
// 解法一，闭包
var i = 0
for (; i < 3; i++) {
  (function () {
    var j = i
    setTimeout(function log() {
      console.dir(log)
      console.log(j); // => ?
    }, 1000);
  })()
}
```

我们拿 IIFE 将 setTimeout 包裹起来之后，三个 log 函数共享的是 IIFE 的词法环境。for 循环三次，IIFE 执行三次，会创建三个不同的词法环境，log 函数执行时虽然 IIFE 已经执行完了，但是词法环境没销毁，log 函数依然能访问，所以最后的结果将会是 0，1，2。

这种解法中，console.dir(log) 执行时可以看到 log 函数 `[[scopes]]` 属性上的 Closure 字样。

```js
// 另一种解法
var i = 0
for (; i < 3; i++) {
  {
    var j = i
    setTimeout(function log() {
      console.dir(log)
      console.log(j); // => ?
    }, 1000);
  }
}
```

用 `{}` 将 setTimeout 包裹起来之后，for 循环三次会形成三个词法环境，最后的结果将会是 0，1，2。

## 实际应用

### 隐藏数据

```js
function createCache () {
  const data = {}
  return {
    set (key, val) {
      data[key] = val
    }
    get (key) {
      return data[key]
    }
  }
}

// test
const c = createCache()
c.set('a', 1)
console.log(c.get('a'))
```

### li 标签绑定事件

创建多个 li 标签，点击分别弹出对应的序号。

```js
// i 在全局作用域，点击全部都是 10
let i, a
for(i=0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = `<li>${i}</li><br>`
  a.addEventListener('click', (e) => {
    e.preventDefault
    console.log(i)
  })
  document.body.appendChild(a)
}

// 方案一
let a
// let 写在这个位置，i 在块级作用域
for(let i=0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = `<li>${i}</li><br>`
  a.addEventListener('click', (e) => {
    e.preventDefault
    console.log(i)
  })
  document.body.appendChild(a)
}

// 方案二
let i, a
for(i=0; i < 10; i++) {
  a = document.createElement('a')
  a.innerHTML = `<li>${i}</li><br>`
  // index 定义在块级作用域
  const index = i
  a.addEventListener('click', (e) => {
    e.preventDefault
    console.log(index)
  })
  document.body.appendChild(a)
}
```

## 性能问题

因为闭包可以保存词法环境，所以影响代码的处理速度和增加内存消耗。

## 常见的坑

todo

## 参考

- [Closure - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [How do JavaScript closures work? - stackoverflow](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work)