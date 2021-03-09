/**
 * http配置
 */
import Vue from 'vue'
// 引入axios
import axios from 'axios'
import Router from '@/router/index'
import router from "../router";
// 超时时间
axios.defaults.timeout = 20000;
// http请求拦截器
axios.interceptors.request.use(config => {
  const { method,data,params } = config;
  let requestBody = method === "get" ? params : data;
  if(requestBody && !requestBody['isNotshowLoad']){
    Vue.loading();
  }


  // console.log('load')
  return config
}, error => {
  Vue.clearLoading();
  Vue.toast({
    message: '加载超时'
  })
  return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  Vue.clearLoading();
  return data
}, error => {
  console.log(error)
  Vue.clearLoading();
  if (error.response.status) {
    if (error.response.status == '401') {
      localStorage.removeItem('_userToken');
      router.push({
        path: '/weibo/userauth', query: {
          returnUrl: window.location.href.replace(window.location.origin, '')
        }
      });
    }else {
      Vue.toast({
        message: error.response.data.message || error.response.data.msg || '请求失败，请联系管理员'
      })
    }
  }
  return Promise.reject(error)
});
axios.jsonp = (url) => {
  if(!url){
    console.error('请传入一个url参数')
    return;
  }
  return new Promise((resolve,reject) => {
    window.jsonCallBack =(result) => {
      resolve(result)
    }
    let JSONP=document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=`${url}&callback=jsonCallBack`;
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    },500)
  })
}
function getHeader() {
  let userToken = localStorage.getItem('_userToken');
  if (userToken) {
    axios.defaults.headers.Authorization = userToken;
  }
  sessionStorage.getItem('_openId') ? axios.defaults.headers['openid'] = sessionStorage.getItem('_openId') : null ;
}

export const POST = (url, params,token) => {
  getHeader();
  if(token){
    delete axios.defaults.headers.Authorization
  }
  let realparams;
  if (Object.prototype.toString.call(params) == "[object Object]") {
    realparams = {};
    if (params) {
      Object.keys(params).forEach(item => {
        if (params[item] != null && params[item].toString() != '') {
          realparams[item] = params[item];
        }
      })
    }
  } else {
    realparams = params;
  }
  return axios.post(`${url}`, realparams).then(res => res.data)
}
export const GET = (url, params,token) => {
  getHeader();
  if(token){
    delete axios.defaults.headers.Authorization
  }
  return axios.get(`${url}`, {params: params}).then(res => res.data)
}
export const GETBYJSON = (url, params) => {
  getHeader();
  params = JSON.stringify(params)
  return axios.get(`${url}/parameter/${params}`).then(res => res.data)
}
export const PUT = (url, params) => {
  getHeader();
  return axios.put(`${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  getHeader();
  return axios.delete(`${url}`, {data: params}).then(res => res.data)
}
export const JSONP = (url, params) => {
  delete axios.defaults.headers.Authorization
  return axios.jsonp(`${url}`, {data: params}).then(res => res)
}
