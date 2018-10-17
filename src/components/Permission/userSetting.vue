<template>
  <div class="userBox">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容模块-->
    <div class="contentBox boxs">
      <!--查询区-->
      <div class="itemsBox">
        <!--筛选查询-->
        <div class="queryBox">
          <el-select placeholder="请选择" v-for="(items,index) in options" v-model="itemValue[index]" :key="index" class="querySelectItem">
            <el-option
              v-for="item in items"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input
            placeholder="请输入用户名称"
            v-model="itemValue[3]"
            class="userNameInput"
            clearable>
          </el-input>
          <div>
            <el-button class="queryDataBtn queryBoxBtn" @click="queryData"><i></i><span>查询</span></el-button>
          </div>
        </div>

        <!--新增用户-->
        <div>
          <el-button class="addNewUserBtn queryBoxBtn" @click="addAccount"><i></i><span>新增账号</span></el-button>
        </div>
      </div>

      <!--用户表格-->
      <div class="userTableContainer">
        <el-table
          :data="curPageData"
          style="width: 100%"
          height="500"
          class="tableAlignCenter tableHeadBlue">
          <el-table-column
            prop="code"
            label="编号"
            min-width="7%">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名(手机号)"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="nickName"
            label="昵称"
            min-width="19%">
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            min-width="19%">
          </el-table-column>
          <el-table-column
            prop="operation"
            label="操作"
            min-width="9%">
            <template slot-scope="scope">
              <a href="javascrtip:;" @click="editAccount(scope.row)" class="tableBtn">修改</a>
              <a href="javascrtip:;" @click="deleteAccount(scope.row)" class="tableBtn">删除</a>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <div class="paginationBox">
          <div class="totalPageNumBox">共{{totalPageNum}}页</div>

          <div class="el-input el-pagination__editor is-in-pagination curPageBox">
            <input type="number" autocomplete="off" class="el-input__inner" v-model="currentPage">
            <span @click="toInputPage">GO</span>
          </div>

          <el-pagination
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="totalPageNum"
            layout="prev, pager, next"
            :total="totalDataNumber">
          </el-pagination>

        </div>

      </div>

      <!--新增或修改信息弹窗-->
      <el-dialog :title="formTitle" :visible.sync="accountInfoDialog" class="dialogBox" :close-on-click-modal="false" @close="clearForm">
        <el-form :model="form">
          <el-form-item :label="form.name.label" >
            <el-input v-model="form.name.key" autocomplete="off" placeholder="请输入用户名可以默认手机号"></el-input>
          </el-form-item>
          <el-form-item :label="form.password.label" v-if="isAdd">
            <el-input v-model="form.password.key" type="password" autocomplete="off" placeholder="请设置初始密码"></el-input>
          </el-form-item>
          <el-form-item :label="form.password.label" v-else>
            <el-button @click="resetPw" class="queryBoxBtn resetPwBtn" :class="{ loading: isReset }"><i></i>重 置</el-button>
          </el-form-item>
          <el-form-item :label="form.department.label" >
            <el-select v-model="form.department.key" placeholder="请选择">
              <el-option label="工程部" value="department1"></el-option>
              <el-option label="建设部" value="department2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="form.position.label" >
            <el-select v-model="form.position.key" placeholder="请选择">
              <el-option label="经理" value="position1"></el-option>
              <el-option label="主管" value="position2"></el-option>
              <el-option label="员工" value="position3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="form.role.label" >
            <el-select v-model="form.role.key" placeholder="请选择">
              <el-option label="强电运维" value="role1"></el-option>
              <el-option label="强电测试" value="role2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveNewAccount(isAdd)" class="saveBtn">保存</el-button>
          <el-button @click="accountInfoDialog = false" class="cancleBtn">取消</el-button>
        </div>
        <bubbleTip :tipText="bubbleTip"/>
      </el-dialog>

      <!--删除信息弹窗-->
      <el-dialog :visible.sync="deleteInfoDialog" class="dialogBox deleteInfoDialog" :close-on-click-modal="false">
        <div class="deleteTextBox">是否确定删除此信息？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmDelete()" class="saveBtn">保存</el-button>
          <el-button @click="deleteInfoDialog = false" class="cancleBtn">取消</el-button>
        </div>
        <bubbleTip :tipText="bubbleTip"/>
      </el-dialog>

    </div>

  </div>
