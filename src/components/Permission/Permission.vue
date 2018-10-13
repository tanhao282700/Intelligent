<template>
  <div class="permissionBox autoComponent">
      <header>
        <router-link to="/permission/user">用户设置</router-link>
        <router-link to="/permission/role">角色设置</router-link>
      </header>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "permission",
        data(){
          return{

          }
        }
    }
</script>

<style scoped>
  .permissionBox{
    padding: 50px 30px 30px;
    color: #fff;
  }
  .permissionBox>div{
    height: 100%;
    width: 100%;
  }
  header{
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  header a{
    font-size: 20px;
    color: #333;
  }

</style>
