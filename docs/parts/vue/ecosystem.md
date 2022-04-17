## Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理插件。它采用集中式存储管理应用的所有组件的状态，而更改状态的唯一方法是提交 mutation。

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

### 核心概念

- **Store**：Vuex 采用**单一状态树**，每个应用仅有一个 Store 实例，在该实例下包含了 state, actions, mutations, getters, modules
- **State**：Vuex 为**单一数据源**
  - 可以通过 mapState 辅助函数将 state 作为计算属性访问，或者将通过 Store 将 state 注入全局之后使用 this.$store.state 访问
  - State 更新视图是通过 vue 的双向绑定机制实现的
- **Getter**：Getter 的作用与 filters 有一些相似，可以将 State 进行过滤后输出
- **Mutation**：**Mutaion 是 vuex 中改变 State 的唯一途径**（严格模式下），并且只能是同步操作。
  - Vuex 中通过 `store.commit()` 调用 Mutation
- **Action**：一些对 State 的异步操作可以放在 Action 中，并通过在 Action 提交 Mutaion 变更状态
  - Action 通过 `store.dispatch()` 方法触发
  - 可以通过 mapActions 辅助函数将 vue 组件的 methods 映射成 store.dispatch 调用（需要先在根节点注入 store）
- **Module**：当 Store 对象过于庞大时，可根据具体的业务需求分为多个 Module ，每个 Module 都具有自己的 state 、mutation 、action 、getter

![](../../images/vue/vuex.png)

### 解决了什么问题

多个组件依赖同一状态时的状态管理，多组件的通信问题。

### 对比其他状态管理工具

对比：Flux、Redux、MobX。

**Vuex 的特点**

- 单向数据流。View 通过 `store.dispatch()` 调用 Action ，在 Action 执行完异步操作之后通过 `store.commit()` 调用 Mutation 更新 State ，通过 vue 的响应式机制进行视图更新
- 单一数据源，和 Redux 一样全局只有一个 Store 实例
- 只能应用于 Vue

**异同**

- Flux 、Redux 、Vuex 均为单向数据流
- Redux 和 Vuex 是基于 Flux 的，Redux 较为泛用，Vuex 只能用于 vue
- Flux 与 MobX 可以有多个 Store；Redux 、Vuex 全局仅有一个 Store（单状态树）
- Redux 、Vuex 适用于大型项目的状态管理，MobX 在大型项目中应用会使代码可维护性变差
- Redux 中引入了中间件，主要解决异步带来的副作用，可通过约定完成许多复杂工作

## Vue-router

### 解决了什么问题

采用前后端分离架构的 SPA 应用，需要使用路由来控制页面上组件的显隐。

### hash 模式

基于 location.hash 来实现。

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。我们能通过浏览器的回退、前进按钮控制 hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 location.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashChange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

**简单实现**

todo

### history 模式

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：

```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

- pushState 和 replaceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

**简单实现**

todo

## 参考

- [状态管理之 Flux、Redux、Vuex、MobX（概念篇）](https://juejin.cn/post/6844904013532495885)