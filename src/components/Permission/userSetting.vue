<template>
  <div class="userBox">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容模块-->
    <div class="contentBox boxs">
      <!--查询区-->
      <div class="itemsBox">
        <!--筛选查询-->
        <div class="queryBox">
          <el-select placeholder="请选择" v-model="itemValue[0]" class="querySelectItem" clearable >
            <el-option
              v-for="item in options[0]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="itemValue[1]" class="querySelectItem" clearable >
            <el-option
              v-for="item in options[1]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="itemValue[2]" class="querySelectItem" clearable >
            <el-option
              v-for="item in options[2]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
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
            type="index"
            label="编号"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名(手机号)"
            min-width="10%">
          </el-table-column>
          <el-table-column
            prop="username"
            label="昵称"
            min-width="16%">
          </el-table-column>
          <el-table-column
            prop="dept_title"
            label="部门"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="position_title"
            label="职位"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="role_title"
            label="角色"
            min-width="12%">
          </el-table-column>
          <el-table-column
            prop="create_date"
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
            <input type="number" autocomplete="off" class="el-input__inner" v-model="toPageNum">
            <span @click="toInputPage">GO</span>
          </div>

          <el-pagination
            @current-change="currentPageChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-count="totalPageNum"
            layout="prev, pager, next"
            >
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
              <el-option :label="item.title" :value="item.id" v-for="item in options[0]" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="form.position.label" >
            <el-select v-model="form.position.key" placeholder="请选择">
              <el-option :label="item.title" :value="item.id" v-for="item in options[1]" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="form.role.label" >
            <el-select v-model="form.role.key" placeholder="请选择">
              <el-option :label="item.title" :value="item.id" v-for="item in options[2]" :key="item.id"></el-option>
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
    import bubbleTip from '@/components/common/bubbleTip';
    import axios from 'axios';

    export default {
      components:{
        "bubbleTip":bubbleTip
      },
      name: "user-setting",
      data(){
        return {
          sysInfo:{}, //系统信息
          options: [], //下拉选项数组
          itemValue:[], //点击查询数据时条件数组
          tableData: [], //表格数据
          currentPage: 1, //当前页码
          pageSize: 20, //每页显示数量
          totalPageNum: 1,
          totalDataNumber: 20,
          curPageData:[], //当前页面数据
          groupPageData:[],
          accountInfoDialog:false, //新增修改账号弹窗标记
          deleteInfoDialog:false, //删除账号窗口标记
          form: {
            name: {label:"用户名", key:""},
            password:{label:"密码", key:""},
            department: {label:"部门", key:""},
            position: {label:"职位", key:""},
            role: {label:"角色", key:""}
          }, //新增修改窗口数据对象
          formTitle:"", //新增修改窗口标题
          isAdd:true, //新增账号标记
          bubbleTip:'',
          isReset:false, //重置密码标记
          phoneRegexp:/^0?(13|14|15|17|18|19)[0-9]{9}$/,
          curEditUserId:'', //修改账号id
          curEditUserPw:'', //修改账号密码
          toPageNum:""
        }
      },
      methods:{
        queryData(){
          /*根据筛选条件查询数据*/
          this.requestTableData(1);
        },
        currentPageChange(val) {
          /*当前页变动事件*/
          this.currentPage = val;
          this.requestTableData(val);
        },
        getCurPageData(data){
          /*根据请求表格数据分组*/

          let that = this;
          that.curPageData = data.data;
          that.totalDataNumber = data.paging.count;
          that.totalPageNum =  Math.ceil(Number(that.totalDataNumber) / that.pageSize);
        },
        toInputPage(){
          /*显示输入页表格数据*/
          var num = Number(this.toPageNum);
          this.requestTableData(num);
          this.currentPage = num;
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
            let temp = that.form[i].key;

            if(!temp){
              that.bubbleTipShow("请完善信息");
              return;
            }else {
              if(i == 'name'){
                if(!that.phoneRegexp.test(temp)){
                  that.bubbleTipShow("用户名格式不正确");
                  return;
                };
              }
            }
          }
          let userId;
          type?userId=0 : userId=that.curEditUserId;

          let config = {
            user_id : userId,
            phone : that.form.name.key,
            username : that.form.name.key,
            pwd : that.form.password.key,
            dept_id : that.form.department.key,
            posit_id : that.form.position.key,
            role_id : that.form.role.key,
            address : ""
          }

          that.$http.post('users_manage/users_addmodify',config).then(res=>{
            console.log(res);
            if(res.data.code ='0'){
              let message = type?"保存成功":"修改成功";
              that.bubbleTipShow(message);
              setTimeout(function () {
                that.accountInfoDialog = false;
                that.clearForm();
                that.requestTableData(1);
              },2000)
            }else {
              that.bubbleTipShow(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })

        },
        editAccount(val){
          /*修改信息*/
          console.log(val);
          this.accountInfoDialog = true;
          this.formTitle = '修改信息';
          this.isAdd = false;
          this.form.name.key = val.username;
          this.form.department.key = "";
          this.form.position.key = "";
          this.form.role.key = "";
          this.curEditUserId = val.user_id;
        },
        deleteAccount(val){
          var that = this;
          that.deleteInfoDialog = true;
          that.curEditUserId = val.user_id;
        },
        confirmDelete(){
          let that = this;
          let config = {
            user_id : that.curEditUserId
          }

          that.$http.post('users_manage/users_delete',config).then(res=>{
            if(res.data.code ='0'){
              that.isReset = false;
              that.bubbleTipShow('删除成功');
              setTimeout(function () {
                that.deleteInfoDialog = false;
                that.requestTableData(1);
              },2000)
            }else {
              that.bubbleTipShow(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
        },
        resetPw(){
          /*重置密码*/
          var that = this;
          that.isReset = true;
          var autoPw = (that.form.name.key).substr(5);

          let config = {
            user_id : that.curEditUserId,
            pwd : autoPw
          }

          that.$http.post('users_manage/users_reset_password',config).then(res=>{
            if(res.data.code ='0'){
              that.isReset = false;
              that.bubbleTipShow('重置成功');
            }else {
              that.bubbleTipShow(res.data.message);
            }
          }).catch(err=>{
            console.log(err);
          })
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
        },
        requestOptions(){
          /*获选下拉选项数据*/
          let that  = this;

          axios.all([
            that.$http.post('/users_manage/users_department',{
              project_id: that.sysInfo.projectId
            }),
            that.$http.post('/users_manage/users_dept_position',{
              project_id: that.sysInfo.projectId
            }),
            that.$http.post('/users_manage/users_roleinfo_list',{
              user_role_id:that.sysInfo.roleId
            })
          ]).then(axios.spread(function (departResp, positionResp,roleResp) {

            // 上面两个请求都完成后，才执行这个回调方法
            that.$store.state.permission.options[0] = that.options[0] = departResp.data.data;
            that.$store.state.permission.options[1] = that.options[1] = positionResp.data.data;
            that.$store.state.permission.options[2] = that.options[2] = roleResp.data.data;
            that.$forceUpdate();
          }));
        },
        requestTableData(curPageNum){
          /*请求表格数据*/
          let that = this;
          let config = {
            project_id : that.sysInfo.projectId,
            pagenumber : curPageNum,
            pagesize : that.pageSize,
            role_type : "",
            dept_id : that.itemValue[0],
            posit_id : that.itemValue[1],
            role_id : that.itemValue[2],
            username : that.itemValue[3],
            user_role_id : Number(that.sysInfo.roleId)
          }

          that.$http.post('users_manage/usersinfo',config).then(res=>{
            that.getCurPageData(res.data);
          }).catch(err=>{
            console.log(err);
          })
        }
      },
      created(){
        var that = this;
        that.sysInfo.projectId = that.$store.state.projectId;
        that.sysInfo.roleId = that.$store.state.userInfoTotal.role_info.role_id;
        that.sysInfo.roleType = that.$store.state.userInfoTotal.usergrouprolesyslist[0].role_type;
        var option = this.$store.state.permission.options;
        if(option.length){
          that.options = option;
        }else {
          that.requestOptions();
        }

        this.requestTableData(1);
      },
      mounted(){

      }
    }
</script>

<style scoped>


</style>
