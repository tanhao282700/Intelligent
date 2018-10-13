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
          <el-select placeholder="请选择" v-for="(items,index) in options" v-model=" itemValue[index] " :key="index" class="querySelectItem">
            <el-option
              v-for="item in items"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <!--新增用户-->
        <div>
          <el-button class="addNewUserBtn"><i></i><span>新增账号</span></el-button>
        </div>
      </div>

      <!--用户表格-->
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="code"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名(手机号)">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="position"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <a href="javascrtip:;" @click="handleClick(scope.row)" class="tableBtn">修改</a>
            <a href="javascrtip:;" @click="handleClick(scope.row)" class="tableBtn">删除</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
    export default {
      name: "user-setting",
      data(){
        return {
          options: [
            [
              {
                value: '工程部',
                label: '工程部'
              }, {
                value: '酒店部',
                label: '酒店部'
              }
            ],
            [
              {
                value: '经理',
                label: '经理'
              }, {
                value: '维修工',
                label: '维修工'
              }
            ],
            [
              {
                value: '强电运维',
                label: '强电运维'
              }, {
                value: '强电测试',
                label: '强电测试'
              }
            ]
          ],
          itemValue:['','',''],
          tableData: [
            {
              code: '01',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '02',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '03',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '04',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '05',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '06',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '07',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '08',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '09',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '10',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
            {
              code: '11',
              userName: '13888888888',
              nickName: '张三(默认手机)',
              department: '工程部',
              role: '维修工',
              position: '强电运维',
              createTime: '2018/06/02 16:55:23'
            },
          ]
        }
      },
      methods:{

      }
    }
</script>

<style scoped>
  .contentBox{
    height: calc(100% - 40px);
  }
  .itemsBox{
    height: 52px;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .itemsBox>div{
    height: 32px;
    width: auto;
  }
  .queryBox .el-select:not(:last-child){
    margin-right: 12px;
  }
  .addNewUserBtn{
    padding: 0;
    line-height: 32px;
    background-color: #209757;
    font-size: 14px;
    color: #fff;
    border: none;
    display: flex;
    height: 32px;
    align-items: center;
    justify-content: center;
  }
  .addNewUserBtn i{
    display: inline-block;
    vertical-align: middle;
    width:16px;
    height: 16px;
    background: url("../../assets/img/Permission/add-username.png") no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
    margin-top: -2px;
  }
  .tableBtn{
    color: #36FCEB;
    text-decoration: underline;
  }
</style>
