<!--
    能源系统 监控告警
    made by 白富友
    start in 2018-8-9

    还存在的问题：① table总条数， ②告警排序是否排序？ ③告警-预警-提示对应的class
-->
<template>
  <div class="alarmBoxs">
    <Crumbs :data ='crumbs'/>
    <div class="alarmBox">
        <div class="boxs boxs100  boxs2">
            <div class="boxsTit">表器情况</div> 
            <div class="alarmscc">
                <div class="alarmAll">
                    <EchartCir :echartCirData = "echartCirData"/>
                </div>
                <div class="alarmLine">
                    <div class="alarmLineIn"></div>
                    <div class="alarmLineIn"></div>
                </div>
                <div class="alarmtotal">
                    <div class="alarmtotalIn">
                      <EchartCir :echartCirData = "echartCirData2" ref="echartCirData2"/>   
                    </div> 
                    <div class="alarmPoint">
                        <div class="alarmPointBox" v-for = "(v,i) in alarmPoints">
                            <div  class="alarmPoints" :style="{background:v.color}"></div>
                            <div  class="alarmPointTit" v-text="v.tit"></div>
                        </div>
                    </div>                
                </div>
            </div>          
        </div>
        <div class="boxs boxs200  boxs2">
            <div class="boxsTit">表器情况</div> 
            <div class="searchBox">
                <div class="searchBoxIn">
                    <div class="timeBox0" style="float:left;">
                        <div class ="timeVal">
                            <span class ="timeValIn">
                            <span v-text = 'value7s[0]'></span>
                            <i class="el-icon-caret-bottom"></i>
                            </span>
                            <span style="color:#fff">--</span>
                            <span class ="timeValIn">
                            <span v-text = 'value7s[1]'></span>
                            <i class="el-icon-caret-bottom"></i>
                            </span>
                        </div>
                        <el-date-picker
                            class = 'timeBox'
                            v-model="value7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                    <div class="chooseBox100">
                        <SelectBox :data = 'selectID' @choose = "areaChoose"/> 
                    </div>                    
                    <el-button class="billBtn2" icon="el-icon-search" type="primary" @click="search">查询</el-button>
                </div>

            </div>
            <div class="boxs200Tits">
                <div class="titLeft">告警排名</div>
                <div class="titRight">
                    <span>TOP3</span>
                </div>
            </div> 
            <ul class="colBoxs boxs">
                <li v-for="(v,i) in colBoxs">
                    <span :style="{color:v.color}" v-text="'0'+(i+1)"></span>
                    <span v-text="v.name"></span>
                    <span :style="{color:v.color}" v-text ="v.num"></span>
                    <span>次</span>
                </li>
            </ul>
            <div class="boxs200Tits">
                <div class="titLeft">告警排名</div>
                <div class="titRight">
                    <div class="titPointBox" v-for = "(v,i) in alarmBoxs">
                        <div class="titPointTit" v-text = "v.text"></div>
                        <div class="titPoint" :style="{background:v.color}"></div>                        
                    </div>
                </div>
            </div>
            <div class="colEcharts">
                <p>单位：条</p>
                <div class="colEchartsBox" v-show="!noEchartData">
                    <AlarmEcharts ref = "AlarmEcharts0" :echartCirData ="barData"/>
                </div>
                <div class="colEchartsBox2" v-show="noEchartData">
                    <span>没有数据</span>
                </div>
            </div>                     
        </div>
        <div class="boxs boxs300  boxs2">
            <div class="boxsTit">告警记录</div>  
            <div class="tableBox">
                <Table style="width:100%" :table = "table"/>   
            </div>      
        </div>
    </div>
  </div>
</template>

<script>
import utils from '../../assets/js/utils';
import Table from '@/components/common/table';
import alarmSpan from './components/alarms/alarmSpan';
import alarmEcharts from './components/alarms/alarmEcharts';
import SelectBox from '@/components/common/selectBox';
import EchartCir from '@/components/common/echartCircle';

