<template>
  <el-popover
    ref="airQuality2Popover"
    class="self-popover-airQuality2"
    popper-class="airQuality-self-popper2"
    :disabled="info.length===0"
    @show="getInfo"
    trigger="click">
    <slot slot="reference"></slot>
    <div class="airQuality-popover2">
      <div @click="toDetail(v.id)" class="item" v-for="(v,i) in info" v-text="v.name" :key="'airQuality-popover2-item'+i"></div>
    </div>
  </el-popover>
</template>

<script>
  export default {
    components:{
    },
    props: ['info'],
    data () {
      return {
      }
    },
    methods:{
      toDetail(device_id){
        this.$parent.device_id = device_id;
        this.$refs.airQuality2Popover.doClose();
        //console.log(this.$refs.airQuality2Popover)
        this.$parent.showRegionInfo = true;
        this.$parent.getRegionData(device_id);
      },
      getInfo(){

      }
    },
    created() {

    },
    mounted() {

    },
  }
</script>

<style lang="less" type="text/less">

  @import '../../../assets/css/comon';

  .airQuality-self-popper2{
    height: auto!important;
    position: absolute;
    background: #04152c;
    min-width: 150px;
    border: 0;
    padding: 0!important;
    z-index: 2000;
    color: #fff;
    line-height: 1.4;
    text-align: justify;
    font-size: 0.14rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);

    .airQuality-popover2{
      padding: 0.1rem;
      .vh(140);
      overflow: auto;
      .item{
        cursor: pointer;
        text-align: center;
        font-size: 0.14rem;
        line-height: 2;
        color: #fff;
        &:hover{
          color: #36fceb;
          text-decoration: underline;
        }
      }
    }
    .popper__arrow{
      border-bottom-color:#04152c!important;
      &::after{
        border-bottom-color:#04152c!important;
      }
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
      margin-right: -6px!important;
    }

  }

  .self-popover-airQuality2 {
    z-index: 1;
    .popover-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      &.isPointer{
        cursor: pointer;
      }
    }
  }



</style>
