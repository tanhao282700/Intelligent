<!--
    步骤条下的详细信息
-->
<template id="child">
    <div class="addTemp">    
      <div class="addtitle">{{title}}</div>
      <div class="addCont">
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                专业
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.departments">
                <el-select v-model="formval.department" placeholder="请选择" @change="change2">
                  <el-option
                    v-for="(item,index) in formvals1.departments"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <!-- <el-select>  -->
                  <!-- :options = '' 
                  :value = "formval.department" 
                  :icon="'el-icon-d-caret'"
                  placeholder="专业"
                  @change = "change2"
                /> -->
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检人员
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.examine">
                <!-- <SelectBox 
                  :options = 'formvals1.examine' 
                  :value = "formval.exam" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检人员"
                  @change = "change1"
                /> -->
                <el-select v-model="formval.exam" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in formvals1.examine"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
                <!-- <SelectBox 
                  :options = 'formvals1.systems' 
                  :value = "formval.system" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检系统"
                  @change = "change4"
                /> -->
                <el-select v-model="formval.system" placeholder="请选择" @change="change4">
                  <el-option
                    v-for="(item,index) in formvals1.systems"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检区域<i>*</i>
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.areas">
                <!-- <SelectBox 
                  :options = 'formvals1.areas' 
                  :value = "formval.area" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检区域"
                  @change = "change5"
                /> -->
                <el-select v-model="formval.area" placeholder="请选择" @change="change5">
                  <el-option
                    v-for="(item,index) in formvals1.areas"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                巡检设备
              </el-col>
              <el-col :span="18" class="addContInput" v-if="formvals1.devices">
                <!-- <SelectBox 
                  :options = 'formvals1.devices' 
                  :value = "formval.device" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检设备"
                  @change = "change6"
                /> -->
                <el-select v-model="formval.device" placeholder="请选择" @change="change6">
                  <el-option
                    v-for="(item,index) in formvals1.devices"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
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
                <!-- <SelectBox 
                  :options = 'formvals1.periods' 
                  :value = "formval.period" 
                  :icon="'el-icon-d-caret'"
                  placeholder="巡检周期"
                  @change = "change8"
                /> -->
                <el-select v-model="formval.period" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in formvals1.periods"
                    :key="index"
                    :multiple="true"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="6" class="addContLabel">
                采集数据点
              </el-col>
              <el-col :span="18"  class="addContInput" v-if="formvals1.datas">
                <!-- <SelectBox 
                  :options = 'formvals1.datas' 
                  :value = "formval.data" 
                  :multiple="true"
                  :icon="'el-icon-d-caret'"
                  placeholder="采集数据点"
                  @change="change9"
                /> -->
                <el-select v-model="formval.data" multiple placeholder="请选择">
                  <el-option
                    v-for="(item,index) in formvals1.datas"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
  import utils from '@/assets/js/utils'
  import '@/assets/css/fs_common.css'
  export default {
      props:['data','title','formvals'],
      components:{
        'SelectBox':SelectBox,
      },
      data () {
        return {
            formvals1:{},
            formval:{
              starttime:'',
              device:'',
              exam:'',
              area:'',
              addr:'',
              system:'',
              desc:'',
              data:[],
              period:'',
              department:'',
              time_limit:''
            },
            floor_name:''
        }
      },
      methods:{
         change1(val){
            this.formval.exam=val;
         },
         change2(val){
            this.$emit('getUserlist',{department_id:val});
            this.formval.department = val;
         },
         change3(val){
            this.formval.limit = val;
         },
         change4(val){
            //console.log(val);
            this.formval.system=val;
            this.$emit('getSystemval',{sys_id:val});
            this.$emit('getFloorVal',{floor_name:this.formval.area,sys_id:val})
         },
         change5(val){
            let res = '';
            $.each(this.formvals1.areas,(n,k)=>{
              if(k.value==val){
                this.$emit('getFloorVal',{floor_name:k.label,sys_id:this.formval.system})
                
              }
            })
            this.formval.area = val;
         },
         change6(val){
            this.formval.device = val;
            this.$emit('getDeviceVal',{device:val,sys_id:this.formval.system})
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
          if(this.formval.starttime){
            this.formval.starttime = utils.time(new Date(this.formval.starttime)/1000,1)
          }
          let res = []
          if(this.formval.data){
            let data = this.formval.data;
            $.each(data,(n,k)=>{
              res[n]=({'cate_id':k})
            })
          }
          this.$emit('saveAdd',{
              id:this.formvals.id,
              start_date: this.formval.starttime,
              user_id: this.formval.exam,
              sys_id: this.formval.system,
              floor_id: this.formval.area,
              cycle: this.formval.period,
              ins_place: this.formval.addr,
              remarks: this.formval.remarks,
              device_id: this.formval.device,
              time_limit: this.formval.time_limit,
              department_id: this.formval.department,
              device_info:res})
         }
      },
      watch:{
        formvals:{
          handler(val){
            if(val){
              this.formvals = val;
            }
          },
          deep:true
        },
        data:{
          handler(val){
            if(val){
              this.formval = val;
              // if(val.system){
              //   this.$emit('getSystemval',val);
              // }
              // if(val.department){
              //   this.$emit('getUserlist',val);
              // }
              // if(val.floor_id,val.system){
              //     this.$emit('getFloorVal',val.floor_name,this.formval.system)
              // }
              // if(val.device){
              //   this.$emit('getDeviceVal',val.device)
              // }
            }
          },
          deep:true
        }
      },
      mounted() {
        this.formval = this.data;
        //console.log(this.data)
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
