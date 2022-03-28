## Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理插件。它采用集中式存储管理应用的所有组件的状态，而更改状态的唯一方法是提交 mutation。

### 核心

- state
- getters
- mutations
- actions
- modules 

### 解决了什么问题

多个组件依赖同一状态时的状态管理，多组件的通信问题。

### 思想/Flux

Flux 是一种架构思想，将一个应用分成四个部分。

- View：视图层；
- Action（动作）：视图层发出的消息（比如 mouseClick）；
- Dispatcher（派发器）：用来接收 Actions、执行回调函数；
- Store（数据层）：用来存放应用的状态，一旦发生变动，就提醒 Views 要更新页面；

![](../../images/vue/flux.png)

Flux 的最大特点，就是数据的"单向流动"。这保证了流程的清晰。

- 用户访问 View
- View 发出用户的 Action
- Dispatcher 收到 Action，要求 Store 进行相应的更新
- Store 更新后，发出一个"change"事件
- View 收到"change"事件后，更新页面

## Vue-router

### 解决了什么问题

采用前后端分离架构的 SPA 应用，需要使用路由来控制页面上组件的显隐。

### hash 模式

基于 location.hash 来实现。

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。我们能通过浏览器的回退、前进按钮控制 hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 location.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashChange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

### history 模式

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：

```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

- pushState 和 replaceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。
