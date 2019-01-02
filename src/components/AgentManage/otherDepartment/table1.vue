
<!--
props: table
table:{
    hei:428,                                     * //table高度   设置后有滚动条     px ,设计图多少px  就多少px
    len:800,                                     * //总条数      不设置取消分页
    pageSize:20,                                 * //每页的条数 。默认为20
    page:1,                                      * //当前页码     默认为1
    data:[                                         //数据
        {
            number:'01',                            //和th对应
            name: '王小虎'                          //和th对应
        },
        ],
    th:[{                                           //头部
        prop:'number',                              //和data对应
        label:'编号',
        wid:22                                      *// 设置后每一列有固定宽度  ， 不设置 自适应  px ,设计图多少px  就多少px
        },
        {prop:'btns2',
        label:'操作',
        operate: true,                              //自定义格子。不设置，默认显示值。
        render: (h, param)=> {
            const btnss = {

                };
            return h(自己的组件,{
                props: { btnss:btnss},                  //自己的组件的传入值
                on:{addss:this.addsss,delss:this.delsss}  自己的组件的函数与 父组件函数绑定
            });
            }
        },
    ]
}

事件
// 切换分页
+(pageNow){

}
//行点击
rowClick(row){

}
-->

<template>
  <div class="tableBox" :class="{'padding0':tableData}">
    <el-table
      :size="table.small"
      :height="table.hei"
      :data="tableData.data"
      @row-click = "rowClick"
      @cell-mouse-enter = "rowEnter"
      @cell-mouse-leave = "rowLeave"
      style="width: 100%">
      <el-table-column
        :key="i"
        v-for="(v,i) in tableData.th"
        :prop="v.prop"
        :show-overflow-tooltip="false"
        :label="v.label"
        :width="v.wid"
        :min-width="v.minWid">
        <!-- 自定义 -->
        <template slot-scope="scope" >

          <div v-if="v.prop == 'id' ">
            <div v-if=" scope.row.now_state == '10' " class="btnsBox">
              <span class="agreeBtn" @click="openDialog(scope.row)">同意</span>
              <span class="refuseBtn" @click="refuse(scope.row)">驳回</span>
            </div>
            <div v-else>-</div>
          </div>

          <div v-if="v.prop == 'now_state' ">
            <span v-if=" scope.row[v.prop] == '11' " class="otherDepColor2">已同意</span>
            <span v-if=" scope.row[v.prop] == '15' " class="otherDepColor3">已驳回</span>
            <span v-if=" scope.row[v.prop] == '1' " class="otherDepColor2">已接单</span>
            <span v-if=" scope.row[v.prop] == '0' " class="otherDepColor3">未接单</span>
            <span v-if=" scope.row[v.prop] == '10' " class="otherDepColor1">待审批</span>
            <span v-if=" scope.row[v.prop] == '2' " class="otherDepColor1">申请延期</span>
            <span v-if=" scope.row[v.prop] == '3' " class="otherDepColor1">延期申请通过</span>
            <span v-if=" scope.row[v.prop] == '5' " class="otherDepColor1">申请退单</span>
            <span v-if=" scope.row[v.prop] == '6' " class="otherDepColor1">退单申请通过</span>
            <span v-if=" scope.row[v.prop] == '4' " class="otherDepColor2">完成</span>
            <!--<span v-if=" scope.row[v.prop] !='0' && scope.row[v.prop] !='1' && scope.row[v.prop] !='11' && scope.row[v.prop] !='15' && scope.row[v.prop] !='10' " class="otherDepColor3">处理中</span>-->
          </div>

          <div v-if="v.prop != 'id' && v.prop != 'now_state' ">
            <my-render v-if="v.operate" :row="scope.row" :render="v.render"></my-render>
            <span v-else>
              {{scope.row[v.prop]}}
            </span>
          </div>

        </template>

      </el-table-column>

    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="approveDialog" class="dialogBox approveListDialogBox" :close-on-click-modal="false" :closed="closeDialog" :before-close="beforeCloseDialog">
      <el-select v-model="apporvePerson" placeholder="选择人员" v-if="isOtherDepart">
        <el-option
          v-for="item in adminData"
          :key="item.user_id"
          :label="item.user_name"
          :value="item.user_id">
        </el-option>
      </el-select>
      <el-select v-model="apporvePerson" placeholder="选择人员" v-else>
        <el-option
          v-for="item in adminData"
          :key="item.user_id"
          :label="item.truename"
          :value="item.user_id">
        </el-option>
      </el-select>

        <el-button type="primary" @click="agree" class="submitBtn">{{submitBtnText}}</el-button>
    </el-dialog>

  </div>
</template>

