<!--
    步骤条下的详细信息
-->
<template>
    <div class="addTemp">    
      <div class="addtitle">{{title}}</div>
      <div class="addCont">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检人员
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                专业
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                完成时限
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检系统<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检区域<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检设备
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                开始时间<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检周期<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                采集数据点
              </el-col>
              <el-col :span="18"  class="addContInput">
                <SelectBox 
                  :options = 'formvals.systems' 
                  :value = "formvals.vSystem" 
                  :icon="'el-icon-d-caret'"
                  placeholder="郭好好"
                  @change = "change1"
                />
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检地点
              </el-col>
              <el-col :span="18" class="addContInput">
                <el-input v-model="formvals.addr"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="addContDesc">
          <div class="addContLabel">备注</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formvals.desc">
          </el-input>
        </div>
        <el-row class="btngroups">
          <el-button class="cancel btns" @click="cancelAdd">取消</el-button>
          <el-button type="primary btns" @click="saveAdd">保存</el-button>
        </el-row>
      </div>
    </div>
</template>

<script>
  import SelectBox from '@/components/form/selectBox';
  import '@/assets/css/fs_common.css'
  export default {
      props:['data','title'],
      components:{
        'SelectBox':SelectBox,
      },
      data () {
        return {
          formvals:{
            systems:[],
            value7:'2018-08-07',
            addr:''
          }
        }
      },
      methods:{
         change1(){

         },
         changes(){

         },
         adds(){

         },
         deletes(){

         },
         cancelAdd(){
            this.$emit('cancelAdd')
         },
         saveAdd(){
            this.$emit('saveAdd',this.formvals)
         }
      },
      created() {
      },
      mounted() {
        console.log(this.data);
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less"> 
@import '../../../../assets/css/comon.less';
.vw(@val){
  width:@val*100/1366vw;
}
.vwPL(@val){
  padding-left:@val*100/1366vw;
}
.vwMLR(@val){
  margin: 0 @val*100/1366vw;
}
.vwMR(@val){
  margin-right:@val*100/1366vw;
}
.addTemp{
  width:100%;
  .addtitle{
    width:100%;
    .vhLH(50);
    background:rgba(0,0,0,0.2);
    .vh(50);
    color:#fff;
    .vwPL(20);
  }
  .addCont{
    .vhMT(30);
    color:#4F648B;
    .addContLabel{
      .vhLH(32);
      .vh(32);
      text-align:right;
      padding-right:0.585vw;
      i{
        color :red;
      }
    }
    .addContDesc{
      width:95.8%;
      margin:0 auto;
      .addContLabel{
        text-align:left;
      }
    }
    .addContInput{
      .vw(200);
      background:rgba(255,255,255,0.01);
      border-radius:1px;
      border:1px solid rgba(25,137,250,1);
      .vhMB(20);
    }
    .btngroups{
      position:absolute;
      bottom:2.06vh;
      right:1.1vw;
      .cancel{
        background:#164488;
        border:none;
        color:#fff;
      }
      .btns{

      }
    }
    
  }
}
</style>
