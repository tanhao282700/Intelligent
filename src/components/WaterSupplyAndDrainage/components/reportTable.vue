
<!--
    给排水系统 报表
    made by 胡永福
    start in 2018-8-7
-->
<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    element-loading-spinner="el-icon-loading"
    element-loading-text="拼命加载中"
    class="wsadReport">
    <div class="head">
      <span v-text="selfID==7?'给水系统数据报表':'排水系统数据报表'" class="title"></span>

      <button @click="getExportReport()" class="export-btn" type="button">
        <span class="icon-export"></span>
        <span>导出</span>
      </button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计报表" name="first" lazy>
          <!--<table class="ownTable" style="width: 100%;height:100%;">
            <tr>
              <th v-for="(v,i) in headTitle" v-text="v.title"></th>
            </tr>
            <tr v-for="(v2,i2) in record_data">
              <td v-for="(v3,i3) in headTitle">{{v3.unit}}</td>
            </tr>
          </table>-->
          <Table @changePage="changePage" :table = "table"/>
        </el-tab-pane>
        <el-tab-pane label="故障统计报表" name="second" lazy>
          <Table @changePage="changePage2" :table = "table2"/>
        </el-tab-pane>
        <el-tab-pane label="维修记录报表" name="third" lazy>
          <Table @changePage="changePage3" :table = "table3"/>
        </el-tab-pane>
        <el-tab-pane label="启停统计报表" name="fourth" lazy>
          <Table @changePage="changePage4" :table = "table4"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import utils from '../../../assets/js/utils';
  import SelectBox from '../../../components/form/selectBox';
  import Table from '../../../components/common/table';

  import showTooltip from './showTooltip';
  import showOperateState from './showOperateState';

  export default {
    components:{
      'SelectBox':SelectBox,
      'Table':Table,
    },
    props:['selfID'],
    data () {
      let wid1=73;
      let  wid2=133;
      let  wid3=82;
      let  wid4=93;
      let  wid5=109;
      return {
        record_data:[],
        tableType:'1',
        activeName: 'first',
        headTitle:[],

        loading:false,
        table:{
          hei:566, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {time:'-'},
          ],
          th:[
            // {prop:'time',label:'-'},

          ]
        },

        table2:{
          hei:566, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {
            //   title: '-', running_date: '-', zhanwei: '', "alarm": {
            //     "alarm_details": [
            //       {
            //         "content": "-",
            //         "describe": "描述",
            //         "id": "1",
            //         "time": "-"
            //       }
            //     ],
            //     "alarm_num": 0
            //   },
            // },
          ],
          th:[
            {prop:'title',label:'名称',wid:290},
            {prop:'running_date',label:'累计运行时间',wid:309},
            {prop:'alarm',
              label:'告警次数',
              wid:85,
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  //warnCount:param.row.warnCount
                };
                //console.log(h,param)
                return h(showTooltip,{
                  props: {btnss:btnss,warnInfo:param.row.alarm.alarm_details,deviceInnormalNum:param.row.alarm.alarm_num},
                  on:{}
                });
              }
            },
            {prop:'zhanwei',label:''},

          ]
        },
        warnInfo:[
          {id:1,date:'-',content:'-',title:''},
        ],
        deviceInnormalNum:10,

        table3:{
          hei:566, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {date: '-',title:'-',show_name:'-',show_content:'-',btns2:22},
          ],
          th:[
            {prop:'date',label:'时间',wid:182},
            {prop:'title',label:'名称',wid:200},
            {prop:'handler_name',label:'维修人',wid:147},
            {prop:'handle_content',label:'维修记录',},
          ]
        },

        table4:{
          hei:566, //table高度  设置后有滚动条
          len:0, //总条数
          pageSize:20, //每页的条数 。默认为20
          page:1,  //当前页码
          data:[
            // {date: '-',device_name:'-',name:'-',data:'-'},
          ],
          th:[
            {prop:'date',label:'时间',wid:182},
            {prop:'device_name',label:'名称',wid:200},
            {prop:'name',label:'操作人',wid:147},
            {prop:'data',
              label:'操作状态',
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  data:param.row.data
                };
                //console.log(h,param)
                return h(showOperateState,{
                  props: {btnss:btnss},
                  on:{}
                });
              }
            },
          ]
        },
      }
    },
    methods:{
      //分页：切换页面
      changePage(val){
        this.getDataReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),val)
      },
      changePage2(val){
        this.getFaultReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),val)
      },
      changePage3(val){
        this.getRecordReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),val)
      },
      changePage4(val){
        this.getSwitchReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),val)
      },
      //tab选项卡切换
      handleClick(tab, event) {
        console.log(tab.index);
        switch (tab.index) {
          case '0':
            if (this.selfID == 7){
              this.tableType = '1';
            } else if (this.selfID == 9){
              this.tableType = '5';
            }
            break;
          case '1':
            this.tableType = '2';
            break;
          case '2':
            this.tableType = '3';
            break;
          case '3':
            this.tableType = '4';
            break;
          default:
            alert('未知错误0');
        }
      },
      //数据统计报表，劳资绝望了。。
      getDataReport(sysID,num){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':sysID,
          'floor_id':'',
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_dtareport', config, headers).then(res => {
          let data = res.data;
          console.log('数据统计报表', config, res);
          if(data.code==0){
            let data_info = data.data.data_info;
            let title_map = data_info.title_map;
            this.headTitle = title_map;

            let record_data = data_info.record_data;
            /*record_data = [
              {
                "date": "2018/12/10 23:45",
                "device_name": "2号水泵",
                "points_list": [
                  {
                    "category_id": "478",
                    "now_value": "0",
                    "points_id": "100"
                  },
                  {
                    "category_id": "93",
                    "now_value": "0",
                    "points_id": "6202"
                  },
                  {
                    "category_id": "476",
                    "now_value": "正常",
                    "points_id": "93"
                  },
                  {
                    "category_id": "481",
                    "now_value": "否",
                    "points_id": "94"
                  },
                  {
                    "category_id": "482",
                    "now_value": "正常",
                    "points_id": "95"
                  },
                  {
                    "category_id": "95",
                    "now_value": "正常",
                    "points_id": "96"
                  },
                  {
                    "category_id": "90",
                    "now_value": "否",
                    "points_id": "97"
                  },
                  {
                    "category_id": "128",
                    "now_value": "否",
                    "points_id": "98"
                  },
                  {
                    "category_id": "129",
                    "now_value": "正常",
                    "points_id": "99"
                  }
                ],
                "sys_menu_id": "8"
              },
              {
                "date": "2018/12/10 23:45",
                "device_name": "2号水泵",
                "points_list": [
                  {
                    "category_id": "478",
                    "now_value": "0",
                    "points_id": "100"
                  },
                  {
                    "category_id": "93",
                    "now_value": "0",
                    "points_id": "6202"
                  },
                  {
                    "category_id": "476",
                    "now_value": "正常",
                    "points_id": "93"
                  },
                  {
                    "category_id": "481",
                    "now_value": "否",
                    "points_id": "94"
                  },
                  {
                    "category_id": "482",
                    "now_value": "正常",
                    "points_id": "95"
                  },
                  {
                    "category_id": "95",
                    "now_value": "正常",
                    "points_id": "96"
                  },
                  {
                    "category_id": "90",
                    "now_value": "否",
                    "points_id": "97"
                  },
                  {
                    "category_id": "128",
                    "now_value": "否",
                    "points_id": "98"
                  },
                  {
                    "category_id": "129",
                    "now_value": "正常",
                    "points_id": "99"
                  }
                ],
                "sys_menu_id": "8"
              },
            ]*/

            //console.log(title_map,record_data)
            //console.log(title_map[0].category_id.indexOf(Number(record_data[0].points_list[0].category_id)))
            record_data.map((item,i)=>{
              let points_list = [];
              title_map.map((item2, i2) => {
                item.points_list.map((item3, i3) => {
                  if (item2.category_id.indexOf(Number(item3.category_id)) > -1) {
                    item3.category_id = item2.category_id;
                  }
                })
              })
            })
            //console.log(record_data)

            let titArr = [];
            title_map.map((item4,i4)=>{
              let obj = {};
              obj.prop = ('aa'+item4.category_id.join('-'))
              obj.label = item4.title;
              titArr.push(obj);
            })
            this.table.th = titArr;
            if (titArr.length !== 0){
              this.table.th.unshift({
                prop:'name',
                label:'名称'
              })
              this.table.th.unshift({
                prop:'time',
                label:'时间'
              })
            }

            let recordArr = [];
            record_data.map((item5,i5)=>{
              let obj = {};
              obj.name = item5.device_name;
              obj.time = item5.date;
              item5.points_list.map((item6,i6)=>{
                //console.log(item6)
                if (Array.isArray(item6.category_id)) {
                  obj[('aa' + item6.category_id.join('-'))] = item6.now_value;
                }
              })
              recordArr.push(obj)
            })
            this.table.data = recordArr;


            this.loading = false;
          }else{
            this.$message(data.message);
            this.loading = false;
          }
        }).catch(err=>{
          this.loading = false;
          console.log(err);
        })

      },
      //故障统计报表
      getFaultReport(sysID,num){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_fault', config, headers).then(res => {
          let data = res.data;
          console.log('故障统计报表', config, res);
          if(data.code==0){
            let tempData = data.data.data_info;
            //let tempData = data.;
            let newData = tempData.map((item,i)=>{
              item.zhanwei = '';
              return item
            })
            this.table2.data = newData;
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
      //维修记录统计报表
      getRecordReport(sysID,num){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_maintenance', config, headers).then(res => {
          let data = res.data;
          console.log('维修记录统计报表', config, res);
          if(data.code==0){
            this.table3.data = data.data;
            //this.table3.len = data.paging.count;
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
      //启停统计报表
      getSwitchReport(sysID,num){
        this.loading = true;
        let that = this;
        let config = {
          'sys_menu_id':sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_startstop', config, headers).then(res => {
          let data = res.data;
          console.log('启停统计报表', config, res);
          if(data.code==0){
            // this.table4.len = data.paging.count;
            let tempData = data.data.data_info;
            let newArr= tempData.map((item,i)=>{
              /*console.log(eval('('+item.data+')'))
              eval('('+item.data+')').value == '1' ? item.data='开启':item.data='关闭';*/
              item.data = item.data.status[item.data.value];
              return item;
            })

            this.table4.data = newArr;
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
      //导出统计报表
      getExportReport(sysID,type){
        window.location.href = 'https://tesing.china-tillage.com/drainage/drainage_startstop_excel?sys_menu_id='+(this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id)+'&user_id='+this.$store.state.userId+'&project_id='+this.$store.state.projectId+'&type='+this.tableType;
      },
      //获取报表表头
      getReportHeader(sysID){
        let that = this;
        let config = {
          'sys_menu_id':sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_dtareport_header', config, headers).then(res => {
          let data = res.data;
          console.log('获取报表表头', config, res);
          if(data.code==0){
            this.headTitle = data.data;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created() {

      //this.getReportHeader((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id))

       this.getDataReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),1)
       this.getFaultReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),1)
       this.getRecordReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),1)
       this.getSwitchReport((this.selfID == 7 ? this.$store.state.sysList[6].son_list[0].sys_menu_id : this.$store.state.sysList[6].son_list[1].sys_menu_id),1)

    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/comon';
  .wsadReport{
    .ownTable{
      border-spacing:0;
      th{
        text-align: left;
        .vh(60);
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #36fceb;
      }
      td{
        .vh(40);
        font-family: PingFangSC-Light;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f4f4f4;
        border-bottom: solid 1px rgba(59, 137, 249, 0.3);
      }
    }
    display: flex;
    flex-direction: column;
    flex: 1;
    //background-color: yellow;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 0.5rem;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 0 0.2rem;
      .export-btn{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.1rem;
        width: 0.88rem;
        height: 0.32rem;
        background-color: rgba(59, 137, 249, 0.2);
        border-radius: 4px;
        border: 0;
        outline: none;
        font-family: PingFangSC-Medium;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
        cursor: pointer;
        .icon-export{
          margin-right: 0.1rem;
          display: inline-block;
          width: 0.14rem;
          height: 0.14rem;
          background: url("../../../assets/img/fireAlarm/icon_export.png") no-repeat center;
          background-size: 100% 100%;
        }
      }
      .title{
        font-family: PingFangSC-Regular;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
    .body{
      padding: 0 0.2rem;
    }
  }
</style>
