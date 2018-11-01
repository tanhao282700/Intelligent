<!--
    步骤条下的详细信息
-->
<template>
    <div class="routingTask">    
      <el-row>
        <el-col :span="6">
          <div class="taskDtl">
            <el-row :gutter="20">
              <el-col :span="10"><div class="taskLabel">类型</div></el-col>
              <el-col :span="14"><div class="taskCont">{{data.info.title}}</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10"><div class="taskLabel">设备类型</div></el-col>
              <el-col :span="14"><div class="taskCont">{{data.info.devicename}}</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10"><div class="taskLabel">设备地点</div></el-col>
              <el-col :span="14"><div class="taskCont">{{data.info.floorname}}</div></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10"><div class="taskLabel">工单处理人员</div></el-col>
              <el-col :span="14"><div class="taskCont">{{data.info.user_name}}</div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>  
      <div>
        <div class="contLabel">详情描述</div>
        <el-input
          type="textarea"
          class="controlCont controlCont1"
          :rows="2"
          placeholder="请输入内容"
          v-model="data.desc">
        </el-input>
      </div> 
      <div >
        <div class="contLabel">退回原因</div>
        <el-input
          type="textarea"
          :rows="2"
          class="controlCont controlCont2"
          placeholder="请输入内容"
          v-model="data.backExcuse">
        </el-input>
      </div>
      <div class="dealimg">
        <el-row :gutter="20">
          <el-col :span="12">
            <div>处理前</div>
          </el-col>
          <el-col :span="12">
            <div>处理后</div>
          </el-col>
        </el-row>
        <div>
          <div class="imgs1">
            <img :src="item.src" v-for="item in data.imgs1">
          </div>
          <Lines :top="0" :hei="100" class="lines"/>
          <div class="imgs2">
            <img :src="item.src" v-for="item in data.imgs2">
          </div>
        </div>
      </div>
      <div class="rightHead" v-if="data.state=='-1'">
        <span class="infoBusy" v-text="'拒绝退单'"></span>
        <span class="infoSend" v-text="'允许退单'"></span>
      </div>
      <div class="rightHead" v-if="data.state=='0'">
        <span class="infoBusy" v-text="'拒绝延期'"></span>
        <span class="infoSend" v-text="'允许延期'"></span>
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
        this.data = this.data;
      },
      mounted() {

      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vw(@val){
  width:@val*100/1366vw;
}
.vwMLR(@val){
  margin: 0 @val*100/1366vw;
}
.vwMR(@val){
  margin-right:@val*100/1366vw;
}
.routingTask{
  width:100%;
  height:100%;
  .taskDtl{
    width:100%;
    .vhMT(11);
    padding:0 1.464vw;
    .taskLabel{
      color:#4F648B;
    }
    .taskCont{
      color:#B5D7FF;
    }
  }
  .contLabel{
      .vhLH(54);
      padding:0 1.464vw;
      color:#4F648B;
  }
  .controlCont{
      padding:0 1.464vw;
  }
  .controlCont1{
    .vh(50);
    box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
    border-radius:1px;
  }
  .controlCont2{
    .vh(70);
    box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
    border-radius:1px;
  }
  .rightHead{
    .vw(234);
    bottom:0;
    right:0;
    position: absolute;
    .vhLH(52);
    color:#fff;
    .infoBusy{
      .vhMT(9);
      display:inline-block;
      .vhLH(32);
      .vw(96);
      background:#164488;
      font-size:12px;
      border-radius:2px;
      text-align:center;
      .vwMR(12);
      &:hover{
        cursor:pointer;
      }
    }
    .infoSend{
      .vhMT(9);
      display:inline-block;
      .vhLH(32);
      .vw(96);
      background:#1989FA;
      border-radius:2px;
      font-size:12px;
      text-align:center;
      &:hover{
        cursor:pointer;
      }
    }
  }
  .dealimg{
    padding:0 1.464vw;
    color:#4F648B;
    .vhLH(34);
    .lines{
      float:left;
      .vwMLR(10)
    }
    .imgs1,.imgs2{
      float:left;
      .vw(414);
      .vh(100);
      white-space: nowrap;
      overflow:hidden;
      img{
        .vw(90);
        .vh(90);
        margin:0.22vw;
      }
    }
  }
}
</style>
