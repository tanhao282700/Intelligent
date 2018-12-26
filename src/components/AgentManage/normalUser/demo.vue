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
            id: '1-1'
          }, {
            name: '电脑2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-2'
          }, {
            name: '电脑3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-3'
          }, {
            name: '电脑4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-4'
          }, {
            name: '电脑5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '1-5'
          }]
        }, {
          type: '空调类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '2',
          equipment: [{
            name: '办公桌1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-1'
          }, {
            name: '办公桌2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-2'
          }, {
            name: '办公桌3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-3'
          }, {
            name: '办公桌4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-4'
          }, {
            name: '办公桌5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '2-5'
          }]
        }, {
          type: '机修类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '3',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '3-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '4',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '4-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '5',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '5-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '6',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '6-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '7',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '7-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '8',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '8-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '8-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '8-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '8-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '8-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '9',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '9-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '9-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '9-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '9-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '9-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '10',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '10-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '10-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '10-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '10-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '10-5'
          }]
        }, {
          type: 'XX类',
          description: '吊袜带挖到挖到奥万大奥万大',
          id: '11',
          equipment: [{
            name: '打印机1',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '11-1'
          }, {
            name: '打印机2',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '11-2'
          }, {
            name: '打印机3',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '11-3'
          }, {
            name: '打印机4',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '11-4'
          }, {
            name: '打印机5',
            description: '吊袜带挖到挖到奥万大奥万大',
            id: '11-5'
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
