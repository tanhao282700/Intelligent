<template>
    <div class="deviceInfoDom">
	    <ul>
	    	<li v-for="item in deviceInfos">
	    		<span class="devNameSpan">{{item.lab}}</span>
	    		<span>{{item.labVal}}</span>
	    	</li>
	    </ul>
    </div>
</template>

<script>
    export default {
		data() {
	        return {
	        	deviceInfos:[
	        		{lab:'设备名称:',labVal:'xxxxx'},
	        		{lab:'流量:',labVal:'xxxxx'},
	        		{lab:'设备品牌:',labVal:'xxxxx'},
	        		{lab:'扬程:',labVal:'xxxxx'},
	        		{lab:'设备编号:',labVal:'xxxxx'},
	        		{lab:'转速:',labVal:'xxxxx'},
	        		{lab:'设备位置:',labVal:'xxxxx'},
	        		{lab:'设备重量:',labVal:'xxxxx'},
	        		{lab:'出厂时间:',labVal:'xxxxx'},
	        		{lab:'长宽高:',labVal:'xxxxx'},
	        		{lab:'启用时间:',labVal:'xxxxx'},
	        		{lab:'维保电话',labVal:'xxxxx'},
	        		{lab:'额定电流:',labVal:'xxxxx'},
	        		{lab:'维保商名称:',labVal:'xxxxx'},
	        		{lab:'额定电压:',labVal:'xxxxx'},
	        		{lab:'供应商名称:',labVal:'xxxxx'},
	        		{lab:'额定功率:',labVal:'xxxxx'},
	        		{lab:'累计运行时间:',labVal:'xxxxx'},
	        	]
	        }
	    }
    }
</script>

<style>

	@import '../../../assets/css/doorControl.css' ;

</style>