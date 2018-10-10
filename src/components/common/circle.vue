<template>
  <div class="imgBox0">
    <div class = "imgBox">    
        <img :src="imgBase2" class="bg0"/>  
        <img :src="imgBase" class="bg02"/>    
        <img :src="imgUrl0[0]" class="bg1"/>
        <div class="bg2" :style="{transform:'rotate('+(252*nums-126)+'deg'+')'}">
            <img :src="imgUrl0[1]" style='width:100%;height:100%'/>
        </div>
    </div>
    <div class="imgTit">
        <p class="imgTitP1" v-text='circleData.util'></p>
        <p class="imgTitP2" v-text='circleData.now'></p>
        <p class="imgTitP3" v-text='circleData.tit'></p>
    </div>
    <div v-text="(nums*100).toFixed(0)+'%'" class = "numsText"  
        :style="{
            // left:'1.33rem',
            // top:'1.37rem'
            left:(1.33+Math.sin((252*nums-126)*Math.PI/180)*1.25)+'rem',
            top:top
            }">
    </div>
  </div>
</template>

<script>
        // <img :src="imgBase" class="bg1"/>
export default {
  props:['circleData'],
  computed:{
      nums(){
          let res = '';
          if(this.circleData.total!=0){
              res =(Number(this.circleData.now)/Number(this.circleData.total)).toFixed(2);
          }else{
              res = 0;
          }        
          return res;
      },
      top(){
          let top0 = 1.37;
         
          if(this.nums>0.4&&this.nums<0.6){
            top0 = 1.48; 
          }
          let res = (top0-Math.cos((252*this.nums-126)*Math.PI/180)*1.25)+'rem'
         return res;
      }
  },
  data () {
    return {
        imgBase: require('../../assets/img/circle/Oval.png'),
        imgBase2: require('../../assets/img/circle/circle.png'),
        imgUrl0:[],
        imgUrl1:[
            require('../../assets/img/circle/redBg.png'),
            require('../../assets/img/circle/redP.png'),
        ],
        imgUrl2:[
           require('../../assets/img/circle/blueBg.png'),
            require('../../assets/img/circle/blueP.png'),
        ],
        imgUrl3:[
            require('../../assets/img/circle/greenBg.png'),
            require('../../assets/img/circle/greenP.png'),
        ],
        imgUrl4:[
            require('../../assets/img/circle/yellowBg.png'),
            require('../../assets/img/circle/yellowP.png'),
        ],      
    }
  },
  methods:{
     
  },
  created() {
      switch(this.circleData.type){
          case 'red':
            this.imgUrl0 = this.imgUrl1;
          break;
          case 'blue':
            this.imgUrl0 = this.imgUrl2;
          break;
          case 'green':
            this.imgUrl0 = this.imgUrl3;
          break;
          case 'yellow':
            this.imgUrl0 = this.imgUrl4;
          break;
          default:
            this.imgUrl0 = this.imgUrl1;
          break;
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped="" type="text/less">
@import '../../assets/css/comon.less';

    .imgBox0{
        width:100%;
        height: 100%;
        position:relative;
        .numsText{
            position:absolute;
            color:#333;
            font-size:0.24rem;
            color:#fff;
        }
        .imgBox{
            width:100%;
            height:100%;
            .bg02{
                width:0.22rem;
                position:absolute;
                left:50%;
                top:6000/728vh ;
                //  .vhTop(149);
                transform:translate(-0.11rem,0.89rem);
                z-index:12;
            }
            .bg0{
                width:2rem;
                position:absolute;
                left:50%;
                .vhTop(60);
                transform:translate(-1rem,0);
                z-index:11;
            }
            .bg1{
                width:1.8rem;
                position:absolute;
                left:50%;
                .vhTop(68);
                transform:translate(-0.9rem,0);
                z-index:11;
            }
            .bg2{
                width:0.15rem;
                height: 1.05rem;
                // .vh(105);
                position:absolute;
                left:47.5%;
               .vhTop(63.5);
                // transform:translate(-0.075rem,0);
                z-index:11;
                transform-origin: 50% 93%;
            }
        }
        .imgTit{
            position:absolute;
            .vhTop(192);
            left:0;
            width:100%;
            z-index:14;
            p{
                width:100%;
                text-align:center;
                &.imgTitP1{
                    font-size: 0.12rem;
                    line-height: 0.12rem;
                    letter-spacing: 0.03rem;
                    color: #ffffff;
                    padding-left: 0.025rem;
                }
                &.imgTitP2{
                    display:inline-block;
                    height: 0.35rem;
                    font-size: 0.30rem;
                    line-height: 0.35rem;
                    color: #ffffff;
                }
                &.imgTitP3{
                    font-size: 0.12rem;
                    line-height: 0.12rem;
                    color: #008aff;
                }
                
            }
        }
    }
</style>
