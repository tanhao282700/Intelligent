<template>
    <div class="pieChart">      
        <canvas :id="data.id" class="myChart"  :style = "data.style"></canvas>
    </div>
</template>

<script>
export default {
  props:['data'],
  data () {
    return {

    }
  },
  methods:{
    drawLine(){
        let _this = this;
        let id = this.data.id;
        var canvas = document.getElementById(id),  //获取canvas元素
            context = canvas.getContext('2d'),  //获取画图环境，指明为2d
            centerX = canvas.style.width/2,   //Canvas中心点x轴坐标
            centerY = canvas.style.height/2,  //Canvas中心点y轴坐标
            rad = Math.PI*2/100; //将360度分成100份，那么每一份就是rad度
            //speed = 0.1; //加载的快慢就靠它了 
        //window.requestAnimationFrame(drawFrame);
        
        function text(n){//百分比文字绘制
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
            context.strokeStyle = "#fff"; //设置描边样式
            context.font = "30px Arial"; //设置字体大小和字体
            //绘制字体，并且指定位置
            context.strokeText(n.toFixed(0)+"%", centerX-25, centerY+10);
            context.stroke(); //执行绘制
            context.restore();
        }
        function whiteCircle(){//绘制白色外圈
            context.save();
            context.beginPath();
            context.lineWidth = 2; //设置线宽
            context.strokeStyle = "#ccc";
            context.arc(centerX, centerY, 100 , 0, Math.PI*2, false);
            context.closePath(); //路径结束
            context.stroke(); //绘制

            context.beginPath();
            context.arc(centerX, centerY, 90 , 0, Math.PI*2, false);
            context.closePath(); //路径结束
            context.stroke(); //绘制

            context.beginPath();
            context.arc(centerX, centerY, 80 , 0, Math.PI*2, false);
            context.closePath(); //路径结束
            context.stroke(); //绘制

            context.beginPath();
            context.arc(centerX, centerY, 70 , 0, Math.PI*2, false);
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(centerX, centerY, 55 , 0, Math.PI*2, false);
            context.stroke();
            context.closePath();
            context.restore();
        }
        function blueCircle(n,n1,n2,n3){//绘制5像素宽的运动外圈
            context.save();
            context.translate(centerX,centerY);
            context.strokeStyle = "#008AFF"; //设置描边样式
            context.lineWidth = 2; //设置线宽
            context.beginPath(); //路径开始
            context.arc(0, 0, 100 , -Math.PI*4/3, -Math.PI*4/3 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            //context.arc(161,25,2,Math.PI*2,0,true);
            context.stroke(); //绘制
            context.closePath(); //路径结束

            context.translate(Math.round(Math.cos((n*3.6+120)*Math.PI/180 )* 100),Math.round(Math.sin((n*3.6+120)*Math.PI/180 )* 100));
            context.fillStyle="#4AE283";
            context.beginPath();
            context.arc(0,0,2, -Math.PI*4/3, -Math.PI*4/3 + Math.PI*2,false);
            context.fill();
            context.closePath();

            context.translate(-Math.round(Math.cos((n*3.6+120)*Math.PI/180 )* 100),-Math.round(Math.sin((n*3.6+120)*Math.PI/180 )* 100));
            context.beginPath(); //路径开始
            context.arc(0, 0, 90 , -Math.PI*4/3, -Math.PI*4/3 +n1*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束
            // context.restore();

            context.translate(Math.round(Math.cos((n1*3.6+120)*Math.PI/180 )* 90),Math.round(Math.sin((n1*3.6+120)*Math.PI/180 )* 90));
            context.fillStyle="#FFA414";
            context.beginPath();
            context.arc(0,0,2, -Math.PI*4/3, -Math.PI*4/3 + Math.PI*2,false);
            context.fill();
            context.closePath();

            context.translate(-Math.round(Math.cos((n1*3.6+120)*Math.PI/180 )* 90),-Math.round(Math.sin((n1*3.6+120)*Math.PI/180 )* 90));
            context.beginPath(); //路径开始
            context.arc(0, 0, 80 , -Math.PI*4/3, -Math.PI*4/3 +n2*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束
            // context.restore();

            context.translate(Math.round(Math.cos((n2*3.6+120)*Math.PI/180 )* 80),Math.round(Math.sin((n2*3.6+120)*Math.PI/180 )* 80));
            context.fillStyle="#FA6074";
            context.beginPath();
            context.arc(0,0,2, -Math.PI*4/3, -Math.PI*4/3 + Math.PI*2,false);
            context.fill();
            context.closePath();

            context.translate(-Math.round(Math.cos((n2*3.6+120)*Math.PI/180 )* 80),-Math.round(Math.sin((n2*3.6+120)*Math.PI/180 )* 80));

            //context.translate(centerX,centerY);
            context.beginPath(); //路径开始
            context.arc(0, 0, 70 , -Math.PI*4/3, -Math.PI*4/3 +n3*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束

            context.translate(Math.round(Math.cos((n3*3.6+120)*Math.PI/180 )* 70),Math.round(Math.sin((n3*3.6+120)*Math.PI/180 )* 70));
            context.fillStyle="#00FFFF";
            context.beginPath();
            context.arc(0,0,2, -Math.PI*4/3, -Math.PI*4/3 + Math.PI*2,false);
            context.fill();
            context.closePath();

            context.translate(-Math.round(Math.cos((n3*3.6+120)*Math.PI/180 )* 70),-Math.round(Math.sin((n3*3.6+120)*Math.PI/180 )* 70));            
            context.restore();
        }
        //动画循环
        (function drawFrame(){
            context.clearRect(0, 0, canvas.style.width, canvas.style.height);
            whiteCircle();
            text(65);
            blueCircle(10,20,30,40);
        }());
    }
  },
  created() {

  },
  mounted() {
    console.log(this.data);
       this.drawLine();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.pieChart{
    .vh(220);
    width:100%;
    position:relative; 
    .myChart{
      height:100%;
        width:100%;  
    } 
}

</style>
