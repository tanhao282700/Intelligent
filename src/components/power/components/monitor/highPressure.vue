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
    class="highPressure">
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
        <div class="dateRangeBox">
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:SS"
            format="yyyy-MM-dd HH:mm"
            align="right"
            :clearable="false"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '00:00:00']">
          </el-date-picker>
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



  import Table from "../../../../components/common/table";
  import utils from "../../../../assets/js/utils.js";
  export default {
    components: {
      Table
    },
    name: "highPressure",
    data() {
      return {
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
          hei:433, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:8, //每页的条数 。默认为20
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
      //获取表头数据
      getHeadData(){
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'self_id':'1206'
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('power_distribution/power_distribution_header', config, headers).then(res => {
          let data = res.data;
          console.log('数据报表表头', config, res);
          if(data.code==0){

            this.headTitleLists = data.data;
            this.getReportData('1206',this.date_s,this.date_e,this.search_cont,1);//默认获取当前时间前一个小时的数据

          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      //获取数据报表
      getReportData(selfID='1206',date_s=utils.time(new Date()/1000-1*60*60,4),date_e=utils.time(new Date()/1000,4),search_cont='',num=1){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'self_id':selfID,
          'floor_id':'3',
          'pagesize':'8',
          'pagenumber':num,
          'date_s':date_s,
          'date_e':date_e,
          'search_cont':search_cont
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('power_distribution/power_distribution_history_read', config, headers).then(res => {
          let data = res.data;
          console.log('高压侧数据报表', config, res);
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
              item3.number = ((i3+1)+(this.table.page-1)*8);//1页有8条数据,编号
              item3.points_list.map((item4,i4)=>{

                item3['aa'+item4.category_id] = item4.now_value;
                //console.log(item3,item4)
              })
            })

            this.table.data = data.data;
            this.table.len = data.paging.count;
            this.loading = false;

            //console.log(realHeadArr)


          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
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
          this.getReportData('1206', (utils.time(new Date() / 1000, 1) + ' 00:00:00'), utils.time(new Date() / 1000, 4), this.search_cont, 1);//获取今日到当前时间的数据
        } else if (id == 'mon'){

          this.date_s = (utils.time(new Date() / 1000, 9) + '-01 00:00:00');
          this.date_e = utils.time(new Date() / 1000,4);
          this.table.page = 1;
          this.getReportData('1206', (utils.time(new Date() / 1000, 9) + '-01 00:00:00'), utils.time(new Date() / 1000, 4), this.search_cont, 1);//获取本月到当前时间的数据
        }
      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getReportData('1206',this.date_s,this.date_e,this.search_cont,val);
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
        this.getReportData('1206', this.date_s, this.date_e, this.search_cont, 1);//获取特定时间的数据
      }
    },
    created() {

      this.getHeadData();

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

  .highPressure{
    .el-range-editor .el-range-input{
      width: 1.6rem;
      height: auto;
      background-color: transparent;
      line-height: 0.2rem;
      //border-bottom: 2px solid #1989fa;

      font-family: PingFangSC-Regular;
      font-size: 0.12rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
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


    width: 100%;
    .vh(534);
    .head{
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .vh(50);
      .quickChoose{
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
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        width: 6.20rem;
        .vh(32);
        border: 1px solid #1989fa;
        display: flex;
        align-items: center;
        .dateRangeBox{
          width: 3.8rem;
          .el-range-editor.el-input__inner{
            border: 0!important;
          }
        }

        .inputBox{
          width: 1.54rem;
          .vh(18);
          .el-input__inner{
            height: auto!important;
            font-family: PingFangSC-Regular;
            font-size: 0.12rem!important;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1!important;
            letter-spacing: 0px;
            color: #fff;
            border: 0!important;
          }
        }

        .searchBtn{
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
  }


</style>
