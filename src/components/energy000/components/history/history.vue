
<!--
    能源系统 历史数据对比
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="history boxs"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
  >
    <div class= 'readingTit'>
        <div class="titSeletBox">
            <SelectHead
            :lists = "titHeads"
            @changeHead = "changeHead"
            />
        </div>
    </div>
    <div class="hisBody">
      <div class="hisBox1 boxs boxs2">
        <div class="boxsTit">同环比分析</div>
          <div class="boxsIn">
            <div class="titSeletBox2" v-show="energy_type==0">
                <SelectHead
                  ref="selHeads2"
                :lists = "titHeads2"
                @changeHead = "changeHead2"
                />
          </div>
            <div class="fontb" ><!-- :class="{'fontb2':titHeads[0].state}" -->
              <span @click="changeNowActive('today')" :class="{'active':nowActive == 'today'}">今天</span>
              <span @click="changeNowActive('mon')" :class="{'active':nowActive == 'mon'}">本月</span>
            </div>
            <div class="searchBoxs">
              <div class="searchBoxsIn">
                <div class="tRBrnBox">
                  <el-select @change="startMonthSelChange" v-model="startMonthVal" placeholder="开始月">
                    <el-option
                      v-for="item in startMonthOptions"
                      :key="''+item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="tRBrnBox">
                  <el-select @change="startDaySelChange" v-model="startDayVal" placeholder="开始日">
                    <el-option
                      v-for="item in startDayOptions"
                      :key="''+item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <span class="splitLine"></span>
                <div class="tRBrnBox">
                  <el-select @change="endMonthSelChange" v-model="endMonthVal" placeholder="结束月">
                    <el-option
                      v-for="item in endMonthOptions"
                      :key="''+item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="tRBrnBox">
                  <el-select @change="endDaySelChange" v-model="endDayVal" placeholder="结束日">
                    <el-option
                      v-for="item in endDayOptions"
                      :key="''+item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>

                <!--<div class="timeBox0" style="float:left;">
                    <div class ="timeVal">
                      <span class ="timeValIn">
                        <span v-text = 'value7s[0]'></span>
                        <i class="el-icon-caret-bottom"></i>
                      </span>
                      <span style="color:#fff">&#45;&#45;</span>
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
                      value-format = 'MM-dd'
                      >
                    </el-date-picker>
                </div>-->
                <div class="chooseBox100" v-show = "titHeads2[0].state">
                  <div class="tRBrnBox">
                    <el-cascader
                      :change-on-select='true'
                      :options="floorOptions"
                      v-model="floorSelectedOptions"
                      @change="floorChange">
                    </el-cascader>
                  </div>
                  <!--<SelectBox  :data = 'selectID' @choose = "areaChoose"/>-->
                </div>
                <div class="chooseBox200" v-show = "titHeads2[1].state">
                  <div class="tRBrnBox">
                    <el-cascader
                      :change-on-select='true'
                      :options="sysOptions"
                      v-model="sysSelectedOptions"
                      @change="sysChange">
                    </el-cascader>
                  </div>
                  <!--<SelectBox3 :data = 'selectID2' @choose = "areaChoose2"/>-->
                </div>
                <el-button class="billBtn2" icon="el-icon-search" @click="search" type="primary">查询</el-button>
              </div>
            </div>
            <div class="echBoxs" :style="{'marginTop':energy_type==0?0:(48*100/728+'vh')}">
              <div class="tits">
                <div class="tit">环比历史年份平均值</div>
              </div>
              <ul class="echVal0">
                <li v-for = "(v,i) in echList">
                  <span class="child1" v-text="v.label"></span>
                  <span class="child2" :class="{'colorR':v.val>=0,'colorO':v.val<0}" v-text="v.val+'%'"></span>
                  <img v-show = "v.val>0" :src="require('../../../../assets/img/circle/up.png')" alt="">
                  <img v-show = "v.val<0" :src="require('../../../../assets/img/circle/down.png')" alt="">
                </li>
              </ul>
              <div class="tits">
                <div class="tit">同比历史年份平均值</div>
              </div>
              <div class="echBoxIn">
                <p>单位：%</p>
                <EchartBar :echartCirData ="barData" ref="barEcharts"/>
              </div>
            </div>
        </div>
      </div>

       <div class="hisBox2 boxs boxs2 hisBox4" v-show="titHeads[0].state || titHeads[2].state">
          <div class="boxsTit">区域分析</div>
         <div class="boxsIn boxsIn4">
           <echart-circle-en1 :echartCirData = "echartCirData3" ref="echartCirData3" @itemClick = "itemClick"/>
         </div>
      </div>

      <div class="hisBox2 boxs boxs2" v-show ="titHeads[1].state">
          <div class="boxsTit">区域分析</div>
         <div class="boxsIn">
           <EchartCircle :echartCirData = "echartCirData" ref="echartCirData" @itemClick = "itemClick"/>
         </div>
      </div>
      <div class="hisBox3 boxs boxs2" v-show ="titHeads[1].state">
          <div class="boxsTit">设备分析</div>
         <div class="boxsIn">
           <EchartCircle :echartCirData = "echartCirData2" ref= "echartCirData2" @itemClick = "itemClick"/>
         </div>
      </div>
    </div>
    <Dialog wid = "5.76rem" hei = "3.37rem" ref = "dialog" tit = "电力设备分析">
         <EchartCircle :echartCirData = "echartCirDataInfo" @itemClick = "itemClick" ref = "echartInfo"/>
    </Dialog>
  </div>
