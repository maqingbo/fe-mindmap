---
title: '学习 JavaScript 数据结构与算法'
---

# 学习 JavaScript 数据结构与算法（第 3 版）

## 本书结构

- 第 1 章：“JavaScript 简介”，讲述了 JavaScript 的基础知识。
- 第 2 章：“ECMAScript 和 TypeScript 概述”。
- 第 3 章：“数组”，介绍了如何使用数组这种最基础且最常用的数据结构。
- 第 4 章：“栈”，如何创建栈以及怎样添加和删除元素，如何用栈解决计算机科学中的一些问题。
- 第 5 章：“队列和双端队列”，如何创建队列，以及如何添加和删除队列中的元素。也介绍了一种特殊的队列——双端队列数据结构，以及栈和队列的主要区别。
- 第 6 章：“链表”，讲解如何用对象和指针从头创建链表这种数据结构。这一章除了讨论如何声明、创建、添加和删除链表元素之外，还介绍了不同类型的链表，例如双向链表和循环链表。
- 第 7 章：“集合”，介绍了集合这种数据结构，讨论了如何用集合存储非重复性的元素。此外，还详述了对集合的各种操作以及相应代码的实现。
- 第 8 章：“字典和散列表”，深入讲解字典、散列表及它们之间的区别。这一章介绍了这两种数据结构是如何声明、创建和使用的，还探讨了如何解决散列冲突，以及如何创建更高效的散列函数。
- 第 9 章：“递归”，介绍了递归的概念，描述了声明式和递归式算法之间的区别。
- 第 10 章：“树”，讲解了树这种数据结构和它的相关术语，重点讨论了二叉搜索树，以及如何在树中搜索、遍历、添加和删除节点。这一章还介绍了自平衡树，包括 AVL 树和红黑树。
- 第 11 章：“二叉堆和堆排序”，介绍了最小堆和最大堆数据结构，以及怎样使用堆作为一个优先队列，还讨论了著名的堆排序算法。
- 第 12 章：“图”，介绍了图这种数据结构和它的适用范围。这一章讲述了图的常用术语和不同表示方式，探讨了如何使用深度优先搜索算法和广度优先搜索算法遍历图，以及它们的适用范围。
- 第 13 章：“排序和搜索算法”，探讨了常用的排序算法，如冒泡排序（包括改进版）、选择排序、插入排序、归并排序和快速排序。这一章还介绍了计数排序和基数排序这两种分布式排序算法，搜索算法中的顺序搜索和二分搜索，以及怎样随机排列一个数组。
- 第 14 章：“算法设计与技巧”， 介绍了一些算法技巧和著名的算法，以及 JavaScript 函数式编程。
- 第 15 章：“算法复杂度”，介绍了大 O 表示法的概念，以及本书实现算法的复杂度列表。这一章还介绍了 NP 完全问题和启发式算法。最后，讲解了提升算法能力的诀窍。

## 第 1 章　JavaScript 简介

### 相等运算符（== 和 ===）

使用`==`时，不同类型的值也可以被看作相等。下面的表格展示了不同类型的值用相等运算符比较后的结果。

 | 类型（ x） | 类型（ y） | 结 果               |
 | ---------- | ---------- | ------------------- |
 | null       | undefined  | true                |
 | undefined  | null       | true                |
 | 数         | 字符串     | x == toNumber(y)    |
 | 字符串     | 数         | toNumber(x) == y    |
 | 布尔值     | 任何类型   | toNumber(x) == y    |
 | 任何类型   | 布尔值     | x == toNumber(y)    |
 | 字符串或数 | 对象       | x == toPrimitive(y) |
 | 对象       | 字符串或数 | toPrimitive(x) == y |

如果 x 和 y 的类型相同， JavaScript 会用 equals 方法比较这两个值或对象。没有列在这个表格中的其他情况都会返回 false。

toNumber 和 toPrimitive 方法是内部的，并根据以下表格对其进行估值。toNumber 方法对不同类型返回的结果如下。

