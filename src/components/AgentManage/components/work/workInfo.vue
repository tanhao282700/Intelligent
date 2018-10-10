<!--
    工单详情
    2018-8-24 
-->
<template>
    <div class="workInfo">    
        <div class="infoTit">
            <span>工单详情</span>
            <div class="dateBox">
                <TimePickerT 
                    :value7= "value7"
                    :cant  = 'cant'
                    @changes = "changes"
                    @deletes = 'deletes'
                    @adds    = 'adds'
                />
            </div>
        </div>
        <div>
            <div class="tbalHe">
                <div class="btnBox">
                    <div class="jobBoxs">
                        <SelectBox 
                            :options = 'jobs' 
                            :value = "vJob" 
                            placeholder="类别"
                            @change = 'change1'
                        />
                    </div>
                    <div class="searchBoxs">
                        <i class="el-icon-search"></i>
                        <span>筛选</span>
                    </div>   
                </div>
                    
                <ul class="nums">
                    <li>
                        <span>今日工单总数</span>
                        <div class="numss colorY">99</div>
                    </li>
                    <li>
                        <span>未完成</span>
                        <div class="numss colorR">99</div>
                    </li>
                    <li>
                        <span>已完成</span>
                        <div class="numss colorG">99</div>
                    </li>
                </ul>   
            </div>
            <div class="tabBoxss">
                <Table 
                    style="width:100%" 
                    :table = "table"
                    @rowClick = "showInfos"
                />    
            </div>           
        </div>
        <Dialog wid="364" hei="216" ref="isRefult">
            <div v-text="dialogBoxs.txt" class="isRefTxt"></div>
            <div class="isRbtnBoxs">
                <span @click="submitOk">确定</span>
                <span @click="submitNo">取消</span>
            </div>
        </Dialog> 
        <Dialog wid="414" hei="256" ref="sendWork2">
            <div class="sendWork2">
                <div class="oldName">
                    <label for="">原处理人员：</label>
                    <span class="namess" v-text="dialogBoxs.item.name"></span>
                </div>
                <div class="newName">
                    <label for="">新工单处理人员：</label>
                    <div class="ChooseBox">
                        <SelectBox
                            :options = 'names' 
                            :value = "vName" 
                            placeholder='姓名'
                            @change = 'change2'
                        />
                    </div>
                </div>
            </div>
            <div class="sendWork2Boxs btnBai1" @click="sendWork2">
                <span>确定</span>
            </div>
        </Dialog>           
    </div>
</template>

<script>
import TimePickerT from './timePickerTit2';
import SelectBox from '@/components/form/selectBox';
import Table from '@/components/common/table';
import deal from './deal';
import State from './state';

