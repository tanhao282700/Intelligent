<template>
  <div class="permissionBox autoComponent fireAlarm">
    <SysHead :datas = "routerData" v-on:searchCont="search"/>
    <div class="userBox">
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>告警管理</el-breadcrumb-item>
      </el-breadcrumb>

      <!--内容模块-->
      <div class="contentBox boxs">
        <!--查询区-->
        <div class="itemsBox">
          <!--筛选查询-->
          <div class="queryBox">
            <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="itemValue[index]" :key="index" class="querySelectItem">
              <el-option
                v-for="item in items.data"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker
              v-model="itemValue[4]"
              type="daterange"
              size="mini"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div>
              <el-button class="queryDataBtn queryBoxBtn" ><i></i><span>查询</span></el-button>
            </div>
          </div>

          <!--导出-->
          <div>
            <el-button class="addNewUserBtn queryBoxBtn export" ><i></i><span>导出</span></el-button>
          </div>
        </div>

        <!--用户表格-->
        <div class="userTableContainer">
          <!--<el-table
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
          </el-table>-->

          <!--分页器-->
          <!--<div class="paginationBox">
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

          </div>-->

        </div>


      </div>

    </div>
  </div>
</template>

<script>
  import SysHead from '@/components/common/sysHead';
  import "../../assets/css/Permission/permission.css";

  export default {
    components: {
      "SysHead":SysHead
    },
    name: "fireAlarm",
    data(){
      return {
        routerData: {
          id: 0,
          lists: [
            {id: 0, name: '告警管理', route: '/fireAlarm'},
          ]
        },
        options: [
          {
            placeHolder: '报警级别',
            data: [{
              "value": "工程部",
              "label": "工程部"
            }, {
              "value": "酒店部",
              "label": "酒店部"
            }]
          }, {
            placeHolder: '子系统',
            data: [{
              "value": "工程部",
              "label": "工程部"
            }, {
              "value": "酒店部",
              "label": "酒店部"
            }]
          }, {
            placeHolder: '楼层',
            data: [{
              "value": "工程部",
              "label": "工程部"
            }, {
              "value": "酒店部",
              "label": "酒店部"
            }]
          }, {
            placeHolder: '设备',
            data: [{
              "value": "工程部",
              "label": "工程部"
            }, {
              "value": "酒店部",
              "label": "酒店部"
            }]
          }
        ],
        itemValue:[],
      }
    },
    methods:{
      search(param){
        console.log(param);
      },
      queryData(){}
    },
    created(){

    },
    mounted(){

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .fireAlarm .el-range-input{
    width:80px!important;
    background:none;
    color:white;
  }
  .fireAlarm .el-range-separator{
    color:white;
  }
  .fireAlarm .export{
    width:0.88rem;
    background-color: #3A84EE!important;
  }
  .fireAlarm .export i{
    background:url(../../assets/img/Alarm/export.png)
  }
</style>
