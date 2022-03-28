## 浏览器的组成

浏览器大体上由以下几个组件组成：

![](../../images/browser/layers.png)

1. **用户界面**：包括地址栏，前进后退，书签菜单等窗口上除了网页显示区域以外的部分。
2. **浏览器引擎**：在用户界面和呈现引擎之间传送指令。
3. **渲染引擎**：负责显示请求的内容。比如请求到 HTML, 它会负责解析 HTML、CSS 并将结果显示到窗口中。
4. **网络**：用于网络请求，如 HTTP 请求。它包括平台无关的接口和各平台独立的实现。
5. **用户界面后端**：用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. **JS 解释器**：用于解析执行 JavaScript 代码。
7. **数据存储持久层**：浏览器需要把所有数据存到硬盘上，如 cookies。新的 HTML5 规范规定了一个完整（虽然轻量级）的浏览器中的数据库 web database。

## 浏览器中的进程与线程

### 进程

进程是 cpu 的资源分配的最小单位。

多进程指的是在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。

现代浏览器是多进程的，浏览器的进程主要包括以下几种：

- 浏览器进程：浏览器的主进程（负责协调，主控）；
- 网络进程：负责发起和接受网络请求，是从主进程中剥离出来的；
- 插件进程：每种类型的插件对应一个进程，仅当使用该插件时才创建；
- GPU 进程：UI 界面、3D 绘制；
- 渲染进程（内核）：控制页面渲染，脚本执行，事件处理等。默认每个 Tab 页面一个进程，互不影响。

多进程的优点：

- 更稳定：一个页面卡死不会影响其他页面；
- 更安全：进程间相互独立，数据不共享；

### 线程

渲染进程中的线程：

  **GUI 渲染线程**

负责渲染页面，解析 html 和 CSS、构建 DOM 树、CSSOM 树、渲染树、和绘制页面，重绘重排也是在该线程执行。

**JS 引擎线程**

负责解析和执行 JS。一个 tab 页中只有一个 JS 引擎线程（单线程）。

在`JS 引擎线程`运行脚本期间，GUI 渲染线程是出于挂起状态的，所以脚本执行时间太长的话 UI 界面会变得卡顿。有以下两种应对方式：

- `<script>`标签添加`defer`属性，这样就不会停止文档解析，而是等到文档解析结束才执行脚本。
- `<script>`标签添加`async`属性（H5 新增），此时如果是普通脚本，会被并行执行，如果是模块脚本，会被放入任务队列，然后也是并行执行。

**计时器线程**

指 setInterval 和 setTimeout，因为 `JS 引擎`是单线程的，所以如果处于阻塞状态，那么计时器就会不准了，所以需要单独的线程来负责计时器工作。

**事件触发线程**

主要控制事件循环，计时器、异步请求、I/O 事件等会被放入任务队列，等待`JS 引擎线程`处理。

**异步 http 请求线程**

XMLHttpRequest 连接后浏览器开的一个线程，比如请求有回调函数，异步线程就会将回调函数加入事件队列，等待`JS 引擎`处理。

## 渲染过程

用户请求的 HTML 文本 (text/html) 通过浏览器的网络层到达渲染引擎后，渲染工作开始。每次通常渲染不会超过 8K 的数据块，其中基础的渲染流程图：

![Rendering engine basic flow](../../images/browser/flow.png)
_Rendering engine basic flow_

- **解析 HTML 生成 DOM tree**：渲染引擎首先解析 HTML 文档，将各个标签转化成 DOM 节点，生成 DOM Tree。
- **生成 CSSOM Tree**：不管是内联式，外联式还是嵌入式引入的 CSS 样式会被解析生成 CSSOM Tree。
- **构建 Render Tree**：根据 DOM Tree 与 CSSOM Tree 生成渲染树 (Render Tree)。此时树上的每个节点已包含基本样式，不包括大小和位置信息。
- **布局 (Layout/Flow)**：为 Render Tree 上的每一个节点计算大小和对应在视口上的位置。再次执行这一步时称作**重排/回流 (reflow)**。这一阶段，所有相对单位被转化为绝对单位。
- **绘制 (Paint)**：将 Render Tree 上的每一个节点转化成屏幕上的实际像素，然后将每一个节点绘制出来。再次执行这一步骤叫做**重绘 (repaint)**。

以上步骤是一个渐进的过程，为了提高用户体验，渲染引擎试图尽可能快的把结果显示给最终用户。它不会等到所有 HTML 都被解析完才创建并布局渲染树。它会在从网络层获取文档内容的同时把已经接收到的局部内容先展示出来。

## 渲染细节

### 生成 DOM Tree

HTML 解析由两个阶段组成：

- 标记化 (tokenization)：依据规范，识别 HTML 标签所对应的 DOM 对象以及该标签上的属性；
- 树构建 (tree construction)：以 Document 为根节点，将识别到的 DOM 对象构建成树形结构。

解析过程中如果遇见 script 脚本会直接开始执行脚本，阻塞文档解析，有以下应对方式：

- script 标签添加到文档最后面。
- script 标签添加`defer`属性，脚本会等到解析完成后执行。
- script 标签添加`async`属性，脚本会被加入任务队列。

解析完成后，文档将被标识为`deferred`状态，并且触发`DOMContentLoaded`事件，意思就是可以解析带有`defer`属性的 script 脚本了。页面所有内容（图像、样式、脚本）加载完成后会触发`Load`事件。

### 生成 CSSOM Tree

