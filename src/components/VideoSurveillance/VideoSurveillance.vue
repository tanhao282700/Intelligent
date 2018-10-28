<template>
	<div class="doorControl VideoSurveillance">
		<sys-head :datas = "sData"></sys-head>
        <div class="navCrumbs">首页 > 视屏监控系统 > <span>查看视频</span></div>
        <div class="mainContentBox">
        	<ul class="videoConditionsBox">
        		<li>区域选择</li>
        		<li v-for="(item,index) in buildDatas">
		            <el-select v-model="selectedValue" :placeholder="item.title">
		                <el-option
					      v-for="(items,index2) in item.child"
					      :key="index2"
					      :label="items.title"
					      :value="item.floor_id">
					    </el-option>
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
	                <span v-for="item in iList" :style="{left:(item.position_x*1.74+'px'),top:(item.position_y*1.74+'px')}" @click="viewLiveVideo(item.device_id)"><label>{{item.device_id}}</label></span>
	            </div>
	        </div>
        </div>

        <div class="videoShowBox" v-show="isVideoShowBoxShow">
        	<div class="videoPopBg">
        		<i clase="closevideoShowBoxIcon" @click="isVideoShowBoxShow = false">×</i>
	        	<div class="videoDeviceTitle">
	        		<span class="deviceaAcription">1栋1层{{onVideoId}}号视屏设备</span>
	        		<span class="dateBox">2018-10-15</span>
	        		<button class="videoDeviceInfo floatRt" @click="deviceInfoGet(onVideoId)">设备信息</button>
	        	</div>
	        	<div class="videoPanelBox">{{videoPanelBox}}</div>
        	</div>
        	<div class="deviceInfoPop" v-show="isDeviceInfoPopShow">
        		<div class="deviceInfoBgBox">
        			<i clase="closeDeviceInfoIcon" @click="isDeviceInfoPopShow = false">×</i>
        			<span>{{onVideoId}}号视频设备</span>
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
	        	selectedValue:'',
	        	isDeviceInfoPopShow:false,
	        	isVideoShowBoxShow:false,
	        	onVideoId:'',//当前设备ID
	        	videoPanelBox:'',
	        	//tab切换状态
                first:'first',
                second:'second',
                currentView:'first',
                isActive1:true,
                isActive2:false,

	        	buildDatas:[],
                iList:[],
		        sData:{
		            lists:[
		                {id:0,name:'查看视频',route:''},
		            ]
		        }
	        };
	    },
        mounted(){
            this.getData();
            this.getbuildData();
        },
	    methods: {
            getData(){
                var that = this;
                this.$http.post('/video_monitoring/video_index_view',{
                    sys_menu_id:13,
                    floor_id:115,
                }).then(function(data){
                    //响应成功回调
                    console.log(data);
                    console.log(data.data.data);
                    that.iList = data.data.data.floor_device;

                }, function(data){
                    // 响应错误回调
                });
            },
            getbuildData(){
                var that = this;
                this.$http.post('/video_monitoring/video_floorinfo',{
                    sys_menu_id:13
                }).then(function(data){
                    //响应成功回调
                    console.log(data.data.data)
                    that.buildDatas = data.data.data;
                    //that.iList = data.data.data.floor_device;

                }, function(data){
                    // 响应错误回调
                });
            },
	    	viewLiveVideo(id){
	    		this.isVideoShowBoxShow = true;
	    		this.onVideoId = id;


                var that = this;
                this.$http.post('/video_monitoring/video_view_details',{
                    device_id:id,
                }).then(function(data){
                    //响应成功回调
                    
                    that.videoPanelBox = data.data.data.device_state_pic;

                }, function(data){
                    // 响应错误回调
                });

	    	},
	    	deviceInfoGet(id){
	    		this.isDeviceInfoPopShow = true;
	    		console.log(id);
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

