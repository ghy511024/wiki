var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    // 开始执行==========打包=========工作
    var grunt = require('grunt');
    module.exports = function (grunt) {

    };
    var pkg = grunt.file.readJSON("../package.json");
    var zylib = grunt.file.readJSON("../zygrunt/zlib.json");
    console.log("vvvvvvvvvvvvv")
    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {report: "min"},
            zylib: zylib,
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-datauri');
    grunt.loadNpmTasks('grunt-fontoptim');
    grunt.registerTask("default", ["uglify"]);
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.task.run('uglify');
    console.log("打包完毕")
//==============打包结束==============
    response.end();
}).listen(8700);