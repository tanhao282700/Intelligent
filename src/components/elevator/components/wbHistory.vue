<!--
    电梯系统 维保历史
    made by 樊得涛
    start in 2018-9-27
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>维保历史</span></div>
    </div>
    <div class="wbHistory">
      <div class="selectBox">
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-cascader
              :change-on-select='true'
              :options="floorOptions"
              v-model="floorSelectedOptions"
              @change="floorChange">
            </el-cascader>
          </div>
        </div>
        <div class="oneLevelBox">
          <div class="tRBrnBox">
            <el-select v-model="wb.value" placeholder="维保状态">
              <el-option
                v-for="item in wb.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="searchBox">
          <div class="dateBox">
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
        <el-table
          :height="tableHei"
          :data="tableData"
          stripe
          border
          style="width: 100%">
          <el-table-column
            v-for="(v,i) in tableThLists"
            :key="i"
            :resizable="false"
            :prop="v.prop"
            :label="v.label"
            :width="v.wid!=undefined?v.wid:''">
          </el-table-column>
        </el-table>

        <div class="pagingBox">
          <el-pagination
            @current-change="changePage"
            :current-page.sync="pagenumber"
            :pager-count="5"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="paging">
          </el-pagination>
          <span class="totalPage">共{{parseInt(paging/20)+(paging%20 !== 0?1:0)}}页</span>
        </div>
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
        floorSelectedOptions:[],
        floorOptions: [],
        dateVal:'',
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

        //表格
        tableHei:0,
        paging:0,//数据条数
        pagenumber:1,//页码
        tableThLists:[
          {prop:'num',label:'序号',wid:60},
          {prop:'time_start',label:'开始时间',wid:210},
          {prop:'time_end',label:'结束时间',wid:210},
          {prop:'wbCon',label:'维保内容',wid:210},
          {prop:'wePerson',label:'维保人',wid:210},
          {prop:'tel',label:'联系电话',wid:210},
          {prop:'wbType',label:'维保类型'},
        ],

        tableData: [
        ]

      }
    },
    methods:{
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      searchData(){

      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
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
      this.tableHei = utils.hei(455);
      this.getHistory();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .wbHistory{
    margin: 0 auto;
    margin-top: 0.16rem;
    width: 13.06rem;
    .vh(610);
    /*background-color: #000000;*/
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;

    .selectBox{
      /*#04152c*/
      width: 100%;
      .vh(72);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      position: relative;

      .dateBox{
        width: 2.15rem;
        position:relative;
        .el-range-editor .el-range-input{
          text-align: left;
          width: 0.88rem;
          .vh(24);
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          background-color: transparent;
          border-bottom: solid 1px #1989fa;
        }
        .el-range-editor.el-input__inner{
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover{
            border-color: #1989fa;
          }
          &::before {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            left: 0.88rem;
          }
          &::after {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            right: 0.1rem;
          }
        }
        .el-date-editor .el-range__close-icon{
          display: none;
        }
        .el-date-editor .el-range__icon{
          display: none;
        }
        .el-date-editor .el-range-separator {
          padding: 0 0.1rem;
          .vhLineH(32);
          width: 5%;
          color: #fff;
        }
      }
      .el-select{
        width: 100%;
        height: 100%;
      }
      .el-select>.el-input{
        height: 100%;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
      }
      .el-select .el-input__inner{
        width: 100%;
        padding: 0 0.1rem;
      }
      .el-select::after {
        content: "";
        pointer-events: none;
        display: block;
        width: 0;
        height: 0;
        border-width: 4px 4px 0;
        border-style: solid;
        border-color: #008aff transparent transparent; /*黄 透明 透明 */
        position: absolute;
        top: 50%-4px;
        right: 0.2rem;
      }
      .tRBrnBox {
        padding: 0 0.1rem;
        width: 100%;
        height: 100%;
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        .el-cascader{
          .vhLineH(32);
          font-size: 0.12rem;
        }
        .el-cascader__label{
          color: #fff;
          padding: 0;
        }
        .el-cascader .el-icon-arrow-down.is-reverse{
          transform: rotateZ(0deg);
        }
        .el-cascader-menu__item {
          font-size: 0.12rem;
          padding: 8px 20px;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #606266;
          height: 34px;
          line-height: 1.5;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          cursor: pointer;
          outline: 0;
        }
        .el-cascader .el-input__icon{
          display:block;
          width:0;
          height:0;
          border-width:4px 4px 0;
          border-style:solid;
          border-color:#008aff transparent transparent;/*黄 透明 透明 */
          position:absolute;
          top:50%-4px;
          right:0.1rem;
          &::before{
            content: "";
            /*pointer-events: none;
            display:block;
            width:0;
            height:0;
            border-width:4px 4px 0;
            border-style:solid;
            border-color:#008aff transparent transparent;!*黄 透明 透明 *!*/

          }
        }

        &:nth-of-type(2){
          margin-left: 0;
        }
        .el-input__prefix{
          display: none;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{

          &::after {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            right: 0;
          }
        }
        .el-select::after {
          content: "";
          pointer-events: none;
          display: block;
          width: 0;
          height: 0;
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #008aff transparent transparent; /*黄 透明 透明 */
          position: absolute;
          top: 50%-4px;
          right: 0;
        }
        .el-input {
          background-color: transparent !important;
          display: flex;
          align-items: center;
        }
        .el-input--suffix .el-input__inner {
          .vh(24);
          padding: 0;
          border: 0 !important;
          border-bottom: solid 1px #1989fa !important;
          background-color: transparent !important;
        }
      }
      .oneLevelBox{
        &:first-of-type{
          margin-left: 0;
        }
        margin-left: 0.12rem;
        .vh(32);
        display: inline-block;
        width: 1.15rem;
      }
      .searchBox{
        margin-left: 0.12rem;
        width: 3.02rem;
        display: flex;
        .vh(32);
        .el-input-group__append{
          background-color: #3a84ed!important;
          vertical-align: middle;
          display: table-cell;
          position: relative;
          border: 0!important;
          border-radius: 2px!important;
          border-top-left-radius: 0!important;
          border-bottom-left-radius: 0!important;
          padding: 0 0.2rem!important;
          width: 1px;
          white-space: nowrap;

          font-family: PingFangSC-Medium;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff!important;
        }
        .sltbtn{
          width: 0.87rem;
          display:inline-block;
          margin-left: -.02rem;
          .vh(32);
          .el-button--primary{
            width: 100%;
            height: 100%;
            display: inline-block;
            line-height: 1;
            padding: 0;
          }
        }
      }
      .exportBox{
        position: absolute;
        right: 0.2rem;
        .vhTop(20);
        width: 0.88rem;
        .vh(32);
        .self-button{
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 0.88rem;
          .vh(32);
          background-color: #3a84ed;
          color: #fff;
          border: 0;
          outline: none;
          border-radius: 2px;
          padding: 0;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          .icon-export{
            display: inline-block;
            width: 0.14rem;
            height: 0.14rem;
            background: url("../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
            background-size: 100% 100%;
            margin-right: 0.08rem;
          }
        }
      }
    }

    .self-table{
      width: 100%;
      padding: 0 0.2rem;
      .el-table th.is-leaf{
        border-bottom-color: rgba(181, 215, 255, 0.25)!important;
      }
      .el-table th{
        font-size: 0.16rem!important;
        color: #b5d7ff!important;
        height: 4.80769vh!important;
        line-height: 4.80769vh!important;
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table tr{
        font-size: 0.14rem!important;
        color: #439aff!important;
        height: 4.80769vh!important;
        line-height: 4.80769vh!important;
        background-color: rgba(73, 152, 240, 0.05)!important;
      }
      .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-right: 1px solid rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border, .el-table--group{
        border: 1px solid rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: rgba(181, 215, 255, 0.25)!important;
      }
      .el-table--border::after, .el-table--group::after{
        width: 0;
      }
      .el-table--striped .el-table__body tr.el-table__row--striped td{
        background: rgba(0, 0, 0, 0.1);
      }
      .el-table th>.cell{
        text-align: center;
      }
      .el-table .cell{
        text-align: center;
      }
      .el-table th{
        padding: 0;
      }
      .el-table td{
        padding: 0;
      }

      .pagingBox{
        .vhMT(29);
        padding: 0 0.2rem;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 0px solid rgba(58, 137, 249, 0.3);
        position: relative;
        .totalPage{
          display: flex;
          align-items: center;
          position: absolute;
          left: 0.2rem;
          font-family: PingFangSC-Regular;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #008aff;
        }
      }
    }
  }

</style>
