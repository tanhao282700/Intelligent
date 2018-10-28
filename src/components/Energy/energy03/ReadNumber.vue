<template>
  <div class="readNumber">
    <div class="head">
      <div class="type">
        <span class="active">区域
          <div class="spacing">
            <div class="to-top"></div>
            <div class="to-bottom"></div>
          </div>
        </span>
        <span>系统</span>
      </div>
      <div class="search">
        <div class="limition">
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa" :key="index+1" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa1" :key="index+2" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="aa2" :key="index+3" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn">
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="con">
      <div class="parts">
        <div class="part boxs">
          <div class="boxsTit">实时能耗</div>
          <div class="fir">
            <div class="box">
              <div class="cont">
                <div class="numbers">
                  <span v-for="i in 10">9</span>
                </div>
                <div class="danwei">m³</div>
              </div>
              <div class="types">用水总量</div>
            </div>
            <div class="box">
              <div class="cont">
                <div class="numbers">
                  <span v-for="i in 10">9</span>
                </div>
                <div class="danwei">kw/h</div>
              </div>
              <div class="types">用电总量</div>
            </div>
            <div class="box">
              <div class="cont">
                <div class="numbers">
                  <span v-for="i in 10">9</span>
                </div>
                <div class="danwei">m³</div>
              </div>
              <div class="types">用气总量</div>
            </div>
          </div>
        </div>
        <div class="part boxs">
          <lineEcharts :datas ='bb.echarts' ref="lineEchartssss1"  :key = "bb.id"/>
        </div>
      </div>
      <div class="parts">
        <div class="part boxs">
          <lineEcharts :datas ='cc.echarts' ref="lineEchartssss2"  :key = "cc.id"/>
        </div>
        <div class="part boxs">
          <lineEcharts :datas ='dd.echarts' ref="lineEchartssss3"  :key = "dd.id"/>
        </div>
      </div>
    </div>

    <Dialog wid = "578px" hei = "536px" style="display: flex;flex-direction: column" ref = "dialog" tit = "记录详情">
      <div class="showBox2" style="height:486px;">
        <div class="parts" v-for="i in 3">
          <div class="content">
            <div class="pic">
              <div class="numbers">
                <span v-for="i in 10">9</span>
              </div>
              <div class="danwei">kw/h</div>
            </div>
            <div class="types">
              <div class="title">电流</div>
              <div>
                <span>A：</span>
                <span>23.92A</span>
              </div>
              <div>
                <span>B：</span>
                <span>23.92A</span>
              </div>
              <div>
                <span>C：</span>
                <span>23.92A</span>
              </div>
            </div>
            <div class="types">
              <div class="title">电压</div>
              <div>
                <span>A：</span>
                <span>23.92V</span>
              </div>
              <div>
                <span>B：</span>
                <span>23.92V</span>
              </div>
              <div>
                <span>C：</span>
                <span>23.92V</span>
              </div>
            </div>
          </div>
          <div class="leixin">
            1号电表
          </div>
        </div>
      </div>
    </Dialog>


  </div>
