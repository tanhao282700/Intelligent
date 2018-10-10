exports.install = function (Vue, options) {
  Vue.prototype.setStorage = function (key,value){//全局函数1
    window.localStorage.setItem(key,value);
  };

};
