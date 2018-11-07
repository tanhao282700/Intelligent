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
                    <span v-text="`${echartCirData3.total}单`"> </span>
                  </div>
                </li>
                <li>
                  <label for="">已完成数</label>
                  <div class="numBox">
                      <div class="numFeal">
                        <div class="numLines" :style="{'width':2.10*echartCirData3.data[0].value/echartCirData3.total +'rem'}">{{echartCirData3.data[0].value}}</div>
                      </div>
                  </div>
                </li>
                <li>
                  <label for="">未完成数</label>
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
                        <div class="numLines" :style="{'width':2.10*echartCirData4.data[1].value/echartCirData4.total +'rem'}">{{echartCirData4.data[1].value}}</div>
                      </div>
                  </div>
                </li>
                <li>
                  <label for="">未完成数</label>
                  <div class="numBox">
                    <div class="numFeals">
                      <div class="numLines2" :style="{'width':2.10*echartCirData4.data[0].value/echartCirData4.total +'rem'}">{{echartCirData4.data[0].value}}</div>
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
          <div class="btnDate"
            v-for="(v,i) in fillBoxs2"
            :class="{'active':idNow2 == v.id}"
            v-text="v.name"
            @click="changeDateType2(v.id)"></div>
        </div>
        <div class="workBox1">
          <div class="workBox1In">
            <div class="workBox1In1">
              <p class="marginTop" v-text="circleData.crate.monW+'%'"></p>
              <span class="colorY" v-text="`本${yearWeek[0]}工单完成率`"></span>
            </div>
            <Lines type="h" :wid="148" :left="35"/>
            <div class="workBox1In1">
              <p v-text="circleData.crate.monR+'%'"></p>
              <span class="colorR"  v-text="`本${yearWeek[0]}巡检完成率`"></span>
            </div>
          </div>
          <div class="workBox1Cir">
            <div class="workBox1CirIn">
              <EchartPie :data="circleData"></EchartPie>
            </div>
          </div>
          <div class="workBox1In">
            <div class="workBox1In1">
              <p class="marginTop" v-text="circleData.crate.yearW+'%'"></p>
              <span class="colorG" v-text="`本${yearWeek[1]}工单完成率`"></span>
            </div>
            <Lines type="h" :wid="148" :left="35"/>
            <div class="workBox1In1">
              <p v-text="circleData.crate.yearR+'%'"></p>
              <span class="colorB" v-text="`本${yearWeek[1]}工单完成率`"></span>
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


import utils from "../../assets/js/utils.js";
import EchartCirFull from '../Energy/components/lookAll/EchartCirFull';
import EchartBar from './components/index/echartBar';
import EchartPie from './components/index/echartPie';

