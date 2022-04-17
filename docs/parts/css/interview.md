## 布局

### 盒模型

- 标准模式：元素的 width/height = content + border + padding
- 怪异模式：元素的 width/height = content（包含 border 和 padding）

通过 CSS 的 box-sizing 属性切换模式，content-box 就是标准模式，border-box 就是怪异模式。

### BFC

块级排版上下文 (block formatting context)，一个区域，CSS 规范决定了这个规范如何生成。可以参考 [这一节](./keyConcepts.html#%E8%A7%86%E8%A7%89%E6%8E%92%E7%89%88%E6%A8%A1%E5%9E%8B)，从视觉排版模型聊到盒子定位方式，再到块级排版上下文，如何生成、子盒子排列规则。

### float 布局，清除浮动

清除浮动：生成新的块级排版上下文即可。接上题。

### 定位

- **static**：正常文档流，无定位；
- **relative（相对定位）**：正常文档流，相对自身定位；
- **absolute（绝对定位）**：脱离文档流，相对上级有 position 属性且值不为 static 的元素定位，若没有则相对 body 定位；
- **fixed（固定定位）**：脱离文档流，相对于浏览器窗口定位；
- **sticky（粘性定位）**：元素根据正常文档流进行定位，然后相对它的最近滚动祖先元素，基于 top, right, bottom, 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。

**sticky:**

- 动态性：一些时候是 relative 定位（定位基点是自身默认位置），另一些时候自动变成 fixed 定位（定位基点是视口）。
- 必须搭配 top、bottom、left、right 这四个属性一起使用，不能省略，否则等同于 relative 定位，不产生动态效果。
- 当页面滚动，父元素开始脱离视口时（即部分不可见），只要与 sticky 元素的距离达到生效门槛，relative 定位自动切换为 fixed 定位；等到父元素完全脱离视口时（即完全不可见），fixed 定位自动切换回 relative 定位。
- 场景：搜索栏吸顶。

### 水平垂直居中

```css
/* position + margin: auto */
/* 适用于元素：定宽高
当不定宽高时，会铺满整个容器
通常会指定父元素为 relative，相对于父元素进行定位 */

.child {
  /* 核心样式 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

```css
/* absolute + transform */
/* 适用于元素：定宽高、不定宽高 */

.child {
  /* 核心样式 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

```css
/* absolute + 负 margin */
/* 适用于元素：定宽高 */

.child {
  /* 核心样式 */
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

```css
/* flex */

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
/* 父容器 table-cell + 子元素 非 block 的方式 */

.parent {
  /* 核心样式 */
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child {
  /* 核心样式 */
  display: inline-block;

  background-color: yellow;
  width: 100px;
  height: 100px;
}
```

### 水平居中

```css
/* 行内元素 */
/* 父元素使用 text-align */

.parent {
  text-align: center;
}
```

```css
/* 块级元素，定宽 */

div {
  width: 200px;
  margin: 0 auto;
}
```

```css
/* 块级元素，不定宽 */

div {
  display:table;
  margin:0 auto;
}
```

```css
div {
  display:flex;
  justify-content:center;
}
```

### 垂直居中

- 父元素 flex
- 元素本身 position + margin 负值（定高）
- 元素本身 position + transform: translate(0, -50%)
- position + top/bottom：0 + margin：auto
  

### 两列布局

```html
<div class="wrapper">
  <div class="left"></div>
  <div class="right"></div>
</div>
```

```css
/* 1. float */

.wrapper {
  width: 100vw;
  height: 100vh;
}
.left {
  width: 100px;
  float: left;
}
.right {
  padding-left: 100px;
  overflow: hidden;
}
```

```css
/* 2. flex */

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.left {
  flex: 0 0 100px;
}
.right {
  flex: 1;
}
```

```css
/* 3. grid */

.wrapper {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 100px auto;
  /*或者：grid-template-columns: 100px 1fr*/
}
```

### 三列布局

两边等宽，中间自适应。

**圣杯布局**

```html
<div class="container">
  <div class="middle">middle</div> // 放前面会优先加载
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

```css
/* 2. float + position */

.wrapper {
  overflow: hidden;
  padding: 0 100px;
}

.wrapper>div {
  float: left;
  height: 200px;
}

.center {
  width: 100%;
  background-color: #ccc;
}

.left {
  width: 100px;
  margin-left: -100%;
  background-color: pink;
  position: relative;
  left: -100px;
}

.right {
  width: 100px;
  margin-left: -100px;
  position: relative;
  right: -100px;
  background-color: skyblue;
}
```

缺点：中间宽度小于两侧宽度时布局失效，需设置最小宽度；

**双飞翼布局**

与圣杯布局的区别：

- 圣杯布局，为了中间 div 内容不被遮挡，将中间 div 设置了左右 padding-left 和 padding-right 后，将左右两个 div 用相对布局 position: relative 并分别配合 right 和 left 属性，以便左右两栏 div 移动后不遮挡中间 div。
- 双飞翼布局，为了中间 div 内容不被遮挡，直接在中间 div 内部创建子盒子用于放置内容，子盒子里用 margin-left 和 margin-right 为左右两栏 div 留出位置。

```html {3}
<div class="container">
  <div class="middle-container">
    <div class="middle">middle</div>
  </div>
  <div class="left">left</div>
  <div class="right">right</div>
</div>
```

```css {3,16-20,26-27,33-34}
.wrapper {
  overflow: hidden;
  /* padding: 0 300px; */
}

.wrapper>div {
  float: left;
  height: 200px;
}

.center {
  width: 100%;
  background-color: #ccc;
}

.middle {
  height: 200px;
  margin-left: 300px;
  margin-right: 300px;
}

.left {
  width: 300px;
  margin-left: -100%;
  background-color: pink;
  /* position: relative;
  left: -300px; */
}

.right {
  width: 300px;
  margin-left: -300px;
  /* position: relative;
  right: -300px; */
  background-color: skyblue;
}
```

**flex 布局**

```css
.main {
  display: flex;
}
.left,
.right {
  flex: 0 0 200px;
}
.main {
  flex: 1;
}
```

**grid 布局**

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
}
```

## 图文样式

### 隐藏元素

- `display:none`：隐藏元素，会从页面中删除掉，会触发重排和重绘；
- `visibility:hidden`：隐藏元素，会继续在文档流中占位，会触发重绘。隐藏后不能触发点击事件；
- `opacity:0`：透明，会继续在文档流中占位，会触发重绘。由是是作用于元素自身，所以子元素会继承，全部变透明，透明后可以触发点击事件；
- `rgba(0,0,0,0)`：透明，会继续在文档流中占位，会触发重绘。由于只作用于颜色或背景色，所以子元素不会继承。透明后可以触发点击事件；
### line-height 继承问题

### 行内元素之间空白间隙

inline-block 水平呈现的元素间，换行显示或空格分隔的情况下会有间距。

**原因**：回车换行被转成一个空白符，在字体不为 0 的情况下，空白符占据一定宽度。当行内元素 font-size:16px 时，间距为 8px。

**如何去除：**

- 去掉换行符
- 父元素设置`font-size: 0`，子元素单独设置 font-size。
- margin 负值（不推荐）

### 可继承属性、不可继承属性

**可继承属性**

- 所有元素：visibility、cursor
- 列表元素：list-style、list-style-type、list-style-position、list-style-image
- 字体属性：line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、font-size-adjust
- 表格布局属性：caption-side、border-collapse、border-spacing、empty-cells、table-layout
- 文本属性：text-transform、direction
- 其它属性：letter-spacing、word-spacing

**不可继承属性**

- 盒子模型所有属性：margin、padding、border、width、height
- 轮廓及背景属性：outline、background
- 定位、显示、浮动属性：display、position、top、left、right、bottom、max-\*（如 max-height 等）、min-\*、overflow、clear、float、content、z-index、vertical-align
- 文本属性：white-space
- 其它：display

块级元素可以继承，内联元素不能继承属性

text-indent、text-align、text-decoration、text-shadow

### 伪类、伪元素

伪元素：在内容元素的前后插入额外的元素或样式，但是这些元素实际上并不在文档中生成。它们只在外部显示可见，但不会在文档的源代码中找到它们，因此，称为“伪”元素。例如：

```css
p::before { content:"第一章："; }
p::after { content:"Hot!"; }
p::first-line { background:red; }
p::first-letter { font-size:30px; }
```

伪类：将特殊的效果添加到特定选择器上。它是已有元素上添加类别的，不会产生新的元素。例如：

```css
a:hover { color: #FF00FF; }
p:first-child { color: red; }
```

总结： 伪类是通过在元素选择器上加⼊伪类改变元素状态，⽽伪元素通过对元素的操作进⾏对元素的改变。

### 单行/多行省略号

```css
/* 单行，必须指定宽度 */

.box {
  width: 200px;
  overflow: hidden;            // 溢出隐藏
  text-overflow: ellipsis;     // 溢出用省略号显示
  white-space: nowrap;         // 规定段落中的文本不进行换行
}
```

```css
/* 多行，仅 webkit 可用 */

.box {
  width: 200px;
  overflow: hidden;            // 溢出隐藏
  text-overflow: ellipsis;     // 溢出用省略号显示
  display:-webkit-box;         // 作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
  -webkit-line-clamp: 3;        // 显示的行数

}
```

## CSS3

### 为什么有时候⽤ translate 来改变位置⽽不是定位

CSS3 的 translate 使用的 GPU 加速，不会触发回流，而涉及盒子位置的定位会触发回流。

### animation

### requestAnimationframe

## 性能

### 优化方法

**加载：**

- css 压缩，减小体积；
- 样式分开写：`padding: 1px 2px 0 0` > `padding-left: 1px;padding-right: 2px;`
- 减少使用`@import`，建议使用`link`，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

**选择器：**

**渲染：**

**可维护性：**

## 场景应用

### 实现一个三角形

```css
/* 更换最后 3 行代码可修改三角形方向 */

div {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

### 实现一个扇形

```css
/* 三角形 + border-radius */

div{
  width: 0;
  height: 0;
  border: 100px solid transparent;
  border-top-color: red;
  border-radius: 100px;
}
```

### 实现一个自适应的正方形

这里的自适应指的是随视口变化而变化。

```css
/* css3 的 vw */

.square {
  width: 10vw;
  height: 10vw;
  background: red;
}
```
```css
/* 子元素 margin 或者 padding 的百分比 */
/* 参照的是父盒子的 width */

.square {
  width: 10%;
  padding-bottom: 10%;
  /* 防止内容过多，撑开高度 */
  height: 0;
  background: red;
}
```

### 画一条 0.5px 的线

```css
transform: scale(0.5,0.5);
```

### 设置小于 12px 的字体

- 使用图片
- css3 的 transform 缩放属性 `-webkit-transform:scale(0.5) `

## TODO

- [一文梳理 CSS 必会知识点](https://juejin.cn/post/6854573212337078285)