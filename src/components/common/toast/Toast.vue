<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>
<script>
  export default {
    name:'Toast',
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(msg,duration = 3000){
        this.isShow = true;
        this.message = msg;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration);
      },
    }
  }
</script>
<style scoped>
  .toast {
    position:fixed;
    top: 70%;
    left: 50%;
    z-index: 999;
    padding:8px 10px;
    transform:translate(-50% ,-50%);
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    border-radius:20px;
  }
</style>
