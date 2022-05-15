## 谈谈对 vue 生命周期的理解

每个 Vue 实例在创建时都会经过一系列的初始化过程，生命周期钩子，就是在初始化过程中的某个阶段，去触发指定的函数，目的是完成一些动作或事件。

- create 阶段：（Vue 实例被创建）
  - beforeCreate：此时 data 和 methods 中的数据都还没有初始化
  - created： 初始化完毕，data 中有值，未挂载，此时可以请求数据
- mount 阶段：挂载真实的 DOM 节点
  - beforeMount：尚未挂载
  - mounted：已挂载，此时可操作 DOM
- update 阶段：当 vue 实例里面的 data 数据变化时，触发 virtual DOM 的更新和 DOM 的重新挂载
  - beforeUpdate : 更新前。在这之后开始 diff virtual DOM，
  - updated：更新后
- destroy 阶段：vue 实例被销毁
  - beforeDestroy：销毁前，可以手动的卸载一些事件
  - destroy：销毁后

下面的代码展现了 Vue 实例初始化的大概流程。

```js
_init() {
  vm.$options = mergeOptions()
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  // 第一个钩子函数
  callHook(vm, 'beforeCreate')
  initState(vm) {
    initProps()
    initMethods()
    initData() {
      observe()
        // 创建 dep 实例来保存依赖
        Observer()
          this.dep = new Dep()
    }
    initComputed()
    initWatch()
  }
  initProvide(vm)
  // 初始化完毕之后，第二个钩子函数
  callHook(vm, 'created')
}
vm.$mount(vm.$options.el);
callHook(vm, 'beforeMount')
updateComponent = function () {
  vm._update(vnode, hydrating)
}
new Watcher(vm, updateComponent, ...)

createCompilerCreator(baseCompile)
  return function createCompiler(baseOptions)
    function compile (template, options)
```

## vue 数据绑定的实现原理

vue 2.0 版本使用的是 Object.defineProperty 方法。

- 整体来看是 Object.defineProperty + 发布订阅模式来实现的
- 具体来看，initState 阶段，新建一个 dep 实例存放依赖；
- 然后 vue 会遍历 data 里面的对象，使用 Object.defineProperty 修改对象属性的 get、set 特性。
- 在这之后，当我们触发对象属性的 getter 的时候 vue 会使用 dep.depend 方法收集属性对应的依赖 (watcher)，触发 setter 的时候使用 dep.notify 触发依赖，通知 watcher 重新计算，从而使关联的组件得以更新；
- watcher 是组件级别的，组件内部的更新需要使用 virtual DOM 的 diff 算法进行局部更新；

vue3.0 思路是类似的，也是将使用了同一状态的依赖记录下来，状态改变时通知依赖更新，只不过监测状态（对象属性）和记录依赖的方式不太一样。

- dep 类被拆分，保存依赖的对象换成了 Set 类型，depend 方法改名为 track，notify 方法改名为 trigger。
- 不再使用 Object.defineProperty，而是使用 proxy 代理对象的方式实现对对象属性的监测。

## Diff 算法

Diff 算法是一种对比算法。对比两者是 old VNode 和 new VNode，对比出是哪个虚拟节点更改了，找出这个虚拟节点，并只更新这个虚拟节点所对应的真实节点，而不用更新其他数据没发生改变的节点，实现精准地更新真实 DOM，从而提高效率。

Vue 中的 diff 使用的是`深度优先算法`，只在同层进行对比，时间复杂度`O(n)`。

- 对比当前同层的虚拟节点是否为同一种类型的标签；
  - 当 key、tag、isComment、data 相同，同时满足当标签类型为 input 的时候 type 相同。
  - 是：继续执行 patchVnode 方法进行深层比对
  - 否：没必要比对了，直接整个节点替换成新虚拟节点