export default {
    components:{
        'Table':Table,
        'EchartCir':EchartCir,
         'SelectBox':SelectBox,
         'AlarmEcharts':alarmEcharts
  },
  name: 'alarm',
  computed:{
    value7s(){
      let res = ['开始时间','结束时间'];
      if(this.value7!=''){
        res  = [utils.timeDeal(this.value7[0]),utils.timeDeal(this.value7[1])];
      }
      return res;
    },
    
  },
  data () {
    return {
        crumbs:['能源管理系统','监控告警'],
        selectID:{
        sId:1,
      },
      areaId:0,  //区域ID
        table:{
            small:'small',
            hei:259, //table高度  设置后有滚动条
            len:800, //总条数
            data:[
            // {id:1,number:'01',type:'单日能耗超量50%',info:'2018年5月10日用电耗能较fafa法法法法地方',time:'12:00',level:'0'}, //0 提示； 1：预警； 2：告警
            // {id:2,number:'02',type:'3.5',info:'08:00',time:'12:00',level:'1'},
            ],
            th:[
            {prop:'number',label:'编号'},
            {prop:'type',label:'事件类型',wid:145},
            {prop:'info',label:'告警详情',wid:229},
            {prop:'time',label:'告警时间'},
            { prop:'level',
                label:'告警等级',
                operate: true, 
                render: (h, param)=> {
                    const btnss = {
                        level:param.row.level,                
                    };
                    return h(alarmSpan,{
                    props: { btnss:btnss},
                    on:{}
                    });
                } 
                
            },
            ]
        },
        echartCirData:{
            id:'echart1',
            style:{width:'2.76rem',height:196*100/728+'vh'},
            color:[
                '#fe6a7d','rgba(0,0,0,0)','#fe6a7d'
            ], 
            data0:[
                {value:0, name:'总数'},
            ],
            data:[
            ], 
            util:'次',
            tit:'进一周警告次数',
            type:2
        },
        echartCirData2:{
            id:'echart2',
            style:{width:'2.76rem',height:196*100/728+'vh'},
            color:[
                '#fac477','rgba(0,0,0,0)','#3f87ed'
            ], 
            data0:[
                {value:0, name:'表气总数'},
            ],
            data:[
                {value:0, name:'异常数'},
                {value:0, name:'剩余数'},
            ], 
            util:'个',
            tit:'表气统计',
            type:2
        },
        alarmPoints:[
            {color:'#3f87ed',tit:'表气总数'},
            {color:'#fac477',tit:'异常数'},
        ],
        value7: '',    //时间区间值
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },      
       alarmBoxs:[
           {color:'#fd6a7c',text:'告警'},
           {color:'#fbc77f',text:'预警'},
           {color:'#3079e7',text:'提示'},
       ],
       colBoxs:[
        //    {color:'#ff4f80',name:'18FB区客',num:'22'},
        //    {color:'#ff8a63',name:'6FE区餐厅',num:'18'},
        //    {color:'#ffcf85',name:'12FB区厨房',num:'14'},
       ],
       colors:['#ff4f80','#ff8a63','#ffcf85'], //排名的颜色
       barData:{
         id:'echartAlarm',
         color:['#3079e7','#fbc77f','#fd6a7c'],
         style:{width:'6.43rem',height:309*100/728+'vh'},
          data1:[], //提示
          data2:[], //预警
          data3:[], //告警
          xData:[]   
       },
       noEchartData:false,
    }
  },
  methods:{
    search(){  //查询
        this.getAlarmRank('search');
    },
       //修改区域
    areaChoose(id){
        this.areaId= id;
    },  
    getAlarmNum(){  //获取告警次数
        let data = {'sys_menu_id':1};
       utils.post('energy/alarm/device',data).then(res=>{
        // console.log(res,111)
        if(res.code==0){
           let data = res.data;
           this.echartCirData.data0[0].value = data.count;
           this.echartCirData2.data0[0].value = data.device;
           this.echartCirData2.data[0].value = data.alarm;
           this.echartCirData2.data[1].value = data.device-data.alarm;
           this.$refs.echartCirData2.drawLine();
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
    getAlarmLoad(pagenumber=1){  //获取告警记录
        let data = {'sys_menu_id':1,'pagenumber':pagenumber};
       utils.post('energy/alarm/recod',data).then(res=>{
        // console.log(res,111) 
        if(res.code==0){
           let data = res.data;
           let lens = data.length;
           let attrs = [];
           for(let i=0;i<lens;i++){
                let objs = {
                    id:data[i].id,
                    number:'0'+(i+1),
                    type:data[i].content,
                    info:data[i].describe,
                    time:data[i].addtime,
                    level:data[i].class
                };  
                attrs.push(objs);
           }
           this.table.data = attrs;
           this.table.len = res.paging;
            
                           
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
    getAlarmRank(type){  //获取设备的区域的故障排名 及报表
        let data = {'sys_menu_id':1,'floor_id':this.areaId};
        //以下是选填
      if(this.value7!==''){
         data.time_start =utils.time(this.value7[0]/1000,4);
         data.time_end =utils.time(this.value7[1]/1000,4);
      }
       utils.post('energy/alarm/rank',data).then(res=>{
           if(type == 'search'){
               this.$message('查询成功!');
           }
        if(res.code==0){
           let data = res.data;
           let rank = data.rank;
           let rLens = rank.length;
           let colBoxs = [];
           for(let i=0;i<rLens;i++){
               let objs = {
                   color:this.colors[i],
                   name:rank[i].name,
                   num:rank[i].count
                   };
               colBoxs.push(objs);  
           }
           this.colBoxs = colBoxs;
            //图表
           this.barData.data1 = data.data0;
           this.barData.data2 = data.data1;
           this.barData.data3 = data.data2;
           this.barData.xData = data.time;
           if( this.barData.xData.length==0){
               this.noEchartData = true;
            }else{
                this.noEchartData = false;
                this.$refs.AlarmEcharts0.drawLine();
            }     
        }else{
          this.$message(res.message);
        }           
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  created() {
     this.getAlarmNum();
     this.getAlarmLoad();
     this.getAlarmRank();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../assets/css/comon.less';

.alarmBoxs{
    width: 100%;
    height: 100%;
   .alarmBox{
      width: 13.06rem;
      margin:0 auto;
      overflow: hidden;
        .vh(610);
        div{
            .boxsTit{
                background-color: rgba(0, 0, 0, 0.2);
            }
        }
        .boxs100{
            width: 6.43rem;
            .vh(235);
            float: left;
            .vhMB(20);
            .alarmscc{
                display: flex;
                .vh(196);
                width: 100%;
                .alarmAll{
                   float: left;
                   height: 100%;
                   width: 2.76rem;
                }
                .alarmLine{
                    float: left;
                    height: 100%;
                    width: 0.01rem;
                    .vhPT(58);
                    .alarmLineIn{
                        width: 100%;
                        .vh(40);
                        background: #ccc;
                        &:nth-child(1){
                            .gradientT(rgba(73,143,226,0.88),rgba(73,143,226,0));
                        }
                        &:nth-child(2){
                            .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.88));
                        }
                    }
                }
                .alarmtotal{
                    height: 100%;
                    width: 3.66rem;
                    float: left;
                    position: relative;
                    .alarmtotalIn{
                        width: 2.78rem;
                    }
                    .alarmPoint{
                        position: absolute;
                        left: 2.68rem;
                        .vhTop(71);
                        .vh(39);
                        .alarmPointBox{
                            width: 100%;
                            .vh(12);
                            .vhLH(12);
                            .alarmPoints{
                                width: 0.1rem;
                                height: 0.1rem;
                                border-radius: 50%;
                                margin-right: 0.11rem;
                                float: left;
                                .vhMT(1);
                            }
                            .alarmPointTit{
                                font-size: 0.12rem;
                                color: #fff;
                                float: left;
                            }
                            &:nth-child(1){
                                .vhMB(15);
                            }
                        }
                    }
                }
            }
        }
        .boxs200{
            width: 6.43rem;
            .vh(608);
            float: right;    
            .searchBox{
                .vh(56);
                .vhPT(12);
                padding-right: 0.20rem;
                width: 100%;
                .searchBoxIn{
                    .vh(32);
                    float: right;
                    display: flex;
                    width: 5.3rem;
                    border-radius: 2px;
                    border: solid 1px #3a84ed;
                    align-items: center;
                    justify-content: flex-end;
                    .billBtn2{
                        padding-top: 0;
                        width: 0.87rem;
                        .vh(30);
                        .vhLH(30);
                        float: right;
                        border-radius: 0;
                    }
                    .chooseBox100{
                        float: left;
                        width:0.85*3rem;
                        .vh(32);
                    }
                    .chooseBox200{
                        float: left;
                        width:2.96rem;
                        .vh(32);
                    }
                }                
            } 
            .boxs200Tits{
                width: 100%;
                .vh(24);
                .vhLH(12);
                .vhPB(12);
                .titLeft{
                    float: left;
                    border-left: 2px solid @color-blue;
                    color: @color-blue;
                    font-size: 0.12rem;
                    text-indent: 0.2rem;
                    font-weight: 600;
                }
                .titRight{
                    float: right; 
                    padding-right:0.35rem;
                    span{
                        color:#fff;
                        font-size: 0.12rem;
                    }   
                    .titPointBox{
                        width: 0.6rem;
                        height: 100%;
                        float: left;
                        .titPoint{
                            float: right;
                            width: 0.1rem;
                            height: 0.1rem;
                            .vhMT(1);
                            border-radius: 50%;
                            background: #ccc;
                        }
                        .titPointTit{
                            color:#fff;
                            float: right;
                            padding-left: 0.1rem;
                            font-size: 0.12rem;
                        }
                    }               
                }
            } 
            .colBoxs{
                display: flex;
                flex-direction: column;
                width: 6.03rem;
                .vh(120);
                background: rgba(0,0,0,0.25);
                margin-left: 0.2rem;
                .vhMB(31);
                padding-left: 0.2rem;
                li{
                    flex:1;
                    border-bottom:1px solid rgba(58,137,249,0.3); 
                    display: flex;
                    align-items: center;
                    &:nth-child(3){
                        border-color:rgba(0,0,0,0);
                    }
                    span{
                        font-size: 0.14rem;
                        &:nth-child(1){
                            display: inline-block;
                            width: 0.44rem;
                        }
                        &:nth-child(2){
                            color:#f4f4f4;
                            flex:1;
                        }
                        &:nth-child(3){
                        }
                        &:nth-child(4){
                            color:@color-blue;
                            display: inline-block;
                            width: 0.55rem;
                            text-indent: 0.2rem;
                        }
                    }
                }
            }
            .colEcharts{
                width: 100%;
                .vh(325);
                .vhPT(4);
                p{
                    .vh(12);
                    .vhLH(12);
                    color:@color-blue;
                    font-size: 0.12rem;
                    text-indent: 0.20rem;
                }
                .colEchartsBox{
                    width: 100%;
                    .vh(309);
                }
                .colEchartsBox2{
                    width: 100%;
                    .vh(309);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    span{
                        color:#fff;
                        text-align: center;
                    }
                }
            }      
        }
        .boxs300{
            width: 6.43rem;
            .vh(353);          
            float: left;
            .tableBox{
                .vh(312);
                padding-left: 0.08rem; 
            }
        }
  } 
}
  

</style>
