---
title: '常用的 Sass Mixin'
---

| 定义方式    | 调用方式   | 适用于                   |
| ----------- | ---------- | ------------------------ |
| `@mixin`    | `@include` | 适用于传递参数           |
| `%`         | `@extend`  | 适用于不传参数的代码片段 |
| `@function` |            | 需要返回一个值           |

## mixin

#### 单行文本溢出省略显示

`text-overflow:ellipsis`属性来实现单行文本的溢出显示省略号 (…)。当然部分浏览器还需要加`宽度 width`属性。

```css
@mixin text-ellipsis () {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

#### 多行文本溢出省略显示

> **仅支持 WebKit 浏览器和移动端**

```css
@mixin text-ellipsis () {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

```

-webkit-line-clamp 用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的 WebKit 属性。常见结合属性：

> *   **display: -webkit-box;** 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
> 
> *   **-webkit-box-orient** 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
> 
> *   **text-overflow: ellipsis;** 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。

## %

#### 清除浮动

```css
%clearfix() {
    &:before,
    &:after {
        content: "";
        display: table;
    }
    &:after {
        clear: both;
    }
}

// 用法
.container {
    @extend %clearfix;
}
```

## function

#### px 转 em

```css
@function pxToEm($px, $base: 16) {
  @return ($px / $base) * 1em;
}
```
