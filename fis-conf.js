fis.match('*', {
    release: false
});
fis.match('**.{.all.js}', {
    release: '$0',
    deploy: fis.plugin('local-deliver', {//fis3 release -d 路径
        to: '/dist'
    })
});