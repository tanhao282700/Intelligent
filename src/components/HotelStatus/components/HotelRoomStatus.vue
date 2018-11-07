<template>
	<div class="hotelStatus">
        <!--面包屑--> 
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>营收数据分析</el-breadcrumb-item>
              <el-breadcrumb-item>酒店房态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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


                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">{{onItemFloor}}</span>
                        <el-dropdown-menu slot="dropdown" class="hotelStaDropDown">
                            <el-dropdown-item  v-for="(item,index) in hotelFloors" :key="item.id" divided>
                                <div @click="changeItemId(item.id,item.title)"><b :class="index==activeIndex ? 'bottom' : 'left'" @click.stop="toggleHdOn(index)"></b>{{item.title}} <input :value="item.id"/></div>
                                <div v-show="activeIndex===index" class="itemChild" v-for="sItem in item.child" @click="changeItemId(sItem.id,sItem.title)">{{sItem.title}} <input :value="sItem.id"/></div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

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
                activeIndex:-1,
                thisClassOn:'left',
                onItemFloor:'全部',
                hotelFloors:[],
	        	floorNumber:'全部',
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
                dataObjseparate_room:[],
                dataObjstandard_room:[],
                dataObjsuite:[],
                thisCheckFloor:'',
	        };
	    },
        mounted(){
            this.getHotelMainData();
            this.getData("");
        },
	    methods: {
            toggleHdOn(index){
                this.activeIndex = index;
            },
            changeItemId(id,title){
                this.onItemFloor = title;
                console.log(id);
                this.getData(id);
            },
            getFloorsFn(id){
                var that = this;
                this.$http.post('/hotel/get_floor',{
                    floor_id:id,
                }).then(function(data){
                    // 响应成功回调
                    that.hotelFloors = data.data.data;

                    that.roomsType[0].roomsLst = that.dataObjseparate_room;
                    that.roomsType[1].roomsLst = that.dataObjstandard_room;
                    that.roomsType[2].roomsLst = that.dataObjsuite;                    

                }, function(data){
                    // 响应错误回调
                });
            },
 			getData(selVal){
                var that = this;
                that.thisCheckFloor = selVal;
                this.$http.post('/hotel/hotel_state',{
                    // sys_menu_id:15,
                    project_id:this.$store.state.projectId,
                    floor_id:selVal,
                }).then(function(data){
                    // 响应成功回调
                    that.dataObjseparate_room = data.data.data.separate_room;
                    that.dataObjstandard_room = data.data.data.standard_room;
                    that.dataObjsuite = data.data.data.suite;
                    that.getFloorsFn(selVal);
    
                }, function(data){
                    // 响应错误回调
                });

 			},
            getHotelMainData(){
                var that = this;
                this.$http.post('/hotel/hotel_state',{
                    // sys_menu_id:15,
                    project_id:this.$store.state.projectId,
                    floor_id:"",
                }).then(function(data){
                    // 响应成功回调
                    console.log(data.data.data);
                    // that.tableData = response.data.data.entrance_guard_record;
                    that.hotelMainInfo[0].labVal = data.data.data.rooms;
                    that.hotelMainInfo[1].labVal = data.data.data.room_reservation;
                    that.hotelMainInfo[2].labVal = data.data.data.vacancy;
                    that.hotelMainInfo[3].labVal = data.data.data.check_in_num;
                    that.hotelMainInfo[4].labVal = data.data.data.occupancy_rate + '%';
                    that.hotelMainInfo[5].labVal = data.data.data.vacancy_rate + '%';
                    that.hotelMainInfo[6].labVal = data.data.data.diners;
    
                }, function(data){
                    // 响应错误回调
                });
            }
	    }
    }
</script>

<style>
 
	

</style>
