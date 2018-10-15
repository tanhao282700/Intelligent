<!--
    代维系统（首页）
    白 2018-8-21
-->
<template>
  <div class="generation">
      <Crumbs :data ='crumbs'/>
      <div class="msgBox boxs">
        <div class="boxsTitG">
          <span class="tit">工单&巡检 完成情况</span>
          <div class="btnDate"
            v-for="(v,i) in fillBoxs"
            :class="{'active':idNow == v.id}"
            v-text="v.name"
            @click="changeDateType(v.id)"></div>
        </div>
        <div class="msgsIn0">
          <div class="msgsIn">
            <div class="msgsInTit" v-text="`本${msgsInTit}工单数`"></div>
            <div class="msgsInBoxs">
              <div class="msgsInCircle">
                <EchartCirFull ref="echartCirData3"  :echartCirData = "echartCirData3"/>
              </div>
              <ul class="msgsInTable">
                <li>
                  <label for="">工单总数</label>
                  <div class="numBox">
                    <span v-text="`${echartCirData3.total}单`"></span>
                  </div>
                </li>
                <li>
                  <label for="">已完成数</label>
                  <div class="numBox">
                      <div class="numFeal">
                        <div class="numLines" :style="{'width':2.10*echartCirData3.data[1].value/echartCirData3.total +'rem'}"></div>
                      </div>
                      <img src="../../assets/img/circle/down.png" alt="">
                  </div>
                </li>
                <li>
                  <label for="">未完成数</label>
                  <div class="numBox">
                    <div class="numFeals">
                      <div class="numLines2" :style="{'width':2.10*echartCirData3.data[0].value/echartCirData3.total +'rem'}"></div>
                    </div>
                      <img src="../../assets/img/circle/down.png" alt="">
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <Lines :top="20" :hei="213"/>
          <div class="msgsIn">
            <div class="msgsInTit" v-text="`本${msgsInTit}巡检任务数`"></div>
            <div class="msgsInBoxs">
              <div class="msgsInCircle">
                <EchartCirFull ref="echartCirData4"  :echartCirData = "echartCirData4"/>
              </div>
              <ul class="msgsInTable">
                <li>
                  <label for="">巡检单数</label>
                  <div class="numBox">
                    <span v-text="`${echartCirData4.total}单`"></span>
                  </div>
                </li>
                <li>
                  <label for="">已完成数</label>
                  <div class="numBox">
                      <div class="numFeal">
                        <div class="numLines" :style="{'width':2.10*echartCirData4.data[1].value/echartCirData4.total +'rem'}"></div>
                      </div>
                      <img src="../../assets/img/circle/down.png" alt="">
                  </div>
                </li>
                <li>
                  <label for="">未完成数</label>
                  <div class="numBox">
                    <div class="numFeals">
                      <div class="numLines2" :style="{'width':2.10*echartCirData4.data[0].value/echartCirData4.total +'rem'}"></div>
                    </div>
                      <img src="../../assets/img/circle/down.png" alt="">
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
          <div class="btnDate"
            v-for="(v,i) in fillBoxs2"
            :class="{'active':idNow2 == v.id}"
            v-text="v.name"
            @click="changeDateType2(v.id)"></div>
        </div>
        <div class="workBox1">
          <div class="workBox1In">
            <div class="workBox1In1">
              <p class="marginTop" v-text="crate.monW+'%'"></p>
              <span class="colorY">本月工单完成率</span>
            </div>
            <Lines type="h" :wid="148" :left="35"/>
            <div class="workBox1In1">
              <p v-text="crate.monR+'%'"></p>
              <span class="colorR">本月巡检完成率</span>
            </div>
          </div>
          <div class="workBox1Cir">
            <div class="workBox1CirIn">

            </div>
          </div>
          <div class="workBox1In">
            <div class="workBox1In1">
              <p class="marginTop" v-text="crate.yearW+'%'"></p>
              <span class="colorG">本年工单完成率</span>
            </div>
            <Lines type="h" :wid="148" :left="35"/>
            <div class="workBox1In1">
              <p v-text="crate.yearR+'%'"></p>
              <span class="colorB">本年巡检完成率</span>
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
            <span>100单</span>
          </div>
        </div>
        <div class="EchartBarBox">
          <EchartBar :data= "barData"/>
        </div>
      </div>
  </div>
</template>

<script>


