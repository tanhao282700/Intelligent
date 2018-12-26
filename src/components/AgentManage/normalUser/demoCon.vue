<template>
  <div class="content">
    <div class="nav" ref="navWrapper">
      <div class="nav_wrapper">
        <div class="nav_part" @click="changeType(index)" :class="{'active':currentIndex===index}"
             v-for="(item,index) in dataList">
             <div class="nav_part_padd">
                <span></span>
                <span v-text="item.type"></span>
             </div>
        </div>
      </div>
    </div>
    <div class="nav_con" ref="conWrapper">
      <div class="wrapper_box">
        <div class="nav_con_part" :ref="item.id" v-for="(item,index) in dataList">
          <div class="nav_con_part_title">
            <span v-text="item.type"></span>
            <span></span>
          </div>
          <div class="nav_con_part_equipments" v-for="(part,index) in item.equipment">
            <div class="equipment_description">
              <img src="../../../assets/img/logo.png" class="prodimg">
              <div class="equipment_description_txt">
                <span v-text="part.name"></span>
                <span v-text="part.description" class="equipment_txt"></span>
              </div>
            </div>
            <div class="equipment_amount">
              <template>
                <el-input-number v-model="num1" size="mini" :min="0" :max="999" label="描述文字"></el-input-number>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="total"></div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "demo-con",
    components: {BScroll},
    props: {
      dataList: {
        type: Array,
        require: true
      },
    },
    data() {
      return {
        num1: 0,
        currentIndex: 0,
        scrollY: 0,
        conHeight: [],
      }
    },
    watch: {
      scrollY() {
        this.conHeight.map((item, index) => {
          if (this.scrollY >= item && this.scrollY <= this.conHeight[index + 1]) {
            this.currentIndex = index
          }
        })
      }
    },
    methods: {
      _initConScroll() {
        this.conscroller = new BScroll(this.$refs.conWrapper, {
          probeType: 3,
          click: false,
          mouseWheel: true
        })

        this.conscroller.on('scroll', (pos) => {
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y))
          }
        })
      },
      _initNavScroll() {
        this.navscroller = new BScroll(this.$refs.navWrapper, {
          click: true,
          probeType: 3,
          mouseWheel: true
        })
      },
      _initConHeight() {
        this.conHeight.push(0)
        this.dataList.map((item, index) => {
          this.conHeight.push(this.conHeight[index] + this.$refs[item.id][0].clientHeight)
        })
      },
      changeType(index) {
        let id = this.dataList[index].id
        this.conscroller.scrollToElement(this.$refs[id][0], '6.7rem')
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initConScroll()
        this._initNavScroll()
        this._initConHeight()
      })
    }
  }
</script>

<style scoped>
  .content {
    width: 6.9rem;
    height: 4.8rem;
  }
  .nav {
    width: 1.5rem;
    overflow: hidden;
    float: left;
    background-color: #052657;
  }
  .nav_part {
    height: 0.38rem;
    line-height: 0.38rem;
    text-align: center;
    position: relative;
    color: #fff;
  }
  .nav_part_padd{
    margin: 0 0 0 0.1rem;
    border-bottom: 1px solid #094d9d;
  }
  .active {
    background-color: #031e47;
  }
  .active .nav_part_padd{
    border-bottom: none;
  }
  .active span:first-child {
    width: 3px;
    display: inline-block;
    height: 100%;
    background: #71a6f1;
    position: absolute;
    left: 0;
    top: 0;
  }
  .total{
    position: absolute;
    bottom:0;
    left: 0;
    height: 0.52rem;
    width: 100%;
    background-color: #01183a;
    box-shadow: 0px 3px 5px 0px 
    rgba(1, 1, 1, 0.2);
    border-radius: 4px;
  }
  .nav_con {
    width: 5.4rem;
    height: 4.8rem;
    float:left;
    overflow: hidden;
  }
  .nav_con_part{
    padding:0 0.25rem;
    height: 4.8rem;
  }
  .nav_con_part_title {
    padding: 10px 0;
    display: flex;
    font-size: 0.12rem;
    color: #71a5f0;
    align-items: center;
    justify-content: space-between;
  }

  .nav_con_part_title span:first-child {
    padding-right: 10px;
  }

  .nav_con_part_title span:last-child {
    flex: 1;
    height: 1px;
    background: #094d9d;
  }

  .nav_con_part_equipments {
    height: 80px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .equipment_description {
    flex: 1;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .prodimg{
    width:0.46rem;height:0.46rem;border-radius:0.04rem;margin-right:0.08rem
  }
  .equipment_description img {
    width: 60px;
    height: 60px;
  }
  .equipment_txt{
    color: #9f9f9f;
    font-size: 0.1rem;
  }
  .equipment_description_txt {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .equipment_amount {
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
