---
title: '预处理器/后处理器'
---

## 预处理器

**是什么**：一种有着自己独立的语法来编写和生成 CSS 的程序；

**为什么要用**：预处理器有一些原生 CSS 不具备的特性，例如代码混合，嵌套选择器，继承选择器，变量等。这些特性让 CSS 的结构更加具有可读性且易于维护，功能也更加强大。

**常用功能**：

- 变量、计算公式：减少重复代码；
- 选择器嵌套：层级结构更清晰；
- Extend、Mixin：代码片段复用；
- import：文件模块化；
- 循环：适用于复杂有规律的样式；

### Sass

**历史**：

2007 年发行，最初由 Ruby 语言写成，目前有 JavaScript 实现的版本。2010 年推出 SCSS(Sassy CSS)，目前使用较多。

**两种语法**：

- Sass：最初始的语法，文件后缀`.sass`，使用 “缩进” 代替 “花括号” 表示属性属于某个选择器，用 “换行” 代替 “分号” 分隔属性。更易阅读，书写更快速。
- SCSS：基于 CSS3 语法进行拓展，与原生 CSS 写法一致。

**常用功能 (SCSS)**：

```scss
// 选择器嵌套
.main {
  color: red;
  .box {
    color: green;
  }
}
```

```scss
// 父选择器 &
.main {
  color: red;
  &:hover {
    color: pink;
  }
}
```

```scss
// 属性嵌套
.funky {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}

// 编译为
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold;
}
```

```scss
// 两种注释
// Sass 支持标准的 CSS 多行注释 /* */，以及单行注释 //，
// 前者会 被完整输出到编译后的 CSS 文件中，而后者则不会

/* This comment will appear in the CSS output. */
// These comments will not
```

```scss
// 全局变量
$width: 5em;
.main { width: $width; }
.footer { width: $width; }

// 局部变量
// 只能大括号内使用
.main {
  $height: 10px;

  height: $height;
  line-height: $height;
}
```

```scss
// @mixin

// 声明
@mixin red-text {
  color: red;
  font-size: 20px;
}

// 使用
.page-title {
  @include red-text;
  padding: 4px;
}
```

```scss
// 参数

@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue, 1in); }
```

### Less

[Less 中文网](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

### stylus

[stylus 中文网](https://www.stylus-lang.cn/)

## PostCSS

PostCSS 是一个平台，提供了一个解析器，能够将 CSS 解析为 JS 可以操作的抽象语法树（AST），然后通过插件来处理语法树，最后输出处理后的结果。

- SASS 等工具：源代码 -> 生产环境 CSS
- PostCSS：源代码 -> 标准 CSS -> 生产环境 CSS

常用插件：

- Autoprefixer
- postcss-cssnext
- postcss-modules
- stylelint