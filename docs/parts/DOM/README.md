---
title: 'DOM'
---

## DOM Core 与 HTML-DOM

1. DOM

DOM（文档对象模型）是由 W3C 制定的一套访问和操作 XML（eXtensible Markup Language）文档的标准，即 API。比如 DOM 告诉 JavaScript 引擎如何在浏览器窗口中显示和操作 XML 创建的标记（Tag）。

DOM 与特定的平台、浏览器、语言无关，很多种语言都实现了 DOM，比如因为 JavaScript 和 PHP 都实现了 DOM，所以 JavaScript 中有 getElementsByTagName() 方法，PHP 中也有 getElementsByTagName()，getElementsByTagName() 方法是 DOM 规定的访问 XML 文档的接口。

由于 HTML 与 XML 的相似性及差异，JavaScript 不仅实现了标准的 DOM 方法和属性（即由 W3C 制定的），而且还实现了 HTML 特有的 DOM 方法和属性，前者称为 DOM Core，并不专属于 JavaScript，后者称为 HTML-DOM。

> 不管是 DOM Core 还是 HTML-DOM，我们在使用 JavaScript 的时候要注意浏览器之间的兼容性，因为不同的浏览器对这两类方法和属性的支持可能不一样。

```
// 常见的 DOM Core 属性：
node.childNodes
node.firstChild
node.lastChild
node.nextSibling
node.previousSibling
node.parentNode

// 常见的 DOM Core 方法：
createElement()   // 创建节点
createTextNode()  // 创建节点

cloneNode()  // 复制节点

appendChild()  // 插入节点
insertBefore() // 插入节点

removeChild()  // 删除节点

replaceChild()  // 替换节点

setAttribute()  // 查找和设置节点属性
getAttribute()  // 查找和设置节点属性

getElementById() // 查找节点
getElementsByTagName() // 查找节点
hasChildNode() // 查找节点
```
