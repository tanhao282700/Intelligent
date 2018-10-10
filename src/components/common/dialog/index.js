import myDialog from './dialog.vue'
// 这里是重点
const Dialog = {
    install: function(Vue){
        Vue.component('Dialog',myDialog)
    }
}
 
// 导出组件
export default Dialog