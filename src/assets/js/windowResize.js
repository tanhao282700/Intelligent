var sysPage = {};

sysPage.baseWidth = 1366; //页面基准宽度
sysPage.baseHeight = 728; //页面基准高度
sysPage.baseScale = Number( sysPage.baseHeight / sysPage.baseWidth).toFixed(2); //页面基准缩放比
sysPage.minWidth = 1280; //页面最小宽度
sysPage.minHeight = Number(( sysPage.minWidth * sysPage.baseScale).toFixed(2)); //页面最小高度
sysPage.tempPage = {};

sysPage.html = $('html');
sysPage.body = $("body");

$(function () {
  var tempPage = sysPage.getPageSize();
  sysPage.resizeWindow(tempPage);
})

$(window).resize(function() {
  sysPage.decideIsResize();
});

/*判断是否resize页面，解决页面模糊bug */
sysPage.decideIsResize = function () {
  var temp = sysPage.getPageSize();
  var spaceW = Math.abs(temp.w - sysPage.tempPage.w);
  var spaceH = Math.abs(temp.h - sysPage.tempPage.h);
  if(spaceW > 5 || spaceH>5){
    sysPage.resizeWindow(temp);
  }
}

/*页面适配事件*/
sysPage.resizeWindow = function(page) {
  var w = page.w;
  var h = page.h;
  var resizePage = {};
  if(w > sysPage.minWidth && h > sysPage.minHeight){
    var curScale = Number(h/w).toFixed(2);
    if(curScale< sysPage.baseScale){
      /*适配高度*/
      curScale = Number(h / sysPage.baseHeight).toFixed(2);
      resizePage.h = h;
      resizePage.w = Number(sysPage.baseWidth * curScale);
      sysPage.scaleWindow(resizePage);
    }else {
      /*适配宽度*/
      curScale = Number(w / sysPage.baseWidth).toFixed(2);
      resizePage.w = w;
      resizePage.h = Number(sysPage.baseHeight * curScale);
      sysPage.scaleWindow(resizePage);
    }
    sysPage.tempPage = page;
  }else {
    sysPage.body.css({
      width : sysPage.minWidth,
      height : sysPage.minHeight
    })
  }

}

/*获取浏览器页面尺寸*/
sysPage.getPageSize = function() {
  return {
    w: sysPage.html.width(),
    h: sysPage.html.height()
  }
}

/*缩放body*/
sysPage.scaleWindow = function(val) {
  sysPage.body.css({
    width : val.w,
    height : val.h
  })
}
