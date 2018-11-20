<template>
	<div class="doorControl">
		<sys-head :datas = "sData"></sys-head>
		<router-view></router-view>
	</div>
</template>

<script>

	import sysHead from '../common/sysHead.vue'

    export default {
        components:{
        	'sys-head':sysHead,
        },
	    data() {
	        return {
		        sData:{
		            lists:[
		                {id:0,name:'酒店房态',route:'/HotelStatus/components/HotelRoomStatus'},
		            ]
		        }
	        };
	    },
      created(){
        if(this.$store.state.sysList[17].role_string[1]!='0' ||this.$store.state.sysList[17].role_string[2]!='0'||this.$store.state.sysList[17].role_string[3]!='0'||this.$store.state.sysList[17].role_string[4]!='0' ){
          this.sData.lists.push({id:1,name:'房单',route:'/HotelStatus/components/roomLists'})
        }
        this.sData.lists.push({id:2,name:'报表',route:'/HotelStatus/components/roomCharts'})
      },
	    methods: {

	    }
    }
</script>

<style>

	@import '../../assets/css/doorControl.css' ;


</style>
