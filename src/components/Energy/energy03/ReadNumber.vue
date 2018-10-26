<template>
  <div class="readNumber">
    <div class="head">
      <div class="type">
        <span class="active">区域
          <div class="spacing">
            <div class="to-top"></div>
            <div class="to-bottom"></div>
          </div>
        </span>
        <span>系统</span>
      </div>
      <!--<div class=""></div>-->
    </div>
    <div class="con">
      <div class="parts">
        <div class="part boxs"></div>
        <div class="part boxs"></div>
      </div>
      <div class="parts">
        <div class="part boxs"></div>
        <div class="part boxs"></div>
      </div>
    </div>
  </div>
</template>
<script>

  export default{
    name:'ReadNumber',
    data(){
      return{

      }
    },
    components:{

    },
    watch:{

    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import '../../../assets/css/comon.less';
  .readNumber{
    width:100%;
    height:100%;
    .head{
      height:10%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position:relative;
      .type{
        width:30%;
        height:55.17%;
        border:1px solid #3a84ef;
        border-radius:2px;
        display: flex;
        flex-direction: row;
        span{
          flex:1;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#1989f9;
          font-size:.16rem;
          position:relative;
          &:hover{
            cursor: pointer;
          }
          .spacing{
            position:absolute;
            right:0;
            top:0;
            width:1px;
            height:100%;
            .to-top{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0.5),rgba(73,143,226,0));
            }
            .to-bottom{
              width:2px;
              height:50%;
              .gradientT(rgba(73,143,226,0),rgba(73,143,226,0.5));
            }
          }
        }
        .active{
          background:rgba(0, 0, 0, 0.2);
        }
      }
    }
    .con{
      height:90%;
      display: flex;
      flex-direction: column;
      .parts{
        height:46.15%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &:last-child{
          margin-top:1.6%;
        }
        .part{
          flex:1;
          &:last-child{
            margin-left:1.6%;
          }
        }
      }
    }
  }
</style>
