---
title: 'DOM'
---

## 定义

DOM 全称（文档对象模型，Document Object Model），它只是一种模型，DOM 规范是对这种模型的描述。是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化的**表述**，并定义了一种方式可以使用 JS 对该结构进行访问，从而改变文档的结构，样式和内容。

:::tip 注意
DOM 是 API，是一组无关编程语言的接口（Interfaces）而非实现（Implementation），DOM 规范只是对接口进行了描述。前端平时常说的 DOM 其实只是浏览器通过 ECMAScript（JavaScript）对 DOM 接口的一种实现。
:::

DOM 模型用一个树结构来表示一个文档，树的每个分支的终点都是一个节点 (node)，每个节点都是包含属性和方法的对象 (objects)。DOM 的方法 (methods) 让你可以用特定方式操作这个树，用这些方法你可以改变文档的结构、样式或者内容。节点可以关联上事件处理器，一旦某一事件被触发了，那些事件处理器就会被执行。

DOM 曾经使用 Level 来命名，一直到 Level 3，标准文件维护在 [w3c 网站](https://www.w3.org/TR/?title=dom)。Level 4 时修改为 [DOM Stand](https://dom.spec.whatwg.org/)，维护在 WHATWG 网站。

## DOM 节点

### 节点层级（hierarchy）

下面这个列表可以用来表示不同类型节点间的层级关系：

- EventTarget
  - Node（基础节点类型）
    - Document（DOM Tree 的根节点）
      - HTMLDocument（对 Document 进行了拓展）
    - DocumentType（文档类型节点）
    - Attr（属性节点）
    - CharacterData
      - Text
      - Comment
      - CDATASection
    - DocumentFragment
    - Element
      - SVGElement
      - HTMLElement
        - HTMLInputElement
        - HTMLBodyElement
        - ...（太多了，不一一列举）

详细说明几个重要的节点类型：

- **EventTarget**：作为基础的抽象类（构造函数），所有的节点都继承自它，以便所有的节点都支持“事件”。事件的方法绑定在 EventTarget 的 prototype 对象上。
- **Node 类型**：DOM Level 1 定义的最基本的节点类型，拥有一些所有节点共有的属性和方法，继承自 EventTarget。
- **Document 类型**：浏览器中网页的根节点，也是 DOM Tree 的根节点，将文档中的其他元素都包含在内。提供了一些文档层面的通用属性与方法。
  - 与`document`对象的关系，继承关系，`document > HTMLDocument > Document > Node`。`document`对象实际上是`HTMLDocument()`构造函数的一个实例，每个文档只有一个。
- **Attr**：DOM 4 中的 Attr 类型将不再继承 Node 类型，有可能废弃，不建议使用。
- **CharacterData**：一个抽象接口，没有这个类型的对象。继承关系：`Text/Comment/CDATASection > CharacterData > Node`
- **DocumentFragment**：文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的 Document 对象使用。不存在与 DOM Tree 中，不会触发 reflow。

我们可以尝试在 Chrome 的控制台打印一个 ul 节点，由此可以来看一下 Chrome 是如何处理节点间的继承关系的。

```yaml
// 一个 ul 节点在浏览器控制台输出的内容（简化版）
nodeName: "UL",
nodeType: 1,
nodeValue: null,
...
[[prototype]]: HTMLUListElement
  constructor: HTMLUListElement()
  ...
  [[Prototype]]: HTMLElement
    constructor: HTMLElement()
    blur: blur()
    click: click()
    focus: focus()
    innerText: ""
    ...
    # HTMLElement 构造函数的原型对象上挂载了很多 HTML 元素自有的属性和方法
    # 结合上图可知，这些属性和方法在 SVG 中是不可用的
    [[Prototype]]: Element
      constructor: Element()
      getElementsByClassName: getElementsByClassName()
      getElementsByTagName: getElementsByTagName()
      querySelector: querySelector()
      querySelectorAll: querySelectorAll()
      ...
      # Element 构造函数的原型对象上也挂载了很多共有的属性和方法，且在 SVG 中也是可用的
      [[Prototype]]: Node
        constructor: Node()
        nodeName: "UL"
        nodeType: 1
        appendChild: appendChild()
        ...
        # Node 类型是最基本的类型，有一些 DOM 节点最基本的共有属性和方法
        [[Prototype]]: EventTarget
          constructor: EventTarget()
          addEventListener: addEventListener()
          dispatchEvent: dispatchEvent()
          removeEventListener: removeEventListener()
          # EventTarget 对象用来处理事件，只挂载了这三个方法
          [[Prototype]]: Object
            constructor: Object()
            hasOwnProperty: hasOwnProperty()
            isPrototypeOf: isPrototypeOf()
            ...
```

### 节点关系

## DOM 方法

## DOM Core 与 HTML-DOM

DOM（文档对象模型）是由 W3C 制定的一套访问和操作 XML（eXtensible Markup Language）文档的标准，即 API。比如 DOM 告诉 JavaScript 引擎如何在浏览器窗口中显示和操作 XML 创建的标记（Tag）。

DOM 与特定的平台、浏览器、语言无关，很多种语言都实现了 DOM，比如因为 JavaScript 和 PHP 都实现了 DOM，所以 JavaScript 中有 getElementsByTagName() 方法，PHP 中也有 getElementsByTagName()，getElementsByTagName() 方法是 DOM 规定的访问 XML 文档的接口。

由于 HTML 与 XML 的相似性及差异，JavaScript 不仅实现了标准的 DOM 方法和属性（即由 W3C 制定的），而且还实现了 HTML 特有的 DOM 方法和属性，前者称为 DOM Core，并不专属于 JavaScript，后者称为 HTML-DOM。

> 不管是 DOM Core 还是 HTML-DOM，我们在使用 JavaScript 的时候要注意浏览器之间的兼容性，因为不同的浏览器对这两类方法和属性的支持可能不一样。

```js
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
