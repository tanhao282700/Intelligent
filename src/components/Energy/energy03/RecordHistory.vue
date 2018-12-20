<template>
  <div class="readNumber recordHistory" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading">
    <div class="head">
      <div class="timeSercher">
        <el-date-picker
          v-model="timeModel"
          type="daterange"
          value-format="yyyyMMdd"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="type">
        <span @click="changeType(1)" :class="{'active':currentType==1}">区域
          <div class="spacing">
            <div class="to-top"></div>
            <div class="to-bottom"></div>
          </div>
        </span>
        <span @click="changeType(2)" :class="{'active':currentType==2}">系统</span>
      </div>
      <div class="search">
        <div class="limition">
          <template v-if="currentType==1">
          <el-select placeholder="选择楼层" clearbel @change="choseQuery1" v-model="areaForm.id1" class="querySelectItem">
            <el-option label="选择楼层" value=""></el-option>
            <el-option
              v-for="item in areaData1"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          </template>
          <el-select v-if="currentType==1" placeholder="选择区间" @change="choseQuery2" v-model="areaForm.id2" class="querySelectItem">
            <el-option label="选择区间" value=""></el-option>
            <el-option
              v-for="item in areaData2"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-if="currentType==1" placeholder="选择区域" v-model="areaForm.id3" class="querySelectItem">
            <el-option label="选择区域" value=""></el-option>
            <el-option
              v-for="item in areaData3"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-if="currentType==2" placeholder="选择系统" clearbel @change="choseQuery4" v-model="sysForm.id1" class="querySelectItem">
            <el-option label="选择系统" value=""></el-option>
            <el-option
              v-for="item in sysData1"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-if="currentType==2" placeholder="选择区域" clearbel v-model="sysForm.id2" class="querySelectItem">
            <el-option label="选择区域" value=""></el-option>
            <el-option
              v-for="item in sysData2"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="btn22">
          <el-button type="primary" @click="query" icon="el-icon-search" class="metersQueryBtn">查询</el-button>
        </div>
      </div>
    </div>
    <div class="con">
      <div class="left">
        <div class="naver" @click="changeRecordType(1)" :class="{'active':recordType==1}" >
          <span>电</span>
          <span>表</span>
        </div>
        <div class="naver" @click="changeRecordType(2)" :class="{'active':recordType==2}">
          <span>水</span>
          <span>表</span></div>
        <div class="naver" @click="changeRecordType(3)" :class="{'active':recordType==3}">
          <span>气</span>
          <span>表</span>
        </div>
      </div>
      <div class="right">
        <template>
          <el-table
            :data="tableData"
            height="500"
            style="width: 100%;">
            <el-table-column
              prop="name"
              :label="typeName">
            </el-table-column>
            <el-table-column
              prop="start_read"
              label="起始读数">
            </el-table-column>
            <el-table-column
              prop="end_read"
              label="截止读数">
            </el-table-column>
            <el-table-column
              prop="use_value"
              label="使用值">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>


  </div>
