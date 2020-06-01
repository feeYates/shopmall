import {request1} from './request'

export function getDetail(iid) {
  return request1({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 商品信息对象
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 商店信息对象
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品参数对象
export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值(某些商品有值，某些没有值)
    this.image = info.images ? info.images[0] : '',
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

// 商品推荐
export function getRecommend() {
  return request1({
    url: '/recommend'
  })
}