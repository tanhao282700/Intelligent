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
                    <el-select v-model="selectedValue1" @change="chooseBuild1" v-show="isSelectShow">
                        <el-option v-for="(item,index) in buildDatas1"
                            :key="item.value"
                            :label="item.title"
                            :value="item.floor_id">
                        </el-option>
                    </el-select>
                </li>
           <!--      <li>
                    <el-select v-model="selectedValue2">
                        <el-option v-for="(item,index) in buildDatas2"
                            :key="item.value"
                            :label="item.title"
                            :value="item.floor_id">
                        </el-option>
                    </el-select>
                </li> -->
        		<li class="floatRt">
                    <div class="vieCtBgBox">
                        <span>当前监控总数</span>
                        <span class="totleVideosNum">{{totalVdeoNum}}</span>
                    </div>
        		</li>
        	</ul>
	        <div class="bottomShadow">
	            <div class="floorImgBox" id="floorImgBox">
                    <iframe :src="iframeSrc" class="videoFrame" ref="iframe" name="myFrame"></iframe>
	                <!-- <img :src="floorBgImg"> -->
	              <!--   <span v-for="item in iList" :style="{left:(item.position_x*coefficientX+'px'),top:(item.position_y*coefficientY+'px')}"><label>{{item.device_id}}</label></span> -->
	            </div>
	        </div>
        </div>

        <div class="videoShowBox" v-show="isVideoShowBoxShow">
        	<div class="videoPopBg">
        		<i clase="closevideoShowBoxIcon" @click="emptyVideo">×</i>
	        	<div class="videoDeviceTitle">
	        		<span class="deviceaAcription">{{onVideoId}}</span>
	        		<!-- <span class="dateBox">{{todaySpan}}</span> -->
	        		<button class="videoDeviceInfo floatRt" @click="deviceInfoGet(onVideoId)">设备信息</button>
	        	</div>
	        	<div class="videoPanelBox" id="videoPanelBox" v-html="videoHtml">
                    <!-- <video id="videoElement" width="100%" height="100%"></video> -->
                </div>
        	</div>
        	<div class="deviceInfoPop" v-show="isDeviceInfoPopShow">
        		<div class="deviceInfoBgBox">
        			<i clase="closeDeviceInfoIcon" @click="clearIframeStale">×</i>
        			<span>{{onVideoId}}</span>
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
    import '../../assets/js/flv.min.js'

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
                isSelectShow:false,
                videoHtml:'',
                floorBgImg:'../../../assets/img/doorControl/bg_lc.png', //楼层背景图
                selectedValue:'',
                selectedValue1:'',
	        	selectedValue2:'',
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

                onFloorId:'166',
                iframeSrc:'',
                totalVdeoNum:0,
                floorObjs:{},

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
            this.getVideoCount(this.onFloorId);
            window.addEventListener('message', this.handleMessage)
            this.iframeWin = this.$refs.iframe.contentWindow
        },
	    methods: {
            emptyVideo(){
                isVideoShowBoxShow = false;
                document.getElementById('videoPanelBox').innerHTML = "";
            },
            removeMessageEvent(){
              window.removeEventListener('message',this.handleMessage);
            },
            /**** 根据上面制定的结构来解析iframe内部发回来的数据 ****/
            handleMessage (event) {
                const data = event.data;
                console.log(data);
                console.log(data.params.clickObjName);   

                switch (data.cmd) {
                    case 'reFoundObjName':
                    break;
                    case 'reDeviceClick':
                        console.log(data.params.clickObjName);
                        this.viewLiveVideoFn(data.params.clickObjName); 
                    break;
                    case 'cancelDevice':
                        console.log(data.params.cancelObject_id)
                    break;
                }
            },
            chooseBuild(selVal){
                var arrL=[];
                $.each(this.buildDatas,function(item,key){
                    // console.log(key);
                    if(key.floor_id == selVal){
                        arrL = key.son;
                    }
                });
                var srccc = '';
                $.each(this.floorObjs,function(i,k){
                    if(k.floor_id == selVal){
                         srccc = k.object_3d;
                    }
                })
                this.iframeSrc = srccc;
                console.log(this.iframeSrc);
                this.selectedValue1 = '';
                // this.selectedValue2 = '';
                this.buildDatas1 = arrL;
                this.onFloorId = selVal;
                this.getData(selVal);
                this.getVideoCount(selVal);
            },
            chooseBuild1(selVal){
                var arrLs=[];
                $.each(this.buildDatas1,function(item,key){
                    if(key.floor_id == selVal){
                        arrLs = key.child;
                    }
                });
                this.selectedValue2 = '';
                // this.buildDatas2 = arrLs;
                this.getData(selVal);
                this.getVideoCount(selVal);
            },
            getData(flId){
                console.log(this.$store.state);
                this.coefficientX = document.getElementById("floorImgBox").offsetWidth / 518;
                this.coefficientY = document.getElementById("floorImgBox").offsetHeight / 247;
                var that = this;
                this.$http.get('/hvac_pc/pc/floor',{
                    sys_menu_id:this.$store.state.sysList['5'].sys_menu_id,
                    floor_id:flId,
                }).then(function(data){
                    //响应成功回调
                    that.iList = data.data.data.object_device;
                    // that.iframeSrc = data.data.data.object_3d
                    console.log(data);
                }, function(data){
                    // 响应错误回调
                });
            },
            viewLiveVideoFn(deviceId){

                this.isVideoShowBoxShow = true 
                console.log(deviceId); 

                var that = this;
                this.$http.get('/hvac_pc/pc/index/device',{
                    object_id:deviceId
                }).then(function(data){
                    //响应成功回调
                    console.log(data);
                    that.onVideoId = data.data.data.device_info.name;
                    that.videoHtml = data.data.data.device_pic[0].codes;

                }, function(data){
                    // 响应错误回调
                });

                // $.each(this.floorObjs,function(i,k){
                //     $.each(k.object_device,function(i1,k1){
                //          if(k1.object_id == deviceId) {
                //              console.log(k1.device_id)
                //              console.log(k1.object_id)
                //              console.log(k1.state)
                //          }
                //     });
                // });

                // this.videoNow();
            },
            videoNow(){
                if (flvjs.isSupported()) {
                    var videoElement = document.getElementById('videoElement');
                    var flvPlayer = flvjs.createPlayer({
                            type: 'flv',
                            isLive: true,
                            enableStashBuffer:true,
                            hasAudio: false,
                            stashInitialSize: 384,
                            hasVideo: true,
                            enableWorker: true,
                            autoCleanupSourceBuffer: true,
                            url: 'ws://120.76.20.236:8081/action=stream,project=14,camera=25??'
                    });
                    flvPlayer.attachMediaElement(videoElement);
                    flvPlayer.load();
                    flvPlayer.play();
                }
            },
            getbuildData(){
                console.log(this.$store.state);
                var that = this;
                this.$http.get('/hvac_pc/pc/floor',{
                    sys_menu_id: this.$store.state.sysList['5'].sys_menu_id
                }).then(function(data){
                    //响应成功回调
                    console.log(data)
                    that.floorObjs = data.data.data;
                   $.each(data.data.data,function(i,k){
                        if(i == 0){
                           that.selectedValue = k.title;
                           that.iframeSrc = k.object_3d;
                        }
                       that.buildDatas.push({value:i,title:k.title,floor_id:k.floor_id});
                   })
                }, function(data){
                    // 响应错误回调
                });
            },
	    	// viewLiveVideo(id){
	    	// 	this.isVideoShowBoxShow = true;
	    	// 	this.onVideoId = id;


      //           var that = this;
      //           this.$http.post('/video_monitoring/video_view_details',{
      //               device_id:id,
      //           }).then(function(data){
      //               //响应成功回调
      //               // console.log(data.data.data);
      //               that.videoPanelBox = data.data.data.device_state_pic;
                  
      //               // that.floorBgImg = data.data.data.entrance_guard_info.floor_background;
      //           }, function(data){
      //               // 响应错误回调
      //           });


	    	// },
	    	deviceInfoGet(id){
	    		this.isDeviceInfoPopShow = true;
	    		
	    	},
            clearIframeStale(){
                this.isDeviceInfoPopShow = false;
                this.removeMessageEvent();
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
            },
            getVideoCount(flId){

                var that = this;
                this.$http.post('/video_monitoring/video_device_count',{
                    sys_menu_id:this.$store.state.sysList['5'].sys_menu_id,
                    floor_id:flId,
                }).then(function(data){
                    //响应成功回调
                    console.log(data.data.data);
                    that.totalVdeoNum = data.data.data[0].device_total;
                  
                    // that.floorBgImg = data.data.data.entrance_guard_info.floor_background;
                }, function(data){
                    // 响应错误回调
                });

            }
	    }
    }
</script>

<style>
 
	@import '../../assets/css/doorControl.css' ;



</style>

