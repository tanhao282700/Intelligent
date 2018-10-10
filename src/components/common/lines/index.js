import MyLines from './line.vue'
// 这里是重点
const Lines = {
    install: function(Vue){
        Vue.component('Lines',MyLines)
    }
}
 
// 导出组件
export default Lines