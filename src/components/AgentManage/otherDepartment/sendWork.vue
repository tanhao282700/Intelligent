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
          <SelectBox :options="query.types" 
           class="selectdown"
           :value="formvals.sys_id"
           :placeholder="'类型'"
           @change="change1"
           :icon="'el-icon-d-caret'"/>
        </div>
        <div class="selectX">
          <span>设备名称</span>
          <SelectBox :options="query.devicess"
           :value="formvals.device_name"
           class="selectdown"
           @change="change2"
           :placeholder="'设备名称'"
           :icon="'el-icon-d-caret'"/>
        </div>
        <div class="selectX">
          <span>工程审批</span>
          <SelectBox :options="query.names"
           :value="formvals.approve_user_id"
           class="selectdown"
           @change="change3"
           :placeholder="'审批人员'"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <span>工单来源</span>
          <SelectBox :options="query.type_id"
           :value="formvals.type_id"
           class="selectdown"
           @change="change4"
           :placeholder="'工单来源'"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <span>任务优先</span>
          <SelectBox :options="query.priority"
           :value="formvals.priority"
           :placeholder="'任务优先级'"
           @change="change5"
           class="selectdown"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <span>拍照需求</span>
          <SelectBox :options="query.takePhoto"
           :value="formvals.take_photo"
           :placeholder="'是否需要拍照'"
           @change="change6"
           class="selectdown"
           :icon="'el-icon-caret-top'"/>
        </div>
        <div class="selectX">
          <div class = "inputbox inputbox2">
              <span v-text="'设备地址'" ></span>
              <el-input
                type="text"
                class="deviceaddr"
                placeholder="请输入地址"
                v-model="formvals.floor"
                clearable>
              </el-input>           
          </div>
        </div>
        <div class="selectX selectX3">
          <div class = "inputbox">
              <span v-text="'任务描述'" ></span>
              <el-input
                resize="none"
                type="textarea"
                :rows="3"
                class="otherDepSendWorkWin"
                placeholder="请输入描述"
                v-model="formvals.description"
                clearable>
              </el-input>           
          </div>
        </div>
        <div class="selectX otherDepSendWorkSelectX4">
          <InputBox 
          inputType="text" 
          :cssStyle="cssStyle"
          :readonly="'readonly'"
          :label="labelInput2" 
          :modelValue="formvals.operator" />
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
  props:['data','query'],
  components:{
      'SelectBox':SelectBox,
      'InputBox':InputBox
  },
  data () {
    return {
       options:[],
       formvals:{
          operator:this.$store.state.userInfoTotal.userinfo.name,
          description:'',
          floor:''
       },
       cssStyle:{
          'width':'0.9rem',
          'height':'0.3rem',
          'color':'#4F648B',
          'float':'left',
          'lineHeight':'0.3rem',
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
        console.log(this.formvals)
        this.$emit('sendInfosShow',this.formvals);
      },
      change1(val){
        this.formvals.sys_id = val;
        this.$emit('getDevVal',val)
      },
      change2(val){
        $.each(this.query.devicess,(n,k)=>{
          if(val==k.value){
            this.formvals.device_name = k.label;
            this.formvals.device_id = k.value;
          }
        })
        //this.formvals.device_name = val;
      },
      change3(val){
        this.formvals.approve_user_id = val;
      },
      change4(val){
        this.formvals.type_id = val;
      },
      change5(val){
        this.formvals.priority= val;
      },
      change6(val){
        this.formvals.take_photo = val;
      }
  },
  mounted() {
       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../assets/css/comon.less';

.sendWork{
    .infoTit{
        width: 100%;
        height:0.46rem;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        span{
            position: absolute;
            color: #fff;
            font-size: 0.16rem;
            left: 0.2rem;
            top:0.17rem;
            height:0.16rem;
            line-height:0.16rem;
        }
    }
    .selectX1{
      margin-top:0.2rem;
    }
    .selectX{
      display: flex;
      align-items: center;
    }
    .selectX,.inputBox{
      margin-bottom:0.16rem;
      height:0.32rem;
      span{
        width:0.9rem;
        color:#4F648B;
        text-align:center;
        display:inline-block;
      }
      .deviceaddr{
        width:4.1rem;
        background:#001837;
        -moz-box-shadow:0 3px 5px #000 inset;               
        -webkit-box-shadow:0 4px 5px #000 inset;            
        box-shadow:0 3px 5px #000 inset;               
      }
      .selectdown{
        border:1px solid #1989FA;
        width:2rem;
        border-radius:0.03rem;
      }
    }
    .selectX3{
      height: auto;
      .taskdesc{
        width:4.1rem;
        background:#001837;
        -moz-box-shadow:0 3px 5px #000 inset;               
        -webkit-box-shadow:0 4px 5px #000 inset;            
        box-shadow:0 3px 5px #000 inset;
      }
      span{
        float:left;
        line-height:0.32rem;
        width:0.92rem;
      }
    }
    .sendWork2Boxs{
        color:#fff;
        text-align:center;
        span{
          width: 0.98rem;
          position:absolute;
          bottom:0.26rem;
          left:2.25rem;
          height:0.32rem;
          line-height:0.32rem;
          display:inline-block;
          padding-left:0.2rem;
          box-shadow:0px 2px 5px 0px rgba(74,144,226,0.4),1px 1px 1px 0px rgba(248,253,255,0.15),0px 0px 1px 0px rgba(74,144,226,1);
          border-radius:0.03rem;
          background:#3B85EF url('../../../assets/img/AgentManage/eject-distribution.png')no-repeat 0.73vw center;
          background-size:0.2rem;
          &:hover{
            cursor:pointer;
          }
        }
    }
    .inputbox2 span{
      float:left;
      width:0.92rem;
      line-height:0.32rem;
    }
}
    
</style>
