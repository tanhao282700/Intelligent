<!--
    能源系统 全景查看
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="lookAll"  v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中">
    <div class="totalBox">
        <div class="boxs boxs0" style="position: relative">
            <LookTit
              :tit = '"房数/餐位数统计"'
              :cons= 'cons1'
              />
              <div class='echartBox'>
                <div class='echartBoxIn' >
                  <EchartCir ref="EchartCir0" :echartCirData = "echartCirData"/>
                </div>
                <div class='echartBoxIn'>
                  <EchartCir ref="EchartCir1" :echartCirData = "echartCirData2"/>
                </div>
              </div>
          <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0,0,0,0.8);left: 0;top:0;z-index: 10000"></div>
        </div>
        <div class="boxs boxs0 relative noMargin">
          <LookTit2
              tit = '碳排放'
              :cons= 'consT'
          />
            <Circles :circleData='circleData0'/>
        </div>
    </div>
    <div class="totalBox2">
      <div class="totalBoxIn2">
          <el-scrollbar style="height:100%">
              <div  class="totalBoxIn">
                    <div class="boxs boxs0 noMarginB">
                        <LookTit2
                            tit = '电'
                            :cons= 'consD'
                        />
                        <Circles :circleData='circleData1'/>
                    </div>
                    <div class="boxs boxs0 noMarginB">
                      <line-echarts-en :datas ='lineEcharts' ref="lineEcharts1" />
                    </div>
                    <div class="boxs boxs0  noMargin">
                      <LookTit
                        :tit = '"能耗占比"'
                        :cons= 'cons3'
                        />
                      <EchartCirFull ref="echartCirData3"  :echartCirData = "echartCirData3"/>
                    </div>
                  </div>
                  <div  class="totalBoxIn">
                    <div class="boxs boxs0 noMarginB">
                      <LookTit2
                            tit = '水'
                            :cons= 'consS'
                        />
                      <Circles :circleData='circleData2'/>
                    </div>
                    <div class="boxs boxs1">
                      <line-echarts-en :datas ='lineEcharts2'  ref="lineEcharts2"/>
                    </div>
                  </div>
                  <div  class="totalBoxIn totalBoxIn22">
                    <div class="boxs boxs0 noMarginB">
                      <LookTit2
                            tit = '气'
                            :cons= 'consQ'
                        />
                      <Circles :circleData='circleData3'/>
                    </div>
                    <div class="boxs boxs1" >
                      <line-echarts-en :datas ='lineEcharts3'  ref="lineEcharts3"/>
                    </div>
                  </div>
          </el-scrollbar>
      </div>

    </div>
  </div>
</template>
<script>
import utils from "../../../../assets/js/utils.js";
import LookTit from './lookTit';
import LookTit2 from './lookTit2';
import EchartCirFull from './EchartCirFull';
//import LineEcharts from '../../../../components/common/lineEcharts2'
import EchartCir from '../../../../components/common/echartCircle';
import Circles from '../../../../components/common/circle';
import LineEchartsEn from "./lineEchartsEn";

