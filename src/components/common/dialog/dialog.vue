<template>
    <transition name="fade">
        <div class="modalBox" v-if = "isShow">
            <div class="modalBg"></div>
            <transition name="moveTop">
                <div class="modalBoxIn" :style = "{width:wids,height:heis,background:bgcolor}" v-if = "isShow">
                    <i class="colseBoxs" @click="hide"></i>
                    <div v-show="tits!=''" class="titBox" v-text = "tits"></div>
                    <slot></slot>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>

import utils from '../../../assets/js/utils';

export default {
  props:['wid','hei','tit','color','align','bgcolor'],
  data () {
    return {
        isShow:false,
        tits:'',
        heis:'',
        wids:''
    }
  },
  methods:{
      show(){
         this.isShow = true;
      },
      hide(){
        this.isShow = false;
      }
  },
  watch:{
    wid:{
      handler(val){
        console.log(val)
        if(this.wid.split('rem').length<=1){
            this.wids = utils.wid(this.wid)+'px';
        }else{
             this.wids = this.wid;
        }
      },
      deep:true
      
    },
    hei:{
      handler(val){
        console.log(val)
        if(this.hei.split('rem').length<=1){
            this.heis = utils.hei(this.hei)+'px';
        }else{
             this.heis = this.hei;
        }
      },
      deep:true
      
    }
  },
  created() {
      if(this.tit!==undefined){
          this.tits = this.tit;
      }
      if(this.hei.split('rem').length<=1){
          this.heis = utils.hei(this.hei)+'px';
      }else{
           this.heis = this.hei;
      }
      if(this.wid.split('rem').length<=1){
          this.wids = utils.wid(this.wid)+'px';
      }else{
           this.wids = this.wid;
      }
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/comon.less';

  .modalBox{
      position: fixed;
      left: 0;
      top: 0;
      z-index: 301;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      .modalBg{
          position: absolute;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,.75);
          background: -webkit-radial-gradient(rgba(0,0,0,.25), rgba(0,0,0,.75)); /* Safari 5.1 to 6.0 */
          background: -o-radial-gradient(rgba(0,0,0,.25), rgba(0,0,0,.75)); /* For Opera 11.6 to 12.0 */
          background: -moz-radial-gradient(rgba(0,0,0,.25), rgba(0,0,0,.75)); /* For Firefox 3.6 to 15 */
          background: radial-gradient(rgba(0,0,0,.25), rgba(0,0,0,.75));
          z-index: 88;
      }
      .modalBoxIn{
          width: 3.64rem;
          height: 2.16rem;
          position: relative;
          z-index: 99;
          background: #051732;
          box-shadow: 0px 2px 8px 0px
            rgba(39, 141, 255, 0.3),
            8px 24px 50px 0px
            rgba(113, 166, 241, 0.1);
            border-radius: 0.08rem;
            
            .colseBoxs{
                width: 0.2rem;
                height:0.2rem;
                background:url('../../../assets/img/AgentManage/close.png')no-repeat;
                background-size:0.2rem 0.2rem;
                position: absolute;
                right:-0.1rem;
                top: -0.1rem;
                color:#00265b;
                font-size: 0.2rem;
                cursor: pointer;
                z-index: 9999;
            }
           .titBox{
               height: 0.49rem;
               width: 100%;
               background: rgba(0,0,0,.25);
               text-align: center;
               color:#008aff;
               line-height: 0.49rem;
               font-size: 0.16rem;
               font-weight: 500;
           }
      }
  }

</style>
