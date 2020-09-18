```
一、 全局引入插件 (main.js 已引入)
       import Toast from './components/common/toast';
       Vue.use(Toast);

二、参数配置调用
    1.只弹文字
        this.$toast('提示文字');
    2.别的配置项
    this.$toast({
        show: false,                    //是否显示此toast(默认隐藏)
        msg: '提醒文字',                //提醒文字
        position: 'center',            //提醒容器位置(默认居中)
        isShowMask: false,             //是否显示遮罩层(默认隐藏)
        time: 2500,                    //显示时间(默认2500)
        transition: true,              //是否开启动画(默认开启)
        iconClass: '',                 //背景icon(success 、warning、error)
        callback: function(){}         //回调函数
    });
 
```
