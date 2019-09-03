//markdown文件自动转换

const fs = require('fs')

const path = require('path')

let browserSync = require("browser-sync")
//将markdown文件进行转换
const marked = require('marked')

//接受需要转换的文件路径

const target = path.join(__dirname,process.argv[2] || './test.md')
//转为html后保存的位置
var  filename = target.replace(path.extname(target),'.html')

// 获取html文件名
var indexpath = path.basename(filename)
//利用browerSync创建一个文件服务器
browserSync({
    server: path.dirname(target),//网站根目录
    index: indexpath   //默认文档，如果浏览器访问一个目录的话，默认返回文件
});


//监视文件的变化  文件加载慢是因为默认interval 5s
fs.watchFile(target,{interval:200},(current,prev) =>{
    //判断文件有没有变化
    if(current.mtime === prev.mtime){
    return false;
    }
    //获取文件修改的时间
    //console.log(`current:${current.mtime};prev:${prev.mtime}`);
    //读取文件转为新的html
    fs.readFile(target,'utf8',(err,content) =>{
        if(err){
            throw err;
        }
        
        var  html = marked(content);
        //读取css文件
        fs.readFile(path.join(__dirname,'css.css'),'utf8',(err,css) =>{
            if(err){
                throw err;
            }
            html = template.replace('{cont}',html).replace('{style}',css)
           
            fs.writeFile(filename,html,'utf8',(err) =>{
// 通过browserSync发送消息给浏览器，浏览器刷新
            browserSync.reload(indexpath);
            console.log('updated@' + new Date);
            
            });
        })
        var template = `
<!DOCTYPE html>
<html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width={device-width}, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        {style}
    </style>
    </head>
    <body>
       {cont}
    </body>
    </html>
            `
     
    })
})
