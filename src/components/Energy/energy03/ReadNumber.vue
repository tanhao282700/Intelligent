<template>
  <div class="readNumber" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading">
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
      <div class="parts">
        <div class="part boxs realTime">
          <div class="boxsTit">实时能耗</div>
          <div class="fir">
            <div class="box" @click="showRealTime(1)">
              <div class="cont">
                <div class="numbers">
                  <span v-for="(i,index) in 10" v-text="shishi.shui[index]"></span>
                </div>
                <div class="danwei">m³</div>
              </div>
              <div class="types">用水总量</div>
            </div>
            <div class="box" @click="showRealTime(0)">
              <div class="cont">
                <div class="numbers">
                  <span v-for="(i,index) in 10" v-text="shishi.dian[index]"></span>
                </div>
                <div class="danwei">kw/h</div>
              </div>
              <div class="types">用电总量</div>
            </div>
            <div class="box" @click="showRealTime(2)">
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
      <div class="showBox2" style="height:486px;" >
        <div class="itemlist" style="height:486px;overflow-y:auto;" v-for="list in realtimeData">
          <div class="parts" v-for="item in list">
          <div class="content">
            <div class="pic" :class="{'realtime0':realtimeType==0,'realtime1':realtimeType==1,'realtime2':realtimeType==2}">
              <div class="numbers">
                <span v-for="(i,index) in 10" v-text="item[1][0].data[index]"></span>
              </div>
              <div class="danwei">kw/h</div>
            </div>
            <div class="realtimeCon" style="width:100%;overflow: hidden;padding-top: .1rem">
              <div class="types" style="height:216px;overflow-y:auto;">
                <div class="typesItemBox" v-if="item[2].length>0">
                  <div class="title">{{realTimeTypeMap.type_map[2]}}</div>
                  <div v-for="dianItem in item[2]">
                    <span>{{dianItem.title}} :</span>
                    <span>{{dianItem.data}}</span>
                  </div>
                </div>

                <div class="typesItemBox" v-if="item[3].length>0">
                  <div class="title">{{realTimeTypeMap.type_map[3]}}</div>
                  <div v-for="dianItem in item[3]">
                    <span>{{dianItem.title}} :</span>
                    <span>{{dianItem.data}}</span>
                  </div>
                </div>

                <div class="typesItemBox" v-if="item[4].length>0">
                  <div class="title">{{realTimeTypeMap.type_map[4]}}</div>
                  <div v-for="dianItem in item[4][0].data">
                    <span>{{dianItem.title}} :</span>
                    <span>{{dianItem.value}}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="leixin">
            {{item.device}}
          </div>
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
        realtimeType:1,  //水还是电还是气的详情
        realtimeData:[],  //实时能耗详情
        clearable:true,
        loading:true,
        currentType:1,  //区域还是系统
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
        sysData1:[],
        sysData2:[],
        areaForm:{// 区域筛选条件
          project_id:1,
          floor_id:0,
          sys_menu_id:0
        },
        sysForm:{// 系统筛选条件
          project_id:1,
          system_id:1,
          id1:'',
          id2:'',
        },
        shishi:{shui:'',dian:'',qi:''},  //实施能耗
        dian:{},  //电
        qi:{},  //气
        realTimeTypeMap:{},
        allDatas: {}
      }
    },
    created(){
      this.areaForm.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
      this.areaForm.project_id = this.$store.state.projectId;
      this.sysForm.project_id = this.$store.state.projectId;
      this.initAreaQueryData();
    },
    components:{
      'LineEcharts':LineEcharts
    },
    watch:{

    },
    mounted(){
      let that = this;
      $(window).resize(function () {
        that.resizeWindow();
      })
    },
    beforeDestroy(){
      $(window).unbind( "resize" );
    },
    destroyed(){

    },
    methods:{
      calcRealTimeData(data){
        let that = this;
        let tempArray = [];
        let len = data.length;
        that.realTimeTypeMap = data[len-1];
        data.splice(len-1,1);
        console.log(data)
        data.map((item,index)=>{
          var obj = {
            1:[],
            2:[],
            3:[],
            4:[],
            device:""
          };
          obj.device = item.device;
          item.data.map((ite,i)=>{
            var type = ite.type;
            if(type == 1){
              /*var tempLen = ite.data.toString().length;
              for(var j=0;j< 10-tempLen; j++){
                ite.data += '0';
              }*/
              let str = ''
              let len = ite.data.toString().length
              for(let i=0;i<10-len;i++){
                  str += '0'
              }
              ite.data = str+ite.data
            }
            obj[type].push(ite);
          })
          tempArray.push(obj);
        })
        let result = []
        for(let i=0;i<tempArray.length;i+=3){
          result.push(tempArray.slice(i,i+3));
        }
        that.realtimeData = result;
        console.log(result)
      },
      showRealTime(type){    //实时能耗详情
        this.realtimeData = []
        let that = this;
        that.realtimeType = type
        that.$http.post('/hotel_energy/floor_device_real_time',{
          project_id:that.areaForm.project_id,
          floor_id:that.areaForm.floor_id,
          type:type,
          sys_menu_id:that.areaForm.sys_menu_id
        }).then((res)=>{
          console.log(res);
          if(res.data.code==0){
            let data = res.data.data;
            that.calcRealTimeData(data);
          }
        })
        this.$refs.dialog.show();
      },
      query(){
          if(this.currentType==1){   //区域查询
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
            this.$http.post('/hotel_energy/floor_real_time',this.areaForm).then((res)=>{
              if(res.data.code == 0){
                this.dealData(res)
              }else{

              }
            })
          }else{  //系统查询
            if(this.sysForm.id1){
              this.sysForm.system_id = this.sysForm.id1
            }else{
              this.sysForm.system_id = 0
            }
            if(this.sysForm.id2){
              this.sysForm.system_id = this.sysForm.id2
            }
            this.$http.post('/hotel_energy/system_real_time',this.sysForm).then((res)=>{
              if(res.data.code == 0){
                this.dealData(res)
              }else{

              }
            })
          }
      },
      choseQuery1(){
          if(!this.areaForm.id1){
            this.areaForm.id2 = ''
            this.areaForm.id3 = ''
            this.areaData2 = []
          }else{
            this.areaData1.map((item,index)=>{
              if(item.id == this.areaForm.id1){
                this.areaData2 = item.child
                this.areaForm.id2 = ''
                this.areaForm.id3 = ''
              }
            })
          }
      },
      choseQuery2(){
        this.areaData2.map((item,index)=>{
            if(!this.areaForm.id2){
              this.areaForm.id3 = ''
              this.areaData3 = []
            }else{
              if(item.id == this.areaForm.id2){
                this.areaData3 = item.child
                this.areaForm.id3 = ''
              }
            }
        })
      },
      choseQuery4(){
          this.sysData1.map((item)=>{
              if(!this.sysForm.id1){
                this.sysForm.id2 = ''
                this.sysData2 = []
              }else{
                if(item.id==this.sysForm.id1){
                  this.sysData2 = item.child
                  this.sysForm.id2 = ''
                }
              }

          })
      },
      initAreaQueryData(){
        let that = this;
        that.$http.post('/hotel_energy/floor_real_time',this.areaForm).then((res)=>{
          if(res.data.code == 0){
            that.areaData1 = res.data.data.area_level;
            that.allDatas = res;
            that.dealData(res);
          }else{

          }
        })
      },
      refreshCanvas(data){
          if(data.shui.time){
              if(data.shui.time.length>12){
                data.shui.time = data.shui.time.slice(data.shui.time.length-12,data.shui.time.length)
                data.shui.data_t = data.shui.data_t.slice(data.shui.data_t.length-12,data.shui.data_t.length)
                data.shui.data = data.shui.data.slice(data.shui.data.length-12,data.shui.data.length)
              }
            data.shui.time.map((item,index)=>{
              let temp = item.split(' ');
              let len = temp.length;
              data.shui.time[index] = temp[len-1].split(':')[0]+':'+temp[len-1].split(':')[1]
            })
          }
          if(data.dian.time){
              console.log(data.dian)
            if(data.dian.time.length>12){
              data.dian.time = data.dian.time.slice(data.dian.time.length-12,data.dian.time.length)
              data.dian.data_t = data.dian.data_t.slice(data.dian.data_t.length-12,data.dian.data_t.length)
              data.dian.data = data.dian.data.slice(data.dian.data.length-12,data.dian.data.length)
            }
            data.dian.time.map((item,index)=>{
              let temp = item.split(' ');
              let len = temp.length;
              data.dian.time[index] = temp[len-1].split(':')[0]+':'+temp[len-1].split(':')[1]
            })
          }

        if(data.qi.time){
          if(data.qi.time.length>12){
            data.qi.time = data.qi.time.slice(data.qi.time.length-12,data.qi.time.length)
            data.qi.data_t = data.qi.data_t.slice(data.qi.data_t.length-12,data.qi.data_t.length)
            data.qi.data = data.qi.data.slice(data.qi.data.length-12,data.qi.data.length)
          }
          data.qi.time.map((item,index)=>{
            let temp = item.split(' ');
            let len = temp.length;
            data.qi.time[index] = temp[len-1].split(':')[0]+':'+temp[len-1].split(':')[1]
          })
        }

        let random = Math.ceil(Math.random()*1000 +1);
          this.shui = {
            id:'shui'+random,
            echarts:{
              id:'lineEchartShui'+random,
              type:'shui',
              unit:'Kg/m³',
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
          this.$http.post('/hotel_energy/system_real_time',this.sysForm).then((res)=>{
            if(res.data.code == 0){
              this.sysData1 = res.data.data.sys_level;
              this.dealData(res);
            }else{

            }
          })
        }

      },
      dealData(res){
        let that = this;
        this.shishi = res.data.data.read //实时能耗
        this.shishi.dian = String(this.shishi.dian)
        this.shishi.shui = String(this.shishi.shui)
        this.shishi.qi = String(this.shishi.qi)
        let dian = this.shishi.dian;
        let dianStr = ''
        let qi = this.shishi.qi;
        let qiStr = ''
        let shui = this.shishi.shui;
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
        that.refreshCanvas(res.data.data.table);
      },
      resizeWindow(){
        let that = this;
        let res = that.allDatas;
        that.dealData(res);
      }

    }
  }
</script>
<style>
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
          align-items: center;
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
        .realTime:hover{
          cursor:pointer;
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
