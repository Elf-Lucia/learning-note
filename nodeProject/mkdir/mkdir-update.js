const fs = require('fs')

const path = require('path')

//创建层级目录

//创建文件，定义模块成员，导出模块成员，载入模块，使用模块

function mkdirs(pathname,callback){
    //module.parent  谁调用我拿到的是调用我的对象
    var root = path.dirname(module.parent.filename);

    //1、解析path--判断传入的是否是绝对路径

    pathname = path.isAbsolute(pathname)? pathname : path.join(root,pathname)
     // 获取要创建的部分  __dirname得到的是当前文件的路径     D:\project\song-scroll
     // 要创建的部分是 D:\project\song-scroll\demo\demo1
    //  pathname = pathname.replace(__dirname,'');
  
    //拿到的是输入路径相对于当前路径的相对路径
     relativepath = path.relative(root,pathname);
    // console.log(relativepath)  //demo\demo1

     //路径分割   path.sep 获取当前系统的分割符
     var folders = relativepath.split(path.sep) 
     //console.log(folders);

    try {
        var pre = ''  //获取上一次的路径，进行拼接，让子集能拼接到文件夹下面
        folders.forEach(folder => {
//判断文件是否存在
try {
    //如果不存在会报错
    fs.statSync(path.join(root,pre,folder));

} catch (error) {
      //阻塞的
      fs.mkdirSync(path.join(root,pre,folder));
}
       
            pre = path.join(pre,folder);
        });
    callback && callback(null)   
    } catch (error) {
        callback &&  callback(err)
    }
    

}
module.exports = mkdirs;