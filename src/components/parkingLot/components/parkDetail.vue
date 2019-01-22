<!--
    停车场系统 环境情况
    made by 胡永福
    start in 2019-1-7
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 停车场管理系统 > <span>停车场详情</span></div>
    </div>
    <div
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      element-loading-spinner="el-icon-loading"
      element-loading-text="拼命加载中"
      class="parkDetail">
      <div class="selectBox">
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
        <div class="rightBox">
          <span class="tit">车辆检索：</span>
          <div class="inputBox">
            <el-input v-model="carNumber" placeholder="请输入车牌号码"></el-input>
          </div>
          <div class="sltbtn">
            <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <div class="parkState">
            <div class="tit">
              <div class="titL">
                车位状态 | 道闸设备状态
              </div>
              <div class="titR">
                <div class="item">
                  <span class="icon-circle"></span>
                  <span class="itemTit">剩余车位</span>
                </div>
                <div class="item">
                  <span class="icon-circle" style="background-color: #fac477"></span>
                  <span class="itemTit">已使用车位</span>
                </div>
              </div>
            </div>
            <div class="con">
              <div class="conL">
                <park-echart-circle :echartCirData="parkStateData" ref="parkEchartCircle" />
              </div>
              <div class="lineBox">
                <div class="line1"></div>
                <div class="line2"></div>
              </div>
              <div class="conR">
                <div class="conRItem" v-for="(v,i) in carDoorDevice" :key="'conRItem'+i">
                  <div class="conRItemTit" v-text="v.device"></div>
                  <div class="conRItemConWrap">
                    <div class="conRItemCon" v-for="(v2,i2) in v.point_ls" :key="'conRItemCon'+i2">
                      <span class="conRItemConTit" v-text="v2.title"></span>
                      <span class="conRItemConNowState">
                        <span>当前状态：</span>
                        <span v-text="v2.state==0?'关闭':v2.state==1?'开启':v2.state==2?'故障':''" :style="{color:v2.state=='1'?'#36fceb':v2.state=='2'?'#fe6a7d':'#f4f4f4'}"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="parkOriginRank">
            <div class="tit">
              本月车源地排名
            </div>
            <div class="con">
              <div class="rankItem" v-for="(v,i) in this_month_car_source_rank" :key="'rankItem'+i">
                <div class="unit">
                  <span>辆</span>
                </div>
                <div>
                  <span :class="['icon-parkRank',('rankImg'+(i+1))]"><span v-text="(i+1)"></span></span>
                </div>
                <div class="rankVal" v-text="v.num"></div>
                <div class="rankPosition" v-text="v.city"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="income">
            <div class="tit">
              收入情况
            </div>
            <div class="con">
              <div class="nowIncomeBoxWrap">
                <div class="nowIncomeBox">
                  <div class="leftTopBox">
                    <span class="triangle"></span>
                    <span class="date">年</span>
                  </div>
                  <div class="nowIncomeTit">今年收入</div>
                  <div class="nowIncomeCon">
                    <span class="unit">￥</span>
                    <span class="nowIncomeVal" v-text="this_year_income_data"></span>
                  </div>
                </div>
                <div class="nowIncomeBox">
                  <div class="leftTopBox">
                    <span class="triangle" style="border-color:transparent #00e366 transparent transparent;"></span>
                    <span class="date">日</span>
                  </div>
                  <div class="nowIncomeTit">今日收入</div>
                  <div class="nowIncomeCon">
                    <span class="unit">￥</span>
                    <span class="nowIncomeVal" v-text="today_income_data"></span>
                  </div>
                </div>
              </div>
              <div
                v-loading="loading2"
                element-loading-background="rgba(0, 0, 0, 0.5)"
                element-loading-spinner="el-icon-loading"
                element-loading-text="拼命加载中"
                class="dayIncomeBox">
                <div class="head">
                  <div class="monthIncomeBox">
                    <span class="triangle1"></span>
                    <div class="monthIncome">
                      <span class="nowMonth" v-text="this_month"></span>
                      <span class="monthLabel">月总收入</span>
                      <span class="line"></span>
                      <span class="unit">￥</span>
                      <span class="monthIncomeVal" v-text="this_month_income_total"></span>
                    </div>
                    <span class="triangle2"></span>
                    <span class="triangle3"></span>
                  </div>
                  <div class="dateSelBox">
                    <div class="tRBrnBoxWrap">
                      <div class="tRBrnBox">
                        <el-select @change="yearChange" v-model="yearVal" placeholder="选择年">
                          <el-option
                            v-for="item in yearOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="tRBrnBox">
                        <el-select @change="monthChange" v-model="monthVal" placeholder="选择月">
                          <el-option
                            v-for="item in monthOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="body">
                  <ul>
                    <li v-for="(v,i) in incomeData" :key="'income'+i" :class="{today:(yearVal+monthVal+v.day)==today}">
                      <div class="dateVal" v-text="(yearVal+monthVal+v.day)==today?'今天':v.day" :style="{color:((yearVal+monthVal+v.day)==today?'#3f85e8':'rgba(255, 255, 255, 0.9)')}"></div>
                      <div class="moneyVal" v-text="isNaN(v.value)?v.value:('￥'+v.value)"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog wid = "3.64rem" hei = "216" ref = "dialog">
        <div class="dialog-in">
          <div class="carPosition">该车辆位于{{carPosition}}</div>
          <div class="btn" @click="hideDialog">已知晓</div>
        </div>
      </Dialog>
    </div>
  </div>
