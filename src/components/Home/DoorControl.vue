<template>
  <div class="door" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="title">
      <span class="titleIcon"></span>
      <span class="txt">门禁系统</span>
      <img @click="deletCli" src="../../assets/img/home/close.png" alt="">
    </div>
    <div class="con">
      <div class="doorPartOne">
        <div class="doorPartOneCon">
          <span>当前门禁总数</span>
          <span v-text="data.count"></span>
        </div>
      </div>
      <div class="doorPartTwo">
        <div class="partName">当前门禁情况</div>
        <div class="partCon" id="doorControlEcharts"></div>
      </div>
    </div>
  </div>
</template>
<script>

  export default{
    props:{
      isResize:{
          type:Number
      }
    },
    data(){
        return {
          doorControlChart:{},
          loading:true,
          data:{}
        }
    },
    watch:{
      isResize(){
        this.doorControlChart.resize()
      }
    },
    components:{

    },
    mounted(){
      this.initData()
    },
    methods:{
      deletCli(){  //右上角关闭按钮
        this.$emit('deletClick',{self_id:14,componentsName:'Door'})
      },
      initData(){
        this.$http.get('/index_pc/pc/model',{self_id:14})
          .then((response)=>{
          if(response.data.code == 0){
          this.data = response.data.data
          this.drawEchart()
          this.loading = false
          }else{

          }
        })
      .catch((error)=>{
          console.log(error);
        });
      },
      drawEchart(){
        let doorControlChart = this.$echarts.init(document.getElementById("doorControlEcharts"));
        this.doorControlChart = doorControlChart
        let serviceData = this.data
        let option = {
          legend: {
            bottom: 10,
            left: 'center',
            padding:0,
            data:[{
                name:'开启数',
                icon: 'circle'
            },{
              name:'异常数',
              icon: 'circle'
            },{
              name:'关闭数',
              icon: 'circle'
            }],
            textStyle:{
              color:"white"
            },
            formatter(name){
                var index = 0;
              let data = [{
                name:'开启数',
                value: serviceData.start
              },{
                name:'异常数',
                value: serviceData.fault
              },{
                name:'关闭数',
                value: serviceData.close
              }];
              data.forEach(function(value,i){
                if(value.name == name){
                  index = i
                }
              });
              return data[index].value+'台'
            }
          },
          series : [
            {//显示指示线
              type: 'pie',
              /*radius: '55%',//饼图的半径大小*/
              center: ['51%', '42%'],//饼图的位置
              labelLine:{
                show:true,
                length:6,
                length2:6
              },
              data: [//此处传入两遍数组为关键处,百分比和指示线文字为两张饼图,叠加在一起显示效果
                {value:serviceData.start, name: '开启数'},
                {value:serviceData.fault, name: '异常数'},
                {value:serviceData.close, name: '关闭数'}
              ]
            },
            {
              type: 'pie',
              radius : '65%',
              center: ['51%', '42%'],
              selectedMode: 'single',
              label:{
                show:true,
                position:'inside',
                formatter: '{d}%'
              },
              data:[
                {value:serviceData.start, name: '开启数'},
                {value:serviceData.fault, name: '异常数'},
                {value:serviceData.close, name: '关闭数'}
              ],
            },
          ],
          color:['#2ddfdf','#ee4a4b','#008aff']
        };

        // 绘制图表
        doorControlChart.setOption(option);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .door{
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    .title{
      height:8.9%;
      background:rgba(0,12,39,0.4);
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-top-right-radius:8px;
      border-top-left-radius:8px;
      position:relative;
      img{
        position:absolute;
        width:24px;
        height:24px;
        right:10px;
        top:50%;
        margin-top:-12px;
        display: none;
      }
      &:hover{
        cursor: pointer;
        img{
          display: block;
        }
      }
      .titleIcon{
        width:.16rem;
        height:.16rem;
        background:url(../../assets/img/home/door.png) no-repeat center;
        background-size:100% auto;
        margin-right:12px;
      }
      .txt{
        color:white;
        font-size: .12rem;
      }
    }
  .con{
    flex:1;
    display:flex;
    flex-direction: column;
    .doorPartOne{
      height:25.974%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      .doorPartOneCon{
        width:87.649%;
        height:81.25%;
        background:rgba(59,97,142,0.4);
        display: flex;
        flex-direction: column;
        box-shadow:inset 0px 0px 6px 1px rgba(0,12,39,0.7);
        span{
          flex: 50%;
        }
        span:first-child{
          display: flex;
          align-items: center;
          margin-left:4.545%;
          color:#91b3d9;
          font-size:14px;
        }
        span:last-child{
          display: flex;
          justify-content:flex-end;
          font-size:20px;
          color:white;
          margin-right:4.545%;
          letter-spacing: 2px;
        }
      }
    }
    .doorPartTwo{
      flex:1;
      display: flex;
      padding:0 6%;
      flex-direction: column;
      .partName{
        height:13.567%;
        color:white;
        display: flex;
        align-items: center;
      }
      .partCon{
        height:80%;
        background:rgba(0,0,0,0.15);
      }
    }
  }
  }
</style>
