var path = require('path');
var HOST_MAP = {
    test: {
        host: 'http://10.154.157.44:9850/upload'
    },
    online: {
        host: 'http://10.154.28.247:9850/upload'
    }
	,staging: {
		host: 'http://10.154.252.172:9850/upload'
	}
    ,staging1: {
        host: 'http://10.135.30.61:9850/upload'
    }
};

fis.util.map(HOST_MAP, function(key, item){
    // 设置deploy节点
    var hostName = item['host'];
    fis.config.set('deploy.' + key, [{
        receiver : hostName,
        //从产出的结果的static目录下找文件
        from : '/static',
        //保存到远端机器的/home/fis/www/static目录下
        //这个参数会跟随post请求一起发送
        to : '/letv/www/',
        exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
    }, {
        receiver : hostName,
        from: '/WEB-INF/config',
        to: '/letv/www/WEB-INF/config',
        subOnly: true,
        exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
    }, {
        receiver : hostName,
        from: '/WEB-INF/views',
        to: '/letv/www/WEB-INF/views',
        subOnly: true,
        exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
    }]);
});

fis.config.set('deploy.local', [{
    //从产出的结果的static目录下找文件
    from : '/static',
    //保存到远端机器的/home/fis/www/static目录下
    //这个参数会跟随post请求一起发送
    to : '../output/',
    exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
}, {
    from: '/WEB-INF/config',
    to: '../output//WEB-INF/config',
    subOnly: true,
    exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
}, {
    from: '/WEB-INF/views',
    to: '../output/WEB-INF/views',
    subOnly: true,
    exclude: /.*\.(?:svn|cvs|tar|rar|psd).*/
}]);

// --------------------------------
// 支持 amd 设置
// --------------------------------
fis.config.set('modules.postprocessor.vm', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('modules.postprocessor.jsp', 'amd');
fis.config.set('settings.postprocessor.amd', {

    packages: [

        // 用来存放 libs 库
        {
            name: 'libs',
            location: 'static/libs/',
            main: 'index'
        }
    ]
});

// --------------------------------
// sass/scss 配置
// --------------------------------

// 设置 sass 的 include_paths 便于组件引入
fis.config.set('settings.parser.sass.include_paths', [
    './static/scss',
    './widget/ui/base-style'
]);

// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');
fis.config.set('modules.spriter', 'csssprites');
fis.config.set('settings.spriter.csssprites', {
    //图之间的边距
    margin: 5,
    //使用矩阵排列方式，默认为线性`linear`
    layout: 'matrix'
});
fis.config.set('pack', {

    // css
    //'pkg/content.css': ['widget/content/content.scss'],   // 因为依赖会被打包，所以这个规则会把 index.vm 依赖的 css 打包在一起。
    'pkg/game.css': [
        'page/layout/layout.scss',
        'widget/game/**.scss',
        'widget/ui/scrollbar/scrollbar.scss',
        'widget/ui/layer/**.scss',
        'widget/ui/single-pay/**.scss',
        'widget/ui/xingying/**.scss'
    ],
    'pkg/beforegame.css': [
        'page/beforegame/beforegame.scss',
        'widget/beforegame/**.scss'
    ],
	'pkg/bubble.css': [
         'widget/bubble/**.scss'
    ],
    'pkg/ingame.css': [
        'page/ingame/ingame.scss',
        'widget/ingame/**.scss'
    ],
    'pkg/aftergame.css': [
        'page/aftergame/aftergame.scss',
        'widget/aftergame/**.scss'
    ],
    'pkg/live.css': [
        'page/live/live.scss',
        'widget/live/**.scss'
    ],
    'pkg/video.css': [
        'page/video/video.scss',
        'widget/video/**.scss'
    ],
	'pkg/graphic.css': [
        'widget/graphic-live/**.scss',
		'page/graphic-live/graphic-live.scss'
    ],

    // js
    'pkg/game.js': [
        'widget/common/**.js',
        'widget/ui/**.js',
        'widget/game/**.js'
    ],
    'pkg/beforegame.js': [
        'page/beforegame/beforegame.js',
        'widget/beforegame/**.js'
    ],
	'pkg/bubble.js': [
         'widget/bubble/**.js'
    ],
    'pkg/ingame.js': [
        'page/ingame/ingame.js',
        'widget/ingame/**.js'
    ],
    'pkg/aftergame.js': [
        'page/aftergame/aftergame.js',
        'widget/aftergame/**.js'
    ],
    'pkg/live.js': [
        'page/live/live.js',
        'widget/live/**.js'
    ],
    'pkg/video.js': [
        'page/video/video.js',
        'widget/video/**.js'
    ],
	'pkg/graphic.js': [
        'widget/graphic-live/**.js',
		'page/graphic-live/graphic-live.js'
    ]

});

fis.config.set('namespace', 'sport-match-desktop')
fis.config.set('roadmap.path', [
    {
        reg: /^\/components\/.*\.(?:less|md)$/i,
        release: false
    },

    {
        reg: 'doc/**.md',
        release: false
    },
    /*{
        reg: /^\/widget\/.*\.(?:jpg)$/i,
        release: false
    },*/
/*    {
        //所有image目录下的.png，.gif文件
        reg: /^\/widget\/content\/img\/(.*\.(?:png|gif|jpg))/i,
        //访问这些图片的url是 '/m/xxxx?log_id=123'
        url: '/static/pic/$1',
        //发布到/static/pic/xxx目录下
        release: '/static/pic/$1'
    },*/
    {
        reg: /^\/static\/libs\/(.*\.js)$/i,
        isMod: true,
        release: '${statics}/${namespace}/libs/$1'
    }

].concat(fis.config.get('roadmap.path', [])));
// *.md will be released as *.html
fis.config.set('roadmap.ext.md', 'html');
fis.config.set('roadmap. ', '10.154.157.31:9850');
