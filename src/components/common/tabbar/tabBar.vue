<template>
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name:'tabbar',
  component:{

  }
}
</script>
<style scoped>
  #tab_bar{
    display: flex;
    text-align: center;
    background: #f6f6f6;
    border-top: 1px solid #eee;
    height: 49px;
    box-shadow: 0px -1px 1px rgba(150, 150, 150, .08);

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>