import sinaAlert from './sinaAlert.vue'

export default {
  install(Vue, options = {}) {
    const alertContrl = Vue.extend(sinaAlert);
    const SinaAlert = function (options) {
      let $vm = new alertContrl(); // 实例化vue实例
      document.querySelector(options.parent || 'body').appendChild($vm.$mount().$el);
      options = options || {};
      if (typeof options === 'string') {
        $vm.title = options;
      } else if (typeof options === 'object') {
        Object.assign($vm, options) // 合并参数与实例
      }
      $vm.show = true;
    };
    Vue.sinaAlert = Vue.prototype.$sinaAlert = SinaAlert;
    Vue.clearsinaAlert = Vue.prototype.$clearsinaAlert = function () {
      let element = document.getElementsByClassName('sinaalertbox')
      if (element.length > 0) {
        document.querySelector('body').removeChild(element[0]);
      }
    }

    let SinaConfirm = function (options) {
      return new Promise((res, rej) => {
        let confirmDom = new alertContrl({
          el: document.createElement('div')
        });
        document.body.appendChild(confirmDom.$el);
        Object.assign(confirmDom, options);
        confirmDom.sumbitAction = function () {
          res();
          confirmDom.isShow = false;
          Vue.clearsinaAlert();
        };
        confirmDom.cancalAction = function () {
          rej();
          confirmDom.isShow = false;
          Vue.clearsinaAlert();
        };
      })
    };
    Vue.sinaConfirm = Vue.prototype.$sinaConfirm = SinaConfirm;
  }
}
