<!--
    代维系统 排班表
    范 2018-10-21
-->
<template>
  <div class="schedule autoComponent">
      <Header :datas="navsData"></Header>
      <Crumbs :data ='crumbs'/>
      <el-tabs class="tabBoxs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="first">
            <span slot="label" class="tabItems">
                排班表
            </span>
            <ScheduleTable :isShowBtns="'no'" style="width:100%;"/>
        </el-tab-pane>
        <el-tab-pane name="second" >
          <span slot="label" class="tabItems">
              申请换班
          </span>
          <div class="boxs">
            <div class="pBody">
              <div class="pBox">
                <div class="imgBox">
                  <img :src="dia.img1" alt="">
                </div>
                <div class="nameBox boxs">
                  <div class="labelBox">
                    <label for="">申请人：</label>
                    <span v-text="dia.name1"></span>
                  </div>
                  <div class="labelBox">
                    <label for="">联系电话：</label>
                    <span v-text="dia.tel1"></span>
                  </div>
                  <div class="labelBox">
                    <label for="">申请人班次：</label>
                    <SelectBox 
                        :options = 'peos' 
                        :value = "vpeo" 
                        class="selectStyle"
                        :icon="'el-icon-d-caret'"
                        placeholder="选择人员"
                        @change = 'change1'
                    />
                  </div>
                </div>
              </div>
              <Lines :hei="125" :top="20" />
              <div class="pBox">
                <div class="imgBox">
                  <img :src="dia.img2" alt="">
                </div>
                <div class="nameBox boxs">
                  <div class="labelBox">
                    <label for="">换班人：</label>
                    <SelectBox 
                        :options = 'peos' 
                        :value = "vpeo" 
                        class="selectStyle"
                        :icon="'el-icon-d-caret'"
                        placeholder="选择人员"
                        @change = 'change1'
                    />
                  </div>
                  <div class="labelBox">
                    <label for="">联系电话：</label>
                    <span v-text="dia.tel2"></span>
                  </div>
                  <div class="labelBox">
                    <label for="">换班人班次：</label>
                    <SelectBox 
                        :options = 'peos' 
                        :value = "vpeo" 
                        class="selectStyle"
                        :icon="'el-icon-d-caret'"
                        placeholder="选择时间段"
                        @change = 'change1'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="reason">
              <div class="diaTit2">换班原因</div>
              <div class="reasonBox" >
                <el-input type="textarea" v-model="dia.reason"></el-input>
              </div>
            </div>
            <div style="text-align:center;">
              <el-button class="submitApply" @click="submitApply">提交申请</el-button>
            </div>
            
          </div>
        </el-tab-pane>
        <el-tab-pane name="thrid"  class="tabChilds">
            <span slot="label" class="tabItems">
                申请状态
            </span>
            <div class="statusTabs">
              <el-radio-group v-model="tabPosition" @change="changeStatus">
                <el-radio-button label="待审核">待审核</el-radio-button>
                <Lines :hei="30" :top="0" />
                <el-radio-button label="已审核">已审核</el-radio-button>
                <Lines :hei="30" :top="0" />
                <el-radio-button label="我的处理">我的处理</el-radio-button>
              </el-radio-group>
            </div>
            <div>
                <ul v-show="tabPosition=='待审核'" class="tabLists">
                  <li class="boxs ">
                    <div class="pBox">
                      <div class="imgBox">
                        <img :src="dia.img1" alt="">
                      </div>
                      <div class="descBox">
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班原因：</label>
                            <span v-text="excuse" class="hbExcuse"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请时间：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">当前状态：</label>
                            <span v-text="dia.name1" class="dqStatus"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul v-show="tabPosition=='已审核'" class="tabLists">
                  <li class="boxs">
                    <div class="pBox">
                      <div class="imgBox">
                        <img :src="dia.img1" alt="">
                      </div>
                      <div class="descBox">
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班原因：</label>
                            <span v-text="excuse" class="hbExcuse"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请时间：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">当前状态：</label>
                            <span v-text="dia.name1" class="dqStatus"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">审核人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul v-show="tabPosition=='我的处理'" class="tabLists">
                    <li class="boxs">
                    <div class="pBox">
                      <div class="imgBox">
                        <img :src="dia.img1" alt="">
                      </div>
                      <div class="descBox">
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班人：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">联系电话：</label>
                            <span v-text="dia.tel1"></span>
                          </div>
                          <div class="labelBox">
                            <label for="">班次：</label>
                            <span v-text="dia.time1"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">换班原因：</label>
                            <span v-text="excuse" class="hbExcuse"></span>
                          </div>
                        </div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <label for="">申请时间：</label>
                            <span v-text="dia.name1"></span>
                          </div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="nameBox">
                          <div class="labelBox">
                            <el-button class="refuseHb">拒绝换班</el-button>
                            <el-button class="agreeHb">同意换班</el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
            </div>
        </el-tab-pane>
      </el-tabs>
      <transition name="fade">
        <div class="sceBtn btnBai1" v-show="activeName=='first'" @click="exportTable">
          <img src="../../../assets/img/AgentManage/export.png">
          <span>导出排班表</span>              
        </div>
      </transition>
  </div>
