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

## 代码风格及代码中的分号问题

为了约定大家的代码风格，所以在社区中诞生了一些比较规范的代码风格规范：

- [JavaScript Standard Style](https://standardjs.com/)
- Airbnb JavaScript Style

+ 采用无分号时三种情况要注意

  - 当一行代码是以（、【、` 开头时，要补上分号

  - ```js
    // ;['苹果', '香蕉'].forEach(function (item) {
    //   console.log(item)
    // })
    
    // ` 是 EcmaScript 6 中新增的一种字符串包裹方式，叫做：模板字符串
    // 它支持换行和非常方便拼接变量
    ;`hello`.toString()
    
    // 当你采用了无分号的代码风格的时候，只需要注意以下情况就不会有上面的问题了：
    //    当一行代码是以：
    //        (
    //        [
    //        `
    //        开头的时候，则在前面补上一个分号用以避免一些语法解析错误。
    //    所以你会发现在一些第三方的代码中能看到一上来就以一个 ; 开头。
    ```

    

  - **结论：无论代码是否采用无分号的风格，都建议当一行代码以（、【、·开头的都在前面补上；**

## 像APHE一样

```js
var http = require('http')
var fs = require('fs')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 Server 的 request 请求事件，设置请求处理函数
//    请求
//      处理
//    响应
//    一个请求对应一个响应，如果在一个请求的过程中，已经结束响应了，则不能重复发送响应。
//    没有请求就没有响应。
// 
// 咱们以前使用过 Apache 服务器软件，这个软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览
// 127.0.0.1:80/a.txt
// 127.0.0.1:80/index.html
// 127.0.0.1:80/apple/login.html

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  var url = req.url
  // / index.html
  // /a.txt wwwDir + /a.txt
  // /apple/login.html wwwDir + /apple/login.html
  // /img/ab1.jpg wwwDir + /img/ab1.jpg
  if (url === '/') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      // if (err) {
      //   res.end('404 Not Found.')
      // } else {

      // }

      if (err) {
        // return 有两个作用：
        //  1. 方法返回值
        //  2. 阻止代码继续往后执行
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  } else if (url === '/a.txt') {
    fs.readFile(wwwDir + '/a.txt', function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  } else if (url === '/index.html') {
    fs.readFile(wwwDir + '/index.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  } else if (url === '/apple/login.html') {
    fs.readFile(wwwDir + '/apple/login.html', function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  }
})

// 3. 绑定端口号，启动服务
server.listen(3000, function () {
  console.log('running...')
})

```



+ 改进之后的代码，先将共同的路径提取出来---wwwDir,读取的文件的路径跟url获取的路径一样---filePath

+ ```js
  var http = require('http')
  var fs = require('fs')
  
  var server = http.createServer()
  
  var wwwDir = 'D:/Movie/www'
  
  server.on('request', function (req, res) {
    var url = req.url
    // / index.html
    // /a.txt wwwDir + /a.txt
    // /apple/login.html wwwDir + /apple/login.html
    // /img/ab1.jpg wwwDir + /img/ab1.jpg
    
  
    var filePath = '/index.html'
    if (url !== '/') {
      filePath = url
    }
  
    fs.readFile(wwwDir + filePath, function (err, data) {
      if (err) {
        return res.end('404 Not Found.')
      }
      res.end(data)
    })
  })
  
  // 3. 绑定端口号，启动服务
  server.listen(3000, function () {
    console.log('running...')
  })
  
  ```

  + 读取文件夹   fs.readdir
  
    ```js
    var fs = require('fs')
    
    fs.readdir('D:/Movie/www', function (err, files) {
      if (err) {
        return console.log('目录不存在')
      }
      console.log(files)
    })
    ```
  
    

+ Aphe的列表渲染

```js
var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = 'D:/Movie/www'

server.on('request', function (req, res) {
  var url = req.url
  fs.readFile('./template.html', function (err, data) {
    if (err) {
      return res.end('404 Not Found.')
    }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //    fs.readdir
    // 2. 如何将得到的文件名和目录名替换到 template.html 中
    //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
    //    2.2 根据 files 生成需要的 HTML 内容
    // 只要你做了这两件事儿，那这个问题就解决了
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      // 2.1 生成需要替换的内容
      var content = ''
      files.forEach(function (item) {
        // 在 EcmaScript 6 的 ` 字符串中，可以使用 ${} 来引用变量
        content += `
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">${item}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
          </tr>
        `
      })

      // 2.3 替换
      data = data.toString()
      data = data.replace('^_^', content)

      // 3. 发送解析替换过后的响应数据
      res.end(data)
    })
  })
})
server.listen(3000, function () {
  console.log('running...')
})
```

## 模板引擎

### art-template

+ art-template 不仅可以在浏览器使用，也可以在 node 中使用

+ 安装：

    npm install art-template

    该命令在哪执行就会把包下载到哪里。默认会下载到 node_modules 目录中

    node_modules 不要改，也不支持改。

+   注意：在浏览器中需要引用 lib/template-web.js 文件

  ​    

+ 在 Node 中使用 art-template 模板引擎

   模板引起最早就是诞生于服务器领域，后来才发展到了前端。

  + 安装 npm install art-template

  + 在需要使用的文件模块中加载 art-template

    1. 只需要使用 require 方法加载就可以了：require('art-template')
    2. 参数中的 art-template 就是你下载的包的名字
    3.  也就是说你 isntall 的名字是什么，则你 require 中的就是什么

  + .查文档，使用模板引擎的 API

   **强调：模板引擎不关心你的字符串内容，只关心自己能认识的模板标记语法，例如 {{}}，{{}} 语法被称之为 mustache 语法，八字胡啊.**
  
  + ```js
     //默认读取到的 data 是二进制数据
      // 而模板引擎的 render 方法需要接收的是字符串
      // 所以我们在这里需要把 data 二进制数据转为 字符串 才可以给模板引擎使用
     template.render('模板字符串',替换对象)
      var ret = template.render(data.toString(), {
        name: 'Jack',
        age: 18,
        province: '北京市',
        hobbies: [
          '写代码',
          '唱歌',
          '打游戏'
        ],
        title: '个人信息'
      })
      
      
      Aphe中引入art-template
    server.on('request', function (req, res) {
      var url = req.url
      fs.readFile('./template-apache.html', function (err, data) {
        if (err) {
          return res.end('404 Not Found.')
        }
     // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
        //    fs.readdir
        // 2. 如何将得到的文件名和目录名替换到 template.html 中
        //    2.1 在 template.html 中需要替换的位置预留一个特殊的标记（就像以前使用模板引擎的标记一样）
        //    2.2 根据 files 生成需要的 HTML 内容
        // 只要你做了这两件事儿，那这个问题就解决了
        fs.readdir(wwwDir, function (err, files) {
          if (err) {
            return res.end('Can not find www dir.')
          }
    
          // 这里只需要使用模板引擎解析替换 data 中的模板字符串就可以了
          // 数据就是 files
          // 然后去你的 template.html 文件中编写你的模板语法就可以了
          var htmlStr = template.render(data.toString(), {
            title: '哈哈',
            files: files
          })
    
          // 3. 发送解析替换过后的响应数据
          res.end(htmlStr)
            
            
          // template-apache.html 
          {{each files}}
          <tr>
            <td data-value="apple/"><a class="icon dir" href="/D:/Movie/www/apple/">{{$value}}/</a></td>
            <td class="detailsColumn" data-value="0"></td>
            <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
          </tr>
        {{/each}}
    ```
  
    + **《编写可维护的JavaScript》-- 使代码变得更漂亮**

## 客户端渲染和服务端渲染

### 服务端渲染---

在服务端使用模板引擎（直接在服务端渲染页面和数据）

- 只请求了一次
- 服务端渲染更快，响应的是最终的结果，客户端不需要再做任何处理

<img src="C:\Users\17746\AppData\Roaming\Typora\typora-user-images\1567665138419.png" alt="1567665138419" style="zoom:50%;" />

### 客户端渲染---

最少经过两次请求，第一次拿到的是页面，第二次拿到的是页面的动态数据,异步请求，局部刷新

- 页面显示比较快，之后是数据显示

+ <img src="C:\Users\17746\AppData\Roaming\Typora\typora-user-images\1567664808300.png" alt="1567664808300" style="zoom:50%;" />

### 如何看是客户端渲染还是服务端渲染？

1. 右键查看源代码能看到的就是服务端渲染的

2. 评价就是客户端渲染的，页面没有刷新，异步更快
3. 客户端异步渲染(ajax)的不利于SEO优化，服务端渲染是可以被爬虫抓取到的，有利于seo
4. 服务端渲染和客户端渲染的区别
   - 客户端渲染不利于 SEO 搜索引擎优化
   - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
   - 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
   - 而是两者结合来做的
   - 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
   - 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染

## 处理网站中的静态资源

+ 把当前模块所有的依赖项都声明再文件模块最上面

+  为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中

+   浏览器收到 HTML 响应内容之后，就要开始从上到下依次解析，

  ​    当在解析的过程中，如果发现：

  ​      link

  ​      script

  ​      img

  ​      iframe

  ​      video

  ​      audio

  ​    等带有 src 或者 href（link） 属性标签（具有外链的资源）的时候，浏览器会自动对这些资源发起新的请求。

+   **我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中**  

+ /public/css/main.css

  ​      // /public/js/main.js

  ​      // /public/lib/jquery.js

  ​      // 统一处理：

  ​      //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源

  ​      //    所以我们就直接可以把请求路径当作文件路径来直接进行读取

  ```js
  url.indexOf('/public/') === 0)   //判断是不是以public开头的请求
  fs.readFile('.' + url, function (err, data) {//一定要加点
      
      html
       注意：在服务端中，文件中的路径就不要去写相对路径了。
        因为这个时候所有的资源都是通过 url 标识来获取的
        我的服务器开放了 /public/ 目录
        所以这里的请求路径都写成：/public/xxx
        / 在这里就是 url 根路径的意思。
        浏览器在真正发请求的时候会最终把 http://127.0.0.1:3000 拼上
  
        不要再想文件路径了，把所有的路径都想象成 url 地址
    
    <link rel="stylesheet" href="/public/lib/bootstrap/dist/css/bootstrap.css">
  ```

  在服务器设置的url==='/post'请求的文件和html中href设置的请求页面是一样的

  ```js
  html
  <a class="btn btn-success" href="/post">发表留言</a>
  
  app.js
   else if (url === '/post') {
        // 其它的都处理成 404 找不到
        fs.readFile('./views/post.html', function (err, data) {
          if (err) {
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
  ```

## 处理表单提交

### get提交

+  以前表单是如何提交的？

  ​      表单中需要提交的表单控件元素必须具有 name 属性

  ​      表单提交分为：

          1. 默认的提交行为
             2. 表单异步提交

     action 就是表单提交的地址，说白了就是请求的 url 地址

  ​        method 请求方法

  ​            get

  ​            post

```html
 <form action="/pinglun" method="get">
      <div class="form-group">
        <label for="input_name">你的大名</label>
        <input type="text" class="form-control" required minlength="2" maxlength="10" id="input_name" name="name" placeholder="请写入你的姓名">
      </div>
      <div class="form-group">
        <label for="textarea_message">留言内容</label>
        <textarea class="form-control" name="message" id="textarea_message" cols="30" rows="10" required minlength="5" maxlength="20"></textarea>
      </div>
      <button type="submit" class="btn btn-default">发表</button>
    </form>
```

+ 请求路径的判断

  - // /pinglun?name=的撒的撒&message=的撒的撒的撒

    // 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容

    // 所以你不可能通过去判断完整的 url 路径来处理这个请求

  - 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交表单的请求过来了

  url.parse(请求路径)：

     url.pathname:不包含？以及问号之后的内容

     url.query:得到查询字符串，？之后的内容

  ```js
  // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
      var parseObj = url.parse(req.url, true)
  
      // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
      var pathname = parseObj.pathname
  ```

  完整实例

  ```js
  // app application 应用程序
  // 把当前模块所有的依赖项都声明再文件模块最上面
  // 为了让目录结构保持统一清晰，所以我们约定，把所有的 HTML 文件都放到 views（视图） 目录中
  // 我们为了方便的统一处理这些静态资源，所以我们约定把所有的静态资源都存放在 public 目录中
  // 哪些资源能被用户访问，哪些资源不能被用户访问，我现在可以通过代码来进行非常灵活的控制
  // / index.html
  // /public 整个 public 目录中的资源都允许被访问
  // 前后端融会贯通了，为所欲为
  
  var http = require('http')
  var fs = require('fs')
  var url = require('url')
  var template = require('art-template')
  
  var comments = [
    {
      name: '张三',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三2',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三3',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三4',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三5',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    }
  ]
  
  // /pinglun?name=的撒的撒&message=的撒的撒的撒
  // 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
  // 所以你不可能通过去判断完整的 url 路径来处理这个请求
  // 
  // 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交表单的请求过来了
  
  http
    .createServer(function (req, res) { // 简写方式，该函数会直接被注册为 server 的 request 请求事件处理函数
      // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
      var parseObj = url.parse(req.url, true)
  
      // 单独获取不包含查询字符串的路径部分（该路径不包含 ? 之后的内容）
      var pathname = parseObj.pathname
  
      if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
          if (err) {
            return res.end('404 Not Found.')
          }
          var htmlStr = template.render(data.toString(), {
            comments: comments
          })
          res.end(htmlStr)
        })
      } else if (url === '/post') {
        // 其它的都处理成 404 找不到
        fs.readFile('./views/post.html', function (err, data) {
          if (err) {
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
      } else if (url.indexOf('/public/') === 0) {
        // /public/css/main.css
        // /public/js/main.js
        // /public/lib/jquery.js
        // 统一处理：
        //    如果请求路径是以 /public/ 开头的，则我认为你要获取 public 中的某个资源
        //    所以我们就直接可以把请求路径当作文件路径来直接进行读取
        fs.readFile('.' + pathname, function (err, data) {//一定要加点
          if (err) {
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
      } else if (pathname === '/pinglun') {
        // 注意：这个时候无论 /pinglun?xxx 之后是什么，我都不用担心了，因为我的 pathname 是不包含 ? 之后的那个路径
        // 一次请求对应一次响应，响应结束这次请求也就结束了
        // res.end(JSON.stringify(parseObj.query))
  
        // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
        // 所以接下来要做的就是：
        //    1. 获取表单提交的数据 parseObj.query
        //    2. 将当前时间日期添加到数据对象中，然后存储到数组中
        //    3. 让用户重定向跳转到首页 /
        //       当用户重新请求 / 的时候，我数组中的数据已经发生变化了，所以用户看到的页面也就变了
        var comment = parseObj.query
        comment.dateTime = '2017-11-2 17:11:22'
        comments.unshift(comment)
        // 服务端这个时候已经把数据存储好了，接下来就是让用户重新请求 / 首页，就可以看到最新的留言内容了
  
        // 如何通过服务器让客户端重定向？
        //    1. 状态码设置为 302 临时重定向
        //        statusCode
        //    2. 在响应头中通过 Location 告诉客户端往哪儿重定向
        //        setHeader
        // 如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location ，然后对该地址发起新的请求
        // 所以你就能看到客户端自动跳转了
        res.statusCode = 302
        res.setHeader('Location', '/')
        res.end()
      } else {
        // 其它的都处理成 404 找不到
        fs.readFile('./views/404.html', function (err, data) {
          if (err) {
            return res.end('404 Not Found.')
          }
          res.end(data)
        })
      }
    })
    .listen(3000, function () {
      console.log('running...')
    })
  
  // Node 不适合从来没有接触过服务端的人学习
  // 如果想要真正的学号服务端，还是老牌的 Java、PHP 这些平台
  // Node 不是特别适合入门服务端，但不代表 Node 不强大
  // Node 很厉害，具有经验的人可以玩儿的非常的牛
  // 不适合新手的原因就在于比较偏底层、而且太灵活
  // Java、PHP 好入门的原因就在于：这些平台屏蔽了一些底层
  // res.redirect('重定向')
  
  
  // 晚上写案例照着下面的步骤写：
  // 1. / index.html
  // 2. 开放 public 目录中的静态资源
  //    当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
  // 3. /post post.html
  // 4. /pinglun
  //    4.1 接收表单提交数据
  //    4.2 存储表单提交的数据
  //    4.3 让表单重定向到 /
  //        statusCode
  //        setHeader
  
  ```

  