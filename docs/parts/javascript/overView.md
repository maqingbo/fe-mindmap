---
title: '概览'
---

JavaScript 的语言规范是由 ECMA 委员会制定的，所以又称为 ECMAscript。

我们平时说的 JavaScript，一般指运行环境为浏览器的 JavaScript，除此之外，Nodejs 也是常见的一个运行环境。

在不同的环境里，人们赋予这门语言不同的能力（API），做不同的事情。

## 浏览器端 JS

《JavaScript 高级程序设计》第四版将浏览器端 JavaScript 概括为 ECMAscript + DOM + BOM，而 MDN 网站现已将 JavaScript 概括为 ECMAScript + Web API，其中 DOM 属于 Web API 中的一员，而 BOM 则被打散在了 Web API 中。

> 但是，如果从浏览器的范畴去理解“JavaScript”这个术语，它包含了截然不同的两个方面。一方面是 JavaScript 的核心语言（ECMAScript），另一方面是大量的 Web API 们，包括 DOM（文档对象模型）。 —— [JavaScript 技术概览 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)

![](../../images/overView/01.png)

## Nodejs

与浏览器端 JS 的相同之处：都使用 ECMAScript 作为基本语法；

不同之处：在 Nodejs 环境下，客户端 JS 中的那些 Web API 是无法使用的，但是 nodejs 中定义了自己特有的 API，例如 http、fs、Stream、os 等。

![](../../images/overView/02.png)