<script>
  import utils from '../../../assets/js/utils';
  import MyRender from "../../common/MyRender";
  export default {
    props:['table','dialogHeadTitle','submitBtn','isOtherDep'], //,'data','th','hei','currentPage'
    components: {
      MyRender
    },

    data () {
      return {
        refuseState:"",
        agreeState:"",
        isOtherDepart:true,
        submitBtnText:"",
        dialogTitle:"",
        isDealWork:false,
        curApproveData:{},
        apporvePerson:"",
        approveDialog:false,
        tableData:{},
        adminData:[],
      }
    },
    watch:{
      table:{
        handler(newval,oldval){

          if(newval){
            this.$set(this.tableData , newval)
          }


        },
        deep:true
      }
    },
    methods:{
      handleCurrentChange(val) {
        this.$emit('changePage',val);
        //   console.log(`当前页: ${val}`);
      },
      rowClick(row, event, column){ //当前行点击
        let that = this;
        setTimeout(function () {
          if(!that.isDealWork){
            that.$emit('rowClick',row);
          }
        },100)

      },
      rowEnter(row, column, cell, event){
        this.$emit('rowEnter',row);
      },
      rowLeave(row, column, cell, event){
        this.$emit('rowLeave',row);
      },
      openDialog(item){
        this.isDealWork = true;
        this.approveDialog =  true;
        this.curApproveData = item;
      },
      closeDialog(){
        this.isDealWork = false;
      },
      beforeCloseDialog(done){
        this.isDealWork = false;
        this.approveDialog =  false;
      },
      agree(){ //同意
        let that = this;
        let item = that.curApproveData;
        that.$http.post('/app_ims/dewith_approve',{
          job_id: item.id,
          user_id: that.apporvePerson,
          now_state: that.agreeState
        }).then(res=>{
          if(res.data.code==0){
            that.$message({
              type:'success',
              message:res.data.msg
            })
            that.getTableList();
          }else{
            that.$message({
              type:'error',
              message:res.data.msg
            })
          }
          that.curApproveData = {};
          that.approveDialog = false;
          setTimeout(function () {
            that.isDealWork = false;
          },150)
        })

      },
      refuse(item){
        //console.log(item);
        let that = this;
        that.isDealWork = true;
        that.$http.post('/app_ims/dewith_approve',{
          job_id: item.id,
          user_id: "",
          now_state: that.refuseState
        }).then(res=>{
          if(res.data.code==0){
            that.$message({
              type:'success',
              message:res.data.msg
            })
            that.getTableList();
          }else{
            that.$message({
              type:'error',
              message:res.data.msg
            })
          }
          setTimeout(function () {
            that.isDealWork = false;
          },150)
        })

      },
      getTableList(){
        let that = this;
        that.$http.post('/app_ims/approve_joblist',{
          state: that.approveStatus,
          date: that.value7,//this.value7
        }).then(res=>{

          if(res.data.code==0){
            $.each(res.data.data,(n,k)=>{
              let data = res.data.data;
              data[n].serial = n+1;
              if(n<9){
                data[n].serial = '0' + data[n].serial;
              }
            })
            this.tableData.data = res.data.data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },
      getAdmins(){
        let that = this;
        that.$http.post('/app_ims/get_admin').then(res=>{
          if(res.data.code==0){
            that.adminData = res.data.data;
          }else{
            that.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      },
      getUser(){
        let that = this;
        that.$http.post('/app_ims/get_user').then(res=>{
          if(res.data.code==0){
            that.adminData = res.data.data;
          }else{
            that.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
      }
    },
    created() {
      this.isOtherDepart = this.isOtherDep;
      this.tableData = this.table;
      this.dialogTitle = this.dialogHeadTitle;
      this.submitBtnText = this.submitBtn;
    },
    mounted(){
      let that = this;
      if(that.isOtherDepart){
        that.getAdmins();
        that.agreeState = "11";
        that.refuseState = "12";
      }else {
        that.getUser();
        that.agreeState = "13";
        that.refuseState = "14";
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
  .submitBtn{
    display: block;
    width: 100%;
    margin-top: .8rem;
    border-radius: 4px!important;
  }
  .tableBox{
    height: 100%;
    width: 100%;
    position: relative;
    padding-bottom: 0.5rem;
    .pageBoxs{
      height: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0.2rem;
      border-top: 0px solid rgba(58, 137, 249, 0.3);
      position: relative;
    }
    &.padding0{
      padding-bottom: 0;
    }
  }
  .btnsBox{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .btnsBox span{
    display: block;
    height: .24rem;
    line-height: .24rem;
    font-size: .14rem;
    cursor: pointer;
  }
  .btnsBox span:hover{
    border-bottom: 1px solid #3a89f9;
  }
  .agreeBtn{
    margin-right: .15rem;
  }

</style>
