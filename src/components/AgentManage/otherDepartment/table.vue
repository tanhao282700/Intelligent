
<!--
props: table
table:{
    hei:428,                                     * //table高度   设置后有滚动条     px ,设计图多少px  就多少px
    len:800,                                     * //总条数      不设置取消分页
    pageSize:20,                                 * //每页的条数 。默认为20
    page:1,                                      * //当前页码     默认为1
    data:[                                         //数据
        {
            number:'01',                            //和th对应
            name: '王小虎'                          //和th对应
        },
        ],
    th:[{                                           //头部
        prop:'number',                              //和data对应
        label:'编号',
        wid:22                                      *// 设置后每一列有固定宽度  ， 不设置 自适应  px ,设计图多少px  就多少px
        },
        {prop:'btns2',
        label:'操作',
        operate: true,                              //自定义格子。不设置，默认显示值。
        render: (h, param)=> {
            const btnss = {

                };
            return h(自己的组件,{
                props: { btnss:btnss},                  //自己的组件的传入值
                on:{addss:this.addsss,delss:this.delsss}  自己的组件的函数与 父组件函数绑定
            });
            }
        },
    ]
}

事件
// 切换分页
+(pageNow){

}
//行点击
rowClick(row){

}
-->

<template>
  <div class="tableBox" :class="{'padding0':tableData}">
        <el-table
        :size="table.small"
        :height="table.hei"
        :data="tableData.data"
        @row-click = "rowClick"
        @cell-mouse-enter = "rowEnter"
        @cell-mouse-leave = "rowLeave"
        style="width: 100%">
        <el-table-column
            :key="i"
            v-for="(v,i) in tableData.th"
            :prop="v.prop"
            :show-overflow-tooltip="false"
            :label="v.label"
            :width="v.wid"
             :min-width="v.minWid">
            <!-- 自定义 -->
            <template slot-scope="scope" >

              <div v-if="v.prop == 'now_state' ">
                <span v-if=" scope.row[v.prop] == '9' " class="otherDepColor1">审批中</span>
                <span v-if=" scope.row[v.prop] == '0' " class="otherDepColor3">未接单</span>
                <span v-if=" scope.row[v.prop] == '4' " class="otherDepColor2">完成</span>
                <span v-if=" scope.row[v.prop] == '15' " class="otherDepColor3">审批驳回</span>
                <span v-if=" scope.row[v.prop] != '9' && scope.row[v.prop] != '0' && scope.row[v.prop] != '4' && scope.row[v.prop] != '15' "  >处理中</span>
              </div>

              <div v-else>
                <my-render v-if="v.operate" :row="scope.row" :render="v.render"></my-render>
                <span v-else>
                  <span v-if=" scope.row[v.prop]"> {{scope.row[v.prop]}} </span>
                  <span v-else>-</span>
                </span>
              </div>

            </template>

        </el-table-column>

        </el-table>
         <!-- <div class="pageBoxs" v-if = "table.showPagination!=undefined">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="table.page"
                :pager-count="5"
                :page-size="table.pageSize"
                layout="total, prev, pager, next, jumper"
                s>
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
import utils from '../../../assets/js/utils';
import MyRender from "../../common/MyRender";
export default {
  props:['table'], //,'data','th','hei','currentPage'
  components: {
    MyRender
  },

  data () {
    return {
        tableData:{}
    }
  },
  watch:{
    table:{
        handler(newval,oldval){
            
            if(newval){
                this.$set(this.tableData , newval)
            }
                

        },
        deep:true
    }
  },
  methods:{
    handleCurrentChange(val) {
        this.$emit('changePage',val);
    //   console.log(`当前页: ${val}`);
    },
    rowClick(row, event, column){ //当前行点击
        this.$emit('rowClick',row);
    },
    rowEnter(row, column, cell, event){
      this.$emit('rowEnter',row);
    },
    rowLeave(row, column, cell, event){
      this.$emit('rowLeave',row);
    }
  },
  created() {
    // let ths = this.table.th;
    // console.log(this.table);
    // console.log(ths);
    // let len = ths.s;
    // let attrs = [];
    // for(let i= 0;i<len;i++){
    //     let obj = ths[i];
    //     if(ths[i].wid==undefined){
    //         obj.wid = 'auto';
    //     }else{
    //          obj.wid = utils.wid(Number(obj.wid));
    //     }
    //     attrs.push(obj);
    // }
    // this.table.th =attrs;
    // if(this.table.hei==undefined){
    //     this.table.hei = 'auto';
    // }else{
    //     this.table.hei = utils.hei(Number(this.table.hei));
    // }
    // if(this.table.pageSize==undefined){
    //     this.table.pageSize = 20;
    // }
    // if(this.table.operate==undefined){
    //     this.table.operate = true;
    // }
    // if(this.table.page==undefined){
    //     this.table.page = 1;
    // }
    // if(this.table.small==undefined){
    //     this.table.small = '';
    // }

  },
  mounted(){
    this.tableData = this.table;
    //console.log(this.table)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
    .tableBox{
        height: 100%;
        width: 100%;
        position: relative;
        padding-bottom: 0.5rem;
        .pageBoxs{
            height: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.2rem;
            border-top: 0px solid rgba(58, 137, 249, 0.3);
          position: relative;
        }
        &.padding0{
            padding-bottom: 0;
        }
    }
</style>
