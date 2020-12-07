import {request} from './request'
export function getDetail(iid){
  return request({
    url: 'http://152.136.185.210:8000/api/w6/detail',
    params: {
      iid
    }
  })
}

//商品信息
//将服务器返回的数据，先封装到一个类里面去
export class Goods {
	constructor(itemInfo, columns, services) {
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.discountBgColor = itemInfo.discountBgColor
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
	}
}

//店铺信息
export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.cSells;
		this.score = shopInfo.score;
		this.goodsCount = shopInfo.cGoods
	}
}

//商品参数
export class GoodsParam {
	constructor(info, rule) {
		// 注: images可能没有值(某些商品有值, 某些没有值)
		this.image = info.images ? info.images[0] : '';
		this.infos = info.set;
		this.sizes = rule.tables;
	}
}

//请求商品推荐数据
export function getRecommend(){
	return request({
		url: 'http://152.136.185.210:8000/api/w6/recommend'
	})
}