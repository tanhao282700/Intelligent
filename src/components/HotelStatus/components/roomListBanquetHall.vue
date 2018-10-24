<template>
	<div class="roomListAll">
		<div class="roomListSearchPanel">
            <el-select v-model="roomListAllNumber" placeholder="宴会厅">
                <el-option v-for="(item,index) in roomListAllNumbers" :label="item.num" :value="item.num" :key="index"></el-option>
            </el-select>
            <div class="roomListDatePicker roomListDatePickerDef">
			    <el-date-picker v-model="datetimerange" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <button class="btn"><i class="el-icon-search"></i>搜索</button>
		</div>
        <div class="tableBox">
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column type="index" label="序号" align="cneter"></el-table-column>
                <el-table-column prop="descript" label="预定大厅" align="cneter"></el-table-column>
                <el-table-column prop="biz_date" label="预定日期"  align="cneter"></el-table-column>
                <el-table-column prop="res_name" label="预定人"  align="cneter"></el-table-column>
                <el-table-column prop="phone" label="预定人手机号"  align="cneter"></el-table-column>
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
</template>

<script>


    export default {
        components:{
        	
        },
	    data() {
	        return {
	        	datetimerange:'',
	        	roomListAllSta:'',
	        	roomListAllNumber:'',
	        	roomListAllNumbers:[
	        		{num:'水浒厅',},
	        		{num:'流星厅',},
	        		{num:'三国厅',},
	        		{num:'西游记厅',},
	        	],
				tableData: [],
                pagesize:10,
                currentPage:1,
	        };
	    },
        mounted(){
            this.getData()
        },
	    methods: {
            getData(){
                var that = this;
                this.$http.post('/hotel/singe_room',{
                    page:1,
                    // type:0,
                    num:10,
                }).then(function(data){
                    //响应成功回调
                    console.log(data);
                    that.tableData = data.data.data;
                }, function(data){
                    // 响应错误回调
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
	    }
    }
</script>

<style>
 


</style>
