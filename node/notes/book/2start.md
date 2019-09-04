## 安装

+ 查看当前node环境的版本号
  - 任何一个命令行工具输入   node  --version

+ 下载：https://nodejs.org/en/download
  - 自己使用用current最新版本
  - 项目用LTS版 长期支持板
+ 安装
  - 对于已经安装的重新安装会覆盖之前的版本，自己升级
  - 傻瓜式的一路next
+ 确认node环境是否安装成功
  - 打开命令行，输入 node --version或者 node --v   能输出版本说明成功

## HELLO WORLD--解析执行JavaScript

+ 创建js文件

+ 2、打开终端，定位到脚本文件所属目录---命令行切换到js文件所在的目录 

  - 例如  系统自带的命令行   cd d:        cd 目录   
- dos命令在有道云中
  
+ 3、利用cmd运行文件,输入node 文件名来运行相应文件

  -  node hello.js

  **注意：文件名不能直接是node.js，最好不要直接使用中文**

  

## 读取文件简介

+ 浏览器中的 JavaScript 是没有文件操作的能力的

+ // 在 Node 中，采用 EcmaScript 进行编码

  // 没有 BOM、DOM

  // 和浏览器中的 JavaScript 不一样

  console.log(window)

  console.log(document)

+  但是 Node 中的 JavaScript 具有文件操作的能力

+ fs 是 file-system 的简写，就是文件系统的意思

+  在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块

+ 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API

  fs.readFile 就是用来读取文件的

  + 第一个参数就是要读取的文件路径
  
  + 第二个参数是一个回调函数（两个参数   err,data）
  
  + ```js
    fs.readFile('./data/a.txt', function (error, data) {
        
    })
    ```
  
    

## 写文件简介

+ 第一个参数：文件路径

+ 第二个参数：文件内容

+ 第三个参数：回调函数（一个参数）

+ ```js
  fs.writeFile('./data/你好.md', '大家好，给大家介绍一下，我是Node.js', function (error) {
      
  })
  ```

  

## http简介

可以使用 Node 非常轻松的构建一个 Web 服务器,在 Node 中专门提供了一个核心模块：http，http 这个模块的职责就是帮你创建编写服务器的

+ ```js
  // 1. 加载 http 核心模块
  var http = require('http')
  // 2. 使用 http.createServer() 方法创建一个 Web 服务器
  //    返回一个 Server 实例
  var server = http.createServer()
   // 3. 注册 request 请求事件
  //    当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行第二个参数：回调处理函数
  server.on('request', function () {
    console.log('收到客户端的请求了')
  })
  
  // 4. 绑定端口号，启动服务器
  server.listen(3000, function () {
    console.log('服务器启动成功了，可以通过 http://127.0.0.1:3000/ 来进行访问')
  })
  ```
  
+ request 请求事件处理函数，需要接收两个参数：

  - Request 请求对象

    -  请求对象可以用来获取客户端的一些请求信息，例如请求路径

  -  Response 响应对象

    - 应对象可以用来给客户端发送响应消息

  - ```js
    server.on('request', function (request, response) {
      // http://127.0.0.1:3000/ /
      // http://127.0.0.1:3000/a /a
      // http://127.0.0.1:3000/foo/b /foo/b
      console.log('收到客户端的请求了，请求路径是：' + request.url)
    
      // response 对象有一个方法：write 可以用来给客户端发送响应数据
      // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
      response.write('hello')
      response.write(' nodejs')
    
      // 告诉客户端，我的话说完了，你可以呈递给用户了
      response.end()
    ```

+ 根据不同的请求路径发送不同的响应结果

+ ```js
  var http = require('http')
  
  // 1. 创建 Server
  var server = http.createServer()
  
  // 2. 监听 request 请求事件，设置请求处理函数
  server.on('request', function (req, res) {
    console.log('收到请求了，请求路径是：' + req.url)
    console.log('请求我的客户端的地址是：', req.socket.remoteAddress, req.socket.remotePort)
  
    // res.write('hello')
    // res.write(' world')
    // res.end()
  
    // 上面的方式比较麻烦，推荐使用更简单的方式，直接 end 的同时发送响应数据
    // res.end('hello nodejs')
  
    // 根据不同的请求路径发送不同的响应结果
    // 1. 获取请求路径
    //    req.url 获取到的是端口号之后的那一部分路径
    //    也就是说所有的 url 都是以 / 开头的
    //    例如：127.0.0.1：3000/aba/b   req.url=/aba/b
    // 2. 判断路径处理响应
  
    var url = req.url
  
    if (url === '/') {
      res.end('index page')
    } else if (url === '/login') {
      res.end('login page')
    } else if (url === '/products') {
      var products = [{
          name: '苹果 X',
          price: 8888
        },
        {
          name: '菠萝 X',
          price: 5000
        },
        {
          name: '小辣椒 X',
          price: 1999
        }
      ]
      // 响应内容只能是二进制数据或者字符串
      //  数字、对象、数组、布尔值不行
      res.end(JSON.stringify(products))//数组转成字符串
    } else {
      res.end('404 Not Found.')
    }
  })
  
  // 3. 绑定端口号，启动服务
  server.listen(3000, function () {
    console.log('服务器启动成功，可以访问了。。。')
  })
  ```
  
