<template>
    <div class="maintenanceRecord">
    	<el-scrollbar>
		    <ul class="devHistryList">
		    	<li v-for="item in deviceInfos">
		    		<span class="dateHistryBox">{{item.c_datetime}}<a><i></i>{{item.show_name}}</a></span>
		    		<span class="maintenanceContent">{{item.show_content}}</span>
		    	</li>
		    </ul>
    	</el-scrollbar>
    </div>
</template>

<script>
    export default {
        props:["onVideoId"],
		data() {
	        return {
	        	deviceInfos:[]
	        }
	    },
        mounted(){
            this.getData();
        },
	    methods: {
            getData(){
                var that = this;
                this.$http.post('/video_monitoring/video_maintenance',{
                    device_id:that.onVideoId,
                }).then(function(data){
                    //响应成功回调
                    console.log(data.data.data);
                    that.deviceInfos = data.data.data;

                }, function(data){
                    // 响应错误回调
                });
            },
        }
    }
</script>

<style>
	@import '../../../assets/css/doorControl.css' ;
</style>