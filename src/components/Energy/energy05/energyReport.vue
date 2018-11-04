<template>
    <!-- 用能报表模块 -->
    <div class="energyReport">
    	<div class="navCrumbs"><i class="homeTxt" @click="goHome" >首页</i>  > 能源管理系统 > <span>用能报表</span></div>
		<div class="reportTabBox">
        	<span class="unitPriceBtn" @click="unitShowCli">单价预设</span>
	        <nav class="tabNav">
	            <span><a :class="isActive1==true?'on':''" @click="toggleTabs(first)">月报表</a></span>
	            <span><a :class="isActive2==true?'on':''" @click="toggleTabs(second)">日报表</a></span>
	            <span><a :class="isActive3==true?'on':''" @click="toggleTabs(third)">能源汇总账单 (领导)</a></span>
	        </nav>
	        <tabs :is="currentView" keep-alive></tabs>
		</div>

		<!--<unit v-on:unitShowBool="unitShowBool" v-show="unitShow"></unit>-->
      <component :is="unitComponent" @unitShowBool="unitShowBool" ></component>

    </div>
</template>

<script>

	import reportDay from './components/reportDay.vue'
	import reportMonth from './components/reportMonth.vue'
	import reportLeader from './components/reportLeader.vue'
	import unitPrice from './components/unitPrice.vue'

    export default {
        components:{
            'first':reportMonth,
            'second':reportDay,
            'third':reportLeader,
            'unit':unitPrice
        },
	    data() {
	        return {
	          unitComponent:'',
	        	unitShow:false,
	        	//tab切换状态
                first:'first',
                second:'second',
                third:'third',
                currentView:'first',
                isActive1:true,
                isActive2:false,
                isActive3:false,
	        };
	    },
        mounted(){
            this.getData();
        },
	    methods: {
            getData(){
                var that = this;
                this.$http.post('/video_monitoring/video_index_view',{
                    sys_menu_id:13,
                    floor_id:115,
                }).then(function(data){
                    //响应成功回调
                    console.log(data);

                }, function(data){
                    // 响应错误回调
                });
            },
            unitShowCli(){
                this.unitComponent = 'unit'
            	/*this.unitShow = true;*/
            },
            unitShowBool(val){
              if(val==false){
                this.unitComponent = ''
              }
            	/*this.unitShow = val;*/
            },
            toggleTabs(tabText){
                if(tabText == "first"){
                    this.isActive2 = false;
                    this.isActive3 = false;
                    this.isActive1 = true;
                }else if(tabText == "second"){
                    this.isActive2 = true;
                    this.isActive1 = false;
                    this.isActive3 = false;
                }else if(tabText == "third"){
                    this.isActive3 = true;
                    this.isActive1 = false;
                    this.isActive2 = false;
                }
                this.currentView = tabText;
            },
        goHome(){
                this.$router.push('/home')
        },
	    }
    }
</script>

<style>

	@import '../../../assets/css/doorControl.css' ;
    .todaySpan{position: absolute;left:50%;top:15px;display: block;width:140px;margin-left: -70px;text-align: center;height:20px;line-height: 20px;color:#fff;font-size: 16px;}
  .homeTxt:hover{
    cursor: pointer;
  }
</style>