| 值 类 型  | 结 果                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| undefined | NaN                                                                                                                                   |
| null      | +0                                                                                                                                    |
| 布尔值    | 如果是 true，返回 1；如果是 false，返回+0                                                                                             |
| 数        | 数对应的值                                                                                                                            |
| 对象      | 如果对象的 valueOf 方法的结果是原始值，返回原始值；</br>如果对象的 toString 方法返回原始值，就返回这个值；</br>其他情况都返回一个错误 |

示例：

```js
console.log('packt' == true) // false

// 为什么输出是 false?
// 首先，布尔值会被 toNumber 方法转成数，因此得到 packt == 1。
// 其次，用 toNumber 转换字符串值。因为字符串包含字母，所以会被转成 NaN，
// 表达式就变成了 NaN == 1，结果就是 false。
```

那么`===`运算符呢？简单多了。如果比较的两个值类型不同，比较的结果就是 false。如果比较的两个值类型相同，结果会根据下表判断。

| 类型（ x） | 值                            | 结 果 |
| ---------- | ----------------------------- | ----- |
| 数         | x 和 y 的值相同（但不是 NaN） | true  |
| 字符串     | x 和 y 是相同的字符           | true  |
| 布尔值     | x 和 y 都是 true 或 false     | true  |
| 对象       | x 和 y 引用同一个对象         | true  |

## 第 2 章　ECMA Script 和 TypeScript 概述

没啥新鲜的，只是一个大概的介绍，略。

## 第 3 章　数组

数组存储一系列同一种数据类型的值。虽然在 JavaScript 里，也可以在数组中保存不同类型的值，但我们还是遵守最佳实践，避免这么做（大多数语言都没这个能力）。

紧接着介绍了数组常用的方法，也没啥好说的，略。

### ECMA Script 6 和数组的新功能

| 方 法      | 描 述                                                                      |
| ---------- | -------------------------------------------------------------------------- |
| @@iterator | 返回一个包含数组键值对的迭代器对象，可以通过同步调用得到数组元素的键值对   |
| copyWithin | 复制数组中一系列元素到同一数组指定的起始位置                               |
| entries    | 返回包含数组所有键值对的 @@iterator                                        |
| includes   | 如果数组中存在某个元素则返回 true，否则返回 false。 E2016 新增             |
| find       | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素               |
| findIndex  | 根据回调函数给定的条件从数组中查找元素，如果找到则返回该元素在数组中的索引 |
| fill       | 用静态值填充数组                                                           |
| from       | 根据已有数组创建一个新数组                                                 |
| keys       | 返回包含数组所有索引的 @@iterator                                          |
| of         | 根据传入的参数创建一个新数组                                               |
| values     | 返回包含数组中所有值的 @@iterator                                          |

**for...of 语句**

for...of 可以用来迭代数组。

