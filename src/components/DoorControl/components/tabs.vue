<template>
    <div class="tabsDomBox"> 
        <div class="navCrumbs">首页 > 门禁系统 > <span>门禁记录</span></div>
        <div class="borderShadow">
            <div class="searchConditionBox">
                <div class="dateBox">
                    <el-date-picker v-model="releasetime1" type="date" placeholder="选择开始时间"></el-date-picker>
                </div>
                <div class="dateBox">
                    <el-date-picker v-model="releasetime2" type="date" placeholder="选择结束时间"></el-date-picker>
                </div>
                <div class="dateBox">
                    <el-input v-model="enternameinput" type="text" placeholder="请输入设备名称或门名称"></el-input>
                </div>
                <button class="btn btnSearch"><i class="el-icon-search"></i>查询</button>
                <button class="btn btnExport floatRt"><i class="el-icon-search"></i>导出</button>
            </div>
            <div class="tableBox">
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                    <el-table-column prop="show_id" label="编号" align="cneter"></el-table-column>
                    <el-table-column prop="id_card" label="ID卡号" align="cneter"></el-table-column>
                    <el-table-column prop="name" label="姓名"  align="cneter"></el-table-column>
                    <el-table-column prop="department" label="部门"  align="cneter"></el-table-column>
                    <el-table-column prop="card_type" label="卡类型"  align="cneter"></el-table-column>
                    <el-table-column prop="device_name" label="设备名称"  align="cneter"></el-table-column>
                    <el-table-column prop="door_name" label="门名称" align="cneter"></el-table-column>
                    <el-table-column prop="open_datetime" label="开门时间" width="200" align="cneter"></el-table-column>
                    <el-table-column prop="tag" label="开门事件" width="100" > 
                        <template slot-scope="scope">
                            <a class="cursor" @click="handleEdit(scope.$index, scope.row)">{{scope.row.open_event}}</a>
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
    	props:['pageType'],
        data () {
        	return {
				//时间
                releasetime1:"",
				releasetime2:"",
				//设备名称或者门名称
				enternameinput: '',
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
                this.$http.post('/entrance/record',{
                    sys_menu_id:15,
                    project_id:1,
                    floor_id:1,
                }).then(function(response){
                    // 响应成功回调
                    //console.log(response.data.data);
                    that.tableData = response.data.data.entrance_guard_record;
                }, function(response){
                    // 响应错误回调
                });
            },
            doSearch(){},
            addPolicy(){},
            handleEdit(index, row){  },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
            },
        }
    }
</script>

<style type="text/css">

</style>