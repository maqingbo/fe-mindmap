---
title: '收集箱'
---

## JS 原生拖拽节点

给需要拖拽的节点绑定 mousedown ，mousemove ，mouseup 事件。
mousedown 事件触发后，开始拖拽。
mousemove 时，需要通过 event.clientX 和 clientY 获取拖拽位置，并实时更新位置。
mouseup 时，拖拽结束。
需要注意浏览器边界值，设置拖拽范围。

## ES6/ES7 和 AJA

1. ES6/ES7 核心知识
2. AJAX/HTTP 前后端交互

JS 是一种多范式的动态语言，它包含类型、运算符、标准内置（ built-in）对象和方法。通过原型链而不是类来支持面向对象编程。

> 什么是多范式？
> 
> 编程范式 (Programming paradigm) 其实就是计算机编程所使用的方法，是设计程序结构所采用的设计风格。目前主流的编程范式有：命令式编程 (Imperative programming)、函数式编程 (Functional programming)、面向对象编程 (Object-oriented programming) 等。 [Thinking80s - 知乎](https://www.zhihu.com/question/20428688/answer/26660295) 

## 垃圾回收机制

- [深入理解 Chrome V8 垃圾回收机制](https://github.com/yacan8/blog/issues/33)
- [[译] JavaScript 工作原理：内存管理 + 处理常见的 4 种内存泄漏](https://juejin.cn/post/6844903519078580238)

## SDK 和 API

- **SDK**：软件开发工具包，全称 Software Development Kit。辅助开发某一类软件的相关文档、范例和工具的集合都可以叫做 SDK。
- **API**：程序编程接口，全称 Application Programming Interface。本质是预先定义的函数，用来让其他程序调用自身的一些功能。

类比：

- 有一杯密封饮料，饮料就叫 **SDK**；
- 饮料上插着吸管，吸管就叫 **API**；
- 如果你想喝到饮料，你必须通过这根吸管来实现，
- 想让系统拥有 SDK 中的功能，通过 API 连接你的系统和 SDK。

## JS-SDK

- [如何打造一款标准的 JS-SDK](https://zhuanlan.zhihu.com/p/276080506)