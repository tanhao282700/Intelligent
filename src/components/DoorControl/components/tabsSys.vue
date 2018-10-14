<template>
    <div class="tabsDomBox0"> 
        <div class="navCrumbs">首页 > 门禁系统 > <span>门禁记录</span></div>
        <div class="topShadow">
            <el-select v-model="buildingNumber" placeholder="楼号">
                <el-option label="1栋" value="1"></el-option>
                <el-option label="2栋" value="2"></el-option>
            </el-select>
            <el-select v-model="floorNumber" placeholder="层号">
                <el-option label="1层" value="1"></el-option>
                <el-option label="2层" value="2"></el-option>
            </el-select>
            <ul class="doorStatusBox">
                <li>
                    <span>当前门禁数</span>
                    <span class="doorAllN">12</span>
                </li>
                <li>
                    <span><i class="doorClose"></i>关闭</span>
                    <span class="doorCloseN">12</span>
                </li>
                <li>
                    <span><i class="doorWarning"></i>异常</span>
                    <span class="doorWarningN">1</span>
                </li>
                <li>
                    <span><i class="doorOpen"></i>开启</span>
                    <span class="doorOpenN">2</span>
                </li>
            </ul>
        </div>
        <div class="bottomShadow">
            <div class="floorImgBox">
                <img src="../../../assets/img/doorControl/bg_lc.png">
                <i :class="[item.sta,'door'+(index+1)]" v-for="(item,index) in iList" @mouseenter = "popToggle(index,item.x,item.y)" @mouseout = "popHide" @click="doorInfoPanel(index)">{{item.num}}
                    <pops  :info = "onMouseDoor"></pops>
                </i>
                
            </div>
        </div>
        <door-info v-on:doorInfoHide="doorInfoHide" v-show="doorInfoShow" :hid = "doorInfoShow"></door-info>
    </div>
</template>
<script>

    import pop from './pop.vue'
    import doorInfo from './doorInfo.vue'

    export default {
        data () {
        	return {
                doorInfoShow:false, //弹框显示隐藏
                onMouseDoor:'', //当前滑过icon
                xLeft:'', //x值
                yTop:'', //y值
                buildingNumber:"", //楼号
				floorNumber:"", //层号
                iList:[
                    {num:1,x:68,y:74,sta:'close'},
                    {num:2,x:114,y:180,sta:'close'},
                    {num:3,x:212,y:277,sta:'close'},
                    {num:4,x:320,y:260,sta:'open'},
                    {num:5,x:270,y:72,sta:'warning'},
                    {num:6,x:398,y:310,sta:'open'},
                    {num:7,x:475,y:16,sta:'close'},
                    {num:8,x:532,y:107,sta:'close'},
                    {num:9,x:622,y:246,sta:'close'},
                    {num:10,x:658,y:30,sta:'close'},
                    {num:11,x:754,y:119,sta:'close'},
                    {num:12,x:842,y:350,sta:'close'},
                ]
				
        	}
        },
        components:{
            "pops":pop,
            "doorInfo":doorInfo
        },
        mounted(){
        },
        methods:{
            popToggle(i,x,y){
                //this.popShow = true;
                this.onMouseDoor = i+1;
                this.xLeft = x;
                this.yTop = y;
            },
            popHide(){
                //this.popShow = false;
            },
            doorInfoPanel(){
                this.doorInfoShow = true;
            },
            doorInfoHide(doorInfoHide){
                this.doorInfoShow = doorInfoHide;
            }
        }
    }
</script>

<style type="text/css">

</style>