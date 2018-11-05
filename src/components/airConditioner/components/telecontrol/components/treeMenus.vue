<template>

  <ul class="tree-in">
    <li v-for="(item,index) in list" :key="index">
      <p @click="changeStatus(index,item.checked)">
        <el-checkbox v-model="item.checked">{{item.name}}</el-checkbox>
        <span v-if="item.hasOwnProperty('cList')?item.cList.length !==0?true:false:false" :class="['icon-point',{active:scopesDefault[index]}]"></span>
      </p>
      <tree-menus v-if="scopesDefault[index]" :list="item.cList"></tree-menus>
    </li>
  </ul>

</template>
<script>
  // import treeMenus from './treeMenu2.vue'
  export default {
    name: 'treeMenus',
    props: {
      list: Array
    },
    data() {
      return {
        scopesDefault: [],
        scopes: []
      }
    },

    methods: {
      changeStatus(index,state) {
        console.log(index,state);
        if (this.scopesDefault[index] == true) {
          this.$set(this.scopesDefault, index, false)
        } else {
          this.$set(this.scopesDefault, index, this.scopes[index])
        }
      },
      scope() {
        this.list.forEach((item, index) => {
          this.scopesDefault[index] = false
          if ('cList' in item) {
            this.scopes[index] = true
            console.log(item, index)
          } else {
            this.scopes[index] = false
          }
        })
        //console.log(this.scopesDefault)
      }
    },
    created() {
      this.scope()
    },
    watch:{
      list:function (a,b) {
        alert(222222222)
        this.scope();
      }
    }
  }
</script>
<style lang="less" type="text/less">
  @import '../../../../../assets/css/common.css';
  @import '../../../../../assets/css/comon';
    .tree-in{
      width: 100%;
      padding-left: 0.3rem;
      padding-right: 0.3rem;
      li{

      }
      .el-checkbox{
        /*display: flex;
        align-items: center;*/
      }
      .el-checkbox__inner{
        width: 0.14rem;
        height: 0.14rem;
        &::after{
          height:0.07rem;
          left:0.04rem;
          width: 0.03rem;
          top:0.01rem;
        }
      }
      .el-checkbox__label{
        font-family: PingFangSC-Regular;
        font-size: 0.14rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #b5d7ff;
      }
      .icon-point{
        position: absolute;
        .vhTop(15);
        right: 0.21rem;
        height: 0px;
        width: 0px;
        border-top: 8px solid #439aff;
        border-right: 8px solid transparent;
        border-left: 8px solid transparent;
        transform: rotate(0deg);
        -ms-transform:rotate(0deg); 	/* IE 9 */
        -moz-transform:rotate(0deg); 	/* Firefox */
        -webkit-transform:rotate(0deg); /* Safari 和 Chrome */
        -o-transform:rotate(0deg); 	/* Opera */

        transition: ease-out .5s;
        -moz-transition: ease-out .5s;	/* Firefox 4 */
        -webkit-transition: ease-out .5s;	/* Safari 和 Chrome */
        -o-transition: ease-out .5s;	/* Opera */
        &.active{
          transform: rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); 	/* Opera */

          transition: ease-out .5s;
          -moz-transition: ease-out .5s;	/* Firefox 4 */
          -webkit-transition: ease-out .5s;	/* Safari 和 Chrome */
          -o-transition: ease-out .5s;	/* Opera */
        }
      }
    }
</style>
