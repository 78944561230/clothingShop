import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  cartList:[]
};

const store = new Vuex.Store({
  state,
  mutations:{
    addCounter(state,payload){
      payload.count++;
    },
    addToCart(state,payload){
      state.cartList.push(payload);
    }
  },
  actions:{
    addCart(context,info){
      console.log(info);
      //判断是否添加过
      const oldInfo = state.cartList.find(item => item.iid === info.iid);

      //如果添加过数量就加一，否则新添加
      if(oldInfo){
        // oldInfo.count +=1
        context.commit('addCounter',oldInfo);
      }else{
        info.count = 1;
        info.checked = true;
        context.commit('addToCart',info);
      }
      console.log(state.cartList);
    }
  },
  getters:{
    cartList(state){
      return state.cartList
    },
    cartCount(state,getters){
      return getters.cartList.length
    }
  }
})

export default store