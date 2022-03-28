## 从输入 URL 到页面呈现发生了什么

1. DNS 解析
   - 互联网中每一台机器都有唯一标识的 IP 地址，但是不好记，于是人们只记住域名，域名跟 IP 的匹配就是 DNS 解析。
   - DNS 解析时先找缓存，浏览器缓存 > 本地缓存 (hosts) > 路由器缓存，一直到域名服务器缓存。
2. TCP 连接
   - 建立连接阶段：3 次握手。建立客户端和服务器之间的连接。
   - 传输数据阶段
   - 断开连接阶段：4 次挥手。断开客户端和服务器之间的连接。
3. 发送 HTTP 请求
   - 请求行：请求方法+路径+协议版本；常用方法有：GET、POST、PUT、DELETE、OPTIONS、HEAD。
   - 请求报头：请求的附加信息和客户端自身的信息。[HTTP 首部字段](../network/http.html#http-首部字段)
   - 请求体：通过 POST、PUT 等方法时，通信的数据就包含在请求正文中。
4. 服务器响应
   - 状态行：协议版本+状态码+状态描述文本
     - 常见状态码：12345 开头。[常见状态码](../network/http.html#%E5%B8%B8%E8%A7%81%E7%8A%B6%E6%80%81%E7%A0%81)
   - 响应头：常见的响应报头字段 Server、Connection 等。
   - 响应体：服务器返回给浏览器的文本信息，通常 HTML、CSS、JS、图片等文件就放在这一部分。
5. 浏览器解析渲染页面
   - 解析 HTML，生成 DOM 树
   - 解析 CSS，生成 CSS 规则树（CSS Rule Tree）
   - 将 DOM Tree 和 CSS Rule Tree 相结合，生成 渲染树（Render Tree）
   - 从根节点开始，计算每一个元素的大小、位置，给出每个节点所应该出现的屏幕精确坐标，从而得到基于渲染树的 布局渲染树（Layout of the render tree）。
   - 遍历渲染树，将每个节点用 UI 渲染引擎来绘制，从而将整棵树绘制到页面上，这个步骤叫 绘制渲染树（Painting the render tree）
6. 断开连接

## web 页面的生命周期

- DOMContentLoaded
  - DOM 加载完成之后触发，发生在 document 对象上
  - document.addEventListener("DOMContentLoaded", ready)
  - 在文档加载完成之后设置 DOMContentLoaded 事件处理程序，永远都不会执行
  - 可使用 document.readyState 代替
- load
  - 当整个页面，包括样式、图片和其他资源被加载完成时，会触发 window 对象上的 load 事件。
  - window.onload = function () {}
- beforeunload
  - 如果访问者触发了离开页面的导航（navigation）或试图关闭窗口，beforeunload 处理程序将要求进行更多确认。
- unload
  - 当用户离开页面时触发
  - 可以做一些不涉及延迟的操作，例如关闭相关的弹出窗口。

<!-- 参考：[虚竹子- 掘金](https://juejin.cn/post/6844903832435032072) -->
