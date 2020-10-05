<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data() { 
      return {
  
      }
    },
    components:{
  
    },
    methods:{
  
    },
   }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background: #f6f6f6;

    position: fixed;
    /* left和right都设置，保证宽度是屏幕宽度 */
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0px -1px 3px rgba(100, 100, 100, .1);
  }
  
</style>