<template>
  <div class="modeControl">
    <div class="head">
      <span class="title">定时自动控制</span>
      <div class="btnBox">
        <button v-show="showAllModeBtn" @click="switchControl(i)" type="button" v-for="(v,i) in btnLists" v-text="v.tit" :key="i" :class="{active:i==btnActive}"></button>
      </div>
    </div>
    <div class="body">
      <div class="h-tableBox">
        <div class="title">
          <div :style="{width:v.wid}" class="th" v-for="(v,i) in tableThLists" v-text="v.label" :key="i"></div>
        </div>
        <div class="content">
          <div class="tr" v-for="(v,i) in tableTdLists">
            <div class="td">
              <div :style="{width:tableThLists[0].wid}" class="num" v-text="(i+1)<10?('0'+(i+1)):(i+1)"></div>
              <!--<div :style="{width:tableThLists[0].wid}" class="num" v-text="v.id"></div>-->
              <div :style="{width:tableThLists[1].wid}" class="mode">
                <el-input @change="modeObjValChange(v)" v-model="v.name" placeholder="请输入内容"></el-input>
              </div>
              <div :style="{width:tableThLists[2].wid}" class="startTime">
                <el-time-picker
                  @change="modeObjValChange(v)"
                  v-model="v.startTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="无">
                </el-time-picker>
              </div>
              <div :style="{width:tableThLists[3].wid}" class="endTime">
                <el-time-picker
                  @change="modeObjValChange(v)"
                  v-model="v.endTime"
                  format="HH:mm"
                  value-format="HH:mm"
                  placeholder="无">
                </el-time-picker>
              </div>
              <div :style="{width:tableThLists[4].wid}" class="loop">
                <el-checkbox-group @change="modeObjValChange(v)" v-model="v.loop" size="medium">
                  <el-checkbox-button v-for="week in weeks" :label="week" :key="week">{{week==1?'星期一':week==2?'星期二':week==3?'星期三':week==4?'星期四':week==5?'星期五':week==6?'星期六':week==0?'星期日':'未知错误'}}</el-checkbox-button>
                </el-checkbox-group>
              </div>
              <div :style="{width:tableThLists[5].wid}" class="room">
                <el-select
                  @change="modeObjValChange(v)"
                  multiple
                  collapse-tags
                  v-model="v.room"
                  placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div :style="{width:tableThLists[6].wid}" class="operate no-select">
                <span @click="toggleSwitch(v.state,i,v)" class="switch" v-text="v.state==0?'开启':'关闭'"></span>
                <span @click="del(v.id)" class="del">删除</span>
              </div>
            </div>
          </div>
          <div class="addBtns" @click="addMode()">
            <i class="el-icon-circle-plus"></i>
            <span>添加模式</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../../../assets/js/utils';
  export default {
    components: {

    },
    name: "modeControl",
    data() {
      return {
        showAllModeBtn:true,
        btnId:-1,
        btnActive:0,
        btnLists:[
          {id:1,tit:'开启'},
          {id:2,tit:'关闭'},
        ],
        tableThLists:[
          {id:1,label:'编号',wid:'0.5rem'},
          {id:2,label:'模式名称',wid:'1.2rem'},
          {id:3,label:'开启时间',wid:'1.2rem'},
          {id:4,label:'关闭时间',wid:'1.2rem'},
          {id:5,label:'循环',wid:'6.12rem'},
          {id:6,label:'机房',wid:'1.64rem'},
          {id:7,label:'操作',wid:'1.2rem'},
        ],
        tableTdLists:[
          // {id:1,name:'',startTime:'',endTime:'', loop:[],room:[],state:'0'},
        ],

        weeks:['1','2','3','4','5','6','0'],
        options: [
          /*{
            value: '53',
            label: '1号机房'
          },
          {
            value: '54',
            label: '2号机房'
          }*/
        ],
      }
    },
    methods: {
      //获取机房信息
      requestFloor(sysID=this.$store.state.sysList[1].son_list[0].sys_menu_id){
        let that = this;
        let config = {
          sys_menu_id:sysID,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('/hvac_pc/pc/floor', config, headers).then(res => {
          let data = res.data;
          console.log('获取机房信息', config, res);
          if (data.code == 0) {
            let floorArr = data.data;
            let tempArr = [];
            floorArr.map((item,i)=>{
              let obj = {};
              obj.value = item.floor_id.toString();
              obj.label = item.title;
              tempArr.push(obj);
            })
            this.options = tempArr;
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      modeObjValChange(val){
        this.addModes(val.id, val.room.join(','), val.loop.join(','), val.startTime, val.endTime, val.name, val.state);
      },
      //获取当前模式
      getNowModes(){
        let that = this;
        let config = {
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control/select', config, headers).then(res => {
          let data = res.data;
          console.log('模式控制下的当前模式', config, res);
          if (data.code == 0) {
            let data2 = data.data;
            let tempArr = [];
            data2.map((item,i)=>{
              let obj = {};
              obj.id = item.id;
              obj.name = item.title;
              obj.startTime = item.time_start;
              obj.endTime = item.time_end;
              obj.loop = item.loop.split(',');
              obj.room = item.floor.split(',');
              obj.state = item.state;
              tempArr.push(obj);
              console.log('标记',obj.room)
            });
            this.tableTdLists = tempArr;


          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })

      },
      //新增或修改模式
      addModes(id=0,floor='0',loop='0',time_start='00:00',time_end='23:59',title='新增的模式',state=0){
        let that = this;
        let config = {
          id:id,
          floor:floor,
          loop:loop,
          time_start:time_start,
          time_end:time_end,
          title:title,
          state:state,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control', config, headers).then(res => {
          let data = res.data;
          console.log('新增或修改当前模式', config, res);
          if (data.code == 0) {
            if (id == 0){
              let len = this.tableTdLists.length;
              let obj = {id:data.data,name:'新增的模式',startTime:'00:00',endTime:'00:00', loop:[0],room:[],state:0};
              this.tableTdLists.push(obj);
            } else {//修改
              this.$message(data.message);
            }
          } else {
            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },

      //删除模式
      delModes(id){
        let that = this;
        let config = {
          id:id,
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control/delete', config, headers).then(res => {
          let data = res.data;
          console.log('删除模式', config, res);
          if (data.code == 0) {
            this.$message(data.message);
          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      //查询总开关模式
      selectAllModes(){
        let that = this;
        let config = {

        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control/all/select', config, headers).then(res => {
          let data = res.data;
          console.log('模式控制总开关', config, res);
          if (data.code == 0) {
            if (data.data.length !== 0){
              if (data.data[0].state == 0){
                this.btnActive = 1;
                this.btnId = data.data[0].id;
              } else if (data.data[0].state == 1) {
                this.btnActive = 0;
                this.btnId = data.data[0].id;
              }else {
                alert('总开关按钮未知错误！')
              }
            } else {
              this.showAllModeBtn = false;
            }

          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },
      //查询总开关模式
      requestControlAllModes(id,state){
        let that = this;
        let config = {
          id:id,
          state:state
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.get('hvac_pc/pc/control/all/add', config, headers).then(res => {
          let data = res.data;
          console.log('模式控制总开关的控制', config, res);
          if (data.code == 0) {
            if (state === 1){
              this.btnActive = 0;
              this.$message('修改成功');
            } else {
              this.btnActive = 1;
              this.$message('修改成功');
            }
          } else {

            this.$message(data.message);
          }
        }).catch(err=>{
          this.$message(err);
        })
      },

      switchControl(val){
        if (this.btnId !== -1){
          if (val === 0){
            this.requestControlAllModes(this.btnId,1)
          } else if (val === 1) {
            this.requestControlAllModes(this.btnId,0)
          }
        }


      },
      addMode(){
        this.addModes();
      },
      toggleSwitch(str,index,val){
        if (str==1) {
          this.tableTdLists[index].state = 0;
          this.addModes(val.id, val.room.join(','), val.loop.join(','), val.startTime, val.endTime, val.name, val.state);
        }else if (str==0) {
          this.tableTdLists[index].state = 1;
          this.addModes(val.id, val.room.join(','), val.loop.join(','), val.startTime, val.endTime, val.name, val.state);
        }
      },
      del(index){
        let tagList = this.tableTdLists;
        for(var i = 0; i < tagList.length; i++){
          if(tagList[i].id === index){
            this.tableTdLists.splice(i,1);
            //this.forceUpdate();
          }
        }
        this.delModes(index);

      }
    },
    created() {
      this.requestFloor();
      this.getNowModes();
      this.selectAllModes();
    },
    mounted() {

    },
    watch:{
      /*tableTdLists:{
        handler: function (newArr,oldArr) {
          if (newArr.length === oldArr.length){
            newArr.map((item,i)=>{

            })
          }
        },
        deep:true
      }*/
    }
  }
</script>

<style lang="less" type="text/less">
  @import '../../../../assets/css/common.css';
  @import '../../../../assets/css/comon';
  .modeControl{

    margin: 0 auto;
    width: 13.06rem;
    .vh(580);
    .vhMT(4);
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .head{
      width: 100%;
      .vh(50);
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      position: relative;
      .title{
        font-family: PingFangSC-Medium;
        font-size: 0.16rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: 0px;
        color: #008aff;

      }
      .btnBox{
        position: absolute;
        right: 0.2rem;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        button{
          cursor: pointer;
          &:first-of-type{
            margin-right: 0.1rem;
          }
          width: 0.68rem;
          .vh(32);
          background-color: rgba(59, 137, 249, 0.2);
          border-radius: 4px;
          border:0;
          outline: none;

          font-family: PingFangSC-Medium;
          font-size: 0.14rem;
          font-weight: normal;
          font-stretch: normal;
          line-height: 1;
          letter-spacing: 0px;
          color: #ffffff;
          &.active{
            background-color: #3a84ee;
          }
        }
      }
    }

    .body{
      .h-tableBox{
        border: solid 1px rgba(181, 215, 255, 0.25);
        .title{
          width: 13.06rem;
          .vh(35);
          display: flex;
          justify-content: flex-start;
          .th{
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: PingFangSC-Regular;
            font-size: 0.16rem;
            font-weight: normal;
            font-stretch: normal;
            .vhLineH(35);
            letter-spacing: 0px;
            color: #b5d7ff;
            border-right: solid 1px rgba(181, 215, 255, 0.25);
            border-bottom: solid 1px rgba(181, 215, 255, 0.25);
          }
        }
        .content{
          width: 13.06rem;
          .vh(495);
          overflow-x: hidden;
          .tr{
            display: flex;
            justify-content: flex-start;
            .td{
              &>*{
                height: 100%;
                border-right: solid 1px rgba(181, 215, 255, 0.25);
                display: flex;
                align-items: center;
              }
              border-bottom: solid 1px rgba(181, 215, 255, 0.25);
              display: flex;
              justify-content: center;
              align-items: center;

              font-family: PingFangSC-Regular;
              font-size: 0.14rem;
              font-weight: normal;
              font-stretch: normal;
              line-height: 1;
              letter-spacing: 0px;
              color: #439aff;
              text-align: center;

              .el-input{
                width: 100%!important;
                height: 100%!important;
              }
              .el-input__inner{
                width: 100%!important;
                height: 100%!important;
                font-size: 0.14rem!important;
                border: 0!important;
                padding: 0;
                text-align: center;
              }
              .el-input__prefix{
                display: none;
              }
              .el-checkbox-button--medium .el-checkbox-button__inner{
                width: 0.76rem;
                .vh(25);
                background-color: #4f648b;
                border-radius: 1px;
                padding: 0;
                border:1px solid transparent;

                font-family: PingFangSC-Light;
                font-size: 0.14rem;
                .vhLineH(25);
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #ffffff;
              }
              .is-checked{
                .el-checkbox-button__inner{
                  background-color: #3a84ee;
                  box-shadow: none;
                }
              }
              .el-checkbox-button{
                margin-right: 0.1rem;
                &:last-of-type{
                  margin-right: 0;
                }
              }
              .num{
                justify-content: center;
              }
              .mode{
                width: 1.20rem;
                .vh(35);
              }
              .loop{
                justify-content: center;
              }
              .room{

              }
              .operate{
                display: flex;
                justify-content: space-around;
                .switch{
                  cursor: pointer;
                  padding: 4px 0;
                  border-bottom: 1px solid transparent;
                  &:hover{
                    border-bottom: 1px solid #3b89f9;
                  }
                }
                .del{
                  cursor: pointer;
                  padding: 4px 0;
                  border-bottom: 1px solid transparent;
                  &:hover{
                    border-bottom: 1px solid #3b89f9;
                  }
                }
              }
            }
          }
          .addBtns{
            width: 100%;
            text-align: center;
            line-height: 0.35rem;
            font-size: 0.16rem;
            background: rgba(58,132,238,0.2);
            border: solid 0.01rem #1989fa;
            cursor: pointer;
            i{
              color:#3a84ee;
            }
            span{
              color:#fff;
            }
          }
        }
      }
    }

  }
</style>
