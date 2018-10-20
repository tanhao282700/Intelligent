<template>
	<div class="roomListAll">
		<div class="roomListSearchPanel">
            <el-select v-model="roomListAllSta" placeholder="状态选择">
                <el-option label="住脏" value="1"></el-option>
                <el-option label="住净" value="2"></el-option>
                <el-option label="空脏" value="3"></el-option>
                <el-option label="空净" value="4"></el-option>
                <el-option label="锁门" value="5"></el-option>
                <el-option label="维修" value="6"></el-option>
            </el-select>
            <el-select v-model="roomListAllNumber" placeholder="房间号">
                <el-option v-for="(item,index) in roomListAllNumbers" :label="item.num" :value="item.num" :key="index"></el-option>
            </el-select>
            <div class="roomListDatePicker">
            	<el-date-picker
			      v-model="datetimerange"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
            </div>
            <button class="btn"><i class="el-icon-search"></i>搜索</button>
		</div>
        <div class="tableBox">
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                <el-table-column prop="serialNumber" label="序号" align="cneter"></el-table-column>
                <el-table-column prop="policyName" label="房间状态" align="cneter"></el-table-column>
                <el-table-column prop="name" label="房间号"  align="cneter"></el-table-column>
                <el-table-column prop="policyNumber" label="入住人"  align="cneter"></el-table-column>
                <el-table-column prop="policyAttr" label="手机号"  align="cneter"></el-table-column>
                <el-table-column prop="powerType" label="入住人数"  align="cneter"></el-table-column>
                <el-table-column prop="policyType" label="入住时间" align="cneter"></el-table-column>
                <el-table-column prop="date" label="退房时间" width="200" align="cneter"></el-table-column>
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
	        		{num:101,},
	        		{num:102,},
	        		{num:103,},
	        		{num:104,},
	        		{num:105,},
	        		{num:106,},
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
	    }
    }
</script>

<style>
 

</style>
