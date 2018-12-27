<!--
    给排水系统 报警信息框
    made by 胡永福
    start in 2018-8-6
-->
<template>
  <div class="warnInfoBox">
      <div class="info">
        <span class="icon-warn"></span>
        <span class="col-line"></span>
        <div id="con1" :class="{anim:animate==true}">
          <span v-for="(item,i) in warnInfoLists" class="self-font rowHei" :key="item.id">{{item.devicename+'：'+item.content}}<span v-text="item.time" style="color: #ed4a4a;margin-left: 0.2rem"></span></span>
        </div>
      </div>
    <div class="states">
      <div v-for="(item,i) in stateLists" class="item" :key="i">
        <span :class="[iconCircle,item.color]"></span>
        <span v-text="item.state" class="self-font"></span>
      </div>
    </div>
  </div>
</template>

<script>


  export default {
    components: {

    },
    name: "waterPump",
    props:['stateLists','warnInfoLists'],
    data() {
      return {
        animate:false,
        /*warnInfoLists:[
          {
            "alarm_level": "0",
            "class": "2",
            "content": "漏水了。",
            "describe": "描述",
            "device_id": "33",
            "devicename": "1号水泵",
            "id": "1",
            "schedule": "0",
            "time": "2018-08-06 13:00:00",
            "username": "张2"
          },
          {
            "alarm_level": "0",
            "class": "2",
            "content": "1号水泵出现异常",
            "describe": "",
            "device_id": "33",
            "devicename": "1号水泵",
            "id": "33",
            "schedule": "0",
            "time": "2018-08-16 17:16:22",
            "username": "张2"
          }
        ],*/
        iconCircle:'icon-circle',
        /*stateLists:[
          {color:'color-normal',state:'开启状态'},
          {color:'color-innormal',state:'异常状态'},
          {color:'color-close',state:'关闭状态'},
        ],
        warnContent:'机房漏水报警'*/
      }
    },
    methods: {
      scroll(){
        this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.warnInfoLists.push(this.warnInfoLists[0]);  // 将数组的第一个元素添加到数组的
          this.warnInfoLists.shift();               //删除数组的第一个元素
          this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        },500)
      }
    },
    created() {

      setInterval(this.scroll,2000)
    },
    mounted() {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
  @import '../../../assets/css/common.css';
  .warnInfoBox{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0.6rem;
    padding: 0 0.3rem 0 0.2rem;
    background-color: transparent;
    box-shadow: 0px 4px 10px 0px
    rgba(74, 144, 226, 0.22),
    inset 1px 1px 2px 0px
    rgba(248, 253, 255, 0.15),
    inset 0px -1px 1px 0px
    #4a90e2;
    border-radius: 4px;
    .self-font{
      font-family: PingFangSC-Regular;
      font-size: 0.16rem;
      font-weight: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: 0px;
      color: #ffffff;
    }
    #con1{
      display: inline-block;
      height: 100%;
      overflow: hidden;
    }
    .anim{
      transition: all 0.5s;
      margin-top: -0.8rem;
    }
    .rowHei{
      display: block;
      line-height: 0.6rem;
    }
    .info {
      height: 100%;
      display: flex;
      align-items: center;
      overflow: hidden;
      .icon-warn {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        background: url("../../../assets/img/WaterSupplyAndDrainage/icon_warn.png") no-repeat center;
        background-size: cover;
      }
      .col-line {
        margin: auto 0.2rem;
        display: inline-block;
        width: 1px;
        height: 0.2rem;
        background-color: #4a90e2;
        border-radius: 0.36rem;
      }

    }

    .states{
      display: flex;
      align-items: center;

      height: 100%;
      .item{
        margin-left: 0.2rem;
        .icon-circle{
          margin-right: 0.1rem;
          display: inline-block;
          width: 0.16rem;
          height: 0.16rem;
          border-radius: 50%;
        }
      }
    }


  }

</style>