</template>

<script>
    import queryData from './Data/queryGroupData.json';
    import tableData from './Data/tableData.json';
    import bubbleTip from '@/components/common/bubbleTip';

    export default {
      components:{
        "bubbleTip":bubbleTip
      },
      name: "user-setting",
      data(){
        return {
          options: "",
          itemValue:[],
          tableData: [],
          currentPage: 1,
          pageSize: 20,
          totalPageNum: '',
          totalDataNumber:'',
          curPageData:[],
          groupPageData:[],
          accountInfoDialog:false,
          deleteInfoDialog:false,
          form: {
            name: {label:"用户名", key:""},
            password:{label:"密码", key:""},
            department: {label:"部门", key:""},
            position: {label:"职位", key:""},
            role: {label:"角色", key:""}
          },
          formTitle:"",
          isAdd:true,
          bubbleTip:'',
          isReset:false
        }
      },
      methods:{
        queryData(){
          /*根据筛选条件查询数据*/
          console.log(this.itemValue);
        },
        currentPageChange(val) {
          /*当前页变动事件*/
          this.currentPage = val;
          this.curPageData = this.groupPageData[val-1];
        },
        tabelDataGroupBy(){
          /*根据请求表格数据分组*/
          let that = this;
          this.tableData = tableData;
          this.totalDataNumber = this.tableData.length;
          this.totalPageNum = Math.ceil(Number(this.totalDataNumber) / this.pageSize);
          if(this.totalPageNum == 1){
            this.curPageData = this.tableData;
          }else {
            let times = 0;
            let curGroup = 1;
            let tempArray = [];
            let pageSize = this.pageSize;
            for(let i=0;i<this.totalDataNumber;i++){
              if(times<pageSize){
                times++;
              }else {
                times = 1;
                that.groupPageData.push(tempArray);
                tempArray = [];
                curGroup++;
              }
              tempArray.push(tableData[i]);
              if(curGroup==that.totalPageNum && i==that.totalDataNumber-1){
                that.groupPageData.push(tempArray);
                that.curPageData = that.groupPageData[0];
              }
            }
          }
        },
        toInputPage(){
          /*显示输入页表格数据*/
          this.curPageData = this.groupPageData[this.currentPage-1];
        },
        addAccount(){
          /*打开新增帐号弹窗*/
          this.accountInfoDialog = true;
          this.formTitle = '新增帐号';
          this.isAdd = true;
        },
        saveNewAccount(type){
          /*保存新增帐号*/
          let that = this;
          for(var i in this.form){
            if(!type && i=='password'){
              break;
            }
            let temp = this.form[i].key;
            if(!temp){
              /*that.bubbleTipShow(this.form[i].label + "不能为空");*/
              that.bubbleTipShow("请完善信息");
              return;
            }
          }
          let message = type?"保存成功":"修改成功";;
          this.bubbleTipShow(message);
          setTimeout(function () {
            that.accountInfoDialog = false;
            that.clearForm();
          },2000)
        },
        editAccount(val){
          /*修改信息*/
          console.log(val);
          this.accountInfoDialog = true;
          this.formTitle = '修改信息';
          this.isAdd = false;
          this.form.name.key = val.userName;
          this.form.department.key = val.department;
          this.form.position.key = val.position;
          this.form.role.key = val.role;
        },
        deleteAccount(val){
          this.deleteInfoDialog = true;
        },
        confirmDelete(){
          let that = this;
          that.bubbleTipShow('删除成功');
          setTimeout(function () {
            that.deleteInfoDialog = false;
          },2000)
        },
        resetPw(){
          /*重置密码*/
          var that = this;
          this.isReset = true;
          setTimeout(function () {
            that.isReset = false;
            that.bubbleTipShow('重置成功');
          },1000);
        },
        clearForm(){
          for(var i in this.form){
            this.form[i].key = '';
          }
        },
        bubbleTipShow(tip){
          this.bubbleTip = tip;
          this.$store.state.bubbleShow = true;
          var that = this;
          setTimeout(function () {
            that.$store.state.bubbleShow = false;
          },3000)
        }
      },
      created(){
        this.options = queryData;
        if(tableData){
          this.tabelDataGroupBy();
        }
      },
      mounted(){

      }
    }
</script>

<style scoped>


</style>
