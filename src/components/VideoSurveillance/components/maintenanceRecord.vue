<template>
    <div class="maintenanceRecord">
    	<el-scrollbar>
		    <ul class="devHistryList">
		    	<li v-for="item in deviceInfos">
		    		<span class="dateHistryBox">{{item.lab}}<a><i></i>{{item.personName}}</a></span>
		    		<span class="maintenanceContent">{{item.labVal}}</span>
		    	</li>
		    </ul>
    	</el-scrollbar>
    </div>
</template>

<script>
    export default {
		data() {
	        return {
	        	deviceInfos:[
	        		{lab:'2017年4月20日:',personName:'张三',labVal:'xxxxx'},
	        		{lab:'2017年6月20日:',personName:'张三',labVal:'xxxxx'},
	        		{lab:'2017年7月20日:',personName:'张三',labVal:'xxxxx'},
	        		{lab:'2017年8月20日:',personName:'张三',labVal:'xxxxx'},
	        		{lab:'2017年9月20日:',personName:'张三',labVal:'xxxxx'},
	        		{lab:'2017年10月20日:',personName:'张三',labVal:'xxxxx'},
	        	]
	        }
	    }
    }
</script>

<style>
	@import '../../../assets/css/doorControl.css' ;
</style>