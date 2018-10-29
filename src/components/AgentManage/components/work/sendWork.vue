<!--
    派发工单弹框
    2018-10-14 
-->
<template>
    <div class="sendWork">    
        <div class="infoTit">
            <span>派发工单</span>
        </div>
        <div class="selectX selectX1">
          <span>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</span>
          <SelectBox :options="options" 
           class="selectdown"
           :value="formvals.sys_id"
           :placeholder="'给排水系统'"
           :icon="'el-icon-d-caret'"/>
        </div>
        <div class="selectX">
          <span>设备名称</span>
          <SelectBox :options="options"
           :value="formvals.device_name"
           class="selectdown"
           :placeholder="'1号集水坑'"
           :icon="'el-icon-d-caret'"/>
        </div>
        <div class="selectX">
          <span>处理人员</span>
          <SelectBox :options="options"
           :value="formvals.user_id"
           class="selectdown"
           :placeholder="'张三'"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <span>工单来源</span>
          <SelectBox :options="options"
           :value="formvals.type_id"
           class="selectdown"
           :placeholder="'内部报修'"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <span>任务优先</span>
          <SelectBox :options="options"
           :value="formvals.priority"
           :placeholder="'严重'"
           class="selectdown"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <InputBox 
          :placeholder="'请输入设备地址'" 
          inputType="text" 
          :cssStyle="cssStyle"
          :modelValue="formvals.floor"
          :label="labelInput"/>
        </div>
        <div class="selectX selectX3">
          <InputBox 
          :placeholder="'请输入任务描述'" 
          :modelValue="formvals.description"
          inputType="textarea" 
          :cssStyle="cssStyle2"
          :label="textAreaLabel"/>
        </div>
        <div class="selectX">
          <InputBox 
          inputType="text" 
          :cssStyle="cssStyle"
          :readonly="true"
          :label="labelInput2" :modelValue="formvals.operator" />
        </div>
        <div class="sendWork2Boxs" @click="sendWork">
            <span>派发</span>
        </div>
    </div>
</template>

<script>
import SelectBox from '@/components/form/selectBox';
import InputBox from '@/components/form/inputBox'

export default {
  props:['data'],
  components:{
      'SelectBox':SelectBox,
      'InputBox':InputBox
  },
  data () {
    return {
       options:[],
       formvals:{
          operator:'姜媛媛'
       },
       cssStyle:{
          'width':'6.73vw',
          'height':30*100/728+'vh',
          'color':'#4F648B',
          'lineHeight':30*100/728+'vh',
          'textAlign':'center',
          'display':'inline-block'
       },
       cssStyle2:{
          'width':'6.73vw',
          'height':30*100/728+'vh',
          'color':'#4F648B',
          'verticalAlign':'top',
          'textAlign':'center',
          'display':'inline-block'
       },
       labelInput:{
          text:'设备地址',
       },
       textAreaLabel:{
          text:'任务描述',
       },
       labelInput2:{
          text:'派发人',
       },
    }
  },
  methods:{
      sendWork(){
        this.$emit('sendInfosShow',this.formvals);
      }
  },
  mounted() {
       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.sendWork{
    .infoTit{
        width: 100%;
        .vh(46);
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span{
            position: absolute;
            color: #fff;
            font-size: 16*100/728vh;
            left: 0.2rem;
            .vhTop(17);
            .vh(16);
            .vhLH(16);
        }
    }
    .selectX1{
      .vhMT(20);
    }
    .selectX{
      .vhMB(16);
      .vh(32);
      span{
        width:6.73vw;
        color:#4F648B;
        text-align:center;
        display:inline-block;
      }
      .selectdown{
        border:1px solid #1989FA;
        width:14.64vw;
        border-radius:3px;
      }
    }
    .selectX3{
      .vh(146)
    }
    .sendWork2Boxs{
        color:#fff;
        text-align:center;
        span{
          width: 5.71vw;
          .vh(32);
          .vhLH(32);
          display:inline-block;
          padding-left:1.46vw;
          box-shadow:0px 2px 5px 0px rgba(74,144,226,0.4),1px 1px 1px 0px rgba(248,253,255,0.15),0px 0px 1px 0px rgba(74,144,226,1);
          border-radius:2px;
          background:#3B85EF url('../../../../assets/img/AgentManage/eject-distribution.png')no-repeat 0.73vw center;
          background-size:1.46vw;
          &:hover{
            cursor:pointer;
          }
        }
    }
}
    
</style>
