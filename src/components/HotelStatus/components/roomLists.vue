<template>
	<div class="hotelStatus roomLists">
    	<div class="navCrumbs">首页 > <span>房单</span></div>
		<div class="roomListsTabBox">
	        <nav class="tabNav">
	            <span><a :class="isActive1==true?'on':''" @click="toggleTabs(first)">全部房单 <i></i></a></span>
	            <span><a :class="isActive2==true?'on':''" @click="toggleTabs(second)">宴会厅订单<i></i></a></span>
	            <span><a :class="isActive3==true?'on':''" @click="toggleTabs(third)">今日已退房单<i></i></a></span>
	        </nav>
	        <tabs :is="currentView" class="roomListsTabDomBox"  keep-alive ></tabs>
		</div>


	</div>
</template>

<script>

	import roomListAll from './roomListAll.vue' 
	import roomListBanquetHall from './roomListBanquetHall.vue' 
	import roomListRetreated from './roomListRetreated.vue' 

    export default {
        components:{
        	'first':roomListAll,
        	'second':roomListBanquetHall,
        	'third':roomListRetreated,
        },
	    data() {
	        return {
	        	first:'first',
	        	second:'second',
	        	third:'third',
	        	currentView:'first',
	        	isActive1:true,
	        	isActive2:false,
	        	isActive3:false,
	        };
	    },
	    methods: {
            toggleTabs(tabText){
                if(tabText == "first"){
                    this.isActive2 = false;
                    this.isActive3 = false;
                    this.isActive1 = true;
                }else if(tabText == "second"){
                    this.isActive3 = false;
                    this.isActive2 = true;
                    this.isActive1 = false;
                }else if(tabText == "third"){
                    this.isActive2 = false;
                    this.isActive1 = false;
                    this.isActive3 = true;
                }
                this.currentView = tabText;
            }
	    }
    }
</script>

<style>


</style>
