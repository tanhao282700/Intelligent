var baseWidth = 1366;
var baseHeight = 728;
var baseScale = Number(baseHeight/baseWidth).toFixed(2);
var minWidth = 1280;
var minHeight = Number((minWidth*baseScale).toFixed(2));

var html = $('html');
var body = $("body");

$(function () {
  resizeWindow();
})

$(window).resize(function() {
  resizeWindow();
});

/*页面适配事件*/
function resizeWindow() {
  var size = getPageSize();
  var w = size.w;
  var h = size.h;
  if(w>minWidth && h>minHeight){
    var curScale = Number(h/w).toFixed(2);
    if(curScale<baseScale){
      curScale = Number(h/baseHeight).toFixed(2);
      scaleWindow(curScale);
    }else {
      curScale = Number(w/baseWidth).toFixed(2);
      scaleWindow(curScale);
    }
  }else {
    body.css({
      width:minWidth,
      height:minHeight,
      transform:"none"
    })
  }

}

/*获取浏览器页面尺寸*/
function getPageSize() {
  return {
    w:html.width(),
    h:html.height()
  }
}

/*缩放body*/
function scaleWindow(val) {
  body.attr({
    style:"transform:scale("+val+")"
  })
}
