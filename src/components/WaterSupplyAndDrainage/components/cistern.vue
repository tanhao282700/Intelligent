<!--
    给排水系统 水泵
    made by 胡永福
    start in 2018-8-6
-->
<template>
  <div>
    <div ref="HpadTop" class="tabsDomBox0 h-paddingTop">
      <div class="navCrumbs"><p @click="toHome">首页</p> > 给排水系统 > <span>蓄水池</span></div>
    </div>
    <div class="WaterPump">
      <div class="self-padding">
        <warnInfo
          :warnInfoLists="FwarnInfoLists"
          :stateLists="FstateLists"
        />
        <device-lists2
          :DLists="FdeviceLists"
          :deviceImages="FdeviceImages"
          :deviceImagesSize="FdeviceImagesSize"
        />
      </div>

    </div>
  </div>

</template>

<script>

  import utils from "../../../assets/js/utils.js";
  import warnInfo from './warnInfo'
  import DeviceLists2 from "./deviceLists2";

  export default {
    components: {
      DeviceLists2,
      "warnInfo":warnInfo,
    },
    name: "cistern",
    data() {
      return {
        FwarnInfoLists:[

        ],
        FstateLists:[
          {color:'color-normal',state:'开启状态'},
          {color:'color-innormal',state:'异常状态'},
        ],
        FdeviceImagesSize:['2.24rem','1.54rem'],
        FdeviceImages:[
          {src:require('../../../assets/img/WaterSupplyAndDrainage/cistern_normal.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/cistern_high.png')},
          {src:require('../../../assets/img/WaterSupplyAndDrainage/cistern_low.png')}
        ],

        FdeviceLists:[

        ]
      }
    },
    methods: {
      toHome(){
        this.$router.replace({ path: '/home', params: { isLogin: true} });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getDeviceLists(){
        let that = this;
        let config = {
          'sys_menu_id':(this.$store.state.sysList[6].son_list[0].self_id==7?this.$store.state.sysList[6].son_list[0].sys_menu_id:this.$store.state.sysList[6].son_list[1].sys_menu_id),
          'project_id':this.$store.state.projectId,
          'floor_id':48,
          'self_id':1263
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_device_list', config, headers).then(res => {
          let data = res.data;
          console.log('系统设备列表', config, res);
          if(data.code==0){
            this.FdeviceLists = data.data;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      },
      getWarnInfoLists(){
        let that = this;
        let config = {
          'sys_menu_id':(this.$store.state.sysList[6].son_list[0].self_id==7?this.$store.state.sysList[6].son_list[0].sys_menu_id:this.$store.state.sysList[6].son_list[1].sys_menu_id),
          'floor_id':48,
          'self_id':1263,
          'device_id':''
        }
        let headers = {
          //'Content-Type': 'multipart/form-data'
        }
        this.$http.post('drainage/drainage_alert', config, headers).then(res => {
          let data = res.data;
          console.log('系统设备报警信息列表', config, res);
          if(data.code==0){
            this.FwarnInfoLists = data.data;
          }else{
            this.$message(data.message);
          }
        }).catch(err=>{
          console.log(err);
        })

      }
    },
    created() {
      this.getDeviceLists();
      this.getWarnInfoLists();
      //alert(this.$route.params.test)
    },
    mounted() {
      this.$refs.HpadTop.style.paddingTop = Number(this.$parent.$children[0].$el.children[0].offsetHeight)+30+'px';
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  .WaterPump{
    width:100%;
    height:100%;
    //background:#dedede;
    //overflow: hidden;
    .self-padding{
      padding: 0 0.3rem;
    }


  }

</style>
