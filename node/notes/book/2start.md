安装

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

- 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件，没有script标签

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

#### 基本规则

+ 使用node编写应用程序就是在使用
  - ECMAscript语言
    - 和浏览器不一样，在node中没有BOM和DOM
  - 核心模块
    - 文件件操作的fs
    - http服务的http
    - url路径操作模块
    - path路径处理模块
    - os操作系统信息
  - 第三方模块
    - art-template  必须通过npm下载
  - 自己写的模块

#### 什么是模块化

+ 文件作用域  ---  文件之间不会相互污染
+ 通信规则   
  -  加载    require
  - 导出

### commonjs模块规范

在NODE中的JavaScript还有一个很重要的概念：模块系统

+ 模块作用域，在 Node 中没有全局作用域的概念
+ 使用require方法加载模块
+ 使用exports接口对象导出模块中的成员

```js
var foo = 'bar'

function add(x, y) {
  return x + y
}

// 这种方式不行。
// exports = add

// 如果一个模块需要直接导出某个成员，而非挂载的方式
// 那这个时候必须使用下面这种方式
module.exports = 'hello'

module.exports = function (x, y) {
  return x + y
}

module.exports = {
  add: function () {
    return x + y
  },
  str: 'hello'
}

// 你可以认为在每个模块的最后 return 了这个 exports

// 只能得到我想要给你的成员
// 这样做的目的是为了解决变量命名冲突的问题
// exports.add = add

// exports 是一个对象
// 我们可以通过多次为这个对象添加成员实现对外导出多个内部成员

// exports.str = 'hello'

// 现在我有一个需求：
// 我希望加载得到直接就是一个：
//  方法
//  字符串
//  数字
//  数组

```

#### 加载    require

+ 语法

  - var 自定义变量名称 = require('模块')

+ 作用

  - 执行被加载模块中的代码
  - 得到被加载模块中的exports导出接口对象

+ 加载规则

  - 优先从缓存加载
  - 不会重复执行，只会拿到接口对象
  - 可以拿到其中的接口对象，但是不会重复执行里面的代码
  - 这样做的目的是为了避免重复加载，提高模块加载效率

