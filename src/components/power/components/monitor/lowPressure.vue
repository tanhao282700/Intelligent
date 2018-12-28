<!--
    变配电系统 低压侧
    made by 胡永福
    start in 2018-9-5
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="lowPressure">
    <div class="head">
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
      <div class="searchBox">
        <div class="dateRangeBox2">
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:SS"
            format="yyyy-MM-dd HH:mm"
            align="right"
            :clearable="false"
            start-placeholder="请选择开始时间"
            end-placeholder="请选择结束时间"
            :default-time="['00:00:00', '00:00:00']">
          </el-date-picker>
        </div>
        <div class="tRBrnBox">
          <el-select @change="selChange" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="inputBox">
          <el-input v-model="search_cont" placeholder="请输入回路进行搜索"></el-input>
        </div>
        <div class="searchBtn">
          <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="body">
      <Table @changePage="changePage" :table = "table"/>
    </div>
  </div>
</template>

<script>



  import Table from "../../../../components/common/table2";
  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {
      Table
    },
    name: "lowPressure",
    data() {
      return {
        options:[],
        value:'',
        loading:false,
        nowActive:'',
        date_s:utils.time(new Date()/1000-1*60*60,4),//开始时间
        date_e:utils.time(new Date()/1000,4),//结束时间
        search_cont:'',//搜索内容
        quickLists:[
          {id:'day',tit:'今日'},
          {id:'mon',tit:'本月'},
        ],
        value7: null,

        headTitleLists:[
          /*{
            "category_id": 51,
            "title": "A项电流_低"
          },
          {
            "category_id": 52,
            "title": "B项电流_低"
          },
          {
            "category_id": 53,
            "title": "C项电流_低"
          },
          {
            "category_id": 54,
            "title": "A项电压_低"
          },
          {
            "category_id": 55,
            "title": "B项电压_低"
          },
          {
            "category_id": 56,
            "title": "C项电压_低"
          },
          {
            "category_id": 57,
            "title": "有功功率_低"
          },
          {
            "category_id": 58,
            "title": "无功功率_低"
          },
          {
            "category_id": 59,
            "title": "功率因数_低"
          }*/
        ],

        num:1,
        table:{
          showPagination:true,
          hei:458, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            /*{num:'01',time:'2018/06/02  16:55',loop:'wpm-301',current:'A:2 B:3 C:4',voltage:'A:32 B:33 C:34',supply:'有：110.1 无：10',factor:'0.09',volTemp:'33',envirTemp:'34',envirHumidity:'35',envirDB:'36'},*/
          ],
          th:[
            /*{prop:'num',label:'编号',wid:58},
            {prop:'time',label:'时间',wid:156},
            {prop:'loop',label:'回路',wid:96},
            {prop:'current',label:'电流（A）',wid:154,idLists:[1,2,3,4]},
            {prop:'voltage',label:'电压（V）',wid:154},
            {prop:'supply',label:'供电量',wid:129},
            {prop:'factor',label:'功率因数(cosΦ)',wid:133},
            {prop:'volTemp',label:'变压器温度',wid:120},
            {prop:'envirTemp',label:'环境温度',wid:89},
            {prop:'envirHumidity',label:'环境湿度',wid:89},
            {prop:'envirDB',label:'环境分贝'},*/
          ]
        },
      }
    },
    methods: {
      selChange(val){
        this.options.some((item,i)=>{
          if (item.value === val) {
            this.getHeadData(item.self_id);
            return true;
          }
        })
      },
      //天数的加减
      addDate(date, hours) {
        let d = new Date(date);
        d.setDate(d.getDate() + days);
        let month = d.getMonth() + 1;
        let day = d.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let val = d.getFullYear() + "-" + month + "-" + day;
        return val;
      },

      getFloor() {
        this.options = [];
        let that = this;
        let config = {
          'sys_menu_id': this.$store.state.sysList[3].sys_menu_id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取变配电机房', config, res);
          if (data.code == 0) {
            let datas = data.data;
            let tempArr = [];
            datas.map((item, i) => {
              let obj = {};
              obj.self_id = item.self_id;
              obj.label = (item.self_id==1206?(item.title):item.self_id==1207?(item.title):'点位变化');
              obj.value = item.id;
              tempArr.push(obj);
            })
            this.options = tempArr;
            if (datas.length !== 0) {
              this.getHeadData(this.options[0].self_id);
              this.value = this.options[0].value;
            }

          } else {
            this.$message(data.message);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取表头数据
      getHeadData(self_id){
        let that = this;
        let config = {
          'self_id':self_id
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/history/title', config, headers).then(res => {
          let data = res.data;
          console.log('数据报表表头', config, res);
          if(data.code==0){

            this.headTitleLists = data.data;
            this.getReportData(this.date_s,this.date_e,this.search_cont,1);//默认获取当前时间前一个小时的数据

          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      //获取数据报表
      getReportData(date_s=utils.time(new Date()/1000-1*60*60,4),date_e=utils.time(new Date()/1000,4),search_cont='',num=1){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'floor_id':this.value,
          'pagesize':'20',
          'pagenumber':num,
          'date_s':date_s,
          'date_e':date_e,
          'search_cont':search_cont
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('power_pc/pc/history/data', config, headers).then(res => {
          let data = res.data;
          console.log('高低压侧数据报表', config, res);
          if(data.code==0){

            let realHeadArr = [];
            if (data.data.length!==0) {
              data.data[0].points_list.map((item, i) => {

                this.headTitleLists.some((item2, i2) => {
                  let obj = {};
                  if (item2.category_id == item.category_id) {
                    obj.prop = 'aa' + item2.category_id;
                    if (item2.title.indexOf('_低') > 0) {//干掉多余的后缀。。
                      if (item2.title.substring(item2.title.length - 2) == '_低') {
                        obj.label = item2.title.substring(0, item2.title.length - 2);
                      } else {//能力有限。。
                        obj.label = item2.title;
                      }
                    } else {
                      obj.label = item2.title;
                    }
                    realHeadArr.push(obj);
                    return true;
                  }
                })
                if (i == 0) {
                  let obj3 = {};
                  obj3.prop = 'date';
                  obj3.label = '时间';
                  obj3.wid = 156;
                  realHeadArr.unshift(obj3);

                  let obj2 = {};
                  obj2.prop = 'number';
                  obj2.label = '编号';
                  obj2.wid = 70;
                  realHeadArr.unshift(obj2);


                }

              })
            }



            this.table.th = realHeadArr;


            data.data.map((item3,i3)=>{
              item3.number = ((i3+1)+(this.table.page-1)*20);//1页有8条数据,编号
              item3.points_list.map((item4,i4)=>{

                item3['aa'+item4.category_id] = item4.now_value;
                //console.log(item3,item4)
              })
            })

            this.table.data = data.data;
            this.table.len = data.paging;
            this.loading = false;

            //console.log(realHeadArr)


          }else{
            this.loading = false;
            this.$message(data.message);
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })
      },
      changeQuick(id){
        if (this.value7 != null) {
          this.value7 = null;
        }
        this.nowActive = id;
        if (id == 'day') {
          this.date_s = (utils.time(new Date() / 1000, 1) + ' 00:00:00');
          this.date_e = utils.time(new Date() / 1000, 4);
          this.table.page = 1;
          this.getReportData((utils.time(new Date() / 1000, 1) + ' 00:00:00'), utils.time(new Date() / 1000, 4), this.search_cont, 1);//获取今日到当前时间的数据
        } else if (id == 'mon'){

          this.date_s = (utils.time(new Date() / 1000, 9) + '-01 00:00:00');
          this.date_e = utils.time(new Date() / 1000,4);
          this.table.page = 1;
          this.getReportData((utils.time(new Date() / 1000, 9) + '-01 00:00:00'), utils.time(new Date() / 1000, 4), this.search_cont, 1);//获取本月到当前时间的数据
        }
      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getReportData(this.date_s,this.date_e,this.search_cont,val);
        //console.log(val)
      },
      //查询按钮事件
      searchData(){
        //console.log(this.value7);
        if (this.value7 != null) {
          this.date_s = this.value7[0];
          this.date_e = this.value7[1];
        }else {
          this.date_s = utils.time(new Date()/1000-1*60*60,4);
          this.date_e = utils.time(new Date()/1000,4);
        }
        this.table.page = 1;
        this.getReportData(this.date_s, this.date_e, this.search_cont, 1);//获取特定时间的数据
      }
    },
    created() {
      this.getFloor();
    },
    mounted() {

    },
    watch:{
      value7:function (newVal,oldVal) {
        if (newVal != null){
          this.nowActive = '';
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .lowPressure{
    .el-range-editor .el-range-input{
      position: relative;
      width: 1.6rem;
      height: auto;
      background-color: transparent!important;
      .vhLineH(22);
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
    }
    .el-date-editor .el-range__icon{
      display: none;
    }

    padding: 0 0.2rem;
    margin-top: 2px;
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
    .head{
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .vh(50);
      .quickChoose{
        .vhMB(5);
        display: flex;
        align-items: center;
        span{
          color:#fff;
          margin-right: 0.12rem;
        }
        .quickChooseBtn{
          cursor: pointer;
          &.nowActive{
            color:@color-blue;
          }
        }
      }
      .searchBox{
        display: flex;
        justify-content: flex-end;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        width: 7.40rem;
        .vh(32);
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        .dateRangeBox2{
          position: relative;
          width: 3.8rem;
          .el-range-editor.el-input__inner{
            border: 0!important;
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
            left:1.6rem;
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
            right:0.35rem;
          }
        }
        .tRBrnBox{
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
          //margin-left: 0.2rem;
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

        .inputBox{
          margin-left: 0.2rem;
          width: 1.54rem;
          .vh(24);
          .el-input{
            width: 100% !important;
            height: 100%;
          }
          .el-input__inner{
            background-color: transparent!important;
            height: 100%!important;
            font-family: PingFangSC-Regular;
            font-size: 0.12rem!important;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1!important;
            letter-spacing: 0px;
            color: #fff;
            border: 0!important;
            border-bottom: solid 1px #1989fa!important;
            padding: 0;
          }
        }

        .searchBtn{
          margin-left: 0.16rem;
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


    }
    .body{
      .vhMT(15);
    }
  }


</style>
