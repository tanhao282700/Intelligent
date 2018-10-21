<template>
  <div class="permissionBox autoComponent">
    <SysHead :datas = "routerData" v-on:searchCont="search"/>
    <router-view></router-view>
  </div>
</template>

<script>
    import SysHead from '@/components/common/sysHead';
    import "../../assets/css/Permission/permission.css";

    export default {
      components:{
        "SysHead":SysHead
      },
      name: "permission",
      data(){
        return{
          routerData:{
            id:0,
            lists:[
              {id:0,name:'用户设置',route:'/permission/user'},
              {id:1,name:'角色设置',route:'/permission/role'},
              {id:2,name:'登录日志',route:'/permission/loginLog'},
            ]
          }
        }
      },
      methods:{
        search(param){
          console.log(param);
        }
      }
    }
</script>

<style scoped>

</style>
