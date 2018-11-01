<template>
    <!-- 用能预设模块 -->
    <div class="reportTabBoxs">
    	<div class="reportTabBoxsHead">
            <el-select v-model="dateTypeChoose" placeholder="日" @change="currentSel">
                <el-option label="日" value="1"></el-option>
                <el-option label="月" value="2"></el-option>
            </el-select>
            <span class="todaySpan">{{todaySpan}}</span>
	        <button class="btn">查询</button>
	        <button class="btn btnExport floatRt">导出</button>
    	</div>
    	<div class="reportTablesBox reportLeader">

	    	<el-table  :data="tableData3"  :cell-class-name="cell"
	    			   :summary-method="getSummaries" 
	    			   show-summary>
	    		<el-table-column type="index" label="序号">
	    		</el-table-column>
	    		<el-table-column prop="date" label="名称">
	    			<el-table-column prop="date" label="指标">
	    			</el-table-column>
	    		</el-table-column>
	    		<el-table-column  label="合计">
	    			<el-table-column prop="city" label="去年昨天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="上一天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="昨天">
	    			</el-table-column>
	    		</el-table-column>
	    		<el-table-column  label="客房">
	    			<el-table-column prop="city" label="去年昨天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="上一天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="昨天">
	    			</el-table-column>
	    		</el-table-column>
	    		<el-table-column  label="餐饮">
	    			<el-table-column prop="city" label="去年昨天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="上一天">
	    			</el-table-column>
	    			<el-table-column prop="city" label="昨天">
	    			</el-table-column>
	    		</el-table-column>
	    	</el-table>
    		
    	</div>
    </div>
</template>

<script>
    export default {
        data(){
        	return{
        		dateTypeChoose:'',
        		todaySpan:'',
        		releasetime1:'',
        		tableData3: [{
		          city: 4,
		        }, {
		          city: 4,
		        }, {
		          city: 4,
		        }, {
		          city: 4,
		        }, {
		          city: 4,
		        }, {
		          city: 4,
		        }, {
		          city: 4,
		        }]
        	}
        },
        mounted(){
            this.getDateSet();
        },
        methods:{
        	currentSel(selVal){
        		console.log(selVal);
        	},
		    cell({row, column, rowIndex, columnIndex}) {
		      //加 类
		        if(columnIndex == 2 || columnIndex == 3 || columnIndex == 4 ||columnIndex == 5 ||columnIndex == 6 || columnIndex == 7 || columnIndex == 8 ||columnIndex == 9 ||columnIndex == 10 ){
		        	return 'darkOr'

		        }
		    },
        	getDateSet(){
        		var sDate = new Date()
        		var yyyy = sDate.getFullYear();
        		var mm = sDate.getMonth() + 1;
        		var dd = sDate.getDate();
        		mm = mm < 10?'0'+mm:mm;
        		dd = dd < 10?'0'+dd:dd;
        		this.todaySpan = yyyy + '-' + mm + '-' + dd;
        	},
        	getSummaries(param) {
		        const { columns, data } = param;
		        const sums = [];
		        columns.forEach((column, index) => {
		        	console.log(column);
		        	console.log(index);
		          if (index === 0) {
		            sums[index] = '13';
		            return;
		          }else if(index === 1){
		            sums[index] = '营业收入总额 (万元)';
		            return;
		          }
		          if(index == 2 || index == 3 || index == 4){
		          	 column.colSpan = 3;
		          }
		          const values = data.map(item => Number(item[column.property]));
		          if (!values.every(value => isNaN(value))) {
		            sums[index] = values.reduce((prev, curr) => {
		              const value = Number(curr);
		              if (!isNaN(value)) {
		                return prev + curr;
		              } else {
		                return prev;
		              }
		            }, 0);
		            sums[index] += ' ';
		          } else {
		            sums[index] = 'N/A';
		          }
		        });

		        return sums;
		    },
        }
    }
</script>

<style>

</style>