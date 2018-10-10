
<template>
    <transition name="fade">
        <div class = "tkBox" :style="{'left':pos.left,'top':pos.top}" v-show="isShow">
            <div class="sanjiao"></div>
            <ul>
                <li v-for="(v,i) in lists" v-text="v.label" @click="choose(v.value)">
                </li>                 
            </ul>   
        </div>
        
    </transition>
    
</template>

<script>

// 封装失败
export default {
  props:['lists','left','pos'],
  data () {
    return {
        isShow:false
    }
  },
  computed:{
    
  },
  methods:{
      choose(value){
          this.$emit('change',value);
          this.isShow =false;
      },
      show(){
          this.isShow =true;
      }
  },
  created() {
    
  },
  mounted() {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../../assets/css/comon.less';
.tkBox{
    position: fixed;
    width: 0.6rem;
    z-index: 999;
    ul{
         background-color: #0a2c5b;
        box-shadow: 0px -2px 10px 0px 
            #4a90e2;
        border: solid 1px #4a90e2;
        border-radius: 4px;
        padding: 0.05rem 0;
        height: 100%;
        width: 100%;
        li{
            height: 0.30rem;
            width: 100%;
            line-height: 0.35rem;
            text-align: center;
            cursor: pointer;
            color: #fff;
            &:hover{
                background: rgba(255,255,255,.2);
            }
        }    
    }
    .sanjiao{
        position: relative;
        width:0;
        height: 0;
        top: 0;
        left: 0.15rem;
        border: 0.1rem solid transparent;
        border-bottom-color:#0a2c5b;
        transform: translateY(2px);
    }
}
</style>
