(function($) {
    "use strict";

    $.fn.circleChart = function(option) {
        /*option = {
            width:"",
            height:"",
            outCircleObj:{
                lineWidth:4,
                bgColor1:"#FF0000",
                bgColor2:"#FAD961",
                bgColor3:"#59FF16"
            },
            inCircleObj:{
                lineWidth:16,
                bgColor1:"#FAD961",
                bgColor2:"#F7A51C",
                bgColor3:"#FAD961",
                text:[0,1,2,3,4],
                textColor:"#fff",
                opacity:""
            },
            space:4,
            title:{
                text:"系统COP",
                color:"#fff",
                size:"14"
            },
            dataValue:{
                text:"3.2",
                color:"#F7A51C",
                size:"20"
            }
        }*/

        var width = option.width;
        var height = option.height;
        var halfWidth = width / 2;
        var halfHeight = height / 2;
        var outCircleObj = option.outCircleObj;
        var inCircleObj = option.inCircleObj;
        var space =  option.space;
        var title = option.title;
        var data = option.dataValue;
        var position  = function (x, y, r, a) {
            return {
                left: Math.round(x + Math.cos(a*Math.PI/180) * r),
                top:  Math.round(y + Math.sin(a*Math.PI/180) * r)
            }
        }



        /*渲染外侧环形*/
        var c1=document.createElement("canvas");
        c1.setAttribute("width", width);
        c1.setAttribute("height", height);

        var ctx1=c1.getContext("2d");
        var gradient=ctx1.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop("0",outCircleObj.bgColor1);
        gradient.addColorStop("0.5",outCircleObj.bgColor2);
        gradient.addColorStop("1.0",outCircleObj.bgColor3);

        // 用渐变进行填充
        ctx1.strokeStyle=gradient;
        ctx1.lineWidth = outCircleObj.lineWidth;
        ctx1.radius = halfWidth-(ctx1.lineWidth / 2);
        ctx1.beginPath();
        ctx1.arc(halfWidth,halfHeight,ctx1.radius,0.75*Math.PI,2.25*Math.PI);
        ctx1.stroke();

        /*渲染内侧环形*/
        var gradient2=ctx1.createLinearGradient(0,0,width,0);
        gradient2.addColorStop("0",inCircleObj.bgColor1);
        gradient2.addColorStop("0.5",inCircleObj.bgColor2);
        gradient2.addColorStop("1.0",inCircleObj.bgColor3);

        ctx1.globalAlpha = inCircleObj.opacity;
        ctx1.strokeStyle=gradient2;
        var insidelineWidth=inCircleObj.lineWidth;
        var insideradius = halfWidth - ctx1.lineWidth - space - (insidelineWidth / 2);
        ctx1.lineWidth = insidelineWidth;
        ctx1.beginPath();
        ctx1.arc(halfWidth,halfHeight,insideradius,0.75*Math.PI,2.25*Math.PI);
        ctx1.stroke();

        var gradient3=ctx1.createLinearGradient(0,0,width,0);
        gradient3.addColorStop("0",inCircleObj.textColor);
        gradient3.addColorStop("1",inCircleObj.textColor);
        ctx1.fillStyle=gradient3;
        ctx1.radius=insideradius;

        /*定位刻度值*/
        var p1 = position(halfWidth,halfHeight,ctx1.radius,145);
        ctx1.textAlign="right";
        ctx1.fillText(inCircleObj.text[0],p1.left,p1.top);

        var p2 = position(halfWidth,halfHeight,ctx1.radius,215);
        ctx1.textAlign="left";
        ctx1.fillText(inCircleObj.text[1],p2.left,p2.top);

        var p3 = position(halfWidth,halfHeight,ctx1.radius-(inCircleObj.lineWidth*0.25),270);
        ctx1.textAlign="center";
        ctx1.fillText(inCircleObj.text[2],halfWidth,p3.top);

        var p4 = position(halfWidth,halfHeight,ctx1.radius,325);
        ctx1.textAlign="right";
        ctx1.fillText(inCircleObj.text[3],p4.left,p4.top);

        var p5 = position(halfWidth,halfHeight,ctx1.radius,35);
        ctx1.textAlign="left";
        ctx1.fillText(inCircleObj.text[4],p5.left,p5.top);


        /*填充标题*/
        var gradient4=ctx1.createLinearGradient(0,0,width,0);
        gradient4.addColorStop("0",title.color);
        gradient4.addColorStop("1",title.color);
        ctx1.fillStyle=gradient4;
        ctx1.font= title.size + "px Arial";
        ctx1.textAlign="center";
        ctx1.fillText(title.text,halfWidth,height*0.85);

        /*填充数据值*/
        var gradient5=ctx1.createLinearGradient(0,0,width,0);
        gradient5.addColorStop("0",data.color);
        gradient5.addColorStop("1",data.color);
        ctx1.fillStyle=gradient5;
        ctx1.font= data.size + "px Arial";
        ctx1.textAlign="center";
        ctx1.fillText(data.text,halfWidth,height*0.5);
        
        $(this).append(c1);

    }
})(jQuery);