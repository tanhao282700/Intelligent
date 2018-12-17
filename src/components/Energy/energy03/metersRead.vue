<template>
  <!-- 三表远抄模块 -->
  <div class="meterCopy">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>能源管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>三表远抄</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容区域-->
    <div class="contentBox">
      <div class="meterNav">
        <span v-if="sysInfo.role_string[5]!=0" @click="changeView('ReadNumber')" :class="{'active':viewPath=='ReadNumber'}">实时读数</span>
        <span v-if="sysInfo.role_string[6]!=0" @click="changeView('History')" :class="{'active':viewPath=='History'}">历史记录录入</span>
        <span @click="changeView('RecordHistory')" :class="{'active':viewPath=='RecordHistory'}">表具历史读数</span>
      </div>
      <div class="meterCon boxs">
        <component :is="viewPath"></component>
      </div>
    </div>



  </div>
</template>

<script>
  import ReadNumber from './ReadNumber.vue'
  import History from './History.vue'
  import RecordHistory from './RecordHistory.vue'
  export default {
    name: 'meterCopy',
    components: {ReadNumber,History,RecordHistory},
    data () {
      return {
        viewPath:'',
        sysInfo:{}
      }
    },
    methods:{
      changeView(path){
          this.viewPath = path
      }
    },
    created() {
      this.sysInfo = this.$store.state.sysList[2]
      if(this.sysInfo.role_string[5]!=0){
          this.viewPath = 'ReadNumber'
      }else{
        this.viewPath = 'History'
      }
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  @import '../../../assets/css/comon.less';
  .meterCopy{
    width:100%;
    height:100%;
    padding:0 30px 50px 30px;
    .contentBox{
      display: flex;
      flex-direction: column;
      .meterNav{
        height:40px;
        display: flex;
        flex-direction: row;
        span{
          color:#777b86;
          font-size:.16rem;
          display: flex;
          align-items: center;
          margin-left:24px;
          &:first-child{
            margin-left:0;
          }
          &:hover{
            cursor: pointer;
          }
        }
        .active{
          color:#0064ba;
          border-bottom:2px solid #0064ba;
          padding-top:2px;
        }
      }
      .meterCon{
        flex:1;
        padding:0 18px;
      }
    }
  }
</style>