</template>


<script>
  import ParkEchartCircle from "./parkEchartCircle";
  export default {
    components: {
      ParkEchartCircle
    },
    name: "parkDetail",
    data() {
      return {
        loading:false,
        loading2:false,
        this_month_car_source_rank: [
          /*{
            "city": "四川绵阳",
            "num": 2
          },
          {
            "city": "四川成都",
            "num": 1
          },
          {
            "city": "没有更多车源地",
            "num": 0
          }*/
        ],
        this_year_income_data:0,
        today_income_data:0,
        this_month:'00',
        this_month_income_total:0,
        today:(''+new Date().getFullYear()+((new Date().getMonth()+1)<10?('0'+(new Date().getMonth()+1)):(''+(new Date().getMonth()+1)))+(new Date().getDate()<10?('0'+new Date().getDate()):(''+new Date().getDate()))),
        incomeData:[
          /*{
            day:'01',
            value:100
          },
          {
            day:'02',
            value:100
          },
          {
            day:'03',
            value:100
          },
          {
            day:'04',
            value:100
          },
          {
            day:'05',
            value:100
          },
          {
            day:'06',
            value:100
          },
          {
            day:'07',
            value:100
          },
          {
            day:'08',
            value:100
          },
          {
            day:'09',
            value:100
          },
          {
            day:'10',
            value:100
          },
          {
            day:'11',
            value:100
          },
          {
            day:'12',
            value:100
          },
          {
            day:'13',
            value:100
          },
          {
            day:'14',
            value:100
          },
          {
            day:'15',
            value:100
          },
          {
            day:'16',
            value:100
          },
          {
            day:'17',
            value:100
          },
          {
            day:'18',
            value:100
          },
          {
            day:'19',
            value:100
          },
          {
            day:'20',
            value:100
          },
          {
            day:'21',
            value:100
          },
          {
            day:'22',
            value:100
          },
          {
            day:'23',
            value:100
          },
          {
            day:'24',
            value:100
          },
          {
            day:'25',
            value:100
          },
          {
            day:'26',
            value:100
          },
          {
            day:'27',
            value:100
          },
          {
            day:'28',
            value:100
          },
          {
            day:'29',
            value:100
          },{
            day:'30',
            value:100
          },*/

        ],
        yearVal:(new Date().getFullYear()+''),
        monthVal:((new Date().getMonth()+1)<10?('0'+(new Date().getMonth()+1)):(''+(new Date().getMonth()+1))),
        monthOptions:[],
        /*monthOptions:[
          {
            label:'01月',
            value:'01'
          },
          {
            label:'02月',
            value:'02'
          },
          {
            label:'03月',
            value:'03'
          },
          {
            label:'04月',
            value:'04'
          },
          {
            label:'05月',
            value:'05'
          },
          {
            label:'06月',
            value:'06'
          },
          {
            label:'07月',
            value:'07'
          },
          {
            label:'08月',
            value:'08'
          },
          {
            label:'09月',
            value:'09'
          },
          {
            label:'10月',
            value:'10'
          },
          {
            label:'11月',
            value:'11'
          },
          {
            label:'12月',
            value:'12'
          },
        ],*/
        carPosition:'',
        parkStateData:{
          id:'parkEchart1',
          style:{width:'3.2rem',height:212*100/728+'vh'},
          color:[
            '#fac477','rgba(0,0,0,0)','#3f87ed'
          ],
          data0:[
            {value:0, name:'总数'},
          ],
          data:[
            {value:0, name:'已使用车位'},
            {value:0, name:'剩余车位'},
          ],
        },
        carDoorDevice:[
        ],
        carNumber:'',
        floor_id:0,
        floorSelectedOptions:[],
        floorOptions: [
          /*{
            label:'全部',
            value:0
          },
          {
            label:'1号楼',
            value:111,
            children:[
              {
                label:'1号停车场',
                value:222
              },
            ]
          }*/
        ],
      }
    },
    computed:{
      yearOptions(){
        let nowDate = new Date();
        let nowYear = nowDate.getFullYear();
        let arr = [];
        for (let i=0;i<5;i++){
          let obj = {};
          obj.label = ((nowYear-i)+'年');
          obj.value = ((nowYear-i)+'');
          arr.push(obj);
        }
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
      getMonthOptions(){
        let nowDate = new Date();
        let nowYear = (nowDate.getFullYear()+'');
        if (nowYear == this.yearVal){
          let nowMonth = (nowDate.getMonth()+1);
          if (Number(this.monthVal) > nowMonth){
            this.monthVal = (nowMonth<10?('0'+nowMonth):(''+nowMonth));
          }
          let arr = [];
          for (let i=0;i<nowMonth;i++){
            let obj = {};
            obj.label = (((i+1)<10?('0'+(i+1)):(''+(i+1)))+'月');
            obj.value = ((i+1)<10?('0'+(i+1)):(''+(i+1)));
            arr.push(obj);
          }
          return arr;
        } else {
          let arr2 = [];
          for (let i=0;i<12;i++){
            let obj = {};
            obj.label = (((i+1)<10?('0'+(i+1)):(''+(i+1)))+'月');
            obj.value = ((i+1)<10?('0'+(i+1)):(''+(i+1)));
            arr2.push(obj);
          }
          return arr2;
        }
      },
      firstRequest(){
        this.loading = true;
        let that = this;
        let config = {
          sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
          floor_id:this.floor_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/parking/parking_detail', config, headers).then(res => {
          let data = res.data;
          console.log('停车场详情1', config, res);
          if(data.code==0){
            let data2 = data.data;
            //楼层数据
            let area_level = data2.area_level;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;

            this.floorSelectedOptions.push(data2.show_floor);

            //车位状态、道闸设备状态
            let carport_and_barrier_status = data2.carport_and_barrier_status;
            //道闸详情
            this.carDoorDevice = carport_and_barrier_status.barrier_info;
            //车位信息
            let parking_info = carport_and_barrier_status.parking_info;
            this.parkStateData.data0[0].value = parking_info.carport_usable_num;
            this.parkStateData.data[1].value = parking_info.carport_usable_num;
            this.parkStateData.data[0].value = parking_info.carport_using_num;
            this.$refs.parkEchartCircle.drawLine();

            //收入情况
            let income_status = data2.income_status;
            this.this_year_income_data = income_status.this_year_income_data;
            this.today_income_data = income_status.today_income_data;
            this.incomeData = income_status.this_month_detail_data;
            this.this_month = income_status.this_month;
            this.this_month_income_total = income_status.this_month_income_total;

            //车源地排名前三
            this.this_month_car_source_rank = data2.this_month_car_source_rank;
            this.loading = false;

          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })
      },
      //不选日期和车牌号
      requestData1(floor_id){
        this.loading = true;
        let that = this;
        let config = {
          sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
          floor_id:floor_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/parking/parking_detail', config, headers).then(res => {
          let data = res.data;
          console.log('停车场详情1', config, res);
          if(data.code==0){
            let data2 = data.data;
            //楼层数据
            let area_level = data2.area_level;
            let dealedFloor = JSON.parse(JSON.stringify(area_level).replace(/title/g,'label').replace(/parent_id/g,'parent').replace(/id/g,'value').replace(/child/g,'children').replace(/\"children\"\:\[\]\,/g,''));
            this.floorOptions = dealedFloor;


            //车位状态、道闸设备状态
            let carport_and_barrier_status = data2.carport_and_barrier_status;
            //道闸详情
            this.carDoorDevice = carport_and_barrier_status.barrier_info;
            //车位信息
            let parking_info = carport_and_barrier_status.parking_info;
            this.parkStateData.data0[0].value = parking_info.carport_usable_num;
            this.parkStateData.data[1].value = parking_info.carport_usable_num;
            this.parkStateData.data[0].value = parking_info.carport_using_num;
            this.$refs.parkEchartCircle.drawLine();

            //收入情况
            let income_status = data2.income_status;
            this.this_year_income_data = income_status.this_year_income_data;
            this.today_income_data = income_status.today_income_data;
            this.incomeData = income_status.this_month_detail_data;
            this.this_month = income_status.this_month;
            this.this_month_income_total = income_status.this_month_income_total;

            //车源地排名前三
            this.this_month_car_source_rank = data2.this_month_car_source_rank;
            this.loading = false;

          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })
      },
      //查询车辆位置
      requestData2(){
        if (this.carNumber == ''){
          this.$message('请先输入要查询的车牌号码！');
          return
        }
        let that = this;
        let config = {
          sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
          floor_id:this.floor_id,
          query_car_id:this.carNumber,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/parking/parking_detail', config, headers).then(res => {
          let data = res.data;
          console.log('停车场详情视频', config, res);
          if(data.code==0){
            let data2 = data.data;
            if (data2.hasOwnProperty('car_position')) {
              this.carPosition = data2.car_position;
            } else {
              this.$message(data.message);
            }
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //传日期单查收入
      requestData3(){
        this.loading2 = true;
        let that = this;
        let config = {
          sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
          floor_id:this.floor_id,
          query_date:(this.yearVal+this.monthVal),
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('pc/2.0/parking/parking_detail', config, headers).then(res => {
          let data = res.data;
          console.log('停车场详情3收入情况', config, res);
          if(data.code==0){
            let data2 = data.data;
            //收入情况
            let income_status = data2.income_status;
            this.incomeData = income_status.this_month_detail_data;
            this.this_month = income_status.this_month;
            this.this_month_income_total = income_status.this_month_income_total;
            this.loading2 = false;
          }else{
            this.loading2 = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading2 = false;
          console.log(err);
        })
      },
      yearChange(val){
        console.log('年份',val)
        this.monthOptions = this.getMonthOptions();

        this.requestData3();
      },
      monthChange(val){
        console.log('月份',val)
        this.requestData3();
      },
      searchData(){
        this.requestData2();
      },
      floorChange(val){
        console.log(val,this.floorSelectedOptions)
        this.requestData1(val[val.length-1]);
      },
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      hideDialog(){
        this.$refs.dialog.hide();
      }
    },
    created() {
      this.monthOptions = this.getMonthOptions();
      this.firstRequest();
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">

  @import '../../../assets/css/comon';
  @import '../../../assets/css/common.css';
  .parkDetail{
    width: 100%;
    padding: 0 0.3rem;
    .selectBox{
      border-radius: 4px;
      padding: 0 0.2rem;
      margin: 0 auto;
        width: 13.06rem;
        .vh(60);
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.22),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tRBrnBoxWrap{
        width: 1.10rem;
        .vh(32);
        border: 1px solid #3a84ee;
        display: flex;
        justify-content: center;
      }
      .tRBrnBox {
        width: 0.88rem;
        height: 100%;
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

        &:nth-of-type(2){
          margin-left: 0;
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
      .rightBox{
        display: flex;
        height: 100%;
        align-items: center;
        .tit{
          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #ffffff;
        }
        .inputBox{
          width: 1.75rem;
          .vh(32);
          border: 1px solid #3a84ee;
          .el-input{
            width: 100%!important;
            height: 100%;
            .el-input__inner{
              width: 100%;
              height: 100%;
            }
          }
        }
        .sltbtn{
          width: 0.93rem;
          margin-left: -2px;
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
    }
    .content{
      .vhMT(18);
      width: 100%;
      .vh(530);
      display: flex;
      .left{
        display: flex;
        flex: 1;
        flex-direction: column;
        .parkState {
          display: flex;
          flex-direction: column;
          flex: 1;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          .tit{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            width: 100%;
            .vh(40);
            padding: 0 0.16rem;
            background-color: rgba(0,0,0,0.4);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .titL{
              font-family: PingFangSC-Medium;
              font-size: 0.16rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #008aff;
            }
            .titR{
              display: flex;
              .item{
                display: flex;
                margin-left: 0.2rem;
                .icon-circle{
                  display: block;
                  width: 0.1rem;
                  height: 0.1rem;
                  border-radius: 50%;
                  background-color: #498fe1;
                }
                .itemTit{
                  margin-left: 0.06rem;
                  font-family: PingFangSC-Regular;
                  font-size: 0.12rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                }
              }
            }
          }
          .con{
            display: flex;
            flex: 1;
            align-items: center;
            .conL{
              display: flex;
              flex: 1;
            }
            .lineBox{
              .line1{
                width: 1px;
                .vh(84);
                .gradientT(rgba(67,131,207,1),rgba(67,131,207,0));
              }
              .line2{
                width: 1px;
                .vh(84);
                .gradientT(rgba(67,131,207,0),rgba(67,131,207,1));
              }
            }
            .conR{
              .vhPT(12);
              .vhPB(12);
              height: 100%;
              display: flex;
              flex: 1;
              flex-direction: column;
              align-items: center;
              overflow: auto;
              .conRItem{
                .vhMT(30);
                width: 2.10rem;
                &:first-of-type{
                  margin-top: 0;
                }
                .conRItemTit{
                  font-family: PingFangSC-Medium;
                  font-size: 0.14rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #008aff;
                }
                .conRItemCon{
                  font-family: PingFangSC-Regular;
                  font-size: 0.14rem;
                  line-height: 1;
                  font-weight: normal;
                  letter-spacing: 0px;
                  color: #f4f4f4;

                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  .vhMT(20);
                  &:first-of-type{
                    .vhMT(8);
                  }
                }
              }
            }
          }
        }
        .parkOriginRank {
          .vhMT(20);
          display: flex;
          flex: 1;
          flex-direction: column;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          .tit{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            width: 100%;
            .vh(40);
            font-family: PingFangSC-Medium;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #008aff;
            padding-left: 0.16rem;
            display: flex;
            align-items: center;
            background-color: rgba(0,0,0,0.4);
          }
          .con{
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
            .rankItem{
              width: 1.87rem;
              .vh(172);
              box-shadow: 0px 0px 2px 0px
              rgba(73, 143, 226, 0.22);
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              .unit{
                position: absolute;
                left: 0.12rem;
                .vhTop(12);
                display: flex;
                justify-content: center;
                align-items: center;
                width: 0.16rem;
                height: 0.16rem;
                border-radius: 50%;
                border: 1px solid #008aff;

                font-family: PingFangSC-Light;
                font-size: 0.1rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #008aff;
              }
              .icon-parkRank{
                .vhMT(16);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 0.54rem;
                height: 0.6rem;
                span{
                  .vhMB(7);
                  font-family: PingFangSC-Regular;
                  font-size: 0.18rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #ffffff;
                }


              }
              .rankImg1{
                background: url("/static/parkImg/rank01.png") no-repeat center;
                background-size: 100% 100%;
              }
              .rankImg2{
                background: url("/static/parkImg/rank02.png") no-repeat center;
                background-size: 100% 100%;
              }
              .rankImg3{
                background: url("/static/parkImg/rank03.png") no-repeat center;
                background-size: 100% 100%;
              }
              .rankVal{
                font-family: PingFangSC-Regular;
                font-size: 0.4rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #ffffff;
                text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
              }
              .rankPosition{
                .vhMT(16);
                font-family: PingFangSC-Regular;
                font-size: 0.12rem;
                font-weight: normal;
                font-stretch: normal;
                line-height: 1;
                letter-spacing: 0px;
                color: #008aff;
              }
            }
          }

        }
      }
      .right{
        margin-left: 0.2rem;
        display: flex;
        flex: 1;
        .income{
          width: 100%;
          height: 100%;
          box-shadow: 0px 4px 10px 0px
          rgba(73, 143, 226, 0.22),
          inset 1px 1px 2px 0px
          rgba(248, 253, 255, 0.15),
          inset 0px -1px 1px 0px
          #498fe2;
          border-radius: 4px;
          .tit{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            width: 100%;
            .vh(40);
            font-family: PingFangSC-Medium;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0px;
            color: #008aff;
            padding-left: 0.16rem;
            display: flex;
            align-items: center;
            background-color: rgba(0,0,0,0.4);
          }
          .con{
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 0 0.2rem;
            .vhPT(20);
            .vhPB(20);
            .nowIncomeBoxWrap {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .nowIncomeBox {
                position: relative;
                width: 2.91rem;
                .vh(136);
                border: 1px solid rgba(73, 143, 226, 0.22);
                box-shadow: 0px 0px 2px 0px rgba(73, 143, 226, 0.22);
                border-radius: 4px;
                overflow: hidden;
                .leftTopBox {
                  position: absolute;
                  left: 0;
                  top: 0;
                  .triangle {
                    display: block;
                    width: 0;
                    height: 0;
                    border-width: 0.27rem 0.27rem 0.27rem 0;
                    border-style: solid;
                    border-color: transparent #f52323 transparent transparent;
                    position: absolute;
                    .vhTop(-20);
                    left: -0.06rem;
                    transform: rotate(45deg);
                  }
                  .date {
                    position: absolute;
                    left: 0.04rem;
                    .vhTop(4);
                    font-family: PingFangSC-Regular;
                    font-size: 0.14rem;
                    line-height: 1;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: rgba(255, 255, 255, 0.9);
                  }
                }
                .nowIncomeTit {
                  .vhMT(25);
                  text-align: center;
                  font-family: PingFangSC-Medium;
                  font-size: 0.14rem;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 1;
                  letter-spacing: 0px;
                  color: #008aff;
                }
                .nowIncomeCon {
                  .vhMT(16);
                  text-align: center;
                  .unit {
                    font-family: PingFangSC-Regular;
                    font-size: 0.2rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 2;
                    letter-spacing: 0px;
                    color: #ffffff;
                    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  .nowIncomeVal {
                    ont-family: PingFangSC-Regular;
                    font-size: 0.4rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 1;
                    letter-spacing: 0px;
                    color: #ffffff;
                    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                  }
                }
              }
            }
            .dayIncomeBox{
              .vhMT(20);
              width: 6.03rem;
              .vh(294);
              box-shadow: 0px 0px 2px 0px
              rgba(73, 143, 226, 0.22);
              border-radius: 4px;
              .head{
                .vhMT(16);
                display: flex;
                justify-content: flex-end;
                position: relative;
                .monthIncomeBox{
                  display: flex;
                  align-items: center;
                  position: absolute;
                  top: 0;
                  left: -0.04rem;
                  min-width: 1.90rem;
                  .vh(33);
                  background-color: rgba(0,138,255,0.3);
                  .monthIncome{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-right: 0.07rem;
                    .nowMonth{
                      margin-left: 0.14rem;
                      font-family: PingFangSC-Regular;
                      font-size: 0.28rem;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 1;
                      letter-spacing: 0px;
                      color: #ffffff;
                    }
                    .monthLabel{
                      margin-left: 0.06rem;
                      display: inline-block;
                      width: 0.26rem;
                      font-family: PingFangSC-Regular;
                      font-size: 0.1rem;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 1.2;
                      letter-spacing: 0px;
                      color: #ffffff;
                    }
                    .line{
                      display: block;
                      width: 1px;
                      .vh(21);
                      background-color: #fff;
                    }
                    .unit{
                      display: flex;
                      .vh(30);
                      align-items: flex-end;
                      margin-left: 0.07rem;
                      font-family: PingFangSC-Regular;
                      font-size: 0.14rem;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 1;
                      letter-spacing: 0px;
                      color: #ffffff;
                      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    }
                    .monthIncomeVal{
                      //margin-left: 0.07rem;
                      font-family: PingFangSC-Regular;
                      font-size: 0.3rem;
                      font-weight: normal;
                      font-stretch: normal;
                      .vhLineH(30);
                      letter-spacing: 0px;
                      color: #ffffff;
                      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
                    }
                  }
                  .triangle1{
                    display:block;
                    width:0;
                    height:0;
                    border-width:0.04rem 0 0.04rem 0.04rem;
                    border-style:solid;
                    border-color:transparent transparent transparent rgba(0,138,255,0.3);/*透明 透明 透明 黄*/
                    position:absolute;
                    top:-0.05rem;
                    left:0.02rem;
                    transform: rotate(45deg);
                  }
                  .triangle2{
                    display:block;
                    width:0;
                    height:0;
                    border-width:0.11rem 0.11rem 0.11rem 0;
                    border-style:solid;
                    border-color:transparent rgba(0,138,255,0.3) transparent transparent;/*透明 黄 透明 透明 */
                    position:absolute;
                    top:-0.07rem;
                    right:-0.1rem;
                    transform: rotate(45deg);
                  }
                  .triangle3{
                    display:block;
                    width:0;
                    height:0;
                    border-width:0.11rem 0.11rem 0.11rem 0;
                    border-style:solid;
                    border-color:transparent rgba(0,138,255,0.3) transparent transparent;/*透明 黄 透明 透明 */
                    position:absolute;
                    bottom:-0.07rem;
                    right:-0.1rem;
                    transform: rotate(-45deg);
                  }
                }
                .dateSelBox{
                  .tRBrnBoxWrap{
                    padding: 0 0.14rem;
                    min-width: 1.10rem;
                    .vh(32);
                    border: 1px solid #3a84ee;
                    display: flex;
                    justify-content: center;
                  }
                  .tRBrnBox {
                    width: 0.48rem;
                    height: 100%;
                    margin-left: 0.16rem;
                    &:first-of-type{
                      margin-left: 0;
                    }
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
              }
              .body{
                display: flex;
                flex: 1;
                flex-direction: column;
                ul{
                  width: 100%;
                  height: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  padding: 0 0.075rem;
                  li{
                    margin: 0 0.025rem;
                    .vhMT(19);
                    display: flex;
                    flex-direction: column;
                    width: 0.48rem;
                    .vh(52);
                    justify-content: center;
                    align-items: center;
                    &.today{
                      border: 1px solid #3f85e8;
                      color: #3f85e8!important;
                      border-radius: 4px;
                    }
                    .dateVal{
                      text-align: center;
                      font-family: PingFangSC-Regular;
                      font-size: 0.14rem;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 1;
                      letter-spacing: 0px;
                      color: rgba(255, 255, 255, 0.9);
                    }
                    .moneyVal{
                      .vhMT(7);
                      text-align: center;
                      font-family: PingFangSC-Medium;
                      font-size: 0.12rem;
                      font-weight: normal;
                      font-stretch: normal;
                      line-height: 1;
                      letter-spacing: 0px;
                      color: #3f85e8;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .dialog-in{
      width: 100%;
      height: calc(100% - 0.49rem);
      .carPosition{
        width: 100%;
        .vh(172);
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: PingFangSC-Regular;
        font-size: 0.18rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b5d7ff;
      }
      .btn{
        cursor: pointer;
        width: 100%;
        .vh(44);
        background-color: #498fe2;
        box-shadow: 0px 4px 10px 0px
        rgba(73, 143, 226, 0.4),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #498fe2;
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: PingFangSC-Semibold;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }

</style>