export default {
  props:['data'],
  components:{
      "TimePickerT":TimePickerT,
      'SelectBox':SelectBox,
      'Table':Table,
  },
  data () {
    return {
       //日期选择
        value7:'2018-8-24',
        cant:false,
         jobs:[
            {label:'给排水',value:1},
            {label:'电梯',value:2},
            {label:'变配电',value:3},
            {label:'照明',value:4},
            {label:'暖通',value:5},
            ],
        vJob:-1, 
        names:[
            {label:'白狗汪1',value:1},
            {label:'白狗汪2',value:2},
            {label:'白狗汪3',value:3},
            {label:'白狗汪4',value:4},
            {label:'白狗汪5',value:5},
        ],
        vName:-1,
        table:{
            // small:'small',
            hei:488, //table高度  设置后有滚动条
            len:800, //总条数
            data:[
                {id:1,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:-1}, 
                {id:2,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:0}, 
                {id:3,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:1}, 
                {id:4,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:2}, 
                {id:5,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:6,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:7,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:8,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:9,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:10,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3}, 
                {id:11,u_id:1,name:'白狗汪1',type:'给排水系统',addr:'青羊区工业园区T区8栋9楼',eName:'二号会议室照明系统',sTime:'2018-08-27 11:35',info:'几水泵房水泵温度异',sType:'系统派发',state:3},                       
            ],
            th:[
              {prop:'name',label:'名称'},
              {prop:'type',label:'类别'},
              {prop:'addr',label:'地点',wid:208}, 
              {prop:'eName',label:'设备名称',wid:169},
              {prop:'sTime',label:'派发时间',wid:165},
              {prop:'info',label:'内容描述',wid:194},
              {prop:'sType',label:'派发类别'},
              {prop:'states',label:'状态',wid:146,
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          fills:param.row.state,  
                      };
                      return h(State,{
                      props: { state:btnss},
                      on:{}
                      });
                  }},
              {prop:'fill',label:'操作',wid:105,
                operate: true, 
                  render: (h, param)=> {
                      const btnss = {
                          item:param.row, 
                        //   id:param.row.id,  
                      };
                      return h(deal,{
                      props: { btnss:btnss},
                      on:{agree:this.agree,refult:this.refult}
                      });
                  } 
              },
            ]
        },
        dialogBoxs:{
            item:{name:''},
            state0:0, //1 同意，0拒绝
            txt:'是否允许退单'
        }
    }
  },
  methods:{
       change1(val){ //选择
      this.vJob = val;
    },
     change2(val){ //选择
      this.vName = val;
    },
      changes(val){
          this.value7 = val;
      }, 
      deletes(){
          let attrs = this.value7.split('-');
          // console.log(attrs)
          if(attrs[2]==1){
            if(attrs[1]==2 ||attrs[1]==4 || attrs[1]==6 ||attrs[1]==8 ||attrs[1]==9 ||attrs[1]==11 ||attrs[1]==1){
                attrs[2]=31;
            }else if(attrs[1]==5 ||attrs[1]==7 || attrs[1]==10 ){
                attrs[2]=30;
            }else if(attrs[1]==3 && Number(attrs[0])%4==0){
                attrs[2]=29;
            }else if(attrs[1]==3 && Number(attrs[0])%4!=0){
                attrs[2]=28;
            }
            if(attrs[1]==1){
                attrs[1] = 12;
                attrs[0] = Number(attrs[0])-1;
            }else{
                attrs[1] = Number(attrs[1])-1;
            }            
          }else{
              attrs[2] = Number(attrs[2])-1;
          }
          this.value7 = attrs.join('-'); 
      },
      adds(){
          if(this.cant){
              return;
          }
          let attrs = this.value7.split('-');

          if(((attrs[1]==1 ||attrs[1]==3 || attrs[1]==5 ||attrs[1]==7 ||attrs[1]==8 ||attrs[1]==10 ||attrs[1]==12) && attrs[2]==31)
              ||((attrs[1]==2 ||attrs[1]==6 || attrs[1]==9 ||attrs[1]==11) && attrs[2]==30) 
              ||((attrs[1]==2 && Number(attrs[0])%4==0) && attrs[2]==29)
              ||((attrs[1]==2 && Number(attrs[0])%4!=0) && attrs[2]==28)
          ){
              attrs[2] =1;
              if(attrs[1]==12){
                  attrs[1] = 1;
                  attrs[0] = Number(attrs[0])+1;
              }else{
                  attrs[1] = Number(attrs[1])+1;
              }   
          }else{
              attrs[2] = Number(attrs[2])+1;
          }
          this.value7 = attrs.join('-');    
      }, 
      agree(item){ //同意
        let state = item.state;
        if(state==-1){ //退单
            this.dialogBoxs = {
                item:item,
                state0:1,
                txt:'是否允许退单'
            };
        }else if(state==0){ //申请延期处理
            this.dialogBoxs = {
                item:item,
                state0:1,
                txt:'是否允许延期处理'
            };
        } 
        this.$refs.isRefult.show();
      },
      refult(item){
        let state = item.state;
        if(state==-1){ //退单
            this.dialogBoxs = {
                item:item,
                state0:0,
                txt:'是否拒绝退单'
            };
        }else if(state==0){ //申请延期处理
            this.dialogBoxs = {
                item:item,
                state0:0,
                txt:'是否拒绝延期处理'
            };
        } 
        this.$refs.isRefult.show();
      },
      submitOk(){ //确认
        //console.log(this.dialogBoxs);// 延期则直接关闭
        this.$refs.isRefult.hide();
        if(this.dialogBoxs.item.state==-1){//退单之后，弹出新的工单分配框
            this.$refs.sendWork2.show();
        }
        
      },
      submitNo(){ //取消
        this.$refs.isRefult.hide();
      },
      sendWork2(){ //重新派发工单
        this.$refs.sendWork2.hide();
      },
      showInfos(item){
        //   console.log(item,'121')
          this.$emit('tableInfos2Show',item);
      }
  },
  created() {
  },
  mounted() {
       
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.workInfo{
    height: 100%;
    width: 100%;
    .infoTit{
        width: 100%;
        .vh(50);
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
    .tbalHe{
        .vh(52);
        .vhPT(20);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .btnBox{
            position: absolute;
            left: 0;
            .vhTop(20);
            .jobBoxs{
                float: left;
                width: 1.15rem;
                .vh(32);
                background-color: rgba(255, 255, 255, 0.01);
                border-radius: 0.02rem;
                border: solid 0.01rem #1989fa;
                text-align: center;
                margin-left: 0.2rem;
            }
            .searchBoxs{
                float: left;
                margin-left: 0.12rem;
                width: 0.93rem;
                .vh(32);
                .vhLH(32);
                color: #fff;
                font-size: 0.14rem;
                text-align: center;
                cursor: pointer;
                background-image: linear-gradient(0deg, 
                #2772e3 0%, 
                #4b94f9 100%);
                border-radius: 0.02rem;
                i{
                font-size: 0.16rem;
                margin-right: 0.05rem;
                font-weight: 600;
                }
            }       
        }
        .nums{
            overflow: hidden;
            .vhLH(20);
            li{
                float: left;
                margin-right: 0.6rem;
                display: flex;
                align-items: center;
                &:nth-child(3){
                    margin-right: 0;
                }
                span{
                    color: #b5d7ff;
                    font-size: 0.16rem;
                    font-family: PingFangSC-Light;
                    padding-right: 0.16rem;
                    .vhLH(20);
                }
                .numss{
                     font-size: 0.18rem; 
                     .vh(20);
                     .vhLH(20);
                     border-left: 0.02rem solid #4a90e2;
                     padding-left: 0.11rem;
                     &.colorY{
                         color: #f38a00
                     }
                     &.colorR{
                         color: #ed4a4a
                     }                     
                     &.colorG{
                         color: #4ae283
                     }
                }
            }
        }
        
    }
    .tabBoxss{
        .vh(538);
        width: 100%;
        padding-left: 0.20rem;
    }
    .isRefTxt{
        .vh(170);
        width: 100%;
        text-align: center;
        font-size: 0.18rem;
        color: #b5d7ff;
        .vhLH(145);
    }
    .isRbtnBoxs{
        width: 100%;
        .vh(45);
        display:flex;
        overflow: hidden;
        border: 0.01rem solid #4a90e2;
        border-bottom-left-radius: 0.08rem;
        border-bottom-right-radius: 0.08rem;
        span{
            flex: 1;
            text-align: center;
            .vhLH(45);            
            font-size: 0.16rem;
            color: #fff;
            cursor: pointer;
            &:nth-child(1){
                border-right: 0.01rem solid #4a90e2;
            }
            &:active{
                background: #3b85ef;
            }
        }
    }
    .sendWork2{
        .vh(197);
        width: 100%;
        .vhPT(13);
        padding-left: 0.20rem;
        .oldName,.newName{
            width: 100%;
            font-size: 0.14rem;
            label{
                .vh(32);
                .vhLH(32); 
                color: #4f648b;   
            }
            span.namess{
                color: #ffa414;
            }
            .ChooseBox{
                .vh(40);
                width: 2.24rem;
                background-color: rgba(255, 255, 255, 0.01);
                border-radius: 0.04rem;
                border: solid 1px #1989fa;
                .vhMT(7);
                span{
                    font-size: 0.14rem !important;
                    color: green!important;
                }
            }            
        }
    }
    .sendWork2Boxs{
        width: 3.84rem;
        .vh(43);
        margin-left: 0.15rem;
    }
}

</style>
