/**
 * @file 唤起保险客服
 */

import ClipboardJS from 'clipboard';

export default {
  methods: {
    callService() {
      const clipboard = new ClipboardJS('#service');
      let url = 'sinaweibo://messagelist?uid=7357622820'

      // if (this.$route.path === '/xinmei') {
      //     url = 'sinaweibo://messagelist?uid=7119440939'
      // }

      clipboard.on('success', e => {
        this.$toast({
          message: '该产品信息已经复制好，请粘贴开始咨询哦！',
          time: 2500,
          callback: () => {
            window.location.href = url;
          }
        });
      });

      clipboard.on('error', e => {
        this.$toast({
          message: '请输入您的问题，开始咨询哦！',
          callback: () => {
            window.location.href = url;
          }
        })
      })
    }
  }
}
