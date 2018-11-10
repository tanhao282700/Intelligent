<template>
    <div class="roomListAll">
        <div class="roomListSearchPanel">
            <el-select v-model="roomListAllSta" placeholder="状态选择">
                <el-option label="住脏" value="1"></el-option>
                <el-option label="住净" value="2"></el-option>
                <el-option label="空脏" value="3"></el-option>
                <el-option label="空净" value="4"></el-option>
                <el-option label="锁房" value="5"></el-option>
                <el-option label="维修" value="6"></el-option>
            </el-select>
            <el-select v-model="roomListAllNumber" placeholder="房间号" @change="change">
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
            <button class="btn" @click="getData"><i class="el-icon-search"></i>搜索</button>
        </div>
        <div class="tableBox">
            <el-table :data="tableData"  style="width: 100%;" height="100%">
                <el-table-column prop="indexs" label="序号" align="cneter"></el-table-column>
                <el-table-column prop="room_state" label="房间状态" align="cneter" :formatter = "stateFormat"></el-table-column>
                <el-table-column prop="room_id" label="房间号"  align="cneter"></el-table-column>
                <el-table-column prop="stay_name" label="入住人"  align="cneter"></el-table-column>
                <el-table-column prop="phone" label="手机号"  align="cneter"></el-table-column>
                <el-table-column prop="num" label="入住人数"  align="cneter"></el-table-column>
                <el-table-column prop="stay_time" label="入住时间" align="cneter"></el-table-column>
                <el-table-column prop="leave_time" label="退房时间" align="cneter"></el-table-column>
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
                datetimerange:['',''],
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
                pagesize:20,
                currentPage:1,
                currPage:1
            };
        },
        methods: {
            getData(){
                var that = this;
                var stateSet = '';
                if(that.roomListAllSta == 4){
                    stateSet = 'VC';
                }else if(that.roomListAllSta == 3){
                    stateSet = 'VD';
                }else if(that.roomListAllSta == 2){
                    stateSet = 'OC';
                }else if(that.roomListAllSta == 1){
                    stateSet = 'OD';
                }else if(that.roomListAllSta == 6){
                    stateSet = 'OO';
                }else if(that.roomListAllSta == 5){
                    stateSet = 'OS';
                }

                var s,e;
                if(that.datetimerange[0] == "" || that.datetimerange[1] ==""){
                    s="";
                    e="";
                }else{
                    s = that.format(this.datetimerange[0], 'yyyy-MM-dd');
                    e = that.format(this.datetimerange[1], 'yyyy-MM-dd');
                }

                this.$http.post('/hotel/singe_room',{
                    page:that.currentPage,
                    type:1,
                    num:that.pagesize,
                    room_id:that.roomListAllNumber,
                    state:stateSet,
                    start_time:s,
                    end_time:e,
                }).then(function(data){
                    //响应成功回调
                    console.log(data);
                    // console.log(data.data.zongshu);
                    that.total = data.data.zongshu;
                    that.totalPageNum = Number(data.data.pages);
                    that.tableData = data.data.data;
                    // console.log(that.tableData);
                    var  seleRoom_id = [];
                    $.each(that.tableData,function(i,k){
                        seleRoom_id.push({num:k.room_id});
                        that.tableData[i].indexs = (that.currentPage-1)*that.pagesize+1+i
                    });
                    that.unique(seleRoom_id);
                    that.roomListAllNumbers = seleRoom_id;
                    // console.log(seleRoom_id);
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
            stateFormat(row, column) {
                if (row.room_state === "VC") {
                    return '空净'
                } else if (row.room_state === "VD") {
                    return '空脏'
                } else if (row.room_state === "OC") {
                    return '住净'
                } else if (row.room_state === "OD") {
                    return '住脏'
                } else if (row.room_state === "OO") {
                    return '维修'
                } else if (row.room_state === "OS") {
                    return '锁房'
                }
            },
            change(val){
                this.roomListAllNumber = val;
                // console.log(this.roomListAllNumber);
            },
            doSearch(){},
            addPolicy(){},
            handleEdit(index, row){ 
                // console.log(row.name) 
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function(currentPage){
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
        },
        mounted(){
            this.getData();
        }
    }
</script>

<style>
 

</style>
