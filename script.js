var whenReady = (function () {               //这个函数返回whenReady()函数
    var funcs = [];             //当获得事件时，要运行的函数
    var ready = false;          //当触发事件处理程序时,切换为true
    //当文档就绪时,调用事件处理程序
    function handler(e) {
        if (ready) return;       //确保事件处理程序只完整运行一次
        //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
        if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
            return;
        }
        //运行所有注册函数
        //注意每次都要计算funcs.length
        //以防这些函数的调用可能会导致注册更多的函数
        for (var i = 0; i < funcs.length; i++) {
            funcs[i].call(document);
        }
        //事件处理函数完整执行,切换ready状态, 并移除所有函数
        ready = true;
        funcs = null;
    }

    //为接收到的任何事件注册处理程序
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false);            //IE9+
        window.addEventListener('load', handler, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }
    //返回whenReady()函数
    return function whenReady(fn) {
        if (ready) {
            fn.call(document);
        } else {
            funcs.push(fn);
        }
    }
})();

whenReady(function () {
    var btns = document.querySelectorAll('div[class*="second-section-container"] button[class*="tool-button"]');
    var btn_last = btns[btns.length - 1];
    btn_last.click();//注释掉便关闭自动全屏
    document.querySelector('.lines-content.monaco-editor-background').style.backgroundColor = '#C7EDCC';//此处修改16进制颜色，根据自己需要，默认为护眼豆沙色

})
	
	
