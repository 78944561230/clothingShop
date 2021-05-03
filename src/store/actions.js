export default {
  addCart(context, info) {
    return new Promise((resolve,reject)=>{
      console.log(info);
      //判断是否添加过
      const oldInfo =context.state.cartList.find(item => item.iid === info.iid);
  
      //如果添加过数量就加一，否则新添加
      if (oldInfo) {
        // oldInfo.count +=1
        context.commit('addCounter', oldInfo);
        resolve('商品数量+1');
      } else {
        info.count = 1;
        info.checked = true;
        context.commit('addToCart', info);
        resolve('添加了新的商品');
      }
    })
  }
}