export default {
  name:'generationMBase',
  components:{
    'EchartCirFull':EchartCirFull,
    'EchartBar':EchartBar,
    'EchartPie':EchartPie
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
    },
    yearWeek(){
      let lens =this.fillBoxs2.length,res = [];
      for(let i=0;i<lens;i++){
        if(this.fillBoxs2[i].id == this.idNow2){
          let name = this.fillBoxs2[i].name.split('/');
          res = [name[0],name[1]];
        }
      }
      return res;
    }
  },
  data () {
    return {
      crumbs:['代维系统'],
      circleData:{
        id:'canvas',
        style:{width:'1.98rem',height:'1.98rem'},
        total:0,//总完成率
        data:[0,0,0,0],
        crate:{
          monW:'56.2',
          monR:'78.9',
          yearW:'88.9',
          yearR:'71.9'
        },
      },
      barData:{//工单&巡检完成率的数据
          id:'barData',
          style:{width:'94%',height:'2.1rem','marginLeft':'3%','marginTop':'3%'},
          data:[100,230,490],
          total:0,
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
        {id:'monYear',name:'月/年'},
        {id:'dayWeek',name:'日/周'}
      ],
      idNow2:'dayWeek',
       echartCirData3:{//工单的数据
            id:'echart3',
            color:[
              '#f56c6c','#008aff'
            ],
            size:[0,'72.89%'],
            total:0,
            data:[
              {value:24, name:0+'%',tit:'已完成数'},
              {value:88, name:0+'%',tit:'未完成数'},
            ],
        },
        echartCirData4:{//巡检的数据
            id:'echart4',
            color:[
              '#f56c6c','#008aff'
            ],
            size:[0,'72.89%'],
            total:0,
            data:[
              {value:2, name:0+'%',tit:'未完成数'},
              {value:100, name:0+'%',tit:'已完成数'},
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
      this.getEchartData();
    },
    changeDateType2(id){
      if(this.idNow2==id){
        return;
      }
      this.idNow2 =id;
      console.log(this.idNow2)
      this.getEchartData(id)
    },
    getEchartData(){
      let timearea = ''
      let dayOrMonth = ''
      switch(this.msgsInTit){
        case '日':
          timearea=0;
          break;
        case '周':
          timearea=1;
          break;
        case '月':
          timearea=2;
          break;
        case '年':
          timearea=3;
          break;
      }
      switch(this.idNow2){
        case 'dayWeek':
          dayOrMonth=0;
          break;
        case 'monYear':
          dayOrMonth=1;
          break;
      }
      let _this = this;
      this.$http.post('/pc_ims/index',{above_type:timearea,below_type:dayOrMonth,flg:1})
      .then(function(res){
        if(res.data.code==0){
           _this.echartCirData3.total = res.data.data.gongdan.gongdan_count;
           let gongdanwei = res.data.data.gongdan.wei;
           let gongdanwan = res.data.data.gongdan.wan;
           let xunjianwei = res.data.data.xunjian.wei;
           let xunjianwan = res.data.data.xunjianwan;
           //工单
           _this.echartCirData3.data  = [
              {value:res.data.data.gongdan.wan,name:Math.floor(gongdanwan/(gongdanwan+gongdanwei)*100)+'%',tit:'已完成数'},
              {value:res.data.data.gongdan.wei,name:Math.floor(gongdanwei/(gongdanwan+gongdanwei)*100)+'%',tit:'未完成数'}];
              //巡检
          _this.echartCirData4.total = res.data.data.xunjian.xunjian_count;
          _this.echartCirData4.data = [
            {value:res.data.data.xunjian.wan,name:Math.floor(xunjianwan/(xunjianwan+xunjianwei)*100)+'%',tit:'已完成数'},
            {value:res.data.data.xunjian.wei,name:Math.floor(xunjianwei/(xunjianwei+xunjianwan)*100)+'%',tit:'未完成数'}];
            //工单来源
          _this.barData.data = [res.data.data.sys,res.data.data.people,res.data.data.complain]
          //console.log(res.data.data.now)
          _this.barData.total = res.data.data.form_count;
          _this.circleData.crate = {
            monW:res.data.data.now.job,
            monR:res.data.data.now.ins,
            yearW:res.data.data.old.job,
            yearR:res.data.data.old.ins
          }
          _this.circleData.data = [res.data.data.now.job,res.data.data.now.ins,res.data.data.old.job,res.data.data.old.ins];
          _this.circleData.total = res.data.data.percentage_count;//巡检&工单总完成率
        }else{
          _this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      });
    }
  },
  mounted() {
    this.getEchartData();
  }
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
    height:0.4rem;
    background: rgba(0,0,0,.2);
    padding-left: 0.16rem;
    padding-right: 0.2rem;
    span.tit{
      display: inline-block;
      font-size: 0.16rem;
      color:@color-blue;
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
    height:2.54rem;
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
            height:0.26rem;
            color:#b5d7ff;
            text-indent: 0.16rem;
            font-size: 0.16rem;
            font-family: PingFangSC-Light;
          }
          .msgsInBoxs{
            flex:1;
            padding-left: 0.4rem;
            .msgsInCircle{
              width: 1.56rem;
              height:1.56rem;
              float: left;
            }
            .msgsInTable{
              background: rgba(0,0,0,.1);
              border: solid 0.01rem rgba(45, 148, 240, 0.2);
              height:1.48rem;
              margin-top:0.2rem;
              width: 3.4rem;
              float: left;
              padding: 0 0.1rem;
              flex-direction: column;
              display: flex;
              li{
                flex:1;
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
                    font-size: 0.16rem;
                    text-indent: 0.11rem;
                  }
                  .numFeal,.numFeals{
                    flex:1;
                    padding-right: 0.1rem;
                    height: 100%;
                    padding-top:0.07rem;
                    padding-bottom:0.07rem;
                    .numLines{
                      height: 100%;
                      background: #008aff;
                      color:#fff;
                      text-align:right;
                      padding-right:5*100/1366vw;
                      line-height:0.22rem;
                    }
                    .numLines2{
                      height: 100%;
                      background: #f56c6c;
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
    height:2.94rem;
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
            line-height:0.75rem;
            font-size: 0.35rem;
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
