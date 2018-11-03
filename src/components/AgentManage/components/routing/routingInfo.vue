<!--
    步骤条下的详细信息
-->
<template>
    <div class="routingTask">    
      <el-row>
        <el-col :span="24/newData.desc.length" v-for="(item,index) in newData.desc" :key="index">
          <div class="taskDtl">
            <el-row :gutter="20">
              <el-col :span="10"><div class="taskLabel">{{item.label}}</div></el-col>
              <el-col :span="14"><div class="taskCont">{{item.value}}</div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>  
      <div v-if="backExcu2">
        <div class="contLabel" v-text="this.backExcu?newData.localDesc.label:''"></div>
        <el-input
          type="textarea"
          class="controlCont controlCont1"
          :rows="2"
          placeholder="请输入内容"
          v-model="newData.localDesc.value">
        </el-input>
      </div> 
      <el-row v-if="sendInfo">
        <el-col :span="12" v-for="(item,index) in newData.sendInfos" :key="index">
          <div class="taskDtl" >
            <el-row :gutter="20">
              <el-col :span="6"><div class="taskLabel">{{item.label}}</div></el-col>
              <el-col :span="18"><div class="taskCont">{{item.value}}</div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row> 
      <div v-if="backExcu">
        <div class="contLabel" v-text="this.backExcu?newData.localDesc2.label:''"></div>
        <el-input
          type="textarea"
          :rows="2"
          class="controlCont controlCont2"
          placeholder="请输入内容"
          v-model="newData.localDesc2.value">
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
            <img :src="item.pic_url" v-for="item in newData.pic1">
          </div>
          <Lines :top="0" :hei="100" class="lines"/>
          <div class="imgs2">
            <img :src="item.pic_url" v-for="item in newData.pic2">
          </div>
        </div>
      </div>
      <div class="rightHead" v-if="newData.info && newData.info.now_state=='5'">
        <span class="infoBusy" v-text="'拒绝退单'" @click="dealWork(8)"></span>
        <span class="infoSend" v-text="'允许退单'" @click="dealWork(6)"></span>
      </div>
      <div class="rightHead" v-else-if="newData.info && newData.info.now_state=='2'">
        <span class="infoBusy" v-text="'拒绝延期'" @click="dealWork(7)"></span>
        <span class="infoSend" v-text="'允许延期'" @click="dealWork(3)"></span>
      </div>
    </div>
</template>

<script>
  import utils from "../../../../assets/js/utils.js";
  export default {
      props:['data'],
      data () {
        return {
          newData:{},
          sendInfo:false,
          backExcu:false,
          backExcu2:false

        }
      },
      methods:{
          dealWork(type){
            this.$emit('dealWork',{type:type,infos:this.newData})
          }
      },
      watch:{
        data(val){
          this.newData = val;
          console.log(this.newData)
          this.newData.localDesc.label?this.backExcu=true:this.backExcu=false;
          this.newData.localDesc2.label?this.backExcu2 =true:this.backExcu2 = false;
          this.newData.sendInfos.length>0?this.sendInfo = true :this.sendInfo = false;
        }
      },
      create(){
        
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
      line-height:0.54rem;
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
    height:0.7rem;
    box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
    border-radius:1px;
  }
  .rightHead{
    .vw(234);
    bottom:0;
    right:0;
    position: absolute;
    line-height:0.52rem;
    color:#fff;
    .infoBusy{
      .vhMT(9);
      display:inline-block;
      line-height:0.32rem;
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
      line-height:0.32rem;
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
    line-height:0.34rem;
    .lines{
      float:left;
      .vwMLR(10)
    }
    .imgs1,.imgs2{
      float:left;
      .vw(414);
      height:1rem;
      white-space: nowrap;
      overflow:hidden;
      img{
        width:0.9rem;
        height:0.9rem;
        margin:0.22vw;
      }
    }
  }
}
</style>
