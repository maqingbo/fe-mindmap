class PromiseAPlus {
  // 三种状态
  static PENDING = 'pending'
  static RESOLVED = 'resolved'
  static REJECTED = 'reject'

  constructor(executor) {
    this.status = PENDING // 初始状态为 pending
    this.value = undefined // 存储 this._resolve 即操作成功 返回的值
    this.reason = undefined // 存储 this._reject 即操作失败 返回的值
    this.callbacks = [] // 同一个Promise的then方法可以调用多次
    executor(this._resolve.bind(this), this._reject.bind(this))
  }
  // 成功的回调
  _resolve (value) {
    this.resultValue = value
    this.status = RESOLVED
    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb))
  }
  // 失败的回调
  _reject (reason) {
    this.reason = reason
    this.status = REJECTED
    // 通知事件执行
    this.callbacks.forEach((cb) => this._handler(cb))
  }
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