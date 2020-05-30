import axios from 'axios'

/* export function request(config, success, failure) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 发送真正的网络请求
  instance(config)
     .then(res => {
      //  console.log(res)
       success(res)
     })
     .catch(err => {
      //  console.log(err)
       failure(err)
     })
} */

/* export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 发送真正的网络请求
  instance(config.baseConfig)
    .then(res => {
      config.success(res)
    })
    .catch(err => {
      config.failure(err)
    })
} */


/* export function request(config) {
  return new Promise((reslove, reject) => {
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })
  
    // 发送真正的网络请求
    instance(config)
      .then(res => {
        reslove(res)
      })
      .catch(err => {
        reject(err)
      })
  })
} */


export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  
  // 2.axios的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config;  //这里必须返回
  }, err => {
    // console.log(err)
  })


  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })
  
  // 3.发送真正的网络请求
  return instance(config)
}


export function request1(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })
  
  // 2.axios的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config;  //这里必须返回
  }, err => {
    // console.log(err)
  })


  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })
  
  // 3.发送真正的网络请求
  return instance(config)
}