import utils from "../../assets/js/utils.js";
import EchartCirFull from '../Energy/components/lookAll/EchartCirFull';
import EchartBar from './components/index/echartBar';
export default {
  name:'generationMBase',
  components:{
    'EchartCirFull':EchartCirFull,
    'EchartBar':EchartBar
  },
  computed:{
    msgsInTit(){
      let lens =this.fillBoxs.length,res = '';
      for(let i=0;i<lens;i++){
        if(this.fillBoxs[i].id == this.idNow){
          res = this.fillBoxs[i].name;
        }
      }
      return res;
    }
  },
  data () {
    return {
      crumbs:['代维系统'],
      crate:{
        monW:'56.2',
        monR:'78.9',
        yearW:'88.9',
        yearR:'71.9'
        },
        barData:{
          id:'barData',
          style:{width:'6.23rem',height:240*100/728+'vh',marginLeft:'0.1rem',marginTop:10*100/728+'vh'},
          data:[[57,0,0],[0,33,0],[0,0,20]],
          total:110,
          xData:['系统派发','人工派发','外报维修']
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
       echartCirData3:{
            id:'echart3',
            color:[
              '#f56c6c','#008aff'
            ],
            size:[0,'72.89%'],
            total:100,
            data:[
              {value:29, name:Math.floor(29/(71+29)*100)+'%',tit:'未完成数'},
              {value:71, name:Math.floor(71/(71+29)*100)+'%',tit:'已完成数'},
            ],
        },
        echartCirData4:{
            id:'echart4',
            color:[
              '#f56c6c','#008aff'
            ],
            size:[0,'72.89%'],
            total:120,
            data:[
              {value:39, name:Math.floor(39/(71+29)*100)+'%',tit:'未完成数'},
              {value:81, name:Math.floor(81/(71+29)*100)+'%',tit:'已完成数'},
            ],
        },

    }
  },
  methods:{
    changeDateType(id){
      if(this.idNow==id){
        return;
      }
      this.idNow =id;
    },
    changeDateType2(id){
      if(this.idNow2==id){
        return;
      }
      this.idNow2 =id;
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';
.generation{
  width: 100%;
  height: 100%;
  .boxsTitG{
    width: 100%;
    .vh(40);
    background: rgba(0,0,0,.2);
    padding-left: 0.16rem;
    padding-right: 0.2rem;
    span.tit{
      display: inline-block;
      font-size: 0.16rem;
      color:@color-blue;
      font-family: PingFangSC-Medium;
      .vh(40);
      .vhLH(40);
    }
    .btnDate{
      float: right;
      width: 0.56rem;
      .vh(26);
      background: rgba(255,255,255,0.01);
      border-radius: 0.02rem;
      border: solid 0.01rem #1989fa;
      text-align: center;
      .vhLH(24);
      margin-left: 0.1rem;
      color: #b5d7ff;
      font-size: 0.14rem;
      cursor: pointer;
      .vhMT(7);
      &.active{
        cursor:auto;
        background: #1575d9;
        color: #fff;
      }
    }
    .totalNum{
      display: inline-block;
      margin-left: 0.16rem;
      .vh(40);
      .vhLH(40);
      font-size: 0.16rem;
      color: #b5d7ff;
      padding-left: 0.12rem;
      position: relative;
      .lines{
        width: 0.02rem;
        .vh(16);
        background: #008aff;
        position: absolute;
        left:0;
        .vhTop(12);
        font-family: PingFangSC-Light;
      }

    }

  }
  .msgBox{
    width: 13.06rem;
    .vh(293);
    margin-left: 0.3rem;
    .vhMT(16);
     .msgsIn0{
        width: 100%;
        .vh(253);
        display: flex;
        .msgsIn{
          flex: 1;
          display: flex;
          flex-direction: column;
          .msgsInTit{
            .vh(26);
            color:#b5d7ff;
            text-indent: 0.16rem;
            font-size: 0.16rem;
            font-family: PingFangSC-Light;
            .vhLH(36);
          }
          .msgsInBoxs{
            flex:1;
            padding-left: 0.4rem;
            .msgsInCircle{
              width: 2.16rem;
              .vh(214);
              float: left;
            }
            .msgsInTable{
              background: rgba(0,0,0,.1);
              border: solid 0.01rem rgba(45, 148, 240, 0.2);
              .vh(148);
              .vhMT(33);
              width: 3.4rem;
              float: left;
              padding: 0 0.1rem;
              .vhPT(10);
              flex-direction: column;
              display: flex;
              li{
                flex:1;
                align-items: center;
                display: flex;
                .vhPB(10);
                label{
                  width: 0.74rem;
                  font-size: 0.16rem;
                  color:#b5d7ff;
                }
                .numBox{
                  flex:1;
                  background: rgba(0, 0, 0, 0.2);
                  height: 100%;
                  display: flex;
                  align-items: center;
                  span{
                    color: #b5d7ff;
                    font-size: 0.16rem;
                    text-indent: 0.11rem;
                  }
                  .numFeal,.numFeals{
                    flex:1;
                    padding-right: 0.1rem;
                    height: 100%;
                    .vhPT(7);
                    .vhPB(7);
                    .numLines{
                      height: 100%;
                      background: #008aff;
                    }
                    .numLines2{
                      height: 100%;
                      background: #f56c6c;
                    }
                  }
                  img{
                    width: 0.14rem;
                    .vh(20);
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
    width: 6.43rem;
    .vh(293);
    margin-left: 0.3rem;
    .vhMT(20);
    .workBox1{
      width: 100%;
      .vh(253);
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
            .vh(67);
            .vhLH(75);
            font-size: 0.35rem;
            color:#fff;
            &.marginTop{
              .vhMT(17);
            }
          }
          span{
            display: inline-block;
            width: 1.14rem;
            .vh(24);
            .vhLH(22);
            border: solid 0.01rem;
            font-size: 0.12rem;
            text-align: center;
            border-radius: 0.02rem;
            &.colorY{
              color:#ffa414;
              border-color: #ffa414;
            }
             &.colorG{
              color:#4ae283;
              border-color: #4ae283;
            }
             &.colorR{
              color:#f56c6c;
              border-color: #f56c6c;
            }
             &.colorB{
              color:#008aff;
              border-color: #008aff;
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
          width: 1.97rem;
          height: 1.97rem;
          background: rgba(0,0,0,.2);
        }

      }

    }
  }
  .workFrom{
    display: inline-block;
    width: 6.43rem;
    .vh(293);
    margin-left: 0.16rem;
    .vhMT(20);
    .EchartBarBox{
      width: 100%;
      .vh(253);
    }
  }
}
</style>
