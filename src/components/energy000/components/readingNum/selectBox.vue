<!--
    区域选择框
     made by 白富友
    start in 2018-8-16
-->
<template>
    <div class="searchBox000">
        <div class = "chooseBox2000">
            <SelectBoxs
            :options='areasOptions'
            :value = 'valueArea'
            placeholder = '请选择'
            @change = "change0"
            ref="sel1"
            />
        </div>
        <div class = "chooseBox2000">
            <SelectBoxs
                :options='floorOptions'
                :value = 'valueFloor'
                placeholder = '请选择'
                @change = "change1"
                ref="sel2"
            />
        </div>
        <div class = "chooseBox2000">
            <SelectBoxs
                :options='positonOptions'
                :value = 'valuePos'
                placeholder = '请选择'
                @change = "change2"
                ref="sel3"
            />
        </div>
    </div>
</template>

<script>
import SelectBoxs from '../../../form/selectBox';
import utils from '../../../../assets/js/utils.js';
export default {
  props:['data'],
  components:{
      'SelectBoxs':SelectBoxs
  },
  computed:{
      floorOptions(){
          let attrs = [];
          let lens = this.allData.length;
          if(lens>0){
            for(let i=0;i<lens;i++){
                if(this.valueArea.split('area')[1] == this.allData[i].id){
                    this.index1 = i;
                    let lens2 = this.allData[i].son.length;
                    if(lens2==0){
                        continue;
                    }
                    for(let j=0;j<lens2;j++){
                    let objs = {
                        value:'area'+this.allData[i].son[j].id,
                        label:this.allData[i].son[j].name
                    }
                    attrs.push(objs);
                    }
                }
            }
          }

          return attrs;
      },
      positonOptions(){
          let attrs = [];
          if(this.allData[this.index1]!==undefined){
              if(this.allData[this.index1].son!==undefined){
                let data1 =  this.allData[this.index1].son;
                let lens =data1.length;
                if(lens>0){
                    for(let i=0;i<lens;i++){
                        if(this.valueFloor.split('area')[1] == data1[i].id){
                            this.index2 = i;
                            let lens2 = data1[i].son.length;
                            if(lens2==0){
                                continue;
                            }
                            for(let j=0;j<lens2;j++){
                            let objs = {
                                value:'area'+data1[i].son[j].id,
                                label:data1[i].son[j].name
                            }
                            attrs.push(objs);
                            }
                        }
                    }
                }
              }

          }

          return attrs;
      }
  },
  data () {
    return {
        allData:[],
        idNow:0,
        valueArea:'',  //区域值
        index1:-1,
        valueFloor:'',  //区域值
        index2:-1,
        valuePos:'',  //区域值
        index3:-1,
        areasOptions:[],
    //    floorOptions:[
    //         {
    //         value: '1',
    //         label: '1楼'
    //         }, {
    //         value: '2',
    //         label: '2楼'
    //         },
    //    ],
    }
  },
  methods:{
    befirst(){
        this.idNow = 0;
        this.valueArea = '';
        this.valueFloor = '';
        this.valuePos = '';
        this.index1 = -1;
        this.index2 = -1;
        this.index3 = -1;

        this.$refs.sel1.beFirst();
        this.$refs.sel2.beFirst();
        this.$refs.sel3.beFirst();
    },
      //修改区域
    change0(value0){
      this.idNow = value0.split('area')[1];
      this.valueArea = value0;
      this.chooses();
    },
    change1(value0){
      this.idNow = value0.split('area')[1];
      this.valueFloor = value0;
      this.chooses();
    },
    change2(value0){
     this.idNow = value0.split('area')[1];
      this.valuePos = value0;
      this.chooses();
    },
    chooses(){
        this.$emit('choose',this.idNow);
    },
    getLists(){
      let that = this;
      let config = {
        "sys_menu_id":this.data.sId,  //sId = 系统Id (发送的id)
        "floor_id":0
      }
      let headers = {
        //'Content-Type': 'multipart/form-data'
      }
      this.$http.get('/currency/floor', config, headers).then(res => {
        let data0 = res.data;
        console.log('获取楼层', config, res);
        if(data0.code==0){
          let data2 = data0.data;
          this.allData = data2;
          let lens = data2.length;
          this.areasOptions =[];
          for(let i=0;i<lens;i++){
            let objs = {
              value:'area'+data2[i].id,
              label:data2[i].name
            }
            this.areasOptions.push(objs);
          }
        }else{
          this.$message(data0.message);
        }

      }).catch(err=>{
        console.log(err)
      });
    }
  },
  created() {
    this.getLists();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../../../assets/css/comon.less';
.searchBox000{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    .chooseBox2000{
        text-align: center;
        flex:1;
    }

}

</style>
