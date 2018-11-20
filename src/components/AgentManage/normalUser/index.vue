<!--
    代维系统（首页）
    白 2018-8-21
-->
<template>
  <div class="generation autoComponent">
      <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <div class="msgBox boxs">
        <div class="boxsTitG">
          <span class="tit">工单&巡检 完成情况</span>
        </div>
        <div class="msgsIn0">
          <div class="msgsIn">
            <div class="msgsInTit" v-text="`本月工单数`"></div>
            <div class="msgsInBoxs">
              <div class="msgsInCircle">
                <EchartCirFull ref="echartCirData3"  :echartCirData = "echartCirData3"/>
              </div>
              <ul class="msgsInTable">
                <li>
                  <label >工单总数</label>
                  <div class="numBox">
                    <span v-text="`${echartCirData3.total}单`"></span>
                  </div>
                </li>
                <li>
                  <label >已完成数</label>
                  <div class="numBox">
                      <div class="numFeal">
                        <div class="numLines" :style="{'width':2.10*echartCirData3.data[0].value/echartCirData3.total +'rem'}">{{echartCirData3.data[0].value}}</div>
                      </div>
                  </div>
                </li>
                <li>
                  <label >未完成数</label>
                  <div class="numBox">
                    <div class="numFeals">
                      <div class="numLines2" :style="{'width':2.10*echartCirData3.data[1].value/echartCirData3.total +'rem'}">{{echartCirData3.data[1].value}}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Lines :top="20" :hei="213"/>
          <div class="msgsIn">
            <div class="msgsInTit" v-text="`本月巡检任务数`"></div>
            <div class="msgsInBoxs">
              <div class="msgsInCircle">
                <EchartCirFull ref="echartCirData4"  :echartCirData = "echartCirData4"/>
              </div>
              <ul class="msgsInTable">
                <li>
                  <label >巡检单数</label>
                  <div class="numBox">
                    <span v-text="`${echartCirData4.total}单`"></span>
                  </div>
                </li>
                <li>
                  <label >已完成数</label>
                  <div class="numBox">
                      <div class="numFeal">
                        <div class="numLines" :style="{'width':2.10*echartCirData4.data[1].value/echartCirData4.total +'rem'}">{{echartCirData4.data[0].value}}</div>
                      </div>
                  </div>
                </li>
                <li>
                  <label >未完成数</label>
                  <div class="numBox">
                    <div class="numFeals">
                      <div class="numLines2" :style="{'width':2.10*echartCirData4.data[0].value/echartCirData4.total +'rem'}">{{echartCirData4.data[1].value}}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div  class="dealed boxs">
        <div class="boxsTitG">
          <span class="tit">工单&巡检 完成率</span>
        </div>
        <div class="workBox1">
          <div class="workBox1In">
            <div class="workBox1In1">
              <p class="marginTop" v-text="circleData.crate.monW+'%'"></p>
              <span class="colorY">本月工单完成率</span>
            </div>
            <Lines type="h" :wid="148" :left="35"/>
            <div class="workBox1In1">
              <p v-text="circleData.crate.monR+'%'"></p>
              <span class="colorB">本月巡检完成率</span>
            </div>
          </div>
          <div class="workBox1Cir">
            <div class="workBox1CirIn">
              <EchartPie :data="circleData" :style="{width:'1.98rem',height:'1.98rem'}"></EchartPie>
            </div>
          </div>
        </div>
      </div>
      <div  class="workFrom boxs">
        <div class="boxsTitG">
          <span class="tit">工单来源</span>
          <div class="totalNum">
            <div class="lines"></div>
            <span>总数：</span>
            <span>{{barData.total}}单</span>
          </div>
        </div>
        <div class="EchartBarBox">
          <EchartBar :data= "barData" />
        </div>
      </div>
  </div>
</template>

<script>

import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import EchartCirFull from '../../Energy/components/lookAll/EchartCirFull';
import EchartBar from '../components/index/echartBar';
import EchartPie from '../components/index/echartPie';