+ 判断模块标识

  - 如果是非路径形式的模块标识

    +  路径形式的模块：

    1. ./ 当前目录，不可省略

    2.  ../ 上一级目录，不可省略

    3.  /xxx 几乎不用

    4.  d:/a/foo.js 几乎不用

    5.  首位的 / 在这里表示的是当前文件模块所属磁盘根路径

    6. .js 后缀名可以省略           require('./foo.js')

  - 核心模块的本质也是文件

    1. 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了

    2.  require('fs')       require('http'）

  - 第三方模块

    1. 凡是第三方模块都必须通过 npm 来下载

    2. 使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用

    3. 不可能有任何一个第三方包和核心模块的名字是一样的

    4. 既不是核心模块、也不是路径形式的模块

    5.  先找到当前文件所处目录中的 node_modules 目录

          node_modules/art-template

          node_modules/art-template/package.json 文件

          node_modules/art-template/package.json 文件中的 main 属性

          main 属性中就记录了 art-template 的入口模块

          然后加载使用这个第三方包

          实际上最终加载的还是文件

    

    6. 如果 package.json 文件不存在或者 main 指定的入口模块是也没有,则 node 会自动找该目录下的 index.js,也就是说 index.js 会作为一个默认备选项

       

    7. 如果以上所有任何一个条件都不成立，则会进入上一级目录中的 node_modules 目录查找

    ​               如果上一级还没有，则继续往上上一级查找

    ​                。。。

    ​                如果直到当前磁盘根目录还找不到，最后报错：

    ​                    can not find module xxx

    ​                  var template = require('art-template')

    

    注意：我们一个项目有且只有一个 node_modules，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包

    不会出现有多个 node_modules

    + 模块查找机制

         优先从缓存加载

         核心模块

         路径形式的文件模块

         第三方模块

      ​     node_modules/art-template/

      ​     node_modules/art-template/package.json

      ​     node_modules/art-template/package.json main

      ​     index.js 备选项

      ​     进入上一级目录找 node_modules

      ​     按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx

         一个项目有且仅有一个 node_modules 而且是存放到项目的根目录

  #### 导出   exports

+ node是模块作用域，默认文件中所以的成员只在当前文件模块有效,

+ 对于希望可以被其他模块访问的成员，我们需要把这些公开的成员都挂载到exports接口对象中就可以了

  导出多个成员（必须在对象中）:

  ```javascript
  exports.a = 123
  exports.b = 'hello'
  exports.c = function(){
      
  }
  ```

  导出单个成员（拿到的就是：函数、字符串）:

```javascript
	module.exports = 'hello'

```

以下情况会覆盖

```javascript
module.exports = 'hello'
module.exports = function(x,y){
    return x+y
}
//以上情况后者会覆盖前者
```

也可以这样导出多个成员：

```javascript
module.exports = {
    add:function(x,y){
        return x+y
    },
    str:'hello'
}
```

#### 301 和 302 状态码区别

- 301 永久重定向，浏览器会记住
- 302 临时重定向

#### 原理解析(exports和module.exports的区别)

exports是``module.exports``的一个引用

```javascript
/ 两者一致，那就说明，我可以使用任意一方来导出内部成员
// console.log(exports === module.exports)  // =>true

exports.foo = 'bar'
//等价于
module.exports.foo = 'bar'



// 在 Node 中，每个模块内部都有一个自己的 module 对象
// 该 module 对象中，有一个成员叫：exports 也是一个对象
// 也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports 中

// 我们发现，每次导出接口成员的时候都通过 module.exports.xxx = xxx 的方式很麻烦，点儿的太多了
// 所以，Node 为了简化你的操作，专门提供了一个变量：exports 等于 module.exports

// var module = {
//   exports: {
//     foo: 'bar',
//     add: function
//   }
// }

// return module.exports
```

+ 真正去使用的时候：

     导出多个成员：exports.xxx = xxx

   导出多个成员也可以：module.exports = {

  ​                     }

  导出单个成员：module.exports

如果你实在分不清楚 exports 和 module.exports，你可以选择忘记 exports，而只使用 module.exports 也没问题

exports 和 module.exports 的区别

- 每个模块中都有一个 module 对象
- module 对象中有一个 exports 对象
- 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
- 也就是：`moudle.exports.xxx = xxx` 的方式
- 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
- 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
- `exports === module.exports` 结果为  `true`s
- 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
- 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
- 不要使用 `exports = xxx` 不管用
- 因为每个模块最终向外 `return` 的是 `module.exports`
- 而 `exports` 只是 `module.exports` 的一个引用
- 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
- 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的
- 之所以让大家明白这个道理，是希望可以更灵活的去用它

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

## 修改完代码自动重启服务器

第三方工具nodemon

```shell
node install --global nodemon
```

安装完毕之后使用

```shell
node app.js
//安装nodemon之后
nodemon app.js
```

只要通过nodemon启动服务，它就会监视文件的变化，当文件发生变化时自动帮你重启服务器。

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
    
  + art-template中的include-extand-block语法
  
  + https://aui.github.io/art-template/zh-cn/docs/syntax.html
  
     ```html
     {{extend './layout.html'}}
     
     {{ block 'head' }}
     <style>
       body {
         background-color: skyblue;
       }
     </style>
     {{ /block }}
     
     {{ block 'content' }}
     <div>
       <h1>index 页面填坑内容</h1>
     </div>
     {{ /block }}
     
     {{ block 'script' }}
     <script>
       window.alert('index 页面自己的 js 脚本')
     </script>
     {{ /block }}
     
     ```
  
     

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

  表单具有默认的提交行为（get和post），默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。

​      表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。

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

  

## each和foreach

jQuery 的 each 和 原生的 JavaScript 方法 forEach

- EcmaScript 5 提供的
  - 不兼容 IE 8
- jQuery 的 each 由 jQuery 这个第三方库提供
  - jQuery 2 以下的版本是兼容 IE 8 的
  - 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
  - 同时它也可以作为低版本浏览器中 forEach 替代品
  - jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用
  - `[].slice.call(jQuery实例对象)`

// IE 8 不支持
    // ;['abc', 'd', 'efg'].forEach(function (item, index) {
    //   console.log(item)
    // })



```js
// 遍历 jQuery 元素
// $.each(['abc', 'd', 'efg'], function (index, item) {
//   console.log(item)
// })

console.log($('div'))

// 伪数组是对象
// 对象的原型链中没有 forEach
// 对象的原型链是 Object.prototype

// 这个 each 是 jQuery 提供的
// 这个 each 在 jQuery 的原型链中
// $('div').each(function (index, item) {
//   console.log(item)
// })

// jQuery 不是专门用来遍历 jQuery 元素的
// 1. 方便的遍历 jQuery 元素
// 2. 可以在不兼容 forEach 的低版本浏览器中使用 jQuery 的 each 方法
      [].slice.all将伪数组转换为数据
// ;[].slice.call($('div')).forEach(function (item) {console.log(item)})
```

## npm

+ npm全称：node package manager

### npm网站

+ http://www.npmjs.com

### npm命令行工具

npm第二层含义是一个命令行工具，只要你安装了node就安装了npm，npm也有版本概念

```javascript
npm --version
```

npm升级(自己升级自己)     

```javascript
npm install --global npm
```

### npm常用命令

+ npm  init 
  - npm  init -y  跳过向导快速生成package.json
+ npm install
  - 一次性把dependencies选项中的包下载
  - npm i
+ npm install 包名    
  -  单纯下载
+ npm install --save  包名   
  -  npm i --S   
  - 下载并保存依赖项（生成package.json中的dependencies选项）
+ npm uninstall  包名    
+ npm un 删除包，有依赖项会依然存在
+ npm uninstall --save  
  - 删除包和依赖项    
  -  npm un --S
+ npm --help    查看使用帮助
+ npm  命令 --help     
  - npm uninstall --help   
  - 查看具体命令的使用帮助

### 解决npm被墙问题

npm存储包的服务器在国外，下载包速度比较慢，所以需要解决这个问题

- http://npm.taobao.org/      淘宝的开发团队把npm在国内做了一个备份

- 安装淘宝的cnpm

  ```javascript
  //在任意目录下执行都可以
  --global不能省略
  npm install --global cnpm
  ```

  接下来安装包的时候就把npm换成cnpm

  不想安装cnpm又想通过淘宝的服务器下载     

  npm install -g jquery--registry=https://registry.npm.taobao.org；

  可以将这条代码加入配置文件 

  ```javascript
  npm config set registry=https://registry.npm.taobao.org  
  ```

  如何查看配置是否成功      ``npm config list``

## package.json

建议每个项目都要有一个package.json文件，就像说明书一样进行描述

+ npm init 创建项目的向导，像安装软件时候的指引一样，内容会写到package.json文件当中

  文件可以通过npm init 进行初始化，生成package.json文件

  + 目前来讲，最有用的是dependencies选项，用来帮我们保存第三方包的依赖信息
  + npm i --save 包名下载包时在package.json文件中会添加dependencies (依赖项)名
  + ``npm install``    如果node-modules丢失了，这个命令会自动把package.json文件中dependencies中的依赖项的包都安装回来

## Express

原生的http在某些方面不足以应对我们的开发需求，所以需要使用框架来加快我们的开发效率，模块的目的就是加快效率，让我们的代码高度统一

+ express中使用模板引擎         https://aui.github.io/art-template/express/
+ 

```javascript
// 1. 引包
var express = require('express')

// 2. 创建你服务器应用程序
//    也就是原来的 http.createServer
var app = express()
// 在 Express 中开放资源就是一个 API 的事儿
// 公开指定目录
// 只要这样做了，你就可以直接通过 /public/xx 的方式访问 public 目录中的所有资源了
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/node_modules/', express.static('./node_modules/'))

app.get('/about', function (req, res) {
  // 在 Express 中可以直接 req.query 来获取查询字符串参数
  console.log(req.query)
  res.send('你好，我是 Express!')
})
app.get('/pinglun', function (req, res) {
  // req.query
  // 在 Express 中使用模板引擎有更好的方式：res.render('文件名， {模板对象})
  // 可以自己尝试去看 art-template 官方文档：如何让 art-template 结合 Express 来使用
})
//设置没找到的请求页面，返回404
app.use(function(req,res){
    
})
// 相当于 server.listen
app.listen(3000, function () {
  console.log('app is running at port 3000.')
})
```

### 起步

### 安装

```shell
npm install --save express
```

### hello world

```javascript
var express = require('express')

// 1. 创建 app
var app = express()

// 当以 /public/ 开头的时候，去 ./public/ 目录中找找对应的资源
// 这种方式更容易辨识，推荐这种方式
// app.use('/public/', express.static('./public/'))

// 必须是 /a/puiblic目录中的资源具体路径
// app.use('/abc/d/', express.static('./public/'))

// 当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问
// 这种方式的好处就是可以省略 /public/
app.use(express.static('./public/'))


app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, function () {
  console.log('express app is running ...')
})

```

### 基本路由

路由器：路由其实就是一张表，表里面有具体的映射关系

+ 请求方法
+ 请求路径
+ 请求函数

get:

```javascript
//当以get请求/的时候，执行对应的处理函数
app.get('/', function (req, res) {
  res.send('hello world')
})
```

post:

```javascript
//当以post请求/的时候，执行对应的处理函数
app.post('/', function (req, res) {
  res.send('hello world')
})
```

### 静态服务

```javascript
// 当以 /public/ 开头的时候，去 ./public/ 目录中找找对应的资源
app.use('/public/', express.static('./public/'))
app.use('/static/', express.static('./static/'))
app.use('/node_modules/', express.static('./node_modules/'))

 //当省略第一个参数的时候，则可以通过 省略 /public 的方式来访问
// 这种方式的好处就是可以省略 /public/
//访问public的资源的时候，可以不用输/public,直接输里面的资源名称路径
app.use(express.static('./public/'))
//访问public的资源的时候，可以不用输/public,直接输里面的资源名称路径
```

### 在express当中配置使用art-template

安装

```powershell
npm install --save art-template
npm install --save express-art-template
```

```javascript
//配置使用art-template模板引擎
//第一个参数 表示当渲染以 .art 结尾的文件时，使用art-template模板引擎将art改为需要渲染的文件的后缀名
//express-art-template专门用来在express中把art-template整合到express中
//虽然外面不需要加载art-template但是也必须安装，原因在于express-art-template依赖了art-template
app.engine('art', require('express-art-template'));
// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中
```

修改默认的views目录

```javascript
app.set('views', render函数的默认路径)
```

使用：

```javascript
app.get('/', function (req, res) {
    //express默认会去views目录渲染路径中找index.html
  res.render('index.html', {
    title: 'comments'
  })
})
```

### 在express中获取get请求参数

``在express中内置了一个api,可以通过req.query来获取``

```javascript
app.get('/pinglun', function (req, res) {
//   var comment = req.query   //获取get参数中的问号后面的字符串，并转成数组
//   comment.dateTime = '2017-11-5 10:58:51'
//   comments.unshift(comment)
//   res.redirect('/')    //重定向，封装的是之前的res.statusCode = 302、 res.setHeader('Location', '/')
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
```



### 在express中获取post请求体数据

#### post请求  

`` 使用中间件通过req.body获得post请求体数据

```javascript
// 当以 POST 请求 /post（路径标识） 的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', function (req, res) {
  // 1. 获取表单 POST 请求体数据
  // 2. 处理
  // 3. 发送响应

  // req.query 只能拿 get 请求参数
  // console.log(req.query)

  var comment = req.body
  comment.dateTime = '2017-11-5 10:58:51'
  comments.unshift(comment)

  // res.send
  // res.redirect
  // 这些方法 Express 会自动结束响应
  res.redirect('/')
  // res.statusCode = 302
  // res.setHeader('Location', '/') 
})
```

#### 在express中没有内置的获取post请求体的插件，结合第三方插件  body-parser

安装

```shell
npm install -s body-parser
```

配置

```javascript

var bodyParser = require('body-parser')
 
var app = express()

 // 配置 body-parser 中间件（插件，专门用来解析表单 POST 请求体）
//只要加入这个配置，则在req请求属性上会多一个：body
//也就是说你可以直接通过req.body来获取post请求体数据
//配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

### express提供了一个方法json

该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器

```javascript
  res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
```



## 文件操作路径和模块标识路径

文件操作路径

```javascript
var fs = require('fs')

// 咱们所使用的所有文件操作的 API 都是异步的
// 就像你的 ajax 请求一样
// 文件操作中的相对路径可以省略 ./
// fs.readFile('data/a.txt', function (err, data) {
//   if (err) {
//     return console.log('读取失败')
//   }
//   console.log(data.toString())
// })



// 在文件操作的相对路径中
//    ./data/a.txt 相对于当前目录
//    data/a.txt   相对于当前目录
//    /data/a.txt  绝对路径，当前文件模块所处磁盘根目录
//    c:/xx/xx...  绝对路径
// fs.readFile('./data/a.txt', function (err, data) {
//   if (err) {
//     console.log(err)
//     return console.log('读取失败')
//   }
//   console.log(data.toString())
// })




```

模块操作路径

```javascript
// 在模块加载中，相对路径中的 ./ 不能省略
// Error: Cannot find module 'data/foo.js'
// require('data/foo.js')

// require('./data/foo.js')('hello')
// 这里如果忽略了 . 则也是磁盘根目录
require('/data/foo.js')
//相对路径
require('./data/foo.js')
模块相对路径中的./不能省略
```

##  Express - crud

### 起步

- 初始化
- 模板处理

### 路由设计

| 请求方法 | 请求路径         | get 参数 | post 参数                      | 备注             |
| -------- | ---------------- | -------- | ------------------------------ | ---------------- |
| GET      | /studens         |          |                                | 渲染首页         |
| GET      | /students/new    |          |                                | 渲染添加学生页面 |
| POST     | /studens/new     |          | name、age、gender、hobbies     | 处理添加学生请求 |
| GET      | /students/edit   | id       |                                | 渲染编辑页面     |
| POST     | /studens/edit    |          | id、name、age、gender、hobbies | 处理编辑请求     |
| GET      | /students/delete | id       |                                | 处理删除请求     |
|          |                  |          |                                |                  |

### 提取路由模块

+ router模块提取：

  router的职责：

   \*   处理路由

   \*   根据不同的请求方法+请求路径设置具体的请求处理函数

   \* 模块职责要单一，不要乱写

   \* 我们划分模块的目的就是为了增强项目代码的可维护性

   \* 提升开发效率

```javascript
module.exports=function(app){
    app.get('/',function(){
        
    })
}

//exports提供了一个更好的方式：专门用来包装路由
var express =  require('express')
//创建一个路由容器
var router = express.Router()
//把路由都挂载到router容器中】
router.get('/',function(){})
//把router导出
module.exports = router

```

+  app.js的职责/**

  app.js 入门模块

   \*   创建服务

   \*   做一些服务相关配置

   \*     模板引擎

   \*     body-parser 解析表单 post 请求体

   \*     提供静态资源服务

   \*   挂载路由

   \*   监听端口启动服务

router模块提取之后，在app.js中的引用

```javascript
var router = require('./router')
//配置模板引擎和body-parser中间件一定要在挂载路由之前
app.engine('html', require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)
//把路由容器挂载到app服务中
app.use(router)

//提供app的接口
module.exports = app
```

### 数据操作模块

+ student.js的职责

   \* 数据操作文件模块

   \* 职责：操作文件中的数据，只处理数据，不关心业务

   *

   \* 这里才是我们学习 Node 的精华部分：奥义之所在

   \* 封装异步 API

+ 设计操作数据的API文件模块

  ```javascript
  
  var fs = require('fs')
  
  var dbPath = './db.json'
  
  /**
   * 获取学生列表
   * @param  {Function} callback 回调函数
   */
  exports.find = function (callback) {
   
  }
  
  /**
   * 根据 id 获取学生信息对象
   * @param  {Number}   id       学生 id
   * @param  {Function} callback 回调函数
   */
  exports.findById = function (id, callback) {
   
  }
  
  /**
   * 添加保存学生
   * @param  {Object}   student  学生对象
   * @param  {Function} callback 回调函数
   */
  exports.save = function (student, callback) {
    
  }
  
  /**
   * 更新学生
   */
  exports.updateById = function (student, callback) {
   
  }
  
  /**
   * 删除学生
   */
  exports.deleteById = function (id, callback) {
   
  }
  
  ```

  如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取

  splice[下标，删几个]，从数组中删除对象

  ### 自己编写的步骤

  

## 回调函数

函数也是一种数据类型，既可以做参数，亦可以当做返回值

函数当作参数目的是获取内部异步操作的结果

```javascript

function add(x, y, callback) {
    //callback就是回调函数
    //相当于
    //var x =10;
    //var y = 20;
    // var callback = function(ret){
    //console.log(ret);
}
  console.log(1)
  setTimeout(function () {
    var ret = x + y
    callback(ret)
  }, 1000)
}

