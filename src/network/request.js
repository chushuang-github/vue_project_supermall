import axios from 'axios'
//  http://152.136.185.210:8000/api/w6 
export function request(config){
  const instance = axios.create({
    // timeout: 5000
  })
  //请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  //响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  //发送真正的网络请求
  return instance(config)
}