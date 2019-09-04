## 为什么要学node？

- 客户需求
  - 主要是学习后端，全栈工程师
  - 需要有后端开发经验
  - 基本的网站开发能力
    - 服务端
    - 前端
    - 运维部署
- node只是一个工具
- 目的---帮助打开服务端这个黑盒子，配合服务端开发（数据怎么制定，接口怎么制定）
- 学node不仅会帮助打开服务端的黑盒子，也能帮助学习之后的前端高级内容
  - vuejs
  - React
  - Angular

## 打开服务端的工具

- JAVA
- PHP
- Physon
- Ruby
- Net
- Nodejs

## Nodejs是什么？

- Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engin
  - Nodejs不是库不是框架，Nodejs不是一门语言
  - Nodejs是javascript运行时环境
    - 什么是JavaScript？
      - 脚本语言
      - 运行在浏览器中
      - 一般用来做客户端页面的交互
      - 运行在浏览器内核中的js引擎
  - nodejs可以运行和解析js代码(以前只有浏览器可以解析和执行js，现在可以脱离浏览器执行)
  - 也就是说现在的JavaScript可以脱离浏览器运行，完全归功于Nodejs
    - 选择原因：运用javascript语言,不需要重新学语言
      - 是node选择了JavaScript而不是JavaScript发展出来了一个node
      - JavaScript是目前开发行业中最火热的语言，会的人很多
  - V8引擎
    - 引擎是真正处理JavaScript语言的虚拟机
    - 代码只是具有特定格式的字符串，引擎可以帮你去解析和执行
    - chrome的v8引擎是世界公认的解析和执行JavaScript最快的引擎
    - nodejs的作者是把V8引擎移植了出来，开发了一个独立的JavaScript运行时环境
- nodejs特性---Node.js USES an event-driven, non-blocking I/O model to make it lightweight and efficient
  - event-driven 事件驱动
  - non-blocking I/Omodel    非阻塞I/o模型（异步）
  - lightweight and efficient   轻量和高效
- Node.js 的包管理器 npm，是世界上最大的开源库生态系统
  - 绝大多数JavaScript相关的包存放在了npm上，为了让开发人员更方便的下载使用

## 浏览器中的JavaScript能做什么？不能做什么？

- 操作DOM(对DOM的增删改、注册事件)
- AJAX/跨域
- BOM(页面跳转、历史记录、console.log、alert)
- ECMASCRIPT
- 不可以进行文件操作（文件和文件夹的crud）
- 没办法操作系统
- 浏览器中的JavaScript
  - ECMAScript
    - 基本语法
    - if
    - var
    - function
    - Object
    - Array
  - BOM
  - DOM

## Nodejs中的JavaScript

- 没有 BOM、DOM
- EcmaScript 
- 在 Node 中为 JavaScript 提供了一些服务器级别的 API
  - 例如文件读写
  - 网络服务的构建
  - 网络通信
  - http服务器
  - 等处理。。。

## Nodejs能做什么？

- web服务器后台
- 命令行工具(在命令行中需要特殊安装进行打命令的工具)
  - git( c语言 )
  - npm( node )
  - hexo( node )
- 对于前端工程师来讲，接触node最多的是他的命令行工具,自己写的很少，主要是用第三方开发的
  - webpack
  - gulp
  - hexo
  - npm

## 一些资源

- 《深入浅出Nodejs》--- 朴灵     比较偏理论，几乎没有实战内容，有助于理解API
- 《Nodejs权威指南》--- API讲解，如何去用API
- Cnode社区   ---   http://cnodejs.org
- Cnode社区新手入门 ---  http://cnodejs.org/getstart
- ES6  ---   http://es6.ruanyifeng.com/           https://github.com/ruanyf/es6tutorial/

## 能学到啥

- B/S模型
  - Browser-Server
  - back-end  后端
  - 任何服务器端技术这种BS编程模型都是一样的，与语言无关
  - Node只是作为我们学习BS编程模型的一个工具
- 模块化编程
  - RequireJs
  - seaJs
  - @import('文件路径')
  - 以前认知的JavaScript只能通过script标签加载
  - 在node中可以像@import()一样来引用加载JavaScript脚本文件
- Node常用API
- 异步编程
  - 回调函数
  - Promise
  - async
  - generator
- Express Web 开发框架
- Ecmascript6