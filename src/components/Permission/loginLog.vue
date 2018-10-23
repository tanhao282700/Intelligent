<template>
    <div class="userBox loginLogBox">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!--内容模块-->
      <div class="contentBox boxs">
        <!--查询区-->
        <div class="itemsBox">
          <!--筛选查询-->
          <div class="queryBox">
            <el-date-picker
              v-model="dateRangeValue"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-M-d"
              value-format="yyyy-MM-dd"
              class="dateRangeBox">
            </el-date-picker>
            <div>
              <el-button class="queryDataBtn queryBoxBtn" @click="queryData"><i></i><span>查询</span></el-button>
            </div>
          </div>
        </div>

        <!--日志表格-->
        <div class="userTableContainer loginLogTable">
          <el-table
            :data="curPageData"
            style="width: 100%"
            height="482"
            stripe>
            <el-table-column
              type="index"
              label="序号"
              min-width="8%">
            </el-table-column>
            <el-table-column
              prop="username"
              label="帐号"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="dept_name"
              label="所属部门"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="ip"
              label="IP地址"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="login_date"
              label="登录时间"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="keys"
              label="操作"
              min-width="12%">
              <template slot-scope="scope">
                <a href="javascrtip:;" @click="lookDetail(scope.row)" class="tableBtn">日志详情</a>
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

        <!--日志详情弹窗-->
        <el-dialog :title="logDetailTitle+' 日志详情'" :visible.sync="logDetailDialog" class="dialogBox loginLogDialogBox" :close-on-click-modal="false">
          <div class="detailItem" v-for="item in detailData">
            <div class="detailTitle"><span>{{item.login_date}}</span><i>|</i><span>{{item.username}}</span></div>
            <div class="detailDes">{{item.content}}</div>
          </div>
        </el-dialog>
      </div>

    </div>

</template>

<script>
  import tableData from './Data/loginData.json';
  import logDetailData from './Data/logDetailData.json';

    export default {
      name: "login-log",
      data(){
          return{
            dateRangeValue:[''],
            tableData: [],
            currentPage: 1,
            pageSize: 20,
            totalPageNum: 1,
            totalDataNumber:0,
            curPageData:[],
            groupPageData:[],
            logDetailDialog:false,
            logDetailTitle: "" ,
            toPageNum:"",
            detailData:""
          }
      },
      methods:{
        queryData(){
          /*根据日期区间查询*/
          this.requestTableData(1);
        },
        currentPageChange(val) {
          /*当前页变动事件*/
          this.currentPage = val;
          this.requestTableData(val);
        },
        toInputPage(){
          /*显示输入页表格数据*/
          var num = Number(this.toPageNum);
          this.requestTableData(num);
          this.currentPage = num;
        },
        lookDetail(val){
          console.log(val);
          let that = this;
          this.logDetailDialog = true;
          this.logDetailTitle = val.username;

          let config = {
            keys : val.keys
          }
          that.$http.post('users_manage/users_login_log_details',config).then(res=>{
            console.log(res);
            that.detailData = res.data.data;
          }).catch(err=>{
            console.log(err);
          })

        },
        requestTableData(curPageNum){
          /*请求表格数据*/
          let that = this;
          let config = {
            pagenumber : curPageNum,
            pagesize : that.pageSize,
            date_s : that.dateRangeValue[0],
            date_e : that.dateRangeValue[1]
          }
          that.$http.post('users_manage/users_login_log',config).then(res=>{
            console.log(res);
            that.getCurPageData(res.data);
          }).catch(err=>{
            console.log(err);
          })
        },
        getCurPageData(data){
          /*根据请求表格数据分组*/
          let that = this;
          that.curPageData = data.data;
          that.totalDataNumber = data.paging.count;
          that.totalPageNum =  Math.ceil(Number(that.totalDataNumber) / that.pageSize);
        },
        getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var Nowdate = year + seperator1 + month + seperator1 + strDate;
          var startDate = year + seperator1 + month + seperator1 + (strDate - 7);
          this.dateRangeValue[1] = Nowdate;
          this.dateRangeValue[0] = startDate;
          this.requestTableData(1);
        }
      },
      created(){
        this.getNowFormatDate();

      },
      mounted(){

      }
    }
</script>

<style scoped>
  .dateRangeBox{
    width: 2.5rem!important;
    padding: 0 .2rem;
    position: relative;
  }

</style>
