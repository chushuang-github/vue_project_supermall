import {request} from './request'
//对首页所有的请求全部放入这个文件中，进行统一管理
export function getHomeMultidata(){
  return request({
    url: 'http://123.207.32.32:8000/home/multidata'
  })
} 

export function getHomeGoods(type, page){
  return request({
    url: 'http://152.136.185.210:8000/api/w6/home/data',
    params: {
      type,
      page
    }
  })
}