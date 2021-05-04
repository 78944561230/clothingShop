import Toast from './Toast';

const obj = {};
obj.install = function (Vue) {
  //创建组件构造器
  const constructor = Vue.extend(Toast);
  //构造组件
  const toast = new constructor();
  //手动挂载组件
  toast.$mount(document.createElement('div'));
  //添加组件到document
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
}


export default obj;