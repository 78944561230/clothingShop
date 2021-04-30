import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  cartList:[]
};

const store = new Vuex.Store({
  state,
  mutations:{
    addCart(state,info){
      console.log(info);
      //判断是否添加过
      const oldInfo = state.cartList.find(item => item.iid === info.iid);

      //如果添加过数量就加一，否则新添加
      if(oldInfo){
        oldInfo.count +=1
      }else{
        info.count = 1;
        info.checked = true;
        state.cartList.push(info)
      }
      console.log(state.cartList);
    }
  }
})

export default store