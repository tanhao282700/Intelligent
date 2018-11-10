<template>
	<div class="roomListAll">
		<div class="roomListSearchPanel">
            <el-select v-model="roomListAllNumber" placeholder="宴会厅" @change="changeDescript">
                <el-option v-for="(item,index) in roomListAllNumbers" :label="item.num" :value="item.num" :key="index"></el-option>
            </el-select>
            <div class="roomListDatePicker roomListDatePickerDef">
			    <el-date-picker v-model="datetimerange" type="date" placeholder="选择日期"></el-date-picker>
            </div>
            <button class="btn" @click="getData"><i class="el-icon-search"></i>搜索</button>
		</div>
        <div class="tableBox">
            <el-table :data="tableData" style="width: 100%;" height="100%">
                <el-table-column prop="indexs" label="序号" align="cneter"></el-table-column>
                <el-table-column prop="descript" label="预定大厅" align="cneter"></el-table-column>
                <el-table-column prop="biz_date" label="预定日期"  align="cneter"></el-table-column>
                <el-table-column prop="res_name" label="预定人"  align="cneter"></el-table-column>
                <el-table-column prop="phone" label="预定人手机号"  align="cneter"></el-table-column>
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
</template>

<script>


    export default {
        components:{
        	 
        },
	    data() {
	        return {
                toPageNum:1,
                totalPageNum:1,
                total:1,
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
                pagesize:20,
                currentPage:1,
                currPage:''
	        };
	    },
        mounted(){
            this.getData()
        },
	    methods: {
            getData(){
                var that = this;

                var s;
                if(that.datetimerange == ""){
                    s="";
                }else{
                    s = that.format(this.datetimerange, 'yyyy-MM-dd');
                }

                this.$http.post('/hotel/singe_room',{
                    page:that.currentPage,
                    num:that.pagesize,
                    descript:that.roomListAllNumber,
                    biz_date:s,
                }).then(function(data){
                    //响应成功回调
                    console.log(data);
                    that.total = data.data.zongshu;
                    that.totalPageNum = Number(data.data.pages);
                    that.tableData = data.data.data;

                    var roomsDescript = [];
                    $.each(data.data.data,function(i,k){
                        roomsDescript.push({num:k.descript});
                        that.tableData[i].indexs = (that.currentPage-1)*that.pagesize+1+i
                    }); 
                    that.unique(roomsDescript);
                    that.roomListAllNumbers = roomsDescript;
                }, function(data){
                    // 响应错误回调
                });
            },
            unique(arr){
             var i, j, len = arr.length; 
             for(i = 0; i < len; i++){
              for(j = i + 1; j < len; j++){
               if(arr[i].num == arr[j].num){
                arr.splice(j,1);
                len--;
                j--;
               }
              }
             }
             return arr;
            },
            toInputPage(){
              /*显示输入页表格数据*/
              this.currentPage = Number(this.currPage);
              this.getData();
            },
            doSearch(){},
            addPolicy(){},
            handleEdit(index, row){ },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
                this.currentPage =  Number(currentPage);
                this.currPage = this.currentPage;
                this.getData()
            },
            changeDescript(vId){
                console.log(vId);
                console.log(this.roomListAllNumber);
                
            //     var setSele = '';
            //     $(this.roomListAllNumbers,function(i,k){
            //         if(i == vId){
            //             setSele = k.num 
            //         }
            //     });
                // this.roomListAllNumber = setSele;
                // console.log(setSele);
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

<style>
 


</style>