</template>
<script>
  export default{
    name:'ReadNumber',
    data(){
      return{
        timeModel:[],
        recordType:1,
        typeName:'电表名',
        tableData: [],
        loading:true,
        currentType:1,  //区域还是系统
        areaData1:[], //区域第一个筛选框初始化
        areaData2:[],
        areaData3:[],
        sysData1:[],
        sysData2:[],
        dianData:[],
        shuiData:[],
        qiData:[],
        areaForm:{// 区域筛选条件
          project_id:1,
          floor_id:0,
          sys_menu_id:0,
          start_date:'',
          end_date:'',
        },
        sysForm:{// 系统筛选条件
          project_id:1,
          system_id:1,
          id1:'',
          id2:'',
        },
      }
    },
    watch:{

    },
    methods:{
        initAreaData(type){
          this.dianData = []
          this.shuiData = []
          this.qiData = []
          this.$http.post('/hotel_energy/history_read',this.areaForm).then((res)=>{
            if(res.data.message==='success'){
              this.areaData1 = res.data.data.area_level;
              res.data.data.history_read.map((item)=>{
                  res.data.data.type_map.map((parent)=>{
                      parent.arr.map((child)=>{
                          if(item.category_id===child){
                            item.start_read += parent.unit
                            item.end_read += parent.unit
                            item.use_value += parent.unit
                              switch (parent.type){
                                case '电':
                                  this.dianData.push(item)
                                  break;
                                case '水':
                                  this.shuiData.push(item)
                                  break;
                                default:
                                  this.qiData.push(item)
                              }
                              return
                          }
                      })
                  })
              })
              this.changeRecordType(type)
              this.loading = false;
            }else{

            }
          })
        },
      changeRecordType(type){
          this.recordType = type;
          switch (type) {
            case 1:
                this.tableData = this.dianData;
                break;
            case 2:
                this.tableData = this.shuiData;
                break;
            default:
                this.tableData = this.qiData;
          }
      },
      query(){
          this.loading = true
        if(this.currentType===1) {   //区域查询
          console.log(this.timeModel)
          if(this.timeModel){
            this.areaForm.start_date = this.timeModel[0]
            this.areaForm.end_date = this.timeModel[1]
          }
          if(this.areaForm.id1){
            this.areaForm.floor_id = this.areaForm.id1
          }else{
            this.areaForm.floor_id = 0
          }
          if(this.areaForm.id2){
            this.areaForm.floor_id = this.areaForm.id2
          }
          if(this.areaForm.id3){
            this.areaForm.floor_id = this.areaForm.id3
          }
          this.initAreaData(this.recordType)
        }else{

        }
      },
      choseQuery1(){

      },
      choseQuery2(){

      },
      choseQuery4(){

      },
      changeType(type){
        this.currentType = type
      },

    },
    created(){
      this.areaForm.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
      this.areaForm.project_id = this.$store.state.projectId;
      let curDate = new Date();
      var preDate = new Date(curDate.getTime() - 24*60*60*1000); //前一天
      this.areaForm.start_date = preDate.getFullYear().toString()+(preDate.getMonth()+1).toString()+preDate.getDate()
      this.areaForm.end_date = this.areaForm.start_date
      this.sysForm.project_id = this.$store.state.projectId;
    },
    mounted(){
      this.initAreaData(1)
    },
    beforeDestroy(){

    },
    destroyed(){

    },
  }
