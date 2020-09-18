import toastVue from './toast.vue'

export default {
  install(Vue, options = {}) {
    var showToast = false // 存储toast显示状态
    let toastTpl = Vue.extend(toastVue) // 创建vue构造器
    let removeDom = event => {
      event.target.remove();
    };
    toastTpl.prototype.close = function () {
      this.show = false;
      this.$el.addEventListener('transitionend', removeDom);
    }

    if(toastTpl){
      let toast = ((options) => {
        let $vm = new toastTpl(); // 实例化vue实例
        document.body.appendChild($vm.$mount().$el);

        if (typeof options === 'string') { // 对参数进行判断
          $vm.message = options // 传入props
        }
         else if (typeof options === 'object') {
          Object.assign($vm, options) // 合并参数与实例
        }
        if(showToast) return  //防止多次点击
         showToast = $vm.show = true; // 显示toast
         Vue.nextTick(() => { //隐藏toast
            setTimeout(()=> {
              showToast = false
              $vm.close()
              setTimeout(()=>{
                ($vm.callback && typeof $vm.callback === 'function') && $vm.callback();
              },200);
            }, $vm.time);
         })
      });
      Vue.toast = Vue.prototype.$toast = toast;
    }
  }
}
