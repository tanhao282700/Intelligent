<template>
  <!-- 单价预设 -->
  <div class="unitDomBox thUnit">
    <div class="unitPrice">
      <span class="closeDoorInfo" @click="hideModel">×</span>
      <div class="unitHeadBox" style="font-size:0.12rem;">单价预设</div>
      <el-form ref="form" :model="form">
        <ul class="unit titleUni">
          <li>序号</li>
          <li>类型</li>
          <li>能耗用途</li>
          <li>表器选择</li>
          <li>时段类型</li>
          <li>时间段</li>
          <li>价格</li>
        </ul>
        <ul v-for="(item,index) in list" class="itemsBox unit">
          <li><i class="liCloseBox el-icon-circle-close" @click="removLi(item,index)"></i>{{index+1}}</li>
          <li>
            <el-select @change="chooseChange(item,index)" v-model="item.energy" placeholder="类型">
              <el-option label="电" value="电"></el-option>
              <el-option label="水" value="水"></el-option>
              <el-option label="气" value="气"></el-option>
            </el-select>
          </li>
          <li>
            <el-select @change="chooseChange(item,index)" v-model="item.user_type" placeholder="能耗用途">
              <el-option label="居民" value="居民"></el-option>
              <el-option label="商业" value="商业"></el-option>
            </el-select>
          </li>
          <li>
            <el-select v-model="item.energyWhere" placeholder="表器选择">
              <el-option value="treeVal">
                <el-tree
                  @check-change="treeChange(item,index)"
                  :data="data2"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  :check-on-click-node="aa2"
                  :default-checked-keys="item.area"
                  :props="defaultProps">
                </el-tree>
              </el-option>
            </el-select>
          </li>
          <li>
            <el-select @change="chooseChange(item,index)" v-model="item.time_type" placeholder="时段类型">
              <el-option label="谷时" value="谷时"></el-option>
              <el-option label="峰时" value="峰时"></el-option>
              <el-option label="平时" value="平时"></el-option>
            </el-select>
          </li>
          <li>
            <el-time-picker
              @change="timeChange(item,index)"
              is-range
              v-model="item.dateRange"
              range-separator="-"
              format="HH:mm"
              value-format="HH:mm"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </li>
          <li class="myInp">
            <el-input @change="inputChange(item,index)" v-model="item.price" placeholder="请输入价格"></el-input>
            <span>元</span>
          </li>
        </ul>

      </el-form>
      <div class="addMode" @click="addMode"><span><i class="el-icon-circle-plus"></i>添加模式</span></div>
      <div class="btnGroupBox">
        <span @click="hideModel">取消</span>
        <span @click="setPrise" class="btnOk">确定</span>
      </div>
    </div>
    <bubbleTip :tipText="bubbleTip"/>
  </div>

</template>

