<template>
    <div class="tabsDomBox"> 
        <div class="navCrumbs">首页 > 门禁系统 > <span>门禁记录</span></div>
        <div class="borderShadow">
            <a :href="downLoadSrc" id="downLoadSrc" style="display:none;"></a>
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
                <button class="btn btnSearch" @click="getData(releasetime1,releasetime2,enternameinput,toPageNum)"><i class="el-icon-search"></i>查询</button>
                <button class="btn btnExport floatRt" @click="exportTable"><i class="el-icon-search"></i>导出</button>
            </div>
            <div class="tableBox">
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" height="480">
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
    	props:['pageType'],
        data () {
        	return {
                toPageNum:1,
                totalPageNum:1,
				//时间
                releasetime1:"",
				releasetime2:"",
				//设备名称或者门名称
				enternameinput: '',
				tableData: [],
                pagesize:20,
                currentPage:1,
                downLoadSrc:'',
        	}
        },
        mounted(){
            this.getData("","","",1)
        },
        methods:{
            getData(start_date,end_date,query_name,numbC){
                var that = this;
                var s,e;
                if(start_date == "" || end_date ==""){
                    s="";
                    e="";
                }else{
                    s = that.format(start_date, 'yyyyMMdd');
                    e = that.format(end_date, 'yyyyMMdd');
                }
                this.$http.post('/entrance/record',{
                    sys_menu_id:15,
                    project_id:1,
                    floor_id:1,
                    page_index:numbC,
                    one_page_num:20,
                    start_date:s,
                    end_date:e,
                    query_name:query_name,
                }).then(function(response){
                    // 响应成功回调
                    console.log(response.data.data);
                    that.totalDataNumber = response.data.data.record_num_total;
                    that.totalPageNum =  Math.ceil(Number(that.totalDataNumber) / that.pageSize);
                    console.log(query_name);
                    that.tableData = response.data.data.entrance_guard_record;
                }, function(response){
                    // 响应错误回调
                });
            },
            exportTable(){
                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:15,
                    project_id:1,
                    floor_id:1,
                    export:1,
                }).then(function(response){
                    // 响应成功回调
                    //http://images.china-tillage.com/门禁系统门禁记录20181031124347.xls
                    var str = "http://"+response.data;
                    that.downLoadSrc = str;
                    console.log(str);
                    $("#downLoadSrc").click();
                    console.log("导出成功")
                }, function(response){
                    // 响应错误回调
                });
            },
            toInputPage(){
              /*显示输入页表格数据*/
              var num = Number(this.toPageNum);
              this.getData(num);
              this.currentPage = num;
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
            format(time, format){
                var t = new Date(time);
                var tf = function(i){return (i < 10 ? '0': '') + i};
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                    switch(a){
                        case 'yyyy':
                        return tf(t.getFullYear());
                        break;
                        case 'MM':
                        return tf(t.getMonth() + 1);
                        break;
                        case 'mm':
                        return tf(t.getMinutes());
                        break;
                        case 'dd':
                        return tf(t.getDate());
                        break;
                        case 'HH':
                        return tf(t.getHours());
                        break;
                        case 'ss':
                        return tf(t.getSeconds());
                        break; 
                    }
                })
            }
        }
    }
</script>

<style type="text/css">

</style>