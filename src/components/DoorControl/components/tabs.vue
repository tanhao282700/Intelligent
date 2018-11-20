<template>
    <div class="tabsDomBox"> 
        <!--面包屑--> 
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>门禁系统</el-breadcrumb-item>
              <el-breadcrumb-item>门禁记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="borderShadow">
            <a :href="downLoadSrc" style="display:none;"></a>
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
                <button class="btn btnSearch" @click="getData(releasetime1,releasetime2,enternameinput,toPageNum)"><i class="el-icon-search marginRt10"></i>查询</button>
                <button class="btn btnExport floatRt" @click="exportTable"><i class="exportIcon"></i>导出</button>
            </div>
            <div class="tableBox">
                <el-table :data="tableData" style="width: 100%;" height="100%">
                    <el-table-column prop="show_id" label="编号" align="cneter"></el-table-column>
                    <el-table-column prop="id_card" label="ID卡号" align="cneter"></el-table-column>
                    <el-table-column prop="name" label="姓名"  align="cneter"></el-table-column>
                    <el-table-column prop="department" label="部门"  align="cneter"></el-table-column>
                    <el-table-column prop="card_type" label="卡类型"  align="cneter"></el-table-column>
                    <el-table-column prop="device_name" label="设备名称"  align="cneter"></el-table-column>
                    <el-table-column prop="door_name" label="门名称" align="cneter"></el-table-column>
                    <el-table-column prop="open_datetime" label="开门时间"  align="cneter"></el-table-column>
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
                        <input type="number" autocomplete="off" class="el-input__inner" v-model="currPage">
                        <span @click="toInputPage">GO</span>
                    </div>

                    <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        :page-count="totalPageNum"
                        :total="total"
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
                totalPageNum:3,
                total:0,
                floorId:0,
				//时间
                releasetime1:"",
				releasetime2:"",
				//设备名称或者门名称
				enternameinput: '',
				tableData: [],
                pagesize:20,
                currentPage:1,
                downLoadSrc:'',
                currPage:''
        	}
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
                var that = this;
                var s = "";
                var e = "";
                if(this.releasetime1 == "" || this.releasetime2 ==""){
                    s="";
                    e="";
                }else{
                    s = that.format(this.releasetime1, 'yyyyMMdd');
                    e = that.format(this.releasetime2, 'yyyyMMdd');
                }
                if(s == "19700101" || e =="19700101"){
                    s = "";
                    e = "";
                }
                    console.log(this.$store.state);
                this.$http.post('/entrance/record',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:this.floorId,
                    page_index:that.currentPage,
                    one_page_num:that.pagesize,
                    start_date:s,
                    end_date:e,
                    query_name:that.enternameinput,
                }).then(function(response){
                    // 响应成功回调
                    console.log(response);
                    that.total = response.data.data.record_num_total;
                    that.totalPageNum = response.data.data.page_num_total;
                    that.tableData=response.data.data.entrance_guard_record;
                    console.log(that.tableData)
                }, function(response){
                    // 响应错误回调
                });
            },
            exportTable(){
                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:this.floorId,
                    export:1,
                }).then(function(response){
                    // 响应成功回调
                    //http://images.china-tillage.com/门禁系统门禁记录20181031124347.xls
                    var str = "http://"+response.data;
                    that.downLoadSrc = str;
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
                /*当前页变动事件*/
                this.currentPage =  Number(currentPage);
                this.currPage = this.currentPage;
                this.getData()
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