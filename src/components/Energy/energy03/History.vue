<template>
  <div class="history" v-loading="loading"
       element-loading-background="rgba(0, 0, 0, 0.5)"
       element-loading-spinner="el-icon-loading"
       element-loading-text="拼命加载中">
    <!--内容模块-->
      <!--查询区-->
      <div class="itemsBox">
        <!--筛选查询-->
        <div class="queryBox">
          <el-select placeholder="楼栋范围" v-model="areaData.data1" @change="areaData1Chang">
            <el-option
              v-for="item1 in areaData1Array"
              :key="item1.id"
              :label="item1.title"
              :value="item1.id">
            </el-option>
          </el-select>

          <el-select placeholder="楼栋" v-model="areaData.data2" v-show="areaData2Array.length>0" @change="areaData2Chang">
            <el-option
              v-for="item2 in areaData2Array"
              :key="item2.id"
              :label="item2.title"
              :value="item2.id">
            </el-option>
          </el-select>

          <el-select placeholder="楼层范围" v-model="areaData.data3" v-show="areaData3Array.length>0" @change="areaData3Chang">
            <el-option
              v-for="item3 in areaData3Array"
              :key="item3.id"
              :label="item3.title"
              :value="item3.id">
            </el-option>
          </el-select>

          <el-select placeholder="楼层" v-model="areaData.data4" v-show="areaData4Array.length>0" @change="areaData4Chang">
            <el-option
              v-for="item4 in areaData4Array"
              :key="item4.id"
              :label="item4.title"
              :value="item4.id">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="formData.date"
            align="right"
            type="month"
            value-format="yyyyMM"
            placeholder="选择日期">
          </el-date-picker>
          <div>
            <el-button type="primary" @click="queryClick" class="queryData" icon="el-icon-search">查询</el-button>
          </div>
        </div>
        <!--导入-->
        <div>
          <div class="exBth" @click="openUploadWin" v-show="formData.floor_id !=0">
            <span></span>
            <span>批量导入</span>
          </div>
          <div class="exBth" @click="takeIn" v-show="formData.floor_id !=0">
            <span></span>
            <span>单个录入</span>
          </div>
          <div class="exBth" @click="downloadModule" >
            <span></span>
            <span>模板下载</span>
          </div>
        </div>
      </div>


    <!--用户表格-->
    <div class="userTableContainer fireAlarmTable" style="flex:1;display: flex;flex-direction: column">
      <el-table
        :data="curPageData"
        style="width: 100%;flex:1;box-sizing: border-box"
        height="500"
        class=" tableHeadBlue">
        <el-table-column
          prop="show_id"
          label="序号"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="area_name"
          label="区域名称"
          min-width="20%">
        </el-table-column>
        <el-table-column
          prop="used_water"
          label="水用量"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="used_water_price"
          label="水费用"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="used_electric"
          label="电用量"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="used_electric_price"
          label="电费用"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="used_gas"
          label="气用量"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="used_gas_price"
          label="气费用"
          min-width="10%">
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          min-width="10%">
        </el-table-column>
          <el-table-column
            prop="rent_house_num"
            label="租房量"
            min-width="10%">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          min-width="20%">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="15%">
          <template slot-scope="scope">
            <el-button type="text" @click="editRecord(scope.row)" size="small">修改</el-button>
            <el-button type="text" size="small" @click="openDeleteDialog(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页器-->
      <div class="paginationBox">
        <div class="totalPageNumBox">共{{formData.pageCount}}页</div>

        <div class="el-input el-pagination__editor is-in-pagination curPageBox">
          <input type="number" autocomplete="off" class="el-input__inner" v-model="formData.page_index">
          <span @click="toInputPage">GO</span>
        </div>

        <el-pagination
          @current-change="currentPageChange"
          :current-page="formData.page_index"
          :page-size="formData.one_page_num"
          layout="prev, pager, next"
          :total="formData.total">
        </el-pagination>

      </div>

    </div>

    <!--导入/修改弹窗-->
    <el-dialog :title="dialogTit" :visible.sync="editInfoDialogVisible" class="metersHistoryDialogBox" :close-on-click-modal="false">
      <div class="showBox2 historyBox" style="padding: .2rem 0 0 .2rem;">
        <div>
          <div class="formGroup">
            <div class="name">区域<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.area_name" disabled></el-input>
            </div>
          </div>
          <!--<div class="formGroup" style="height:60px;">
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
          </div>-->
          <div class="formGroup">
            <div class="name">水用量<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_water"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">水费用<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_water_price"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">电用量<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_electric"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">电费用<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_electric_price"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">气用量<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_gas"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">气费用<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.used_gas_price"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">收入<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.income"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">租房量<i></i></div>
            <div class="inpArea">
              <el-input placeholder="请输入" v-model="dialogInfoObj.rent_house_num"></el-input>
            </div>
          </div>
          <div class="formGroup">
            <div class="name">日期<i></i></div>
            <div class="inpArea">
              <el-date-picker
                v-model="dialogInfoObj.date"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                :disabled = 'isEdit'
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </div>


        </div>
      </div>
      <div class="historyBtn">
        <span @click="cancleImport">取消</span>
        <span @click="saveRecordInfo">确定</span>
      </div>
      <bubbleTip :tipText="bubbleTip"/>
    </el-dialog>


    <!--删除信息弹窗-->
    <el-dialog :visible.sync="deleteInfoDialog" class="dialogBox deleteInfoDialog" :close-on-click-modal="false">
      <div class="deleteTextBox">是否确定删除此信息？</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmDelete" class="saveBtn">确定</el-button>
        <el-button @click="deleteInfoDialog = false" class="cancleBtn">取消</el-button>
      </div>
      <bubbleTip :tipText="bubbleTip"/>
    </el-dialog>

    <!--批量导入弹窗-->
    <el-dialog title="批量导入" :visible.sync="fileUploadDialogVisible" class="metersHistoryDialogBox uploadFileBox" :close-on-click-modal="false" @close="cancleUpdateFile">
      <div class="upRowBox">
        <span>上传</span><span class="upBtn">选择文件</span>
        <form id="uploadFileForm" action="https://tesing.china-tillage.com/hotel_energy/history_record" method="post" enctype="multipart/form-data" name="fileForm">
          <input type="file" name="upload_file" value="选择文件" id="upSysFile" accept="application/vnd.ms-excel" @change="fileChange"/>
          <input type="hidden" name="project_id" v-model="formData.project_id">
          <input type="hidden" name="floor_id" v-model="formData.floor_id">
          <input type="hidden" name="sys_menu_id" v-model="formData.sys_menu_id">
        </form>
      </div>
      <div class="fileNameBox">{{updateFileName}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleUpdateFile" class="cancleBtn">取消</el-button>
        <el-button @click="confirmUpdateFile" class="saveBtn">确认</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
  import bubbleTip from '../../common/bubbleTip';
  import '../../../assets/js/jquery.form.js';

  export default{
    components:{
      "bubbleTip":bubbleTip
    },
    name:'History',
    data(){
      return{
        updateFileName:"",
        filePath:'',
        fileUploadDialogVisible:false,
        isEdit: true,
        editInfoDialogVisible:false,
        bubbleTip:'',
        areaData1Array:[],
        areaData2Array:[],
        areaData3Array:[],
        areaData4Array:[],
        areaData:{
          data1:"",
          data2:"",
          data3:"",
          data4:""
        },
        powerValue:[],
        defaultProps: {
          children: 'child',
          label: 'title'
        },
        queryAreaId:[],
        areaArray:[],
        loading:true,
        fileList:[],
        value1:'',
        dialogTit:"",
        bb:'',
        cc:'',
        dd:'',
        curPageData:[],
        formData:{
          date:'',
          project_id: "",
          floor_id: 0,
          sys_menu_id:0,
          page_index:1,   //当前页数
          one_page_num:20,  //显示条数
          total:0,     //总条数
          pageCount:0    //总页数
        },
        areaCheckedTitle:"",
        nodeIsChange:false,
        preKeysArray:[],
        deleteInfoDialog:false,
        delRecordDate:"",
        roleKey:"",
        dialogInfoObj:{
          used_water:"",
          used_water_price:"",
          used_electric:"",
          used_electric_price:"",
          used_gas:"",
          used_gas_price:"",
          income:"",
          rent_house_num:"",
          date:"",
          area_name:"",
          show_id:"",
          row_key:""
        },
        inputExp:/^\d+(\.\d+)?$/
      }
    },
    watch:{

    },
    created(){
      this.formData.sys_menu_id = this.$store.state.sysList[2].sys_menu_id;
      this.formData.project_id = this.$store.state.projectId;
      this.initData();
    },
    mounted(){

    },
    methods:{
      cancleUpdateFile(){
        $("#upSysFile").val("");
        this.updateFileName = "";
        this.fileUploadDialogVisible = false;
      },
      confirmUpdateFile(){
        let that = this;

        $("#uploadFileForm").ajaxSubmit(function(message) {
          // 对于表单提交成功后处理，message为表单正常提交后返回的内容
          console.log(message);
          let rsMsg = message.data.handle_result;
          if(rsMsg){
            that.cancleUpdateFile();
            that.initData();
            that.$message({
              message: rsMsg,
              type: 'success'
            });
          }else {
            that.$message.error(message.message);
          }
        });
        return false;

      },
      fileChange(e){
        let that = this;
        let file = e.target.files[0];
        that.updateFileName = file.name;
        console.log(file);
      },
      openUploadWin(){
        let that = this;
        that.fileUploadDialogVisible = true;
      },
      saveRecordInfo(){
        let that = this;
        let config,successInfo;
        let type = that.isEdit;
        let insertData = that.dialogInfoObj;

        if(!type){
          insertData.show_id = insertData.row_key = 1;
          successInfo =  '录入成功';
        }else{
          successInfo =  '修改成功';
        }

        for(var i in insertData){
          let temp = insertData[i];

          if(!temp){
            that.bubbleTipShow("请完善信息");
            return;
          }else {
            if(i != 'area_name' && i!='date' && i!='row_key'){
              if(!that.inputExp.test( Number(temp) )){
                console.log(temp);
                that.bubbleTipShow("请输入纯数字");
                return;
              };
            }
          }
        }

        if(type){
          config = {
            project_id: that.$store.state.projectId,
            floor_id: that.formData.floor_id,
            sys_menu_id:that.formData.sys_menu_id,
            row_key: that.dialogInfoObj.row_key,
            update_data: JSON.stringify(that.dialogInfoObj),
            page_index:1
          }
        }else{
          let roleKey = "floor_id:" + that.formData.floor_id + ".date:" + insertData.date.substring(0,10).replace(/-/g,"");
          insertData.row_key = roleKey;

          config = {
            project_id: that.$store.state.projectId,
            floor_id: that.formData.floor_id,
            sys_menu_id:that.formData.sys_menu_id,
            insert_one_data: JSON.stringify(insertData),
            page_index:1
          }
        }
        console.log(config);

        that.$http.post('hotel_energy/history_record',config).then(res=>{
          console.log(res);
          if(res.data.code =='0'){
            that.initData();
            that.bubbleTipShow(successInfo);
            setTimeout(function () {
              that.editInfoDialogVisible = false;
              that.dialogInfoObj = {};
            },2000)
          }else {
            that.bubbleTipShow(res.data.message);
            that.editInfoDialogVisible = false;
            that.dialogInfoObj = {};
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      downloadModule(){
        let that = this;
        let config = {
          project_id: that.$store.state.projectId,
          floor_id: that.formData.floor_id,
          sys_menu_id:that.formData.sys_menu_id,
          download_file : true
        }

        that.$http.post('hotel_energy/history_record',config).then(res=>{
          console.log(res);
          let path = "http://" + res.data;
          window.location.href = path;

        }).catch(err=>{
          console.log(err);
        })
      },
      bubbleTipShow(tip){
        this.bubbleTip = tip;
        this.$store.state.bubbleShow = true;
        var that = this;
        setTimeout(function () {
          that.$store.state.bubbleShow = false;
        },3000)
      },
      confirmDelete(){
        let that = this;
        let config = {
          project_id: that.$store.state.projectId,
          floor_id: that.formData.floor_id,
          sys_menu_id:that.formData.sys_menu_id,
          del_record_date : that.delRecordDate,
          row_key: that.roleKey
        }
        console.log(config);

        that.$http.post('hotel_energy/history_record',config).then(res=>{
          console.log(res);
          if(res.data.code =='0'){
            that.isReset = false;
            that.initData();
            that.bubbleTipShow('删除成功');
            setTimeout(function () {
              that.deleteInfoDialog = false;
            },2000)
          }else {
            that.bubbleTipShow(res.data.message);
            that.deleteInfoDialog = false;
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      openDeleteDialog(val){
        var that = this;
        that.deleteInfoDialog = true;
        let curDate = val.date;
        that.delRecordDate = curDate.substring(0,10).replace(/-/g,"");
        that.roleKey = val.row_key;
      },
      areaData1Chang(id){
        let that = this;
        that.formData.floor_id = id;
        that.areaData.data2 = "";
        that.areaData2Array = that.areaData3Array = [];
          let datas = that.areaData1Array;
        for(let i=0;i<datas.length;i++){
          let temp = datas[i];
          if(temp.id == id){
              if(temp.child){
                that.areaData2Array = temp.child;
              }else{
                that.areaData2Array = []
              }
            that.areaCheckedTitle = temp.title;
          }
        }
      },
      areaData2Chang(id){
        let that = this;
        that.formData.floor_id = id;
        that.areaData3Array = [];
        that.areaData.data3 = "";

        let datas = that.areaData2Array;
        for(var i=0;i<datas.length;i++){
          var temp = datas[i];
          if(temp.id == id){
            that.areaData3Array = temp.child;
            that.areaCheckedTitle = temp.title;
          }
        }
      },
      areaData3Chang(id){
        let that = this;
        that.formData.floor_id = id;
        that.areaData4Array = [];
        that.areaData.data4 = "";

        let datas = that.areaData3Array;
        for(var i=0;i<datas.length;i++){
          var temp = datas[i];
          if(temp.id == id){
            that.areaData4Array = temp.child;
            that.areaCheckedTitle = temp.title;
          }
        }
      },
      areaData4Chang(id){
        let that = this;
        that.formData.floor_id = id;

        let datas = that.areaData4Array;
        for(var i=0;i<datas.length;i++){
          var temp = datas[i];
          if(temp.id == id){
            that.areaCheckedTitle = temp.title;
          }
        }
      },
      queryClick(){
        this.loading = true;
        this.initData();
      },
      initData(){
        let that = this;
        let config = that.formData;
        console.log(config);

        this.$http.post('/hotel_energy/history_record',config).then((res)=>{
          console.log(res);
          if(res.data.code==0){
            that.curPageData = res.data.data.history_record.data;
            that.formData.total = res.data.data.history_record.total_record_num;
            that.formData.pageCount = res.data.data.history_record.total_page_num;
            that.areaData1Array = res.data.data.history_record.area_level;
           /* that.areaData1Array = [
              {
                "child": [
                  {
                    "child": [
                      {
                        "child": [
                          {
                            "child": [],
                            "id": 512,
                            "parent_id": 44,
                            "title": "0666楼"
                          }
                        ],
                        "id": 44,
                        "parent_id": 15,
                        "title": "06-10楼"
                      },
                      {
                        "child": [],
                        "id": 46,
                        "parent_id": 15,
                        "title": "11-15楼"
                      }
                    ],
                    "id": 15,
                    "parent_id": 12,
                    "title": "1栋"
                  },
                  {
                    "child": [],
                    "id": 17,
                    "parent_id": 12,
                    "title": "3栋"
                  },
                  {
                    "child": [],
                    "id": 19,
                    "parent_id": 12,
                    "title": "5栋"
                  }
                ],
                "id": 12,
                "parent_id": 0,
                "title": "1-10栋"
              },
              {
                "child": [
                  {
                    "child": [],
                    "id": 25,
                    "parent_id": 13,
                    "title": "11栋"
                  },
                  {
                    "child": [],
                    "id": 27,
                    "parent_id": 13,
                    "title": "14栋"
                  }
                ],
                "id": 13,
                "parent_id": 0,
                "title": "11-20栋"
              },
              {
                "child": [
                  {
                    "child": [],
                    "id": 34,
                    "parent_id": 14,
                    "title": "21栋"
                  },
                  {
                    "child": [],
                    "id": 36,
                    "parent_id": 14,
                    "title": "23栋"
                  }
                ],
                "id": 14,
                "parent_id": 0,
                "title": "21-30栋"
              }
            ];*/

            that.loading = false
          }else{
            that.$message.error(res.data.message);
          }
        })
      },
      toInputPage(){
        this.loading = true
        if(this.formData.page_index > this.formData.pageCount){
          this.formData.page_index = this.formData.pageCount
        }
        this.initData()
      },
      currentPageChange(aa){
        this.loading = true
        this.formData.page_index = aa
        this.initData()
      },
      takeIn(){
        let that = this;
        that.isEdit = false;
        that.dialogInfoObj.area_name = that.areaCheckedTitle;
        that.dialogTit = '单个录入';
        that.editInfoDialogVisible = true;
      },
      editRecord(data){
        console.log(data);
        let that = this;
        that.isEdit = true;
        that.dialogTit = '修改记录';
        that.editInfoDialogVisible = true;
        that.dialogInfoObj = data;
      },
      cancleImport(){
        let that = this;
        that.editInfoDialogVisible = false;
        that.dialogTit = '';
        that.dialogInfoObj = {};
      }
    }
  }
</script>
<style>
  .historyBtn{
    width:100%;
    position:absolute;
    right:0;
    bottom:0;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: .21rem;
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
    height:.32rem;
    margin-bottom: .16rem;
    display: flex;
  }
  .historyBox .formGroup .name{
    width:0.42rem;
    text-align: left;
    line-height: .32rem;
    color:#324667;
    font-size:0.14rem;
  }
  .historyBox .formGroup .name i{
    display:inline-block;
    width:100%;
  }
  .historyBox .formGroup .inpArea{
    margin-left:0.3rem;
    width:200px;
    height:100%;
  }
  .historyBox .formGroup .inpArea .querySelectItem{
    height:34px!important;
  }
  .historyBox .formGroup .inpArea .el-input__inner{
    height: .32rem!important;
    width: 2rem!important;
  }
  .history .el-table th>.cell{
    font-size:0.12rem!important;
  }
  .history .el-table .el-table__body td .cell{
    font-size:0.12rem!important;
  }
  .history .titBox{
    height:.5rem!important;
    line-height: .5rem!important;
  }
  .history .modalBoxIn,.history .metersHistoryDialogBox .el-dialog{
    width:5.47rem!important;
    height:6.02rem!important;
    margin: 0!important;
    background: #051732;
    border-radius: 10px;
  }
  .history .metersHistoryDialogBox.uploadFileBox .el-dialog{
    height: 2.25rem!important;
    box-shadow:0px 2px 8px 0px rgba(39,141,255,0.3),8px 24px 50px 0px rgba(113,166,241,0.1);
  }

  .history .metersHistoryDialogBox .el-dialog .el-dialog__header{
    height: .5rem;
    line-height: .5rem;
    background: rgba(0, 0, 0, 0.25);
    text-align: center;
    padding: 0;
  }
  .history .metersHistoryDialogBox.uploadFileBox .el-dialog .el-dialog__header{
    text-align: left;
    padding-left: .2rem;
    color: #fff;
  }

  .history .metersHistoryDialogBox .el-dialog .el-dialog__title{
    color: #008aff!important;
    font-size: .16rem!important;
  }
  .history .metersHistoryDialogBox.uploadFileBox .el-dialog .el-dialog__title{
    color: #fff!important;
  }
  .history .metersHistoryDialogBox .el-dialog .el-dialog__body{
    padding: 0;
  }

</style>
<style lang="less" rel="stylesheet/less" scoped>
  .history{
    .paginationBox{
      position:static!important;
      margin-bottom: 10px!important;
      margin-top: 10px!important
    }
    width:100%;
    height:100%;
    .queryBox{
      height: .32rem;
    }
    .queryBox>div{
      margin-right: .1rem;
    }
    .queryData{
      height: .32rem!important;
      width: .92rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .exBth{
      width:1rem;
      height:.32rem;
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
    .exBth:last-child{
      span:first-child{
        background:url(../../../assets/img/Energy/modelDown.png);
        background-size:100% 100%;
      }
    }
  }

  .uploadFileBox .dialog-footer .cancleBtn{
    border: 1px solid #4A90E2;
    background-color: transparent;
  }
  .uploadFileBox .dialog-footer .saveBtn{
    background-color: #3A84EE!important;
  }
  .uploadFileBox .dialog-footer .el-button{
    width: .86rem;
    height: .32rem;
    line-height: .32rem;
    color:#fff;
    font-size: .14rem;
    padding: 0;
  }
  .uploadFileBox .fileNameBox{
    height: .2rem;
    line-height: .2rem;
    font-size: .14rem;
    padding-left: .91rem;
    color: #fff;
  }

  .upRowBox{
    padding: .2rem;
    font-size: .14rem;
    color: #4F648B;
    line-height: .32rem;
  }
  .upRowBox span:first-child{
    width: .56rem;
    text-align: justify;
    text-align-last: justify;
    margin-right: .15rem;
    display: inline-block;
  }
  .upRowBox form{display: inline-block;}
  .upRowBox input{
    width: 2rem;
    height: .32rem;
    border: none;
    vertical-align: bottom;
    opacity: 0;
    margin-left: -2.1rem;
    cursor: pointer;
  }
  .upRowBox .upBtn{
    width: 2rem;
    height: .32rem;
    display: inline-block;
    vertical-align: bottom;
    border: 1px solid #1989FA;
    border-radius: 2px;
    padding-left: .2rem;
    color: #fff;
    font-size: .14rem;
  }
</style>
<style>
  .history .queryBox .el-input__inner{
    width: 1.2rem!important;
    height: .32rem!important;
    color:white;
  }
  .history .el-button{
    font-size:0.14rem!important;
  }
  .history .el-button+.el-button{
    background:none!important;
    color:#409EFF;
  }
  .history .paginationBox .curPageBox{
    color:white!important;
  }
  .metersHistoryDialogBox>.modalBg,.metersHistoryDialogBox{
    height: 53.3vw!important;
    min-height: 728px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .metersHistoryDialogBox.modalBox .modalBoxIn .colseBoxs{
    right: -.1rem;
    top:-.1rem;
  }
  .metersHistoryDialogBox.modalBox .modalBoxIn{
    overflow: visible!important;
  }


  .el-dialog  .el-dialog__headerbtn{
    position: absolute;
    right: -.1rem;
    top: -.1rem;
    background-color: #00275B;
    width: .2rem;
    height: .2rem;
    border-radius: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .el-dialog .el-dialog__close {
    width: .16rem;
    height: .16rem;
    color: #3B89F9!important;
  }
  .uploadFileBox .el-dialog__footer{
    padding: 0 .2rem!important;
    position: absolute;
    width: 100%;
    bottom:.2rem;
    left: 0;
  }
  .upRowBox input[type='hidden']{
    margin: 0!important;
  }
</style>