[W3c 的 CSS 2.1 规范](https://www.w3.org/TR/CSS2/intro.html#q2.0) 中给出了 CSSOM Tree 构建的大概流程（仅供参考，与实现不完全相同）：

1. 识别设备的媒体类型；
2. 筛选所有样式表中适配该媒体类型的样式表；
3. 根据选择器为 DOM Tree 做标注，然后为属性赋值；
   - 值的计算：不同媒体类型有不同算法。例如媒体类型是 screen 的话，使用的就是 [视觉格式化模型 (visual formatting model)](../css/keyConcepts.html#%E8%A7%86%E8%A7%89%E6%8E%92%E7%89%88%E6%A8%A1%E5%9E%8B)
4. 根据有标注的 DOM Tree，生成 CSSOM Tree，两棵树并不完全一致；

### 生成 Render Tree

为构建渲染树，浏览器大体上完成了下列工作：
- 从 DOM 树的根节点开始遍历每个可见节点。
- 某些节点不可见（例如 script、meta 等），因为它们不会体现在渲染输出中，所以会被忽略。
- 某些节点设置了`display: none`属性，也会被忽略。（`visibility: hidden`不会被忽略）
- 对每个可见节点添加 CSSOM Tree 上所对应的规则。

### Render Tree 和 DOM Tree 的关系

- 并非一一对应：不可见元素（meta、head），设置了`display: none`的元素将不会出现在 Render Tree 中；
- 一些 DOM 元素会对应多个 Render Tree 节点 (Render Object)，比如`select`元素；
- 另一个一对多的情况：根据 CSS 2.1 规范，一个行内元素只能包含一个行内元素或块级元素，如果既包含了会计也包含了行内元素，解析器则会创建匿名的 block render object 以包裹外面的行内元素。
- 一些 Render Tree 节点在树中的位置与 DOM Tree 中不一致，比如使用了浮动和绝对定位的元素。

![](../../images/browser/rendertree-domtree.png)
_Render Tree 及其对应的 DOM Tree_

### Layout

Render Tree 构造出来之后，节点上并没有元素的位置和大小等信息，计算这些值的过程称为布局 (Layout/Flow)。

HTML 采用流式布局，只要一次遍历就能计算出这些信息，基本过程是以浏览器可见区域的左上角`(0, 0)`为基础坐标，从左到右、从上到下的顺序对文档进行遍历（table 除外，所以你要避免使用 table 布局）。布局阶段输出的结果就是盒模型，精确地表示了每一个元素的位置和大小，并且所有的相对单位此时也转化为了绝对单位。

## 重绘（repaint）和回流（重排，reflow）

通过上的面分析我们得知，回流其实就是重新执行 Layout/Flow 这一步，重绘其实就是重新执行 Paint 这一步。

回流阶段时，浏览器会重新遍历整个 Render Tree 以计算节点的位置和大小，然后再次执行 Paint，性能消耗比 repaint 要大得多。

**会导致回流的操作**

涉及到改变元素大小或位置的操作，基本上都会引发回流。

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的 DOM 元素
- 激活 CSS 伪类（例如：`:hover`）
- 查询某些属性或调用某些方法

一些常用且会导致回流的属性和方法：

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIfNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

**会导致重绘的操作**

当页面中元素样式的改变但并不影响它在文档流中的位置时（例如：color、background-color、visibility 等），浏览器会将新样式赋予给元素并重新绘制它。

**浏览器内部的优化**

现代浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阈值的，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。

但是当你访问以下涉及布局的属性或方法时，浏览器会立刻清空队列：

- width、height
- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- getComputedStyle()
- getBoundingClientRect()

因为队列中可能会有影响到这些属性或方法返回值的操作，即使你希望获取的信息与队列中操作引发的改变无关，浏览器也会强行清空队列，确保你拿到的值是最精确的。

更多可参考：[What forces layout？](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)

**如何减少不必要的回流**

- 合并对样式的多次修改，使用 cssText 或修改 class 属性；
- 需要对 DOM 进行频繁修改时，可使其脱离文档流，修改完再插入文档流；
  - 可使用`display: none`隐藏元素
  - 使用 document fragment 在当前 DOM 之外构建一个子树，再把它拷贝回文档。(document.createDocumentFragment())
  - 将元素拷贝到一个脱离文档的节点中，修改节点后，再替换原始的元素。（基于 cloneNode）
- 避免频繁调用涉及布局的 API；
- CSS3 硬件加速（GPU 加速）；

## 关键渲染路径与阻塞渲染

Todo

## 性能优化

- 结合渲染流程，可以针对性的优化渲染性能：
- 优化 JS 的执行效率
- 降低样式计算的范围和复杂度
- 避免大规模、复杂的布局
- 简化绘制的复杂度、减少绘制区域
- 优先使用渲染层合并属性、控制层数量
- 对用户输入事件的处理函数去抖动（移动设备）

Todo

## 参考

- [浏览器的工作原理：现代网络浏览器幕后揭秘 - HTML5 Rocks](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)
- [渲染页面：浏览器的工作原理 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- [渲染树构建、布局及绘制 - Google](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)
- [浏览器渲染基本原理解析](https://mp.weixin.qq.com/s?__biz=MzUyNDYxNDAyMg==&mid=2247484405&idx=1&sn=64fca96a6fc7fc2bf11e2da6079de678&chksm=fa2be31ccd5c6a0aad0b37aa57a16d416280a2e6c2f6458b3da756fe168f7ed5a4e7981ca919&mpshare=1&scene=1&srcid=#rd)
- [浏览器的回流与重绘 - 掘金](https://juejin.cn/post/6844903569087266823)
- [避免大型、复杂的布局和布局抖动 - Google](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?utm_source=devtools#avoid-forced-synchronous-layouts)
