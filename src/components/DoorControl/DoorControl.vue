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


		            ]
		        }
	        };
	    },
	    methods: {
	    },
      created(){
        if(this.$store.state.sysList[14].role_string[0]!=0){
          this.sData.lists.push({id:0,name:'系统平面',route:'/DoorControl/components/tabsSys'})
        }
            if(this.$store.state.sysList[14].role_string[1]!=0){
                this.sData.lists.push({id:1,name:'门禁记录',route:'/DoorControl/components/tabs'})
            }
      }
    }
</script>

<style>

	@import '../../assets/css/doorControl.css' ;

</style>
