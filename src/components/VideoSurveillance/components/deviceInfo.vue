<template>
    <div class="deviceInfoDom">
	    <ul>
	    	<li v-for="(item,index) in deviceInfos">
	    		<span class="devNameSpan">{{item.label}}</span>
	    		<span>{{item.val}}</span>
	    		<!-- <span class="devNameSpan">{{item[index][0]}}</span>
	    		<span>{{item[index][1]}}</span> -->
	    	</li>
	    </ul>
    </div>
</template>

<script>
    export default {
		data() {
	        return {
	        	dInfo:[],
	        	deviceInfos:[]
	        }
	    },
        mounted(){
            this.getData();
        },
	    methods: {
            getData(){
                var that = this;
                this.$http.post('/video_monitoring/video_device_info',{
                    device_id:16,
                }).then(function(data){
                    //响应成功回调

                     $.each(JSON.parse(data.data.data[0].content),function(index,item){
                    	$.each(item,function(key,value){
                    		//that.dInfo.push(key);

                    		that.deviceInfos.push({'label':key,'val':value});
                    	});
                    });
                     console.log(that.deviceInfos)
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