- patchVnode
  - 如果新旧 VNode 都是静态的，同时它们的 key 相同（代表同一节点），并且新的 VNode 是 clone 或者是标记了 once（标记 v-once 属性，只渲染一次），那么只需要替换 elm 以及 componentInstance 即可。
  - 新老节点均有 children 子节点，则对子节点进行 diff 操作，调用 updateChildren，这个 updateChildren 也是 diff 的核心。
  - 如果老节点没有子节点而新节点存在子节点，先清空老节点 DOM 的文本内容，然后为当前 DOM 节点加入子节点。
  - 当新节点没有子节点而老节点有子节点的时候，则移除该 DOM 节点的所有子节点。
  - 当新老节点都无子节点的时候，只是文本的替换。
- updateChildren

## Computed 和 Watch 的区别

- computed
  - 支持缓存，只有依赖的数据发生改变时，才会重新计算；
  - 不支持异步，内部有异步代码时无效；
  - 当需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。
- watch
  - 不支持缓存，参数有变化就会触发计算；
  - 支持异步；
  - 当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch, 使用 watch 选项允许执行异步操作 ( 访问一个 API ), 限制执行该操作的频率，并在得到最终结果前，设置中间状态 这些都是计算属性无法做到的。

## slot 是什么，作用，原理

slot 又名插槽，是 Vue 的内容分发机制，组件内部的模板引擎使用 slot 元素作为承载分发内容的出口。插槽 slot 是子组件的一个模板标签元素，而这一个标签元素是否显示，以及怎么显示是由父组件决定的。

slot 又分三类，默认插槽，具名插槽和作用域插槽。

- 默认插槽：又名匿名查抄，当 slot 没有指定 name 属性值的时候一个默认显示插槽，一个组件内只有有一个匿名插槽。
- 具名插槽：带有具体名字的插槽，也就是带有 name 属性的 slot, 一个组件可以出现多个具名插槽。
- 作用域插槽：默认插槽 具名插槽的一个变体，可以是匿名插槽，也可以是具名插槽，该插槽的不同点是在子组件渲染作用域插槽时，可以将子组件内部的数据传递给父组件，让父组件根据子组件的传递过来的数据决定如何渲染该插槽。

实现原理：当子组件 vm 实例化时，获取到父组件传入的 slot 标签的内容，存放在 `vm.$slot` 中，默认插槽为 `vm.$slot.default`, 具名插槽为 `vm.$slot.xxx`，xxx 为插槽名，当组件执行渲染函数时候，遇到 slot 标签，使用 `$slot` 中的内容进行替换，此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

## 过滤器的作用，如何实现

过滤器是用来过滤数据的，在 Vue 中使用 filters 来过滤数据，filters 不会修改数据，而是过滤数据，改变用户看到的输出（计算属性 computed , 方法 methods 都是通过修改数据来处理数据格式的输出显示）。

## 单向数据流

是什么：数据只能由父组件流向子组件，子组件通过事件来通知父组件更新自有的数据。

为什么？

组件相当于一个函数，props 相当于函数的传参。如果组件内部可以改变 props 就相当于在函数内部改变参数。那么这个函数就产生了副作用，那么这个函数就不是一个 pure function。这会使函数变的不可测试，不可测试也就不能预测执行结果，从而降低代码可维护性。

## v-model 原理

其实是一个语法糖，v-bind 传参，v-on 监听子组件触发的事件。v-model 在不同的 HTML 标签上使用会抛出不同的事件：

- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

## v-for 加 key 的作用

唯一标记，diff 操作可以更准确、更快速。

## keep-alive 原理

todo

## Proxy 与 Object.defineProperty 对比

Proxy 的优势如下：

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法，不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的，而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

Object.defineProperty 的优势：兼容性好，支持 IE9。

## vue.$set 原理

如果目标是数组，直接使用数组的 splice 方法触发相应式；

如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 defineReactive 方法进行响应式处理。

## Vue 性能优化

- 不需要响应式的对象一开始不要写在 data 里；
- v-if 和 v-show 区分使用场景；
- computed 和 watch  区分使用场景；
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if；
- 事件的销毁；
- 路由懒加载；
- 第三方插件的按需引入；
