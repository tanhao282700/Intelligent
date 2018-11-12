<template>
    <!-- 用能预设模块 -->
    <div class="reportTabBoxs reportMonth" v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-spinner="el-icon-loading"
         element-loading-text="拼命加载中">
    	<div class="reportTabBoxsHead reportMonthQu">
            <el-select style="float:left;" v-model="formData.energy_type" placeholder="类型">
                <el-option label="电" value="0"></el-option>
                <el-option label="水" value="1"></el-option>
                <el-option label="气" value="2"></el-option>
            </el-select>
            <!--<span class="todaySpan">{{todaySpan}}</span>-->
	        <div class="dateBox " style="float:left;">
	            <el-date-picker v-model="formData.query_date" value-format="yyyy" type="year" placeholder="年"></el-date-picker>
	        </div>
        <div class="thSearchBtn" @click="query">
          <img src="../../../../assets/img/common/search.png" alt="">
          <button >查询</button>
        </div>
        <div class="thSearchBtn1" @click="export1">
          <img src="../../../../assets/img/DoorControl/export.png" alt="">
          <button>导出</button>
        </div>
    	</div>
    	<div class="reportTablesBox">
        <div class="con" :class="{opacity0:loading==true}" style="height:100%;">  <!--宽度要和表格宽度一致-->
          <el-table class="monthTab firstTab"  :data="tableData3" show-summary  :cell-class-name="cell" height="50vh"  >
            <el-table-column prop="index" label="序号" width="40">
            </el-table-column>
            <el-table-column label="名称">
              <el-table-column prop="month" label="月份" :width="columnw">
              </el-table-column>
            </el-table-column>
            <el-table-column :label="label.type">
              <el-table-column prop="elecMount" :label="label.text" :width="columnw">
              </el-table-column>
              <el-table-column prop="totalcaost" label="总费用" :width="columnw">
              </el-table-column>
            </el-table-column>
            <template v-for="item in areaList">
              <el-table-column :label="item.parnt">
                <template v-for="child in item.child_data">
                  <el-table-column :label="child.child">
                    <el-table-column :prop="child.id+'useage'" label="用量" :width="columnw">
                    </el-table-column>
                    <el-table-column :prop="child.id+'cost'" label="费用" :width="columnw">
                    </el-table-column>
                  </el-table-column>
                </template>
              </el-table-column>
            </template>
          </el-table>
          <!--<el-table class="monthTab noshow" :data="tableData1" border :cell-class-name="cell">
            <el-table-column prop="index" width="40"> </el-table-column>
            <el-table-column prop="dateLab" :width="columnw"> </el-table-column>
            <el-table-column prop="elecMount" :width="columnw"> </el-table-column>
            <el-table-column prop="totalcaost" :width="columnw"> </el-table-column>
            <template v-for="item in areaList">
              <template v-for="child in item.child_data">
                <el-table-column :prop="child.id+'useage'" label="用量" :width="columnw">
                </el-table-column>
                <el-table-column :prop="child.id+'cost'" label="费用" :width="columnw">
                </el-table-column>
              </template>
            </template>

          </el-table>-->
          <!--<el-table class="monthTab noshow mytab" :data="tableData2" border :cell-class-name="cell" :span-method="objectSpanMethod">
            <el-table-column prop="index" width="40"> </el-table-column>
            <el-table-column prop="dateLab" :width="columnw"> </el-table-column>
            <el-table-column :width="columnw"> </el-table-column>
            <el-table-column :width="columnw"> </el-table-column>
            &lt;!&ndash;<el-table-column v-for="i in 14" :width="columnw"> </el-table-column>&ndash;&gt;
            &lt;!&ndash;<template v-for="item in areaList">
            <template v-for="child in item.child_data">
              <el-table-column :prop="child.id+'useageTotal'" label="用量" :width="columnw">
              </el-table-column>
              <el-table-column :prop="child.id+'costTotal'" label="费用" :width="columnw">
              </el-table-column>
            </template>
          </template>&ndash;&gt;
          </el-table>-->
          <!--<table class="mytab">
            <tr>
              <td class="noRemove" style="height:0.4rem;color:white;">14</td>
              <td class="noRemove" style="color:#2DF0E0!important;">部门合计</td>
            </tr>
          </table>
          <el-table class="monthTab noshow" :data="tableData4" border :cell-class-name="cell">
            <el-table-column prop="index" width="40"> </el-table-column>
            <el-table-column prop="dateLab" :width="columnw"> </el-table-column>
            <el-table-column prop="elecMount" :width="columnw"> </el-table-column>
            <el-table-column prop="totalcaost" :width="columnw"> </el-table-column>
            <template v-for="item in areaList">
              <template v-for="child in item.child_data">
                <el-table-column :prop="child.id+'useageEvel'" label="用量" :width="columnw">
                </el-table-column>
                <el-table-column :prop="child.id+'costEvel'" label="费用" :width="columnw">
                </el-table-column>
              </template>
            </template>
          </el-table>-->
        </div>
    	</div>
    </div>
