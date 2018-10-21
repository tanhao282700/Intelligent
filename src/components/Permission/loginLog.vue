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
              prop="account"
              label="帐号"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="department"
              label="所属部门"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="ip"
              label="IP地址"
              min-width="20%">
            </el-table-column>
            <el-table-column
              prop="loginTime"
              label="登录时间"
              min-width="20%">
            </el-table-column>
            <el-table-column
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

        <!--日志详情弹窗-->
        <el-dialog :title="logDetailTitle+' 日志详情'" :visible.sync="logDetailDialog" class="dialogBox loginLogDialogBox" :close-on-click-modal="false">
          <div class="detailItem" v-for="item in detailData">
            <div class="detailTitle"><span>{{item.time}}</span><i>|</i><span>{{item.userName}}</span></div>
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
            dateRangeValue:"",
            tableData: [],
            currentPage: 1,
            pageSize: 20,
            totalPageNum: '',
            totalDataNumber:'',
            curPageData:[],
            groupPageData:[],
            logDetailDialog:false,
            logDetailTitle:"",
            detailData:logDetailData
          }
      },
      methods:{
        queryData(){
          /*根据日期区间查询*/
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
        lookDetail(val){
          this.logDetailDialog = true;
          this.logDetailTitle = val.account;
        }
      },
      created(){
        if(tableData){
          this.tabelDataGroupBy();
        }
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
