## Vue 实例化对象过程

- 初始化

```yaml
_init() {
  vm.$options = mergeOptions()
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm)
  initState(vm)
    initProps
    initMethods
    initData()
      observe()
        Observer()
          this.dep = new Dep()
    initComputed()
    initWatch()
  initProvide(vm)
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

- initState 阶段，新建一个 dep 实例存放依赖；
- 遍历 data 里面的对象，使用 Object.defineProperty 修改对象属性的 get、set 特性。get 的时候使用 dep.depend 方法收集属性对应的依赖 (watch)，set 的时候使用 dep.notify 触发依赖。
- 之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而使关联的组件得以更新；
- watcher 是组件级别的，组件内部的更新需要使用 virtual DOM 的 diff 算法进行局部更新；

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
