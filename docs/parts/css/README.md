---
title: '收集箱'
---

### 选择器优先级

下面列表中，选择器类型的优先级是**递增**的：

- 标签选择器（例如，h1）和伪元素（例如，::before）
- 类选择器 （例如，.example），属性选择器（例如，[type="radio"]）和伪类（例如，:hover）
- ID 选择器（例如，#example）
- 行内样式
- `!important`关键字

通配选择符（\*）关系选择符（+, >, ~, ' ', ||）和 否定伪类（:not()）对优先级没有影响。（但是，在 :not() 内部声明的选择器会影响优先级）。

### a 标签属性顺序

- `link` 用户未访问的 a 标签，而且鼠标没有悬停在其上
- `visited` 已被访问过的 a 标签
- `hover` 鼠标悬停在其上的 a 标签
- `active` 用户正在点击的 a 标签

### rgba 和 opacity 透明效果的区别

opacity 作用于元素，以及元素内的所有内容的透明度，而 rgba 只作用于元素的颜色或其背景色。

### BFC、IFC、GFC、FFC

**BFC（Block formatting contexts）：块级格式上下文**

一个独立的渲染区域，只有块级元素参与， 内部的 Box 会在垂直方向依次放置，并且这个区域与外部毫不相干，margin 不会重叠。

```
// 如何生成：
- 根元素
- float 属性不为 none
- position 为 absolute 或 fixed
- display 为 inline-block, table-cell, table-caption, flex, inline-flex
- overflow 不为 visible
```

**IFC（Inline formatting contexts）：内联格式上下文**

**GFC（GrideLayout formatting contexts）：网格布局格式化上下文**

**FFC（Flex formatting contexts）: 自适应格式上下文**

### CSS 渲染原理

[CSS 渲染原理以及优化策略](https://segmentfault.com/a/1190000021073560)





