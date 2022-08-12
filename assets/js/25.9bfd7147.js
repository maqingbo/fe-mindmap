(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{407:function(t,s,a){t.exports=a.p+"assets/img/event-flow.7cc5373c.png"},487:function(t,s,a){"use strict";a.r(s);var n=a(46),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"定义"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#定义"}},[t._v("#")]),t._v(" 定义")]),t._v(" "),n("p",[t._v("事件就是用户或浏览器在某一时刻执行的某种动作，JavaScript 与 HTML 的交互是通过事件实现的。是一种内置在浏览器中的 API。")]),t._v(" "),n("h2",{attrs:{id:"事件流"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件流"}},[t._v("#")]),t._v(" 事件流")]),t._v(" "),n("p",[t._v("DOM2 Events 规范规定事件流分为 3 个阶段："),n("code",[t._v("事件捕获")]),t._v("、"),n("code",[t._v("到达目标")]),t._v("和"),n("code",[t._v("事件冒泡")]),t._v("。事件捕获最先发生，为提前拦截事件提供了可能。然后，实际的目标元素接收到事件。最后一个阶段是冒泡，最迟要在这个阶段响应事件。")]),t._v(" "),n("p",[n("img",{attrs:{src:a(407),alt:""}})]),t._v(" "),n("p",[t._v("在 DOM 事件流中，实际的目标（ "),n("code",[t._v("<div>")]),t._v("元素）在捕获阶段不会接收到事件。这是因为捕获阶段从 document 到"),n("code",[t._v("<html>")]),t._v("再到"),n("code",[t._v("<body>")]),t._v("就结束了。下一阶段，即会在"),n("code",[t._v("<div>")]),t._v("元素上触发事件的“到达目标”阶段，通常在事件处理时被认为是冒泡阶段的一部分。")]),t._v(" "),n("h2",{attrs:{id:"事件处理程序"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件处理程序"}},[t._v("#")]),t._v(" 事件处理程序")]),t._v(" "),n("p",[t._v('为响应事件而调用的函数被称为事件处理程序（或事件监听器）。事件处理程序的名字以"on"开头。')]),t._v(" "),n("p",[t._v("事件的三种使用方式：")]),t._v(" "),n("ul",[n("li",[n("strong",[t._v("行内事件处理器")])])]),t._v(" "),n("div",{staticClass:"language-html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token special-attr"}},[n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("onclick")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),n("span",{pre:!0,attrs:{class:"token value javascript language-javascript"}},[t._v("console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Clicked'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])]),n("ul",[n("li",[n("strong",[t._v("DOM0 级事件处理程序")])])]),t._v(" "),n("p",[t._v("把一个函数赋值给（DOM 元素的）一个事件处理程序属性。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" btn "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myBtn"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nbtn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Clicked"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br")])]),n("ul",[n("li",[n("strong",[t._v("DOM2 级事件处理程序")])])]),t._v(" "),n("p",[t._v("DOM2 Events 为事件处理程序的赋值和移除定义了两个方法： "),n("code",[t._v("addEventListener()")]),t._v(" 和 "),n("code",[t._v("removeEventListener()")]),t._v("。这两个方法暴露在所有 DOM 节点上，它们接收 3 个参数：事件名、事件处理函数和一个布尔值， true 表示在捕获阶段调用事件处理程序， false（默认值）表示在冒泡阶段调用事件处理程序。")]),t._v(" "),n("p",[t._v("注意：DOM2 级的事件名称不是以 "),n("code",[t._v("on")]),t._v(" 开头的！")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" btn "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myBtn"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nbtn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("addEventListener")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"click"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("id"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br")])]),n("p",[t._v("优点：可绑定多个事件。")]),t._v(" "),n("h2",{attrs:{id:"事件对象"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件对象"}},[t._v("#")]),t._v(" 事件对象")]),t._v(" "),n("p",[t._v("在 DOM 中发生事件时，所有相关信息都会被收集并存储在一个名为 event 的对象中。event 对象是传给事件处理程序的唯一参数。不管以哪种方式使用事件，都会传入这个 event 对象。")]),t._v(" "),n("p",[t._v("在事件处理程序内部， "),n("code",[t._v("this")]),t._v(" 对象始终等于 "),n("code",[t._v("currentTarget")]),t._v(" 的值，表示注册事件的元素，而 "),n("code",[t._v("target")]),t._v(" 表示事件的实际目标。")]),t._v(" "),n("p",[t._v("举例：我们在 body 元素上绑定一个 click 事件，然后点击文档中的一个按钮 myBtn：")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("currentTarget "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("target "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myBtn"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])]),n("h3",{attrs:{id:"阻止默认行为"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#阻止默认行为"}},[t._v("#")]),t._v(" 阻止默认行为")]),t._v(" "),n("p",[n("code",[t._v("preventDefault()")]),t._v("方法用于阻止特定事件的默认动作。比如，链接的默认行为就是在被单击时导航到 href 属性指定的 URL。如果想阻止这个导航行为，可以在 onclick 事件处理程序中取消。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" link "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myLink"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nlink"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  event"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("preventDefault")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br")])]),n("h3",{attrs:{id:"阻止冒泡"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#阻止冒泡"}},[t._v("#")]),t._v(" 阻止冒泡")]),t._v(" "),n("p",[n("code",[t._v("stopPropagation()")]),t._v("方法用于立即阻止事件流在 DOM 结构中传播，取消后续的事件捕获或冒泡。例如，直接添加到按钮的事件处理程序中调用 "),n("code",[t._v("stopPropagation()")]),t._v("，可以阻止 document.body 上注册的事件处理程序执行。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" btn "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"myBtn"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nbtn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Clicked"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nevent"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("stopPropagation")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndocument"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onclick")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Body clicked"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不执行")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br")])]),n("h3",{attrs:{id:"事件委托"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件委托"}},[t._v("#")]),t._v(" 事件委托")]),t._v(" "),n("p",[t._v("冒泡的特点可以让我们使用"),n("strong",[t._v("事件委托")]),t._v("来优化性能。")]),t._v(" "),n("p",[t._v("一个很好的例子是一个列表项，如果你想让每个列表项被点击时弹出一条信息，您可以将 click 单击事件绑定在父元素"),n("code",[t._v("<ul>")]),t._v("上，这样事件就会从列表项冒泡到其父元素"),n("code",[t._v("<ul>")]),t._v("上，而不必再为每个子节点单独绑定事件。")]),t._v(" "),n("h2",{attrs:{id:"事件类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#事件类型"}},[t._v("#")]),t._v(" 事件类型")]),t._v(" "),n("p",[t._v("事件的类型决定了事件对象 event 中会保存什么信息。 DOM3 Events 定义了如下事件类型：")]),t._v(" "),n("ul",[n("li",[t._v("用户界面事件 (UIEvent)：涉及与 BOM 交互的通用浏览器事件。")]),t._v(" "),n("li",[t._v("焦点事件 (FocusEvent)：在元素获得和失去焦点时触发。")]),t._v(" "),n("li",[t._v("鼠标事件 (MouseEvent)：使用鼠标在页面上执行某些操作时触发。")]),t._v(" "),n("li",[t._v("滚轮事件 (WheelEvent)：使用鼠标滚轮（或类似设备）时触发。")]),t._v(" "),n("li",[t._v("输入事件 (InputEvent)：向文档中输入文本时触发。")]),t._v(" "),n("li",[t._v("键盘事件 (KeyboardEvent)：使用键盘在页面上执行某些操作时触发。")]),t._v(" "),n("li",[t._v("合成事件 ( CompositionEvent)：在使用某种 IME（Input Method Editor，输入法编辑器）输入字符时触发。")])]),t._v(" "),n("p",[t._v("不同类型的事件都有一个事件对象，绑定了一些特有的属性和方法，但是都是继承自 Event 对象，下面的列表展示了他们之间的关系：")]),t._v(" "),n("ul",[n("li",[t._v("Event\n"),n("ul",[n("li",[t._v("UIEvent\n"),n("ul",[n("li",[t._v("MouseEvent")]),t._v(" "),n("li",[t._v("TouchEvent")]),t._v(" "),n("li",[t._v("FocusEvent")]),t._v(" "),n("li",[t._v("KeyboardEvent")]),t._v(" "),n("li",[t._v("WheelEvent")]),t._v(" "),n("li",[t._v("InputEvent")]),t._v(" "),n("li",[t._v("CompositionEvent")])])]),t._v(" "),n("li",[t._v("MessageEvent")]),t._v(" "),n("li",[t._v("SVGEvent")]),t._v(" "),n("li",[t._v("...（全部事件列表可参考 "),n("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Event#interfaces_based_on_event",target:"_blank",rel:"noopener noreferrer"}},[t._v("MDN"),n("OutboundLink")],1),t._v("）")])])])]),t._v(" "),n("p",[t._v("我们可以尝试给页面上的一个 input 元素绑定一个 focus 事件，打印一下 event 对象：")]),t._v(" "),n("div",{staticClass:"language-yaml line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-yaml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("bubbles")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelBubble")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelable")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("type")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"focus"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" FocusEvent\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" FocusEvent()\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("bubbles")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelBubble")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelable")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" UIEvent\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" UIEvent()\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("view")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Window\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("which")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Event\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Event()\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("bubbles")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelBubble")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cancelable")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean important"}},[t._v("false")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("currentTarget")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token null important"}},[t._v("null")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stopPropagation")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" stopPropagation()\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("preventDefault")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" preventDefault()\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Object\n        "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("constructor")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Object()\n        "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("hasOwnProperty")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hasOwnProperty()\n        "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("isPrototypeOf")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" isPrototypeOf()\n        "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("...")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br"),n("span",{staticClass:"line-number"},[t._v("17")]),n("br"),n("span",{staticClass:"line-number"},[t._v("18")]),n("br"),n("span",{staticClass:"line-number"},[t._v("19")]),n("br"),n("span",{staticClass:"line-number"},[t._v("20")]),n("br"),n("span",{staticClass:"line-number"},[t._v("21")]),n("br"),n("span",{staticClass:"line-number"},[t._v("22")]),n("br"),n("span",{staticClass:"line-number"},[t._v("23")]),n("br"),n("span",{staticClass:"line-number"},[t._v("24")]),n("br"),n("span",{staticClass:"line-number"},[t._v("25")]),n("br"),n("span",{staticClass:"line-number"},[t._v("26")]),n("br"),n("span",{staticClass:"line-number"},[t._v("27")]),n("br"),n("span",{staticClass:"line-number"},[t._v("28")]),n("br"),n("span",{staticClass:"line-number"},[t._v("29")]),n("br"),n("span",{staticClass:"line-number"},[t._v("30")]),n("br")])]),n("h3",{attrs:{id:"常见事件类型"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常见事件类型"}},[t._v("#")]),t._v(" 常见事件类型")]),t._v(" "),n("p",[t._v("todo")]),t._v(" "),n("h3",{attrs:{id:"不常见和非标准事件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#不常见和非标准事件"}},[t._v("#")]),t._v(" 不常见和非标准事件")]),t._v(" "),n("p",[t._v("todo")]),t._v(" "),n("h2",{attrs:{id:"globaleventhandlers"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#globaleventhandlers"}},[t._v("#")]),t._v(" GlobalEventHandlers")]),t._v(" "),n("p",[t._v("在 "),n("a",{attrs:{href:"#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E7%A8%8B%E5%BA%8F"}},[t._v("事件处理程序")]),t._v("这一节我们有讲到 "),n("strong",[t._v("DOM 0 事件处理程序")]),t._v("，这里的事件名称都以"),n("code",[t._v("on")]),t._v("开头，跟我们上面讲到的不带"),n("code",[t._v("on")]),t._v("的事件并不是一回事。不带"),n("code",[t._v("on")]),t._v("的 events 是在 DOM 2 规范中确认下来的，而以"),n("code",[t._v("on")]),t._v("开头的事件们是在 DOM 规范出现之前就有的。")]),t._v(" "),n("p",[t._v("现在这些以"),n("code",[t._v("on")]),t._v("开头的事件们被放在一个叫做 GlobalEventHandlers 的集合中，并被混入和实现在 HTMLElement, Document, Window 对象上。它不是一个构造函数，不能直接创建实例，也不在 DOM 对象的原型链中，完全是为了兼容 DOM 0 时候的写法。")]),t._v(" "),n("p",[t._v("下面列举一些"),n("strong",[t._v("常见的")]),t._v("以"),n("code",[t._v("on")]),t._v("开头的事件：")]),t._v(" "),n("h3",{attrs:{id:"onerror"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#onerror"}},[t._v("#")]),t._v(" onerror")]),t._v(" "),n("p",[t._v("error 事件发生时，就会调用 onerror 属性指定的回调函数。")]),t._v(" "),n("p",[t._v("error 事件分成两种。")]),t._v(" "),n("p",[t._v("一种是 JavaScript 的运行时错误，这会传到 window 对象，导致 "),n("code",[t._v("window.onerror()")]),t._v("。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("window"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onerror")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("message"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" source"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lineno"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" colno"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" error")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])]),n("p",[t._v("另一种是资源加载错误，比如"),n("code",[t._v("<img>")]),t._v("或"),n("code",[t._v("<script>")]),t._v("加载的资源出现加载错误。这时，Error 对象会传到对应的元素，导致该元素的 onerror 属性开始执行。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("element"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onerror")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])]),n("h3",{attrs:{id:"onload、onloadstart"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#onload、onloadstart"}},[t._v("#")]),t._v(" onload、onloadstart")]),t._v(" "),n("p",[t._v("元素完成加载时，会触发 load 事件，执行"),n("code",[t._v("onload()")]),t._v("。它的典型使用场景是 window 对象和"),n("code",[t._v("<img>")]),t._v("元素。对于 window 对象来说，只有页面的所有资源加载完成（包括图片、脚本、样式表、字体等所有外部资源），才会触发 load 事件。")]),t._v(" "),n("p",[t._v("以下元素加载完成时都会触发 onload 事件：")]),t._v(" "),n("div",{staticClass:"language-html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("frame")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("frameset")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("iframe")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", \n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("link")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("type")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("image"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(", \n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])]),n("p",[t._v("对于"),n("code",[t._v("<img>")]),t._v("和"),n("code",[t._v("<video>")]),t._v("等元素，加载开始时还会触发 loadstart 事件，导致执行 onloadstart。")]),t._v(" "),n("h3",{attrs:{id:"onfocus-onblur"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#onfocus-onblur"}},[t._v("#")]),t._v(" onfocus，onblur")]),t._v(" "),n("p",[t._v("元素获得焦点、失去焦点时触发的事件。")]),t._v(" "),n("p",[t._v("注意，如果不是可以接受用户输入的元素，要触发 onfocus，该元素必须有 tabindex 属性。")]),t._v(" "),n("h3",{attrs:{id:"onscroll"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#onscroll"}},[t._v("#")]),t._v(" onscroll")]),t._v(" "),n("p",[t._v("页面或元素滚动时，会触发 scroll 事件，导致执行"),n("code",[t._v("onscroll()")]),t._v("。")]),t._v(" "),n("h3",{attrs:{id:"oncontextmenu-onshow"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#oncontextmenu-onshow"}},[t._v("#")]),t._v(" oncontextmenu，onshow")]),t._v(" "),n("p",[t._v("用户在页面上按下鼠标的右键，会触发 contextmenu 事件，导致执行 "),n("code",[t._v("oncontextmenu()")]),t._v("。如果该属性执行后返回 false，就等于禁止了右键菜单。document.oncontextmenu 与 window.oncontextmenu 效果一样。")]),t._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[t._v("document"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("oncontextmenu")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br")])]),n("p",[t._v("上面代码中，oncontextmenu 属性执行后返回 false，右键菜单就不会出现。")]),t._v(" "),n("p",[t._v("元素的右键菜单显示时，会触发该元素的 onshow 监听函数。")])])}),[],!1,null,null,null);s.default=e.exports}}]);