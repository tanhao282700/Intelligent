fpid<template>
    <div class="examineTable boxs"
        v-loading="loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
        element-loading-spinner="el-icon-loading"
        element-loading-text="拼命加载中"
    >
        <div class="tableHead">
            <TimePickerT
                :value7= "value7"
                :cant  = 'cant'
                @changes = "changes"
                @deletes = 'deletes'
                @adds    = 'adds'
            />
            <span class="currMonth" v-show="backOrCurr">{{month}}月</span>
            <span class="backCurrMonth" v-show="!backOrCurr" @click="backCurr">
                <img src="../../../../assets/img/AgentManage/return.png" width="1.17vw">
            </span>
        </div>
        <div class="tableBox">
            <div class="tableTit">
                <span v-for="(item,index) in tableT">{{item.label}}<span v-text="item.timearea"></span></span>
            </div>
            <div class="tableBody">
                <div class="tableH">
                    <div class="tableLeft">
                        <div class="item nums">序号</div>
                        <div class="item names">姓名</div>
                        <div class="item works">职务</div>
                        <div class="tableHB">
                            <div class="item tableDT">日期</div>
                            <div class="item tableDT">星期</div>
                        </div>
                    </div>
                    <div class="tableRight">
                        <ul>
                            <li class="item days" v-for="(v,i) in days" v-text="v" :class="{'noRight':i==30}"></li>
                        </ul>
                        <ul class="tableShadow">
                            <li class="item weeks" v-for="(v,i) in week" v-text="v" :class="{'noRight':i==30}"></li>
                        </ul>
                    </div>
                </div>
                <div class="tableB">
                    <el-scrollbar style="height:100%" :noresize="true">
                        <ul style="height:100%;width:100%;">
                            <li v-for="(v,i) in showLists">
                                <div class="tableBNum item" @click="deletess(i)">
                                    <span v-text="(i+1)"></span>
                                    <i class="el-icon-circle-close" @click="deletePaiBan(v.user_id)"></i>
                                </div>
                                <div class="tableBName item" v-text="v.name" v-show="v.isNew==undefined ||!v.isNew "></div>
                                <div class="tableBName item" v-show="v.isNew!==undefined &&v.isNew ">
                                    <SelectBox
                                        :options ='pOptions'
                                        :placeholder="placeholder"
                                        :value='v.name'
                                        ref="SelectBox"
                                        @change = '(val)=>change(val,i)'
                                    />
                                </div>

                                <div class="tableBDuty item" v-text="v.description"></div>
                                <div class="spanBox">
                                    <span class="item "
                                        @click="v.allow && changeIschange(i,i0,v0,v)"
                                        @mouseover="changeOver(i,i0)"
                                        @mouseout="leaveOver()"
                                        :class="{
                                            'hover':i==over[0]&&i0==over[1],
                                            'lefthover':i==over[0]&&i0==over[1]-1,
                                            'righthover':i==over[0]&&i0==over[1]+1,
                                            'tophover':i==over[0]-1&&i0==over[1],
                                            'bottomhover':i==over[0]+1&&i0==over[1],

                                            'lefttophover':i==over[0]-1&&i0==over[1]-1,
                                            'righttophover':i==over[0]-1&&i0==over[1]+1,
                                            'leftbottomhover':i==over[0]+1&&i0==over[1]-1,
                                            'rightbottomhover':i==over[0]+1&&i0==over[1]+1,

                                            'spanA':v0.type==1,
                                            'spanB':v0.type==2,
                                            'noRight':i0==30,
                                            'ischangeIng':ischange[0]==i&&ischange[1]==i0
                                        }"
                                        v-for="(v0,i0) in v.worklist"
                                        v-text="v0.title"
                                       >
                                    </span>
                                </div>

                                </li>
                                <li >
                                    <div class="addBtns" @click="addPerson()" v-show="isShowBtns=='yes'?true:false">
                                        <i class="el-icon-circle-plus"></i>
                                        <span>新增人员</span>
                                    </div>
                                </li>
                            </ul>
                    </el-scrollbar>
                </div>

                <div class="tableBot0">
                    <div class="tableLeft item tableBot0Left">
                        每日上班人数
                    </div>
                    <ul class="tableRight">
                        <li v-for="(v,i) in total" v-text="v" class="item" :class="{'noRight':i==30}"></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="tableBot" v-show="isShowBtns=='yes'?true:false">
            <div class="btnBai1" v-show="active=='change'" @click="botClick('change')">
                修改排班表
            </div>
