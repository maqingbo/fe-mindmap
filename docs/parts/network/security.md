## 常见网络安全问题

### 跨站脚本攻击（xss）
### 跨站请求伪造（xsrf）
### 阻断服务攻击（DOS）

### SQL 注入
### HTTPS 中间人攻击

## 同源策略

如果两个 URL 的`协议`、`端口`和`域名`三者都相同的话，则这两个 URL 是同源。不同源的两个 URL 之间不允许进行脚本/文档的交互。

如果非同源，共有三种行为受到限制。

- Cookie、LocalStorage 和 IndexDB 无法读取。
- DOM 无法获得。
- AJAX 请求不能发送。

虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。

### 共享 Cookie

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置 `document.domain `共享 Cookie。

JS 脚本可以将 `document.domain` 的值设置为其**当前域**或其**当前域的父域**。

```js
'a.company.com'
// 可修改为
'company.com'

'company.com'
// 不可修改为
'othercompany.com'
```

任何对 `document.domain` 的赋值操作，包括 `document.domain = document.domain` 都会导致端口号被重写为 **null**。因此 `company.com:8080` 不能仅通过设置 `document.domain = "company.com"` 来与 `company.com` 通信。必须在他们双方中都进行赋值，以确保端口号都为 **null** 。 

这种方法只适用于 Cookie 和 iframe 窗口，LocalStorage 和 IndexDB 无法通过这种方法获取。

另外，服务器也可以在设置 Cookie 的时候，指定 Cookie 的所属域名为一级域名，比如。example.com。

```
Set-Cookie: key=value; domain=.example.com; path=/
```

这样的话，二级域名和三级域名不用做任何设置，都可以读取这个 Cookie。

### iframe

如果两个网页不同源，就无法拿到对方的 DOM。典型的例子是 iframe 窗口和 window.open 方法打开的窗口，它们与父窗口无法通信。

如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的 `document.domain` 属性，就可以规避同源政策，拿到 DOM。

对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。

- 片段识别符（fragment identifier）
- window.name
- 跨文档通信 API（Cross-document messaging）

#### 片段识别符

片段标识符（fragment identifier）指的是，URL 的#号后面的部分，比如`http://example.com/x.html#fragment 的#fragment`。如果只是改变片段标识符，页面不会重新刷新。

父窗口可以把信息，写入子窗口的片段标识符。

```js
var src = originURL + '#' + data;
document.getElementById('myIFrame').src = src;
```
```js
// 子窗口通过监听 hashchange 事件得到通知。
window.onhashchange = checkMessage;

function checkMessage() {
  var message = window.location.hash;
  // ...
}
```

#### window.name 属性

浏览器窗口有 `window.name` 属性。这个属性的最大特点是，无论是否同源，只要在同一个窗口里，前一个网页设置了这个属性，后一个网页可以读取它。

父窗口先打开一个子窗口，载入一个不同源的网页，该网页将信息写入 `window.name` 属性。

```js
window.name = data;
```

接着，子窗口跳回一个与主窗口同域的网址。

```js
location = 'http://parent.url.com/xxx.html';
```

然后，主窗口就可以读取子窗口的 `window.name` 了。

```js
var data = document.getElementById('myFrame').contentWindow.name;
```

这种方法的优点是，`window.name` 容量很大，可以放置非常长的字符串；缺点是必须监听子窗口 `window.name` 属性的变化，影响网页性能。

### postMessage

上面两种方法都属于破解，HTML5 为了解决这个问题，引入了一个全新的 API：跨文档通信 API（Cross-document messaging）。

这个 API 为 window 对象新增了一个`window.postMessage`方法，允许跨窗口通信，不论这两个窗口是否同源。

举例来说，父窗口`http://aaa.com`向子窗口`http://bbb.com`发消息，调用 postMessage 方法就可以了。

```js
var popup = window.open('http://bbb.com', 'title');
popup.postMessage('Hello World!', 'http://bbb.com');
```

postMessage 方法的第一个参数是具体的信息内容，第二个参数是接收消息的窗口的源（origin），即"协议 + 域名 + 端口"。也可以设为*，表示不限制域名，向所有窗口发送。

