---
title: '关键概念'
---

## 语言语法和形式

CSS 的基本目标是让浏览器以指定的特性去绘制页面元素，比如颜色，定位，装饰。CSS 的语法由下面两个部分构建：

- 属性 (property) 是一个标识符，用可读的名称来表示其特性。
- 值 (value) 则描述了浏览器引擎如何处理该特性。每个属性都包含一个有效值的集合，它有正式的语法和语义定义，被浏览器引擎实现。 

**声明 (declaration)**

```css
/* 冒号左侧是属性，右侧是值。 */
color: red;
```

**声明块 (declaration block)**

```css
/* 声明块 (declaration block) */
{
  color: red;
  text-align: center;
}
```

**规则 (ruleset)**

```css
/* 一对选择器 (selector) 与声明块称为规则集 (ruleset)，常简称为规则 (rule) */
div p {
  color: red;
  text-align: center;
}
```
一个元素可能被多个选择器选中，因此会有多个规则，有可能以不同的值去设置同一属性。CSS 标准会规定哪个优先级最高并生效，称之为 **级联 (cascade)** 算法，下一节会详细讲。

**语句 (statement)**

有时候网页的作者也希望在样式表中包括其他的一些信息，比如字符集，导入其它的外部样式表，字体等，这些需要专门的语句表示。

语句以非空格的字符开头，以第一个反花括号或分号结束。

```css
@charset "UTF-8";
@import 'font.css';
@keyframes {
  ...
}
```

所以语句有以下两种类型：

- 规则 (rule)。如上，将一组 CSS 声明与用选择器定义的条件相关联。
- at 规则 (at-rules)。以@ (U+0040 COMMERCIAL AT) 开始，随后是标识符，一直到以分号或右大括号结束。每个 at 规则由其标识符定义，可能有它自己的语法。at 规则涵盖了 meta 信息（比如 @charset  @import），条件信息（比如@media  @document）, 描述信息（比如@font-face）。

![](../../images/css/04.png)

更多 At-Rules 信息请参考：[At-Rules](./atRules)

## 级联、继承

### 级联 (cascade)

> 有的时候也将 cascade 翻译为`层叠`，这里为了和`层叠上下文`区分开，采用`级联`这个词。
> 
> 级联既可以做名词也可以做动词，请注意区分！

CSS 样式表可能有三个不同的来源：用户代理（浏览器）、作者（网站开发者）、用户（网站使用者）。这三个不同来源的 CSS 规则难免会有重叠冲突的地方，CCS 规范定义了一套规则来解决这种冲突，决定最后采用哪个源的样式，这套规则就叫做**级联 (cascade)**。级联为每个样式规则分配一个权重。当多项规则产生冲突时，权重最大的规则优先。

**级联顺序**

级联算法使用如下方式找出要应用到每个文档元素的每个属性上的值。

1. 首先过滤来自不同来源的全部规则，并保留要应用到指定元素上的那些规则。（把用不到的规则筛出去）
2. 根据重要性（普通或重要，所谓重要就是加了 !important 关键字）和来源（浏览器、作者、用户）排序。以下条件权重**依次递减**。
   1. 浏览器的重要声明
   2. 用户的重要声明
   3. 开发人员的重要声明
   4. 开发人员的普通声明
   5. 用户的普通声明
   6. 浏览器的普通声明
3. 如果按照上面的规则排序之后权重相等，则使用哪个值取决于`选择器优先级`。
4.  如果选择器的优先级也相等，那么就采用后声明的那个值。

**选择器优先级**

下面列表中，展示了选择器优先级的计算规则，选择器类型的优先级**依次递减**：

- `!important`关键字
- 内联样式
- ID 选择器（例如，`#example`）
- 类、伪类、属性（例如：`:hover`、`[type="radio"]`）
- 元素和伪元素（例如，`::before`）

通配选择符（`*`）关系选择符（`+`, `>`, `~`, `' '`, `||`）和 否定伪类 `:not()` 对优先级没有影响。（但是，在 `:not()` 内部声明的选择器会影响优先级）。

:::warning 
- 当在一个样式声明中使用一个 !important 规则时，此声明将覆盖任何其他声明。
- 当两条相互冲突的带有 !important 规则的声明被应用到相同的元素上时，拥有更大优先级的声明将会被采用。
- 不建议使用 !important，因为这破坏了固有的优先级规则，使得调试变得更加困难。
:::

### 继承 (Inheritance)

**属性值的确定**

当浏览器解析文档构成文档树的时候，必须给每个元素的每个属性分配一个值，这个值的最终结果是通过以下四步计算出来的：

