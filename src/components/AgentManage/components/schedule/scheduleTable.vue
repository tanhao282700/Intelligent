<template>
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
        </div>
        <div class="tableBox">
            <div class="tableTit">
                <span>A班：<span v-text="tableT.a"></span></span>
                <span>B班：<span v-text="tableT.b"></span></span>
                <span>标准工时：<span v-text="tableT.time"></span></span>
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
                                    <i class="el-icon-circle-close"></i>
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

                                <div class="tableBDuty item" v-text="v.duty"></div>
                                <div class="spanBox">
                                    <span class="item "
                                        @click="changeIschange(i,i0)"
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
                                        v-for="(v0,i0) in v.workTime"
                                        v-text="v0.title"
                                       >
                                    </span>
                                </div>

                                </li>
                                <li>
                                    <div class="addBtns" @click="addPerson()">
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
        <div class="tableBot">
            <div class="btnBai1" v-show="active=='exams'" @click="botClick('exams')">
                审核通过
            </div>
            <div class="btnBai1" v-show="active=='toChange'" @click="botClick('change')">
                修改
            </div>
            <div class="btnBai1" v-show="active=='saveing'" @click="botClick('save')">
                保存
            </div>
        </div>
        <Tk
            :lists="wOptions"
            @change="tkChoose"
            :pos = "pos"
            ref = "tk"
        />
    </div>
</template>

