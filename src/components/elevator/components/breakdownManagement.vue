<!--
    电梯系统 故障管理
    made by 樊得涛
    start in 2018-9-28
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>故障管理</span></div>
    </div>
    <div class="breakdown">
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
          <el-select v-model="gzh.value" placeholder="故障状态">
            <el-option
              v-for="item in gzh.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="oneLevelBox">
          <el-select v-model="jindu.value" placeholder="处理进度">
            <el-option
              v-for="item in jindu.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="oneLevelBox">
          <el-select v-model="infoLevel.value" placeholder="信息等级">
            <el-option
              v-for="item in infoLevel.options"
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
  import tdCell from './tdCell';
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
             value: '-1',
             label: '全部'
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
            value: '-1',
            label: '全部'
          }, {
            value: '1',
            label: '1号客梯'
          }, {
            value: '2',
            label: '2号客梯'
          }],
          value: '',
        },
        gzh:{
          options: [{
             value: '-1',
             label: '全部'
           },{
             value: '1',
             label: '故障中'
           }, {
             value: '2',
             label: '正常'
           }],
           value: '',
        },
        jindu:{
          options: [{
             value: '-1',
             label: '全部'
           },{
             value: '1',
             label: '处理中'
           }, {
             value: '2',
             label: '已完成'
           }],
           value: '',
        },
        infoLevel:{
          options: [{
             value: '-1',
             label: '全部'
           },{
             value: '1',
             label: '告警'
           }, {
             value: '2',
             label: '预警'
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
            {num:'1',time:'2018/06/02',position:'青羊工业区K区7号楼1号客梯',type:'平层困人',infoLevel:'1',status:'1',jindu:'1',long:'未恢复'},
            {num:'2',time:'2018/09/02',position:'青羊工业区K区7号楼1号客梯',type:'平层困人',infoLevel:'2',status:'2',jindu:'2',long:'未恢复'},
            {num:'2',time:'2018/09/02',position:'青羊工业区K区7号楼3号客梯',type:'平层困人',infoLevel:'2',status:'2',jindu:'3',long:'10分20秒'},
          ],
          th:[
            {prop:'num',label:'序号',wid:50},
            {prop:'time',label:'时间',wid:158},
            {prop:'position',label:'位置',wid:306},
            {prop:'type',label:'故障类型',wid:158},
            {prop:'infoLevel',label:'信息等级',wid:158,
             operate: true,
              render: (h, param)=> {
                return h(tdCell,{
                  props: {key:'infoLevel',value:param.row.infoLevel},
                  on:{}
                });
              }
            },
            {prop:'status',label:'故障状态',wid:158,
             operate: true,
              render: (h, param)=> {
                return h(tdCell,{
                  props: {key:'status',value:param.row.status},
                  on:{}
                });
              }
            },
            {prop:'jindu',label:'工单进度',wid:158,
            operate: true,
              render: (h, param)=> {
                return h(tdCell,{
                  props: {key:'jindu',value:param.row.jindu},
                  on:{}
                });
              }
            },
            {prop:'long',label:'故障时长',
             operate: true,
              render: (h, param)=> {
                return h(tdCell,{
                  props: {key:'long',value:param.row.long},
                  on:{}
                });
              }
            },
          ]
        },

      }
    },
    methods:{
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
      searchData(){
        //alert(this.infoLevel.value)
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
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
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
  @import '../style/breakdownManagement.less';

</style>
