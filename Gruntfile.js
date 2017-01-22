module.exports = function (grunt) {
    var pkg = grunt.file.readJSON("package.json");
    var zylib = grunt.file.readJSON("zygrunt/zylib.json");
    var zylibAll = grunt.file.readJSON("zygrunt/zylibAll.json");
    var zyScroll = grunt.file.readJSON("zygrunt/zscrollPlug.json");
    var zyplayPlug = grunt.file.readJSON("zygrunt/zyplayPlug.json");
    grunt.initConfig({
        pkg: pkg,
        banner: grunt.file.read("zygrunt/zlib.copy.js")
                .replace(/@VERSION/, "v1.0")
                .replace(/@DATE/, grunt.template.today("yyyy-mm-dd")) + "\n",
        uglify: {
            options: {report: "min"},
//            zylib: zylib,
            zylibAll: zylibAll,
//            zyplayPlug: zyplayPlug,
//            zyScroll: zyScroll
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["uglify"]);
};