<script>
import TimePickerT from '../../../../components/form/timePickerTit';
import SelectBox from './selectBox';
import Tk from './tk';
export default {
  props:['data'],
  components:{
      'TimePickerT':TimePickerT,
      'SelectBox':SelectBox,
      'Tk':Tk
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
                let lens2 = datas[i].workTime.length;

                for(let j=0;j<lens2;j++){
                    let day = datas[i].workTime[j].time.split('-')[2];
                    attrs[Number(day)-1] =datas[i].workTime[j];
                }
                objs.workTime = attrs;
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
                        if(this.showLists[j].workTime[i].type!=0){
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
  data () {
    return {
        loading:false,
        placeholder:'选择',
        value7:'2018-8',
        cant:false,
        active:'exams',
        ischange:[-1,-1],
        tableT:{
            a:'09:00~17:30',
            b:'09:00～次日09:30',
            time:'176h/月'
        },
        wOptions:[
            {value:0,label:'休'},
            {value:1,label:'A'},
            {value:2,label:'B'},
        ],
        pOption:[
            {value:1,label:'王尼玛',duty:'维修工'},
            {value:2,label:'白狗汪',duty:'维修工'},
            {value:3,label:'凤羽',duty:'维修工'},
            {value:4,label:'周天天',duty:'维修工'},
            {value:5,label:'李白清',duty:'维修工'},
            {value:6,label:'杜甫',duty:'维修工'},
            {value:7,label:'汪仔',duty:'维修工'},
            {value:8,label:'狗蛋儿',duty:'维修工'},
            {value:9,label:'娃哈哈',duty:'维修工'},
            {value:10,label:'谷歌',duty:'维修工'},
            {value:11,label:'天天',duty:'服务员'},
            {value:12,label:'周周',duty:'维修工'},
            {value:13,label:'剧透',duty:'保洁'},
            {value:14,label:'登录',duty:'城管'},
        ],
        dataLlists:[
            {id:1,pid:1,name:'王尼玛',duty:'项目总管',workTime:[
                {time:'2018-8-5',title:'A',type:1},
                {time:'2018-8-23',title:'B',type:2},
            ]},
            {id:2,pid:2,name:'白狗汪',duty:'前端',workTime:[
                {time:'2018-8-6',title:'A',type:1},
                {time:'2018-8-22',title:'B',type:2},
            ]},
            {id:3,pid:3,name:'凤羽',duty:'维修工',workTime:[
                {time:'2018-8-7',title:'A',type:1},
                {time:'2018-8-21',title:'B',type:2},
            ]},
             {id:4,pid:4,name:'周天天',duty:'维修工',workTime:[
                {time:'2018-8-8',title:'A',type:1},
                {time:'2018-8-20',title:'B',type:2},
            ]},
            {id:5,pid:5,name:'李白清',duty:'维修工',workTime:[
                {time:'2018-8-9',title:'A',type:1},
                {time:'2018-8-19',title:'B',type:2},
            ]},
            {id:6,pid:6,name:'杜甫',duty:'维修工',workTime:[
                {time:'2018-8-10',title:'A',type:1},
                {time:'2018-8-18',title:'B',type:2},
            ]},
            {id:7,pid:7,name:'汪仔',duty:'维修工',workTime:[
                 {time:'2018-8-5',title:'B',type:2},
                {time:'2018-8-11',title:'A',type:1},
                {time:'2018-8-17',title:'B',type:2},
            ]},
            {id:8,pid:8,name:'狗蛋儿',duty:'维修工',workTime:[
                {time:'2018-8-12',title:'A',type:1},
                {time:'2018-8-16',title:'B',type:2},
            ]},
            {id:9,pid:9,name:'娃哈哈',duty:'维修工',workTime:[
                {time:'2018-8-13',title:'A',type:1},
                {time:'2018-8-15',title:'B',type:2},
            ]},
        ],
        pos:{
            top:0,
            left:0
        },
        over:[-5,-5]
    }
  },
  methods:{
      leaveOver(){
          this.over = [];
          this.over.push(-5);
          this.over.push(-5);
      },
      changeOver(i,i0){
          this.over = [];
          this.over.push(i);
          this.over.push(i0);
      },
        deletess(i){    //这儿需要弹框
            this.dataLlists.splice(i,1);
        },
        tkChoose(val){ //弹框选择
        let objs = this.dataLlists[this.ischange[0]];
            objs.workTime[this.ischange[1]].title = this.ckTypes(val);
            objs.workTime[this.ischange[1]].type = val;
            this.ischange = [-1,-1];
        },
        ckTypes(id){
            let res ='';
            switch(id){
                case 0:
                    res = '休';
                break;
                case 1:
                    res = 'A';
                break;
                case 2:
                    res = 'B';
                break;
            }
            return res;
        },
        changeIschange(i,i0,event){
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
        change(val,i){  //修改人名
            this.dataLlists[i].pid = val;
            this.dataLlists[i].name = this.getItem(val).label;
            this.dataLlists[i].duty = this.getItem(val).duty;
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
        changes(val){
            this.value7 = val;
        },
        deletes(){
            let attrs = this.value7.split('-');
            if(attrs[1]==1){
                attrs[1] = 12;
                attrs[0] = Number(attrs[0])-1;
            }else{
                attrs[1] = Number(attrs[1])-1;
            }
            this.value7 = attrs.join('-');
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
        },
      botClick(type){ //底部按钮操作
        //   console.log(type)
      },
      addPerson(){ //新增人员
        if(this.pOptions.length==0){
            return this.$message('没有新员工了！');
        }
        if(this.dataLlists[this.dataLlists.length-1].pid==0){ //阻止连续新增操作
            return this.$message('请选择员工！');
        }
        let addPersonBase={
            id:this.dataLlists.length,
            pid:0,
            isNew:true,
            name:'',
            duty:'',
            workTime:[]
        };
        this.dataLlists[this.dataLlists.length-1].isNew = false;
        this.placeholder = '选择';
        this.dataLlists.push(addPersonBase);
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
        }
  },
  created() {
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../../../assets/css/comon.less';

.examineTable{
   width: 13.06rem;
   .vh(578);
   .tableHead{
       .vh(100);
       width: 100%;
       background: rgba(0,0,0,0.2);
       position:relative;
       display: flex;
       align-items: center;
       justify-content: center;
   }
   .tableBox{
       .vh(355);
       width: 100%;
        background:rgba(74,144,226,0.05);
        .tableTit{
            width: 100%;
            .vh(40);
            .vhLH(40);
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
            .vh(315);
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
                width: 2.22rem;
                height: 100%;
                float: left;
                .nums{
                    width: 0.35rem;
                     height: 100%;
                     line-height: 0.22rem;
                    color: #b5d7ff;
                    word-wrap: wrap;
                    padding:0.13rem 0.1rem;
                }
                .names{
                    width: 0.75rem;
                     height: 100%;
                     line-height: 0.7rem;
                     color: #b5d7ff;
                }
                .works{
                    width: 0.56rem;
                     height: 100%;
                     line-height: 0.7rem;
                     color: #b5d7ff;
                }
                .tableHB{
                    width: 0.56rem;
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
                width: 10.84rem;
                height: 100%;
                float: left;
                ul{
                    height: 0.35rem;
                    li{
                        height: 0.35rem;
                        width: 0.35rem;
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
                overflow: hidden;
                li{
                    height: 0.35rem;
                    width: 100%;
                    display: flex;
                    overflow: hidden;
                    .spanBox{
                        float: left;
                        height: 0.35rem;
                        flex:1;
                        .item{
                            border: 0.01rem transparent solid;
                        }
                        span{
                            float: left;
                            width: 0.33rem;
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
                        width: 0.35rem;
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
                        width:0.75rem;
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
                        width: 1.12rem;
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
                        width: 0.35rem;
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
       .vh(123);
       width: 100%;
       display: flex;
       align-items: center;
       justify-content: center;
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
