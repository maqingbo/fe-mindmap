一门编程语言，可以分成**语法**和**程序库**两部分。

程序库是为了消除重复而出现的，常用的代码封装在一起，使用时只需引入，而不需要再次造轮子。随编程语言一起发布的程序库称之为**标准库**，也叫**内置对象**，是在语言层面上封装的一些常用的代码，除此之外的程序库称之为第三方库。

内置对象包含在全局作用域中，可直接访问。当然全局作用域中还包括其他的对象，比如宿主环境提供的全局对象，或者是脚本创建的对象。

## 分类

- 值
  - Infinity
  - NaN
  - undefined
  - globalThis
- 函数
  - eval()
  - uneval()
  - isFinite()
  - isNaN()
  - parseFloat()
  - parseInt()
  - decodeURI()
  - decodeURIComponent()
  - encodeURI()
  - encodeURIComponent()
- 对象
  - Object
  - Function
  - Boolean
  - Symbol
- 错误对象
  - Error
  - AggregateError
  - EvalError
  - InternalError
  - RangeError
  - ReferenceError
  - SyntaxError
  - TypeError
  - URIError
- 数字和日期对象
  - Number
  - BigInt
  - Math
  - Date
- 字符串
  - String
  - RegExp
- 使用索引的对象（数组、类数组）
  - Array
  - Int8Array
  - Uint8Array
  - Uint8ClampedArray
  - Int16Array
  - Uint16Array
  - Int32Array
  - Uint32Array
  - Float32Array
  - Float64Array
  - BigInt64Array
  - BigUint64Array
- 使用键的对象（字典表）
  - Map
  - Set
  - WeakMap
  - WeakSet
- 结构化数据
  - ArrayBuffer
  - SharedArrayBuffer
  - Atomics
  - DataView
  - JSON
- 抽象控制对象
  - Promise
  - Generator
  - GeneratorFunction
  - AsyncFunction
- 反射
  - Reflect
  - Proxy
- 国际化
  - Intl
  - Intl.Collator
  - Intl.DateTimeFormat
  - Intl.ListFormat
  - Intl.NumberFormat
  - Intl.PluralRules
  - Intl.RelativeTimeFormat
  - Intl.Locale
- WebAssembly（类汇编语言、二进制、高性能）
  - WebAssembly
  - WebAssembly.Module
  - WebAssembly.Instance
  - WebAssembly.Memory
  - WebAssembly.Table
  - WebAssembly.CompileError
  - WebAssembly.LinkError (en-US)
  - WebAssembly.RuntimeError
- 其他
  - arguments