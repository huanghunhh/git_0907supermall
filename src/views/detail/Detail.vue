<template>
  <div>
    详情页
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
      }
    },
    created() {
      this.iid = this.$route.params.iid;
    },
    components:{
  
    },
  }
</script>

<style scoped>
  
</style>