<!--
    steps步骤条封装
    2018-10-18
-->
<template>
    <div class="routingTaskModdel boxs">    
        <div class="tabHead">
          <div class="jobBoxs">
            <SelectBox 
              :options = 'selectboxs.systems' 
              :value = "selectboxs.vSystem" 
              :icon="'el-icon-d-caret'"
              placeholder="系统"
              @change = "change1"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'selectboxs.areas' 
              :value = "selectboxs.vArea" 
              :icon="'el-icon-d-caret'"
              placeholder="区域" 
              @change = "change2"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'selectboxs.examine' 
              :value = "selectboxs.vExamine" 
              :icon="'el-icon-d-caret'"
              placeholder="巡检人" 
              @change = "change4"
            />
          </div>
          <div class="nameBoxs">
            <SelectBox 
              :options = 'selectboxs.taskStatus' 
              :value = "selectboxs.vStatus" 
              :icon="'el-icon-d-caret'"
              placeholder="任务状态" 
              @change = "change3"
            />
          </div>
          <div class="searchBoxs">
            <i class="el-icon-search"></i>
            <span>筛选</span>
          </div>
        </div> 
        <Table style="width:100%" 
              :table = "table"
            @rowClick = "rowClick"/>
    </div>
</template>

<script>
  import SelectBox from '@/components/form/selectBox';
  import State from './state';
  import TimePickerT from '@/components/AgentManage/components/work/timePickerTit2';
  import Table from '@/components/common/table'
  import deal from './deal';
  export default {
      props:['data'],
      components:{
        'SelectBox':SelectBox,
        'TimePickerT':TimePickerT,
        'Table':Table
      },
      data () {
        return {
          selectboxs:{
            systems:[
              {label:'系统',value:1},
              {label:'电梯',value:2},
              {label:'变配电',value:3},
              {label:'照明',value:4},
              {label:'暖通',value:5},
            ],
            vSystem:'系统',
            areas:[
              {label:'李白',value:1},
              {label:'杜甫',value:2},
              {label:'王安石',value:3},
              {label:'白居易',value:4},
              {label:'狗蛋儿',value:5},
            ],
            vArea:'区域',
            examine:[
              {label:'李白',value:1},
              {label:'杜甫',value:2},
              {label:'王安石',value:3},
              {label:'白居易',value:4},
              {label:'狗蛋儿',value:5},
            ],
            vExamine:'巡检人',
            taskStatus:[
              {label:'李白',value:1},
              {label:'杜甫',value:2},
              {label:'王安石',value:3},
              {label:'白居易',value:4},
              {label:'狗蛋儿',value:5},
            ],
            vStatus:'人物状态'
          },
          table:{
            // small:'small',
            hei:328, //table高度  设置后有滚动条
            len:80, //总条数
            data:[
              {id:1,name:'白狗汪1',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"1"}, 
              {id:2,name:'白狗汪2',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:3,name:'白狗汪3',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"1"}, 
              {id:4,name:'白狗汪4',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:5,name:'白狗汪5',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:6,name:'白狗汪6',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:7,name:'白狗汪7',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:8,name:'白狗汪8',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:9,name:'白狗汪9',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"}, 
              {id:10,name:'白狗汪10',tel:'18349171744',job:'程序猴',sendNum:6,dealing:4,nocatch:1,dealed:4,state:"2"},              
            ],
            th:[
              {prop:'id',label:'序号'},
              {prop:'name',label:'系统'},
              {prop:'tel',label:'区域'},
              {prop:'job',label:'开始时间'},
              {prop:'sendNum',label:'巡检周期'},
              {prop:'dealing',label:'巡检人'},
              {prop:'nocatch',label:'专业'},
              {prop:'dealed',label:'完成时限'},
              {prop:'state',label:'任务状态',operate: true, 
                render: (h, param)=> {
                    const btnss = {
                        fills:param.row.state,  
                    };
                    return h(State,{
                      props: { state:btnss},
                      on:{}
                    });
                }},
              {prop:'fill',label:'操作',wid:200,
                  operate: true, 
                  render: (h, param)=> {
                    const btnss = {
                        item:param.row, 
                    };
                    return h(deal,{
                      props: { btnss:btnss},
                      on:{update:this.update,deletes:this.deletes}
                    });
                  } 
              },
            ]
          },
        }
      },
      methods:{
          change1(val){ //选择
            this.vSystem = val;
          },
          change2(val){ //选择
            this.vArea = val;
          },
          change4(val){ //选择
            this.vExamine = val;
          },
          change3(val){ //选择
            this.vStatus = val;
          },
          rowClick(rowData){
            this.$emit('checkDetail',rowData);
          },
          update(item){
            this.$emit('updateDetail',item);
          },
          deletes(item){
             this.$emit('deleteDetail',item);
          }
      },
      created() {
      },
      mounted() {

      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.routingTaskModdel{
  width:95.6vw;
  margin-left: 0.33rem;
  .tabHead{
      width: 100%;
      position: relative;
      .vh(59);
      .vhPT(20);
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
      .nameBoxs{
        float: left;
         width: 0.87rem;
        .vh(32);
        background-color: rgba(255, 255, 255, 0.01);
        border-radius: 0.02rem;
        border: solid 0.01rem #1989fa;
        text-align: center;
        margin-left: 0.1rem;
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
      .dateBox{
        position: absolute;
        .vhTop(24);
        left: 4.95rem;
      }
    }
}
</style>
