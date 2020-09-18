// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 32,//结果为：设计稿元素尺寸/32，比如元素宽320px,最终页面会换算成 10rem
      propList: ['*']
    },
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}

  }
}
