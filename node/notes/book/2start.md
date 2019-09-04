## 起步

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

  

## 读取文件

![1567566322566](C:\Users\17746\AppData\Roaming\Typora\typora-user-images\1567566322566.png)

+ 浏览器中的 JavaScript 是没有文件操作的能力的

+  但是 Node 中的 JavaScript 具有文件操作的能力

+ fs 是 file-system 的简写，就是文件系统的意思

+  在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块

+ 在 fs 这个核心模块中，就提供了所有的文件操作相关的 API

  fs.readFile 就是用来读取文件的

## 写文件

