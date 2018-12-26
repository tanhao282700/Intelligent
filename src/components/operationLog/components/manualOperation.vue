<template>
    <div class="tabsDomBox">
        <!--面包屑-->
        <div class="navCrumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>操作日志</el-breadcrumb-item>
            <el-breadcrumb-item>手动操作日志</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tableBox  borderShadow paddingTp0">
            <!-- 日志表格 -->
            <el-table :data="tableData" style="width: 100%;" height="100%">
              <el-table-column prop="x" label="" width="50"></el-table-column>
              <el-table-column prop="indexs" label="序号" align="cneter"></el-table-column>
              <el-table-column prop="time" label="操作时间" align="cneter"></el-table-column>
              <el-table-column prop="user_name" label="操作人"  align="cneter"></el-table-column>
              <el-table-column prop="floor_name" label="位置"  align="cneter"></el-table-column>
              <el-table-column prop="device_name" label="操作设备"  align="cneter"></el-table-column>
              <el-table-column prop="word" label="操作内容"  align="cneter"></el-table-column>
            </el-table>
            <!-- pages -->
            <div class="paginationBox">
              <div class="totalPageNumBox">共{{totalPageNum}}页</div>

              <div class="el-input el-pagination__editor is-in-pagination curPageBox">
                <input type="number" autocomplete="off" class="el-input__inner" v-model="currPage">
                <span @click="toInputPage">GO</span>
              </div>

              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                :page-count="totalPageNum"
                :total="total"
                layout="prev, pager, next"
              >
              </el-pagination>

            </div>

          </div>
     </div>
</template>

<script>
    export default {
        name: "manualOperation",
        data(){
            return {
              toPageNum:1,
              totalPageNum:1,
              total:0,
              tableData: [],
              pagesize:20,
              currentPage:1,
              currPage:1
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
              let that = this;
              this.$http.get('hvac_pc/pc/manual/control/record',{
                  pagenumber:this.currentPage,
                  pagesize:this.pagesize
              }).then(function(res){
                // 响应成功回调
                console.log(res);
                that.tableData = res.data.data;
                $.each(that.tableData,(i,k)=>{
                    k.indexs = (that.currentPage-1)*that.pagesize+1+i;
                })
                that.totalPageNum = Math.ceil(res.data.data.length / that.pagesize);
              }, function(response){
                // 响应错误回调
              });
            },
            toInputPage(){
              /*显示输入页表格数据*/
              this.currentPage = Number(this.currPage);
              this.getData();
            },
            handleSizeChange: function (size) {
              this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
              /*当前页变动事件*/
              this.currentPage =  Number(currentPage);
              this.currPage = this.currentPage;
              this.getData()
            },
        },
    }
</script>

<style scoped>

</style>
