---
title: '页面加载和渲染过程'
---

类似问题：

- 从输入 URL 到页面加载完成的过程

## 架构模式

`b/s`架构和`c/s`架构。

`c/s`架构，即`客户端/服务端`架构：

*   c = client = 客户端，指的是 PC 端的需要安装的软件，比如 QQ
*   s = server = 服务器端
*   开发比较容易 (vb\vf\vc\delphi 等等），操作简便，但应用程序的升级和客户端程序的维护较为困难

`b/s`架构，即`浏览器/服务端`架构：

*   b = browser = 浏览器端，指的是在浏览器里运行的应用
*   s = server = 服务器端
*   有浏览器就能运行，不需要安装
*   网页被认为是跨平台的

总结：公司都是盈利组织，肯定是趋利避害的，`b/s`架构远远比`c/s`架构轻量，这体现在开发、使用、成本，一般我们管`b/s`架构的软件称为“瘦应用”。

## 参考

- [浏览器的工作原理：现代网络浏览器幕后揭秘 - HTML5 Rocks](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- [问我 Chrome 浏览器的渲染原理（6000 字长文）](https://zhuanlan.zhihu.com/p/336765062)