1. 浏览器根据以下机制为每个属性分配一个指定值 (specified value)；
   1. 如果使用级联算法筛出来一个值，那它就是指定值；
   2. 否则，查看属性是否可继承，如果可继承且不是根元素，那就继承父元素的计算值；
   3. 如果属性不可继承，或者为根元素，那就使用规范中定义的初始值 (initial value)。[CSS 属性定义](https://www.w3.org/TR/CSS2/about.html#property-defs)
2. 有了指定值之后，解析为用于继承的计算值 (computed value)；
   - 例如：'em' 和 'ex' 等相对单位被计算为像素或绝对长度。
3. 然后在必要时转化为绝对值 (used value)；
   - 例如：某些值只能在布置文档时确定，比方说百分比宽度。
4. 最后根据当地环境的限制转化为实际的值 (actual value)。
   - 例如，某些浏览器只能渲染整数像素宽度的边框，因此必须计算出近似的整数值。

每个属性是否默认继承，以及它的初始值 (initial value) 都是在定义表中定义的。

例如 [height](https://www.w3.org/TR/CSS1/#height) 属性：

```yaml
Value: <length> | auto
Initial: auto # 初始值为 auto
Applies to: block-level and replaced elements
Inherited: no # 默认不继承
Percentage values: N/A
```

**继承**

所谓继承就是当一个默认继承属性 (inherited property) 没有指定值时，则取父元素的同属性的计算值 (computed value)。

注意是**默认继承属性**，非继承属性 (reset property) 没有指定值时，则取属性的初始值 (initial value)。

`inherit` 关键字可用于强制继承，它对继承和非继承属性都生效。对于继承属性，inherit 关键字只是增强了属性的默认行为，只有在重载 (overload) 其它规则的时候被使用。对于非继承属性，inherit 这指定的行为通常没有多大意义，一般使用 initial 或 unset 作为替代。

```css
/* 不可继承 - 涉及布局和盒子大小的不可继承 */
display
文本属性：vertical-align、text-decoration、text-shadow、white-space、unicode-bidi
盒子模型的属性：宽度、高度、内外边距、边框等
背景属性：背景图片、颜色、位置等
定位属性：浮动、清除浮动、定位 position 等
生成内容属性：content、counter-reset、counter-increment
轮廓样式属性：outline-style、outline-width、outline-color、outline
页面样式属性：size、page-break-before、page-break-after

/* 可继承 - 字体、文本 */
字体：font、font-size、font-weight 等（h1-h6 字体大小不能继承）
文本：text-indent、text-align、line-height、color 等（a 标签字体颜色不会继承父元素）
元素可见：visibility
```

## 媒体类型

媒体类型 (media types)

TODO

## 盒模型

当对一个文档进行布局 (layout) 的时候，浏览器的渲染引擎会根据 CSS 基础盒模型 (CSS basic box model)，将所有元素表示为一个个矩形的盒子 (box)。盒模型规则决定了这些盒子的大小、位置以及属性（例如颜色、背景、边框尺寸…）。

每个盒子由四个部分（区域）组成：content、padding、border、margin。

![](../../images/css/05.png)

**盒模型的宽度计算**

盒模型的宽度与`box-sizing`属性有关。

当`box-sizing: content-box`（默认值）时，如果你设置一个元素的宽为 100px，那么这个元素的 content 区域会有 100px 宽。

当`box-sizing: border-box`时，如果你将一个元素的 width 设为 100px，那么这 100px 会包含盒子左右两侧的 border 和 padding，内容区的实际宽度是 `width - (border + padding)` 的值。

大多数情况下，使用`box-sizing: border-box`会使得我们更容易地设定一个元素的宽高。使用下面的代码可将页面内所有元素设置为 border-box：

```css
* {
  box-sizing: border-box;
}
```

## 视觉排版模型

:::tip
关于`format`，虽然`格式化`这个词可能早已深入人心了，但是我自己更倾向于译作`排版`！
:::

前面我们讲了浏览器解析文档树时如何给属性赋值并生成一个个的盒子，视觉排版模型 (visual formatting model) 则规定了这些盒子在各种不同的可视化媒体 (visual media) 上该如何布局。

盒子如何布局只受以下几种因素控制：

- 盒子的尺寸和类型
- 定位方式（常规流、浮动、定位）
- 文档树中元素之间的关系
- 外部信息（比如屏幕大小）

再详细说这几个因素之前，我们先捋顺两个概念：

- **视口 (viewport)**：可以简单理解为浏览器的可视窗口，网页实际渲染的面积可能比视口大，此时需要出现滚动条；
- **包含块 (containing block)**：一个矩形框，关于盒子的位置和大小是相对于这个矩形框的边缘计算的，具体的计算方式比较复杂，需要考虑的情况比较多，有兴趣的可参考 [视觉排版模型细节](./inlineFormatting)。值得注意的是，当我们说“盒子 B 的包含块”的时候，指的是盒子 B 的父元素所生成的、盒子 B 现在呆的这个包含块，而不是盒子 B 生成的那个包含块。

### 盒子的尺寸和类型

`display`属性决定了所生成的盒子的类型，盒子的尺寸如何计算与盒子的类型息息相关。

**块级盒子 (block-level box)**：当 display 属性的值为'block'、'list-item'或'table'时生成块级盒子。每个块级盒子内部还会默认的生成一个主盒子 (principal block-level box)，其用放置内容和子盒子，大多数的元素都只会生成一个主盒子，所以我们可以认为 block-level box === principal block-level box；但是有一些元素，除了生成主盒子之外会再生成一些附加盒子 (additional box)，比方说`li`元素的项目标记部分就属于附加盒子。

**行内盒子 (inline box)**：当 display 属性的值为'inline'、'inline-table'或'inline-block'时生成行内盒子。

### 定位方式

:::tip
这里的**定位**，指的是**确定盒子的位置**，而不是 position 属性；
:::

**常规流 (normal flow)**

常规流包括块级盒子的`块级排版方式`(block formatting) 和行内盒子的`行内排版方式`(inline formatting)，以及`相对定位`(relative positioning)。如果一个元素是浮动的、绝对定位的或者是根元素，那么就称之为脱离常规流 (out of flow)。

常规流中，块级盒子存在于一个块级排版上下文 BFC (block formatting context) 中，行内盒子存在于一个行内排版上下文 IFC (inline formatting context) 中。

> BFC、IFC 其实指的是一个区域，CSS 规范规定了这样的区域如何生成，以及在这样的区域内盒子如何排列。

- BFC 的生成：
  - 太多了，说下常见的：根元素、浮动、绝对定位、固定定位、block、inline-block、flex、table、overflow 不为 visible 的块级元素。..
- BFC 的排列规则：
  - 区域内盒子单独排版，像一个沙箱，内部盒子与外部盒子不产生冲突
  - 内部盒子在它的包含块中从上往下依次排列，同级盒子之间的距离由 margin 属性决定，`相邻同级盒子`之间垂直方向上的 margin 会折叠；
  - 如何解决折叠问题：生成新的 BFC 即可；
- IFC 的生成：
  - display: inline
- IFC 的排列规则：
  - 盒子从包含块的顶部开始一个挨一个水平或垂直排列（取决于 writing-mode 属性，默认水平排列），这些盒之间的水平方向上的 margin，padding 与 writing-mode 的值保持一致；
  - 盒子垂直方向的对齐方式由 vertical-align 属性决定；
  - 包含这一行所有盒子的矩形区域被称作行框 (line box)。
  - 这一块信息还挺复杂的，更多信息请参考 [视觉排版模型细节](./inlineFormatting.md)。

相对定位：当一个盒根据常规流或者浮动摆放好后，它可能会相对于该位置移动，称之为相对定位。相对定位的参照物是这个盒子在常规流中的位置。

**浮动 (float)**

首先按照常规流布置一个盒子，然后从常规流中取出这个盒子，并尽可能地向左或向右移动。

**定位 (position)**

一个盒子被完全从常规流中移除（它对后面的元素没有影响）并分配一个相对于`这个盒子包含块`的位置。

### 层叠上下文

假定用户正面向浏览器或网页，而 HTML 元素沿着其相对于用户的一条虚构的 z 轴排开，HTML 元素按照一定规则在这个 z 轴上依次层叠。满足一定条件的元素可形成**层叠上下文 (stacking context)**，在层叠上下文中，子元素也按照同样的规则进行层叠。 **重要的是，子元素的 z-index 值只在父级中才有意义**。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

- 层叠上下文可以包含在其他层叠上下文中，并且一起创建一个层叠上下文的层级。
- 每个层叠上下文都完全独立于它的兄弟元素：当处理层叠时只考虑子元素。
- 每个层叠上下文都是自包含的：当一个元素的内容发生层叠后，该元素将被作为整体在父级层叠上下文中按顺序进行层叠。

更多信息参考：[层叠上下文](./stackingContext.md)

## 媒体查询

TODO

## 动画

TODO
## 弹性布局

flex 是对 display 属性的拓展。

`display: flex` 会生成一个类似于 BFC 的区域 —— FFC(flex formatting context)，只是里面子盒子的排列规则不同于 BFC，而是使用弹性布局方式。overflow 属性同样适用于 FFC。

区别：

- float、clear 不生效；
- vertical-align 不生效；
- ::first-line、::first-letter 伪元素不适用；

TODO

> [The CSS 2.1 processing model](https://www.w3.org/TR/CSS2/intro.html)

[CSS 渲染原理以及优化策略](https://segmentfault.com/a/1190000021073560)
