
<!--
    能源系统 租户账单
    made by 白富友
    start in 2018-8-7
-->
<template>
  <div class="Bill2"
       v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <div class="bill1Head">
      <div class="quickChoose">
        <span>快速选择</span>
        <span
          class="quickChooseBtn"
          v-for="(v,i) in quickLists"
          v-text = "v.tit"
          @click = "changeQuick(v.id)"
          :class="{'nowActive':nowActive==v.id}"
        >
          </span>
      </div>
      <div class="quikTitCen">
        <div class = "chooseBox2000">
          <SelectBox
            class="chooseBoxs"
            :options='typeOptions'
            :value = 'energy_type'
            placeholder = '选择类型'
            @change = "change0"
          />
        </div>
        <div class="chooseBox1000">
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
          <div class="chooseBox100">
            <div class="tRBrnBox">
              <el-cascader
                :change-on-select='true'
                :options="floorOptions"
                v-model="floorSelectedOptions"
                @change="floorChange">
              </el-cascader>
            </div>
          </div>
          <!--<input type="text" class="chooseInput" v-model="name" placeholder="请输入租户名进行搜索">-->
          <el-button class="billBtn2" icon="el-icon-search" type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <button @click="exportReport()" type="button" class="self-button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
    <div class="bill1Body">
      <Table :table = "table" @changePage = "changePage"/>
    </div>
  </div>
</template>

