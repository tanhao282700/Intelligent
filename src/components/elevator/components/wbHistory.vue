<!--
    电梯系统 维保历史
    made by 樊得涛
    start in 2018-9-27
-->
<template>
  <div>
    <div class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>维保历史</span></div>
    </div>
    <div class="wbHistory">
      <div class="selectBox">
        <div class="oneLevelBox">
          <el-select v-model="louOP.value" placeholder="请选择">
            <el-option
              v-for="item in louOP.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="oneLevelBox">
          <el-select v-model="keti.value" placeholder="请选择">
            <el-option
              v-for="item in keti.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="oneLevelBox">
          <el-select v-model="wb.value" placeholder="维保状态">
            <el-option
              v-for="item in wb.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="searchBox">
          <div class="dateBox" @click="toggleTimearraw">
            <el-date-picker
              ref='date'
              v-model="dateVal"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="  -  "
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
            <i class="el-select__caret el-input__icon dataarraw1"
               :class="{ 'el-icon-arrow-up': dateIcon,'el-icon-arrow-down': !dateIcon}"></i>
            <i class="el-select__caret el-input__icon  dataarraw2"
               :class="{ 'el-icon-arrow-up': dateIcon,'el-icon-arrow-down': !dateIcon}"></i>
            <span class="timeline timelineF"></span>
            <span class="timeline timelineR"></span>
          </div>
          <div class="sltbtn">
            <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <div class="exportBox">
          <button @click="exportExcel" type="button" class="self-button">
            <span class="icon-export"></span>
            <span>导出</span>
          </button>
        </div>
      </div>

      <div class="self-table">
        <Table @changePage="changePage" :table = "table"/>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import Table from '../../common/table2';
  export default {
    components:{
      Table
    },
    data () {
      return {
        dateVal:'',
        dateIcon:false,
        //选择楼类型
        louOP:{
          options: [{
             value: '',
             label: '请选择'
           },{
             value: '1',
             label: '1号楼'
           }, {
             value: '2',
             label: '2号楼'
           }, {
             value: '3',
             label: '3号楼'
           }],
           value: '',
        },
          //客梯
        keti:{
          options: [{
            value: '',
            label: '请选择'
          }, {
            value: '1',
            label: '1号客梯'
          }, {
            value: '2',
            label: '2号客梯'
          }],
          value: '',
        },
        wb:{
          options: [{
             value: '',
             label: '维保状态'
           },{
             value: '1',
             label: '正常'
           }, {
             value: '2',
             label: '异常'
           }],
           value: '',
        },

        posInput:'',

        pagenum:1,//页码


        //表格
        table:{
          hei:455, //table高度  设置后有滚动条
          len:2, //总条数
          pageSize:12, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            {num:'1',starttime:'2018/06/02',endtime:'2018/06/03',wbcontent:'XXXXXXXXXXXXXX',wbperson:'张三',tel:'134xxx34324',wbtype:'维修'},
            {num:'2',starttime:'2018/09/02',endtime:'2018/09/03',wbcontent:'XXXXXXXXXXXXXX',wbperson:'张三',tel:'134xxx34324',wbtype:'保养'},
          ],
          th:[
            {prop:'num',label:'序号',wid:50},
            {prop:'starttime',label:'开始时间',wid:201},
            {prop:'endtime',label:'结束时间',wid:201},
            {prop:'wbcontent',label:'维保内容',wid:201},
            {prop:'wbperson',label:'维保人',wid:201},
            {prop:'tel',label:'联系电话',wid:201},
            {prop:'wbtype',label:'维保类型',wid:201},
          ]
        },

      }
    },
    methods:{
      searchData(){

      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      toggleTimearraw(){
        this.dateIcon = !this.dateIcon;
      },
      //获取历史记录请求
      getHistory(num=1,date='',state='',type='',cont=''){

      },

      //选择页码查询
      changePage(val){

      },

      //选择查询条件后查询
      search(){

      },

      exportExcel(){

      },


      getHisExcel(num=1,date='',state='',type='',cont=''){

      }



    },
    created() {
      this.getHistory();
    },
    mounted() {
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  /*插件的样式*/
  .el-popper[x-placement^=bottom] .popper__arrow{
    border-bottom-color:#04152c!important;
    &::after{
      border-bottom-color:#04152c!important;
    }
  }
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  @import '../style/wbHistory.less';

</style>
