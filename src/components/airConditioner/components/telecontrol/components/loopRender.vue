<template>
  <div class="treeBox">
      <my-trees :list="loopRenderData"></my-trees>
  </div>
</template>
<script>
  import myTrees from './treeMenus'
  export default {
    components: {
      myTrees
    },
    props:['loopRenderData'],
    data () {
      return {
        list: [
          /*{
            checked:false,
            name: '黄焖鸡米饭111111111',
            cList: [
              { name: '二级黄焖鸡',checked:false, },
              {
                name: 'one chicken',
                checked:false,
                cList: [
                  { name: '三级黄焖鸡3333',checked:false, cList: [{ name: '四级黄焖鸡' ,checked:false,}] }
                ]
              }
            ]
          },
          { name: '2222222222',checked:false,cList:[]},
          {
            name: '黄焖鸡米饭33333333',
            checked:false,
            cList: [{ name: '二级黄焖鸡' ,checked:false,}, { name: 'one chicken' ,checked:false,}]
          }*/
        ]
      }
    },
    methods: {},
    mounted(){

    }

  }
</script>
<style lang="less"  type="text/less">
  @import '../../../../../assets/css/common.css';
  @import '../../../../../assets/css/comon';
  .treeBox{
    width: 12.96rem;
    margin: 0 auto;
    &>ul {
      width: 100%;
      padding-left: 0!important;
      li{
        p{
          position: relative;
          border-bottom: solid 1px #09264d;
          width: 100%;
          text-indent: 0.3rem;

          font-family: PingFangSC-Regular;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          .vhLineH(40);
          letter-spacing: 0px;
          color: #ffffff;
          *{
            text-indent: 0;
          }
        }
      }
      &>li{
        width: 100%;
        min-height: 40px;
        background-color: red;
        background-color: rgba(0, 29, 71, 0.2);
        border-radius: 2px;
        border: solid 1px #007fff;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        //padding-left: 0.3rem;
        .vhMT(10);
        &>p{
          border-bottom: solid 1px #007fff;
        }
      }
    }
  }
</style>