<script>
  import utils from '../../../../assets/js/utils';
  import SelectBox from './selectBox';
  import Table from '../../../../components/common/table2';
  import btns from './btns';

  export default {
    components:{
      'SelectBox':SelectBox,
      'Table':Table,
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
    data () {
      return {
        startMonthVal:'',
        startDayVal:'',
        endMonthVal:'',
        endDayVal:'',
        floorSelectedOptions:[],
        floorOptions: [],
        nowYear:(new Date().getFullYear()),
        startDayOptions:[],//开始日
        endDayOptions:[],//结束日
        time_start:'',
        time_end:'',
        loading:false,
        table:{
          showPagination:true,
          hei:428, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[],
          th:[
            {prop:'number',label:'编号',wid:93},
            {prop:'time',label:'时间',wid:140},
            {prop:'type',label:'类型',wid:82},
            {prop:'powers',label:'耗能量',wid:96},
            {prop:'utils',label:'单位',wid:88},
            /*{prop:'name',label:'租户名',wid:109},*/
            {prop:'floor',label:'区域',wid:380},
            {prop:'useBig',label:'用能峰值(h)',wid:127},
            {prop:'useSmall',label:'用能谷值(h)',wid:128},
            {prop:'prize',label:'费用(元)'},
          ]
        },
        areaId:0,   //区域ID
        quickLists:[
          {id:'mon',tit:'月账单'},
        ],
        nowActive:'',
        energy_type:'0',
        typeOptions:[
          {
            value: '1',
            label: '水'
          }, {
            value: '0',
            label: '电'
          }, {
            value: '2',
            label: '气'
          },
        ],
        //name:'',
      }
    },
    methods:{
      //导出数据报表
      exportReport(){
        window.location.href = 'https://tesing.china-tillage.com/pc/2.0/energy/operation/bill/export?sys_menu_id=' + this.$store.state.sysList[18].sys_menu_id + '&user_id=' + this.$store.state.userId + '&project_id=' + this.$store.state.projectId + '&page_type=1' + '&floor_id=' + this.areaId + '&time_start=' + this.time_start + '&time_end=' + this.time_end + '&energy_type=' + this.energy_type + '&pagesize=20' + '&page_number=' + this.table.page;
      },
      search(){
        this.table.page = 1;
        this.requestData();
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
      requestData(){
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
        let data = {
          sys_menu_id:this.$store.state.sysList[18].sys_menu_id,
          floor_id:this.areaId,
          energy_type:this.energy_type,
          time_start:this.time_start,
          time_end:this.time_end,
          pagesize:20,
          page_number:this.table.page,
        };
        this.loading = true;
        let that = this;
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/energy/operation/bill/use', data, headers).then(res => {
          let data0 = res.data;
          console.log('获取租户账单', data, res);
          if(data0.code==0){
            let data2 = data0.data;
//楼层数据
            let area_level = data2.area_level;
            if (area_level.length !== 0) {
              let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g, 'label').replace(/parent_id/g, 'parent').replace(/id/g, 'value').replace(/child/g, 'children').replace(/\"children\"\:\[\]\,/g, ''));
              this.floorOptions = dealedFloor;
            }
            this.floorOptions.unshift({
              label:'全部区域',
              value:0,
            });

            let result_data = data2.result_data;
            /*result_data = [
              {
                "Peak_value": "0.0",
                "Valleys_value": "0.0",
                "cost": "0.0",
                "floor": [
                  {
                    "floor_id": "207",
                    "name": "排水测试1栋"
                  },
                  {
                    "floor_id": "214",
                    "name": "排水测试1栋-1楼"
                  },
                  {
                    "floor_id": "219",
                    "name": "排水测试1栋-1楼设备房1"
                  }
                ],
                "name": "物业",
                "time": "2018-12-12 08:00:00",
                "type": "0",
                "unit": "kw/h",
                "value": "0.0"
              }
            ]*/
            let tempArr = [];
            result_data.map((item,i)=>{
              let obj = {};
              let num = (i+1)+(this.table.page-1)*20;
              obj.number = num<10?('0'+num):(''+num);
              obj.time = item.time;
              obj.type = (item.type == '0'?'电':item.type == '1'?'水':item.type == '2'?'气':'未知');
              obj.powers = item.value;
              obj.utils = item.unit;
              obj.floor = (item.floor.length ===0?'全部':(item.floor.map((item0,i0)=>{return item0.name})).join(' '));
              obj.useBig = item.Peak_value;
              obj.useSmall = item.Valleys_value;
              obj.prize = item.cost;
              tempArr.push(obj);
            });
            this.table.data = tempArr;
            this.table.len = data2.record_count;
            this.loading = false;
          }else{
            this.loading = false;
            this.$message(data0.message);
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })
      },
      changePage(val){
        this.table.page = val;
        this.requestData();
      },
      change0(val){
        this.energy_type = val;
      },
      timeDeal(time){
        let res = '';
        let attrs = time.split('-');
        res =attrs[0]+'年'+ attrs[1]+'月'+attrs[2]+'日';
        return res;
      },
      changeQuick(id){
        this.endDayOptions = [];
        this.startDayOptions = [];
        this.startDayVal = '';
        this.endDayVal = '';
        this.startMonthVal = '';
        this.endMonthVal = '';

        this.nowActive = id;
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let nowMon = (nowDate.getMonth()+1)<10?('0'+(nowDate.getMonth()+1)):(''+(nowDate.getMonth()+1));
        let nowDay = (nowDate.getDate()<10?('0'+nowDate.getDate()):(''+nowDate.getDate()));

        if (id == 'day'){
          this.time_start = (nowYear+nowMon+nowDay);
          this.time_end = (nowYear+nowMon+nowDay);
        } else if (id == 'mon'){
          this.time_start = (nowYear+nowMon);
          this.time_end = (nowYear+nowMon);
        }
        this.table.page = 1;
        this.requestData();
      },

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
  @import '../../../../assets/css/comon.less';
  .Bill2{
    display: flex;
    flex-direction: column;
    flex: 1;
    .bill1Head{
      .vh(57);
      width: 100%;
      position: relative;
      display: flex;
      .vhPT(18);
      .quickChoose{
        width: 4.6rem;
        .vh(32);
        display: flex;
        align-items: center;
        span{
          color:#fff;
          margin-right: 0.12rem;
          &:nth-child(1){
            margin-left: 0.2rem;
          }
        }
        .quickChooseBtn{
          cursor: pointer;
          &.nowActive{
            color:@color-blue;
          }
        }
      }
      .quikTitCen{
        display: flex;
        width: 7.22rem;
        .chooseBox2000{
          width: 1rem;
          .vh(32);
          border-radius: 2px;
          border: solid 1px #3a84ed;
          display:inline-block;
          overflow:hidden;
          // padding-left: 0.1rem;
          text-align: center;
          .chooseBoxs{
            height: 100%;
            width: 100%;
            .el-input--suffix{
              height: 100%;
              .el-input__inner{
                height: 100%;
              }
            }
          }
        }
        .chooseBox1000{
          width: 7.82rem;
          .vh(32);
          display:flex;
          border-radius: 2px;
          border: solid 1px #3a84ed;
          margin-left: 0.17rem;
          align-items: center;

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
            margin-left: 0.1rem;
            padding-top: 0;
            width: 0.87rem;
            .vh(30);
            .vhLH(30);
            float: right;
            border-radius: 0;
          }
          .chooseBox100{
            /*float: left;
            width:0.85*3rem;*/
            .vh(32);
          }
          .chooseBox200{
            width:2.96rem;
            .vh(32);
          }
          .chooseInput{
            width:1.6rem;
            .vh(32);
            background: none;
            margin-left: 0.05rem;
            border:0;
            text-decoration: underline;
            color:#fff;
          }
        }
      }
      .self-button{
        margin-left: 0.16rem;
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
    .bill1Body{
      .vh(428);
      width: 100%;
      padding-left: 0.16rem;
    }
  }
</style>
