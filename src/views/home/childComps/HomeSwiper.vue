<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>  
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: 'HomeSwiper',
    data() {
      return {
        isLoad: false,
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper, SwiperItem,
    },
    methods: {      
      imageLoad() {
        console.log('HomeSwiper/imageLoad');
        this.$bus.$emit('itemImageLoad'); // 可滚动区域
        if(!this.isLoad){ // 只需要发送一次
          this.$emit('swiperImageLoad'); // offsetTop-可以不经过事件总线
          this.isLoad = true;
        }
        
      }
    },
   }
</script>

<style scoped>
</style>