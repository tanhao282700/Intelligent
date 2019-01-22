<!--
    变配电系统 报警管理
    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="carOriginPosition">
    <div class="head">
      <div class="left">
        <div class="tRBrnBoxWrap">
          <div class="tRBrnBox">
            <el-cascader
              :change-on-select='true'
              :options="floorOptions"
              v-model="floorSelectedOptions"
              @change="floorChange">
            </el-cascader>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="tRBrnBoxWrap">
          <div class="tRBrnBox">
            <el-select @change="startYearSelChange" v-model="startYear" placeholder="开始年">
              <el-option
                v-for="item in startYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select @change="startMonthSelChange" v-model="startMonth" placeholder="开始月">
              <el-option
                v-for="item in startMonthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select v-model="startDay" placeholder="开始日">
              <el-option
                v-for="item in startDayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="line"></div>
        <div class="tRBrnBoxWrap">
          <div class="tRBrnBox">
            <el-select @change="endYearSelChange" v-model="endYear" placeholder="结束年">
              <el-option
                v-for="item in endYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select @change="endMonthSelChange" v-model="endMonth" placeholder="结束月">
              <el-option
                v-for="item in endMonthOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="tRBrnBox">
            <el-select v-model="endDay" placeholder="结束日">
              <el-option
                v-for="item in endDayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="searchBtn">
          <el-button @click="search()" type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="body">
      <park-echarts-bar ref="parkEchartsBar" :echartBarData="barData" @itemClick="itemClick"/>
    </div>
    <div class="originInfoBox" v-if="showOriginInfo">
      <div class="closeBox" @click="hide">
        <i></i>
      </div>
      <div class="tit">{{province}}车源地信息</div>
      <div class="con">
        <park-echarts-bar2 ref="parkEchartsBar2" :echartBarData="barData2"/>
      </div>
    </div>
  </div>
</template>

