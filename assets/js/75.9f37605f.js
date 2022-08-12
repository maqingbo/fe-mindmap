(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{485:function(t,e,a){"use strict";a.r(e);var s=a(46),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("《深入浅出 Vue.js —— 刘博文》")]),t._v(" "),a("h2",{attrs:{id:"结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#结构"}},[t._v("#")]),t._v(" 结构")]),t._v(" "),a("p",[t._v("第一部分：共 3 章，详细讲解了 Vue.js 内部核心技术“变化侦测”，并一步一步带领大家从 0 到 1 实现一个简单的“变化侦测”系统。\n第二部分：共 3 章，详细介绍了虚拟 DOM 技术，其中包括虚拟 DOM 的原理及其 patching 算法。\n第三部分：共 4 章，详细介绍了模板编译技术，其中包括模板解析器的实现原理、优化器的原理以及代码生成器的原理。\n第四部分：详细介绍了 Vue.js 的整体架构以及提供给我们使用的各种 API 的内部原理。同时还对 Vue.js 的生命周期、错误处理、指令系统与模板过滤器等功能的原理进行了介绍。")]),t._v(" "),a("h2",{attrs:{id:"第一部分"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一部分"}},[t._v("#")]),t._v(" 第一部分")]),t._v(" "),a("p",[t._v("变化侦测分为两种类型：一种是“推”（push），另一种是“拉”（pull）。")]),t._v(" "),a("p",[t._v("Angular 和 React 中的变化侦测都属于“拉”，这就是说当状态发生变化时，它不知道哪个状态变了，只知道状态有可能变了，然后会发送一个信号告诉框架，框架内部收到信号后，会进行一个暴力比对来找出哪些 DOM 节点需要重新渲染。这在 Angular 中是脏检查的流程，在 React 中使用的是虚拟 DOM。")]),t._v(" "),a("p",[t._v("而 Vue.js 的变化侦测属于“推”。当状态发生变化时，Vue.js 立刻就知道了，并且知道去更新哪些依赖。")]),t._v(" "),a("p",[t._v("但是这样做其实也有一定的代价。因为粒度太细，每一个绑定都会有一个对应的 watcher 来观察状态的变化，这样就会有一些内存开销以及一些依赖追踪的开销。当状态被越多的节点使用时，开销就越大。对于一个大型项目来说，这个开销是非常大的。")]),t._v(" "),a("p",[t._v("因此，Vue.js 2.0 开始选择了一个中等粒度的解决方案，那就是引入了虚拟 DOM。组件级别是一个 watcher 实例，就是说即便一个组件内有 10 个节点使用了某个状态，但其实也只有一个 watcher 在观察这个状态的变化。所以当这个状态发生变化时，只能通知到组件，然后组件内部通过虚拟 DOM 去进行比对与渲染。这是一个比较折中的方案。")])])}),[],!1,null,null,null);e.default=r.exports}}]);