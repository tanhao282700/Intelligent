import MyCrumbs from './crumbs.vue'
// 这里是重点
const Crumbs = {
    install: function(Vue){
        Vue.component('Crumbs',MyCrumbs)
    }
}
 
// 导出组件
export default Crumbs