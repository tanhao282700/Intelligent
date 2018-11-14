<!--
    步骤条下的详细信息
-->
<template>
    <div class="routingTask">    
      <ul v-if="newData.desc && newData.desc.length>0">
        <li class="job_det" :span="Math.floor(24/newData.desc.length)" v-for="(item,index) in newData.desc" :key="index">
          <div class="taskDtl">
              <div class="taskLabel" v-if="item">{{item.label}}</div>
              <div class="taskCont">{{item.value}}</div>
          </div>
        </li>
      </ul>  
      <div style="clear:both"></div>
      <div v-if="backExcu2">
        <div class="contLabel" v-if="backExcu2 && newData.localDesc">{{newData.localDesc.label}}</div>
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
              <el-col :span="6"><div class="taskLabel" v-if="item">{{item.label}}</div></el-col>
              <el-col :span="18"><div class="taskCont">{{item.value}}</div></el-col>
            </el-row>
          </div>
        </el-col>
      </el-row> 
      <div v-if="backExcu && newData.localDesc2">
        <div class="contLabel" v-text="backExcu?newData.localDesc2.label:''"></div>
        <el-input
          type="textarea"
          :rows="2"
          class="controlCont controlCont2"
          placeholder="请输入内容"
          v-model="newData.localDesc2.value">
        </el-input>
      </div>
      <div class="dealimg" v-if="(newData.pic1 && newData.pic1!=='') && (newData.pic2 && newData.pic2!=='')">
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
      <div class="contLabel" v-text="'巡检表格'" v-show="tableShow"></div>
      <div class="boxs" style="width:95.6%;margin:0 2.2% 0" v-show="tableShow" v-if="newData.tableData">
        <el-table
        :height="220"
        :data="newData.tableData.data"
        style="width: 100%">
        <el-table-column
            :key="i"
            v-for="(v,i) in newData.tableData.th"
            :prop="v.prop"
            :show-overflow-tooltip="true"
            :label="v.label"
            :width="v.wid"
             :min-width="v.minWid">
        </el-table-column>
        </el-table>
      </div>
      <div class="rightHead" v-if="newData.vuename=='routing' && newData.now_state=='3'">
        <span class="infoBusy" v-text="'拒绝退单'" @click="dealWork(5)"></span>
        <span class="infoSend" v-text="'允许退单'" @click="dealWork(4)"></span>
      </div>
      <div class="rightHead" v-else-if="newData.vuename=='worklist' && newData.now_state=='5'">
        <span class="infoBusy" v-text="'拒绝退单'" @click="dealWork(8)"></span>
        <span class="infoSend" v-text="'允许退单'" @click="dealWork(6)"></span>
      </div>
      <div class="rightHead" v-else-if="newData.vuename=='worklist' && newData.now_state=='2'">
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
          backExcu2:false,
          tableShow:false
        }
      },
      methods:{
          dealWork(type){
            this.$emit('dealWork',{type:type,infos:this.newData})
          }
      },
      watch:{
        data:{
            handler(val){
              if(val){
                this.newData = val;
                if(this.newData.localDesc2){
                  this.newData.localDesc2.label?this.backExcu=true:this.backExcu=false;
                }
                if(this.newData.localDesc){
                  this.newData.localDesc.label?this.backExcu2 =true:this.backExcu2 = false;
                }
                if(this.newData.sendInfos){
                  this.newData.sendInfos.length>0?this.sendInfo = true :this.sendInfo = false;
                }
                if(this.newData.tableData && this.newData.tableData.th.length>0){
                  this.tableShow = true;
                }else{
                  this.tableShow = false;
                }
              }
            },
            deep:true
          }
      },
      create(){
        
      },
      mounted() {
        this.newData = this.data;
        if(this.newData.localDesc){
          this.newData.localDesc.label?this.backExcu=true:this.backExcu=false;
        }
        if(this.newData.localDesc2){
          this.newData.localDesc2.label?this.backExcu2 =true:this.backExcu2 = false;
        }
        if(this.newData.sendInfos){
          this.newData.sendInfos.length>0?this.sendInfo = true :this.sendInfo = false;
        }
        if(this.newData.tableData && this.newData.tableData.th.length>0){
          this.tableShow = true;
        }else{
          this.tableShow = false;
        }
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
    margin-top:0.11rem;
    overflow:hidden;
    padding:0 1.464vw;
    .taskLabel{
      float:left;
      padding:0 0.1rem;
      color:#4F648B;
    }
    .taskCont{
      float:left;
      padding:0 0.1rem;
      color:#B5D7FF;
    }
  }
  .job_det{
    float:left;
  }
  .contLabel{
      line-height:0.45rem;
      padding:0 1.464vw;
      color:#4F648B;
  }
  .controlCont{
      padding:0 1.464vw;
  }
  .controlCont1{
    height:0.5rem;
    border-radius:1px;
  }
  .controlCont2{
    height:0.7rem;
    box-shadow:0px 0px 1px 0px rgba(87,113,176,0.15),0px 1px 2px 0px rgba(0,0,0,0.5);
    border-radius:1px;
  }
  .rightHead{
    width:2.34rem;
    bottom:0;
    right:0;
    position: absolute;
    line-height:0.52rem;
    color:#fff;
    .infoBusy{
      margin-top:0.09rem;
      display:inline-block;
      line-height:0.32rem;
      width:0.96rem;
      background:#164488;
      font-size:12px;
      border-radius:2px;
      text-align:center;
      margin-right:0.12rem;
      &:hover{
        cursor:pointer;
      }
    }
    .infoSend{
      margin-top:0.09rem;
      display:inline-block;
      line-height:0.32rem;
      width:0.96rem;
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
      margin: 0 0.1rem;
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
        margin:0.22rem;
      }
    }
  }
}
</style>
