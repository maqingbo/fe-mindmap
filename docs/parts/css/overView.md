---
title: '概览'
---

W3C 要求每个规范都要经过以下五个阶段：

1. 工作草案（WD，Working Draft）
2. 最终工作草案（LC/LCWD，Last Call Working Draft）
3. 候选推荐（CR，Candidate Recommendation）
4. 提议推荐（PR，Proposed Recommendation）
5. 推荐标准（REC，Recommendation）

按照 CSS 工作组的说法，CSS 历史上并没有版本的概念，有的只是“级别”（[level](https://www.w3.org/TR/CSS/#css-levels)）的概念。

CSS 规范，最开始是 CSS level 1，后来迭代到 CSS level 2。但是在更新 CSS2 的时候 W3C 还没有规定上面的五个流程，就导致 CSS2 Bug 很多，后期进行了很多勘误，特别乱，于是工作组迭代了一版 CSS 2.1 修订版（CSS Level 2 Revision 1），主要做了以下工作：

- 保持 CSS2 中那些已经被广泛接受和实现的部分的兼容性
- 结合所有已经发布的 CSS2 勘误
- 对于与 CSS2 规范差异很大的实现，修改规范以适应已经被普遍接受的做法
- 移除 CSS2 中那些因为没有被实现而被 CSS 社区拒绝的特性，CSS 2.1 旨在反映那些在 HTML 和 XML 语言中被广泛实现的合理特性（不单单是对 XML 语言，或者 HTML）
- 移除 CSS2 中将被 CSS3 废弃的特性，因此鼓励采用 CSS3 中提出的特性
- 当实现经验表明 CSS2 需要实现（新特性）时，添加少量的新属性值

后来，随着 CSS 特性越来越多，越来越复杂，CSS 规范的篇幅也越来越长。这就给勘误和进一步升级带来了极大不便。因为文档不同部分升级的进度不可能强求一致。于是，CSS 工作组决定从 CSS 2.1 之后开始采取模块化的路线。就是把需要升级的内容独立成模块拆分出来，单独勘误和升级。

CSS 采取模块化路线后，就有了三种模块，而且它们的命名方式非常值得注意。

- CSS Level 2 原有模块：比如 Selector、Color 等这些都是从原来 CSS 规范中拆出来的模块。这些模块的命名一开始就会从 Level 3 开始，因为它们都是在 CSS Level 2 的基础之上开始的。
- 新模块：CSS Level 2 中不存在类似特性的都将作为新增的模块出现，因此它们的命名会从 Level 1 开始。
- 当然，还有在制定 CSS 2.1 时从 CSS2 中删除的内容。而其中大部分内容都会在 CSS Level 3 中重新制定，一旦它们进入 CR 阶段，就会取代之前对应的内容成为新标准。

所以目前看来，CSS 2.1 是 CSS 最后更新的大版本，里面定义了那些已经被广泛接受和实现的规范，以及一些核心概念和模块，所以我们的梳理从 CSS 2.1 开始！

CSS 2.1 主要定义了以下内容：

- 语法和基本数据类型 (Syntax and basic data types)
- 选择器 (Selectors)
- 分配属性值、级联和继承 (Assigning property values, Cascading, and Inheritance)
- 媒体类型 (Media types)
- 盒模型 (Box model)
- 视觉格式化模型 (Visual formatting model)
- 视觉格式化模型细节 (Visual formatting model details)
- 视觉效果 (Visual effects)
- 生成内容、自动编号和列表 (Generated content, automatic numbering, and lists)
- 分页媒体 (Paged media)
- 颜色和背景 (Colors and Backgrounds)
- 字体 (Fonts)
- 文字 (Text)
- 表格 (Tables)
- 用户界面 (User interface)


CSS Level 3 包含的内容...太多了，以后在更新吧。

## 参考

- [w3.org - CSS/current-work](https://www.w3.org/Style/CSS/current-work)
- [w3.org - CSS snapshot](https://www.w3.org/TR/css-2017/)
- [MDN - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [掘金 - 众成翻译](https://juejin.cn/post/6844903625353854989)
- [w3.org - 中文](http://www.ayqy.net/doc/css2-1/cover.html)
