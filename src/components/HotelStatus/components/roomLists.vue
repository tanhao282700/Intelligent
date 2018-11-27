<template>
	<div class="hotelStatus roomLists">
        <!--面包屑-->
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>营收数据分析</el-breadcrumb-item>
              <el-breadcrumb-item>房单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="roomListsTabBox">
	        <nav class="tabNav">
	            <span v-if="sysInfo.role_string[2]!=0"><a :class="isActive1==true?'on':''" @click="toggleTabs(first)">全部房单 <i></i></a></span>
	            <span v-if="sysInfo.role_string[3]!=0"><a :class="isActive2==true?'on':''" @click="toggleTabs(second)">宴会厅订单<i></i></a></span>
	            <span v-if="sysInfo.role_string[4]!=0"><a :class="isActive3==true?'on':''" @click="toggleTabs(third)">今日已退房单<i></i></a></span>
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
            sysInfo:{},
	        	first:'first',
	        	second:'second',
	        	third:'third',
	        	currentView:'first',
	        	isActive1:true,
	        	isActive2:false,
	        	isActive3:false,
	        };
	    },
      created(){
            this.sysInfo = this.$store.state.sysList[17]
        if(this.sysInfo.role_string[2]!=0){
                this.currentView = 'first'
          this.isActive1 = true
          this.isActive2 = false
          this.isActive3 = false
        }else if(this.sysInfo.role_string[3]==0&&this.sysInfo.role_string[4]!=0){
          this.currentView = 'second'
          this.isActive2 = true
          this.isActive1 = false
          this.isActive3 = false
        }else{
          this.currentView = 'third'
          this.isActive3 = true
          this.isActive1 = false
          this.isActive2 = false
        }
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
