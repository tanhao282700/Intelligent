<template>
  <div class="history">
    <!--内容模块-->
      <!--查询区-->
      <div class="itemsBox">
        <!--筛选查询-->
        <div class="queryBox">
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="formData.level" :key="index" class="querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="items.placeHolder" v-for="(items,index) in options" v-model="formData.aa" :key="index+11" class="two querySelectItem">
            <el-option
              v-for="item in items.data"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div>
            <el-button type="primary" class="queryData" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <!--导入-->
        <div>
          <div class="exBth" @click="takeIn('one')">
            <span></span>
            <span>批量导入</span>
          </div>
          <div class="exBth" @click="takeIn('more')">
            <span></span>
            <span>单个录入</span>
          </div>
        </div>
      </div>


    <!--用户表格-->
    <div class="userTableContainer fireAlarmTable" style="flex:1;display: flex;flex-direction: column">
      <el-table
        :data="curPageData"
        style="width: 100%;flex:1;"
        height="500"
        class=" tableHeadBlue">
        <el-table-column
          type="index"
          label="序号"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="name"
          label="电表名称"
          min-width="20%">
        </el-table-column>
        <el-table-column
          prop="floor"
          label="楼层"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="mount"
          label="用量"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="system"
          label="单位"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="much"
          label="费用"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="time"
          label="记录日期"
          min-width="20%">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="10%">
          <template slot-scope="scope">
            <el-button type="text" @click="revice(scope.row)" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <!--<div class="paginationBox">
        <div class="totalPageNumBox">共{{formData.pageCount}}页</div>

        <div class="el-input el-pagination__editor is-in-pagination curPageBox">
          <input type="number" autocomplete="off" class="el-input__inner" v-model="formData.pagenumber">
          <span @click="toInputPage">GO</span>
        </div>

        <el-pagination
          @current-change="currentPageChange"
          :current-page="formData.pagenumber"
          :page-size="formData.pagesize"
          layout="prev, pager, next"
          :total="formData.total">
        </el-pagination>

      </div>-->

    </div>




    <Dialog wid = "578" hei = "536" style="display: flex;flex-direction: column" ref = "Historydialog" :tit = "dialogTit">
      <div class="showBox2 historyBox" style="height:486px;padding-left:20px;">
        <div>
          <div class="formGroup">
            <div class="name">类型<i></i></div>
            <div class="inpArea">
              <el-select :placeholder="items.placeHolder" v-for="(items,index) in options1" v-model="bb" :key="index+1" class="querySelectItem">
                <el-option
                  v-for="item in items.data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">设备<i></i></div>
            <div class="inpArea">
              <el-select :placeholder="items.placeHolder" v-for="(items,index) in options1" v-model="cc" :key="index+1" class="querySelectItem">
                <el-option
                  v-for="item in items.data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="formGroup" style="height:60px;">
            <div class="name">上传<i></i></div>
            <div class="inpArea">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
                :on-change="beforeUpload"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </div>
          </div>
          <div class="formGroup">
            <div class="name" >选择sheet<i></i></div>
            <div class="inpArea">
              <el-select :placeholder="items.placeHolder" v-for="(items,index) in options2" v-model="dd" :key="index+1" class="querySelectItem">
                <el-option
                  v-for="item in items.data"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">日期<i></i></div>
            <div class="inpArea">
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">用量<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="formData.name"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">费用<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="formData.val"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="historyBtn">
        <span>取消</span>
        <span>确定</span>
      </div>
    </Dialog>


    </div>
</template>
<script>

  export default{
  name:'History',
    data(){
      return{
        fileList:[],
        value1:'',
        dialogTit:"单个录入",
        bb:'',
        cc:'',
        dd:'',
        formData:{},
        options1: [
          {
            placeHolder: '选择楼层',
            data: [{
              "value": 0,
              "label": "预警"
            }, {
              "value": 1,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
        options2: [
          {
            placeHolder: '选择楼层',
            data: [{
              "value": 0,
              "label": "预警"
            }, {
              "value": 1,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
        options: [
          {
            placeHolder: '报警级别',
            data: [{
              "value": 0,
              "label": "预警"
            }, {
              "value": 1,
              "label": "提醒"
            }, {
              "value": 2,
              "label": '告警'
            }]
          }],
        curPageData:[{
          name:'10F热水循环泵',
          floor:'十层',
          much:'2.96',
          system:'KW/h',
          mount:'2.93',
          time:'2018-11-11 23:11',
          id:"1"
        }],
      }
    },
    components:{

    },
    watch:{

    },
    mounted(){

    },
    methods:{
      beforeUpload(file,fileList){
        this.fileList = [file]
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      takeIn(type){
          if(type==='one'){
              this.dialogTit = '单个录入'
          }else{
              this.dialogTit = '批量导入'
          }
          this.$refs.Historydialog.show()
      },
      revice(data){
          console.log(data)
      }
    }
  }
</script>
<style>
  .historyBtn{
    width:100%;
    height:73px;
    position:absolute;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .historyBtn span{
    display: inline-block;
    width:88px;
    height:32px;
    border:1px solid #3a84ed;
    color:white;
    font-size:0.12rem;
    text-align: center;
    line-height: 32px;
    border-radius:2px;
  }
  .historyBtn span:last-child{
    background:#3a84ed;
    margin-right:22px;
  }
  .historyBtn span:first-child{
    margin-right:10px;
  }
  .historyBtn span:hover{
    cursor: pointer;
  }
  .historyBox .formGroup{
    width:100%;
    height:34px;
    margin-top:0.2rem;
    display: flex;
  }
  .historyBox .formGroup .name{
    width:0.66rem;
    text-align: justify;
    line-height: 34px;
    color:#324667;
    font-size:0.14rem;
  }
  .historyBox .formGroup .name i{
    display:inline-block;
    width:100%;
  }
  .historyBox .formGroup .inpArea{
    margin-left:12px;
    width:200px;
    height:100%;
  }
  .historyBox .formGroup .inpArea .querySelectItem{
    height:34px!important;
  }
  .historyBox .formGroup .inpArea .el-input__inner{
    height:34px!important;
    width:200px!important;
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
  .history{
    width:100%;
    height:100%;
    .queryBox{
      height:36px;
    }
    .queryData{
      height:36px!important;
    }
    .exBth{
      width:1rem;
      height:36px;
      background:#3a84ed;
      color:white;
      border-radius:2px;
      font-size:0.12rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      float:right;
      margin-left:0.1rem;
      &:hover{
        cursor: pointer;
      }
      span:first-child{
        width:0.16rem;
        height:0.16rem;
        background:url(../../../assets/img/Energy/exin.png);
        background-size:100% 100%;
        margin-right:0.1rem;
        margin-top:2px;
      }
    }
  }
</style>
<style>
  .history .el-input__inner{
    width:100px!important;
    height:36px!important;
    color:white;
  }
  .history .two .el-input__inner{
    width:200px!important;
  }
  .history .el-button{
    font-size:0.14rem!important;
  }
  .history .el-button+.el-button{
    background:none!important;
    color:#409EFF;
  }
</style>
