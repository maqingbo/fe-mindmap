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
function makeFunc() {
  let name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

let myFunc = makeFunc();
myFunc();
```

上面的代码会形成下面这样的词法环境，我们需要尤其注意绿色的那一行代码：

```diff
GlobalExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      type: 'object',
      myFunc: <uninitialized>
    },
    outer: null,
    this: <globalObject>
  }
},
MakeFuncExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      type: 'declarative',
      arguments: { length: 0 },
      displayName: <uninitialized>,
      name: <uninitialized>
    },
    // outer 指向的是当前词法环境被定义时的父环境
     outer: <Global Lexical Environment>,
    this: <utils>
  }
}
DisplayNameExecutionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      type: 'declarative',
      arguments: { length: 0 }
    },
+   // outer 指向的是当前词法环境被定义时的父环境
+   outer: <MakeFunc Lexical Environment>,
    this: <utils>
  }
}
```

当我们的代码执行完`let myFunc = makeFunc()`这一句的时候，`makeFunc`函数已经执行完毕，那它所对应的执行上下文就会从函数调用栈中出栈，词法环境也应该从内存中删除。但我们在执行下一行代码`myFunc()`时却依然能打印出 **Mozilla**！这说明`makeFunc`的词法环境并没有从内存中删除。

**函数`myFunc()`以及`makeFunc`的词法环境组合起来就叫闭包！**

至于`makeFunc`的词法环境为什么没有从内存中删除，是因为 JS 采用的是**引用计数**的垃圾回收机制，只要还有地方引用了这个词法环境，那么它就不会被删除。

## 使用场景

### 返回一个函数

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
    console.log(i); // => ?
  }, 1000);
}
```

这段代码中，函数 log 可以访问外部词法环境中的变量`i`，循环了三次，所以其实是三个 log 函数共享一个外部词法环境。由于 setTimeout 的异步行为，导致 log 函数在执行时 for 循环已经结束，词法环境中的变量`i`被修改成了 3，所以三个 log 函数打印出了三个 3.

我们修改一下上面的代码：

```js
var i = 0
for (; i < 3; i++) {
  (function () {
    var j = i
    setTimeout(function log() {
      console.log(j); // => ?
    }, 1000);
  })()
}
```

我们拿 IIFE 将 setTimeout 包裹起来之后，三个 log 函数共享的是 IIFE 的词法环境，log 函数执行三次，IIFE 会创建三个不同的词法环境，如此一来，最后的结果将会是 0，1，2。

## 性能问题

因为闭包可以保存词法环境，所以影响代码的处理速度和增加内存消耗。

## 参考

- [Closure - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
- [How do JavaScript closures work? - stackoverflow](https://stackoverflow.com/questions/111102/how-do-javascript-closures-work)