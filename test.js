var http = require("http");
var grunt = require('grunt');
var path = require('path');
var pkg = grunt.file.readJSON("package.json");
var zylib = grunt.file.readJSON("zygrunt/zlib.json");
//grunt.initConfig({
//    pkg: pkg,
//    uglify: {
//        options: {report: "min"},
//        zylib: zylib,
//    }
//});

var str1 = grunt.file.read("Gruntfile_1.js");
str1.replace("xxx", "xxxx.min.js").replace("asdf", "[sdfsfasdf]")
grunt.file.write("test2.js", str1);
var basedir = process.cwd() + "\\test2.js";
basedir = basedir.replace(/\\/gi, "/")
console.log(basedir)
grunt.cli({
    gruntfile: basedir
});

//http.createServer(function (request, response) {
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.write("Hello World");
//    // 开始执行==========打包=========工作
//    console.log("vvvvvvvvvvvvv")
////    grunt.registerTask("uglify");
////    grunt.task.run('uglify');
//    console.log("mmmmmmmmmmmmm")
//
////==============打包结束==============
//    response.end();
//}).listen(8702);