<!--
    代维系统 工单
    白 2018-8-24
-->
<template>
  <div class="workBox">
      <Crumbs :data ='crumbs'/>  
      <div class="workHead boxs">
        <div class="numBox" v-for="(v,i) in workH">
          <div class="numBoxIn">
            <p v-text="v.val" :style="{'color':v.color}"></p>
            <span v-text="v.tit"></span>
          </div>
          <Lines :hei="60" :top="20" v-if="i!=3"/>
        </div>
      </div>
      <div class="tableBoxs boxs">
        <div class="tabHead">
          <div class="jobBoxs">
            <SelectBox 
              :options = 'jobs' 
              :value = "vJob" 
              placeholder="专业岗位"
              @change = "change1"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'names' 
              :value = "vName" 
              placeholder="姓名" 
              @change = "change2"
            />
          </div>
          <div class="searchBoxs">
            <i class="el-icon-search"></i>
            <span>筛选</span>
          </div>
          <div class="dateBox">
            <TimePickerT 
                :value7= "value7"
                :cant  = 'cant'
                @changes = "changes"
                @deletes = 'deletes'
                @adds    = 'adds'
            />
          </div>
        </div>
        <div class="tableIn">
          <Table 
            style="width:100%" 
            :table = "table"
            @rowClick = "rowClick"
          />
        </div>
      </div>
      <div class="dispatch">
        <div class="dispatchBtn">
          <i class="el-icon-third-feiji"></i>
        </div>
      </div>
      <Dialog wid="1326" hei="640" ref="dialog">
        <WorkInfo @tableInfos2Show="tableInfos2Show"/>
      </Dialog> 
      <Dialog wid="910" hei="686" ref="tableInfos2">
            <div class="tableInfos">
                <div class="infoHead">
                  <span class="infoName" v-text="infoItem.name"></span>
                  <span class="infoState" v-text="this.infoTit(infoItem.state)"></span>
                  <span class="infoType" v-text="infoItem.sType"></span>
                </div>
                <div class="infoWater">

                </div>
                <div class="infoBoxs">

                </div>
            </div>
        </Dialog>     
  </div>
</template>

<script>


import utils from "../../assets/js/utils.js";
import SelectBox from '@/components/form/selectBox';
import TimePickerT from './components/work/timePickerTit2';
import Percentage from './components/work/Percentage';
import WorkInfo from './components/work/workInfo';

