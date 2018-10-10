<template>
    <div  class="myChartBox">
        <div class = 'centerTit'> 
            <p v-text='this.echartCirData.util'></p>
            <span 
                v-text='value' 
                :style= "{color:color}"></span>
        </div>
        <div :id="echartCirData.id" :style = "echartCirData.style" class="myChart"></div>
        <div :id="echartCirData.id+'0'" :style = "echartCirData.style" class="myChart2"></div>
        <p class="circleTit" v-text='this.echartCirData.tit' :class="{'top2':type==2}"></p>
    </div>
</template>

<script>
export default {
  props:['echartCirData'],
  data () {
    return {
        indexs:1,
        type:1
    }
  },
  computed:{
        color(){
            let i =0;
            if(this.indexs==1){
                i =2;
            }
          let res = this.echartCirData.color[i];
          return res;
        },
        value(){
            let res =0;
            if(this.indexs==1){
                res = this.echartCirData.data0[0].value;
            }else{
                res = this.echartCirData.data[0].value;
            }
            
            return res;
        },
  },
  methods:{
      drawLine(){
          let echartCirData = this.echartCirData;
          let radius = ['50%', '70%'];
          if(echartCirData.type!==undefined){
              if(echartCirData.type==2){
                  radius = ['47%', '67%'];
              }
          }
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.echartCirData.id))
        let option = {
            color :this.echartCirData.color,
            cursor:'auto',
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: radius,
                    center:'center',
                    avoidLabelOverlap: false,
                    hoverOffset:10,
                    label: {
                        normal: {
                            show: false,                         
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.echartCirData.data
                }
            ]
        };
        // 绘制图表
       myChart.setOption(option); 

        myChart.on('mouseover', function(params){  //移入
            if(params.dataIndex==0){
                this.indexs = 0;
            }else{
                this.indexs = 1;
            }
       
        }.bind(this));
        myChart.on('mouseout', function(params){   //移出
            this.indexs = 1;
        }.bind(this));

        //背景圆
        
        let myChart2 = this.$echarts.init(document.getElementById(echartCirData.id+'0'))
        let option2 = {
            color :this.echartCirData.color[2],
            cursor:'auto',
            series: [
                {
                    name:'访问来源22',
                    type:'pie',
                    radius:radius,
                    center:'center',
                    avoidLabelOverlap: false,
                    hoverOffset:0,
                    label: {
                        normal: {
                            show: false,                         
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.echartCirData.data0
                }
            ]
        };
        myChart2.setOption(option2); 

    }
  },
  created() {
      if(this.echartCirData.type!==undefined){
        this.type = this.echartCirData.type;
      }
  },
  mounted() {
       this.drawLine();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../assets/css/comon.less';
.myChartBox{
    height:100%;
    width:100%;
    position:relative;  
    .circleTit{
        position:absolute;
        bottom:0; 
       .vhMB(32);
        width:100%;
        text-align:center;
        color:#008aff;
        font-size:0.12rem;
        line-height: 0.12rem;
    }
    .top2{
       bottom:0; 
       .vhMB(14);
    }
    .myChart2{
        position:absolute;
        z-index:11;
        left:0;
        top:0;
    }
    .myChart{
        position:relative;
        z-index:12;
        left:0;
        top:0;
    }
    .centerTit{
        position:absolute;
        top:45.5%;
        left:50%;
        height:0.33rem;
        width:0.54rem;
        z-index:13;
        transform:translate(-0.27rem,-0.165rem);
        p,span{
            display:block;
            text-align:center;
        }
        p{
           font-size: 0.12rem;
            line-height: 0.14rem;
            color: #4d5d76;
        }
        span{
            font-size: 0.30rem;
            line-height: 0.30rem;
        }
    }
}

</style>
