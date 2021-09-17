---
title: '视觉排版模型细节'
---

## 包含块

定义：元素（生成的）盒的位置和大小有时是根据一个特定矩形计算的，叫做该元素的包含块（containing block）。

例如：

```html
<!-- box-a 会生成一个矩形区域，这个区域叫做“box-b 的包含块”！ -->

<div class="box-a">
  <div class="box-b">盒子 B</div>
</div>
```

如何判断一个盒子的包含块分以下几种情况：

1. 根元素所在的包含块是一个被称为初始包含块的矩形。
   - 对于浏览器，尺寸就是视口的尺寸，并且被固定在画布开始的位置；
2. 对于其它元素，如果该元素的 position 是'relative'或者'static'，也就是常规流布局方式，包含块由其最近的块容器祖先盒子的 content 区域的边界形成；
3. 如果元素具有'position: fixed'，包含块由浏览器的视口区域（初始包含块）建立；
4. 如果元素具有'position: absolute'，包含块由最近的'position'为'absolute'，'relative'或者'fixed'的祖先建立，按照如下方式：
   1. 如果该祖先是一个行内元素，包含块就是环绕着为该元素生成的第一个和最后一个行内盒的内边距框的边界框（bounding box）。在 CSS 2.1 中，如果该行内元素被跨行分割了，那么包含块是未定义的；
   2. 否则，包含块由该祖先的 padding 边界形成；
   3. 如果没有这样的祖先，包含块就是初始包含块。

举例：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<HTML>
   <HEAD>
      <TITLE>Illustration of containing blocks</TITLE>
   </HEAD>
   <BODY id="body">
      <DIV id="div1">
      <P id="p1">This is text in the first paragraph...</P>
      <P id="p2">This is text <EM id="em1"> in the
      <STRONG id="strong1">second</STRONG> paragraph.</EM></P>
      </DIV>
   </BODY>
</HTML>
```

以上文档的包含块关系如下：

 | 盒子    | 包含块                      |
 | ------- | --------------------------- |
 | html    | initial C.B. (UA-dependent) |
 | body    | html                        |
 | div1    | body                        |
 | p1      | div1                        |
 | p2      | div1                        |
 | em1     | p2                          |
 | strong1 | p2                          |

 假如我们对 div1 和 em1 进行定位：

 ```css
#div1 { position: absolute; left: 50px; top: 50px }
#em1  { position: absolute; left: 100px; top: 100px }
 ```

 包含块关系将变成如下所示：

| 盒子    | 包含块                      |
| ------- | --------------------------- |
| html    | initial C.B. (UA-dependent) |
| body    | html                        |
| div1    | initial C.B.                |
| p1      | div1                        |
| p2      | div1                        |
| em1     | div1                        |
| strong1 | em1                         |

## 排列规则

盒子从包含块的顶部开始一个挨一个水平或垂直排列（取决于 writing-mode 属性，默认水平排列），这些盒之间的水平方向上的 margin，border 和 padding 都有效；

## 参考

- [w3.org - inline-formatting](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)