</script>
<style>
  .recordHistory .el-table{
    height:100%!important;
    overflow:hidden;
  }
  .recordHistory .el-table .cell{
    text-align: center;
  }
  .recordHistory .el-table__header th{
    background:rgba(0,0,0,.4)!important;
  }
  .recordHistory .el-table th{
    color: #ffa414;
  }
  .recordHistory .el-table__body td{
    background:rgba(0,0,0,.2)!important;
    border-right:1px solid rgba(150,150,150,.1);
    border-bottom:1px solid rgba(150,150,150,.1)!important;
  }
  .recordHistory .el-table__body .cell{
    color: #b5d7ff!important;
  }
  .metersQueryBtn{
    height: .32rem;
    width: .82rem;
    padding: 0;
  }
  .typesItemBox{
    padding: .1rem 0 0;
    text-align: center;
    line-height: .2rem;
  }
  .readNumber .el-input{
    height: .2rem!important;
  }
  .readNumber .querySelectItem{
    margin-left:.1rem;
  }
  .readNumber .querySelectItem:last-child{
    margin-right: .1rem;
  }
  .readNumber .querySelectItem::after{
    background: url('../../../assets/img/Permission/down.png') no-repeat center;
    height: 100%;
    right: 2px;
  }
  .readNumber .el-input .el-input__inner{
    border:none!important;
    border-bottom:1px solid #1989fa!important;
    height:90%!important;
    padding:0 0 0 2px!important;
  }
  .readNumber .modalBox .modalBoxIn .titBox{
    height:50px!important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .readNumber .modalBox .modalBoxIn{
    width:578px!important;
    height:536px!important;
  }
  .timeSercher .el-date-editor .el-range-input{
    height: 90%!important;
    background: none!important;
    border-bottom: 1px solid #1989fa!important;
    color: #ffffff!important;
    font-size:0.12rem;
  }
  .timeSercher .el-date-editor .el-range-separator{
    color: #ffffff!important;
    line-height: 0.2rem!important;
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/comon.less';
  .readNumber{
    width:100%;
    height:100%;
    .hidden{
      display: none!important;
    }
    .head{
      height:10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position:relative;
      .timeSercher{
        width:2.4rem;
        height:55.17%;
        position:absolute;
        left:0;
        top:22.4%;
      }
      .type{
        width:30%;
        height:55.17%;
        border:1px solid #3a84ef;
        border-radius:2px;
        display: flex;
        flex-direction: row;
        span{
          flex:1;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#1989f9;
          font-size:.16rem;
          position:relative;
          &:hover{
            cursor: pointer;
          }
          .spacing{
            position:absolute;
            right:0;
            top:0;
            width:1px;
            height:100%;
            .to-top{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0.5),rgba(73,143,226,0));
            }
            .to-bottom{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.5));
            }
          }
        }
        .active{
          background:rgba(0, 0, 0, 0.2);
        }
      }
      .search{
        width:31.17%;
        height:100%;
        position:absolute;
        right:0;
        top:0;
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .limition{
          width:70%;
          border:1px solid #3b84ed;
          border-radius:2px;
          height:55.17%;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }
    .con{
      height:90%;
      padding-bottom:0.2rem;
      display: flex;
      .left{
        width:0.5rem;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .naver{
          width:0.42rem;
          height:1.5rem;
          background-color: #1e459b;
          font-size:0.22rem;
          color:#999999;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius:0.04rem 0 0 0.04rem;
          &:hover{
            cursor:pointer;
          }
        }
        .active{
          width:0.5rem;
          background:#3b89f9;
          color: #ffffff;
          border-radius:0.06rem 0 0 0.06rem;
        }
      }
      .right{
        flex:1;
        overflow: hidden;
      }
    }
    .showBox2{
      overflow-y:auto;
      .itemlist{
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .parts{
        margin-left:.3rem;
      }
      .parts{
        height:100%;
        width:150px;
        .content{
          height:386px;
          margin-top:52px;
          background: linear-gradient(to top, rgba(1,13,29,.8) , rgba(1,13,29,0));
          .realtime1{
            background:url(../../../assets/img/Energy/water-total.png) no-repeat;
            background-size:100% 100%;
            position:relative;
          }
          .realtime0{
            background:url(../../../assets/img/Energy/electric-total.png) no-repeat;
            background-size:100% 100%;
            position:relative;
          }
          .realtime2{
            background:url(../../../assets/img/Energy/gas-total.png) no-repeat;
            background-size:100% 100%;
            position:relative;
          }
          .pic{
            width:150px;
            padding-bottom:150px;
            .numbers{
              width:122px;
              height:17px;
              display: flex;
              position:absolute;
              top:69px;
              left:15px;
              span{
                flex:1;
                border:1px solid white;
                color:white;
                display: flex;
                align-items: center;
                justify-content: center;
                background:#4d5d74;
              }
            }
            .danwei{
              position:absolute;
              right:14px;
              top:54px;
              color:white;
            }
          }
          .realtimeCon::-webkit-scrollbar {
            width:0px;
            height:0px;
          }
          .realtimeCon::-webkit-scrollbar-button    {
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar-track     {
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar-track-piece {
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar-thumb{
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar-corner {
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar-resizer  {
            background-color:rgba(0,0,0,0);
          }
          .realtimeCon::-webkit-scrollbar {
            width:10px;
            height:10px;
          }
          .types{
            height:108px;
            color:#b5d6ff;
            font-size:.12rem;
            margin-top:10px;
            .title{
              color:#4adb80;
              font-size:.16rem;
            }
          }
          .types:last-child{
            margin-top:0;
          }
        }
        .leixin{
          height:48px;
          color:#007fea;
          font-size:.12rem;
          line-height:48px;
          text-align: center;
        }
      }
    }
  }
</style>