> 其实 for...of 还可以用来迭代 String、Set、Map、函数和 argument 对象，理论上说，他可以迭代任何可迭代的对象。
> 所谓**可迭代对象**，就是实现了 [可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 的对象。

**@@iterator 对象**

ES2015 还为 Array 类增加了一个 @@iterator 属性，需要通过 Symbol.iterator 来访问。

> @@iterator 属性同样可参考 [可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) 部分。

```js
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value); // 1
```

然后，不断调用迭代器的 next 方法，就能依次得到数组中的值。

**keys 方法**

keys 方法返回包含数组索引的 @@iterator，下面是使用该方法的代码示例。

```js
const aKeys = numbers.keys(); // 得到数组索引的迭代器
console.log(aKeys.next()); // {value: 0, done: false }
```

### 类型数组（TypedArray）

与 C 和 Java 等其他语言不同， JavaScript 数组不是强类型的，因此它可以存储任意类型的数据。（最佳实践：存储同一类型的数据）

类型数组则用于存储单一类型的数据。它的语法是 let myArray = new TypedArray(length)，其中 TypedArray 需替换为下表所列之一。

| 类型数组          | 数据类型            |
| ----------------- | ------------------- |
| Int8Array         | 8 位二进制补码整数  |
| Uint8Array        | 8 位无符号整数      |
| Uint8ClampedArray | 8 位无符号整数      |
| Int16Array        | 16 位二进制补码整数 |
| Uint16Array       | 16 位无符号整数     |
| Int32Array        | 32 位二进制补码整数 |
| Uint32Array       | 32 位无符号整数     |
| Float32Array      | 32 位 IEEE 浮点数   |
| Float64Array      | 64 位 IEEE 浮点数   |

使用 WebGL API、进行位操作、处理文件和图像时，类型数组都可以大展拳脚。它用起来和普通数组毫无二致，本章所学的数组方法和功能都可以用于类型数组。

## 第 4 章　栈

栈是一种遵从后进先出（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

栈结构类似于数组，但是在添加和删除元素时更为可控。

**基于数组的栈**

```js
class Stack(){
  constructor () {
    this.items = []
  }
  //添加一个（或几个）新元素到栈顶
  push (element) { this.items.push(element) }
  //移除栈顶元素，并返回被移除的元素
  pop () { return this.items.pop() }
  //返回栈顶的元素，不对栈进行任何修改
  peek () { return this.items[this.items.length - 1] }
  //移除栈里的所有元素
  clear () { this.items = [] }
  //判断栈空，没有元素返回 true, 否则返回 false
  isEmpty () { return this.items.length === 0 }
  //返回栈里元素的个数
  size () { return this.items.length }
}
```

**基于对象的栈**

- 数组属于有序集合，会占用更多的内存空间；
- 数组中查找元素时，需要遍历所有元素，复杂度更高（O(n)）。

```js
class Stack {
  constructor () {
    this.count = 0
    this.items = {}
  }
  // 添加元素
  push (element) {
    this.items[this.count] = element
    this.count++
  }
  // 弹出元素
  pop () {
    if (this.isEmpty()) { return undefined }

    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }
  //返回栈顶的元素，不对栈进行任何修改
  peek () {
    if (this.isEmpty()) { return undefined }
    return this.items[this.count - 1]
  }
  // 移除所有元素
  clear () {
    this.items = {}
    this.count = 0
  }
  // 栈的大小
  size() { return this.count }
  // 栈是否为空
  isEmpty() { return this.count === 0 }

  // 打印栈的内容
  toString() {
    if (this.isEmpty()) { return '' }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

存在的问题：我们在 Stack 类中声明的 items 和 count 属性并没有得到保护，不是私有属性。

解决方法：下划线约定、Symbol、WeakMap。

然而，事实上，我们不能像在其他编程语言中一样声明私有属性和方法。虽然有很多种方法都可以达到相同的效果，但无论是在语法还是性能层面，这些方法都有各自的优点和缺点。

### 栈结构常见的算法问题

TODO

## 第 5 章　队列和双端队列

- 队列和栈非常类似，但是使用了与后进先出不同的原则。
- 双端队列是一种将栈的原则和队列的原则混合在一起的数据结构。
- 队列是遵循先进先出（ FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。

**队列**

```js
class Queue {
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }
  // 添加多个项到尾部
  enqueue (element) {
    this.items[this.count] = element
    this.count++
  }
  // 移除第一项，并返回元素
  dequeue () {
    if (this.isEmpty()) { return undefined }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  // 返回第一个元素，不改变队列
  peek () {
    if (this.isEmpty()) { return undefined }
    return this.items[this.lowestCount]
  }
  // 返回队列元素个数
  size () { return this.count - this.lowestCount }
  isEmpty () { return this.size() === 0 }
  // 清空队列
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
  toString() {
    if (this.isEmpty()) { return '' }
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}
```

**双端队列**

- 允许同时从前端和后端添加和移除元素的特殊队列。



## 第 6 章　链表
## 第 7 章　集合
## 第 8 章　字典和散列表
## 第 9 章　递归
## 第 10 章　树
## 第 11 章　二叉堆和堆排序
## 第 12 章　图
## 第 13 章　排序和搜索算法
## 第 14 章　算法设计与技巧
## 第 15 章　算法复杂度