export default {
  components:{
    LineEchartsEn,
    'LookTit':LookTit,
    'LookTit2':LookTit2,
    'EchartCir':EchartCir,
    'Circles':Circles,
    'EchartCirFull':EchartCirFull,
    //'LineEcharts':LineEcharts
  },
  data () {
    return {
      loading:false,
      cons1:[
            {
                tit:'总数',
                color:'#3f87ed'
            },
            {
                tit:'已预订',
                color:'#fac477'
            },
        ],
        cons3:[],
        consT:{
          tit:'本月目标碳排放',
          val:'0',
          util:'kg',
        },
        consS:{
          tit:'本月目标能耗值',
          val:'0',
          util:'m³',
        },
        consD:{
          tit:'本月目标能耗值',
          val:'0',
          util:'kw/h',
        },
        consQ:{
          tit:'本月目标能耗值',
          val:'0',
          util:'m³',
        },

        echartCirData:{
            id:'echart1',
            style:{width:'1.55rem',height:237*100/728+'vh'},
            color:[
              '#fac477','rgba(0,0,0,0)','#3f87ed'
            ],
            data0:[
              {value:0, name:'总数'},
            ],
            data:[
              {value:0, name:'预订数'},
              {value:0, name:'剩余数'},
            ],
            util:'间',
            tit:'房数统计',
        },
        echartCirData2:{
            id:'echart2',
            style:{width:'1.55rem',height:237*100/728+'vh'},
            color:[
              '#fac477','rgba(0,0,0,0)','#3f87ed'
            ],
            data0:[
              {value:0, name:'总数'},
            ],
            data:[
              {value:0, name:'预订数'},
              {value:0, name:'剩余数'},
            ],
            util:'位',
            tit:'餐位数统计',
        },
        echartCirData3:{
            id:'echart3',
            color:[
              '#4389EF','#31DFC9','#FFA87E','#FF7E7E','#FFDE7E' ,'#7343EF'
            ],
            data:[
              // {value:29, name:Math.floor(29/(71+29)*100)+'%',tit:'电梯'},
              // {value:71, name:Math.floor(71/(71+29)*100)+'%',tit:'空调'},
            ],
        },
        circleData0:{
          type:'red',
          now:0,
          total:0,
          util:'kg',
          tit:'当前能耗值'
        },
         circleData1:{
          type:'green',
          now:0,
          total:0,
          util:'kg',
          tit:'当前能耗值'
        } ,
         circleData2:{
          type:'blue',
          now:0,
          total:0,
          util:'m³',
          tit:'当前能耗值'
        },
         circleData3:{
          type:'yellow',
          now:0,
          total:0,
          util:'m³',
          tit:'当前能耗值'
        } ,
        lineEcharts :{
          id:'dianEchart1',
          type:'dian',
          unit:'kw/h',
          title:'能耗对比',
          style:{width:'3.11rem',height:279*100/728+'vh'},
          list:[
             {
              name:'2016',
              data:[],
            },
             {
              name:'2017',
              data:[],
            },
            {
              name:'2018',
              data:[],
            },
          ]
        },
        lineEcharts2 :{
          id:'shuiEchart2',
          type:'shui',
          unit:'m³',
          title:'能耗对比',
          style:{width:'6.43rem',height:279*100/728+'vh'},
          list:[
             {
              name:'2016',
              data:[],
            },
             {
              name:'2017',
              data:[],
            },
            {
              name:'2018',
              data:[],
            },
          ]
        },
        lineEcharts3 :{
          id:'qiEchart3',
          unit:'m³',
          type:'qi',
          title:'能耗对比',
          style:{width:'6.43rem',height:279*100/728+'vh'},
          list:[
             {
              name:'2016',
              data:[]
            },
             {
              name:'2017',
              data:[],
            },
            {
              name:'2018',
              data:[],
            },
          ]
        },
    }
  },
  methods:{
    //餐数统计
    getData(){
      let that = this;
      let config = {
        'sys_menu_id':this.$store.state.sysList[18].sys_menu_id,
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/index', config, headers).then(res => {
        let data0 = res.data;
        console.log('全景接口', config, res);
        if(data0.code==0){
          //房数，餐位数统计
          let finance_info = data0.data.finance_info;
          //房数
          let house_num = finance_info.house_num;
          //"房间数量"
          this.echartCirData.data[0].value = house_num[0];
          //"总房间数"
          this.echartCirData.data0[0].value = house_num[1];
          let seat_num = finance_info.seat_num;
          //"在用餐位数"
          this.echartCirData2.data[0].value = seat_num[0];
          //"总餐位数"
          this.echartCirData2.data0[0].value = seat_num[1];

          this.echartCirData2.data[1].value =Number(this.echartCirData2.data0[0].value)-Number(this.echartCirData2.data[0].value);
          this.echartCirData.data[1].value = Number(this.echartCirData.data0[0].value)-Number(this.echartCirData.data[0].value);
          this.$refs.EchartCir0.drawLine();
          this.$refs.EchartCir1.drawLine();


          //能耗占比数组
          let energy_pie = data0.data.energy_pie;
          let lens = energy_pie.length;
          let attrs = [],attrs2 = [];
          let total = 0;
          for(let i=0;i<lens;i++){
            let obj = {
              value:energy_pie[i].value,
              name:'',
              tit:energy_pie[i].title
            };
            total += Number(energy_pie[i].value);
            attrs.push(obj);
          }

          for(let i=0;i<lens;i++){
            if (total === 0){
              if (lens === 1) {
                attrs[i].name = '100%';
              }else {
                attrs[i].name = ((100/lens).toFixed(2))+'%';
              }
            } else {
              attrs[i].name = Math.floor(attrs[i].value / total * 100) + '%'; //计算百分比
            }
            let objs = {    //构建标题
              tit:attrs[i].tit,
              color:this.echartCirData3.color[i]
            };
            attrs2.push(objs);
          }
          this.echartCirData3.data = attrs;
          this.cons3 = attrs2;
          this.$refs.echartCirData3.drawLine();


          //碳、水、电、气占比
          let total_energy_use = data0.data.total_energy_use;
          this.circleData0.now = Number(total_energy_use.this_month_actual_carbon_emission);
          this.circleData0.total =Number(total_energy_use.this_month_plan_carbon_emission);
          this.consT.val = Number(total_energy_use.this_month_plan_carbon_emission);

          this.circleData1.now = Number(total_energy_use.this_month_actual_use_energy['0']);
          this.circleData1.total =Number(total_energy_use.this_month_plan_use_energy['0']);
          this.consD.val = Number(total_energy_use.this_month_plan_use_energy['0']);

          this.circleData2.now = Number(total_energy_use.this_month_actual_use_energy['1']);
          this.circleData2.total =Number(total_energy_use.this_month_plan_use_energy['1']);
          this.consS.val = Number(total_energy_use.this_month_plan_use_energy['1']);

          this.circleData3.now = Number(total_energy_use.this_month_actual_use_energy['2']);
          this.circleData3.total =Number(total_energy_use.this_month_plan_use_energy['2']);
          this.consQ.val = Number(total_energy_use.this_month_plan_use_energy['2']);



          //三年能耗对比echarts
          let energy_trend_3_year = data0.data.energy_trend_3_year;
          energy_trend_3_year.map((item,i)=>{
            if (item.type == '0'){
              let data_list_new = item.data_list;
              let len = data_list_new.length;
              for (let j=0;j<len;j++){
                this.lineEcharts.list[j].name = data_list_new[j].year;
                this.lineEcharts.list[j].data = data_list_new[j].month_data;
              }
              this.$refs.lineEcharts1.drawLine();
            } else if (item.type == '1'){
              let data_list_new = item.data_list;
              let len = data_list_new.length;
              for (let j=0;j<len;j++){
                this.lineEcharts2.list[j].name = data_list_new[j].year;
                this.lineEcharts2.list[j].data = data_list_new[j].month_data;
              }
              this.$refs.lineEcharts2.drawLine();
            } else if (item.type == '2'){
              let data_list_new = item.data_list;
              let len = data_list_new.length;
              for (let j=0;j<len;j++){
                this.lineEcharts3.list[j].name = data_list_new[j].year;
                this.lineEcharts3.list[j].data = data_list_new[j].month_data;
              }
              this.$refs.lineEcharts3.drawLine();
            }
          })

        }else{
          this.$message(data0.message);
        }

      }).catch(err=>{
        console.log(err);
      })

    },


    //餐数统计
    getNums(){
      let that = this;
      let config = {
        'sys_menu_id':1,
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/panorama/device', config, headers).then(res => {
        let data0 = res.data;
        console.log('全景餐位数统计接口', config, res);
        if(data0.code==0){
          let lens = data0.data.length;
          for(let i =0;i<lens;i++){
            let val = data0.data[i].nowvalue;
            switch(Number(data0.data[i].self_id)){
              case 10102: //"在用餐位数"
                this.echartCirData2.data[0].value = val;
                break;
              case 10100:  //"房间数量"
                this.echartCirData.data[0].value = val;
                break;
              case 10101:  //"总房间数"
                this.echartCirData.data0[0].value = val;
                break;
              case 10103:  //"总餐位数"
                this.echartCirData2.data0[0].value = val;
                break;
            }
          }
        }else{
          this.$message(data0.message);
        }
        this.echartCirData2.data[1].value =Number(this.echartCirData2.data0[0].value)-Number(this.echartCirData2.data[0].value);
        this.echartCirData.data[1].value = Number(this.echartCirData.data0[0].value)-Number(this.echartCirData.data[0].value);
        this.$refs.EchartCir0.drawLine();
        this.$refs.EchartCir1.drawLine();
      }).catch(err=>{
        console.log(err);
      })

    },
    //获取水电气
    getTotal(){
      let that = this;
      let config = {
        'sys_menu_id':1,
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/panorama/total', config, headers).then(res => {
        let data0 = res.data;
        console.log('获取水电气', config, res);
        if(data0.code==0){
          this.circleData0.now = Number(data0.data.tan.now);
          this.circleData0.total =Number(data0.data.tan.plan);
          this.consT.val = Number(data0.data.tan.plan);

          this.circleData1.now = Number(data0.data.dian.now);
          this.circleData1.total =Number(data0.data.dian.plan);
          this.consD.val = Number(data0.data.dian.plan);

          this.circleData2.now = Number(data0.data.shui.now);
          this.circleData2.total =Number(data0.data.shui.plan);
          this.consS.val = Number(data0.data.shui.plan);

          this.circleData3.now = Number(data0.data.qi.now);
          this.circleData3.total =Number(data0.data.qi.plan);
          this.consQ.val = Number(data0.data.qi.plan);
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
      })

    },
    //获取三年的 能耗对比图    (需要修改)
    getTable(){
      this.loading = true;
      let that = this;
      let config = {
        'sys_menu_id':1,
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/panorama/table', config, headers).then(res => {
        let data0 = res.data;
        console.log('获取三年的能耗对比图', config, res);
        this.loading = false;
        if(data0.code==0){
          let data =data0.data;
          let dian = data.dian;
          let shui = data.shui;
          let qi = data.qi;
          //lineEcharts 电 ；lineEcharts2 水 ；lineEcharts3 气
          this.dealData(dian,'dian');
          this.dealData(shui,'shui');
          this.dealData(qi,'qi');
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading = false;
        console.log(err);
      })

    },
    dealData(data,type){
      let lens1 = data.length;
      let attrs = [];
      for(let i=0;i<lens1;i++){
        let attrs1=[];
        let lens10 = data[i].data.length;
        for(let j=0;j<lens10;j++){
          attrs1.push(data[i].data[j].value);
        }
        let obj = {
          name:data[i].year,
          data:attrs1
        }
        attrs.push(obj);
      }
      if(type == 'shui'){
        this.lineEcharts2.list = attrs;
        this.$refs.lineEcharts2.drawLine();
      }else if(type == 'dian'){
        this.lineEcharts.list = attrs;
        this.$refs.lineEcharts1.drawLine();
      }else if(type == 'qi'){
        this.lineEcharts3.list = attrs;
        this.$refs.lineEcharts3.drawLine();
      }

    },
    //获取三年的 能耗占比
    getSystem(){
      let that = this;
      let config = {
        'sys_menu_id':1,
        'type':0
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/panorama/system', config, headers).then(res => {
        let data0 = res.data;
        console.log('获取三年的能耗占比', config, res);
        if(data0.code==0){
          let data2 = data0.data;
          data2 = [  //假数据
                {
                    "id": 1,
                    "title": "空调",
                    "value": 100
                },
                {
                    "id": 2,
                    "title": "电梯",
                    "value": 200
                }
            ];
          let lens = data2.length;
          let attrs = [],attrs2 = [];
          let total = 0;
          for(let i=0;i<lens;i++){
            let obj = {
              value:data2[i].value,
              name:'',
              tit:data2[i].title
            };
            total += Number(data2[i].value);
            attrs.push(obj);
          }
          for(let i=0;i<lens;i++){
            attrs[i].name = Math.floor(attrs[i].value/total*100)+'%'; //计算百分比
            let objs = {    //构建标题
              tit:attrs[i].tit,
              color:this.echartCirData3.color[i]
            };
            attrs2.push(objs);
          }
          this.echartCirData3.data = attrs;
          this.cons3 = attrs2;
          this.$refs.echartCirData3.drawLine();
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
      })

    },
  },
  created() {
    this.getData();
     //this.getNums();
     //this.getTotal();
     //this.getTable();
     //this.getSystem();
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.lookAll{
  display:flex;
  .totalBox{
    width:24.377vw;
    overflow:hidden;
  }
  .totalBox2{
    flex:1;
    display:flex;
    .totalBoxIn{
      width:100%;
      .vh(298);
      overflow:hidden;
    }
    .totalBoxIn22{
      .vh(279);
    }
    .totalBoxIn2{
      width:100%;
      .vh(580);
      overflow:hidden;
    }
  }
  .boxs0{
    width:22.7672vw;
    .vh(279);
    margin-right:1.61vw;
    .vhMB(20);
    position:relative;
    float:left;
    .echartBox{
      width:100%;
      .vh(237);

      .echartBoxIn{
        width:50%;
        height:100%;
        float:left;
      }
    }
  }
  .boxs1{
    width:47vw;
    .vh(279);
    float:left;
  }
  .noMargin{
    margin:0;
  }
  .noMarginB{
    margin-bottom:0;
  }
}
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