<!--             <div class="btnBai1 btnBai2" v-show="active=='examed'">已审核</div>
 -->            <div class="btnBai1" v-show="active=='saveing'" @click="botClick('save')">
                保存
            </div>
        </div>
        <Tk
            :lists="wOptions"
            @change="tkChoose"
            v-show="isShow"
            :pos = "pos"
            ref = "tk"
        />
    </div>
</template>

<script>
import TimePickerT from '../../../../components/form/timePickerTit';
import utils from '../../../../assets/js/utils'
import SelectBox from './selectBox';
import Tk from './tk';
export default {
  props:['data','isShowBtns'],
  components:{
      'TimePickerT':TimePickerT,
      'SelectBox':SelectBox,
      'Tk':Tk
  },
    
  data () {
    return {
        loading:false,
        placeholder:'选择',
        value7:utils.time((new Date())/1000,9),
        backOrCurr:true,//右上角图标显示：返回当前月还是显示当前月
        cant:false,
        active:'change',
        originNum:0,
        addparam:{},
        isShow:false,
        ischange:[-1,-1],
        tableT:[],
        originPaiBanData:[],
        wOptions:[],
        addParams:[],
        pOption:[],
        dataLlists:[
            {id:1,pid:1,name:'王尼玛',description:'项目总管',worklist:[
                {time:'2018-8-5',title:'A',type:1},
                {time:'2018-8-23',title:'B',type:2},
            ]}
        ],
        pos:{
            top:0,
            left:0
        },
        over:[-5,-5],
        month:utils.time((new Date())/1000,9).split('-')[1]
    }
  },
  methods:{
    leaveOver(){
      this.over = [];
      this.over.push(-5);
      this.over.push(-5);
    },
    //针对value7的操作开始**************开始***********
    backCurr(){//点击右上角返回当月按钮
      this.value7 = utils.time((new Date())/1000,9);
      this.backOrCurr = utils.time((new Date())/1000,9).split('-')[1]
      this.$emit('getPaibanData',this.value7);
    },
    changes(val){
        this.value7 = val;
        if(this.value7.split('-')[1]!=utils.time((new Date())/1000,9)){
            this.backOrCurr = false;
        }
        this.$emit('getPaibanData',val)
    },
    deletes(){//月份减少
        let attrs = this.value7.split('-');

        if(attrs[1]==1){
            attrs[1] = 12;
            attrs[0] = Number(attrs[0])-1;
        }else{
            attrs[1] = Number(attrs[1])-1;
        }
        this.value7 = attrs.join('-');
        if (utils.time((new Date())/1000,9)!=this.value7) {
            this.backOrCurr = false;
        };
        this.$emit('getPaibanData',this.value7);
    },
    adds(){
        if(this.cant){
            return;
        }
        let attrs = this.value7.split('-');
        if(attrs[1]==12){
            attrs[1] = 1;
            attrs[0] = Number(attrs[0])+1;
        }else{
            attrs[1] = Number(attrs[1])+1;
        }
        this.value7 = attrs.join('-');
        if (utils.time((new Date())/1000,9)!=this.value7) {
            this.backOrCurr = false;
        };
        this.$emit('getPaibanData',this.value7);
    },
    //针对value7的操作**********结束************
    changeOver(i,i0){
      this.over = [];
      this.over.push(i);
      this.over.push(i0);
    },
    deletess(i){    //删除某人的排班
        this.dataLlists.splice(i,1);
    },
    tkChoose(val){ //弹框选择
        let _this = this;
        let objs = this.dataLlists[this.ischange[0]];
        $.each(this.wOptions,function(n,k){
            if(val==_this.wOptions[n].value){
                objs.worklist[_this.ischange[1]].title = _this.wOptions[n].label;
            }
        })

        objs.worklist[this.ischange[1]].type = val;
        if(val!=this.addparam.worklist_id){
            this.addparam.worklist_id = val;
            $.each(this.addParams,(n,k)=>{
                if(k.user_id==this.addparam.user_id && k.workdate==this.addparam.workdate){
                    addParams[n] = this.addparam;
                }
            })
            this.addParams.push(this.addparam);
        }
        console.log(this.addParams);
        this.ischange = [-1,-1];
        this.isShow=false;
    },
    changeIschange(i,i0,v0,v,event){
        if(!v.worklist[i0].id){
            this.addparam = {id:0,user_id:v.user_id,worklist_id:v.worklist[i0].type,workdate:v0.time}
        }else{
            this.addparam = {id:v.worklist[i0].id,user_id:v.user_id,worklist_id:v.worklist[i0].type,workdate:v0.time}
        }
        this.isShow = true;
        this.ischange = [];
        this.ischange.push(i);
        this.ischange.push(i0);

        var e = event || window.event;
        this.pos = {
            top : e.clientY+'px',
            left:e.clientX - 15+'px'
        }
        this.$refs.tk.show();
        // console.log(this.ischange,this.pos)
    },
    change2(val,i,i0){

    },
  //日期组件相关
    change(val,i){  //修改人名带出职务
        this.dataLlists[i].pid = val;
        this.dataLlists[i].user_id = val;
        this.dataLlists[i].name = this.getItem(val).label;
        this.dataLlists[i].description = this.getItem(val).duty;
        this.placeholder =this.getItem(val).label;
    },
    getItem(id){
        let lens = this.pOption.length;
        let res = {};
        for(let i=0;i<lens;i++){
            if(id==this.pOption[i].value){
               res =  this.pOption[i];
            }
        }
        return res;
    },

    botClick(type){ //底部按钮操作
        let _this = this;
        switch(type){
            case 'change':
                $.each(_this.showLists,function(n,k){
                    _this.showLists[n].allow = true;
                })
                this.active = 'saveing';
                break;
            case 'save' :
                $.each(_this.showLists,function(n,k){
                    _this.showLists[n].allow = false;
                })
                this.saveAddPaiBan();
                this.active = 'change'
                break;
        }
    },
    saveAddPaiBan(){
        let param = {content:JSON.stringify({"data":this.addParams})}
        this.$emit('saveAddPaiBan',param)
        this.addParams = [];
    },
    addPerson(){ //新增人员
        this.originPaiBanData = this.dataLlists;
        if(this.pOptions.length==0){
            return this.$message('没有新员工了！');
        }
        if(this.dataLlists.length>0){
            if(this.dataLlists[this.dataLlists.length-1].pid==0){ //阻止连续新增操作
                return this.$message('请选择员工！');
            }
        }
        
        let addPersonBase={
            id:0,
            pid:0,
            user_id:'',
            isNew:true,
            name:'',
            duty:'',
            worklist:[],
            allow:true
        };
        if(this.dataLlists.length>0){
            this.dataLlists[this.dataLlists.length-1].isNew = false;
            this.dataLlists[this.dataLlists.length-1].allow = true;
            this.dataLlists.push(addPersonBase);
        }else{
           this.dataLlists.push(addPersonBase);
           // this.dataLlists[0].isNew = false;
           // this.dataLlists[0].allow = true;
        }
        
        this.placeholder = '选择';
        
        this.active='saveing'
        let _this = this;
        $.each(_this.showLists,function(n,k){
            _this.showLists[n].allow = true;
        })
    },
    ckMonNum(year,mon){  //检查年月天数
        let res = 0;
        if((year%4==0) && mon==2){
            res =29;
        }else if((year%4!=0) && mon==2){
            res =28;
        }else if((mon==4||mon==6||mon==9||mon==11 )){
            res =30;
        }else{
            res =31;
        }
         return res;
    },
    ckWeek(id){
          let res ='';
          switch(id){
              case 0:
                res = '日';
              break;
              case 1:
                res = '一';
              break;
              case 2:
                res = '二';
              break;
              case 3:
                res = '三';
              break;
              case 4:
                res = '四';
              break;
              case 5:
                res = '五';
              break;
              case 6:
                res = '六';
              break;
            }
            return res;
    },
    getWOptions(){
        let _this = this;
        this.$http.post('/pc_ims/work_type')
        .then(function(res){
            let arr = [];
            if(res.data.code==0){
                let data = res.data.data;
                $.each(data,function(n,k){
                    data[n].value = data[n].id;
                    data[n].label = data[n].title;
                    if(data[n].label!='休'){
                        arr.push({label:data[n].label+'班',timearea:data[n].starttime+'~'+data[n].endtime});
                    }
                })
                _this.tableT = arr;
                _this.wOptions =  data;
            }else{
              _this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        });
    },
        
    getPaiBanPerson(){//获取排班人员
        let _this = this;
        this.$http.post('/pc_ims/get_user')
        .then(function(res){
            console.log(res);
            if(res.data.code==0){
                let data = res.data.data;
                $.each(data,function(n,k){
                    data[n].value = data[n].user_id;
                    data[n].label = data[n].truename;
                    data[n].duty = data[n].title;
                })
                _this.pOption = res.data.data;
            }else{
              _this.$message({
                type:'error',
                message:res.data.msg
              })
           }
        })
    },
    deletePaiBan(id){
        let _this = this;
        this.$http.post('/pc_ims/admin/del_work',{
            user_id:id,
            year:'2018',
            month:'07',
        }).then(function(res){
            if(res.data.code==0){
                _this.$message({
                    type:'success',
                    message:res.data.msg
                })
            }else{
                _this.$message({
                    type:'error',
                    message:res.data.msg+'请查看是否有换班记录。'
                })
            }
        })
    }
},
  computed:{
    year(){
       let year =  Number(this.value7.split('-')[0]);
       return year;
    },
    mon(){
       let mon =  Number(this.value7.split('-')[1]);
       return mon;
    },
    days(){ //对应日期（天数）
        let attrs = [];
        for(let i =0;i<31;i++){
            let str = '';
            if(i<this.ckMonNum(this.year,this.mon)){
                str = i+1;
            }
            attrs.push(str);
        }
        return attrs;
    },
    week(){ //天数对应周
        let attrs = [];
        for(let i =0;i<31;i++){
            let str = '';
            if(this.days[i]==''){

            }else{
              let  date = new Date(this.year, parseInt(this.mon - 1), i+1);
              str = this.ckWeek(date.getDay())
            }
            attrs.push(str);
        }
        return attrs;
    },
    showLists(){ //数据列表
        let res = [];
        let datas = this.dataLlists;
        let lens = datas.length;
        for(let i=0;i<lens;i++){
            let objs= datas[i];
            this.dataLlists.splice(i,1,objs);
            let attrs =Array.apply(null, Array(this.ckMonNum(this.year,this.mon))).map((item,index) => {
                let obj = {
                    time:this.year+'-'+this.mon+'-'+(1+index),
                    type:0,
                    title:'休'
                    };
               return obj;
            });
            let lens2 = datas[i].worklist.length;

            for(let j=0;j<lens2;j++){
                let day = datas[i].worklist[j].time.split('-')[2];
                attrs[Number(day)-1] =datas[i].worklist[j];
            }
            objs.worklist = attrs;
            res.push(objs);
        }
        // console.log(res)
        return res;
    },
    total(){ //每天上班总人数
        let attrs =[];
        let lens = this.ckMonNum(this.year,this.mon);
        for(let i=0;i<31;i++){
            let str = 0,str2='';
            if(i<lens){
                let lens2 = this.showLists.length;
                for(let j=0;j<lens2;j++){
                    if(this.showLists[j].worklist[i].type!=0){
                         str += 1;
                    }
                }
                 attrs.push(str);
            }else{
                 attrs.push(str2);
            }
        }
        return attrs;
    },
    pOptions(){
        let attrs = [];
        let lens = this.pOption.length;
        for(let i=0;i<lens;i++){
            let lens2 = this.dataLlists.length;
            let bool = true;
            for(let j=0;j<lens2;j++){
                if(this.pOption[i].value==this.dataLlists[j].pid){
                    bool = false;
                }
            }
            if(bool){
                attrs.push(this.pOption[i]);
            }
        }
        return attrs;
    }
},
watch:{
    data:{
       handler(newValue, oldValue) {
　　　　　　this.dataLlists = newValue;
　　　　},
　　　　deep: true
    }
},
mounted() {
    this.dataLlists = this.data;
    //console.log(this.data);
    this.getWOptions();
    this.getPaiBanPerson();
    let curr = utils.time((new Date())/1000,9)
    this.addParams= [];
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../../../assets/css/comon.less';

.examineTable{
   width: 95.6%;
   height:5.48rem;
   .tableHead{
       height:1rem;
       width: 100%;
       background: rgba(0,0,0,0.2);
       position:relative;
       display: flex;
       align-items: center;
       justify-content: center;
       .currMonth,.backCurrMonth{
            position:absolute;
            right:0;
            text-align:right;
            padding-right:0.44vw;
            color:#fff;
            line-height:2vw;
            font-weight:500;
            top:0;
            width:3.66vw;
            height:3.66vw;
            background:url('../../../../assets/img/AgentManage/MaskCopy.png')no-repeat;
            background-size:cover;
            img{
                position: absolute;
                top: 0.44vw;
                right: 0.8vw;
                width:1.17vw;
            }

       }
       .backCurrMonth{
            &:hover{
                cursor:pointer;
            }
       }
   }
   .tableBox{
       height:3.56rem;
       width: 100%;
        background:rgba(74,144,226,0.05);
        .tableTit{
            width: 100%;
            height:0.4rem;
            line-height:0.4rem;
            span{
                font-size: 0.16rem;
                padding-left: 0.5rem;
                color: #b5d7ff;
                span{
                    padding-left: 0.08rem;
                }
            }
        }
        .tableBody{
            height:3.15rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            border-top: 0.01rem solid rgba(181,215,255,0.25);
            .item{
                border-Bottom: 0.01rem solid rgba(181,215,255,0.25);
                border-right: 0.01rem solid rgba(181,215,255,0.25);
                float: left;
                text-align: center;
                padding: 0;
                margin: 0;
                font-size: 0.16rem;
            }
            .itemNr{
                border-right:0;
            }
            .tableH{
                height: 0.7rem;
            }
             .tableLeft{
                width: 17.15%;
                height: 100%;
                float: left;
                .nums{
                    width: 16.07%;
                     height: 100%;
                     line-height: 0.22rem;
                    color: #b5d7ff;
                    word-wrap: wrap;
                    padding:0.13rem 0.1rem;
                }
                .names{
                    width:33.93%;
                     height: 100%;
                     line-height: 0.7rem;
                     color: #b5d7ff;
                }
                .works{
                    width: 25%;
                     height: 100%;
                     line-height: 0.7rem;
                     color: #b5d7ff;
                }
                .tableHB{
                    width: 25%;
                     height: 100%;
                     float: left;
                    .tableDT{
                        width: 100%;
                        height: 0.35rem;
                        line-height: 0.35rem;
                        &:nth-child(1){
                            color: #ffa414;
                        }
                        &:nth-child(2){
                            color: #2df0e0;
                        }
                    }

                }
            }
            .tableRight{
                width: 82.85%;
                height: 100%;
                float: left;
                ul{
                    height: 0.35rem;
                    li{
                        height:0.35rem;
                        width:3.22%;
                        text-align: center;
                        line-height: 0.35rem;
                        float: left;
                        font-size: 0.16rem;
                        &.noRight{
                            width: 0.34rem;
                            border-right: 0!important;
                        }
                        &.days{
                            color:#ffa414;
                        }
                        &.weeks{
                            color:#2df0e0;
                        }
                    }
                    &.tableShadow{
                        background: rgba(0,0,0,0.05);
                    }
                }
            }
            .tableB{
                flex:1;
                width:100%;
                overflow: hidden;
                li{
                    height:0.35rem;
                    width: 100%;
                    display: flex;
                    overflow: hidden;
                    .spanBox{
                        float: left;
                        height: 0.35rem;
                        flex:1;
                        border-bottom: 0.01rem solid rgba(181, 215, 255, 0.25);
                        .item{
                            border: 0.01rem transparent solid;
                        }
                        span{
                            float: left;
                            width: 3.02%;
                            height: 0.33rem;
                            font-size: 0.16rem;
                            color: #439aff;
                            line-height: 0.33rem;
                            margin: 0.01rem;
                            text-align: center;
                            position: relative;
                            cursor: pointer;
                            &.spanA{
                                color:#f56c6c;
                            }
                            &.spanB{
                                color:#efd611;
                            }
                            &.noRight{
                                width: 0.31rem!important;
                                border-right: 0!important;
                            }
                            &.ischangeIng{
                                background: rgba(255,255,255,0.2);
                            }
                        }

                    }
                    .tableBNum,.tableBName,.tableBDuty{
                        float: left;
                        height: 0.35rem;
                        line-height: 0.35rem;
                        color: #b5d7ff;
                        background: none;
                    }
                    .tableBNum{
                        width: 2.75%;
                        position: relative;
                        cursor: pointer;
                        span{
                            opacity: 1;
                            position: relative;
                            z-index: 88;
                        }
                        i{
                            opacity: 0;
                            z-index: 89;
                            font-size: 0.16rem;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-0.08rem,-0.08rem);

                            color: #f56c6c;
                        }
                        &:hover{
                            background: rgba(255,255,255,.3);
                            span{
                                opacity: 0;
                            }
                            i{
                                opacity: 1;
                            }
                        }

                    }
                    .tableBName{
                        width:5.82%;
                        input{
                            width: 80%;
                            height: 0.24rem;
                            background: none;
                            border:0;
                            color:#b5d7ff;
                            margin: 0 10%;
                            border-bottom: 0.01rem solid #b5d7ff;
                        }
                    }
                    .tableBDuty{
                        width: 8.57%;
                        input{
                            width: 80%;
                            height: 0.24rem;
                            background: none;
                            border:0;
                            color:#b5d7ff;
                            margin: 0 10%;
                            border-bottom: 0.01rem solid #b5d7ff;
                        }
                    }
                    .addBtns{
                        width: 100%;
                        text-align: center;
                        line-height: 0.35rem;
                        font-size: 0.16rem;
                        background: rgba(58,132,238,0.2);
                        border: solid 0.01rem #1989fa;
                        cursor: pointer;
                        i{
                            color:#3a84ee;
                        }
                        span{
                            color:#fff;
                        }
                    }

                }
            }
            .tableBot0{
                height: 0.35rem;
                border-top: 0.01rem solid rgba(181,215,255,0.25);
                .tableBot0Left{
                    height: 0.35rem;
                    line-height: 0.35rem;
                    color: #008aff;
                }
                ul{
                    li{
                        width: 3.22%;
                        height: 0.35rem;
                        line-height: 0.35rem;
                        color: #008aff;
                        font-size: 0.16rem;
                        &.noRight{
                            width: 0.31rem!important;
                            border-right: 0!important;
                        }
                    }
                }
            }
        }
   }
   .tableBot{
       height:1rem;
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
       div{
         margin-right:0.1rem;
       }
       .btnBai2{
            background-color: #3a84ee;
            color: #fff;
            border-color: #1989fa;
            &:hover{
                cursor:default;
            }
       }
   }
}

 //hover效果
.hover{
    border: 0.01rem rgba(54 ,200 ,255 ,100) solid!important;
}
.righthover{
    border-image: linear-gradient(to right,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.lefthover{
    border-image: linear-gradient(to left,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.tophover{
    border-image: linear-gradient(to top,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.bottomhover{
    border-image: linear-gradient(to bottom,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.righttophover{
    border-image: radial-gradient(0.35rem circle at left bottom,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.lefttophover{
    border-image: radial-gradient(0.35rem circle at right bottom,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.leftbottomhover{
    border-image: radial-gradient(0.35rem circle at right top,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}
.rightbottomhover{
    border-image: radial-gradient(0.35rem circle at left top,rgba(54 ,200 ,255 ,100), rgba(54 ,200 ,255 ,0)) 1 10!important;
}



</style>
