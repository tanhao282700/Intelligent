<!--
    电梯系统 数据监控
    made by 樊得涛
    start in 2018-9-28
-->
<template>
  <div>
    <div class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 电梯监测系统 > <span>数据监控</span></div>
    </div>
    <div class="dataHistory">
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
        <div class="searchBox">
          <div class="dateBox">
            <el-date-picker
              v-model="dateVal"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              range-separator="  -  "
            >
            </el-date-picker>
          </div>
          <div class="sltbtn">
            <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>

      <div class="self-table">
        <div class="jifang">
          <div class="header">机房状态</div>
          <div class="container">
            <div class="left">
              <span class="baseline">基准线</span>
              <lineChart v-if="lineData.jifang.wendu.average!=''" :datas="lineData.jifang.wendu"/>
            </div>
            <div class="line">
              <div class="line-in1"></div>
              <div class="line-in2"></div>
            </div>
            <div class="right">
              <span class="baseline">基准线</span>
              <lineChart v-if="lineData.jifang.shidu.average!=''" :datas="lineData.jifang.shidu"/>
            </div>
          </div>
        </div>
        <div class="self-table-bot">
          <div class="dikeng">
            <div class="header">底坑湿度</div>
            <div class="container">
              <span class="baseline">基准线</span>
              <lineChart v-if="lineData.dikeng.shidu.average!=''" :datas="lineData.dikeng.shidu"/>
            </div>
          </div>
          <div class="dianliu">
            <div class="header">电流电压</div>
            <div class="container">
              <lineChart2 :datas="lineData.dianliu.dy"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import utils from "../../../assets/js/utils.js";
  import Table from '../../common/table2';
  import lineChart from './lineChart';
  import lineChart2 from './lineChart2';
  export default {
    components:{
      Table,
      lineChart,
      lineChart2
    },
    data () {
      return {
        floorSelectedOptions:[],
        floorOptions: [],
        dateVal:'',
        dateIcon:false,
        lineData:{
          jifang:{
            wendu:{
              title:'机房温度/°C',
              id:'jifangwendu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[11, 11, 15, 13, 12, 13, 10],
              lineC:'#1b7ffd',
              average:''
            },
            shidu:{
              title:'机房湿度/％CH',
              id:'jifangshidu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[30, 40, 15, 28, 22, 35, 10],
              lineC:'#1b7ffd',
              average:''
            }
          },
          dikeng:{
            shidu:{
              title:'底坑湿度/％CH',
              id:'dikeng',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[30, 40, 15, 28, 22, 35, 10],
              lineC:'#f56c6c',
              average:''
            }
          },
          dianliu:{
            dy:{
              title:'电流电压',
              id:'dianliu',
              x:['4:00','8:00','12:00','16:00','20:00','24:00'],
              y:[
                 {name:'电流/A',lineC:'#ffa414',
                 data:[30, 40, 15, 28, 22, 35, 10]},
                 {name:'电压/V',lineC:'#2df0e0',
                 data:[120, 130, 120, 120, 180, 120, 120]},
              ],
            }
          }
        }
      }
    },
    methods:{
      searchData(){
        //alert('查询')
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      average(data,key,subkey){
        let sum = 0;
        data.forEach((v)=>{
          sum +=v;
        });
        sum = (sum/data.length).toFixed(2);
        this.lineData[key][subkey].average = sum;
      },
      //获取历史记录请求
      getHistory(num=1,date='',state='',type='',cont=''){
        this.average(this.lineData.jifang.wendu.y,'jifang','wendu');
        this.average(this.lineData.jifang.shidu.y,'jifang','shidu');
        this.average(this.lineData.dikeng.shidu.y,'dikeng','shidu');
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

  @import '../../../assets/css/common.css';
  @import '../../../assets/css/comon';
  .dataHistory{
    margin: 0 auto;
    width: 13.06rem;
    .vh(610);
    .vhMT(16);

    .selectBox{
      width: 100%;
      display: flex;
      .tRBrnBox {

        .el-cascader{
          .vhLineH(32);
          font-size: 0.12rem;
        }
        .el-cascader__label{
          color: #fff;
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
          left:-0.05rem;
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
        margin-left: 0.17rem;
        width: 0.88rem;
        .el-input {
          background-color: transparent !important;
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
        .vh(32);
        width: 1.15rem;
        border-radius: 2px;
        border: solid 1px #1989fa;
      }
      .searchBox{
        .dateBox{
          width: 2.11rem;
          .vh(32);
        }
        margin-left: 0.2rem;
        display: flex;
        .vh(32);
        .sltbtn{
          margin-left: 0.2rem;
          width: 0.87rem;
          display:inline-block;
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
    }

    .self-table{
      width: 13.06rem;
      margin: 0 auto;
      .vhMT(20);
      .el-table__header-wrapper{
        background-color: rgba(0,0,0,0.25)!important;
      }
      .jifang{
        width: 100%;
        .vh(260);
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
        .container{
          .vh(220);
          width:13.03rem;
          display: flex;
          justify-content: space-between;
          .left{
            width:50%;
            .vh(220);
            position:relative;
          }
          .line{
            .line-in1{
              width: 1px;
              .vh(106);
              .gradientT(rgba(74,144,226,0.88),rgba(74,144,226,0));
            }
            .line-in2{
              width: 1px;
              .vh(106);
              .gradientT(rgba(74,144,226,0),rgba(74,144,226,0.88));
            }
          }
        }
        .right{
          width:49%;
          .vh(220);
          position:relative;
        }
      }
      .self-table-bot{
        .vhMT(20);
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .dikeng{
        .vh(260);
        width:6.43rem;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
        .container{
          .vh(220);
          position:relative;
          width:100%;
        }
      }
      .dianliu{
        .vh(260);
        width:6.43rem;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        .header{
          width: 100%;
          .vh(40);
          .vhLH(40);
          padding-left:.16rem;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          color: #008aff;
        }
      }
      .container{
        .vh(220);
        position:relative;
        width:100%;
      }
    }
    .el-date-editor .el-range__icon{
      display:none;
    }
    .el-range-separator{
      color: #ffffff;
      padding: 0 0.1rem;
      .vhLineH(32);
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      padding: 0;
    }
    .el-range-editor .el-range-input {
      background: transparent;
      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
    .dataarraw1{
      position: absolute;
      top: 0;
      left: .68rem;
      color: #ffffff;
    }
    .dataarraw2{
      position: absolute;
      top: 0;
      right: .25rem;
      color: #ffffff;
    }
    .timeline{
      width: .76rem;
      border: solid 1px #1989fa;
      display:inline-block;
    }
    .timelineF{
      position: absolute;
      left: .1rem;
      top: .25rem;
    }
    .timelineR{
      position: absolute;
      right: .25rem;
      top: .25rem;
    }
    .baseline{
      position: absolute;
      top: .58rem;
      left: .14rem;
      width: 11px;
      .vh(30);
      font-family: PingFangSC-Light;
      font-size: .10rem;
      font-weight: normal;
      font-stretch: normal;
      line-height:15px;
      letter-spacing: 1px;
      color: #2df0e0;
    }
  }

</style>