add(10, 20, function (ret) {
    //ret 是拿到的结果
  console.log(ret)
})

// 注意：凡是需要得到一个函数内部异步操作的结果
//    setTimeout
//    readFile
//    writeFile
//    ajax
//   这种情况必须通过：回调函数

```



## js事件循环，单线程

## MongoDB

### 关系型数据库和非关系型数据库

+ 表的关系或者说是表与表之间存在关系
+ 所有的关系型数据库都要通过sql语言来操作
+ 所有的关系型数据库在操作之前都要设计表结构
+ 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
+ 非关系数据库非常灵活
+ 有的非关系型数据库就是key-value对儿
+ 但是MongoDB是长得最像关系型数据库的非关系型数据库
+ 数据库-》数据库
+ 数据表-》集合（数组）
+ 表记录-》（文档对象）
+ MongoDB不需要设计表结构
+ 也就是说你可以任意的往里面存储数据，没有结构性一说

### 安装             https://www.mongodb.com/download-center/community         #server

### 配置

环境变量  path   ---mongodb中bin所在的目录

### 启动和关闭数据库

启动：

```shell
# mongodb 默认使用执行 mongod命令所处盘符根目录下的/data/db作为自己的数据存储目录
# 所以在第一次执行改命令之前先自己手动建一个data/db
mongod
```

如果想要修改默认的数据存储目录，可以

```shell
mongod --dbpath=存储目录路径
```

停止：

```shell
在开启服务的控制台ctrl+c或者可以直接关闭控制台
```

### 连接数据库

```shell
# 该命令默认连接本地的mongoDB
mongo
```

退出

```shell
exit
```

### 基本命令

+ show dbs：查看显示所有的数据库
+ db:查看当前操作的数据库

+ use 数据库名：切换到指定的数据库，如果没有没自动新建
+ 插入数据：db.数据库表名.insertOne({})
+ show collections:查询当前数据库中的表
+ db.数据库表名.find():查询数据库表中的数据

### 在node中如何操作mongoDB（mongoose）

### 基本概念

+ 数据库--可以有多个数据库

+ 集合--一个数据库可以有多个集合（表）

+ 文档--一个集合里面可以有多个文档（表记录）

+ 使用官方的MongoDB包           https://github.com/mongodb/node-mongodb-native

+ 使用第三方包mongoose来操作mongodb数据库      https://mongoosejs.com/

  - 安装

  - ```shell
    $ npm install mongoose
    ```

    hello world

  ```javascript
  var mongoose = require('mongoose');
  
  // 连接 MongoDB 数据库
  mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
  
  mongoose.Promise = global.Promise;
  
  // 创建一个模型
  // 就是在设计数据库
  // MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
  // mongoose 这个包就可以让你的设计编写过程变的非常的简单
  var Cat = mongoose.model('Cat', { name: String });
  
  for (var i = 0; i < 100; i++) {
    // 实例化一个 Cat
    var kitty = new Cat({ name: '喵喵' + i });
  
    // 持久化保存 kitty 实例
    kitty.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('meow');
      }
    });
  }
  
  ```

  官方指南：

  设计schme发布model

  ```javascript
  var mongoose = require('mongoose')
  
  var Schema = mongoose.Schema
  
  // 1. 连接数据库
  // 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
  mongoose.connect('mongodb://localhost/itcast')
  
  // 2. 设计文档结构（表结构）
  // 字段名称就是表结构中的属性名称
  // 约束的目的是为了保证数据的完整性，不要有脏数据
  var userSchema = new Schema({
    username: {
      type: String,
      required: true // 必须有
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String
    }
  })
  
  // 3. 将文档结构发布为模型
  //    mongoose.model 方法就是用来将一个架构发布为 model
  //    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
  //                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
  //                 例如这里的 User 最终会变为 users 集合名称
  //    第二个参数：架构 Schema
  //   
  //    返回值：模型构造函数
  var User = mongoose.model('User', userSchema)
  
  
  // 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）
  // **********************
  // #region /新增数据
  // **********************
  var admin = new User({
    username: 'zs',
    password: '123456',
    email: 'admin@admin.com'
  })
  
  admin.save(function (err, ret) {
    if (err) {
      console.log('保存失败')
    } else {
      console.log('保存成功')
      console.log(ret)
    }
  })
  // **********************
  // #endregion /新增数据
  // **********************
  
  
  
  
  // **********************
  // #region /查询数据
  // **********************
  User.find(function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  })
  
  User.find({
    username: 'zs'
  }, function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  })
  
  User.findOne({
    username: 'zs'
  }, function (err, ret) {
    if (err) {
      console.log('查询失败')
    } else {
      console.log(ret)
    }
  })
  // **********************
  // #endregion /查询数据
  // **********************
  
  
  
  // **********************
  // #region /删除数据
  // **********************
  User.remove({
    username: 'zs'
  }, function (err, ret) {
    if (err) {
      console.log('删除失败')
    } else {
      console.log('删除成功')
      console.log(ret)
    }
  })
  // **********************
  // #endregion /删除数据
  // **********************
  
  
  // **********************
  // #region /更新数据
  // **********************
  User.findByIdAndUpdate('5a001b23d219eb00c8581184', {
    password: '123'
  }, function (err, ret) {
    if (err) {
      console.log('更新失败')
    } else {
      console.log('更新成功')
    }
  })
  // **********************
  // #endregion /更新数据
  // **********************
  
  ```

## Promise

### callback hell

无法保证顺序的代码

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data)
  
})
fs.readFile('./data/b.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data)
 
})
fs.readFile('./data/c.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data)
})
```



