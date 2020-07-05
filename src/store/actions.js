import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation_type'

export default {
  addCart(context, payload) {
    /*  let oldProduct = null;
      for(let item of state.cartList) {
        if(item.iid === payload.iid) {
          oldProduct = item;
        }
      }

    // 判断oldProduct
    if(index === -1) {
      let oldProduct = state.cartList[index]
      oldProduct.count += 1;
    }else {
      payload.count = 1;
      status.cartList.push(payload)
    } */

     // 1.查找之前数组中是否有该商品
    // let product = state.cartList.find(item => {
    //   return item.iid === payload.iid
    // })

   return new Promise((resolve, reject) => {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 判断oldProduct
    if(oldProduct) {  // 数量 +1
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量+1')
    }else {
      payload.count = 1;
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
      resolve('添加了新的商品')
    }
   })
  }
}