<script>

  import utils from "../../../../assets/js/utils.js";
  import ParkEchartsBar from "./parkEchartsBar";
  import ParkEchartsBar2 from "./parkEchartsBar2";
  export default {
    components: {
      ParkEchartsBar2,
      ParkEchartsBar
    },
    name: "carOriginPosition",
    data() {
      return {
        searchDetail:'',
        province:'',
        startYear:'',
        endYear:'',
        startMonth:'',
        startMonthOptions:[],
        endMonth:'',
        endMonthOptions:[],
        startDay:'',
        startDayOptions:[],
        endDay:'',
        endDayOptions:[],
        showOriginInfo:false,
        floor_id:0,
        floorSelectedOptions:[0],
        floorOptions: [
          // {
          //   label:'全部',
          //   value:0
          // },
          // {
          //   label:'1号楼',
          //   value:111,
          //   children:[
          //     {
          //       label:'1号停车场',
          //       value:222
          //     },
          //   ]
          // }
        ],
        loading:false,//加载动画开关
        barData:{
          id:'parkEchartBar',
          style:{width:'13.06rem',height:521*100/728+'vh'},
          data:[],
          xData:[]
        },
        barData2:{
          id:'parkEchartBar2',
          style:{width:'13.06rem',height:536*100/728+'vh'},
          data:[],
          xData:[]
        },
      }
    },
    computed:{
      startYearOptions(){
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let arr = [];
        for (let i=0;i<5;i++){
          let obj = {};
          obj.label = ((nowYear-i)+'年');
          obj.value = ((nowYear-i)+'');
          arr.push(obj);
        }
        arr.unshift({
          label:'开始年',
          value:''
        })
        return arr;
      },
      endYearOptions(){
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let arr = [];
        for (let i=0;i<5;i++){
          let obj = {};
          obj.label = ((nowYear-i)+'年');
          obj.value = ((nowYear-i)+'');
          arr.push(obj);
        }
        arr.unshift({
          label:'结束年',
          value:''
        })
        return arr;
      },

    },
    watch:{
      floorSelectedOptions(newVal){
        if (newVal.length ===0){
          this.floor_id = 0
        } else {
          this.floor_id = newVal[newVal.length-1];
        }
      }
    },
    methods: {
      requestData(){
        if (this.searchDetail == '' && this.province == '') {
          this.barData.xData = [];
          this.barData.data = [];
        }else {
          this.barData2.xData = [];
          this.barData2.data = [];
        }

        let tempStart = [this.startYear,this.startMonth,this.startDay];
        let tempEnd = [this.endYear,this.endMonth,this.endDay];
        for (let i=0;i<3;i++){
          if (tempStart[i].length !== tempEnd[i].length) {
            this.$message('时间格式不一致！')
            return;
          }
        }
        let tempTimeStart = Number(this.startYear+this.startMonth+this.startDay);
        let tempTimeEnd = Number(this.endYear+this.endMonth+this.endDay);
        if (tempTimeStart > tempTimeEnd){
          this.$message('结束时间应大于开始时间！');
          return;
        }

        let that = this;
        let config = {
          sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
          floor_id:this.floor_id,
          query_start_time:(this.startYear+this.startMonth+this.startDay),
          query_end_time:(this.endYear+this.endMonth+this.endDay),
          car_source_detail:this.searchDetail,
          province:this.province,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.loading = true;
        this.$http.post('pc/2.0/parking/car_source', config, headers).then(res => {
          let data = res.data;
          console.log('车源地', config, res);
          if(data.code==0){
            let data2 = data.data;
            //楼层数据
            let area_level = data2.area_level;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;
            this.floorOptions.unshift({
              label:'全部区域',
              value:0,
            });
            let res_data = data2.res_data;
            if (this.searchDetail == '' && this.province == '') {
              res_data.map((item,i)=>{
                this.barData.xData.push(item.title);
                this.barData.data.push(item.value);
              })
              this.$refs.parkEchartsBar.drawLine();
              this.loading = false;
            }else {
              res_data.map((item,i)=>{
                this.barData2.xData.push(item.title);
                this.barData2.data.push(item.value);
              })
              this.$refs.parkEchartsBar2.drawLine();
              this.loading = false;
            }

          }else{
            if (this.searchDetail == '' && this.province == '') {
              this.$refs.parkEchartsBar.drawLine();
            }else {
              this.$refs.parkEchartsBar2.drawLine();
            }
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })
      },
      startYearSelChange(val){
        this.startMonth = '';
        this.startMonthOptions = [];
        this.startDay = '';
        this.startDayOptions = [];
        if (val != '') {
          let tempArr = [
            {
              label: '开始月',
              value: ''
            }
          ];
          for (let i = 1; i < 13; i++) {
            let obj = {};
            obj.value = (i < 10 ? ('0' + i) : ('' + i));
            obj.label = (i < 10 ? ('0' + i + '月') : ('' + i + '月'));
            tempArr.push(obj)
          }
          this.startMonthOptions = tempArr;
        }
      },
      endYearSelChange(val){
        this.endMonth = '';
        this.endMonthOptions = [];
        this.endDay = '';
        this.endDayOptions = [];
        if (val != ''){
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
          this.endMonthOptions = tempArr;
        }
      },
      startMonthSelChange(val){
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
            if (Number(this.startYear) % 4 == 0) {
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
          this.startDay = '';
          this.startDayOptions = [];
        }
      },
      endMonthSelChange(val){
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
            if (Number(this.endYear) % 4 == 0) {
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
          this.endDay = '';
          this.endDayOptions = [];
        }
      },
      itemClick(params){
        console.log('ddd',params.name)
        this.searchDetail = true;
        this.province = params.name;
        this.requestData();
        this.showOriginInfo = true;
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
      },
      //查询按钮事件
      search(){
        this.requestData();
      },
      hide(){
        this.searchDetail = '';
        this.province = '';
        this.showOriginInfo = false;
      }

    },
    created() {
      this.requestData();
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .carOriginPosition{
    width: 13.06rem;
    .vh(578);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(73, 143, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #498fe2;
    border-radius: 4px;
    position: relative;
    .head{
      width: 100%;
      .vh(56);
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      background-color: rgba(0,0,0,0.5);
      justify-content: space-between;
      .left{

      }
      .right{
        display: flex;
        align-items: center;
        .line{
          margin:0 0.05rem;
          width: 0.08rem;
          height: 1px;
          background-color: #fff;
        }
        .tRBrnBoxWrap{
          padding-right: 0.16rem;
        }
        .tRBrnBox {
          width: 0.48rem;
          height: 100%;
          margin-left: 0.16rem;
          .el-select{
            height: 100%;
          }
          .el-cascader{
            height: 100%;
            .vhLineH(32);
            font-size: 0.12rem;
          }
          .el-cascader__label{
            color: #fff;
            padding: 0;
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
          .el-input__prefix{
            display: none;
          }
          .el-date-editor.el-input, .el-date-editor.el-input__inner{
            &::after {
              content: "";
              pointer-events: none;
              display: block;
              width: 0;
              height: 0;
              border-width: 4px 4px 0;
              border-style: solid;
              border-color: #008aff transparent transparent; /*黄 透明 透明 */
              position: absolute;
              top: 50%-4px;
              right: 0;
            }
          }
          .el-select::after {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            right: 0;
          }
          .el-input {
            height: 100%;
            background-color: transparent !important;
            display: flex;
            align-items: center;
          }
          .el-input--suffix .el-input__inner {
            .vh(24);
            padding: 0;
            border: 0 !important;
            border-bottom: solid 1px #1989fa !important;
            background-color: transparent !important;
          }
        }
      }
      .tRBrnBoxWrap{
        border-radius: 2px;
        min-width: 1.10rem;
        .vh(32);
        border: 1px solid #3a84ee;
        display: flex;
        justify-content: center;
      }
      .tRBrnBox {
        width: 0.88rem;
        height: 100%;
        .el-select{
          height: 100%;
        }
        .el-cascader{
          height: 100%;
          .vhLineH(32);
          font-size: 0.12rem;
        }
        .el-cascader__label{
          color: #fff;
          padding: 0;
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
        .el-input__prefix{
          display: none;
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          &::after {
            content: "";
            pointer-events: none;
            display: block;
            width: 0;
            height: 0;
            border-width: 4px 4px 0;
            border-style: solid;
            border-color: #008aff transparent transparent; /*黄 透明 透明 */
            position: absolute;
            top: 50%-4px;
            right: 0;
          }
        }
        .el-select::after {
          content: "";
          pointer-events: none;
          display: block;
          width: 0;
          height: 0;
          border-width: 4px 4px 0;
          border-style: solid;
          border-color: #008aff transparent transparent; /*黄 透明 透明 */
          position: absolute;
          top: 50%-4px;
          right: 0;
        }
        .el-input {
          height: 100%;
          background-color: transparent !important;
          display: flex;
          align-items: center;
        }
        .el-input--suffix .el-input__inner {
          .vh(24);
          padding: 0;
          border: 0 !important;
          border-bottom: solid 1px #1989fa !important;
          background-color: transparent !important;
        }
      }
      .searchBtn{
        margin-left: 0.12rem;
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
      .self-button{
        margin-left: 0.09rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 0.88rem;
        .vh(32);
        background-color: #3a84ed;
        color: #fff;
        border: 0;
        outline: none;
        border-radius: 2px;
        padding: 0;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        .icon-export{
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: url("../../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
          background-size: 100% 100%;
          margin-right: 0.08rem;
        }
      }
    }
    .body{
      width: 100%;
    }
    .originInfoBox{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #010f21;
      border-radius: 4px;
      .closeBox{
        width: 0.18rem;
        height:0.18rem;
        border-radius: 50%;
        position: absolute;
        right:0;
        top: 0;
        background-color: #00275b;
        cursor: pointer;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          display: inline-block;
          width: 0.1rem;
          height:0.02rem;
          background: #3b89f9;
          line-height: 0;
          font-size:0;
          vertical-align: middle;
          transform: rotate(45deg);
          &:after{
            content:'/';
            display:block;
            width: 0.1rem;
            height:0.02rem;
            background: #3b89f9;
            transform: rotate(-90deg);
          }
        }
      }
      .tit{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        width: 100%;
        .vh(50);
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        padding-left: 0.2rem;
      }
      .con{
        display: flex;
        flex: 1;
        flex-direction: column;
      }
    }
  }


</style>
