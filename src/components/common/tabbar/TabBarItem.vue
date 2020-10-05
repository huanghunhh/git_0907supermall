<template>
  <div class="tab-bar-item" @click="itemClick">    
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <!-- 下面的可以-但建议在插槽外面封个标签 -->
    <!-- <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>    
    <!-- 下面没效果-使用插槽时，会整个替换掉，类就无效了 -->
    <!-- <slot :class="{active: isActive}" name="item-text"></slot> -->
    <!-- <div :class="{active: isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>    
  </div>
</template>

<script>
  export default {
    name: 'TabBarItem',
    props:{
      // 把path传递进来
      path: String,
      activeColor: {
        type: String,
        default: 'red',
      },
    },
    data() { 
      return {
        // isActive: false,
        // isActive: true,
      }
    },
    computed: {
      isActive() {
        // 找到了-活跃状态返回true
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    },    
    methods:{
      itemClick() {
        // console.log('click');
        this.$router.replace(this.path);
      }
    },
   }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    /* 一般高度都是49 */
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* 颜色也是动态的 */
  /* 无法动态绑定class-动态绑定style */
  /* .active {
    color: red;
  } */
</style>