</template>

<script>

import '@/assets/css/fs_common.css'
import Header from '@/components/common/sysHead'
import utils from "../../../assets/js/utils.js";
import examine from '../components/schedule/examine';
import ScheduleTable from '../components/schedule/scheduleTable';
import SelectBox from '../components/schedule/selectBox'

export default {
  components:{
    'Examine':examine,
    'ScheduleTable':ScheduleTable,
    'Header':Header,
    'SelectBox':SelectBox
  },
  computed:{
      crumbs(){
        let res =['代维系统','排班表'];
        switch(this.activeName){
            case 'first':
                res.push('排班表');
            break;
            case 'second':
                res.push('申请换班');
            break;
            case 'thrid':
                res.push('申请状态');
            break;
        }
        return res;
    }
  },
  data () {
    return {
        tabPosition:'待审核',
        excuse:'语雀是一款优雅高效的在线文档编辑与协同工具，让每个企业轻松拥有文档中心阿里巴巴集团内部使用多年，众多中小企业首选。',
        peos:[
          {},
          {}
        ],
        vpeo:'',
        radio3:'待审核',
        applyJob:{
          id:0,name:'王1',time:'2018-05-26 00:59~06:19',time2:'2018-05-27 07:59~14:19',name2:'白1',state:-1,img1:'http://img4.imgtn.bdimg.com/it/u=1652942597,4175456571&fm=26&gp=0.jpg',img2:'http://img0.imgtn.bdimg.com/it/u=2242889095,3429329643&fm=26&gp=0.jpg',tel1:'18349171744',tel2:'18349171722',reason:'Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。'
        },
        navsData:{
          active:'item1',
          lists:[
              {id:0,name:'首页',route:'/AgentManage/normalUser'},
              {id:1,name:'排班表',route:'/AgentManage/normalUser/schedule'},
              {id:2,name:'工单',route:'/AgentManage/normalUser/workList'},
              {id:3,name:'巡检',route:'/AgentManage/normalUser/routing'},
              {id:4,name:'完成情况',route:'/AgentManage/normalUser/report'},
          ]
        },
        activeName: 'first',
        indexNow:-1,
        dia:{
          name1:'娃哈哈',
          tel1:'18349171744',
          time1:'2018-7-6 04:08 ~ 13:43',
          img1:'http://img4.imgtn.bdimg.com/it/u=1652942597,4175456571&fm=26&gp=0.jpg',
          name2:'娃哈哈2',
          tel2:'18349171722',
          time2:'2018-7-7 04:08 ~ 13:43',
          img2:'http://img0.imgtn.bdimg.com/it/u=2242889095,3429329643&fm=26&gp=0.jpg',
          reason:'Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。',
          applyTime:'2018/09/04 04:44',
          state:'-1'
        }
    }
  },
  methods:{
    handleClick(tab, event) {
      let activeName = this.activeName;
      this.$router.replace({ path: `/AgentManage/normalUser/schedule/${activeName}`});     
    },
    search(val,type){
      console.log(val,type)
    },
    change1(){

    },
    submitApply(){

    },
    changeStatus(){

    },
    getTableList(){
      this.$http.post('/pc_ims/staff/work_list').then(res=> {
           if(res.data.code==0){
              console.log(res.data.data);
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
    },
    exportTable(){
      this.$http.get('/pc_ims/down/staff_work_list').then(res=> {
           if(res.data.code==0){
              console.log(res.data.data);
           }else{
              this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
    }
  },
  created() {
     //配合路由 定位页面
      let val = (this.$router.history.current.fullPath).split('/AgentManage/normalUser/schedule')[1];
      if(val==''){
          this.activeName = 'first';
      }else{
          // console.log( val.split('/')[1])
          this.activeName = val.split('/')[1];
      }
  },
  mounted() {
    this.getTableList();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped='scoped' type="text/less">
@import '../../../assets/css/tabs.less';
@import '../../../assets/css/comon.less';
.schedule{
  position: relative;
  width:100%;
  height:100%;
  .tabBoxs{
    margin:0 2.2%;
    height :6.78rem;
    .reason{
      padding:0.1rem 0.2rem;
      .diaTit2{
        .vh(44);
        .vhLH(44);
        color:#4F648B;
      }
      .reasonBox{
        .vh(114);
        width:96.78%;
        margin-left: 0.2rem;
        background-color: #001838;
        box-shadow: 0px 0px 2px 0px 
          rgba(87, 113, 176, 0.15), 
          inset 0px 1px 3px 0px 
          rgba(0, 0, 0, 0.5);
          padding: 0 0.1rem;
          color: #ffa414;
          font-size: 0.14rem;
          .vhLH(24);
          .vhMT(10);
          .vhPT(5);
          .vhPB(5);
          .vhMB(20);
      }
    } 
    .submitApply{
      width:2.2rem;
      height:0.44rem;
      font-size:0.26rem;
      margin:0.63rem 0 0.2rem;
      border:none;
      color:#174BA2;
      background:rgba(51,51,51,0.2);
      box-shadow:0px 2px 5px 0px rgba(74,144,226,0.4),1px 1px 1px 0px rgba(248,253,255,0.15),0px 0px 1px 0px rgba(74,144,226,1);
      border-radius:2px;
      &:hover{
        background:linear-gradient(360deg,rgba(39,114,227,1) 0%,rgba(75,148,249,1) 100%);
        color:#fff;
      }
    }
    .pBody{
      .vh(165);
      width: 100%;
      display: flex;
      .pBox{
        flex: 1;
        display: flex;
        height :100%;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        .vhPT(20);
        .imgBox{
          width: 1.26rem;
          .vh(150);
          border-radius: 0.02rem;
          display: flex;
          overflow:hidden;
          justify-content: center;
          img{
            .vh(150);
          }

        }
        .nameBox{
          margin-left: 0.11rem;
          width: 82.5%;
          .vh(150);
           border-radius: 0.02rem;
           padding-left: 0.2rem;
           .vhPT(10);
           font-size: 0.14rem;
           .labelBox{
             .vh(40);
             .vhLH(40);
             label{
               color: #4f648b;
               display:inline-block;
             }
             .selectStyle{
                width:2.34rem;
                .vh(36);
                .vhLH(36);
             }
             span{
               color: #93b7e2;
               text-indent: 0.1rem;
               display:inline-block;
             }
           }
        }

      }  
    }
    .statusTabs{
      width:6rem;
      height:0.36rem;
      line-height:0.36rem;
      margin:0.16rem auto;
    }
    .tabLists{
      width:95%;
      margin:0 0.26rem;
      flex: 1;
      display: flex;
      height :100%;
      li{
        width:100%;
        border:0px solid rgba(181,215,255,0.25);
        background:rgba(74,144,226,0.05);
        .imgBox{
          float:left;
          padding:0.26rem;
          border:1px solid rgba(181,215,255,0.25);
          background:rgba(74,144,226,0.05);
          img{
            width:1.26rem;
            height:1.5rem;
          }
        }
        .descBox{
            padding:0.17rem 0  0.17rem 0.26rem;
            width:82.68%;
            overflow:hidden;
            .nameBox{
              float:left;
              line-height:0.32rem;
              .labelBox{
                float:left;
                margin-right:0.5rem;
                label{
                  color:#4F648B;
                }
                span{
                  color:#93B7E2;
                }
                .hbExcuse{
                  color:#FFA414;
                }
                .dqStatus{
                  color:#FA6074;
                }
                .refuseHb{
                  height:0.34rem;
                  color:#F9F9F9;
                  background:rgba(59,137,249,0.2);
                  border:none;
                  line-height:0.2;
                }
                .agreeHb{
                  height:0.32rem;
                  color:#3B89F9;
                  border:0.01rem solid rgba(59,137,249,1);
                  background:transparent;
                  line-height:0.2;
                }
              }
            }
        }
        
      }
    }
  }
  .sceBtn{
    position: absolute;
    right: 0.3rem;
    .vhTop(80);
    width: 9.81vw;
    background:#3A84EE;
    color:#fff;
    .vh(32);
    .vhLH(32);
    font-size: 0.14rem;
    img{
      width:1.02vw;
      .vh(16);
      margin-right:0.05rem;
      vertical-align:middle;
    }
  }
}
</style>
