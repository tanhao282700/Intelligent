<template>
	<div class="doorControl VideoSurveillance">
		<sys-head :datas = "sData"></sys-head>
        <div class="navCrumbs">首页 > 视屏监控系统 > <span>查看视频</span></div>
        <div class="mainContentBox">
        	<ul class="videoConditionsBox">
        		<li>区域选择</li>
        		<li v-for="item in buildDatas">
		            <el-select  v-model="item.n+'栋'">
		                <el-option v-for="(sItem,index) in item.floors" :label="sItem.fName" :value="sItem.value" :key="index"></el-option>
		            </el-select>
        		</li>
        		<li class="floatRt">
        			<span>当前监控总数</span>
        			<span class="totleVideosNum">14</span>
        		</li>
        	</ul>
	        <div class="bottomShadow">
	            <div class="floorImgBox">
	                <img src="../../assets/img/doorControl/bg_lc.png">
	                <span v-for="item in iList" :style="{left:(item.x+'px'),top:(item.y+'px')}" @click="viewLiveVideo"><label>{{item.num}}</label></span>
	            </div>
	        </div>
        </div>

        <div class="videoShowBox" v-show="isVideoShowBoxShow">
        	<div class="videoPopBg">
        		<i clase="closevideoShowBoxIcon" @click="isVideoShowBoxShow = false">×</i>
	        	<div class="videoDeviceTitle">
	        		<span class="deviceaAcription">1栋1层1号视屏设备</span>
	        		<span class="dateBox">2018-10-15</span>
	        		<button class="videoDeviceInfo floatRt" @click="deviceInfoGet">设备信息</button>
	        	</div>
	        	<div class="videoPanelBox"></div>
        	</div>
        	<div class="deviceInfoPop" v-show="isDeviceInfoPopShow">
        		<div class="deviceInfoBgBox">
        			<i clase="closeDeviceInfoIcon" @click="isDeviceInfoPopShow = false">×</i>
        			<span>1号视频设备</span>
        			<div class="deviceTabBox">
				        <nav class="tabNav">
				            <span><a :class="isActive1==true?'on':''" @click="toggleTabs(first)">设备信息</a></span>
				            <span><a :class="isActive2==true?'on':''" @click="toggleTabs(second)">维保历史</a></span>
				        </nav>
				        <tabs :is="currentView" keep-alive></tabs>
        			</div>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>

	import sysHead from '../common/sysHead.vue'
	import deviceInfo from './components/deviceInfo.vue'
	import maintenanceRecord from './components/maintenanceRecord.vue'

    export default {
        components:{
        	'sys-head':sysHead,
            'first':deviceInfo,
            'second':maintenanceRecord
        },
	    data() {
	        return {
	        	isDeviceInfoPopShow:false,
	        	isVideoShowBoxShow:false,
	        	//tab切换状态
                first:'first',
                second:'second',
                currentView:'first',
                isActive1:true,
                isActive2:false,

	        	buildDatas:[
	        		{n:1,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        		{n:2,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        		]},
	        		{n:3,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        			{fName:"4层",value:4},
	        		]},
	        		{n:4,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        		{n:5,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        		{n:6,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        		{n:7,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        		{n:8,floors:[
	        			{fName:"1层",value:1},
	        			{fName:"2层",value:2},
	        			{fName:"3层",value:3},
	        		]},
	        	],
                iList:[
                    {num:1,x:108,y:74,sta:'close'},
                    {num:2,x:108,y:180,sta:'close'},
                    {num:3,x:108,y:277,sta:'close'},
                    {num:4,x:240,y:25,sta:'open'},
                    {num:5,x:266,y:152,sta:'warning'},
                    {num:6,x:378,y:50,sta:'open'},
                    {num:7,x:475,y:16,sta:'close'},
                    {num:8,x:452,y:107,sta:'close'},
                    {num:9,x:462,y:246,sta:'close'},
                    {num:10,x:568,y:110,sta:'close'},
                    {num:11,x:658,y:30,sta:'close'},
                    {num:12,x:574,y:280,sta:'close'},
                    {num:13,x:760,y:210,sta:'close'},
                    {num:14,x:212,y:370,sta:'close'},
                ],
		        sData:{
		            lists:[
		                {id:0,name:'查看视频',route:''},
		            ]
		        }
	        };
	    },
	    methods: {
	    	viewLiveVideo(){
	    		this.isVideoShowBoxShow = true;
	    	},
	    	deviceInfoGet(){
	    		this.isDeviceInfoPopShow = true;
	    	},
            toggleTabs(tabText){
                if(tabText == "first"){
                    this.isActive2 = false;
                    this.isActive1 = true;
                }else if(tabText == "second"){
                    this.isActive2 = true;
                    this.isActive1 = false;
                }
                this.currentView = tabText;
            }
	    }
    }
</script>

<style>
 
	@import '../../assets/css/doorControl.css' ;



</style>

