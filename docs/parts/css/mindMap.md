---
title: '概览'
---

此部分主要参考 [这篇文章](https://juejin.cn/post/6844903625353854989)。

W3C 要求每个规范都要经过以下五个阶段：

1. 工作草案（WD，Working Draft）
2. 最终工作草案（LC/LCWD，Last Call Working Draft）
3. 候选推荐（CR，Candidate Recommendation）
4. 提议推荐（PR，Proposed Recommendation）
5. 推荐标准（REC，Recommendation）

按照 CSS 工作组的说法，CSS 历史上并没有版本的概念，有的只是“级别”（level）的概念。

CSS 规范，最开始是 CSS level 1，后来迭代到 CSS level 2。但是在更新 2 的时候 W3C 还没有规定上面的五个流程，就导致 level 2 Bug 很多，于是迭代了一版 2.1，其中 CSS 工作组将不够成熟的部分规范回退到流程 CR 阶段，其余的规范保持在 REC 阶段。

随着 CSS 特性越来越多，越来越复杂，CSS 规范的篇幅也越来越长。这就给勘误和进一步升级带来了极大不便。因为文档不同部分升级的进度不可能强求一致。于是，CSS 工作组决定从 CSS 2.1 之后开始采取模块化的路线。就是把需要升级的内容独立成模块拆分出来，模块单独命名级别，单独升级。

CSS 采取模块化路线后，就有了三种模块，而且它们的命名方式非常值得注意。

- CSS Level 2 原有模块：比如 Selector、Color 等这些都是从原来 CSS 规范中拆出来的模块。这些模块的命名一开始就会从 Level 3 开始，因为它们都是在 CSS Level 2 的基础之上开始的。
- 新模块：以前 CSS 中不存在类似特性的都将作为新增的模块出现，因此它们的命名会从 Level 1 开始。
- 当然，还有 CSS2.1 从 CSS2 中删除的内容。如前所述，“被 CSS2.1 删除的 CSS2 中的内容，被视为回退到 CR 阶段”，而其中大部分内容都会以 CSS Level 3 的面目“转世”，一旦它们进入 CR 阶段，就会取代之前对应的内容成为新标准。


根据刚刚的网址整理的脑图（截止到 2021年9月8日）：

TODO

## 参考

- [w3.org - CSS/current-work](https://www.w3.org/Style/CSS/current-work)
- [w3.org - CSS snapshot](https://www.w3.org/TR/css-2017/)
- [MDN - CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

