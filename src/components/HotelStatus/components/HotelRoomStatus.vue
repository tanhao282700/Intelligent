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
		            </el-select>
    			</div>
    			<div class="roomsTypeStaBox">
    				<ul v-for="item in roomsType">
    					<li>{{item.roomType}}</li>
    					<li v-for="sItem in item.roomsLst" class="roomLstLi">
    						<div :class="sItem.sta">
    							<span class="roomNumber">{{sItem.roomNumber}}</span>
    							<label class="labName">{{sItem.labName}}</label>
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
	        	roomsType:[
	        		{roomType:"单间",roomsLst:[
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        		]},
	        		{roomType:"标间",roomsLst:[
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        		]},
	        		{roomType:"套房",roomsLst:[
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        			{roomNumber:'208',labName:"维修",sta:"roomRepair"},
	        			{roomNumber:'203',labName:"空脏",sta:"emptyDirty"},
	        			{roomNumber:'204',labName:"空净",sta:"emptyClean"},
	        			{roomNumber:'205',labName:"住脏",sta:"fullDurty"},
	        			{roomNumber:'206',labName:"住净",sta:"fullClean"},
	        			{roomNumber:'207',labName:"锁房",sta:"roomLock"},
	        		]},
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
	    methods: {
 
	    }
    }
</script>

<style>
 
	

</style>