通过回调嵌套的方式，保证顺序:回调地狱---回调嵌套回调

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'utf8', function (err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err
  }
  console.log(data)
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      // return console.log('读取失败')
      // 抛出异常
      //    1. 阻止程序的执行
      //    2. 把错误消息打印到控制台
      throw err
    }
    console.log(data)
    fs.readFile('./data/c.txt', 'utf8', function (err, data) {
      if (err) {
        // return console.log('读取失败')
        // 抛出异常
        //    1. 阻止程序的执行
        //    2. 把错误消息打印到控制台
        throw err
      }
      console.log(data)
    })
  })
})

```

为了解决以上方式带来的问题(回调地狱嵌套)，es6新增了一个API:promise

promise本身不是异步，但他内部往往是封装一个异步任务

### promise基本语法

```javascript
var fs = require('fs')

var p1 = new Promise(function (resolve, reject) {
  fs.readFile('./data/a.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

var p2 = new Promise(function (resolve, reject) {
  fs.readFile('./data/b.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

var p3 = new Promise(function (resolve, reject) {
  fs.readFile('./data/c.txt', 'utf8', function (err, data) {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

p1
  .then(function (data) {
    // then 方法接受的是容器中resolve中的值
    console.log(data)
    // 当 p1 读取成功的时候
    // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
    // 当你 return 123 后面就接收到 123
    //      return 'hello' 后面就接收到 'hello'
    //      没有 return 后面收到的就是 undefined
    // 上面那些 return 的数据没什么卵用
    // 真正有用的是：我们可以 return 一个 Promise 对象
    // 当 return 一个 Promise 对象的时候，后续的 then 中的 方法的第一个参数会作为 p2 的 resolve
    // 
    return p2
  }, function (err) {
    console.log('读取文件失败了', err)
  })
  .then(function (data) {
    console.log(data)
    return p3
  })
  .then(function (data) {
    console.log(data)
    console.log('end')
  })

```

封装promise版本的``readFile``API

```javascript
var fs = require('fs')

function pReadFile(filePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

pReadFile('./data/a.txt')
  .then(function (data) {
    console.log(data)
    return pReadFile('./data/b.txt')
  })
  .then(function (data) {
    console.log(data)
    return pReadFile('./data/c.txt')
  })
  .then(function (data) {
    console.log(data)
  })

```

## path路径操作模块

+ path.basename('路径','指定要去除的文件后缀名')：获取路径当中的文件名（默认包含扩展名）

```javascript
path.basename('c:/data/demo/index.js')         =>   index.js
path.basename('c:/data/demo/index.js','.js')   =>   index
```

+ path.dirname('路径')  ： 获取路径当中的路径名

```javascript
path.dirname('c:/data/demo/index.js')   =>   c:/data/demo
```

+ path.extname('路径')：获取路径当中的扩展名

```javascript
path.extname('c:/data/demo/index.js')    => .js  
```

+ path.isAbsolute('path')：判断路径是不是绝对路径

+ path.parse('path')：将一个路径转成一个对象

+ path.join('path1','path2',...)：将路径参数进行拼接，避免手动拼接的问题

## node中的非模块成员

每个模块中除了require、exports等模块相关API之外，还有两个特殊的成员：

+ __dirname:可以用来动态获取当前模块文件所处目录的绝对路径

+ __filename:可以用来动态获取获取当前文件的绝对路径（包含文件名）

+ ``__dirname``和``__filename``不受执行node命令所处的目录影响

+ 在文件操作中，使用相对路径是不可靠的，因为node中的相对路径指的是执行node命令的终端路径，为了解决这个问题，使用绝对路径

+ 这里我们就可以使用 ``__dirname``、 `` __filename``

+ 模块中的路径标识和文件操作中的相对路径标识不一致

  模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响

  require('./b')

  

```javascript
var fs = require('fs')
var path = require('path')


// 模块中的路径标识和文件操作中的相对路径标识不一致
// 模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响
require('./b')

// ./a.txt 相对于当前文件路径
// ./a.txt 相对于执行 node 命令所处的终端路径
// 这不是错误，Node 就是这样设计的
// 就是说，文件操作路径中，相对路径设计的就是相对于执行 node 命令所处的路径
// fs.readFile('C:/Users/lpz/Desktop/nodejs/06/code/foo/a.txt', 'utf8', function (err, data) {
//   if (err) {
//     throw err
//   }
//   console.log(data)
// })

// console.log(__dirname + '/a.txt')

// C:\Users\lpz\Desktop\nodejs\06\code
fs.readFile(path.join(__dirname, './a.txt'), 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})

```

### cookie和session

+  cookie保存在客户端本地，可以用来保存一些不太敏感的数据：记住用户名，购物车

+ session保存在服务端，用来保存一些敏感信息，客户端只需要拿到这个钥匙

+ 在 Express 这个框架中，默认不支持 Session 和 Cookie

+ 但是我们可以使用第三方中间件：express-session 来解决

1. 安装：npm install express-session

2. 配置： (一定要在 app.use(router) 之前)

3. ```javascript
   app.use(session({
     secret: 'keyboard cat',
     resave: false,
     saveUninitialized: true,
     cookie: { secure: true }
   }))
   
   app.use(session({
     // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
     // 目的是为了增加安全性，防止客户端恶意伪造
     secret: 'itcast',
     resave: false,
     saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
   }))
   ```

   提示：session默认是内存存储的，服务器一旦重启，session就丢失了

4. 使用

   当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了

   添加 Session 数据：req.session.foo = 'bar'

   访问 Session 数据：req.session.foo



### 中间件

expressjs.com/en/guide/using-middleware.html

中间件本质是一个请求处理方法，从请求到处理的过程分发到多个中间件去处理，这样做的目的是提高代码的灵活性，动态可扩展性

中间件本身是一个方法，该方法接收三个参数：

   Request 请求对象

   Response 响应对象

   next     下一个中间件

当一个请求进入一个中间件之后，如果不调用 next 则会停留在当前中间件

**所以 next 是一个方法，用来调用下一个中间件的**

**调用 next 方法也是要匹配的（不是调用紧挨着的那个)**

+ 同一个请求所经过的中间件都是同一个请求对象和响应对象  --- 会输出{}

  ```javascript
  app.get('/abc', function (req, res, next) {
    console.log('abc')
    // req.foo = 'bar'
    req.body = {}
    next()
  })
  
  app.get('/abc', function (req, res, next) {
    console.log(req.body)
    console.log('abc 2')
  })
  ```

  

 在 Express 中，对中间件有几种分类

当请求进来，会从第一个中间件开始进行匹配

   如果匹配，则进来

​      如果请求进入中间件之后，没有调用 next 则代码会停在当前中间件

​      如果调用了 next 则继续向后找到第一个匹配的中间件

   如果不匹配，则继续判断匹配下一个中间件

+ 应用程序级别的中间件

  - 万能匹配（不关心请求路径和请求方法的中间件,也就是说任何请求都会进入这个中间件）

    ```javascript
    app.use(function (req, res, next) {
      console.log('1')
      next()
    })
    
    app.use(function (req, res, next) {
      console.log('2')
      next()
    })
    
    app.use(function (req, res, next) {
      console.log('3')
      res.send('333 end.')
    })
    ```

  - 关心请求路径的中间件(以/xxx开头的中间件)

    ```javascript
    app.use('/a', function (req, res, next) {
      console.log('a')
      next()
    })
    //返回的内容不包含/a
    ```

+ 路由级别的中间件(严格匹配请求方法和请求路径的中间件)

+ get:

  ```javascript
  app.get('/',function(){
      
  })
  ```

  post:

  ```javascript
  app.post('/',function(){
      
  })
  ```

+ 错误处理中间件

  ```javascript
  var express = require('express')
  var fs = require('fs')
  
  var app = express()
  
  // app.get('/abc', function (req, res, next) {
  //   console.log('abc')
  //   // req.foo = 'bar'
  //   req.body = {}
  //   next()
  // })
  
  // app.get('/abc', function (req, res, next) {
  //   console.log(req.body)
  //   console.log('abc 2')
  // })
  
  app.get('/', function (req, res, next) {
    fs.readFile('.d/sa./d.sa/.dsa', function (err, data) {
      if (err) {
        // return res.status(500).send('Server Error')
        // 当调用 next 的时候，如果传递了参数，则直接往后找到带有 四个参数的应用程序级别中间件
        // 当发生错误的时候，我们可以调用 next 传递错误对象
        // 然后就会被全局错误处理中间件匹配到并处理之
        next(err)
      }
    })
  })
  
  app.get('/', function (req, res, next) {
    console.log('/ 2')
  })
  
  
  
  app.get('/a', function (req, res, next) {
    fs.readFile('./abc', function (err, data) {
      if (err) {
        // return res.status(500).send('Server Error') 
        next(err)
      }
    })
  })
  
  app.use(function (req, res, next) {
    res.send('404')
  })
  
  // 配置错误处理中间件
  app.use(function (err, req, res, next) {
    res.status(500).send(err.message)
  })
  
  app.listen(3000, function () {
    console.log('app is running at port 3000.')
  })
  
  ```

  

