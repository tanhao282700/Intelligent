<!--
    steps步骤条封装
    2018-10-18
-->
<template>
    <div class="routingTask">
        <div class="routingTime" >
          <div class="topBox" v-for="(item,index) in data.inspection_list" :style="{left:1.8+(index*160*100/1366)+'vw'}">
            <div>
              <span>{{item.name}}</span></br>
              {{item.date}}&nbsp;&nbsp;&nbsp;{{item.time}}
            </div>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>    
        <div class="progressDiv">
            <div v-for="(item,index) in data.steps">
              <img src="../../../../assets/img/AgentManage/point@2x.png" class="item1" :style="{left:6.73+(index*160*100/1366)+'vw'}">
              <img src="../../../../assets/img/AgentManage/point2@2x.png" class="item2" :style="{left:12.59+(index*160*100/1366)+'vw'}">
            </div>
        </div> 
        <div class="middleTime">
          <div class="bottomBox" v-for="(item,index) in data.inspection_list" :style="{left:9.31+(index*160*100/1366)+'vw'}">
            <i class="el-icon-arrow-up"></i>
            <div>
              {{item.areatime}}
            </div>
          </div>
        </div>    
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
           
      },
      created() {
      },
      mounted() {
         
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vtop(@val){
  top:@val*100/728vh;
}
.vbottom(@val){
  bottom:@val*100/728vh;
}
.vw(@val){
  width:@val*100/1366vw;
}
.vlw(@val){
  left:@val*100/1366vw;
}
.routingTask{
  width:100%;
  .vh(164);
  background:rgba(2,33,74,1);
  .progressDiv{
    width:100%;
    .vh(4);
    background:#71A6F1;
    position:relative;
    box-shadow:0px 3px 1px 0px rgba(181,215,255,0.05);
    .item1{
        position:absolute;
        left:6.73vw;
        .vtop(-4.4);
        .vh(12)
    }
    .item2{
        position:absolute;
        left:12.59vw;
        .vtop(-3);
        .vh(10)
    }
  }
  .routingTime{
    .vh(90);
    position:relative;
    color:#B5D7FF;
    .topBox{
      background:rgba(4,21,44,1);
      box-shadow:0px 1px 2px 0px rgba(60,150,255,0.35);
      position:absolute;
      border:1px solid rgba(71,137,214,1);
      .vw(136);
      .vh(48);
      font-size:12px;
      .vhLH(24);
      left:1.8vw;
      .vtop(28);
      text-align:center;
      span{
        color:#f9f9f9;
      }
      i{
        position: absolute;
        left: 53%;
        color:rgba(71,137,214,1);
        margin-left: -5px;
        bottom: -5px;
        display:block;
        width:10px;
        height:5px;
        z-index: 10;
        text-align:center;
        line-height:5px;
      }
      i:after{
        content:'';
        display:block;
        position:absolute;
        .vlw(1.896);
        top: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #04152c;
      }
    }
  }
  .middleTime{
    .vh(72);
    position:relative;
    color:#B5D7FF;
    .bottomBox{
      .vw(96);
      position:absolute;
      left:9.31vw;
      top:0;
      i{
        position: absolute;
        left: 53%;
        color:rgba(255,164,20,1);
        margin-left: -5px;
        bottom: -1.3vh;
        display:block;
        width:10px;
        height:5px;
        z-index: 10;
        text-align:center;
        line-height:5px;
      }
      i:after{
        content:'';
        display:block;
        position:absolute;
        left: 0.138vw;
        top: 0.1vh;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 4px solid #04152c;
      }
      div{
        position:absolute;
        .vw(96);
        .vtop(8);
        left:0;
        text-align:center;
        .vh(35);
        .vhLH(35);
        border:0.5px solid rgba(255,164,20,1);
        box-shadow:0px 4px 8px 0px rgba(243,138,0,0.35);
        background:rgba(4,21,44,1);
      }
    }
  }
}
</style>