export default {
  name:'generationMBase',
  components:{
    'EchartCirFull':EchartCirFull,
    'EchartBar':EchartBar,
    'EchartPie':EchartPie,
    'Header':Header
  },
  computed:{

  },
  data () {
    return {
      crumbs:['代维系统'],
      navsData:{
          active:'item0',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
      },

      barData:{
          id:'barData',
          data:[],
          style:{width:'100%',height:'2.43rem',padding:'0.1rem'},
          total:1,
          xData:['系统派发','人工派发']
      },
      fillBoxs:[
        {id:'year',name:'年'},
        {id:'mon',name:'月'},
        {id:'week',name:'周'},
        {id:'day',name:'日'},
      ],
      idNow:'day',
      fillBoxs2:[
        {id:'dayWeek',name:'日/周'},
        {id:'monYear',name:'月/年'},
      ],
      idNow2:'dayWeek',
      circleData:{
        id:'canvas',
        style:{marginLeft:'0.1rem',marginTop:42*100/728+'vh'},
        data:[],
        total:0,
        crate:{
          monW:'0',
          monR:'0'
        },
      },
      echartCirData3:{
        id:'echart3',
        color:[
          '#f56c6c','#008aff'
        ],
        size:[0,'72.89%'],
        total:1,
        data:[
          {value:0, name:0+'%',tit:'未完成数'},
          {value:0, name:0+'%',tit:'已完成数'},
        ],
      },
      echartCirData4:{
        id:'echart4',
        color:[
          '#f56c6c','#008aff'
        ],
        size:[0,'72.89%'],
        total:1,
        data:[
          {value:0, name:0+'%',tit:'未完成数'},
          {value:0, name:0+'%',tit:'已完成数'},
        ],
      },

    }
  },
  methods:{
    getEchartData(){
      let _this =this;
      this.$http.post('/pc_ims/index',{user_id:21,flg:2})
      .then(function(res){
          //console.log(res)
          if(res.data.code==0){
             _this.echartCirData3.total = res.data.data.job.count;
             console.log(res.data.data);
             let gongdanwei = res.data.data.job.wei;
             let gongdanwan = res.data.data.job.wan;
             let xunjianwei = res.data.data.xunjian.wei;
             let xunjianwan = res.data.data.xunjian.wan;
             //工单
             _this.echartCirData3.data  = [
                {value:res.data.data.job.wan,name:Math.floor(gongdanwan/(gongdanwan+gongdanwei)*100)+'%',tit:'已完成数'},
                {value:res.data.data.job.wei,name:Math.floor(gongdanwei/(gongdanwan+gongdanwei)*100)+'%',tit:'未完成数'}];
                //巡检
            _this.echartCirData4.total = res.data.data.xunjian.count;
            _this.echartCirData4.data = [
              {value:res.data.data.xunjian.wan,name:Math.floor(xunjianwan/(xunjianwan+xunjianwei)*100)+'%',tit:'已完成数'},
              {value:res.data.data.xunjian.wei,name:Math.floor(xunjianwei/(xunjianwei+xunjianwan)*100)+'%',tit:'未完成数'}];
              //工单来源
             _this.barData.data = [res.data.data.source.sys,res.data.data.source.people]
             _this.barData.total = res.data.data.source.count;
             console.log(_this.barData.data)
             _this.circleData.data = [Math.floor(gongdanwan/(gongdanwan+gongdanwei)*100),'','',Math.floor(xunjianwan/(xunjianwan+xunjianwei)*100)]
             _this.circleData.total = (res.data.data.percent.count/100).toFixed(4);
             _this.circleData.crate = {
                monW:res.data.data.percent.job,
                monR:res.data.data.percent.xunjian
             }
             console.log(_this.circleData)
          }else{
            _this.$message({
              type:'error',
              message:res.data.msg
            })
          }
      });
    }
  },
  created() {

  },
  mounted() {
    this.getEchartData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
.generation{
  width: 100%;
  height: 100%;
  .boxsTitG{
    width: 100%;
    height:0.4rem;
    background: rgba(0,0,0,.2);
    padding-left: 0.16rem;
    padding-right: 0.2rem;
    span.tit{
      display: inline-block;
      font-size: 0.15rem;
      color:@color-blue;
      font-weight:400;
      font-family: PingFangSC-Medium;
      height:0.4rem;
      line-height:0.4rem;
    }
    .btnDate{
      float: right;
      width: 0.56rem;
      height:60%;
      background: rgba(255,255,255,0.01);
      border-radius: 0.02rem;
      border: solid 0.01rem #1989fa;
      text-align: center;
      margin-left: 0.1rem;
      color: #b5d7ff;
      font-size: 0.14rem;
      cursor: pointer;
      margin-top:0.07rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &.active{
        cursor:auto;
        background: #1575d9;
        color: #fff;
      }
    }
    .totalNum{
      display: inline-block;
      margin-left: 0.16rem;
      height:0.40rem;
      line-height:0.4rem;
      font-size: 0.16rem;
      color: #b5d7ff;
      padding-left: 0.12rem;
      position: relative;
      .lines{
        width: 0.02rem;
        line-height:0.16rem;
        background: #008aff;
        position: absolute;
        left:0;
        top:0.12rem;
        font-family: PingFangSC-Light;
      }

    }

  }
  .msgBox{
    height:2.93rem;
    margin-top:0.16rem;
    width:95.6%;
    margin:0 auto;
     .msgsIn0{
        width: 100%;
        display: flex;
        .msgsIn{
          flex: 1;
          display: flex;
          flex-direction: column;
          .msgsInTit{
            height:0.38rem;
            color:#b5d7ff;
            line-height:0.38rem;
            text-indent: 0.15rem;
            font-size: 0.15rem;
            font-family: PingFangSC-Light;
          }
          .msgsInBoxs{
            flex:1;
            padding-left: 0.4rem;
            .msgsInCircle{
              width: 2.15rem;
              height:1.8rem;
              float: left;
            }
            .msgsInTable{
              background: rgba(0,0,0,.1);
              border: solid 0.01rem rgba(45, 148, 240, 0.2);
              height:1.48rem;
              margin-top:0.2rem;
              width: 3.4rem;
              float: left;
              padding:0.1rem 0.1rem 0;
              flex-direction: column;
              display: flex;
              li{
                height:0.36rem;
                margin-bottom:0.1rem;
                align-items: center;
                display: flex;
                label{
                  width: 0.74rem;
                  font-size: 0.16rem;
                  color:#b5d7ff;
                }
                .numBox{
                  flex:1;
                  background: rgba(0, 0, 0, 0.2);
                  height: 0.36rem;
                  display: flex;
                  align-items: center;
                  span{
                    color: #b5d7ff;
                    font-size: 0.13rem;
                    text-indent: 0.11rem;
                  }
                  .numFeal,.numFeals{
                    flex:1;
                    padding-right: 0.1rem;
                    height: 100%;
                    font-size:0.11rem;
                    padding-top:0.07rem;
                    padding-bottom:0.07rem;
                    .numLines{
                      height: 100%;
                      background: #f56c6c;
                      color:#fff;
                      text-align:right;
                      padding-right:5*100/1366vw;
                      line-height:0.22rem;
                    }
                    .numLines2{
                      height: 100%;
                      background: #008aff;
                      color:#fff;
                      text-align:right;
                      line-height:0.22rem;
                      padding-right:5*100/1366vw;
                    }
                  }
                  img{
                    width: 0.14rem;
                    height:0.24rem;
                    margin-right: 0.09rem;
                  }
                }
              }
            }
          }
        }
      }
  }
  .dealed{
    display: inline-block;
    width: 47.07%;
    height:2.915rem;
    margin-left: 0.3rem;
    margin-top:0.20rem;
    .workBox1{
      width: 100%;
      height:2.53rem;
      padding: 0 0.05rem;
      display: flex;
      .workBox1In{
        width: 2.18rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        .workBox1In1{
          flex:1;
          text-align: center;
          p{
            text-align: center;
            height:0.67rem;
            font-weight:500;
            line-height:0.75rem;
            font-size: 0.27rem;
            color:#fff;
            &.marginTop{
              margin-top:0.17rem;
            }
          }
          span{
            display: inline-block;
            width: 1.14rem;
            height:0.24rem;
            line-height:0.22rem;
            border: solid 0.01rem;
            font-size: 0.12rem;
            text-align: center;
            border-radius: 0.02rem;
            &.colorY{
              color:#008aff;
              border-color: #008aff;
            }
             &.colorB{
              color:#fa6074;
              border-color: #fa6074;
            }
          }
        }
      }
      .workBox1Cir{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        .workBox1CirIn{
          width: 1.98rem;
          height: 1.98rem;
          background: #011f51;
          border-radius: 0.99rem;
          border: 1px solid #000e28;
          div{
            width:100%;
            height:100%;
          }
        }

      }

    }
  }
  .workFrom{
    display: inline-block;
    width: 47.07%;
    height:2.94rem;
    margin-left:1.2vw;
    margin-top:0.2rem;
    .EchartBarBox{
      width: 100%;
      height:2.53rem;
    }
  }
}
</style>
