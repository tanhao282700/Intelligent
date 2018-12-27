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
        <div class="dateRangeBox">
          <el-date-picker
            v-model="value7"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            align="right"
            :clearable="false"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </div>
        <div class="inputBox">
          <el-input v-model="input" placeholder="请输入回路进行搜索"></el-input>
        </div>
        <div class="searchBtn">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
    name: "lowPressure",
    data() {
      return {
        loading:false,
        nowActive:'day',
        quickLists:[
          {id:'day',tit:'今日'},
          {id:'mon',tit:'本月'},
        ],
        value7: '',

        headTitleLists:[
          {
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
          }
        ],

        num:1,
        table:{
          hei:433, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            {num:'01',time:'2018/06/02  16:55',loop:'wpm-301',current:'A:2 B:3 C:4',voltage:'A:32 B:33 C:34',supply:'有：110.1 无：10',factor:'0.09',volTemp:'33',envirTemp:'34',envirHumidity:'35',envirDB:'36'},
          ],
          th:[
            {prop:'num',label:'编号',wid:58},
            {prop:'time',label:'时间',wid:156},
            {prop:'loop',label:'回路',wid:96},
            {prop:'current',label:'电流（A）',wid:154,idLists:[1,2,3,4]},
            {prop:'voltage',label:'电压（V）',wid:154},
            {prop:'supply',label:'供电量',wid:129},
            {prop:'factor',label:'功率因数(cosΦ)',wid:133},
            {prop:'volTemp',label:'变压器温度',wid:120},
            {prop:'envirTemp',label:'环境温度',wid:89},
            {prop:'envirHumidity',label:'环境湿度',wid:89},
            {prop:'envirDB',label:'环境分贝'},
          ]
        },

        input:''
      }
    },
    methods: {
      //获取表头数据
      getHeadData(){
        let objP = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'self_id':'1207'
        };
        utils.post('power/history/table/header',objP).then(res=>{
          console.log('数据报表表头',objP,res)
          if(res.code==0){

            this.headTitleLists = res.data;

            this.loading = false;
          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取数据报表
      getReportData(selfID='1207',date_s='2018-09-01 00:00:00',date_e='2018-09-30 00:00:00',search_cont='',num=1){
        let objP = {
          'sys_menu_id':this.$store.state.sysList[3].sys_menu_id,
          'self_id':selfID,
          'floor_id':'3',
          'pagesize':'20',
          'pagenumber':num,
          'date_s':date_s,
          'date_e':date_e,
          'search_cont':search_cont
        };
        utils.post('power/history/table',objP).then(res=>{
          console.log('低压侧数据报表',objP,res)
          if(res.code==0){

            let realHeadArr = [];
            res.data[0].points_list.map((item,i)=>{

              this.headTitleLists.some((item2,i2)=>{
                let obj = {};
                if (item2.category_id == item.category_id) {
                  obj.prop = 'aa'+item2.category_id;
                  obj.label = item2.title;
                  obj.id = item2.category_id;//临时建个id
                  realHeadArr.push(obj);
                  return true;
                }
              })
              if (i == 0) {
                let obj3 = {};
                obj3.prop = 'date';
                obj3.label = '时间';
                realHeadArr.unshift(obj3);

                let obj2 = {};
                obj2.prop = 'number';
                obj2.label = '编号';
                realHeadArr.unshift(obj2);



              }

            })
            //这里需要归一下类吧
            let flag1 = false;
            let flag2 = false;
            let flag3 = false;
            let flag4 = false;

            let realHeadArr2 = realHeadArr;
            realHeadArr2.map((item, i) => {
              //console.log('标记3',item)
              if (item.label.indexOf('电流') > 0) {//ABC三相电流标题归类

                let objA = {};

                if (!flag1) {//标题去重
                  objA.prop = 'current';
                  objA.label = '电流（A）';

                  realHeadArr2.push(objA);
                  flag1=true;
                }
              } else if (item.label.indexOf('电压') > 0) {
                let objB = {};

                if (!flag2) {//标题去重

                  objB.prop = 'voltage';
                  objB.label = '电压（V）';

                  realHeadArr2.push(objB);
                  flag2=true;
                }
              } else if (item.label.indexOf('变压器温度') > 0) {
                let objC = {};

                if (!flag3) {//标题去重

                  objC.prop = 'volTemp';
                  objC.label = '变压器温度';

                  realHeadArr2.push(objC);
                  flag3=true;
                }
              } else if((item.label.indexOf('功功率') > 0)) {
                let objD = {};

                if (!flag4) {//标题去重

                  objD.prop = 'supply';
                  objD.label = '供电量';

                  realHeadArr2.push(objD);
                  flag4=true;
                }
              }
            })

            //数组中去掉已经被归类的元素
            let newArr = realHeadArr2.filter((item,index,arr) => {
              return (item.label.indexOf('项电压')<0 && item.label.indexOf('项电流')<0 && item.label.indexOf('功功率')<0 && item.label.indexOf('变压器温度')<0)
            })


            this.table.th = newArr;

            //console.log('标记2',realHeadArr)

            res.data.map((item3,i3)=>{
              item3.number = ((i3+1)+(this.num-1)*20);//1页有20条数据
              item3.points_list.map((item4,i4)=>{

                item3['aa'+item4.category_id] = item4.now_value;
                console.log(item3,item4)
              })
            })

            this.table.data = res.data;
            this.table.len = res.paging.count;

            console.log(realHeadArr)


          }else{
            this.$message(res.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      changeQuick(id){
        this.nowActive = id;
        console.log(this.value7)
        //this.getData(id);
      },
      //分页：切换页面
      changePage(val){
        this.num = val;
        this.getReportData('1207','2018-09-01 00:00:00','2018-09-30 00:00:00','',val);
        console.log(val)
      },
    },
    created() {

      this.getHeadData();

      this.getReportData();
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';

  .lowPressure{
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