import Table from '@/components/common/table';
export default {
  components:{
    'Table':Table,
    'WorkInfo':WorkInfo,
    'SelectBox':SelectBox,
    'TimePickerT':TimePickerT
  },
  data () {
    return {
        crumbs:['工单'],
        workH:[
          {id:1,tit:'今日在岗人数',val:"12",color:'#b5d7ff'},
          {id:2,tit:'今日工单总数',val:"32",color:'#f38a00'},
          {id:3,tit:'已完成数量',val:"32",color:'#4ae283'},
          {id:4,tit:'今日工单完成率',val:"100%",color:'#4ae283'},
        ],
        jobs:[
          {label:'给排水',value:1},
          {label:'电梯',value:2},
          {label:'变配电',value:3},
          {label:'照明',value:4},
          {label:'暖通',value:5},
        ],
        vJob:-1,
        names:[
          {label:'李白',value:1},
          {label:'杜甫',value:2},
          {label:'王安石',value:3},
          {label:'白居易',value:4},
          {label:'狗蛋儿',value:5},
        ],
        vName:-1,
        //日期选择
        value7:'2018-8-24',
        cant:false,
        table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            // len:800, //总条数
            data:[
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:80}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:60}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:40}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:20}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:8,name:'白狗汪8',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:9,name:'白狗汪9',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100}, 
              {id:10,name:'白狗汪10',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,backApply:"-",fill:100},              
            ],
            th:[
              {prop:'name',label:'名称'},
              {prop:'tel',label:'电话',wid:180},
              {prop:'job',label:'工作岗位'},
              {prop:'sendNum',label:'派单量'},
              {prop:'dealing',label:'待处理'},
              {prop:'nocatch',label:'未接单'},
              {prop:'dealed',label:'已处理'},
              {prop:'backApply',label:'退单申请',wid:146},
              {prop:'fill',label:'完成率',wid:170,
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.fill,  
                      };
                      return h(Percentage,{
                      props: { btnss:btnss},
                      on:{}
                      });
                  } 
              },
            ]
        },
        infoItem:{},  //某个工单的详情
    }
  },
  methods:{
    change1(val){ //选择
      this.vJob = val;
    },
    change2(val){ //选择
      this.vName = val;
    },
    changes(val){
          this.value7 = val;
      }, 
      deletes(){
          let attrs = this.value7.split('-');
          // console.log(attrs)
          if(attrs[2]==1){
            if(attrs[1]==2 ||attrs[1]==4 || attrs[1]==6 ||attrs[1]==8 ||attrs[1]==9 ||attrs[1]==11 ||attrs[1]==1){
                attrs[2]=31;
            }else if(attrs[1]==5 ||attrs[1]==7 || attrs[1]==10 ){
                attrs[2]=30;
            }else if(attrs[1]==3 && Number(attrs[0])%4==0){
                attrs[2]=29;
            }else if(attrs[1]==3 && Number(attrs[0])%4!=0){
                attrs[2]=28;
            }
            if(attrs[1]==1){
                attrs[1] = 12;
                attrs[0] = Number(attrs[0])-1;
            }else{
                attrs[1] = Number(attrs[1])-1;
            }            
          }else{
              attrs[2] = Number(attrs[2])-1;
          }
          this.value7 = attrs.join('-'); 
      },
      adds(){
          if(this.cant){
              return;
          }
          let attrs = this.value7.split('-');

          if(((attrs[1]==1 ||attrs[1]==3 || attrs[1]==5 ||attrs[1]==7 ||attrs[1]==8 ||attrs[1]==10 ||attrs[1]==12) && attrs[2]==31)
              ||((attrs[1]==2 ||attrs[1]==6 || attrs[1]==9 ||attrs[1]==11) && attrs[2]==30) 
              ||((attrs[1]==2 && Number(attrs[0])%4==0) && attrs[2]==29)
              ||((attrs[1]==2 && Number(attrs[0])%4!=0) && attrs[2]==28)
          ){
              attrs[2] =1;
              if(attrs[1]==12){
                  attrs[1] = 1;
                  attrs[0] = Number(attrs[0])+1;
              }else{
                  attrs[1] = Number(attrs[1])+1;
              }   
          }else{
              attrs[2] = Number(attrs[2])+1;
          }
          this.value7 = attrs.join('-');    
      }, 
      rowClick(row){
        this.$refs.dialog.show();
        // console.log(row);
      },
      tableInfos2Show(item){
        console.log(item)
        this.infoItem = item;
        this.$refs.tableInfos2.show();
      },
      infoTit(state){
        let res = '';
        switch(state){
          case -1:
            res = '申请退单';
          break;
          case 0:
            res = '申请延期';
          break;
          case 1:
            res = '延期单';
          break;
          case 2:
            res = '处理中';
          break;
          case 3:
          break;
        }
        return res;
      } 
  },
  created() {
    
  },
  mounted() {
    // this.$refs.dialog.show();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';

.workBox{
  .workHead{
    width: 13.06rem;
    .vh(108);
    margin-left: 0.3rem;
    display: flex;
    .vhMT(8);
    .numBox{
      flex:1;
      display: flex;      
      .numBoxIn{
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1;
        p{
          display: block;
          .vh(86);
          .vhLH(100);
          font-size: 0.48rem;
          font-family: PingFangSC-Light;
        }
        span{
          font-size: 0.12rem;
          line-height: 0.12rem;
          color: #b5d7ff;
        }
      }
    }
  }
  .tableBoxs{
    width: 13.06rem;
    .vh(407);
    .vhMT(20);
    margin-left: 0.3rem;
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
      .dateBox{
        position: absolute;
        .vhTop(24);
        left: 4.95rem;
      }
    }
    .tableIn{
      width: 99%;
      .vh(328);
      margin-left: 1%;
      .tableBox{
         margin-left:0;
      }
    }
  }
  .dispatch{
    width: 100%;
    .vh(100);
    display: flex;
    // align-items: center;
    justify-content: center;
    .vhPT(20);
    .dispatchBtn{
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 50%;
      background-color: rgba(51, 51, 51, 0.2);
      box-shadow: 0px 4px 10px 0px 
        rgba(74, 144, 226, 0.4), 
        inset 1px 1px 2px 0px 
        rgba(248, 253, 255, 0.15), 
        inset 0px -1px 1px 0px 
        #4a90e2;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i{
          font-size: 0.32rem;
          color: #3b85ef;
        }
    }
  }
  .tableInfos{
    width: 100%;
    height: 100%;
    .infoHead{
      .vh(52);
      width: 100%;
      background: rgba(0,0,0,0.2);
      padding-left: 0.2rem;
      padding-right: 0.42rem;
      display: flex;
      align-items: center;
      span{
        font-size: 0.16rem;
        color: #fff;
      }
      .infoName{
        padding-right: 0.20rem;
      }
      .infoState{
        padding-left: 0.20rem;
        border-left: 0.01rem solid #4a90e2;
      }
      .infoType{
        font-size: 0.12rem;
      }
    }
  }
}
</style>
