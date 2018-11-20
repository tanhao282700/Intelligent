<template>
    <div class="pieChart">      
        <canvas :id="data.id" class="myChart"   width="220" height="220"></canvas>
    </div>
</template>

<script>
export default {
  props:['data'],
  data () {
    return {
        newData:{
            data:[],
            total:''
        }
    }
  },
  methods:{
    drawLine(data){
            let _this = this;
            var canvas = document.getElementById(this.data.id),  //获取canvas元素
            context = canvas.getContext('2d'),  //获取画图环境，指明为2d
            centerX = canvas.width/2,   //Canvas中心点x轴坐标
            centerY = canvas.height/2,  //Canvas中心点y轴坐标
            rad = Math.PI*2/100, //将360度分成100份，那么每一份就是rad度
            speed = 0.1; //加载的快慢就靠它了 
            

        //绘制5像素宽的运动外圈
        function blueCircle(data){
            if(data.length == 0){
                return;
            }
            let totaln = data[0]+data[1]+data[2]+data[3]
            let n = data[0],n1=data[1],n2 =data[2],n3 = data[3];
            context.save();
            context.translate(centerX,centerY);
            context.strokeStyle = "#008aff"; //设置描边样式 #ffa414 黄色 #008aff蓝色 #fa6074红色 #4ae283绿色
            context.lineWidth = 3; //设置线宽
            context.beginPath(); //路径开始
            context.arc(0, 0, 100 , -Math.PI*4.5/3, -Math.PI*4.5/3 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            //context.arc(161,25,2,Math.PI*2,0,true);
            context.stroke(); //绘制
            context.closePath(); //路径结束

            context.translate(Math.round(Math.cos((n*3.6+90)*Math.PI/180 )* 100),Math.round(Math.sin((n*3.6+90)*Math.PI/180 )* 100));
            context.fillStyle="#008aff";
            context.beginPath();
            context.arc(0,0,3, -Math.PI*4.5/3, -Math.PI*4.5/3 + Math.PI*2,false);
            context.fill();
            context.closePath();
            if(n1!==''){
                context.strokeStyle = "#4ae283";
                context.translate(-Math.round(Math.cos((n*3.6+90)*Math.PI/180 )* 100),-Math.round(Math.sin((n*3.6+90)*Math.PI/180 )* 100));
                context.beginPath(); //路径开始
                context.arc(0, 0, 90 , -Math.PI*4.5/3, -Math.PI*4.5/3 +n1*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke(); //绘制
                context.closePath(); //路径结束
                // context.restore();

                context.translate(Math.round(Math.cos((n1*3.6+90)*Math.PI/180 )* 90),Math.round(Math.sin((n1*3.6+90)*Math.PI/180 )* 90));
                context.fillStyle="#4ae283";
                context.beginPath();
                context.arc(0,0,3, -Math.PI*4.5/3, -Math.PI*4.5/3 + Math.PI*2,false);
                context.fill();
                context.closePath();
            }
            if(n2!==''){
                context.strokeStyle = "#ffa414";
                context.translate(-Math.round(Math.cos((n1*3.6+90)*Math.PI/180 )* 90),-Math.round(Math.sin((n1*3.6+90)*Math.PI/180 )* 90));
                context.beginPath(); //路径开始
                context.arc(0, 0, 80 , -Math.PI*4.5/3, -Math.PI*4.5/3 +n2*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
                context.stroke(); //绘制
                context.closePath(); //路径结束
                // context.restore();

                context.translate(Math.round(Math.cos((n2*3.6+90)*Math.PI/180 )* 80),Math.round(Math.sin((n2*3.6+90)*Math.PI/180 )* 80));
                context.fillStyle="#ffa414";
                context.beginPath();
                context.arc(0,0,3, -Math.PI*4.5/3, -Math.PI*4.5/3 + Math.PI*2,false);
                context.fill();
                context.closePath();
            }
            if(n1==='' && n2===''){
                context.translate(-Math.round(Math.cos((n*3.6+90)*Math.PI/180 )* 100),-Math.round(Math.sin((n*3.6+90)*Math.PI/180 )* 100));
                context.strokeStyle = "#fa6074";
                context.beginPath(); //路径开始
                context.arc(0, 0, 70 , -Math.PI*4.5/3, -Math.PI*4.5/3 +n3*rad, false); //
            }else{
                context.translate(-Math.round(Math.cos((n2*3.6+90)*Math.PI/180 )* 80),-Math.round(Math.sin((n2*3.6+90)*Math.PI/180 )* 80));
                context.strokeStyle = "#fa6074";
                context.beginPath(); //路径开始
                context.arc(0, 0, 70 , -Math.PI*4.5/3, -Math.PI*4.5/3 +n3*rad, false); //
            }
            //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
            context.stroke(); //绘制
            context.closePath(); //路径结束

            context.translate(Math.round(Math.cos((n3*3.6+90)*Math.PI/180 )* 70),Math.round(Math.sin((n3*3.6+90)*Math.PI/180 )* 70));
            context.fillStyle="#fa6074";
            context.beginPath();
            context.arc(0,0,3, -Math.PI*4.5/3, -Math.PI*4.5/3 + Math.PI*2,false);
            context.fill();
            context.closePath();

            context.translate(-Math.round(Math.cos((n3*3.6+90)*Math.PI/180 )* 70),-Math.round(Math.sin((n3*3.6+90)*Math.PI/180 )* 70));            
            context.restore();
        }
        //绘制底圈
        function whiteCircle(){
            context.save();
            context.beginPath();
            context.lineWidth = 5; //设置线宽
            context.strokeStyle = "rgba(0,0,0,0.2)";
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
        //百分比文字绘制
        function text(n){
            context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
            context.strokeStyle = "#4A90E2"; //设置描边样式
            context.shadowOffsetX=4;
            context.shadowOffsetY=20;
            context.shadowColor='rgba(74,144,226,0.22)';
            context.shadowBlur = '20';

            context.font = "normal 30px Arial"; //设置字体大小和字体
            //绘制字体，并且指定位置
            context.fillStyle = '#fff'
            context.fillText(n.toFixed(2)+"%", centerX-45, centerY+5);
            //context.strokeStyle = "#fff"; //设置描边样式
            context.font = "12px Arial"; //设置字体大小和字体
            context.fillText("总完成率", centerX-25, centerY+35);
            context.stroke(); //执行绘制
            context.restore();
        } 
        //动画循环
        (function drawFrame(){
            //window.requestAnimationFrame(drawFrame);
            context.clearRect(0, 0, canvas.width, canvas.height);
            whiteCircle();
            let num = data.total*100
            text(num);
            blueCircle(data.data);
        }());
  
    }
  },
  watch:{
    data:{
        handler(newValue, oldValue) {
　　　　　   this.drawLine(newValue)
    　　},
    　　deep: true
    }
  },
  mounted() {
       this.drawLine(this.data);
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
