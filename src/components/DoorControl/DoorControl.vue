<template>
	<div class="doorControl">
		<sys-head :datas = "sData"></sys-head>
		<!-- <div class="doorHead"> -->
		<!-- 	<div class="companyLogo">
				<i></i>
				<span>泰立智汇</span>
			</div>
			<div class="searchBox">
                <el-input v-model="searchinput" type="text" placeholder="在此处输入进行搜索"></el-input>
				<button class="btn el-icon-search"></button>
			</div>
	        <nav class="tabNav">
	            <span><a :class="isActive1==true?'on':''" @click="toggleTabs(first)">系统平面</a></span>
	            <span><a :class="isActive2==true?'on':''" @click="toggleTabs(second)">门禁记录</a></span>
	        </nav>-->
	<!-- 	</div>  -->

		<!-- tab -->
<!-- 		<tabs :is="currentView" keep-alive></tabs> -->
		<!-- <tabs  keep-alive></tabs>
		<tabs-sys  keep-alive></tabs-sys> -->
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
            // 'first':tabsSys,
            // 'second':tabs
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
            // toggleTabs(tabText){
            //     if(tabText == "first"){
            //         this.isActive2 = false;
            //         this.isActive1 = true;
            //     }else if(tabText == "second"){
            //         this.isActive2 = true;
            //         this.isActive1 = false;
            //     }
            //     this.currentView = tabText;
            // }
	    }
    }
</script>

<style>
 
	@import '../../assets/css/doorControl.css' ;

</style>
