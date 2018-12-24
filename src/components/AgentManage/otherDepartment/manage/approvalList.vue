
<template>
  <div class="workBox approvaListCotainer">
    <Crumbs :data ='crumbs'/>
    <div class="tableBoxs boxs otherDepApproListBox">
      <div class="tabHead">
        <div class="jobBoxs">
          <SelectBox
            :options = 'approveStatusArray'
            :value = "approveStatus"
            :icon="'el-icon-d-caret'"
            placeholder="全部"
            @change = "change1"
          />
        </div>
        <div class="searchBoxs" @click="getTableList">
          <i class="el-icon-search"></i>
          <span>筛选</span>
        </div>
        <div class="dateBox">
          <TimePickerT
            :value7= "value7"
            :cant  = 'cant'
            @changes = "changes"
            @deletes = 'deletes'
            @adds    = 'adds'
            :timeformat="'M-d'"
          />
        </div>
      </div>
      <div class="tableIn">
        <Table
          style="width:100%"
          :table = "table"
        />
      </div>
    </div>


    <Dialog wid="3.64rem" hei="2.16rem" ref="isRefult"><!-- 同意退单 -->
      <div v-text="dialogBoxs.txt" class="isRefTxt"></div>
      <div class="isRbtnBoxs">
        <span @click="submitOk">确定</span>
        <span @click="submitNo">取消</span>
      </div>
    </Dialog>
    <Dialog wid="4.14rem" hei="2.6rem" ref="sendWork2"><!-- 重新选择工单处理人员 -->
      <div class="sendWork2">
        <div class="oldName">
          <label >原处理人员：{{detalrowdata.user_name}}</label>
          <span class="namess" v-text="dialogBoxs.item.name"></span>
        </div>
        <div class="newName">
          <label >新工单处理人员：</label>
          <div class="ChooseBox">
            <SelectBox
              :options = 'names'
              :value = "vName"
              placeholder='选择人员'
              @change = 'changeNew'
            />
          </div>
        </div>
        <div class="sendWork2Boxs btnBai1" @click="sendWork2">
          <span>确定</span>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>

  import utils from "../../../../assets/js/utils.js";
  import SelectBox from '@/components/form/selectBox';
  import TimePickerT from '../../components/work/timePickerTit2';
  import Percentage from '../../components/work/Percentage';
  import WorkInfo from '../../components/work/workInfo';
  import SendWork from '../../components/work/sendWork';
  import State from '../../components/work/state';
  import deal from '../../components/work/deal';
  import Table from '../table1';
  import RoutingTask from '../../components/routing/routingTask'
  import RoutingInfo from '../../components/routing/routingInfo'
  export default {
    components:{
      'Table':Table,
      'WorkInfo':WorkInfo,
      'SelectBox':SelectBox,
      'TimePickerT':TimePickerT,
      'SendWork':SendWork,
      'RoutingTask':RoutingTask,
      'RoutingInfo':RoutingInfo
    },
    data () {
      return {
        approveStatus:"-1",
        approveStatusArray:[
          {
            value:'-1',label:'全部'
          },
          {
            value:'0',label:'待审批'
          },
          {
            value:'3',label:'已同意'
          },
          {
            value:'4',label:'已驳回'
          }
        ],
        crumbs:['代维系统','我的审批列表'],
        workH:[],//上半部分数据
        getStatus:'',
        query2:{//工单详情的查询条件
          types:[],
          type:'',
          time:'10-29',
          devices:[],
          names:[],
          priority:[{label:'一般',value:1},{label:'普通',value:2},{label:'严重',value:3}],
          type_id:[{label:'系统自动派发',value:0},{label:'手工派发',value:1},{label:'投诉工单',value:2},{label:'维保工单',value:3}]
        },
        departments:[],//专业下拉框
        names:[{
          value:'',label:'请选择'
        }],//姓名下拉框
        dialogBoxs:{
          item:{name:''},
          state0:0, //1 同意，0拒绝
          txt:'是否允许退单'
        },
        table2:{
          title:'工单详情',
          tabs:[],
          hei:400, //table高度  设置后有滚动条
          len:0, //总条数
          data:[],
          th:[
            {prop:'user_name',label:'名称'},
            {prop:'title',label:'类别'},
            {prop:'floor',label:'地点'},
            {prop:'devicename',label:'设备名称'},
            {prop:'addtime',label:'派发时间'},
            {prop:'description',label:'内容描述'},
            {prop:'sendtype',label:'派发类别'},
            {prop:'now_state',label:'状态',
              operate: true,
              render: (h, param)=> {
                //console.log(param.row.now_state)
                const btnss = {
                  fills:param.row.now_state,
                };
                return h(State,{
                  props: { state:btnss},
                  on:{}
                });
              }},
            {prop:'fill',label:'操作',
              operate: true,
              render: (h, param)=> {
                const btnss = {
                  item:param.row,
                };
                return h(deal,{
                  props: { btnss:btnss},
                  on:{agree:this.agree,refult:this.refult}
                });
              }
            }]
        },
        vName:'',
        //日期选择
        value7:utils.time(new Date()/1000,5),
        value8:utils.time(new Date()/1000,5),
        cant:false,
        table:{
          hei:328, //table高度  设置后有滚动条
          data:[],
          th:[
            {prop:'serial',label:'序号'},
            {prop:'type',label:'类别'},
            {prop:'user_name',label:'工程部审批人',wid:180},
            {prop:'dispatch_user_name',label:'工单处理人'},
            {prop:'dispatch_user_phone',label:'电话'},
            {prop:'addtime',label:'派发时间'},
            {prop:'description',label:'内容描述'},
            {prop:'now_state',label:'状态'},
            {prop:'id',label:'操作',wid:170,},
          ]
        },
        detalrowdata:{
          infos:{
            info:{
              new_user_id:''
            }
          }
        },
        infoItem:{
          info:{},
          desc:[],
          pic1:[],
          pic2:[],
          localDesc:[],
          sendInfos:[]
        },  //某个工单的详情
      }
    },
    methods:{
      getDetailTime(date){
        this.value8 = date;
      },
      change1(val){ //选择
        this.approveStatus = val;
      },
      changes(val){
        this.value7 = val;
        this.getTableList();
      },
      changeNew(val){
        this.vName = val;
        this.detalrowdata.infos.info = {};
        this.detalrowdata.infos.info.new_user_id = val;
      },
      deletes(){
        let attrs = this.value7.split('-');
        if(Number(attrs[1])==1){
          if(Number(attrs[0])>1){
            if(Number(attrs[0]-1)>9){
              attrs[0] = attrs[0]-1;
            }else{
              attrs[0] = '0'+Number(attrs[0]-1);
            }
            if(attrs[0]==1 || attrs[0]==3 || attrs[0]==5 || attrs[0]==7 || attrs[0]==8 || attrs[0]==10 || attrs[0]==12){
              attrs[1]=31;
            }else if(attrs[0]==4 || attrs[0]==6 || attrs[0]==9 || attrs[0]==11){
              attrs[1]=30;
            }else{
              if(utils.time(new Date()/1000,10)%4==0){
                attrs[1]= 29;
              }else{
                attrs[1]= 28;
              }
            }
          }
        }else{
          if((Number(attrs[1])-1)<10){
            attrs[1] = '0'+(Number(attrs[1])-1);
          }else{
            attrs[1] = Number(attrs[1])-1;
          }
        }
        this.value7 = attrs.join('-');
        this.getTableList();
      },
      adds(){
        if(this.cant){
          return;
        }
        let attrs = this.value7.split('-');
        if(((attrs[0]==1 ||attrs[0]==3 || attrs[0]==5 ||attrs[0]==7 ||attrs[0]==8 ||attrs[0]==10 ||attrs[0]==12) && attrs[1]==31)
          ||((attrs[0]==4 ||attrs[0]==6 || attrs[0]==9 ||attrs[0]==11) && attrs[1]==30)
          ||((attrs[0]==2 && Number(attrs[0])%4==0) && attrs[1]==29)
          ||((attrs[0]==2 && Number(attrs[0])%4!=0) && attrs[1]==28)
        ){
          attrs[1] =1;
          if(attrs[0]==12){
            attrs[0] = '01';
            attrs[1] = '01';
          }else{
            if(Number(attrs[0])+1>10){
              attrs[0] = Number(attrs[0])+1;
              attrs[1] = '01';
            }else{
              attrs[0] = '0'+(Number(attrs[0])+1);
              attrs[1] = '01';
            }

          }
        }else{
          if(Number(attrs[1])+1>9){
            attrs[1] = Number(attrs[1])+1;
          }else{
            attrs[1] = '0'+(Number(attrs[1])+1)
          }

        }
        this.value7 = attrs.join('-');
        this.getTableList();
      },
      rowClick(row){
        if(row.user_id){
          this.infoItem.user_id  = row.user_id;
        }
        this.$refs.dialog.show();
        if(!row.type){
          row.type = ''
        }
        if(!row.time || row.time.split('-')[0].length>2){
          row.time = this.value7;
        }
        this.$http.post('/pc_ims/admin/user_jobs',{
          sys_name:row.type,
          date:row.time,
          user_id:this.infoItem.user_id
        }).then(res=>{
          //console.log(res);
          if(res.data.code==0){
            this.table2.len = res.data.count;
            let data = res.data.data.info;
            $.each(data,(i,k)=>{
              if(data[i].type_id ==='0'){
                data[i].sendtype='系统自动派发'
              }else if(data[i].type_id=='1'){
                data[i].sendtype = '手工派发'
              }else if(data[i].type_id=='2'){
                data[i].sendtype='投诉'
              }else if(data[i].type_id=='3'){
                data[i].sendtype = '维保工单'
              }
            })
            this.table2.data = data;
            this.table2.tabs = [{'name':'今日工单总数',num:res.data.data.zong},
              {'name':'已完成',num:res.data.data.wan},
              {'name':'未完成',num:res.data.data.wei}];
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },
      submitOk(){ //处理工单 同意/拒绝退单/延期
        this.$refs.isRefult.hide();
        if(this.getStatus==5){
          this.vName = '';
          this.$refs.sendWork2.show();
        }else{
          this.getDealResult(this.detalrowdata);
        }

      },
      submitNo(){ //取消
        this.$refs.isRefult.hide();
      },
      sendWork2(){ //重新选择工单处理人员
        console.log(this.detalrowdata);
        if(!this.vName || this.vName==''){
          this.$message({
            type:'error',
            message:'请选择新工单处理人员',
            duration:2000
          })
          return;
        }
        this.$refs.sendWork2.hide();
        this.getDealResult(this.detalrowdata);
      },
      getDealResult(param){
        let info ='';
        if(param.infos.localDesc2 && param.infos.localDesc2.info){
          info = param.infos.localDesc2.info
        }
        if(!this.vName || this.vName==''){
          this.vName = '';
        }
        //console.log(param.infos);
        this.$http.post('/pc_ims/write_job',{
          id:param.infos.id,
          type:param.type,
          pic1:param.infos.pic1,
          pic2:param.infos.pic2,
          end_time:'',
          user_id:param.infos.user_id,
          new_user_id:this.vName,
          info:info,
          dispatch_user_id:this.$store.state.userInfoTotal.userinfo.id
        })
          .then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.rowClick({
                sys_name:'',
                date:this.value7,
                user_id:this.infoItem.user_id
              })
              this.$refs.tableInfos2.hide();
            }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
            }
          })
      },
      getNameList(){
        this.names = [{value:'',label:'全部'}]
        this.$http.post('/pc_ims/get_user').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].user_id;
              data[n].label = data[n].truename;
              this.names.push({value:data[n].user_id,label:data[n].truename})
            })
            this.query2.names = data;
            this.query3.names = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDepartList(){
        this.departments = [{
          value:'',label:'全部'
        }];
        this.$http.post('/pc_ims/get_description').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].title;
              this.departments.push({value:data[n].id,label:data[n].title})
            })

          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getSystemList(){
        this.$http.post('/pc_ims/get_sysmenu').then(res=>{
          if(res.data.code==0){
            let data = res.data.data;
            $.each(data,(n,k)=>{
              data[n].value = data[n].title;
              data[n].label = data[n].title;
            })
            this.query2.types = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getDeviceList(){
        this.$http.post('/pc_ims/get_device',{floor_name:this.queryModel.area}).then(res=>{
          console.log(res);
          if(res.data.code==0){
            let data = res.data.data;

            $.each(data,(n,k)=>{
              data[n].value = data[n].id;
              data[n].label = data[n].floor_name;
            })
            this.query2.devices = data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        });
      },
      getTableList(){
        let that = this;
        this.$http.post('/app_ims/approve_joblist',{
          state: that.approveStatus,
          date: that.value7,//this.value7
        }).then(res=>{
          console.log(res);

          if(res.data.code==0){
            $.each(res.data.data,(n,k)=>{
              let data = res.data.data;
              data[n].serial = n+1;
              if(n<9){
                data[n].serial = '0' + data[n].serial;
              }
            })
            this.table.data = res.data.data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      }
    },
    created() {

    },
    mounted() {
      this.getTableList();
      this.getSystemList();
      this.getDepartList();

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../../assets/css/comon.less';

  .workBox{
    width:100%;height:100%;
    .workHead{
      width: 95.6%;
      height:1.08rem;
      margin-left: 0.3rem;
      display: flex;
      margin-top:0.08rem;
      .numBox{
        flex:1;
        display: flex;
        .numBoxIn{
          display: flex;
          align-items: center;
          flex-direction: column;
          flex: 1;
          p{
            display: block;
            height:0.86rem;
            line-height:1rem;
            font-size: 0.48rem;
            font-family: PingFangSC-Light;
          }
          span{
            font-size: 0.12rem;
            line-height: 0.12rem;
            color: #b5d7ff;
          }
        }
      }
    }
    .tableBoxs{
      width: 95.6%;
      height:4rem;
      margin-top:0.2rem;
      margin-left: 0.3rem;
      .tabHead{
        width: 100%;
        position: relative;
        height:0.59rem;
        margin-top:0.1rem;
        paddidng-top:0.2rem;
        .jobBoxs{
          float: left;
          width: 1.15rem;
          height:0.32rem;
          background-color: rgba(255, 255, 255, 0.01);
          border-radius: 0.02rem;
          border: solid 0.01rem #1989fa;
          text-align: center;
          margin-left: 0.2rem;
        }
        .nameBoxs{
          float: left;
          width: 0.87rem;
          height:0.32rem;
          background-color: rgba(255, 255, 255, 0.01);
          border-radius: 0.02rem;
          border: solid 0.01rem #1989fa;
          text-align: center;
          margin-left: 0.1rem;
        }
        .searchBoxs{
          float: left;
          margin-left: 0.12rem;
          width: 0.93rem;
          height:0.32rem;
          line-height:0.32rem;
          color: #fff;
          font-size: 0.14rem;
          text-align: center;
          cursor: pointer;
          background-image: linear-gradient(0deg,
          #2772e3 0%,
          #4b94f9 100%);
          border-radius: 0.02rem;
          i{
            font-size: 0.16rem;
            margin-right: 0.05rem;
            font-weight: 600;
          }
        }
        .dateBox{
          position: absolute;
          margin-top:0.24rem;
          left: 4.95rem;
        }
      }
      .tableIn{
        width: 99%;
        height:4rem;
        margin-left: 1%;
        .tableBox{
          margin-left:0;
        }
      }
    }
    .dispatch{
      width: 100%;
      height:1.14rem;
      display: flex;
      // align-items: center;
      justify-content: center;
      color:#fff;
      line-height:0.3rem;
      text-align:center;
      .dispatchBtn{
        margin-top:0.26rem;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        box-shadow: 0px 4px 10px 0px
        rgba(74, 144, 226, 0.4),
        inset 1px 1px 2px 0px
        rgba(248, 253, 255, 0.15),
        inset 0px -1px 1px 0px
        #4a90e2;
        background-color: rgba(51, 51, 51, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover{
          background-color:rgba(58, 137, 249, 0.3);
        }
        i{
          font-size: 0.32rem;
          color: #3b85ef;
        }
      }
    }
    .tableInfos{
      width: 100%;
      height: 5rem;
      .infoHead{
        height:0.52rem;
        width: 100%;
        background: rgba(0,0,0,0.2);
        padding-left: 0.2rem;
        padding-right: 0.42rem;
        display: flex;
        align-items: center;
        span{
          font-size: 0.16rem;
          color: #fff;
        }
        .infoName{
          padding-right: 0.20rem;
        }
        .infoState{
          padding-left: 0.20rem;
          border-left: 0.01rem solid #4a90e2;
        }
        .infoType{
          font-size: 0.12rem;
        }
      }
      .rightHead{
        position: absolute;
        right:0.2rem;
        line-height:0.52rem;
        color:#fff;
        top:0;
        width: 12.59vw;
        .infoBusy{
          margin-top:0.09rem;
          display:inline-block;
          line-height:0.24rem;
          background:#008AFF;
          width:4.98vw;
          font-size:12px;
          border-radius:2px;
          text-align:center;
        }
        .infoSend{
          margin-top:0.09rem;
          display:inline-block;
          line-height:0.24rem;
          background:#FA6074;
          width:4.98vw;
          border-radius:2px;
          font-size:12px;
          text-align:center;
        }
        .infoPer{
          margin-top:0.09rem;
          display:inline-block;
          line-height:0.24rem;
          background:#F38A00;
          padding:0 0.1rem;
          border-radius:2px;
          font-size:12px;
          text-align:center;
        }
      }
    }
    .sendWork2{
      width: 100%;
      height:100%;
      padding:0.22rem;
      .oldName,.newName{
        width: 100%;
        font-size: 0.14rem;
        label{
          color: #4f648b;
          line-height:0.32rem;
        }
        span.namess{
          color: #ffa414;
        }
        .ChooseBox{
          height:0.4rem;
          width: 2.24rem;
          background-color: rgba(255, 255, 255, 0.01);
          border-radius: 0.04rem;
          border: solid 1px #1989fa;
          margin-top:0.07rem;
          span{
            font-size: 0.14rem !important;
            color: green!important;
          }
        }
      }
      .sendWork2Boxs.btnBai1{
        width:100%;
        height:0.44rem;
        line-height:0.44rem;
        background:#3b85ef;
        color:#fff;
        margin-top:0.6rem;
      }
    }

  }
  .isRefTxt{
    width: 100%;
    text-align: center;
    font-size: 0.18rem;
    color: #b5d7ff;
    margin:0.9rem auto 0.82rem;
  }
  .isRbtnBoxs{
    width: 100%;
    height:0.42rem;
    position:absolute;
    bottom:0;
    left:0;
    overflow: hidden;
    border: 0.01rem solid #4a90e2;
    border-bottom-left-radius: 0.08rem;
    border-bottom-right-radius: 0.08rem;
    span{
      display:inline-block;
      width:1.791rem;
      text-align: center;
      line-height:0.44rem;
      font-size: 0.16rem;
      color: #fff;
      cursor: pointer;
      &:nth-child(1){
        background:  #3b85ef;
      }
    }
  }

</style>

