exports.install = function (Vue, options) {
  Vue.prototype.setStorage = function (key,value){
    window.localStorage.setItem(key,value);
  };

};
