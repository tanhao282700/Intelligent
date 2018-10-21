<template>
	<div class="doorControl">
		<sys-head :datas = "sData"></sys-head>
		<router-view></router-view>
	</div>
</template>

<script>

	import sysHead from '../common/sysHead.vue'
	import tabs from './components/tabs.vue'
	import tabsSys from './components/tabsSys.vue'

    export default {
        name: "door-control",
        components:{
        	'sys-head':sysHead,
        },
	    data() {
	        return {
                first:'first',
                second:'second',
                currentView:'first',
                isActive1:true,
                isActive2:false,
                //检索
                searchinput:"",
		        sData:{
		            lists:[
		                {id:0,name:'系统平面',route:'/DoorControl/components/tabsSys'},
		                {id:1,name:'门禁记录',route:'/DoorControl/components/tabs'},
		            ]
		        }
	        };
	    },
	    methods: {
	    }
    }
</script>

<style>
 
	@import '../../assets/css/doorControl.css' ;

</style>
