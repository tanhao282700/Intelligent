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
          <el-select placeholder="请选择" v-model="itemValue[0]" class="querySelectItem">
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
          </el-select>
          <el-select placeholder="请选择" v-model="itemValue[2]" class="querySelectItem">
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
          :data="curPageData"
          style="width: 100%"
          height="500"
          class="tableAlignCenter tableHeadBlue roleSetTable">
          <el-table-column
            prop="code"
            label="编号"
            min-width="7%">
          </el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            min-width="11%">
          </el-table-column>
          <el-table-column
            prop="powerRange"
            label="权限查看"
            min-width="33%">
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
            prop="createTime"
            label="创建时间"
            min-width="14%">
          </el-table-column>
          <el-table-column
            prop="operation"
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
          <el-form-item :label="form.role.label" >
            <el-input v-model="form.role.key" autocomplete="off" placeholder="输入角色名称"></el-input>
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
    name: "role-setting",
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
        curPageData:[],
        groupPageData:[],
        accountInfoDialog:false,
        deleteInfoDialog:false,
        isAdd:false,
        form: {
          role: {label:"角色名", key:""},
          department: {label:"部门", key:""},
          position: {label:"职位", key:""},
          powerRange: {label:"权限设置", key:""}
        },
        formTitle:"",
        bubbleTip:'',
        powerValue:"",
        powerArray:[
          {
            id:1,
            label:"能源管理系统",
            children:[
              {id:4,label:"全景查看"},
              {id:5,label:"运行情况"}
            ]
          },
          {
            id:2,
            label:"酒店管理系统",
            children:[
              {id:6,label:"酒店房态"},
              {id:7,label:"房单"},
              {id:8,label:"报表"}
            ]
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
      powerSelectBlur(status){
        if(!status){
          this.form.powerRange.key=this.powerValue;
          this.$refs.powerSelectEl.blur();
        }
      },
      nodeChange(){
        let that = this;
        let nodes = this.$refs.tree.getCheckedNodes();
        let temp = '';
        if(nodes.length){
          for(var v in nodes){
            v!=0?temp +="/"+nodes[v].label:temp=nodes[0].label;
          }
          that.powerValue = temp;
        }
      },
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
        this.formTitle = '新增角色';
        this.isAdd = true;
      },
      saveNewAccount(type){
        /*保存新增帐号*/
        let that = this;
        for(var i in that.form){
          let temp = that.form[i].key;
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
        this.isAdd = false;
        this.accountInfoDialog = true;
        this.formTitle = '修改角色';
        this.form.role.key = val.role;
        this.form.department.key = val.department;
        this.form.position.key = val.position;
        this.form.powerRange.key = val.powerRange;
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
      var that = this;
      var option = this.$store.state.permission.options;
      if(option){
        that.options = option;
      }

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
