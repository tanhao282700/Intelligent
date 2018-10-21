<template>
  <div id="app">
    <router-view/>
    <!--<transition name="bounce" mode="out-in">
      <router-view/>
    </transition>-->
  </div>
</template>

<script>
  import './assets/css/animate.css'
  export default {
    name: 'App'
  }
</script>

<style lang='less'>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }

  .bounce-enter-active {
    animation: fadeInRight .55s;
    position: absolute;
  }
  .bounce-leave-active {
    animation: fadeOutLeft .55s;
    position: absolute;
  }

</style>
