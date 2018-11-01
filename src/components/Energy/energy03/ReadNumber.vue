<template>
  <div class="readNumber" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="head">
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
          <template>
          <el-select placeholder="选择楼层" clearbel @change="choseQuery1" v-model="areaForm.id1" class="querySelectItem">
            <el-option label="选择楼层" value="0"></el-option>
            <el-option
              v-for="item in areaData1"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          </template>
          <el-select placeholder="选择区间" @change="choseQuery2" v-model="areaForm.id2" class="querySelectItem">
            <el-option label="选择区间" value="0"></el-option>
            <el-option
              v-for="item in areaData2"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select placeholder="选择区域" v-model="aa2" class="querySelectItem">
            <el-option label="选择区域" value="0"></el-option>
            <el-option
              v-for="item in areaData3"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="btn22">
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
                  <span v-for="(i,index) in 10" v-text="shishi.shui[index]"></span>
                </div>
                <div class="danwei">m³</div>
              </div>
              <div class="types">用水总量</div>
            </div>
            <div class="box">
              <div class="cont">
                <div class="numbers">
                  <span v-for="(i,index) in 10" v-text="shishi.dian[index]"></span>
                </div>
                <div class="danwei">kw/h</div>
              </div>
              <div class="types">用电总量</div>
            </div>
            <div class="box">
              <div class="cont">
                <div class="numbers">
                  <span v-for="(i,index) in 10" v-text="shishi.qi[index]"></span>
                </div>
                <div class="danwei">m³</div>
              </div>
              <div class="types">用气总量</div>
            </div>
          </div>
        </div>
        <div class="part boxs">
          <component :is="shuiComponent" :datas ='shui.echarts' ref="lineEchartssss1"  :key = "shui.id"></component>
        </div>
      </div>
      <div class="parts">
        <div class="part boxs">
          <component :is="qiComponent" :datas ='qi.echarts' ref="lineEchartssss1"  :key = "qi.id"></component>
        </div>
        <div class="part boxs">
          <component :is="dianComponent" :datas ='dian.echarts' ref="lineEchartssss1"  :key = "dian.id"></component>
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
        clearable:true,
        loading:true,
          currentType:1,
        shuiComponent:'',
        dianComponent:'',
        qiComponent:'',
        shui:{  //水
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
        qi:{
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
        dian:{
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
        areaData1:[], //区域第一个筛选框初始化
        areaData2:[],
        areaData3:[],
        areaForm:{// 区域筛选条件
          project_id:1,
          floor_id:0,
          sys_menu_id:0,
          id1:'',
          id2:'',
          id3:''
        },
        shishi:{shui:'',dian:'',qi:''},  //实施能耗
        dian:{},  //电
        qi:{},  //气

      }
    },
    created(){
        window.addEventListener('resize',this.resizeWindow)
      this.areaForm.sys_menu_id = this.$store.state.sysList[2].sys_menu_id
      this.areaForm.project_id = this.$store.state.projectId
      this.initAreaQueryData()
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
      choseQuery1(){
          this.areaData1.map((item,index)=>{
              if(item.id == this.areaForm.id1){
                this.areaData2 = item.child
              }
          })
      },
      choseQuery2(){
        this.areaData2.map((item,index)=>{
          if(item.id == this.areaForm.id2){
            this.areaData3 = item.child
          }
        })
      },
      initAreaQueryData(){
        this.$http.post('/hotel_energy/floor_real_time',this.areaForm).then((res)=>{
          console.log(res)
          if(res.data.code == 0){
              this.areaData1 = res.data.data.area_level
            this.dealData(res)
          }else{

          }
        })
      },
      refreshCanvas(data){
          if(data.shui.time){
            data.shui.time.map((item,index)=>{
              data.shui.time[index] = item.split(' ')[1].split(':')[0]+':'+item.split(' ')[1].split(':')[1]
            })
          }
          if(data.dian.time){
            data.dian.time.map((item,index)=>{
              data.dian.time[index] = item.split(' ')[1].split(':')[0]+':'+item.split(' ')[1].split(':')[1]
            })
          }

        if(data.qi.time){
          data.qi.time.map((item,index)=>{
            data.qi.time[index] = item.split(' ')[1].split(':')[0]+':'+item.split(' ')[1].split(':')[1]
          })
        }

        let random = Math.ceil(Math.random()*1000 +1);
          this.shui = {
            id:'shui'+random,
            echarts:{
              id:'lineEchartShui'+random,
              type:'shui',
              unit:'m³',
              title:'水',
              titShow:true,
              style:{width:'100%',height:'100%'},
              xDate:data.shui.time,
              list:[
                {name:'碳排放',data:data.shui.data_t},
                {name:'能耗值',data:data.shui.data},
              ]
            }
          }
        this.qi = {
          id:'qi'+random,
          echarts:{
            id:'lineEchartQi'+random,
            type:'qi',
            unit:'Kg/m³',
            title:'气',
            titShow:true,
            style:{width:'100%',height:'100%'},
            xDate:data.qi.time,
            list:[
              {name:'碳排放',data:data.qi.data_t},
              {name:'能耗值',data:data.qi.data},
            ]
          }
        }
        this.dian = {
          id:'dian'+random,
          echarts:{
            id:'lineEchartDian'+random,
            type:'dian',
            unit:'Kg/Kw/h',
            title:'电',
            titShow:true,
            style:{width:'100%',height:'100%'},
            xDate:data.dian.time,
            list:[
              {name:'碳排放',data:data.dian.data_t},
              {name:'能耗值',data:data.dian.data},
            ]
          }
        }
          this.shuiComponent = 'LineEcharts'
        this.dianComponent = 'LineEcharts'
        this.qiComponent = 'LineEcharts'

        this.loading = false
      },
      changeType(type){
        this.loading = true
        this.shuiComponent = ''
        this.dianComponent = ''
        this.qiComponent = ''
          this.currentType = type
        if(type==1){
          this.$http.post('/hotel_energy/floor_real_time',this.areaForm).then((res)=>{
            if(res.data.code == 0){
              this.dealData(res)
            }else{

            }
          })
        }else if(type==2){
          this.$http.post('/hotel_energy/system_real_time',{project_id:1,system_id:1}).then((res)=>{
            if(res.data.code == 0){
              this.dealData(res)
            }else{

            }
          })
        }

      },
      dealData(res){
        this.shishi = res.data.data.read //实时能耗
        this.shishi.dian = String(this.shishi.dian)
        this.shishi.shui = String(this.shishi.shui)
        this.shishi.qi = String(this.shishi.qi)
        let dian = this.shishi.dian
        let dianStr = ''
        let qi = this.shishi.qi
        let qiStr = ''
        let shui = this.shishi.shui
        let shuiStr = ''
        for(let i=0;i<10-this.shishi.dian.length;i++){
          dianStr += '0'
        }
        this.shishi.dian = dianStr+dian
        for(let i=0;i<10-this.shishi.qi.length;i++){
          qiStr += '0'
        }
        this.shishi.qi = qiStr+qi
        for(let i=0;i<10-this.shishi.shui.length;i++){
          shuiStr += '0'
        }
        this.shishi.shui = shuiStr+shui

        this.refreshCanvas(res.data.data.table)
      },
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
