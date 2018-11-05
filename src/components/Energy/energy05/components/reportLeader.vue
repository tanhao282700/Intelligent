<template>
    <!-- 用能预设模块 -->
    <div class="reportTabBoxs" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading"
         element-loading-text="拼命加载中">
    	<div class="reportTabBoxsHead">
            <el-select v-model="formData.date_type" placeholder="日" @change="currentSel">
              <el-option label="日" value=""></el-option>
              <el-option label="月" value="month"></el-option>
            </el-select>
            <span style="font-size:0.14rem;" class="todaySpan">{{todaySpan}}</span>
	        <button class="btn" @click="queryCli">查询</button>
	        <button class="btn btnExport floatRt" @click="export1">导出</button>
    	</div>
    	<div class="reportTablesBox reportLeader" :class="{opacity0:loading==true}" >

	    	<el-table class="leaderTab"  :data="tableData3"  :cell-class-name="cell"
               height="50vh"
	    			   show-summary>
	    		<el-table-column type="index" label="序号">
	    		</el-table-column>
	    		<el-table-column min-width="140" label="名称">
	    			<el-table-column min-width="140" prop="title" label="指标">
	    			</el-table-column>
	    		</el-table-column>

          <template v-for="item in tabData">
            <el-table-column  :label="item.title">
              <template v-for="i in item.data">
                <el-table-column :prop="item.title+i.title" :label="i.title">
                </el-table-column>
              </template>
              <!--<el-table-column prop="city" label="上一天">
              </el-table-column>
              <el-table-column prop="city" label="昨天">
              </el-table-column>-->
            </el-table-column>
          </template>
	    		<!--<el-table-column  label="客房">
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
          <el-table-column  label="餐饮">
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
          <el-table-column  label="餐饮">
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
          </el-table-column>-->
	    	</el-table>

    	</div>
    </div>
</template>

<script>
    export default {
        data(){
        	return{
            loading:true,
        		dateTypeChoose:'',
        		todaySpan:'',
        		releasetime1:'',
        		tableData3: [{
              title:'间天耗水（T）',
		          city: 4,
		        }, {
              title:'间天耗电（度）',
		          city: 4,
		        }, {
              title:'间天耗气（方）',
		          city: 4,
		        }, {
              title:'百元耗水（T）',
		          city: 4,
		        }, {
              title:'百元耗电（度）',
		          city: 4,
		        }, {
              title:'百元耗气（方）',
		          city: 4,
		        }, {
              title:'间天耗费用（元）',
		          city: 4,
		        },{
              title:'能耗总额（万元）',
              city: 4,
            },{
              title:'百元费用率（%）',
              city: 4,
            }],
            tabData:[],
            formData:{
              project_id:1,
              choice_page:2,
              sys_menu_id:'',
              date_type:''
            },
        	}
        },
        mounted(){
          this.formData.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
          this.getData()
            this.getDateSet();
          this.$nextTick(()=>{
            $(".leaderTab").width($(".el-table__header").width())
            $(".leaderTab").height('90%')
          })
        },
        methods:{
          export1(){
            let data = {
              project_id:1,
              choice_page:2,
              export:true,
              sys_menu_id:this.formData.sys_menu_id,
              date_type:this.formData.date_type
            }
            this.$http.post('/hotel_energy/statement',data).then((res)=> {
              window.location.href='http://'+res.data
            })
          },
          queryCli(){
              this.loading = true
              $(".el-table__footer td").remove()
              this.getData()
          },
            getData(){
              this.$http.post('/hotel_energy/statement',this.formData).then((res)=> {
                if (res.data.code == 0) {
                  let data = res.data.data.result_data.splice(0,res.data.data.result_data.length-1)
                  this.tabData = data
                  this.tableData3.map((item,index)=>{
                      for(let i=0;i<data.length;i++){
                        for(let j=0;j<data[i].data.length;j++){
                            let keyName = data[i].title+data[i].data[j].title
                            item[keyName] = data[i].data[j].detail_data.jt_water
                        }
                      }
                  })

                  setTimeout(()=>{
                    $(".el-table__footer td").remove()
                    $(".el-table__footer tr").append("<td>10</td><td>营业收入总额(万元)</td>")
                    for(let k=0;k<data.length;k++){
                      $(".el-table__footer tr").append("<td style='font-size:0.14rem!important;' colspan='3'>"+data[k].data[2].detail_data.total_income+"</td>")
                    }
                    this.loading = false
                  },500)




                }else{

                }
              })
            },
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
        		this.todaySpan = yyyy + '.' + mm + '.' + dd;
        	},
        	getSummaries(param) {
		        const { columns, data } = param;
		        const sums = [];
		        columns.forEach((column, index) => {
		        	/*console.log(column);
		        	console.log(index);*/
		          if (index === 0) {
		            sums[index] = '10';
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
  .reportLeader .gutter{
    display: none;
  }
  .reportLeader .el-table__footer td{
    text-align: center;
  }
  .reportLeader .el-table__footer-wrapper td{
    border-top:none!important;
    border-bottom:1px solid rgba(45, 148, 240, 0.2)!important
  }
  .energyReport .reportLeader .el-table--border, .energyReport .reportLeader .el-table--group{
    border-bottom:1px solid rgba(45, 148, 240, 0.4)!important;
  }
</style>
