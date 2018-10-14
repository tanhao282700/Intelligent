<template>
    <div class="doorInfo"> 
        <div class="doorExportPanel">
            <span>消防通道 {{doorN}} 号门信息</span>
            <button class="btn floatRt">导出</button>
            <a class="closeDoorInfo" @click="doorInfoHide">×</a>
        </div>
        <div class="doorInfoBgBox">
            <div class="tableBox">
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                    <el-table-column prop="serialNumber" label="编号" align="cneter"></el-table-column>
                    <el-table-column prop="policyName" label="ID卡号" align="cneter"></el-table-column>
                    <el-table-column prop="name" label="姓名"  align="cneter"></el-table-column>
                    <el-table-column prop="policyNumber" label="部门"  align="cneter"></el-table-column>
                    <el-table-column prop="policyAttr" label="卡类型"  align="cneter"></el-table-column>
                    <el-table-column prop="powerType" label="设备名称"  align="cneter"></el-table-column>
                    <el-table-column prop="policyType" label="门名称" align="cneter"></el-table-column>
                    <el-table-column prop="date" label="开门时间" width="200" align="cneter"></el-table-column>
                    <el-table-column prop="tag" label="开门事件" width="100" > 
                        <template slot-scope="scope">
                            <a class="cursor" @click="handleEdit(scope.$index, scope.row)">{{scope.row.tag}}</a>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :page-size="pagesize" 
                    :current-page="currentPage" 
                    :page-sizes="[10, 20, 50, 100]"
                    :total="tableData.length"
                    background 
                    layout="total, sizes, prev, pager, next, jumper" >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:["info","hid"],
        data () {
        	return {
              doorN:'5',
              tableData: [],
              pagesize:10,
              currentPage:1,
        	}
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                var that = this;
                this.$http.get('../../../static/tableDemo.json').then(function(response){
                    // 响应成功回调
                    console.log(response)
                    console.log(response.data)
                    that.tableData = response.data
                }, function(response){
                    // 响应错误回调
                    console.log("ccc")
                    console.log(response)
                });
            },
            doSearch(){},
            addPolicy(){},
            handleEdit(index, row){ console.log(row.name) },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
            doorInfoHide(){
                this.$emit("doorInfoHide",false);
            }
        }
    }
</script>

<style type="text/css">

</style>