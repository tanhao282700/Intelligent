<template>
	<div class="hotelStatus">
    	<div class="navCrumbs">首页 > <span>酒店房态</span></div>
    	<div class="hotelMainContent">
    		<ul class="hotelMainInfo">
    			<li>
    				<span>酒店概况</span>
    				<i></i>
    			</li>
    			<li v-for="item in hotelMainInfo">
    				<span>{{item.labName}}</span>
    				<a>{{item.labVal}}</a>
    			</li>
    		</ul>
    		<div class="roomsStaListPanel">
    			<div class="roomListHeadBox">
    				<span>酒店房态表 <i></i></span>
    				<span v-for="item in roomListsStaTit" :class="item.sta"> <i></i>{{item.labName}}</span>
		            <el-select v-model="floorNumber" placeholder="楼号">
		                <el-option label="1楼" value="1"></el-option>
                        <el-option label="2楼" value="2"></el-option>
		                <el-option label="3楼" value="3"></el-option>
		            </el-select>
    			</div>
    			<div class="roomsTypeStaBox">
    				<ul v-for="item in roomsType">
    					<li>{{item.roomType}}</li>
    					<li v-for="(sItem,index) in item.roomsLst" class="roomLstLi">
    						<div :class="'roomSta'+sItem[1]">
    							<span class="roomNumber">{{sItem[0]}}</span>
    							<!-- <label class="labName">{{sItem[1]}}</label> -->
    							<label class="labName" v-if="sItem[1]=='OD'">住脏</label>
    							<label class="labName" v-else-if="sItem[1]== 'OC'">住净</label>
    							<label class="labName" v-else-if="sItem[1]== 'VD'">空脏</label>
    							<label class="labName" v-else-if="sItem[1]== 'VC'">空净</label>
    							<label class="labName" v-else-if="sItem[1]== 'OO'">维修</label>
    							<label class="labName" v-else="sItem[1]== 'OS'">锁房</label>
    						</div>
    					</li>
    					<li style="clear:both;height:6px;"></li>
    				</ul>
    			</div>
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
	        	floorNumber:'1楼',
	        	separate_room:[],
	        	standard_room:[],
	        	suite:[],
	        	roomNum:'',
	        	roomSta:'',
	        	roomsType:[
	        		{roomType:"单间",roomsLst:[]},
	        		{roomType:"标间",roomsLst:[]},
	        		{roomType:"套房",roomsLst:[]},
	        	],
	        	roomListsStaTit:[
	        		{labName:"空脏",sta:"emptyDirty"},
	        		{labName:"空净",sta:"emptyClean"},
	        		{labName:"住脏",sta:"fullDurty"},
	        		{labName:"住净",sta:"fullClean"},
	        		{labName:"锁房",sta:"roomLock"},
	        		{labName:"维修",sta:"roomRepair"},
	        	],
	        	hotelMainInfo:[
	        		{labName:"房间总数",labVal:8888},
	        		{labName:"房间预定数量",labVal:888},
	        		{labName:"闲置数量",labVal:88},
	        		{labName:"入住人数",labVal:8888},
	        		{labName:"入住率",labVal:"65%"},
	        		{labName:"闲置率",labVal:"35%"},
	        		{labName:"用餐人数",labVal:8888},
	        	],
	        };
	    },
        mounted(){
            this.getData()
        },
	    methods: {
 			getData(){
                var that = this;
                this.$http.post('/hotel/hotel_state',{
                    // sys_menu_id:15,
                    project_id:1,
                    // floor_id:104,
                }).then(function(data){
                    // 响应成功回调
                    // console.log(data.data.data);
                    // that.tableData = response.data.data.entrance_guard_record;
                    that.hotelMainInfo[0].labVal = data.data.data.rooms;
                    that.hotelMainInfo[1].labVal = data.data.data.room_reservation;
                    that.hotelMainInfo[2].labVal = data.data.data.vacancy;
                    that.hotelMainInfo[3].labVal = data.data.data.check_in_num;
                    that.hotelMainInfo[4].labVal = data.data.data.occupancy_rate + '%';
                    that.hotelMainInfo[5].labVal = data.data.data.vacancy_rate + '%';
                    that.hotelMainInfo[6].labVal = data.data.data.diners;

                    that.roomsType[0].roomsLst = data.data.data.separate_room;
                    that.roomsType[1].roomsLst = data.data.data.standard_room;
                    that.roomsType[2].roomsLst = data.data.data.suite;
                }, function(data){
                    // 响应错误回调
                });
 			}
	    }
    }
</script>

<style>
 
	

</style>
