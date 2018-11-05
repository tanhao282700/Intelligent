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
              <el-col :span="18" class="addContInput" v-if="formvals1.examine">
                <SelectBox 
                  :options = 'formvals1.examine' 
                  :value = "formval.exam" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检人员"
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
              <el-col :span="18" class="addContInput" v-if="formvals1.departments">
                <SelectBox 
                  :options = 'formvals1.departments' 
                  :value = "formval.department" 
                  :icon="'el-icon-d-caret'"
                  placeholder="专业"
                  @change = "change2"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                完成时限
              </el-col>
              <el-col :span="18" class="addContInput" :style="{color:'#fff'}">
                <el-input v-model="formval.time_limit" placeholder="请输入完成时限" :style="{width:'90%'}"></el-input>日
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
              <el-col :span="18" class="addContInput" v-if="formvals1.systems">
                <SelectBox 
                  :options = 'formvals1.systems' 
                  :value = "formval.system" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检系统"
                  @change = "change4"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检区域<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.areas">
                <SelectBox 
                  :options = 'formvals1.areas' 
                  :value = "formval.area" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检区域"
                  @change = "change5"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检设备
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.devices">
                <SelectBox 
                  :options = 'formvals1.devices' 
                  :value = "formval.device" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检设备"
                  @change = "change6"
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
                <el-date-picker
                  v-model="formval.starttime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检周期<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.periods">
                <SelectBox 
                  :options = 'formvals1.periods' 
                  :value = "formval.period" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检周期"
                  @change = "change8"
                />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                采集数据点
              </el-col>
              <el-col :span="18"  class="addContInput" v-if="formvals1.datas">
                <SelectBox 
                  :options = 'formvals1.datas' 
                  :value = "formval.data" 
                  :icon="'el-icon-d-caret'"
                  placeholder="采集数据点"
                  @change="change9"
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
                <el-input v-model="formval.addr" placeholder="请输入巡检地点"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="addContDesc">
          <div class="addContLabel">备注</div>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入备注内容"
            v-model="formval.desc">
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
      props:['data','title','formvals'],
      components:{
        'SelectBox':SelectBox,
      },
      data () {
        return {
            formvals1:{},
            formval:{}
        }
      },
      methods:{
         change1(val){
            this.formval.name=val;
         },
         change2(val){
            this.formval.department = val;
         },
         change3(val){
            this.formval.limit = val;
         },
         change4(val){
            this.formval.system=val;
         },
         change5(val){
            this.formval.area = val;
         },
         change6(val){
            this.formval.device = val;
         },
         change7(val){
            this.formval.starttime=val;
         },
         change8(val){
            this.formval.period = val;
         },
         change9(val){
            this.formval.data = val;
         },
         cancelAdd(){
            this.$emit('cancelAdd')
         },
         saveAdd(){
          this.$emit('saveAdd',{
              id:this.formvals.id,
              start_date: this.formvals.starttime,
              user_id: this.formval.exam,
              sys_id: this.formval.system,
              floor_id: this.formval.area,
              cycle: this.formval.period,
              ins_place: this.formval.addr,
              remarks: this.formval.remarks,
              device_id: this.formval.device,
              time_limit: this.formval.time_limit,
              department_id: this.formval.department,
              device_info:this.formval.data})
         }
      },
      watch:{
        formvals:{
          handler(val){
            if(val){
              this.formvals1 = val;
            }
          },
          deep:true
        }
      },
      mounted() {
        this.formvals1 = this.formvals;
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