</template>
<script>
  import LineEcharts from '@/components/common/lineEcharts';
  export default{
    name:'ReadNumber',
    data(){
      return{
        bb:{
          id:1,
          echarts:{
            id:'lineEchartShui',
            type:'shui',
            unit:'m³',
            title:'水',
            // titShow:false,
            style:{width:'100%',height:'100%'},
            xDate:['16:00','17:00','18:00','16:00','17:00','18:00','17:00','18:00','17:00','18:00','17:00','18:00'],
            list:[
              {name:'碳排放',data:[10,20,30,50,40,60,30,50,30,50,40,60]},
              {name:'能耗值',data:[50,40,60,10,20,30,10,20,10,20,40,60]},
            ]
          }
        },
        cc:{
          id:2,
          echarts:{
            id:'lineEchartQi',
            type:'qi',
            unit:'m³',
            title:'气',
            // titShow:false,
            style:{width:'100%',height:'100%'},
            xDate:['16:00','17:00','18:00','16:00','17:00','18:00','17:00','18:00','17:00','18:00','17:00','18:00'],
            list:[
              {name:'碳排放',data:[10,20,30,50,40,60,30,50,30,50,40,60]},
              {name:'能耗值',data:[50,40,60,10,20,30,10,20,10,20,40,60]},
            ]
          }
        },
        dd:{
          id:3,
          echarts:{
            id:'lineEchartDian',
            type:'dian',
            unit:'m³',
            title:'电',
            // titShow:false,
            style:{width:'100%',height:'100%'},
            xDate:['16:00','17:00','18:00','16:00','17:00','18:00','17:00','18:00','17:00','18:00','17:00','18:00'],
            list:[
              {name:'碳排放',data:[10,20,30,50,40,60,30,50,30,50,40,60]},
              {name:'能耗值',data:[50,40,60,10,20,30,10,20,10,20,40,60]},
            ]
          }
        },
        aa:'',
        aa1:'',
        aa2:'',
        options: [
          {
            placeHolder: '选择楼层',
            data: [{
              "value": 0,
              "label": "预警"
            }, {
              "value": 1,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
      }
    },
    created(){
        window.addEventListener('resize',this.resizeWindow)
    },
    components:{
      'LineEcharts':LineEcharts
    },
    watch:{

    },
    mounted(){
        /*this.$refs.dialog.show()*/
    },
    destroyed(){
        window.removeEventListener('resize',this.resizeWindow)
    },
    methods:{
      resizeWindow(){
        this.$refs.lineEchartssss1.drawLine();
        this.$refs.lineEchartssss2.drawLine();
        this.$refs.lineEchartssss3.drawLine();
      }

    }
  }
</script>
<style>
  .readNumber .el-input{
    height:90%!important;
  }
  .readNumber .querySelectItem{
    margin-left:10px;
  }
  .readNumber .el-input .el-input__inner{
    border:none!important;
    border-bottom:1px solid #1989fa!important;
    height:90%!important;
    /*padding:0!important;*/
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
</style>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/comon.less';
  .readNumber{
    width:100%;
    height:100%;
    .head{
      height:10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position:relative;
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
        }
      }
    }
    .con{
      height:90%;
      display: flex;
      flex-direction: column;
      .parts{
        height:46.15%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &:last-child{
          margin-top:1.6%;
        }
        .part{
          flex:1;
          display: flex;
          flex-direction: column;
          &:last-child{
            margin-left:1.6%;
          }
          .boxsTit{
            .vh(34);
            background-color: rgba(0, 0, 0, 0.2);
            padding: 0 0.16rem;
            color: #008aff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 0.16rem;
          }
          .fir{
            flex:1;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            .box{
              width:24.11%;
              .cont{
                width:100%;
                padding-bottom:100%;
                margin-top:6%;
                position:relative;
                .numbers{
                  position:absolute;
                  width:82.667%;
                  height:10.667%;
                  top:48%;
                  left:9%;
                  display: flex;
                  flex-direction: row;
                  span{
                    flex:1;
                    border:1px solid white;
                    color:white;
                    display: flex;
                    align-items: center;
                    background:#4f5d77;
                    justify-content: center;
                    font-size:.12rem;
                  }
                }
                .danwei{
                  position:absolute;
                  color:white;
                  font-size:.12rem;
                  right:6%;
                  top:39%;
                }
              }
              .types{
                color:#005eb0;
                font-size:.14rem;
                text-align: center;
                margin-top:4%;
                font-weight: 500;
              }
              &:nth-child(1) .cont{
                background:url(../../../assets/img/Energy/water-total.png) no-repeat;
                background-size:100% 100%;
              }
              &:nth-child(2) .cont{
                background:url(../../../assets/img/Energy/electric-total.png) no-repeat;
                background-size:100% 100%;
              }
              &:nth-child(3) .cont{
                background:url(../../../assets/img/Energy/gas-total.png) no-repeat;
                background-size:100% 100%;
              }
            }
          }
        }
      }
    }
    .showBox2{
      display: flex;
      flex-direction: row;
      .parts{
        height:100%;
        width:150px;
        margin-left:34px;
        .content{
          height:386px;
          margin-top:52px;
          background: linear-gradient(to top, rgba(1,13,29,.8) , rgba(1,13,29,0));
          .pic{
            width:150px;
            padding-bottom:150px;
            background:url(../../../assets/img/Energy/electric-total.png) no-repeat;
            background-size:100% 100%;
            position:relative;
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
          .types{
            height:108px;
            color:#b5d6ff;
            font-size:.12rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
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
