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

## 参考

- [Promise/async/Generator 实现原理解析](https://juejin.cn/post/6844904096525189128)
- [Promise 之你看得懂的 Promise](https://juejin.cn/post/6844903629187448845)
- [Callbacks Vs Promises and basics of JS](https://theflyingmantis.medium.com/callbacks-vs-promises-and-basics-of-js-80d3d1515e81)