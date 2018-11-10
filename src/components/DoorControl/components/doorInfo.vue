<template>
    <div class="doorInfo"> 
        <div class="doorExportPanel">
            <span>消防通道 {{doorInfoId}} 信息</span>
            <button class="btn floatRt" @click="exportTable"><i class="exportIcon"></i>导出</button>
            <a class="closeDoorInfo" @click="doorInfoHide">×</a>
        </div>
        <div class="doorInfoBgBox">
            <div class="tableBox">
                <el-table :data="tableData" style="width: 100%;height:100%;">
                    <el-table-column prop="show_id" label="编号" align="cneter"></el-table-column>
                    <el-table-column prop="id_card" label="ID卡号" align="cneter"></el-table-column>
                    <el-table-column prop="name" label="姓名"  align="cneter"></el-table-column>
                    <el-table-column prop="department" label="部门"  align="cneter"></el-table-column>
                    <el-table-column prop="card_type" label="卡类型"  align="cneter"></el-table-column>
                    <el-table-column prop="device_name" label="设备名称"  align="cneter"></el-table-column>
                    <el-table-column prop="door_name" label="门名称" align="cneter"></el-table-column>
                    <el-table-column prop="open_datetime" label="开门时间" align="cneter"></el-table-column>
                    <el-table-column prop="tag" label="开门事件"> 
                        <template slot-scope="scope">
                            <a class="cursor" @click="handleEdit(scope.$index, scope.row)">{{scope.row.open_event}}</a>
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
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-count="totalPageNum"
                    layout="prev, pager, next"
                    >
                  </el-pagination>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["doorInfoId","doorInfomation","doorDeviceId","floorIds"],
        data () {
        	return {
                toPageNum:1,
                totalPageNum:3,
                total:0,
                tableData: [],
                pagesize:20,
                currentPage:1,
                currPage:''
        	}
        },
        watch:{
            doorInfomation(newval,oldval){
                this.tableData = newval;
            }
        },
        mounted(){
           
        },
        methods:{
            getData(){

                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:that.floorIds,
                    device_id:that.doorDeviceId
                }).then(function(response){
                    // 响应成功回调
                    console.log(response.data.data);
                    that.tableData = response.data.data.entrance_guard_record;
                }, function(response){
                    // 响应错误回调
                });
            
            
            },
            exportTable(){
                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:1,
                    export:1,
                }).then(function(response){
                    // 响应成功回调
                    //http://images.china-tillage.com/门禁系统门禁记录20181031124347.xls
                    var str = "http://"+response.data;
                    console.log(str);
                    window.open(str);
                    //that.downExcelA();
                    
                }, function(response){
                    // 响应错误回调
                });
            },
            toInputPage(){
              /*显示输入页表格数据*/
              this.currentPage = Number(this.currPage);
              this.getData();
            },
            doSearch(){},
            addPolicy(){},
            handleEdit(index, row){  },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage =  Number(currentPage);
                this.currPage = this.currentPage;
                this.getData()
            },
            doorInfoHide(){
                this.$emit("doorInfoHide",false);
            }
        }
    }
</script>

<style type="text/css">

</style>