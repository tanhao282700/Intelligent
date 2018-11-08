<template>
	<div class="doorControl VideoSurveillance">
		<sys-head :datas = "sData"></sys-head>
        <!--面包屑--> 
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>视频监控系统</el-breadcrumb-item>
              <el-breadcrumb-item>查看视频</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mainContentBox">
        	<ul class="videoConditionsBox">
        		<li>区域选择</li>
        		<li>
		            <el-select v-model="selectedValue" @change="chooseBuild">
		                <el-option v-for="(item,index) in buildDatas"
                            :key="item.value"
                            :label="item.title"
                            :value="item.floor_id">
					    </el-option>
		            </el-select>
        		</li>
                <li>
                    <el-select v-model="selectedValue1" @change="chooseBuild1">
                        <el-option v-for="(item,index) in buildDatas1"
                            :key="item.value"
                            :label="item.title"
                            :value="item.floor_id">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <el-select v-model="selectedValue2">
                        <el-option v-for="(item,index) in buildDatas2"
                            :key="item.value"
                            :label="item.title"
                            :value="item.floor_id">
                        </el-option>
                    </el-select>
                </li>
        		<li class="floatRt">
                    <div class="vieCtBgBox">
                        <span>当前监控总数</span>
                        <span class="totleVideosNum">14</span>
                    </div>
        		</li>
        	</ul>
	        <div class="bottomShadow">
	            <div class="floorImgBox" id="floorImgBox">
	                <img :src="floorBgImg">
	                <span v-for="item in iList" :style="{left:(item.position_x*coefficientX+'px'),top:(item.position_y*coefficientY+'px')}" @click="viewLiveVideo(item.device_id)"><label>{{item.device_id}}</label></span>
	            </div>
	        </div>
        </div>

        <div class="videoShowBox" v-show="isVideoShowBoxShow">
        	<div class="videoPopBg">
        		<i clase="closevideoShowBoxIcon" @click="isVideoShowBoxShow = false">×</i>
	        	<div class="videoDeviceTitle">
	        		<span class="deviceaAcription">1栋1层{{onVideoId}}号视频设备</span>
	        		<span class="dateBox">{{todaySpan}}</span>
	        		<button class="videoDeviceInfo floatRt" @click="deviceInfoGet(onVideoId)">设备信息</button>
	        	</div>
	        	<div class="videoPanelBox"></div>
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
				        <tabs :is="currentView" :onVideoId="onVideoId" keep-alive></tabs>
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
                floorBgImg:'../../../assets/img/doorControl/bg_lc.png', //楼层背景图
                selectedValue:'1栋',
                selectedValue1:'1单元',
	        	selectedValue2:'1楼',
	        	isDeviceInfoPopShow:false,
	        	isVideoShowBoxShow:false,
                coefficientX:1.74, //定位系数
                coefficientY:1.74, //定位系数
	        	onVideoId:'',//当前设备ID
	        	videoPanelBox:'',
                todaySpan:'',
	        	//tab切换状态
                first:'first',
                second:'second',
                currentView:'first',
                isActive1:true,
                isActive2:false,

                buildDatas:[],
                buildDatas1:[],
	        	buildDatas2:[],
                iList:[],
		        sData:{
		            lists:[
		                {id:0,name:'查看视频',route:''},
		            ]
		        }
	        };
	    },
        mounted(){
            this.getData("115");
            this.getbuildData();
            this.getDateSet();
        },
	    methods: {
            chooseBuild(selVal){
                var arrL=[];
                $.each(this.buildDatas,function(item,key){
                    console.log(key);
                    if(key.floor_id == selVal){
                        arrL = key.child;
                    }
                });
                this.selectedValue1 = '';
                this.selectedValue2 = '';
                this.buildDatas1 = arrL;
                this.getData(selVal);
            },
            chooseBuild1(selVal){
                var arrLs=[];
                $.each(this.buildDatas1,function(item,key){
                    if(key.floor_id == selVal){
                        arrLs = key.child;
                    }
                });
                this.selectedValue2 = '';
                this.buildDatas2 = arrLs;
                this.getData(selVal);
            },
            getData(flId){
                this.coefficientX = document.getElementById("floorImgBox").offsetWidth / 518;
                this.coefficientY = document.getElementById("floorImgBox").offsetHeight / 247;
                var that = this;
                this.$http.post('/video_monitoring/video_index_view',{
                    sys_menu_id:this.$store.state.sysList[4].sys_menu_id,
                    floor_id:flId,
                }).then(function(data){
                    //响应成功回调
                    that.iList = data.data.data.floor_device;
                    console.log(data);
                }, function(data){
                    // 响应错误回调
                });
            },
            getbuildData(){
                console.log(this.$store.state);
                var that = this;
                this.$http.post('/video_monitoring/video_floorinfo',{
                    sys_menu_id:this.$store.state.sysList[5].sys_menu_id
                }).then(function(data){
                    //响应成功回调
                    console.log(data.data.data)
                    that.buildDatas = data.data.data;
                   

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
                    // console.log(data.data.data);
                    that.videoPanelBox = data.data.data.device_state_pic;
                  
                    // that.floorBgImg = data.data.data.entrance_guard_info.floor_background;
                }, function(data){
                    // 响应错误回调
                });

	    	},
	    	deviceInfoGet(id){
	    		this.isDeviceInfoPopShow = true;
	    		
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