子窗口向父窗口发送消息的写法类似。

```js
window.opener.postMessage('Nice to see you', 'http://aaa.com');

// 父窗口和子窗口都可以通过 message 事件，监听对方的消息。
window.addEventListener('message', function(e) {
  console.log(e.data);
},false);
```

通过 window.postMessage，也可以读取其他窗口的 LocalStorage。

```js
// 父
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = { name: 'Jack' };
win.postMessage(JSON.stringify({key: 'storage', data: obj}), 'http://bbb.com');

// 子
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') {
    return;
  }
  var payload = JSON.parse(e.data);
  localStorage.setItem(payload.key, JSON.stringify(payload.data));
};
```

### Ajax

CORS 作为主流的跨域解决方案，将单独讲解。

#### 反向代理

同源策略仅针对的是浏览器，服务器无限制。所以一种跨域请求的方法是浏览器向同源服务器发请求，同源服务器做代理，向目标服务器发请求，然后将结果转发给浏览器。

使用代理服务将使得请求链路变得更长，更耗时。
#### jsonp

通过 script 标签来访问服务器，服务器收到请求后将数据放在一个指定名字的函数里传回来。

优点是兼容性好，低版本浏览器也可使用。缺点是只能进行 get 请求。

这种方式也可以通过拼接 url 的方式进行传参，服务器可以根据不同参数返回不同脚本。

详细可参考 [手写系列 - jsonp](../javascript/handWritten.html#jsonp)

#### WebSocket

WebSocket 是一种通信协议，使用 `ws://`（非加密）和 `wss://`（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

上面代码中，有一个字段是 Origin，表示该请求的请求源（origin），即发自哪个域名。

## CORS

CORS 全称“跨域资源共享”(Cross-Origin Resource Sharing)，是一种基于 HTTP 头的机制，服务器端可以标示除了它自己以外的其它 origin（域，协议和端口）哪些可以进行跨域访问，这样浏览器端如果在标示的范围内，就可以跨域加载这些资源。

浏览器将 CORS 请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求。

```
// 请求方法是以下三种方法之一：
HEAD
GET
POST

// HTTP 的头信息不超出以下几种字段：
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain
```

这是为了兼容表单（form），因为历史上表单一直可以发出跨域请求。AJAX 的跨域设计就是，只要表单可以发，AJAX 就可以直接发。

凡是不同时满足上面两个条件，就属于非简单请求。

### 简单请求

对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是在头信息之中，增加一个 `Origin` 字段。

下面是一个例子，浏览器发现这次跨源 AJAX 请求是简单请求，就自动在头信息之中，添加一个 `Origin` 字段。

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

上面的头信息中，`Origin` 字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。

如果 `Origin` 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 `Access-Control-Allow-Origin` 字段（详见下文），就知道出错了，从而抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获。注意，这种错误无法通过状态码识别，因为 HTTP 回应的状态码有可能是 200。

如果 Origin 指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。

```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```

上面的头信息之中，有三个与 CORS 请求相关的字段，都以 Access-Control-开头。

### 复杂请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是 PUT 或 DELETE，或者 `Content-Type` 字段的类型是 `application/json`。

非简单请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求（preflight）。是否是复杂请求，是浏览器来判断的。

预检请求的作用是：浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。

如果服务器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。

```
// 浏览器控制台报错
XMLHttpRequest cannot load http://api.alice.com.
Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
```

一旦服务器通过了"预检"请求，以后每次浏览器正常的 CORS 请求，就都跟简单请求一样，会有一个 Origin 头信息字段。服务器的回应，也都会有一个 `Access-Control-Allow-Origin` 头信息字段。

```
// 预检请求通过时返回的请求头
Access-Control-Allow-Methods: GET, POST, PUT // 服务器支持的所有跨域方法
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000 // 本次预检请求的有效期，单位秒
```

### 与 JSONP 的比较

CORS 与 JSONP 的使用目的相同，但是比 JSONP 更强大。

JSONP 只支持 GET 请求，CORS 支持所有类型的 HTTP 请求。JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。

## 参考

- [浏览器的同源策略 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
- [跨域资源共享 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [浏览器同源策略及其规避方法 - 阮一峰](https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)