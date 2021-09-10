---
title: 'At-Rules'
---

## The At-Rules of CSS

在 CSS 文件中，规则是样式表的主体，通常样式表会包括大量的规则列表。但有时候网页的作者也希望在样式表中包括其他的一些信息，比如字符集，导入其它的外部样式表，字体等，这些需要专门的 At-Rules 语句表示。

### 常规规则

所谓“常规规则”指的是语法类似下面的规则：

```css
@[KEYWORD] (RULE);
```

包括：

- **@charset**

定义文档的字符集。字符设置据说会被 HTTP 头覆盖。

某些软件，例如 Dream weaver 新建 CSS 文件时候，自动会带有下面所示代码，但实际开发时候，作用不大，因为 meta 中已经有所设置 (`<meta charset="utf-8">`)，会覆盖，所以我都是直接删掉的。

```css
@charset  "UTF-8";
```

- **@import**

导入其他 CSS 样式文件。实际上线时候，不建议使用，多请求，阻塞加载之类。但，本地开发可以使用，用做 CSS 模块化开发，然后使用一些（如 grunt） 工具进行压缩并合并。但是呢，相比 less, sass 等还是有不足，就是`@import`语句只能在 CSS 文件顶部，使得文件的前后关系控制，就不那么灵活。

```css
@import  'global.css';
```

*   **@namespace**

此规则应用到 XML HTML(XHTML) 上特别有用，因为这样的话 XHTML 元素可以作为选择器在 CSS 中使用。

```css
/* Namespace for XHTML */
@namespace url(http://www.w3.org/1999/xhtml);

/* Namespace for SVG embedded in XHTML */
@namespace svg url(http://www.w3.org/2000/svg);
```

### 嵌套规则

所谓“嵌套规则”，就是带有花括号`{}`, 语法类似下面的规则：

```css
@[KEYWORD] {
  /* Nested Statements */
}
```

包括：

*   **@document**

CSS 4.0 规范有相关说明。如果文档满足给定的一些条件，就可以应用我们指定的一些样式。比如说，这个 CSS 文件被子站 A 调用，和被子站 C 调用，我们可以通过域名匹配来执行不同的 CSS 样式。这样，我们可以有效避免冲突，或者防止外链之类。

```css
@document
	/* Rules for a specific page */
	url(https://css-tricks.com/),
	/* Rules for pages with a URL that begin with... */
	url-prefix(https: //css-tricks.com/snippets/),  /* Rules for any page hosted on a domain */  domain(css-tricks.com),  /* Rules for all secure pages */  regexp("https:.*")  {  /* Start styling */  body  {  font-family: Comic Sans;  }  }
```

由于这个 AT 规则是 CSS4 水平的，所以目前的浏览器支持情况很弱，只有 FireFox 浏览器支持，而且还需要加前缀。

*   **@font-face**

这个大家可能比较熟，自定义字体用的。IE6 也支持。

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'), url('myfont.woff') format('woff');
}
```

*   **@keyframes**

用来声明 CSS3 animation 动画关键帧：

```css
@keyframes pulse {
  0% {
    background-color: #001f3f;
  }

  100% {
    background-color: #ff4136;
  }
}
```

*   **@media**

媒介查询，解释非常常用的。响应式宽度啊，retina 屏幕判断啦，打印屏幕啦，甚至 IE7,IE8 浏览器的 hack 啦，很多，本文标题是了解，不深入，给大家简单演示下使用就好了：

```css
/* iPhone in Portrait and Landscape */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  .module {
    width: 100%;
  }
}
```

```css
/* 在打印文档时将样式应用于文档： */
@media print {
  .module {
    width: 100%;
  }
}
```

*   **@page**

这个规则用在打印文档时候修改一些 CSS 属性。使用`@page`我们只能改变部分 CSS 属性，例如间距属性`margin`, 打印相关的`orphans`, `widows`, 以及`page-break-*`, 其他 CSS 属性会被忽略。

```css
@page :first {
  margin: 1in;
}
```

上面 CSS 表示`:first`页面也要有`:left`, `:right`页面`margin`间距。`@page`的伪类包括：`:blank`, `:first`, `:left`, `:right`。

*   **@supports**

测试浏览器是否支持某个功能，然后在满足条件时为这些元素应用样式。

```css
/* Check one supported condition */ 
@supports (display: flex) {
  .module {
    display: flex;
  }
}

/* Check multiple conditions */
@supports (display: flex) and (-webkit-appearance: checkbox) {
  .module {
    display: flex;
  }
}
```

## 参考

- [The At-Rules of CSS](https://css-tricks.com/the-at-rules-of-css/)
- [At-rules - MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)
- [了解 CSS 中的@ AT 规则](https://www.zhangxinxu.com/wordpress/2015/08/know-css-at-rules/)