</template>

<script>
    export default {
        data(){
        	return{
            loading:true,
        	    label:{
        	        type:'电（KW/h）',
                  text:'总用电量'
              },
        		columnw:0,
        		energyType:'气',
        		todaySpan:'',
        		releasetime1:'',
        		tableData1:[
        			{dateLab:"区域合计",
                data:2,
                index:13,
                elecMount:'',  //总用电量
                totalcaost:'', //总费用
              }
        		],
            tableData2:[{dateLab:"部门合计",
              data:2,
              index:14,
            }],
            tableData4:[{dateLab:"月均",
              data:2,
              index:15,
              elecMount:'',  //电量平均
              totalcaost:'', //总费用平均
            }],
        		tableData3: [{
        		  index:1,
              month:'01',
              elecMount:'',  //总用电量
              totalcaost:'', //总费用
		        }, {
              index:2,
              month:'02',
              totalcaost:'',
              elecMount:'',
            }, {
              index:3,
              month:'03',
              elecMount:'',
              totalcaost:'',
		        }, {
              index:4,
              month:'04',
              elecMount:'',
              totalcaost:'',
		        }, {
              index:5,
              month:'05',
              elecMount:'',
              totalcaost:'',
		        }, {
              index:6,
              month:'06',
              elecMount:'',
              totalcaost:'',
		        }, {
              index:7,
              month:'07',
              elecMount:'',
              totalcaost:'',
		        },{
              index:8,
              month:'08',
              elecMount:'',
              totalcaost:'',
            }, {
              index:9,
              month:'09',
              elecMount:'',
              totalcaost:'',
            }, {
              index:10,
              month:'10',
              elecMount:'',
              totalcaost:'',
            }, {
              index:11,
              month:'11',
              elecMount:'',
              totalcaost:'',
            },{
              index:12,
              month:'12',
              elecMount:'',
              totalcaost:'',
            }],
            areaList:[],
            formData:{
              project_id:1,
              choice_page:0,
              sys_menu_id:'',
              query_date:'',
              energy_type:"0"  //0电  1水  2气
            }
        	}
        },
        mounted(){
            let day = new Date()
            this.formData.query_date = String(day.getFullYear())
          this.formData.project_id = this.$store.state.projectId;
          this.formData.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
            this.setWidth();
            this.getData();
            this.getDateSet();

        },
        methods:{
          export1(){
              let date = ''
              if(this.formData.query_date){
                date = this.formData.query_date
              }else{
                  let time = new Date()
                  date = time.getFullYear()
              }
              let data = {
                project_id:this.formData.project_id,
                choice_page:0,
                query_date:date,
                export:true,
                sys_menu_id:this.formData.sys_menu_id,
                energy_type:this.formData.energy_type
              }
              this.$http.post('/hotel_energy/statement',data).then((res)=> {
                window.location.href='http://'+res.data
              })
          },
          query(){
              this.loading = true
            if(this.formData.energy_type==0){
              this.label.type = '电（KW/h）'
              this.label.text = '总用电量'
            }
            if(this.formData.energy_type==1){
              this.label.type = '水（m³）'
              this.label.text = '总用水量'
            }
            if(this.formData.energy_type==2){
              this.label.type = '气（m³）'
              this.label.text = '总用气量'
            }
            this.getData()
          },
        	setWidth(){
        		/*this.columnw = $(".reportTabBoxs ").width() / 24;*/
        	},
        	getData(){
                this.$http.post('/hotel_energy/statement',this.formData).then((res)=>{
                  if(res.data.code==0){
                    $(".firstTab").height('50vh')
                    $(".el-table__footer tbody tr").remove()
                    let data = res.data.data.result_data
                    this.tableData3.map((item,index)=>{   //写入总用电量、总费用数据
                      if(data[1].data[index].value[0]==0){
                        item.elecMount = ''
                      }else{
                        item.elecMount = data[1].data[index].value[0]
                      }
                      if(data[1].data[index].value[1]==0){
                        item.totalcaost = ''
                      }else{
                        item.totalcaost = data[1].data[index].value[1]
                      }
                    })

                    //存储部门区域数据
                    this.areaList = data[5].area_monthly_data

                    //写入部门区域用量、费用数据，key为当前域的id+‘useage’||‘cost’
                    this.areaList.map((item,index)=>{
                      for(let i=0;i<item.child_data.length;i++){
                        //写入用量
                        this.tableData3.map((child,index)=>{
                          child[item.child_data[i].id+'useage'] = item.child_data[i].detail_use_num[index]
                        })
                        //写入费用
                        this.tableData3.map((child,index)=>{
                          child[item.child_data[i].id+'cost'] = item.child_data[i].detail_cost[index]
                        })
                      }
                    })


                    //写入区域合计
                    /*this.tableData1[0].elecMount = data[1].data[12].value[0]
                    this.tableData1[0].totalcaost = data[1].data[12].value[1]

                    this.areaList.map((item,index)=> {
                      for (let i = 0; i < item.child_data.length; i++) {
                        for(let j=0;j<data[2].data.length;j++){
                          if(item.child_data[i].id==data[2].data[j].area_id){
                            this.tableData1[0][item.child_data[i].id+'useage'] = data[2].data[j].value[0]
                            this.tableData1[0][item.child_data[i].id+'cost'] = data[2].data[j].value[1]
                          }
                        }
                      }
                    })*/

                    //写入用量平均
                    /*this.tableData4[0].elecMount = data[1].data[13].value[0]
                    this.tableData4[0].totalcaost = data[1].data[13].value[1]
                    this.areaList.map((item,index)=> {
                      for (let i = 0; i < item.child_data.length; i++) {
                        for(let j=0;j<data[3].data.length;j++){
                          if(item.child_data[i].id==data[3].data[j].area_id){
                            this.tableData4[0][item.child_data[i].id+'useageEvel'] = data[3].data[j].value[0]
                            this.tableData4[0][item.child_data[i].id+'costEvel'] = data[3].data[j].value[1]
                          }
                        }
                      }
                    })*/


                    setTimeout(()=>{




                      $(".el-table__footer td").remove()
                      if($(".el-table__body").width()>$(".con").width()){
                        $(".con").width($(".el-table__body").width())
                      }else{
                        $(".el-table__header").width($(".con").width())
                        $(".el-table__body").width($(".con").width())
                        $(".el-table__body").css("padding-right","7px")
                      }
                      $(".el-table__footer").width($(".con").width())
                      console.log($(".el-table__footer tbody tr"))
                      $(".el-table__footer tbody").append("<tr><td style='border-top:none!important;'>13</td><td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>区域合计</td><td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>"+data[1].data[12].value[0]+"</td><td style='color:#FFA414!important;border-top:none!important;font-size:0.12rem!important;'>"+data[1].data[12].value[1]+"</td></tr>")

                      $(".el-table__footer tbody").append("<tr><td style='border-top:none!important;font-size:0.12rem!important;'>14</td><td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>部门合计</td><td style='border-top:none!important;' colspan='2'></td></tr>")
                      $(".el-table__footer tbody").append("<tr><td style='border-top:none!important;font-size:0.12rem!important;'>15</td><td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>月均</td><td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>"+data[1].data[13].value[0]+"</td><td style='color:#FFA414!important;border-top:none!important;font-size:0.12rem!important;'>"+data[1].data[13].value[1]+"</td></tr>")
                      for(let i=0;i<data[2].data.length;i++){
                        $($(".el-table__footer tbody tr")[0]).append("<td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>"+data[2].data[i].value[0]+"</td><td style='color:#FFA414!important;border-top:none!important;font-size:0.12rem!important;'>"+data[2].data[i].value[1]+"</td>")
                      }


                      let lenth = []
                      this.areaList.map((item,index)=> {
                        lenth.push(item.child_data.length)
                      })
                      console.log($(".el-table__footer tbody tr"))
                      for(let i=0;i<lenth.length;i++){
                        if(lenth[i]==1){
                          $($(".el-table__footer tbody tr")[1]).append('<td colspan="'+lenth[i]+'" style="color:#439AFF!important;font-size:0.14rem!important;border-top:none!important;">'+data[4].data[i].parent_area_total[0]+'</td>')
                          $($(".el-table__footer tbody tr")[1]).append('<td colspan="'+lenth[i]+'"style="color:#FFA414!important;font-size:0.14rem!important;border-top:none!important;">'+data[4].data[i].parent_area_total[1]+'</td>')
                        }else{
                          $($(".el-table__footer tbody tr")[1]).append('<td colspan="'+lenth[i]+'" style="color:white;font-size:0.14rem!important;border-top:none!important;">用量：'+data[4].data[i].parent_area_total[0]+'</td>')
                          $($(".el-table__footer tbody tr")[1]).append('<td colspan="'+lenth[i]+'"style="color:#FFA414!important;font-size:0.14rem!important;border-top:none!important;">费用：'+data[4].data[i].parent_area_total[1]+'</td>')
                        }
                      }



                         for(let j=0;j<data[3].data.length;j++){
                           $($(".el-table__footer tbody tr")[2]).append("<td style='color:#439AFF!important;border-top:none!important;font-size:0.12rem!important;'>"+data[3].data[j].value[0]+"</td><td style='color:#FFA414!important;border-top:none!important;font-size:0.12rem!important;'>"+data[3].data[j].value[1]+"</td>")
                         }


                         $(".firstTab").height($(".con").height())
                         this.loading = false



                    },500)




                    /*setTimeout(()=>{
                        if($(".el-table__body").width()>$(".con").width()){
                          $(".con").width($(".el-table__body").width())
                        }else{
                            $(".el-table__header").width($(".con").width())
                          $(".el-table__body").width($(".con").width())
                          $(".el-table__body").css("padding-right","7px")
                        }

                        let wid = $($(".firstTab td")[1]).width()
                        $(".mytab td").width(wid-1)
                        $(".mytab tr").append('<td style="width:'+(wid*2+2)+'px"></td>')
                        let lenth = []
                        this.areaList.map((item,index)=> {
                            lenth.push(item.child_data.length)
                        })
                        for(let i=0;i<lenth.length;i++){
                            if(lenth[i]==1){
                              $(".mytab tr").append('<td style="width:'+wid*lenth[i]+'px;color:#439AFF!important;font-size:0.14rem!important;">'+data[4].data[i].parent_area_total[0]+'</td>')
                              $(".mytab tr").append('<td style="width:'+wid*lenth[i]+'px;color:#FFA414;font-size:0.14rem!important;">'+data[4].data[i].parent_area_total[1]+'</td>')
                            }else{
                              $(".mytab tr").append('<td style="width:'+(wid*lenth[i]+0)+'px;color:white;font-size:0.14rem!important;">用量：'+data[4].data[i].parent_area_total[0]+'</td>')
                              $(".mytab tr").append('<td style="width:'+(wid*lenth[i]+0)+'px;color:#FFA414!important;font-size:0.14rem!important;">费用：'+data[4].data[i].parent_area_total[1]+'</td>')
                            }
                        }

                        $($(".mytab td")[0]).width($($(".firstTab td")[0]).width()-1)

                        $(".firstTab").height('70%')

                        this.loading = false
                    },500)*/
                  }else{

                  }
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

            /*if(columnIndex ==2){
              return {
                colspan:2,
                rowspan:1
              }
            }*/
             /*if(columnIndex==9){
              return {
                colspan:3,
                rowspan:1
              }
            }
            if(columnIndex==10){
              return {
                colspan:3,
                rowspan:1
              }
            }*/


			    /*if(rowIndex == 1){
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
			    }*/
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
    overflow-x:auto;
    overflow-y:hidden;
  }
  .noshow .el-table__header-wrapper{
    display:none!important;
  }
  .reportMonth .gutter{
    display: none;
  }
  .mytab{
    padding-right:5px;
  }
.mytab td{
  border-bottom:1px solid rgba(45, 148, 240, 0.2)!important;
  border-right:1px solid rgba(45, 148, 240, 0.2)!important;
  text-align:center;
}

.opacity0{
  opacity:0;
}
/*.energyReport .el-table--border, .energyReport .el-table--group{
  width:auto!important;
}*/
  .reportTablesBox .el-table th>.cell{
    font-size:0.12rem!important;
  }
  .el-table .el-table__body td .cell{
    font-size:0.12rem!important;
  }

.reportMonth .reportMonthQu .dateBox .el-input__inner{
  width:1rem!important;
}
.reportMonthQu .dateBox .el-input__prefix{
  left:inherit!important;
  right:0!important;
}

.el-table__footer td{
  text-align: center!important;
}

  .thSearchBtn{
    float:left;
    padding: 0 15px;
    border-radius: 2px;
    background: #3a84ee;
    border: 1px solid #1989fa;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    width: 88px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.thSearchBtn:hover{
  cursor: pointer;
}
.thSearchBtn img{
  width:18px;
  height:18px;
  display: inline-block;
}
.thSearchBtn button{
  background:none!important;
  border:none!important;
  color: #fff!important;
  font-size: 15px!important;
  margin-left:4px;
}
.thSearchBtn button:hover{
  cursor: pointer;
}
.thSearchBtn1{
  margin-right:8px;
  float:right;
  padding: 0 15px;
  border-radius: 2px;
  background: #3a84ee;
  border: 1px solid #1989fa;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  width: 88px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.thSearchBtn1:hover{
  cursor: pointer;
}
.thSearchBtn1 img{
  width:18px;
  height:18px;
  display: inline-block;
}
.thSearchBtn1 button{
  background:none!important;
  border:none!important;
  color: #fff!important;
  font-size: 15px!important;
  margin-left:4px;
}
.thSearchBtn1 button:hover{
  cursor: pointer;
}
</style>
