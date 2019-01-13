<!--
    能源系统 用能情况
    made by 白富友
    start in 2018-8-2
-->
<template>
  <div class="powerMsg boxs"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中">
      <div class="powerMsgTit">
        <div class="titHeadBox">
            <SelectHead
              :lists = "titHeads"
              @changeHead = "changeHead"
            />
        </div>
      </div>
      <div class='powerMsgBody'>
        <div class="powerMsgBodyL">
          <div class = "ranking" v-for = "(v,i) in powerRanks" :class = "{'ranking0':i==0}">
            <div class = "rankingTit" >
              <span v-text = "v.tit1" class = "rankingTit1" ></span>
              <span v-text = "v.tit2" class = "rankingTit2" ></span>
            </div>
            <ul class = "rankingLists boxs">
                <li v-for = "(v0,i0) in v.lists">
                    <div class = "rListBox" :class ="{'rListBox0':i0==(v.lists.length-1)}">
                      <span class = "rListS1" v-text = "'0'+(i0+1)" :class = "showColor(i0)"></span>
                      <span class = "rListS2" v-text = "v0.tit"></span>
                      <span class = "rListS3" v-text = "v0.val" :class = "showColor(i0)"></span>
                      <span class = "rListS4" v-text = "v.util"></span>
                    </div>
                </li>
            </ul>
          </div>
        </div>
        <div class="powerMsgBodyR">
          <div class="searchBox">
            <!--<div class="dateRangeBox2">
              <el-date-picker
                v-model="endDayVal"
                type="daterange"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                align="right"
                :clearable="false"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                >
              </el-date-picker>
            </div>-->
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
              <el-select v-model="startDayVal" placeholder="开始日">
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
              <el-select v-model="endDayVal" placeholder="结束日">
                <el-option
                  v-for="item in endDayOptions"
                  :key="''+item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="tRBrnBox">
              <el-cascader
                :change-on-select='true'
                :options="floorOptions"
                v-model="floorSelectedOptions"
                @change="floorChange">
              </el-cascader>
            </div>


            <!--<div class="tRBrnBox">
              <el-select @change="selChange" v-model="value" placeholder="选择楼层">
                <el-option
                  v-for="item in options"
                  :key="''+item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="selChange2" v-model="value2" placeholder="选择区域">
                <el-option
                  v-for="item in options2"
                  :key="''+item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="tRBrnBox">
              <el-select @change="selChange3" v-model="value3" placeholder="选择房间">
                <el-option
                  v-for="item in options3"
                  :key="''+item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>-->
            <div class="searchBtn">
              <el-button @click="searchs" type="primary" icon="el-icon-search">查询</el-button>
            </div>
          </div>
          <div  class="powerBodyEarch boxs">
            <LineEcharts :datas ='lineEcharts2'  ref = "lineEcharts2"/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import utils from "../../../../assets/js/utils.js";
