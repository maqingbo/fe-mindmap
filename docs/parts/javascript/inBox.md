---
title: '收集箱'
---

## JS 原生拖拽节点

给需要拖拽的节点绑定 mousedown ，mousemove ，mouseup 事件。
mousedown 事件触发后，开始拖拽。
mousemove 时，需要通过 event.clientX 和 clientY 获取拖拽位置，并实时更新位置。
mouseup 时，拖拽结束。
需要注意浏览器边界值，设置拖拽范围。

## ES6/ES7 和 AJA

1. ES6/ES7 核心知识
2. AJAX/HTTP 前后端交互

JS 是一种多范式的动态语言，它包含类型、运算符、标准内置（ built-in）对象和方法。通过原型链而不是类来支持面向对象编程。

> 什么是多范式？
> 
> 编程范式 (Programming paradigm) 其实就是计算机编程所使用的方法，是设计程序结构所采用的设计风格。目前主流的编程范式有：命令式编程 (Imperative programming)、函数式编程 (Functional programming)、面向对象编程 (Object-oriented programming) 等。 [Thinking80s - 知乎](https://www.zhihu.com/question/20428688/answer/26660295) 

## 变量

变量可以包含两种不同类型的数据：原始值和引用值。 

- 原始值（ primitive value）就是最简单的数据， 
  - Undefined、 Null、 Boolean、 Number、 String 和 Symbol
- 引用值（ reference value）则是由多个值构成的对象。
  - Object、Array、Function

**存储方式**

保存原始值的变量是按值（by value）访问的，因为我们操作的就是存储在变量中的实际值。JavaScript 不允许直接访问内存位置，因此也就不能直接操作对象所在的内存空间。在操作对象时，实际上操作的是对该对象的引用（reference）而非实际的对象本身。

**复制值**

除了存储方式不同，原始值和引用值在通过变量复制时也有所不同。

- 在通过变量把一个原始值赋值到另一个变量时，原始值会被复制到新变量的位置。这两个变量可以独立使用，互不干扰。
- 在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象。（浅拷贝）

如果想完全的复制一个对象，就需要使用`深拷贝`方法，深拷贝会创建一个新的对象，两个对象属性完全相同，但是对应内存中的两个不同的地址，修改一个对象的属性，不会影响另一个对象。

- JSON.parse(JSON.stringify())
  - 缺点：JSON 在执行字符串化的这个过程时，会先进行一个 JSON 格式化，获得安全的 JSON 值，因此如果是非安全的 JSON 值，就会被丢弃掉。其中 undefined、function、symbol 这三种类型的值就是非安全的。且 set、map 这种数据格式的对象，会被处理成一个空对象。
- lodash.cloneDeep()
- jQuery.extend()
- 手写递归循环

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是 null 或者 undefined 我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的 constructor, 而原型上的 constructor 指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

**参数传值**

中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，就像从一个变量复制到另一个变量一样。如果是原始值，那么就跟原始值变量的复制一样，如果是引用值，那么就跟引用值变量的复制一样。

其实可以理解为`按拷贝传值`，这里的拷贝是指浅拷贝。

## 垃圾回收机制

- [深入理解 Chrome V8 垃圾回收机制](https://github.com/yacan8/blog/issues/33)
- [[译] JavaScript 工作原理：内存管理 + 处理常见的 4 种内存泄漏](https://juejin.cn/post/6844903519078580238)