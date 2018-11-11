<!--分页器-->
<template>
    <div class="paginationBox">
        <div class="totalPageNumBox">共{{pages.totalPageNum}}页</div>

        <div class="el-input el-pagination__editor is-in-pagination curPageBox">
          <input type="number" autocomplete="off" class="el-input__inner" v-model="pages.currentPage">
          <span @click="toInputPage">GO</span>
        </div>

        <el-pagination
          @current-change="currentPageChange"
          :current-page="pages.currentPage"
          :page-size="pageSize"
          :page-count="pages.totalPageNum"
          layout="prev, pager, next"
          :total="pages.totalDataNumber">
        </el-pagination>

    </div>
</template>
<script>
export default {
  name:'gReport',
  props:['pages'],//总条数、当前页、总页数
  data () {
    return {
      pageSize:20,
    }
  },
  methods:{
      currentPageChange(val) {
        /*当前页变动事件*/
        this.currentPage = this.toPageNum = val;
        this.$emit('changeCurrentPage',this.currentPage)
      },
      toInputPage(){
        /*显示输入页表格数据*/
        var num = Number(this.toPageNum);
        this.requestTableData(num);
        this.currentPage = num;
        this.$emit('changeCurrentPage',this.currentPage)
      },
    },
    watch:{
      page:{
        handler(val){
          console.log(val);
          this.pages = val;
        },
        deep:true
      }
    },
    mounted(){
      console.log(this.pages)
    }
  }
</script>
<style scoped='scoped'>
    /*分页器样式*/
  .paginationBox{
    padding: 0 .2rem;
    font-size: .12rem;
    height: .22rem!important;
    line-height: .22rem;
    position: absolute;
    width: 100%;
    bottom: .1rem;
    left: 0;
  }
  .paginationBox .el-pagination{
    padding: 0;
    width: auto;
    float: right;
  }
  .paginationBox .totalPageNumBox{
    float: left;
    color: #008AFF;
  }
  .paginationBox .curPageBox{
    float: right;
    margin-left: .16rem;
    width: auto!important;
    text-align: center;
    font-size: 0;
  }
  .paginationBox .curPageBox input{
    height:.22rem!important;
    width: .34rem;
    border-right:none!important;
    padding: 0;
    text-align: center;
    vertical-align: top;
    border-bottom-right-radius: 0!important;
    border-top-right-radius: 0!important;
  }
  .paginationBox .curPageBox span{
    display: inline-block;
    vertical-align: top;
    height:.22rem;
    line-height: .22rem;
    width: .34rem;
    color: #fff !important;
    background-color: #008AFF;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    font-size: .12rem;
    cursor: pointer;
  }

</style>