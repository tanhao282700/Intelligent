<template>
    <div class="tabsDomBox0">
        <!--面包屑--> 
        <div class="navCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>门禁系统</el-breadcrumb-item>
              <el-breadcrumb-item>门禁平面</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="topShadow">
            <el-select v-model="buildingNumber" placeholder="楼号" @change="chooseLevels">
                <el-option  v-for="item in areaLevel"
                  :key="item.value"
                  :label="item.title"
                  :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="floorNumber" placeholder="层号" @change="chooseLevelNum">
                <el-option  v-for="item in levels"
                  :key="item.value"
                  :label="item.title"
                  :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="floorNum" placeholder="层号" @change="getFloorIdData">
                <el-option  v-for="item in levelNum"
                  :key="item.value"
                  :label="item.title"
                  :value="item.id">
                </el-option>
            </el-select>
            <ul class="doorStatusBox">
                <li>
                    <span>当前门禁数</span>
                    <span class="doorAllN">{{totleDoors}}</span>
                </li>
                <li>
                    <span><i class="doorClose"></i>关闭</span>
                    <span class="doorCloseN">{{doorClose}}</span>
                </li>
                <li>
                    <span><i class="doorWarning"></i>异常</span>
                    <span class="doorWarningN">{{doorWarning}}</span>
                </li>
                <li>
                    <span><i class="doorOpen"></i>开启</span>
                    <span class="doorOpenN">{{doorOpenN}}</span>
                </li>
            </ul>
        </div>
        <div class="bottomShadow">
            <div class="floorImgBox" id="floorImgBox">
                <img src="../../../assets/img/doorControl/bg_lc.png">
                <!-- {{item.device_name.slice(0,1)}} -->
                <i :class="['doorSta'+item.device_state,'door'+(index+1)]" 
                   v-for="(item,index) in iList" 
                   @mouseenter = "popToggle(index,item.x,item.y,item.device_name,item.device_state,item.point_list)" 
                   @mouseout = "popHide" 
                   @click.stop="doorInfoPanel(item.device_id,item.device_name,item)"
                   :style="{left:item.position_x*coefficientX + 'px',top:item.position_y*coefficientY + 'px'}"
                ><span v-html = "item.all_state_pic[item.device_state]" ></span>
                    <pops v-on:doorInfoHide="doorInfoHide" :doorControlMsg = "doorControlMsg"  :info = "onMouseDoor" :infoSta = "infoSta" :controlDoorFun = "controlDoorFun" :itemIndex="index" @changeDoorStatus="changeDoorStatus"></pops>
                </i>
                
            </div>
        </div>
        <door-info v-on:doorInfoHide="doorInfoHide" :doorInfoId="doorInfoId" :doorInfomation="doorInfomation" v-show="doorInfoShow" :hid = "doorInfoShow"></door-info>
    </div>
