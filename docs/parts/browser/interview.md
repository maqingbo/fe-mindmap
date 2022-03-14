## 从输入 URL 到页面呈现发生了什么

1. DNS 解析
2. TCP 连接
   - 建立连接阶段：3 次握手。建立客户端和服务器之间的连接。
   - 传输数据阶段
   - 断开连接阶段：4 次挥手。断开客户端和服务器之间的连接。
3. 发送 HTTP 请求
   - 请求行：常用方法有：GET、POST、PUT、DELETE、OPTIONS、HEAD。
   - 请求报头：允许客户端向服务器传递请求的附加信息和客户端自身的信息。
   - 请求正文：通过 POST、PUT 等方法时，通常需要客户端向服务器传递数据，这些数据就储存在请求正文中。
4. 服务器响应
   - 状态码：1xx 指示信息-表示请求已接收；2xx 请求成功-表示请求成功接收并解析；3xx 重定向-表示要完成请求需要更进一步操作；4xx 客户端错误-请求有语法错误或者请求无法实现；5xx：服务端错误-服务端未能实现合法的请求。常见状态码：200（成功）、304（请求内容有缓存，不需要更新）、404（网页或者文件找不到）、500（服务器-后端处理错误）。
   - 响应报头：常见的响应报头字段 Server、Connection 等。
   - 响应报文：服务器返回给浏览器的文本信息，通常 HTML、CSS、JS、图片等文件就放在这一部分。
5. 浏览器解析渲染页面
   - 解析 HTML，生成 DOM 树
   - 解析 CSS，生成 CSS 规则树（CSS Rule Tree）
   - 将 DOM Tree 和 CSS Rule Tree 相结合，生成 渲染树（Render Tree）
   - 从根节点开始，计算每一个元素的大小、位置，给出每个节点所应该出现的屏幕精确坐标，从而得到基于渲染树的 布局渲染树（Layout of the render tree）。
   - 遍历渲染树，将每个节点用 UI 渲染引擎来绘制，从而将整棵树绘制到页面上，这个步骤叫 绘制渲染树（Painting the render tree）