<template>
    <!-- 用能预设模块 -->
    <div class="reportTabBoxs reportMonth">
    	<div class="reportTabBoxsHead">
            <el-select v-model="energyType" placeholder="类型">
                <el-option label="电" value="1"></el-option>
                <el-option label="水" value="2"></el-option>
            </el-select>
            <!--<span class="todaySpan">{{todaySpan}}</span>-->
	        <div class="dateBox">
	            <el-date-picker v-model="releasetime1" type="year" placeholder="年"></el-date-picker>
	        </div>
	        <button class="btn">查询</button>
	        <button class="btn btnExport floatRt">导出</button>
    	</div>
    	<div class="reportTablesBox">

	    	<el-table class="monthTab firstTab"  :data="tableData3"  :cell-class-name="cell" style="width: 100%;" height="50vh"  >
	    		<el-table-column type="index" label="序号" width="30">
	    		</el-table-column>
	    		<el-table-column prop="date" label="名称">
	    			<el-table-column prop="date" label="月份" :width="columnw">
	    			</el-table-column>
	    		</el-table-column>
	    		<el-table-column prop="date" label="电 (KW/h)">
	    			<el-table-column prop="date" label="总用电量" :width="columnw">
	    			</el-table-column>
	    			<el-table-column prop="date" label="总费用" :width="columnw">
	    			</el-table-column>
	    		</el-table-column>
			    <el-table-column prop="city" label="餐饮部">
			        <el-table-column prop="province" label="4F厨房">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="city" label="餐厅">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="address" label="会议室">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="address" label="宴会厅">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="address" label="茶坊">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="address" label="宴会厅空调">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			    </el-table-column>
		        <el-table-column label="综合部">
			        <el-table-column label="-">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
		        </el-table-column>
		        <el-table-column label="房务部">
			        <el-table-column prop="province" label="5-7楼">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="city" label="8-10楼">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
			        <el-table-column prop="address" label="中央空调">
				        <el-table-column prop="city" label="用量" :width="columnw">
				        </el-table-column>
				        <el-table-column prop="city" label="费用" :width="columnw">
				        </el-table-column>
			        </el-table-column>
		        </el-table-column>
          <el-table-column label="房务部">
            <el-table-column prop="province" label="5-7楼">
              <el-table-column prop="city" label="用量" :width="columnw">
              </el-table-column>
              <el-table-column prop="city" label="费用" :width="columnw">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="city" label="8-10楼">
              <el-table-column prop="city" label="用量" :width="columnw">
              </el-table-column>
              <el-table-column prop="city" label="费用" :width="columnw">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="中央空调">
              <el-table-column prop="city" label="用量" :width="columnw">
              </el-table-column>
              <el-table-column prop="city" label="费用" :width="columnw">
              </el-table-column>
            </el-table-column>
          </el-table-column>
	    	</el-table>


	    	<el-table class="monthTab" :data="tableData" border :cell-class-name="cell" :span-method="objectSpanMethod">
			    <el-table-column type="index" label="序号" width="30"> </el-table-column>
			    <el-table-column prop="dateLab" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			    <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
          <el-table-column prop="date" label="月份" :width="columnw"> </el-table-column>
			</el-table>

    	</div>
    </div>
</template>

<script>
    export default {
        data(){
        	return{
        		columnw:0,
        		energyType:'气',
        		todaySpan:'',
        		releasetime1:'',
        		tableData:[
        			{dateLab:"区域合计",data:2},
        			{dateLab:"部门合计",data:2},
        			{dateLab:"月均",data:2},
        		],
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
		        },{
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
            this.setWidth();
            this.getData();
            this.getDateSet();
            this.$nextTick(()=>{
                console.log($(".el-table__header").width())
              $(".monthTab").width($(".el-table__header").width())
            $(".firstTab").height('70%')
        })
        },
        methods:{
        	setWidth(){
        		/*this.columnw = $(".reportTabBoxs ").width() / 24;*/
        	},
        	getData(){
                let that = this;
                this.$http.post('/hotel_energy/statement',{
                    project_id:"1",
                }).then(function(data){
                    console.log(data.data.data);
                });

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
		    cell({row, column, rowIndex, columnIndex}) {
		      //第八列添加 red 类
		        if(columnIndex == 1){
		            return 'cellMonth'
		        }else if(columnIndex == 2 || columnIndex == 4 || columnIndex == 6 ||columnIndex == 8 ||columnIndex == 10 || columnIndex == 12 || columnIndex == 14 ||columnIndex == 16 ||columnIndex == 18 || columnIndex == 20 || columnIndex == 22 ){
		        	return 'darkBl'

		        }else if(columnIndex == 3 || columnIndex == 5 || columnIndex == 7 ||columnIndex == 9 ||columnIndex == 11 || columnIndex == 13 || columnIndex == 15 ||columnIndex == 17 ||columnIndex == 19 || columnIndex == 21 || columnIndex == 23 ){
		        	return 'darkOr'

		        }
		    },
	        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			    if(rowIndex == 1){
			     	if(columnIndex == 2){
			     		return {
			     			rowspan:1,
			     			colspan:2
			     		}
			     	}
			     	else if(columnIndex == 3){
			     		return {
			     			rowspan:1,
			     			colspan:6
			     		}
			     	}else if(columnIndex == 4){
			     		return {
			     			rowspan:1,
			     			colspan:6
			     		}
			     	}else if(columnIndex == 7){
			     		return {
			     			rowspan:1,
			     			colspan:3
			     		}
			     	}else if(columnIndex == 8){
			     		return {
			     			rowspan:1,
			     			colspan:3
			     		}
			     	}
			    }
		    }
        }
    }
</script>

<style>
.reportTablesBox>div:nth-child(2) .el-table__header-wrapper{display: none;}
.reportTablesBox>div:nth-child(2) .el-table__body-wrapper>.el-table__body{border-top:1px solid rgba(45, 148, 240, 0.2);}
.el-table .el-table__body td.cellMonth .cell{color:#2DF0E0!important;}
.el-table .el-table__body td.darkBl .cell{color:#439AFF!important;}
.el-table .el-table__body td.darkOr .cell{color:#FFA414!important;}
.el-table__footer-wrapper tbody td{background:rgba(0,0,0,0);color:#fff;}
.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
  width:auto!important;
}
.el-table{
  max-width: inherit!important;
}
  .reportTablesBox{
    width:100%;
    height:95%;
    overflow-x:scroll;
    overflow-y:hidden;
  }
/*.energyReport .el-table--border, .energyReport .el-table--group{
  width:auto!important;
}*/
</style>
