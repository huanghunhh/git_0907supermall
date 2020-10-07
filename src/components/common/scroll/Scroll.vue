<template>
  <!-- ref-父子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: { // 根据probeType的值确定监听方式
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      // 1创建BScroll对象
      // 这种获取方式可能不能准确获取标签
      // this.scroll = new BScroll(document.querySelector('.wrapped'));
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, // 监听原生事件
        probeType: this.probeType, // 实时监听-影响性能
        pullUpLoad: this.pullUpLoad,
      });

      // 2监听滚动位置
      if(this.probeType === 2 || this.probeType === 3) {
        // 对 0/1 不需要监听
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position); //把位置传出去
        })
      }
      

      // 3监听上拉事件
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp');
        })
      }

      console.log(this.scroll);
      // 重新计算可滚动高度-当图片加载完毕后
      // this.scroll.refresh();
    },
    methods:{
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        console.log('Scroll/refresh');
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0;
      },
    },
  }
</script>

<style scoped>
  
</style>