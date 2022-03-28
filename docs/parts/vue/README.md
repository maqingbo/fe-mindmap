## Vue 解决了什么问题？如何解决的

- router 实现原理
- 响应式原理
- Virtual DOM 实现原理
- 源码分析

## vue 3 特征

**组合式 API**

解决了哪些问题：

- 大型组件难以阅读和维护
- 跨组件的代码重用不太友好
- TS 支持不够好

---

初级：

- 知道 react 常见优化方案，脱口而出常用生命周期，知道他们是干什么的。
- 知道 react 大致实现思路，能对比 react 和 js 控制原生 dom 的差异，能口喷一个简化版的 react。
- 知道 diff 算法大致实现思路。
- 对 state 和 props 有自己的使用心得，结合受控组件、hoc 等特性描述，需要说明各种方案的适用场景。
- 以上几点 react 替换为 vue 或 angular 同样适用。

中级：

- 能说明白为什么要实现 fiber，以及可能带来的坑。
- 能说明白为什么要实现 hook。
- 能说明白为什么要用 immutable，以及用或者不用的考虑。
- 知道 react 不常用的特性，比如 context，portal。
- 能用自己的理解说明白 react like 框架的本质，能说明白如何让这些框架共存。

---

初级：

- 知道 react-router，redux，redux-thunk，react-redux，immutable，antd 或同级别社区组件库。
- 知道 vue 和 angular 对应全家桶分别有哪些。
- 知道浏览器 react 相关插件有什么，怎么用。
- 知道 react-router v3/v4 的差异。
- 知道 antd 组件化设计思路。
- 知道 thunk 干嘛用的，怎么实现的。

中级：

- 看过全家桶源码，不要求每行都看，但是知道核心实现原理和底层依赖。能口喷几行关键代码把对应类库实现即达标。
- 能从数据驱动角度透彻的说明白 redux，能够口喷原生 js 和 redux 结合要怎么做。
- 能结合 redux，vuex，mobx 等数据流谈谈自己对 vue 和 react 的异同。

---

- MVVM，说说与 MVC 有什么区别
- 首屏加载性能优化