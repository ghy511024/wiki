window.onload = function () {
    log("===================页面载入完毕，进入事件驱动阶段=============")
    setTimeout(function () {
        EVT.trigger(document, "onload")
    }, 10)
}