import SelectBox from '../../../../components/common/selectBox';
import SelectHead from '../../../../components/common/selectHead';
import LineEcharts from '../../../../components/common/lineEcharts2';
export default {
  components:{
    'SelectBox':SelectBox,
    'SelectHead':SelectHead,
    'LineEcharts':LineEcharts
  },
  data () {
    return {
      floorSelectedOptions:[],
      floorOptions: [],
      nowYear:(new Date().getFullYear()),
      startDayOptions:[],//开始日
      endDayOptions:[],//结束日
      time_start:'',
      time_end:'',
      area_level:[],//楼层数据
      value:'',
      options:[],
      value2:'',
      options2:[],
      value3:'',
      options3:[],

      startMonthVal:'',
      startDayVal:'',
      endMonthVal:'',
      endDayVal:'',

      energy_type:1,//水
      loading:false,
      selectID:{
        sId:1,
      },
      areaId:0,  //区域ID
      titHeads:[
        {id:1,tit:'水',state:true},
        {id:0,tit:'电',state:false},
        {id:2,tit:'气',state:false},
      ],
      powerRanks:[
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'超出TOP3',
          util:'',
          lists:[]
        },
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'节约TOP3',
          util:'',
          lists:[]
        },
        {
          tit1:'耗能较去年同期耗能差值排名',
          tit2:'当前TOP3',
          util:'',
          lists:[]
        },
      ],
      //endDayVal: '',    //时间区间值
      lineEcharts2 :{
          id:'lineEchart00',
          type:'shui',
          unit:'m³',
          title:'能耗对比',
          // titShow:false,
          style:{width:'7.75rem',height:450*100/728+'vh'},
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
    }
  },
  watch:{
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

  },
  methods:{
    floorChange(val){
      console.log(val,this.floorSelectedOptions)
    },
    startMonthSelChange(val){
      this.startDayVal = '';
      this.startDayOptions = [];
      if (val != '') {
        let tempArr = [
          {
            label: '开始日',
            value: ''
          }
        ];
        if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
          for (let i = 1; i < 32; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
            tempArr.push(obj)
          }
          this.startDayOptions = tempArr;
        } else if (val == '02') {
          if (this.nowYear % 4 == 0) {
            for (let i = 1; i < 30; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.startDayOptions = tempArr;
          } else {
            for (let i = 1; i < 29; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.startDayOptions = tempArr;
          }
        } else {
          for (let i = 1; i < 31; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
            tempArr.push(obj)
          }
          this.startDayOptions = tempArr;
        }
      } else {
        this.startDayOptions = [];
      }
    },
    endMonthSelChange(val){
      this.endDayVal = '';
      this.endDayOptions = [];
      if (val != '') {
        let tempArr = [
          {
            label: '结束日',
            value: ''
          }
        ];
        if (val == '01' || val == '03' || val == '05' || val == '07' || val == '08' || val == '10' || val == '12') {
          for (let i = 1; i < 32; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
            tempArr.push(obj)
          }
          this.endDayOptions = tempArr;
        } else if (val == '02') {
          if (this.nowYear % 4 == 0) {
            for (let i = 1; i < 30; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.endDayOptions = tempArr;
          } else {
            for (let i = 1; i < 29; i++) {
              let obj = {};
              obj.value = (i < 10 ? ('0' + i) : ('' + i));
              obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
              tempArr.push(obj)
            }
            this.endDayOptions = tempArr;
          }
        } else {
          for (let i = 1; i < 31; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '日') : ('' + i + '日'));
            tempArr.push(obj)
          }
          this.endDayOptions = tempArr;
        }
      } else {
        this.endDayOptions = [];
      }
    },

    // selChange(val){
    //
    //   this.area_level.some((item,i)=>{
    //
    //     if (item.id == val){
    //       if (item.hasOwnProperty('child')){
    //         //this.value2 = item.parent_id;
    //         let tempArr = [
    //           /*{
    //             label:'全部区域',
    //             value:item.parent_id,
    //           }*/
    //         ];
    //         item.child.map((item2,i2)=>{
    //           let obj = {};
    //           obj.label = item2.title;
    //           obj.value = ''+item2.id;
    //           tempArr.push(obj);
    //         })
    //         this.options2 = tempArr;
    //       }
    //     }
    //   })
    //   console.log(val)
    // },
    // selChange2(val){
    //   console.log(val)
    // },
    // selChange3(val){
    //   console.log(val)
    // },
    searchs(){
      this.getData();
    },
    timeDeal(time){
      let res = '';
      let attrs = time.split('-');
      res = attrs[0]+'月'+attrs[1]+'日';
      return res;
    },
    changeHead(id){
      console.log(id);
      this.floorSelectedOptions = [];
      this.startDayOptions = [];
      this.endDayOptions = [];
      this.startDayVal = '';
      this.endDayVal = '';

      this.startMonthVal = '';
      this.endMonthVal = '';
      this.energy_type = id;
      let titHeads = this.titHeads;
      for(let i=0;i<titHeads.length;i++){
        titHeads.state = false;
        if(titHeads.id==id){
          titHeads.state = true;
        }
      }
      this.titHeads = titHeads;
      //this.floorSelectedOptions = [];
      this.areaId = 0;
      //this.endDayVal = '';
      //this.$refs.SelectBoxs.befirst();
      this.getData();
    },
    showColor(index){
      let res = '';
      switch(index){
        case 0:
          res = 'red0';
        break;
        case 1:
          res = 'orange0';
        break;
        case 2:
          res = 'yellow0';
        break;
      };
      return res;
    },
    getData(){  //格式  2018-08-11   开始时间和结束时间 不传时 为当前年数据
      this.floorOptions = [];//初始化楼层
      if ((this.startMonthVal+this.startDayVal).length !==0) {
        this.time_start = this.startMonthVal + this.startDayVal;
      } else {
        this.time_start = '';
      }
      if ((this.endMonthVal+this.endDayVal).length !==0) {
        this.time_end = this.endMonthVal+this.endDayVal;
      } else {
        this.time_end = '';
      }
      if (this.time_start =='' && this.time_end ==''){

      } else {
        if (this.time_start.length !== this.time_end.length){
          this.$message('请保持时间筛选格式一致！');
          return false;
        }
      }
      if (this.time_start !='' && this.time_end !='') {
        if (Number(this.time_end)-Number(this.time_start)<0){
          this.$message('结束时间需大于开始时间！');
          return false;
        }
      }

      let data = {
        sys_menu_id:this.$store.state.sysList[18].sys_menu_id,
        floor_id:this.areaId,
        energy_type:this.energy_type,
        time_start:this.time_start,
        time_end:this.time_end,
      };

      this.loading =true;
      let that = this;
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.post('pc/2.0/energy/index/use_status', data, headers).then(res => {
        this.loading =false;
        let data0 = res.data;
        console.log('获取能耗情况', data, res);
        if(data0.code==0){
          let data2 = data0.data;
          //楼层数据
          let area_level = data2.area_level;
          this.area_level = area_level;

          let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
          this.floorOptions = dealedFloor;
          this.floorOptions.unshift({
            label:'全部区域',
            value:0,
          });
          //console.log(JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,'')));
          /*let floorArr = [
            {
              label:'全部',
              value:0,
            }
          ];
          area_level.map((item00,i00)=>{
            let obj = {};
            obj.label = item00.title;
            obj.value = ''+item00.id;
            floorArr.push(obj);
          })
          this.options = floorArr;*/

          let utils = 'm³';
          for(let i=0;i<3;i++){
            if(this.titHeads[i].state&&this.titHeads[i].id==0){
              utils = 'kw/h';
            }
          }
          this.powerRanks[0].util = utils;
          this.powerRanks[1].util = utils;
          this.powerRanks[2].util = utils;
          this.lineEcharts2.unit = utils;
          this.powerRanks[0].lists = [];
          this.powerRanks[1].lists = [];
          this.powerRanks[2].lists = [];

          for(let i=0;i<data2.rank.exceed.length;i++){
            let obj1 = {
              tit:data2.rank.exceed[i].name,
              val:data2.rank.exceed[i].value
            };
            this.powerRanks[0].lists.push(obj1);
          }
          for (let j =0;j<data2.rank.now.length;j++){
            let obj2 = {
              tit:data2.rank.now[j].name,
              val:data2.rank.now[j].value
            };
            this.powerRanks[1].lists.push(obj2);
          }
          for (let k=0;k<data2.rank.save.length;k++){
            let obj3 = {
              tit:data2.rank.save[k].name,
              val:data2.rank.save[k].value
            };
            this.powerRanks[2].lists.push(obj3);
          }

          let compare  = data2.compare;
          let tempArr = [];
          compare.map((item0,i0)=>{
            let obj = {};
            obj.name = ''+item0.year;
            obj.data = item0.data;
            tempArr.push(obj);
          })
          this.lineEcharts2.list = tempArr
          this.$refs.lineEcharts2.drawLine();
        }else{
          this.$message(data0.message);
        }
      }).catch(err=>{
        this.loading =false;
        console.log(err);
      })

    }
  },
  created() {
    this.getData();
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
@import '../../../../assets/css/comon.less';

.powerMsg{
  .red0{
    color:@color-red;
  }
  .orange0{
    color:@color-orange;
  }
  .yellow0{
    color:@color-yellow;
  }
  .searchBox{
    .vh(32);
    // height:0.32rem;
    // margin-top:0.12rem;
    overflow:hidden;
    border-radius: 0.02rem;
    border: solid 1px #3a84ed;
    .chooseBox2000{
      display:inline-block;
      width:0.85rem;
      .vh(32);
      overflow:hidden;
      float: left;
    }

    .chooseBtn{
      overflow:hidden;
      display:inline-block;
      .vh(32);
      .vhLH(32);
      padding:0 0.2rem;
      font-size:0.12rem;
      background:@color-blue;
      font-weight:bold;
      border-radius:0;
      float: right;
      margin: 0;
    }
  }

  .el-range-editor .el-range-input{
    position: relative;
    width: 0.9rem;
    height: auto;
    background-color: transparent!important;
    .vhLineH(24);
    border-bottom: 1px solid #1989fa!important;
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: left;
  }
  .el-date-editor .el-range-separator{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
    width: 5%;
    color: #d1d1d1;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
  }
  .el-date-editor .el-range__icon{
    display: none;
  }
  width:13.06rem;
  height:79vh;
  margin-top:0.02rem;
  display:flex;
  flex-direction:column;
  .powerMsgTit{
    height:8.79vh;
    width:100%;
    .titHeadBox{
      position:relative;
      left:50%;
      // top:0.16rem;
      .vhTop(16);
      width:6rem;
      height:56.25%;
      border-radius:0.04rem;
	    // border: solid 0.01rem #1989fa;
      transform:translateX(-3rem);
      display:flex;
      li{
        flex:1;
        display:flex;
        .titBtn{
          flex:1;
          text-align:center;
          line-height:4.944vh;
          color: #a7a7a7;
          font-size:0.16rem;
          cursor:pointer;
        }
        .isActive{
          background-color: #000000;
	        opacity: 0.2;
          cursor:auto;
          color: @color-blue;
          font-weight:bold;
        }
        .liLine{
            display:block;
            width:0.01rem;
            // height:0.3rem;
            .vh(30);
            margin-top:0.02rem;
          span.lineTop{
            .gradientT(rgba(73,143,226,0.88),rgba(73,143,226,0));
            display:block;
            width:100%;
            height:50%;
          }
          span.lineBot{
            .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.88));
            display:block;
            width:100%;
            height:50%;
          }
        }

      }

    }
  }
  .powerMsgBody{
    height:70.21vh;
    width:100%;
    .powerMsgBodyL{
      height:100%;
      width:4.8rem;
      padding-left:0.2rem;
      float:left;
      .ranking{
        width:4.5rem;
        height:27.5%;
        margin-top:3.676%;
        display:flex;
        flex-direction:column;
        .rankingTit{
          height:0.24rem;
          font-size:0.12rem;
          display:flex;
          padding-right:0.1rem;
          .rankingTit1{
            color:@color-blue;
          }
          .rankingTit2{
            flex:1;
            text-align:right;
            color:#fff;
          }
        }
        .rankingLists{
          display:flex;
          flex-direction:column;
          flex:1;
          background:rgba(0, 0, 0, 0.25);
          li{
            flex:1;
            padding-left:0.2rem;
            padding-right:0.2rem;
            display:flex;
            .rListBox{
              flex:1;
              border-bottom:solid 0.01rem rgba(58, 137, 249, 0.3);
              display:flex;
              align-items:center;
              span{
                display:inline-block;
                font-family: PingFangSC-Regular;
                font-weight:normal;
              }
              .rListS1{
                width:0.44rem;
              }
              .rListS2{
                flex:1;
                color:#fff;
              }
              .rListS3{
                text-align:right;
              }
              .rListS4{
                width:0.50rem;
                text-align:right;
                color:@color-blue;
              }
            }
            .rListBox0{
              border-bottom:0;
            }
          }
        }
      }
      .ranking0{
        margin-top:5.147%;
      }
    }
    .powerMsgBodyR{
      float :left;
      height:100%;
      width:7.85rem;
      padding-left:0.1rem;
      display:flex;
      flex-direction:column;
      .searchBox{

        display: flex;
        justify-content: flex-end;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        width: 6.42rem;
        .vh(32);
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        .dateRangeBox2{
          position: relative;
          width: 2.2rem;
          .el-range-editor.el-input__inner{
            border: 0!important;
            padding: 0 0 0 0.14rem;
          }
          &::before{
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
            left:0.95rem;
          }
          &::after{
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
            right:0.01rem;
          }
        }
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

        .searchBtn{
          margin-left: 0.18rem;
          width: 0.87rem;
          .vh(32);
          .el-button--primary{
            width: 100%;
            height: 100%;
            display: inline-block;
            line-height: 1;
            padding: 0;
          }
        }
      }
      .powerSearch{
        .vh(32);
        width:100%;
        align-items:right;
        .timeBox0{
          height: 100%;
          span{
           .vhLH(31);
          }

        }
        .chooesBoxss{
          width: 2.8rem;
          height: 100%;
        }
      }
      .powerBodyEarch{
        flex:1;
        margin-top:0.14rem;
        margin-bottom:0.21rem;
      }
    }
  }
}
</style>
