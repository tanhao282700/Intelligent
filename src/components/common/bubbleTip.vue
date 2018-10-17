<template>
  <div>
    <transition name="el-fade-in-linear">
      <div v-html="tipText" v-show="$store.state.bubbleShow" class="bubbleBox"></div>
    </transition>
  </div>
</template>

<script>
    export default {
      props:['tipText'],
      name: "bubble-tip",
      data(){
        return{

        }
      }
    }
</script>

<style scoped>
  .bubbleBox{
    height: .4rem;
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: #000;
    background-color: rgba(220,220,220,.8);
    border-radius: 8px;
    padding: 0 0.15rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }

</style>
