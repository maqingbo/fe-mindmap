## 介绍

Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步操作的消息，避免了地狱回调，它比传统的解决方案回调函数和事件更合理和更强大。

所谓 Promise, 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息 Promise 提供统一的 API, 各种异步操作都可以用同样的方法进行处理。

Promise 的实例有三个状态：

- Pending（进行中）
- Resolved（已完成）
- Rejected（已拒绝）

当把一件事情交给 promise 时，它的状态就是 Pending, 任务完成了状态就变成了 Resolved，没有完成失败了就变成了 Rejected。一旦从进行状态变成为其他状态就永远不能更改状态了。

Promise 的实例有两个过程：

- pending -> fulfilled : Resolved（已完成） 
- pending -> rejected:Rejected（已拒绝） 

Promise 的缺点：

- 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。
- 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 应用

### 加载图片

```js
function loadImg (src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      resolve(img)
    }
    img.onerror = () => {
      reject(new Error('加载失败！'))
    }
    img.src = src
  })
}
```

## 简单实现

- Promise 是一个构造函数，参数接受一个函数，函数的两个参数也都是函数；
- 有一个状态属性，一个值属性存放执行成功的值，一个 reason 属性存放执行失败的原因；

```js
class PromiseAPlus {
  // 三种状态
  static PENDING = 'pending'
  static RESOLVED = 'resolved'
  static REJECTED = 'reject'

  constructor(executor) {
    this.status = PENDING // 初始状态为 pending
    this.value = undefined // 存储 this._resolve 即操作成功 返回的值
    this.reason = undefined // 存储 this._reject 即操作失败 返回的值
    executor(this._resolve.bind(this), this._reject.bind(this));
  }
  // 成功的回调
  _resolve (value) {
    this.resultValue = value
    this.status = RESOLVED
  }
  // 失败的回调
  _reject (reason) {
    this.reason = reason
    this.status = REJECTED
  }
}
```

then 方法：

- then 方法有两个参数，一个是成功时候的回调，一个是失败的回调；
- then 方法在 resolve 或者 reject 执行之后才会执行；
- then 方法中的值是传给 resolve 或 reject 的参数；

这个过程有点类似于发布订阅者模式：使用 then 来注册事件，那什么时候来通知这些事件是否执行呢？就是在 resolve 方法执行或者 reject 方法执行时。

```js {11,18,19,25,26,28-49}
class PromiseAPlus {
  // 三种状态
  static PENDING = 'pending'
  static RESOLVED = 'resolved'
  static REJECTED = 'reject'

  constructor(executor) {
    this.status = PENDING // 初始状态为 pending
    this.value = undefined // 存储 this._resolve 即操作成功 返回的值
    this.reason = undefined // 存储 this._reject 即操作失败 返回的值
    this.callbacks = [] // 同一个 Promise 的 then 方法可以调用多次
    executor(this._resolve.bind(this), this._reject.bind(this));
  }
  // 成功的回调
  _resolve (value) {
    this.resultValue = value
    this.status = RESOLVED
    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb));
  }
  // 失败的回调
  _reject (reason) {
    this.reason = reason
    this.status = REJECTED
    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb));
  }
  // onFulfilled 是成功时执行的函数
  // onRejected 是失败时执行的函数
  then (onFulfilled, onRejected) {
    // 这里可以理解为在注册事件
    // 也就是将需要执行的回调函数存储起来
    this.callbacks.push({
      onFulfilled,
      onRejected
    })
  }
  _handler (callback) {
    const { onFulfilled, onRejected } = callback;

    if (this.status === PromiseAPlus.RESOLVED && onFulfilled) {
      // 传入存储的值
      onFulfilled(this.value);
    }

    if (this.status === PromiseAPlus.REJECTED && onRejected) {
      // 传入存储的错误信息
      onRejected(this.reason);
    }
  }
}
```

重难点：then 方法的链式调用。

其实链式调用无非就是再返回一个类的实例，但是不能直接返回 this，而是要返回一个新的 Promise。值得注意的是，then 函数中返回的 Promise 的 value 值来源于当前 then 函数的 onFulfilled 函数（第一个参数）的执行结果。

```js
class PromiseAPlus {
  ...
  // onFulfilled 是成功时执行的函数
  // onRejected 是失败时执行的函数
  then (onFulfilled, onRejected) {
    // 这里可以理解为在注册事件
    // 也就是将需要执行的回调函数存储起来
    return new PromiseAPlus((nextResolve, nextReject) => {
      this._handler({
        nextResolve,
        nextReject,
        onFulfilled,
        onRejected
      })
    })
  }
  _handler (callback) {
    const { onFulfilled, onRejected, nextResolve, nextReject } = callback

    if (this.status === PromiseAPlus.pending) {
      this.callbacks.push(callback)
      return
    }

    // 传入存储的值
    // 未传入 onFulfilled 时，将 undefined 传入
    if (this.status === PromiseAPlus.RESOLVED) {
      const nextValue = onFulfilled ? onFulfilled(this.value) : undefined
      nextResolve(nextValue)
      return
    }

    // 传入存储的值
    // 未传入 onFulfilled 时，将 undefined 传入
    if (this.status === PromiseAPlus.REJECTED) {
      const nextReason = onRejected ? onRejected(this.reason) : undefined
      nextResolve(nextReason)
    }
  }
}
```

## 参考

- [Promise/async/Generator 实现原理解析](https://juejin.cn/post/6844904096525189128)
- [Promise 之你看得懂的 Promise](https://juejin.cn/post/6844903629187448845)
- [Callbacks Vs Promises and basics of JS](https://theflyingmantis.medium.com/callbacks-vs-promises-and-basics-of-js-80d3d1515e81)