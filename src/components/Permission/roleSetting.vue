<template>
  <div class="userBox roleBox">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!--内容模块-->
    <div class="contentBox boxs">
      <!--查询区-->
      <div class="itemsBox">
        <!--筛选查询-->
        <div class="queryBox">
          <!--<el-select placeholder="请选择" v-model="itemValue[0]" class="querySelectItem">
            <el-option
              v-for="item in options[0]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select placeholder="请选择" v-model="itemValue[1]" class="querySelectItem">
            <el-option
              v-for="item in options[1]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>-->
          <el-select placeholder="请选择" v-model="itemValue[0]" class="querySelectItem">
            <el-option
              v-for="item in options[2]"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
          <div>
            <el-button class="queryDataBtn queryBoxBtn" @click="queryData"><i></i><span>查询</span></el-button>
          </div>
        </div>

        <!--新增用户-->
        <div>
          <el-button class="addNewRoleBtn queryBoxBtn" @click="addAccount"><i></i><span>新增角色</span></el-button>
        </div>
      </div>

      <!--角色表格-->
      <div class="userTableContainer">
        <el-table
          v-loading="userLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          :data="curPageData"
          style="width: 100%"
          class="tableAlignCenter tableHeadBlue roleSetTable">
          <el-table-column
            prop="code"
            label="编号"
            min-width="7%">
          </el-table-column>
          <el-table-column
            prop="title"
            label="角色"
            min-width="11%">
          </el-table-column>
          <el-table-column
            prop="sys_menu"
            label="权限查看"
            min-width="33%">
          </el-table-column>
          <el-table-column
            prop="create_date"
            label="创建时间"
            min-width="14%">
          </el-table-column>
          <el-table-column
            prop="id"
            label="操作"
            min-width="11%">
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
            :total="totalDataNumber">
          </el-pagination>

        </div>

      </div>

      <!--新增或修改信息弹窗-->
      <el-dialog :title="formTitle" :visible.sync="accountInfoDialog" class="dialogBox" :close-on-click-modal="false" @close="clearForm">
        <el-form :model="form">
          <el-form-item :label="form.role.label" >
            <el-input v-model="form.role.key" autocomplete="off" placeholder="输入角色名称"></el-input>
          </el-form-item>
          <el-form-item :label="form.powerRange.label" class="powerSelectBox">
            <el-select v-model="form.powerRange.key" placeholder="选择权限"  @visible-change="powerSelectBlur" ref="powerSelectEl">
              <el-option :value="powerValue">
                <el-tree
                  :data="powerArray"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="tree"
                  highlight-current
                  :props="defaultProps"
                  @check-change="nodeChange">
                </el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveNewAccount(isAdd)" class="saveBtn">保存</el-button>
          <el-button @click="cancleSave" class="cancleBtn">取消</el-button>
        </div>
        <bubbleTip :tipText="bubbleTip"/>
      </el-dialog>

      <!--删除信息弹窗-->
      <el-dialog :visible.sync="deleteInfoDialog" class="dialogBox deleteInfoDialog" :close-on-click-modal="false">
        <div class="deleteTextBox">是否确定删除此信息？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmDelete()" class="saveBtn">确定</el-button>
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
    name: "role-setting",
    data(){
      return {
        userLoading:true,
        sysInfo:{}, //系统信息
        options: [], //下拉选项数组
        itemValue:[], //点击查询数据时条件数组
        tableData: [], //表格数据
        currentPage: 1, //当前页码
        pageSize: 20, //每页显示数量
        totalPageNum: 1,
        totalDataNumber: 20,
        curPageData:[],
        groupPageData:[],
        accountInfoDialog:false,
        deleteInfoDialog:false,
        isAdd:false,
        curEditRoleId:"",
        toPageNum: 1,
        form: {
          role: {label:"角色名", key:""},
          powerRange: {label:"权限设置", key:""}
          /*department: {label:"部门", key:""},
          position: {label:"职位", key:""},*/
        },
        formTitle:"",
        bubbleTip:'',
        powerValue:"",
        powerArray:[],
        defaultProps: {
          children: 'child',
          label: 'title'
        },
        role_sys_list:'',
        checkedListItems:[],
        /*disabledSelectedItems:{
          1:['3','4'],
          2:['1','2','3'],
          25:['2'],
          34:['3','4'],
          36:['2','3'],
          40:['2']
        }*/
        disabledSelectedItems:{

      }
      }
    },
    methods:{
      removeDisItem(res){
        let expObj = this.disabledSelectedItems;
        for(let val of res){
          for(let key1 in expObj){
            if( val.sys_id == key1){

              let temp = expObj[key1];
              for(let x of temp){
                let index = val.ids.indexOf(x);
                if(index > -1){
                  val.ids.splice(index,1);
                }
              }

            }
          }
        }

        return res;
      },
      powerSelectBlur(status){
        if(!status){
          this.form.powerRange.key=this.powerValue;
          this.$refs.powerSelectEl.blur();
        }
      },
      cancleSave(){
        this.clearNodes();
        this.accountInfoDialog = false;
      },
      nodeChange(){
        let that = this;
        var sysList = [];
        let nodes = that.$refs.tree.getCheckedNodes(false,true);
        let tempObj = { ids:[] };
        let Len = nodes.length;
        let tempValue = "";

        if(Len){
          for(var i=0; i<Len; i++) {
            var temp = nodes[i];
            i?tempValue+="/"+temp.title:tempValue=temp.title;

            if(temp.hasOwnProperty("sys_id")){
              if(i == 0){
                tempObj.sys_id = temp.sys_id;
                tempObj.role_string = temp.role_string;
              }else {
                sysList.push(tempObj);
                tempObj = { ids:[] };
                tempObj.sys_id = temp.sys_id;
                tempObj.role_string = temp.role_string;
              }
            }else {
              var metaId = temp.id;
              var metaIndex = metaId.indexOf('_')+1;
              var actuId  = metaId.substr(metaIndex);

              tempObj.ids.push(actuId);
              if(i==Len-1){
                sysList.push(tempObj);
                sysList = that.removeDisItem(sysList);
                that.role_sys_list = JSON.stringify(sysList);
                that.powerValue = tempValue;
                return;
              }
            }
          }
        }

      },
      clearNodes(){
        let that = this;
        that.$refs.tree.setCheckedNodes([]);
        that.role_sys_list = [];
      },
      queryData(){
        /*根据筛选条件查询数据*/
        this.requestTableData(1);
      },
      currentPageChange(val) {
        /*当前页变动事件*/
        this.currentPage = this.toPageNum = val;
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
        this.formTitle = '新增角色';
        this.isAdd = true;
        var checkedList = this.checkedListItems;

        let that = this;
        setTimeout(function(){
          that.$refs.tree.setCheckedKeys(checkedList);
        },1000)
      },
      saveNewAccount(type){
        /*保存新增帐号*/
        let that = this;
        for(var i in that.form){
          let temp = that.form[i].key;
          if(!temp){
            that.bubbleTipShow("请完善信息");
            return;
          }
        }
        var idFlag;
        type?idFlag=0 : idFlag=that.curEditRoleId;

        let sysList = that.role_sys_list;

        let config = {
          project_id : that.$store.state.projectId,
          id : idFlag,
          role_name : that.form.role.key,
          role_sys_list : sysList
        }

        console.log(config);

        that.$http.post('users_manage/users_role_addmodify',config).then(res=>{
          if(res.data.code =='0'){
            let message = type?"保存成功":"修改成功";
            that.bubbleTipShow(message);
            if(type){that.requestOptions()};
            setTimeout(function () {
              that.accountInfoDialog = false;
              that.clearForm();
              that.clearNodes();
              that.requestTableData(1);
              that.requestOptions();
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
        this.isAdd = false;
        this.accountInfoDialog = true;
        this.formTitle = '修改角色';
        this.form.role.key = val.title;
        this.form.powerRange.key = this.role_sys_list = val.sys_menu;
        this.curEditRoleId = val.id;

        let that = this;
        let config = {
          role_id:val.id
        }
        that.$http.post("users_manage/users_roleid_info",config).then(res=>{
          console.log(res);
          if(res.data.code == 0){
            let checkedList = res.data.data.chk_data;
            that.$refs.tree.setCheckedKeys(checkedList);
            let role_data = res.data.data.role_data
            that.disabledSelectedItems = {}
            role_data.map((item,index)=>{
                if(item.child){
                    item.child.map((list,index2)=>{
                        if(list.child&&list.child.length>0){
                            if(that.disabledSelectedItems[item.id]){
                              that.disabledSelectedItems[item.id].push((index2+1).toString())
                            }else{
                              that.disabledSelectedItems[item.id] = []
                              that.disabledSelectedItems[item.id].push((index2+1).toString())
                            }
                        }
                    })
                }
            })
            console.log(that.disabledSelectedItems)
          }
        }).catch(err=>{

        })
      },
      deleteAccount(val){
        this.deleteInfoDialog = true;
        this.curEditRoleId = val.id;
      },
      confirmDelete(){
        let that = this;
        let config = {
          role_id: that.curEditRoleId
        }

        that.$http.post('users_manage/users_role_delete',config).then(res=>{
          if(res.data.code =='0'){
            that.bubbleTipShow('删除成功');
            that.requestTableData(1);
            that.requestOptions();
            setTimeout(function () {
              that.deleteInfoDialog = false;
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
      },
      requestOptions(){
        /*获选下拉选项数据*/
        let that  = this;
        that.sysInfo.projectId = that.$store.state.projectId;
        that.sysInfo.roleId = that.$store.state.userInfoTotal.role_info.role_id;
        that.sysInfo.roleType = that.$store.state.userInfoTotal.usergrouprolesyslist[0].role_type;

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
          var optionArray = [];
          optionArray[0] = departResp.data.data;
          optionArray[1] = positionResp.data.data;
          optionArray[2] = roleResp.data.data;

          for(var val of optionArray){
            var temp = {id: "" ,title: "请选择"};
            val.unshift(temp);
          }
          that.$store.state.permission.options = that.options = optionArray;
          that.$forceUpdate();
        }));
      },
      requestTableData(curPageNum){
        /*请求表格数据*/
        let that = this;
        that.userLoading = true;
        let config = {
          pagenumber : curPageNum,
          pagesize : that.pageSize,
          user_role_id : that.$store.state.userInfoTotal.role_info.role_id,
          role_id : that.itemValue[0]
        }
        that.$http.post('users_manage/users_role_manage',config).then(res=>{
          that.userLoading = false;
          that.getCurPageData(res.data);
        }).catch(err=>{
          console.log(err);
          that.userLoading = false;
        })
      },
      requestPowerList(){
        let that = this;
        let config = {
          project_id:that.$store.state.projectId
        }

        that.$http.post('users_manage/users_setRole',config).then(res=>{
          console.log(res);
          if(res.data.code =='0'){
            that.powerArray = res.data.data.role_data;
            that.checkedListItems = res.data.data.chk_data;
          }else {

            that.bubbleTipShow(res.data.message);
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    created(){
      var that = this;
      var option = that.$store.state.permission.options;
      if(option.length>0){
        that.options = option;
      }else {
        that.requestOptions();
      }

      that.requestTableData(1);
    },
    mounted(){
      this.requestPowerList();
    }
  }
</script>

<style scoped>

</style>
