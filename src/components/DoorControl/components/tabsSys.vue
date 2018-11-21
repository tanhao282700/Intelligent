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
                <img :src="floorBgImg">
                <!-- {{item.device_name.slice(0,1)}} -->
                <i :class="['doorSta'+item.device_state,'door'+(index+1)]" 
                   v-for="(item,index) in iList" 
                   @mouseenter = "popToggle(index,item.x,item.y,item.device_name,item.device_state,item.point_list)" 
                   @mouseout = "popHide" 
                   @click.stop="doorInfoPanel(item.device_id,item.device_name,item)"
                   :style="{left:((item.position_x / 1326)*100 -4) + '%',top:((item.position_y / 580)*100 -3) + '%'}"
                ><span v-html = "item.all_state_pic[item.device_state]" ></span>
                    <pops v-on:doorInfoHide="doorInfoHide" :doorControlMsg = "doorControlMsg"  :info = "onMouseDoor" :infoSta = "infoSta" :controlDoorFun = "controlDoorFun" :itemIndex="index" @changeDoorStatus="changeDoorStatus"></pops>
                </i>
                
            </div>
        </div>
        <door-info v-on:doorInfoHide="doorInfoHide" :doorInfoId="doorInfoId" :floorIds="floorIds" :doorDeviceId="doorDeviceId" :doorInfomation="doorInfomation" v-show="doorInfoShow" :hid = "doorInfoShow"></door-info>
    </div>
</template>
<script>

    import pop from './pop.vue'
    import doorInfo from './doorInfo.vue'

    export default {
        data () {
        	return {
                floorBgImg:'../../../assets/img/doorControl/bg_lc.png', //楼层背景图
                levelNum:[],//楼层
                levels:[],  //楼层
                areaLevel:[], //栋号
                infoSta:'',
                coefficientX:1, //定位系数
                coefficientY:1, //定位系数
                controlDoorFun:'',
                onDoorName:'', //当前门禁名字
                totleDoors:'', //当前门禁数量
                doorClose:'', //关闭状态门数量
                doorWarning:'', //警告状态门数量
                doorOpenN:'', //打开门数量
                doorInfoId:'', //pop弹框当前门id
                doorDeviceId:'',//pop当前门设备id
                doorInfomation:[], //当前门详细信息
                doorInfoShow:false, //弹框显示隐藏
                onMouseDoor:'', //当前滑过icon
                xLeft:'', //x值
                yTop:'', //y值
                buildingNumber:"负一楼", //楼号
				floorNumber:"", //层号
                floorNum:"",  //楼层
                iList:[],
				floorIds:147,
                doorControlMsg:[],
        	}
        },
        components:{
            "pops":pop,
            "doorInfo":doorInfo
        },
        mounted(){
            this.getDoorData();
            console.log(this.floorIds);
        },
        watch:{
            infoSta(newVal,oldVal){
                this.infoSta = newVal;
            },
            floorIds(newVal,oldVal){
                console.log(newVal);
                console.log(oldVal);
                sessionStorage.setItem("sentFloorIds", newVal);
            }
        },
        methods:{
            chooseLevels(selVal){

                this.floorIds = selVal;
                console.log(this.areaLevel);
                console.log(selVal);
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
                // this.getDoorData(selVal);
            },
            chooseLevelNum(selVal){
                this.floorIds = selVal;
                console.log(selVal);
                // this.getDoorData();
                var arrLs=[];
                $.each(this.levels,function(item,key){
                    if(key.id == selVal){
                        console.log(key);
                        arrLs = key.child;
                    }
                });
                this.floorNum = "";
                this.levelNum = arrLs;
                this.getDoorData(selVal);
                console.log(this.levelNum);
            },
            getFloorIdData(selVal){
                this.floorIds = selVal;
                this.getDoorData(selVal);
                console.log(this.floorIds);
            },
            popToggle(i,x,y,id,sta,handle){
                console.log(handle);
                this.onMouseDoor = id;
                this.xLeft = x;
                this.yTop = y;
                let handleMsgs = '';
                let ss = [];
                let staNew='';
                $.each(handle,function(i,k){
                    if(k.is_command == 1){
                        handleMsgs = k.params.showvalue[0];
                        ss.push({pointNow:k.params.value[0],pointId:k.point_id});
                    }
                    if(i == 2){
                       $.each(k.params.value,function(i1,k1){
                            if(k1 == k.params.type){
                                staNew = k.params.showvalue[i1]
                            }
                       });
                    }
                });
                this.controlDoorFun = handleMsgs;
                this.doorControlMsg = ss;
                console.log(ss);
                this.infoSta = staNew;
                // if(sta == "0"){
                //     this.infoSta = "关闭";
                // }else if(sta == "1"){
                //     this.infoSta = "开启";
                // }else if(sta == "2"){
                //     this.infoSta = "异常";
                // }
            },
            popHide(){
                
            },
            changeDoorStatus(obj){
                let status = '';
                console.log(obj);

                this.iList[obj.itemIndex].device_state=status;
            },
            doorInfoPanel(id,name,item){
                console.log(this.$store.state.sysList);
                this.doorInfoId = name;
                this.doorDeviceId = id,
                this.doorInfoShow = true;
                var that = this;
                this.$http.post('/entrance/record',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:that.floorIds,
                    device_id:id
                }).then(function(response){
                    // 响应成功回调
                    console.log(response.data.data);
                    that.doorInfomation = response.data.data.entrance_guard_record;
                }, function(response){
                    // 响应错误回调
                });
            
            },
            doorInfoHide(doorInfoHide){
                this.doorInfoShow = doorInfoHide;
            },
            //获取页面数据
            getDoorData(slevel){
                console.log(this.$store.state.sysList['14'].sys_menu_id);
                console.log(this.$store.state);
                // this.coefficientX = document.getElementById("floorImgBox").offsetWidth / 518;
                // this.coefficientY = document.getElementById("floorImgBox").offsetHeight / 247;
                this.coefficientX = (document.body.clientWidth - 40) / 1326;
                this.coefficientY = (document.body.clientHeight - 190) / 579;
                let that = this;
                this.$http.post('/entrance/all_info',{
                    sys_menu_id:this.$store.state.sysList['14'].sys_menu_id,
                    project_id:this.$store.state.projectId,
                    floor_id:that.floorIds,
                }).then(function(data){
                    console.log(data.data.data);
                    that.iList = data.data.data.entrance_guard_info.device_2d_pic_state_list;
                    that.totleDoors = data.data.data.entrance_guard_info.entrance_guard_total_num;
                    that.doorClose = data.data.data.entrance_guard_info.entrance_guard_close_num;
                    that.doorWarning = data.data.data.entrance_guard_info.entrance_guard_anomaly_num;
                    that.doorOpenN = data.data.data.entrance_guard_info.entrance_guard_open_num;
                    // console.log(data.data.data.entrance_guard_info.entrance_guard_open_num);
                    that.floorBgImg = data.data.data.entrance_guard_info.floor_background;
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