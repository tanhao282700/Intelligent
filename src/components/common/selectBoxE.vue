<!--
    能源设备选择框
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
            />
        </div>
        <div class = "chooseBox2000">
            <SelectBoxs
                :options='floorOptions'
                :value = 'valueFloor'
                placeholder = '请选择'
                @change = "change1"
            />
        </div>     
    </div>
</template>

<script>
import SelectBoxs from '../form/selectBox';
import utils from '../../assets/js/utils.js';
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
                if(this.valueArea.split('sys')[1] == this.allData[i].id){
                    this.index1 = i;
                    let lens2 = this.allData[i].son.length;
                    if(lens2==0){
                        continue;
                    }
                    for(let j=0;j<lens2;j++){
                    let objs = {
                        value:'sys'+this.allData[i].son[j].id,
                        label:this.allData[i].son[j].title
                    }  
                    attrs.push(objs);
                    }
                }   
            }
          }
         
          return attrs;
      },
  },
  data () {
    return {
        allData:[],
        idNow:0,
        valueArea:'',  //区域值 
        index1:-1,
        valueFloor:'',  //区域值 
        index2:-1,
        areasOptions:[],
    }
  },
  methods:{
      //修改区域
    change0(value0){
      this.idNow = value0.split('sys')[1];
      this.valueArea = value0;
      this.chooses();
    },
    change1(value0){
      this.idNow = value0.split('sys')[1];
      this.valueFloor = value0;
      this.chooses();
    },
    chooses(){
        this.$emit('choose',this.idNow);
    },
    getLists(){
        const obj = {
            "sys_menu_id":this.data.sId,  //sId = 系统Id (发送的id)
            'type':-1
        };
        utils.post('energy/system',obj).then(res=>{
            // console.log(res)
            if(res.code==0){
                let data = res.data;
                this.allData = data;
                let lens = data.length;
                this.areasOptions =[];
                for(let i=0;i<lens;i++){
                    let objs = {
                        value:'sys'+data[i].id,
                        label:data[i].title
                    }
                    this.areasOptions.push(objs);
                }
            }else{
                this.$message(res.message);
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
@import '../../assets/css/comon.less';
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