</template>

<script>

import utils from '../../../../assets/js/utils';
import SelectHead from './selectHead2';
import EchartCircle from './echartCircle0';
import EchartBar from './EchartBar';
import SelectBox from '../../../../components/common/selectBox';
import SelectBox3 from '../../../../components/common/selectBoxE';
import EchartCircleEn1 from "./echartCircleEn1";
export default {
   components:{
     EchartCircleEn1,
    'SelectHead':SelectHead,
    'EchartCircle':EchartCircle,
    'SelectBox':SelectBox,
    'EchartBar':EchartBar,
    'SelectBox3':SelectBox3
  },
  watch:{
    sysSelectedOptions(newVal){
      if (newVal.length ===0){
        this.areaId2 = 0
      } else {
        this.areaId2 = newVal[newVal.length-1];
      }
    },
    floorSelectedOptions(newVal){
      if (newVal.length ===0){
        this.areaId = 0
      } else {
        this.areaId = newVal[newVal.length-1];
      }
    }
  },
  computed:{
    startMonthOptions(){
      let tempArr=[
        {
          label:'开始月',
          value:''
        }
      ];
      for (let i=1;i<13;i++){
        let obj = {};
        obj.value = (i<10?('0'+i):(''+i));
        obj.label = (i<10?('0'+i+'月'):(''+i+'月'));
        tempArr.push(obj)
      }
      return tempArr;
    },

    endMonthOptions(){
      let tempArr=[
        {
          label:'结束月',
          value:''
        }
      ];
      for (let i=1;i<13;i++){
        let obj = {};
        obj.value = (i<10?('0'+i):(''+i));
        obj.label = (i<10?('0'+i+'月'):(''+i+'月'));
        tempArr.push(obj)
      }
      return tempArr;
    },
     /*value7s(){
      let res = ['开始时间','结束时间'];
      if(this.value7!=''){
        res  =[this.timeDeal(this.value7[0]),this.timeDeal(this.value7[1])];
      }
      return res;
    },*/

  },
  data () {
    return {
      energy_type:1,
      startMonthVal:'',
      startDayVal:'',
      endMonthVal:'',
      endDayVal:'',
      sysSelectedOptions:[],
      sysOptions: [],
      floorSelectedOptions:[],
      floorOptions: [],
      nowYear:(new Date().getFullYear()),
      startDayOptions:[],//开始日
      endDayOptions:[],//结束日
      time_start:'',
      time_end:'',
      loading:false,
      selectID:{
        sId:1,
      },
      selectID2:{
          sId:1,
      },
      areaId:0,  //区域ID
      areaId2:0, //那个啥
      barData:{
         id:'echartBar',
          style:{width:'7.63rem',height:208*100/728+'vh'},
          data:[],
           xData:[]
       },
        nowActive:'',
        titHeads:[
            {id:1,tit:'水',state:true},
            {id:0,tit:'电',state:false},
            {id:2,tit:'气',state:false},
        ],
        titHeads2:[
            {id:1,tit:'区域',state:true},
            {id:2,tit:'系统',state:false},
        ],

        echartCirData3:{  //水情况下的 区域分析
          id:'areaCirle3',
          type:'1',    //用于获取子元素数据
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:450*100/728+'vh'},
          data:[
                // {id:1,value:29, name:'一楼'},
                // {id:2,value:29, name:'二楼'},
                // {id:3,value:29, name:'三楼'},
                // {id:4,value:29, name:'四楼'},
                // {id:5,value:29, name:'五楼'},
                // {id:6,value:29, name:'六楼'},
               ],
        },
        echartCirData:{
          id:'areaCirle',
          type:'1',    //用于获取子元素数据
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:196*100/728+'vh'},
          data:[
                // {id:1,value:29, name:'一楼'},
                // {id:2,value:29, name:'二楼'},
                // {id:3,value:29, name:'三楼'},
                // {id:4,value:29, name:'四楼'},
                // {id:5,value:29, name:'五楼'},
                // {id:6,value:29, name:'六楼'},
               ],
        },
        echartCirData2:{
          id:'equiCirle2',
          type:'2',
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'4.83rem',height:196*100/728+'vh'},
          data:[
                // {id:7,value:19, name:'室内用电'},
                // {id:8,value:49, name:'公共用电'},
                // {id:9,value:29, name:'空调'},
                // {id:10,value:29, name:'电力'},
               ],
        },
        echartCirDataInfo: {
          id:'echartInfo',
          url:'',
          color:['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'],
          style:{width:'5.76rem',height:196*100/728+'vh',marginTop:'0.35rem'},
          data:[
              {id:0,value:0, name:'数据加载中'},
          ],
      },
      value7: '',    //时间区间值
       echList:[
         {label:'日',val:0},
         {label:'月',val:0},
         {label:'季',val:0},
       ],
       data1:null,
       data2:null
    }
  },
  methods:{
    sysChange(val){
      console.log(val,this.sysSelectedOptions)
    },
    floorChange(val){
      console.log(val,this.floorSelectedOptions)
    },
    startMonthSelChange(val){
      this.nowActive = '';
      let tempArr=[
        {
          label:'开始日',
          value:''
        }
      ];
      if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
        for (let i=1;i<32;i++){
          let obj = {};
          obj.value = (i<10?('0'+i):(''+i));
          obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
          tempArr.push(obj)
        }
        this.startDayOptions = tempArr;
      } else if (val == '02') {
        if (this.nowYear % 4 == 0){
          for (let i=1;i<30;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
            tempArr.push(obj)
          }
          this.startDayOptions = tempArr;
        } else {
          for (let i=1;i<29;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
            tempArr.push(obj)
          }
          this.startDayOptions = tempArr;
        }
      } else {
        for (let i=1;i<31;i++){
          let obj = {};
          obj.value = (i<10?('0'+i):(''+i));
          obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
          tempArr.push(obj)
        }
        this.startDayOptions = tempArr;
      }
    },
    startDaySelChange(val){
      this.nowActive = '';
    },
    endMonthSelChange(val){
      this.nowActive = '';
      let tempArr=[
        {
          label:'结束日',
          value:''
        }
      ];
      if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
        for (let i=1;i<32;i++){
          let obj = {};
          obj.value = (i<10?('0'+i):(''+i));
          obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
          tempArr.push(obj)
        }
        this.endDayOptions = tempArr;
      } else if (val == '02') {
        if (this.nowYear % 4 == 0){
          for (let i=1;i<30;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
            tempArr.push(obj)
          }
          this.endDayOptions = tempArr;
        } else {
          for (let i=1;i<29;i++){
            let obj = {};
            obj.value = (i<10?('0'+i):(''+i));
            obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
            tempArr.push(obj)
          }
          this.endDayOptions = tempArr;
        }
      } else {
        for (let i=1;i<31;i++){
          let obj = {};
          obj.value = (i<10?('0'+i):(''+i));
          obj.label = (i<10?('0'+i+'日'):(''+i+'日'));
          tempArr.push(obj)
        }
        this.endDayOptions = tempArr;
      }
    },
    endDaySelChange(val){
      this.nowActive = '';
    },
    timeDeal(time){
      let res = '';
      let attrs = time.split('-');
      res = attrs[0]+'月'+attrs[1]+'日';
      return res;
    },
    //修改区域
    // areaChoose(id){
    //     this.areaId= id;
    // },
    // //修改系统区域
    // areaChoose2(id){
    //     this.areaId2= id;
    // },
    search(){
      this.requestData();
      /*let id =1;
      if(this.titHeads2[1].state){
        id=2;
      }
      if(id == 2){
          this.getData();

        }else if(id==1){
          this.getData2();
        }*/
    },
    changeHead(id){  //修改头部1  水电气
      //代码错了，这里不起作用
      /*let titHeads = this.titHeads;
        for(let i=0;i<titHeads.length;i++){
          titHeads.state = false;
          if(titHeads.id==id){
            titHeads.state = true;
          }
        }
      this.titHeads = titHeads;*/

      //console.log('呵呵',this.titHeads)
      console.log(id);
      this.nowActive = '';
      this.startDayVal = '';
      this.endDayVal = '';
      this.startMonthVal = '';
      this.endMonthVal = '';
      this.floorSelectedOptions = [];
      this.areaId = 0;
      this.requestData();
      //this.search();
      /*if(id==1){  //水的时候只有区域分析
        this.getPieF();
      }else{      //电气的时候只有区域分析
        this.getPieS();
        this.getPieF();
      }*/


    },
    changeHead2(id){ //修改区域或系统
      console.log(id);
      this.nowActive= '';
      this.startDayVal = '';
      this.endDayVal = '';
      this.startMonthVal = '';
      this.endMonthVal = '';
      this.sysSelectedOptions = [];
      this.areaId2 = 0;
      let titHeads2 = this.titHeads2;
      for(let i=0;i<titHeads2.length;i++){
        if(titHeads2[i].id==id){
          titHeads2[i].state = true;
        } else {
          titHeads2[i].state = false;
        }
      }
      this.titHeads2 = titHeads2;

      this.requestData();
      //console.log(id)
      /*if(id == 2){
            if(this.data1==null){
                this.getData();
            }else{
                this.dealData(this.data1);
            }
        }else if(id==1){
            if(this.data2==null){
                this.getData2();
            }else{
                this.dealData(this.data2);
            }
        }*/
    },
    itemClick(id,type){
      console.log(id,type);
      if(type==1){ //区域
        this.getPieF(id,'in');
      }else{
        this.getPieS(id,'in');
      }


    },
    changeNowActive(type){
      this.endDayOptions = [];
      this.startDayOptions = [];
      this.startDayVal = '';
      this.endDayVal = '';
      this.startMonthVal = '';
      this.endMonthVal = '';

      this.nowActive = type;
      let nowDate = new Date();
      let nowYear = nowDate.getFullYear();
      let nowMon = (nowDate.getMonth()+1)<10?('0'+(nowDate.getMonth()+1)):(''+(nowDate.getMonth()+1));
      let nowDay = (nowDate.getDate()<10?('0'+nowDate.getDate()):(''+nowDate.getDate()));

      if (type == 'today'){
        this.time_start = (nowYear+nowMon+nowDay);
        this.time_end = (nowYear+nowMon+nowDay);
      } else if (type == 'mon'){
        this.time_start = (nowYear+nowMon);
        this.time_end = (nowYear+nowMon);
      }

      this.requestData();
    },
    requestData(){
      this.loading = true;
      this.floorOptions = [];
      this.sysOptions = [];

      if(this.nowActive == '') {
        if ((this.startMonthVal + this.startDayVal).length !== 0) {
          this.time_start = this.nowYear + this.startMonthVal + this.startDayVal;
        } else {
          this.time_start = '';
        }
        if ((this.endMonthVal + this.endDayVal).length !== 0) {
          this.time_end = this.nowYear + this.endMonthVal + this.endDayVal;
        } else {
          this.time_end = '';
        }
        if (this.time_start == '' && this.time_end == '') {

        } else {
          if (this.time_start.length !== this.time_end.length) {
            this.$message('请保持时间筛选格式一致！');
            return false;
          }
        }
        if (this.time_start != '' && this.time_end != '') {
          if (Number(this.time_end) - Number(this.time_start) < 0) {
            this.$message('结束时间需大于开始时间！');
            return false;
          }
        }
      }

      let params = {
        time_start:this.time_start,
        time_end:this.time_end,
        sys_menu_id:this.$store.state.sysList[18].sys_menu_id,
      };
      for(let i=0;i<3;i++){//遍历水电气
        if(this.titHeads[i].state){
          this.energy_type = this.titHeads[i].id;
          params.energy_type=this.titHeads[i].id;
          if ((this.titHeads[i].id == 1 && this.titHeads2[1].state) || (this.titHeads[i].id == 2  && this.titHeads2[1].state)) {
            this.titHeads2 = [
              {id:1,tit:'区域',state:true},
              {id:2,tit:'系统',state:false},
            ];
            this.$refs.selHeads2.refresh([
              {id:1,tit:'区域',state:true},
              {id:2,tit:'系统',state:false},
            ]);
            console.log(this.$refs);
          }
        }
      }
      if (this.titHeads2[0].state){
        params.floor_id = this.areaId;
      } else {
        delete params.floor_id;
      }
      if (this.titHeads2[1].state){
        params.system_id = this.areaId2;
      } else {
        delete params.system_id;
      }




      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/history_compare', params, headers).then(res => {
        let data0 = res.data;
        console.log('历史数据对比', params, res);
        if(data0.code==0){
          let data2 = data0.data;

          //楼层数据
          let area_level = data2.area_level;
          let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
          this.floorOptions = dealedFloor;
          this.floorOptions.unshift({
            label:'全部区域',
            value:0,
          });

          //系统数据
          let sys_level = data2.sys_level;
          let dealedSys = JSON.parse(JSON.stringify(sys_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
          this.sysOptions = dealedSys;
          this.sysOptions.unshift({
            label:'全部系统',
            value:0,
          });


          let res_compare_analysis = data2.res_compare_analysis;

          let percent = res_compare_analysis.percent;
          this.echList[0].val =percent.day;
          this.echList[1].val =percent.month;
          this.echList[2].val =percent.quarter;

          let table = res_compare_analysis.table;
          this.barData.xData = table.time;
          this.barData.data = table.data;
          this.$refs.barEcharts.drawLine();

          let res_pie_area = data2.res_pie_area;
          let lens = res_pie_area.length;
          let attrs = [];
          for(let i=0;i<lens;i++){
            /*if(res_pie_area[i].value==0){
              continue;
            }*/
            let objs = {
              id:res_pie_area[i].id,
              value:res_pie_area[i].value,
              name:res_pie_area[i].name
            };
            attrs.push(objs);
          }

          this.echartCirData.data = attrs;
          this.echartCirData3.data = attrs;
          this.$refs.echartCirData.drawLine();
          this.$refs.echartCirData3.drawLine();

          let res_pie_device = data2.res_pie_device;
          let lens2 = res_pie_device.length;
          let attrs2 = [];
          for(let j=0;j<lens2;j++){
            /*if(res_pie_device[j].value==0){
              continue;
            }*/
            let objs2 = {
              id:res_pie_device[j].id,
              value:res_pie_device[j].value,
              name:res_pie_device[j].name
            };
            attrs2.push(objs2);
          }
          this.echartCirData2.data = attrs2;
          this.$refs.echartCirData2.drawLine();

          this.loading = false;
        }else{
          this.loading = false;
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
        this.loading = false;
      })
    },
    /*getData(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      let data = {ststem_id:this.areaId2};
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      //以下是选填
      if(this.value7!==''){
         data.time_start =this.value7[0];
         data.time_end =this.value7[1];
      }
      this.loading =true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/history/system', data, headers).then(res => {
        let data0 = res.data;
        console.log('history_sys', data, res);
        if(data0.code==0){
          this.loading = false;
          let data2 = data0.data;
          this.dealData(data2,1);
        }else{
          this.loading = false;
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
        this.loading = false;
      })

    },
    getData2(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      let data = {floor_id:this.areaId};
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.type=this.titHeads[i].id
        }
      }
      //以下是选填
      if(this.value7!==''){
         data.time_start =this.value7[0];
         data.time_end =this.value7[1];
      }
      this.loading =true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('energy_pc/pc/history/floor', data, headers).then(res => {
        this.loading = false;
        let data0 = res.data;
        console.log('history_floor', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          this.dealData(data2,2);
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
        this.loading = false;
      })

    },*/
    dealData(data,id){
       if(id==1){
            this.data1 = data;
        }else{
            this.data2 = data;
        }
        let percent = data.percent;
        this.echList[0].val =percent.day;
        this.echList[1].val =percent.month;
        this.echList[2].val =percent.quarter;

        let table = data.table;
        this.barData.xData = table.time;
        this.barData.data = table.data;
        this.$refs.barEcharts.drawLine();
    },
    getPieF(id=this.areaId,type=''){   //楼层的情况下的
      let data = {
        floor_id :id
      };
      for(let i=0;i<3;i++){
        if(this.titHeads[i].state){
          data.energy_type=this.titHeads[i].id
        }
      }
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/history_compare/area', data, headers).then(res => {
        let data0 = res.data;
        console.log('区域那些饼状图', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          if(type=='in'){
            this.dealDataIn(data2,1);
          }else{
            this.dealData2(data2,1);
          }
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
      })

    },
    getPieS(id=this.areaId2,type=''){   //设备的情况下的
      let data = {
        device_id:id
      };
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/operation/history_compare/device', data, headers).then(res => {
        let data0 = res.data;
        console.log('设备饼状图', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          if(type=='in'){
            this.dealDataIn(data2,2);
          }else{
            this.dealData2(data2,2);
          }
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        console.log(err);
      })

    },
    dealDataIn(data,type){ //弹框里面的东东
      let color = ['#31dfc9','#4389ef','#ffa87e','#ff7e7e','#ffdd7e','#7343ef'];
      if(type==2){//设备
        color = ['#95d5ff','#5fc2ff','#1da9ff','#1b9ae8','#0183d3'];
      }


      let lens = data.length;
      if(lens ==0){
        return;
      }
      this.$refs.dialog.show();
      let attrs = [];
      for(let i=0;i<lens;i++){
        /*if(data[i].value==0){
          continue;
        }*/
        let objs = {
          id:data[i].id,
          value:data[i].value,
          name:data[i].name
        };
        attrs.push(objs);
      }

      let obj = {
          color:color,
          style:{width:'4.83rem',height:196*100/728+'vh',marginTop:'0.35rem'},
          data:attrs,
      };
      this.echartCirDataInfo.color = obj.color;
      this.echartCirDataInfo.style = obj.style;
      this.echartCirDataInfo.data = obj.data;
    },
    dealData2(data,type){ //饼状图的数据处理
      let lens = data.length;
      let attrs = [];
      for(let i=0;i<lens;i++){
        if(data[i].value==0){
          continue;
        }
        let objs = {
          id:data[i].id,
          value:data[i].value,
          name:data[i].name
        };
        attrs.push(objs);
      }

      if(type == 1){
        this.echartCirData.data = attrs;
        this.echartCirData3.data = attrs;
        this.$refs.echartCirData.drawLine();
        this.$refs.echartCirData3.drawLine();
      }else{
        this.echartCirData2.data = attrs;
        this.$refs.echartCirData2.drawLine();
      }
    }

  },
  created() {
    // this.getData2();
    // this.getPieF();
    this.requestData();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
@import '../../../../assets/css/comon.less';
.history{
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
    .readingTit{
        height:8.24vh;
        overflow: hidden;
        .titSeletBox{
            width: 6rem;
            .vh(48);
            position: relative;
            left: 4.13rem;
            .vhPT(16);
            float: left;
        }
    }
    .hisBody{
      flex:1;
      .hisBox1{
        float: left;
        width: 7.63rem;
        .vh(490);
        margin-left: 0.2rem;
        position: relative;
        .boxsIn{
          position: relative;
          .titSeletBox2{
            width: 4.8rem;
              .vh(48);
              position: relative;
              left: 1.42rem;
              .vhPT(16);
              float: left;
          }
          .fontb{
            position: absolute;
            left: 0.16rem;
            top:0.26rem;
            span{
              font-size: 0.15rem;
              color:#fff;
              margin-right: 0.20rem;
              cursor: pointer;
              &.active{
                color: @color-blue;
                cursor: auto;
              }
              &:nth-child(2){
                margin-right:0;
              }
            }
          }
          .fontb2{
            left: 0.16rem;
            span{
              margin-right: 0.16rem;
            }
          }
          .searchBoxs{
            width: 100%;
            .vh(49);
            .vhPT(17);
            float: left;
            overflow: hidden;
            .searchBoxsIn{
              .vh(32);
              border-radius: 2px;
              border: solid 1px #3a84ed;
              float: right;
              margin-right: 0.2rem;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .splitLine{
                display: block;
                width: 0.08rem;
                height: 1px;
                background-color: #d1d1d1;
                margin-left: 0.06rem;
                margin-right: 0.06rem;
              }
              .tRBrnBox{
                .el-cascader{
                  .vhLineH(32);
                  font-size: 0.12rem;
                }
                .el-cascader__label{
                  color: #fff;
                }
                .el-cascader .el-icon-arrow-down.is-reverse{
                  transform: rotateZ(0deg);
                }
                .el-cascader-menu__item {
                  font-size: 0.12rem;
                  padding: 8px 20px;
                  position: relative;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  color: #606266;
                  height: 34px;
                  line-height: 1.5;
                  -webkit-box-sizing: border-box;
                  box-sizing: border-box;
                  cursor: pointer;
                  outline: 0;
                }
                .el-cascader .el-input__icon{
                  display:block;
                  width:0;
                  height:0;
                  border-width:4px 4px 0;
                  border-style:solid;
                  border-color:#008aff transparent transparent;/*黄 透明 透明 */
                  position:absolute;
                  top:50%-4px;
                  left:-0.05rem;
                  &::before{
                    content: "";
                    /*pointer-events: none;
                    display:block;
                    width:0;
                    height:0;
                    border-width:4px 4px 0;
                    border-style:solid;
                    border-color:#008aff transparent transparent;!*黄 透明 透明 *!*/

                  }
                }

                &:nth-of-type(3){
                  margin-left: 0;
                }
                .el-select::after{
                  content: "";
                  pointer-events: none;
                  display:block;
                  width:0;
                  height:0;
                  border-width:4px 4px 0;
                  border-style:solid;
                  border-color:#008aff transparent transparent;/*黄 透明 透明 */
                  position:absolute;
                  top:50%-4px;
                  right:0;
                }
                margin-left: 0.17rem;
                width: 0.88rem;
                .el-input{
                  background-color: transparent!important;
                }
                .el-input--suffix .el-input__inner{
                  .vh(24);
                  padding: 0;
                  border: 0!important;
                  border-bottom: solid 1px #1989fa!important;
                  background-color: transparent!important;
                }
              }

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
                width:1.15rem;
                .vh(32);
              }
              .chooseBox200{
                float: left;
                width:1.15rem;
                .vh(32);
              }
            }
          }
          .echBoxs{
            float: left;
            width: 100%;
            .vh(354);
            .tits{
              width: 100%;
              .vh(32);
              .vhPT(20);
              .tit{
                font-size: 0.12rem;
                width: 100%;
               .vh(12);
               border-left: 2px solid @color-blue;
               .vhLH(12);
               text-indent: 0.17rem;
               color:@color-blue;
              }
            }
            .echVal0{
              .vh(58);
              display: flex;
              overflow: hidden;
              li{
                flex:1;
                margin-left: 0.2rem;
                border-bottom: solid 1px rgba(58, 137, 249, 0.3);
                .vhPT(16);
                .vhLH(42);
                img{
                  width:0.11rem;
                  .vh(15);
                  .vhMT(12);
                  float: right;
                  margin-right: 0.05rem;
                }
                span.child1{
                  font-size: 0.14rem;
                  color:@color-blue;
                  padding-left: 0.11rem;
                }
                 span.child2{
                   .vhLH(42);
                  display: inline-block;
                  float: right;
                  font-size: 0.14rem;
                  padding-right: 0.09rem;
                  &.colorR{
                    color:#ff4f80;
                  }
                  &.colorO{
                    color:#d0a972;
                  }
                }

              }
            }
            .echBoxIn{
              p{
                display: block;
                .vh(24);
                .vhLH(36);
                text-indent: 0.20rem;
                color: @color-blue;
                font-size: 0.12rem;
              }
            }
          }
        }


      }
      .hisBox2{
        float: left;
        width: 4.83rem;
        .vh(235);
         margin-left: 0.2rem;
         .vhMB(20);
      }
      .hisBox3{
        float: left;
        width: 4.83rem;
        .vh(235);
         margin-left: 0.2rem;
      }
      .hisBox4{
        .vh(490);
         .vhMB(0);
         .boxsIn4{
           .vh(450);
           //.vhPT(80);
         }
      }
    }
}

</style>
