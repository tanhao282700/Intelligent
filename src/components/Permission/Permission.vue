<template>
  <div class="permissionBox autoComponent">
    <SysHead :datas = "routerData" v-on:searchCont="search"/>
    <router-view></router-view>
  </div>
</template>

<script>
    import SysHead from '@/components/common/sysHead';
    import "../../assets/css/Permission/permission.css";
    import axios from 'axios';

    export default {
      components:{
        "SysHead":SysHead
      },
      name: "permission",
      data(){
        return{
          routerData:{
            id:0,
            lists:[]
          }
        }
      },
      created(){
          console.log(this.$store.state)
        if(this.$store.state.userInfoTotal.permissions_manage.role_string[0]!='0'){
          this.routerData.lists.push({id:0,name:'用户设置',route:'/permission/user'})
        }
        if(this.$store.state.userInfoTotal.permissions_manage.role_string[1]!='0'){
              this.routerData.lists.push({id:1,name:'角色设置',route:'/permission/role'})
        }
        this.routerData.lists.push({id:2,name:'登录日志',route:'/permission/loginLog'})
      },
      methods:{
        search(param){
          console.log(param);
        },
      },
      mounted(){

      },
      beforeDestroy(){
        let that  = this;
        that.$store.state.permission.options = [];
      }

    }
</script>

<style scoped>

</style>