+ 通过网络发送文件

  - 发送的并不是文件，本质上来讲发送是文件的内容
  - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

## node中的JavaScript

+ ECMAjavascript
+ 核心模块
+ 自定义模块
+ 第三方模块

### 核心模块

- 在node为js提供了很多服务器级别的api,这些api绝大多数被包装到了一个具名的核心模块中

  - 例如文件操作的fs模块，http服务构建的http模块,path路径操作模块，os获取操作信息模块

- 只要是核心模块都要require

  ```js
  const fs = require('fs');
  ```
  
- 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如

  - fs 文件操作模块
  - http 网络服务构建模块
  - os 操作系统信息模块
  - path 路径处理模块
  - 。。。。

  - 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
    - `var fs = require('fs')`

### 模块系统

- 在 Node 中没有全局作用域的概念

- 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件

- require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题

  - 模块完全是封闭的
  - 外部无法访问内部
  - 内部也无法访问外部

- 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题

- 但是某些情况下，模块与模块是需要进行通信的

- 在每个模块中，都提供了一个对象：`exports`

- 该对象默认是一个空对象

- 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中

- 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象

  

+ require
  - require 的扩展名--require不仅仅可以载入js模块，也可以载入json对象（大部分用于读取配置）
  
  - require加载文件时可以省略扩展名             按js,json,node的格式去查找文件，载入module目录中package.json中main指向的文件，载入目录module中的index.js文件
  
  - 加载机制
  
    - ./ :按照相对路径从当前文件所在文件夹开始查找文件，加载文件，不然认为加载的是核心模块（模块名重复，系统模块的优先级最高）
  
    - ../   :按照相对路径，从上层目录中查找文件
  
  - require 是一个方法
  
    - 它的作用就是用来加载执行模块当中的代码
    -  在 Node 中，模块有三种：
    - - 具名的核心模块，例如 fs、http 
      -   用户自己编写的文件模块 
      -    相对路径必须加 ./ 
      -    可以省略后缀名
      -    相对路径中的 ./ 不能省略，否则报错
      -   在 Node 中，没有全局作用域，只有模块作用域（文件作用域，超出这个文件的都不管用）
        - 外部访问不到内部  内部也访问不到外部     默认都是封闭的
      -    既然是模块作用域，那如何让模块与模块之间进行通信
      -    有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要是为了使用里面的某个成员
  
  - require 方法有两个作用：
  
    1. 加载文件模块并执行里面的代码
  
    2. 拿到被加载文件模块导出的接口对象
  
  - 在每个文件模块中都提供了一个对象：exports
  
    1、 exports 默认是一个空对象
  
    2、  你要做的就是把所有需要被外部访问的成员挂载到这个 exports 对象中
  
+ exports

## ip和端口号

+ 所有联网的程序都需要进行网络通信
  - 计算机中只有一个物理网卡，而且在同一个局域网中，网卡的地址必须是唯一的
  - 网卡是通过唯一的ip地址来进行定位的
+ ip地址用来定位计算机，端口号定位具体的应用程序，所有联网的程序都必须具有端口号

```js
//获取客户端的请求地址    
req.socket.remoteAddress
//获取客户端的请求端口号
req.socket.remotePort
```

- 端口号的范围从0-65536（开发过程中不使用一些知名的端口号，百度-端口号，使用一些3000,5000,8000没有意义的端口号）
- 浏览器默认使用80端口

##  Content-Type内容类型

+ Content-Type

- 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
- 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
- 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题

```js
if (url === '/plain') {
    // text/plain 就是普通文本
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界')
  } else if (url === '/html') {
    // 如果你发送的是 html 格式的字符串，则也要告诉浏览器我给你发送是 text/html 格式的内容
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<p>hello html <a href="">点我</a></p>')
  }else if (url === '/xiaoming') {
    // url：统一资源定位符
    // 一个 url 最终其实是要对应到一个资源的
    fs.readFile('./resource/ab2.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end('文件读取失败，请稍后重试！')
      } else {
        // data 默认是二进制数据，可以通过 .toString 转为咱们能识别的字符串
        // res.end() 支持两种数据类型，一种是二进制，一种是字符串
        // 图片就不需要指定编码了，因为我们常说的编码一般指的是：字符编码
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
```

+ http://tool.oschina.net/        
  - 查看content-type    http://tool.oschina.net/commons
+ 通过网络发送文件
  - 发送的并不是文件，本质上来讲发送是文件的内容
  - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理