
## meta 标签

meta 元素表示那些不能由其它 HTML 元素表示的任何元数据信息，它可以告诉浏览器如何解析页面。

meta 元素定义的元数据的类型包括以下几种：

- charset 属性：字符集声明，告诉文档使用哪种字符编码。
- name 属性：文档级别（document-level）的元数据，应用于整个页面。
- http-equiv 属性：编译指令，提供的信息与类似命名的 HTTP 头部相同。
- itemprop 属性：提供用户定义的元数据。

## 语义化

- 即使没有样式，页面也能呈现很清晰的结构
- 代码可读性更高；
- 让页面的内容结构化，便于对浏览器、搜索引擎解析，有利于 SEO；

## h5 新特性
1. 新增语义化标签：nav、header、footer、aside、section、article
1. 音频、视频标签：audio、video
1. 数据存储：localStorage、sessionStorage
1. canvas（画布）、Geolocation（地理定位）、websocket（通信协议）
1. input 标签新增属性：placeholder、autocomplete、autofocus、required
1. history API：go、forward、back、pushstate

## iframe 优缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

优点：

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

缺点：

- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎识别
- 会产生很多页面，不容易管理

## Canvas、SVG 区别

DOM 方面的继承问题：

- Element
  - SVGElement
  - HTMLElement
    - HTMLCanvasElement

区别：

- Canvas 基于像素，提供 2D 绘制函数，是一种 HTML 元素类型，依赖于 HTML，只能通过脚本绘制图形；
- SVG 为矢量，自己提供一系列图形元素（标签），还有完整的动画，事件机制，就能独立使用，也可以嵌入到 HTML 中。


## 统计页面标签种类及数量

Q：统计页面一共使用了多少种标签以及各标签的数量。

A：

```js
const allTags = Array.from(document.querySelectorAll('*')).map(tag => tag.tagName)
const types = new Set(allTags).size

const obj = {}
for( let tag of allTags) {
  if (!obj[tag]) {
    obj[tag] = 1
  } else {
    obj[tag]++
  }
}

console.log(types)
console.log(obj)
```