</template>
<script>

    import pop from './pop.vue'
    import doorInfo from './doorInfo.vue'

    export default {
        data () {
        	return {
                levelNum:[],//楼层
                levels:[],  //楼层
                areaLevel:[], //栋号
                infoSta:'',
                coefficientX:1.74, //定位系数
                coefficientY:1.74, //定位系数
                controlDoorFun:'',
                onDoorName:'', //当前门禁名字
                totleDoors:'', //当前门禁数量
                doorClose:'', //关闭状态门数量
                doorWarning:'', //警告状态门数量
                doorOpenN:'', //打开门数量
                doorInfoId:'', //pop弹框当前门id
                doorInfomation:[], //当前门详细信息
                doorInfoShow:false, //弹框显示隐藏
                onMouseDoor:'', //当前滑过icon
                xLeft:'', //x值
                yTop:'', //y值
                buildingNumber:"", //楼号
				floorNumber:"", //层号
                floorNum:"",  //楼层
                iList:[],
				floorIds:0,
                doorControlMsg:[],
        	}
        },
        components:{
            "pops":pop,
            "doorInfo":doorInfo
        },
        mounted(){
            this.getDoorData();
        },
        methods:{
            chooseLevels(selVal){

                this.floorIds = selVal;
                this.getDoorData();
                var arrL=[];
                $.each(this.areaLevel,function(item,key){
                    if(key.id == selVal){
                        arrL = key.child;
                    }
                });
                this.floorNumber = "";
                this.floorNum = "";
                this.levels = arrL;

            },
            chooseLevelNum(selVal){
                this.floorIds = selVal;
                console.log(selVal);
                this.getDoorData();
                var arrLs=[];
                $.each(this.levels,function(item,key){
                    if(key.id == selVal){
                        console.log(key);
                        arrLs = key.child;
                    }
                });
                this.floorNum = "";
                this.levelNum = arrLs;
                console.log(this.levelNum);
            },
            getFloorIdData(selVal){
                this.floorIds = selVal;
                this.getDoorData();
                console.log(this.floorIds);
            },
            popToggle(i,x,y,id,sta,handle){
                //this.popShow = true;
                this.onMouseDoor = id;
                this.xLeft = x;
                this.yTop = y;
                let handleMsgs = '';
                let ss = [];
                $.each(handle,function(i,k){
                    if(k.is_command == 1){
                        handleMsgs = k.params.showvalue[0];
                        ss.push({pointNow:k.now_value,pointId:k.point_id});
                    }
                });
                this.controlDoorFun = handleMsgs;
                this.doorControlMsg = ss;
                console.log(ss);
                if(sta == "0"){
                    this.infoSta = "关闭";
                }else if(sta == "1"){
                    this.infoSta = "开启";
                }else if(sta == "2"){
                    this.infoSta = "异常";
                }
            },
            popHide(){
                
            },
            changeDoorStatus(obj){
                let status = '';
                console.log(obj);
                // if(Number(this.doorClose) <= 0){

                // }else{
                //     this.doorClose = Number(this.doorClose) - 1; 
                //     this.doorOpenN = Number(this.doorOpenN) + 1; 
                // }
                // this.infoSta = obj.infoSta;
                // if(this.infoSta == "关闭"){
                //     status = "0";
                // }else if(this.infoSta == "开启"){
                //     status = "1";
                // }else if(this.infoSta == "异常"){
                //     status = "2";
                // }
                this.iList[obj.itemIndex].device_state=status;
            },
            doorInfoPanel(id,name,item){
                this.doorInfoId = name;
                this.doorInfoShow = true;
                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:15,
                    project_id:1,
                    floor_id:1,
                    device_id:id
                }).then(function(response){
                    // 响应成功回调
                    that.doorInfomation = response.data.data.entrance_guard_record;
                }, function(response){
                    // 响应错误回调
                });
            
            },
            doorInfoHide(doorInfoHide){
                this.doorInfoShow = doorInfoHide;
            },
            //获取页面数据
            getDoorData(){
                this.coefficientX = document.getElementById("floorImgBox").offsetWidth / 518;
                this.coefficientY = document.getElementById("floorImgBox").offsetHeight / 247;
                let that = this;
                this.$http.post('/entrance/all_info',{
                    sys_menu_id:15,
                    project_id:1,
                    floor_id:that.floorIds,
                }).then(function(data){
                    console.log(data.data.data);
                    that.iList = data.data.data.entrance_guard_info.device_2d_pic_state_list;
                    that.totleDoors = data.data.data.entrance_guard_info.entrance_guard_total_num;
                    that.doorClose = data.data.data.entrance_guard_info.entrance_guard_close_num;
                    that.doorWarning = data.data.data.entrance_guard_info.entrance_guard_anomaly_num;
                    that.doorOpenN = data.data.data.entrance_guard_info.entrance_guard_open_num;
                    // console.log(data.data.data.entrance_guard_info.entrance_guard_open_num);
                    //获取联动数据
                    that.areaLevel = data.data.data.area_level;
                    console.log(that.areaLevel);
                });
            }
        }
    }
</script>

<style type="text/css">

</style>