<script>
  import bubbleTip from '@/components/common/bubbleTip';

  export default {
    components: {
      "bubbleTip": bubbleTip
    },
    data() {
      return {
        aa2: true,
        bubbleTip: '',
        treeVal: '',
        data2: [{}],
        defaultProps: {
          children: 'child',
          label: 'title'
        },
        list: [],
        listChange: [],
        form: {},
        deletForm: {
          project_id: '',
          sys_menu_id: '',
          query_price: true,
          price_set: ''
        },
      }
    },
    mounted() {
      this.deletForm.sys_menu_id = this.$store.state.sysList[18].sys_menu_id;
      this.deletForm.project_id = this.$store.state.projectId;
      this.initQuery()
    },
    methods: {
      inputChange(item, index) {
        let filter = /^([1-9]\d*|0)(\.\d{1,2})?$/;
        if (!filter.test(item.price)) {
          this.bubbleTipShow("价格输入不合法");
          this.list[index].price = ''
        } else {
          this.chooseChange(item, index)
        }
      },
      timeChange(item, index) {
        this.list[index].start = this.list[index].dateRange[0]
        this.list[index].end = this.list[index].dateRange[1]
        if (this.listChange.length != 0) {
          let isAdd = true
          for (let i = 0; i < this.listChange.length; i++) {
            if (item.self_id == this.listChange[i].self_id) {
              this.listChange[i] = this.list[index]
              return
            }
          }
          if (isAdd) {
            this.listChange.push(item)
          }
        } else {
          this.listChange.push(item)
        }
      },
      treeChange(item, index) {
        let nodes = this.$refs.tree[index].getCheckedKeys();
        this.list[index].area = nodes
        if (this.listChange.length != 0) {
          let isAdd = true
          for (let i = 0; i < this.listChange.length; i++) {
            if (item.self_id == this.listChange[i].self_id) {
              isAdd = false
              this.listChange[i] = this.list[index]
              return
            }
          }
          if (isAdd) {
            this.listChange.push(item)
          }
        } else {
          this.listChange.push(item)
        }
      },
      chooseChange(item, index) {
        if (this.listChange.length != 0) {
          let isAdd = true
          for (let i = 0; i < this.listChange.length; i++) {
            if (item.self_id == this.listChange[i].self_id) {
              isAdd = false
              this.listChange[i] = item
              return
            }
          }
          if (isAdd) {
            this.listChange.push(item)
          }
        } else {
          this.listChange.push(item)
        }
      },
      setPrise() {
        if (this.listChange.length == 0) {
          this.bubbleTipShow("没有任何修改");
        } else {
          for (let j = 0; j < this.listChange.length; j++) {
            let k = ''
            for (k in this.listChange[j]) {
              if (!this.listChange[j][k] || this.listChange[j][k].length == 0) {
                for (let z = 0; z < this.list.length; z++) {
                  if (this.listChange[j].self_id == this.list[z].self_id) {
                    this.bubbleTipShow("请完善第" + (z + 1) + "行信息");
                    return
                  }
                }
              }
            }
          }
          this.listChange.map((item, index) => {
            if (item.myId) {
              delete item.self_id
            }
          })
          this.$http.post('/pc/2.0/energy/operation/bill/price', {
            project_id: this.deletForm.project_id,
            query_price: true,
            sys_menu_id: this.deletForm.sys_menu_id,
            price_set: JSON.stringify(this.listChange)
          }).then((res) => {
            if (res.data.code == 0) {
              this.initQuery()
              this.listChange = []
              this.bubbleTipShow(res.data.data.result_data.handle_price_record[0]);
              //console.log('我走到a')
            } else {
              this.bubbleTipShow(res.data.message);
              //console.log('我走到b')
            }
          })
        }
      },
      initQuery() {
        let sys_menu_id = this.$store.state.sysList[18].sys_menu_id;
        let project_id = this.$store.state.projectId;
        this.$http.post('/pc/2.0/energy/operation/bill/price', {
          project_id: project_id,
          sys_menu_id: sys_menu_id,
          query_price: true
        }).then((res) => {
          if (res.data.code == 0) {
            //console.log(res)
            this.data2 = res.data.data.area_level
            for (let i = 0; i < res.data.data.result_data.price_set_record.length; i++) {
              res.data.data.result_data.price_set_record[i].dateRange = [res.data.data.result_data.price_set_record[i].start, res.data.data.result_data.price_set_record[i].end]
            }
            this.list = res.data.data.result_data.price_set_record
          } else {

          }
        })
      },
      bubbleTipShow(tip) {
        this.bubbleTip = tip;
        this.$store.state.bubbleShow = true;
        var that = this;
        setTimeout(function () {
          that.$store.state.bubbleShow = false;
        }, 3000)
      },
      addMode() {
        let id = Math.floor(Math.random() * 900) + 600
        this.list.push({
          "energy": "",
          "user_type": "",
          "area": [],
          "time_type": "",
          "start": "",
          "end": "",
          "price": '',
          "self_id": id,
          "myId": true
        });
        this.listChange.push({
          "energy": "",
          "user_type": "",
          "area": [],
          "time_type": "",
          "start": "",
          "end": "",
          "price": '',
          "self_id": id,
          "myId": true
        })
      },
      removLi(item, index) {
        console.log(item)
        if (item.myId) {
          this.list.splice(index, 1)
          for (var i = 0; i < this.listChange.length; i++) {
            if (item.self_id == this.listChange[i].self_id) {
              this.listChange.splice(i, 1)
              return
            }
          }
        } else {
          this.deletForm.price_set = JSON.stringify({
            self_id: item.self_id
          })
          this.$http.post('/pc/2.0/energy/operation/bill/price', this.deletForm).then((res) => {
            if (res.data.code == 0) {
              this.bubbleTipShow("删除成功");
              this.list.splice(index, 1)
              for (let i = 0; i < this.listChange.length; i++) {
                if (item.self_id == this.listChange[i].self_id) {
                  this.listChange.splice(i, 1)
                }
              }
            } else {
              this.bubbleTipShow(res.data.message);
              //console.log('我走到c')
            }
          })
        }
      },
      hideModel() {
        this.$emit("unitShowBool", false);
      },
    },
  }
</script>

<style>
  .btnGroupBox {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  .btnGroupBox span {
    display: inline-block;
    width: 70px;
    height: 26px;
    color: #fff;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    background: rgba(5, 23, 50, 1);
    border-radius: 2px;
    border: 1px solid #4A90E2;
    cursor: pointer;
  }

  .btnGroupBox span.btnOk {
    background: rgba(58, 132, 238, 1);
    border: 1px solid #1989FA;
    margin-left: 5px;
  }
</style>
<style>

  .thUnit .unit li {
    width: 16.6666% !important;
    font-size: 0.12rem !important;
  }

  .thUnit .unit .el-range-input {
    font-size: 0.12rem !important;
  }

  .thUnit .unit li:first-child {
    width: 6% !important;
  }

  .thUnit .el-form ul li .el-input__inner {
    text-align: center;
    width: 100% !important;
    padding: 0 !important;
  }

  .thUnit .unit {
    width: 100%;
    height: 0.4rem !important;
  }

  .thUnit .el-form ul {
    padding-left: 6% !important;
  }

  .thUnit .el-form ul li {
    height: 0.4rem !important;
    line-height: 0.4rem !important;
  }

  .thUnit .addMode {
    height: 0.4rem !important;
    line-height: 0.4rem !important;
  }

  .thUnit .addMode:hover {
    cursor: pointer;
  }

  .thUnit .el-form {
    max-height: 70%;
    overflow-y: auto;
  }

  .thUnit .el-form ul.itemsBox li:first-child .liCloseBox {
    width: 100% !important;
    height: 100% !important;
    line-height: 0.4rem;
    /*display: flex;
    align-items: center;
    justify-content: center;*/
  }

  .thUnit .myInp .el-input {
    width: 80% !important;
  }

  .thUnit .myInp .el-input .el-input__inner {
    color: white;
    text-align: left;
  }

  .thUnit .titleUni li {
    font-size: 0.14rem !important;
  }
</style>
