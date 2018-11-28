<!--
    steps步骤条封装
    2018-10-18
-->
<template>
    <div class="routingTaskModdel boxs">    
        <div class="tabHead">
          <div class="jobBoxs">
            <SelectBox 
              :options = 'query.systemss' 
              :value = "queryCon.system" 
              :icon="'el-icon-d-caret'"
              placeholder="系统"
              @change = "change1"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'query.areass' 
              :value = "queryCon.area" 
              :icon="'el-icon-d-caret'"
              placeholder="区域" 
              @change = "change2"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'query.examines' 
              :value = "queryCon.exam" 
              :icon="'el-icon-d-caret'"
              placeholder="巡检人" 
              @change = "change4"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'query.taskStatus' 
              :value = "queryCon.taskStatu" 
              :icon="'el-icon-d-caret'"
              placeholder="任务状态" 
              @change = "change3"
            />
          </div>
          <div class="searchBoxs" @click="searchXJ">
            <i class="el-icon-search"></i>
            <span>筛选</span>
          </div>
          <div class="searchBoxs addBoxs" @click="addTemp">
            <i></i>
            <span>新增</span>
          </div>
        </div> 
        <Table style="width:100%;" 
              :table = "table"
              @rowClick = "rowClick"
            />
    </div>
</template>

<script>
  import SelectBox from '@/components/form/selectBox';
  import State from './state';
  import TimePickerT from '@/components/AgentManage/components/work/timePickerTit2';
  import Table from '@/components/common/table'
  import deal from './deal';
  export default {
      props:['table','query'],
      components:{
        'SelectBox':SelectBox,
        'TimePickerT':TimePickerT,
        'Table':Table
      },
      data () {
        return {
          queryCon:{
            system:'',
            area:'',
            exam:'',
            taskStatu:''
          }
        }
      },
      methods:{
          change1(val){ //选择
            this.queryCon.system = val;
            this.$emit('getSys',val);
          },
          change2(val){ //选择
            this.queryCon.area = val;
          },
          change4(val){ //选择
            this.queryCon.exam = val;
          },
          change3(val){ //选择
            this.queryCon.taskStatu = val;
          },
          rowClick(rowData){
            this.$emit('checkDetail',rowData);
          },
          update(item){
            this.$emit('updateDetail',item);
          },
          deletes(item){
             this.$emit('deleteDetail',item);
          },
          addTemp(){
            this.$emit('addDetail',0);
          },
          searchXJ(){
            this.$emit('searchXJ',this.queryCon)
          }
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
.routingTaskModdel{
  width:95.6%;
  height:5.35rem;
  .tabHead{
      width: 100%;
      position: relative;
      .vh(59);
      .vhPT(20);
      .jobBoxs{
        float: left;
        width: 1.15rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.2rem;
      }
      .nameBoxs{
        float: left;
         width: 0.87rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.1rem;
      }
      .searchBoxs{
        float: left;
        margin-left: 0.12rem;
        width: 0.93rem;
        .vh(32);
        .vhLH(32);
        color: #fff;
        font-size: 0.14rem;
        text-align: center;
        cursor: pointer;
        background-image: linear-gradient(0deg, 
        #2772e3 0%, 
        #4b94f9 100%);
        border-radius: 0.02rem;
        i{
          font-size: 0.16rem;
          margin-right: 0.05rem;
          font-weight: 600;
        }
      }
      .addBoxs{
        float:right;
        margin-right: 0.12rem;
        i{
          display:inline-block;
          width:0.16rem;
          height:0.16rem;
          vertical-align:middle;
          background:url(../../../../assets/img/AgentManage/add.png) no-repeat;
          background-size:0.16rem;
        }
      }
      .dateBox{
        position: absolute;
        .vhTop(24);
        left: 4.95rem;
      }
    }
}
</style>
