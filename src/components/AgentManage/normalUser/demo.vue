<template>
  <div class="demo">
    <div class="con">
      <components is="demoCon" :dataList="list"></components>
    </div>
  </div>
</template>

<script>
  import demoCon from './demoCon'

  export default {
    name: "demo",
    components: {demoCon},
    data() {
      return {
        list: [{
          type: '配件类',
          id: '1',
          equipment: [{
            name: '电脑1',
            description: '吊袜带挖到挖到奥万大奥万大',
            img: 'cc',
            id: '1-1',
            value:0
          }, {
            name: '电脑2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-2',
            value:0
          }, {
            name: '电脑3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-3',
            value:0
          }, {
            name: '电脑4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-4',
            value:0
          }, {
            name: '电脑5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-5',
            value:0
          }]
        }, {
          type: '空调类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '2',
          equipment: [{
            name: '办公桌1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-1',
            value:0
          }, {
            name: '办公桌2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-2',
            value:0
          }, {
            name: '办公桌3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-3',
            value:0
          }, {
            name: '办公桌4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-4',
            value:0
          }, {
            name: '办公桌5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-5',
            value:0
          }]
        }, {
          type: '机修类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '3',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-1',
            value:0
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-2',
            value:0
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-3',
            value:0
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-4',
            value:0
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-5',
            value:0
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '4',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-1',
            value:0
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-2',
            value:0
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-3',
            value:0
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-4',
            value:0
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-5',
            value:0
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '5',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-1',
            value:0
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-2',
            value:0
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-3',
            value:0
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-4',
            value:0
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-5',
            value:0
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '6',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-1',
            value:0
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-2',
            value:0
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-3',
            value:0
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-4',
            value:0
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-5',
            value:0
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '7',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-1',
            value:0
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-2',
            value:0
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-3',
            value:0
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-4',
            value:0
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-5',
            value:0
          }]
        }]
      }
    }
  }
</script>

<style scoped>
  .demo {
    width: 500px;
    height: 550px;
  }

  .con {
    width: 100%;
    height: 100%;
  }
</style>
