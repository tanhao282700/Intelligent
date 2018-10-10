<template>
  <ul class='crumbsBox'>
    <li class="baiLi">
      <router-link to="/home" class="baiLia">
        首页
      </router-link>
    </li>
    <li class="baiLi"
        v-for="(val,i) in data"
        v-text="'>'+val+' '"
        :class="{'isNow':i==data.length-1}"
    >
    </li>
    <div class="modeBox" v-if="isIfff">
      <div class="mode">
        <p class="text" v-text="msggg"></p>
      </div>
    </div>


  </ul>
</template>

<script>

export default {
  props:['data','isIfD','msgD'],
  data () {
    return {
      isIfff:false,
      msggg:'',
    }
  },
  methods:{
  },
  created() {
    if (this.isIfD != undefined){
      if (this.isIfD == true) {
        this.isIfff = true;
      }
    }

  },
  mounted() {
    this.msggg = this.msgD;
  },
  watch:{
    msgD:function (a,b) {
      this.msggg = this.msgD;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';
  .crumbsBox{
      width:100%;
      .vh(26);
        .vhLH(30);
      padding-left:2.489vw;
    position: relative;
    .modeBox{

      position: absolute;
      left: 50%;
      .vhTop(10);
      .mode{
        transform: translateX(-50%);
        margin: 0 auto;
        width: 4.5rem;
        .vh(30);
        background-color: #011f51;
        box-shadow: 0px 0px 2px 0px
        rgba(87, 113, 176, 0.15),
        inset 0px 0px 3px 0px
        rgba(0, 0, 0, 0.33);
        border: solid 1px #000c22;
        .text{
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-size: 0.13rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 1px;
          color: #ffa414;
          text-shadow: 4px 4px 2px rgba(237, 74, 74, 0.27);
          padding: 0 0.13rem;
          text-align: center;
        }
      }
    }
      .baiLi{
        float:left;
        font-size:0.12rem;
        color:#4d5d76;
        font-family: PingFangSC-Regular;
        .baiLia{
            color:#4d5d76;
        }
      }
      .isNow{
          color:@color-blue
      }
  }

</style>
