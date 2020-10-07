<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物节</div>
    </nav-bar>
    <!-- 多复制一份-假象 -->
    <tab-control class="tab-control" 
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl1"
        v-show="isTabFixed"></tab-control>
    <!-- :probe-type="3"-加:，让传入的数据的类型为数字，而不是字符串 -->
    <scroll class="content" 
    ref="scroll" :probe-type="3" 
    @scroll="contentScroll" :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
      </ul>
    </scroll>
    <!-- native-监听组件的原生事件-点击事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
    <ul>
      <li>下面的列表1</li>
      <li>下面的列表2</li>
      <li>下面的列表3</li>
      <li>下面的列表4</li>
      <li>下面的列表5</li>
      <li>下面的列表6</li>
      <li>下面的列表7</li>
      <li>下面的列表8</li>
      <li>下面的列表9</li>
      <li>下面的列表10</li>
      <li>下面的列表11</li>
      <li>下面的列表12</li>
      <li>下面的列表13</li>
      <li>下面的列表14</li>
      <li>下面的列表15</li>
      <li>下面的列表16</li>
      <li>下面的列表17</li>
      <li>下面的列表18</li>
      <li>下面的列表19</li>
      <li>下面的列表20</li>
      <li>下面的列表21</li>
      <li>下面的列表22</li>
      <li>下面的列表23</li>
      <li>下面的列表24</li>
      <li>下面的列表25</li>
      <li>下面的列表26</li>
      <li>下面的列表27</li>
      <li>下面的列表28</li>
      <li>下面的列表29</li>
      <li>下面的列表30</li>
    </ul>

    
  </div>
</template>

<script>
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  // 子组件
  // import {Swiper, SwiperItem} from 'components/common/swiper'
  // 进一步封装成HomeSwiper
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import FeatureView from './childComps/FeatureView'

  // 方法
  import {
    getHomeMultidata,
    getHomeGoods,
  } from 'network/home'
  import {debounce} from 'common/utils'

  export default {
    name: 'Home',
    data() { 
      return {
        // 分别保存
        // result: null,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    components:{
      NavBar,
      TabControl,
      GoodsList, 
      Scroll,
      BackTop,

      // Swiper, SwiperItem,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
    },
    created() {
      // 主要逻辑
      // 1请求多个数据
      this.getHomeMultidata()

      // 2请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      
    },
    mounted() {
      // 1监听item中图片加载完成的事件
      const refresh = debounce(this.$refs.scroll.refresh, 1)
      // 把debounce方法放到common/utils下，公用
      // const refresh = this.debounce(this.$refs.scroll.refresh, 1) 
      this.$bus.$on('itemImageLoad', () => {
        console.log('Home/itemImageLoad');
        refresh(); // refresh的次数少
        // this.$refs.scroll.refresh(); // 会refresh多次
      })

      // 2获取tabControl的offsetTop
      // 所有的组件都有一个属性$el-用于获取组件中的元素
      // 此时图片可能没有加载完毕-监听图片的加载情况
      // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    activated() {
      console.log("activated");
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      // 刷新一下-不然好像会有一些bug
      this.$refs.scroll.refresh();
    },
    deactivated() {
      console.log("deactivated");
      this.saveY = this.$refs.scroll.getScrollY();
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods:{
      /**
       * 事件监听相关的方法
       */
      // 把debounce方法放到common/utils下，公用
      // debounce(func, delay) {
      //   let timer = null;
      //   return function(...args) { // ...args 可以传多个参数
      //     if(timer) { // 当下一次请求发出时，此次请求不发出
      //       clearTimeout(timer);
      //     }
      //     timer = setTimeout(() => {
      //       func.apply(this, args)
      //     }, delay)
      //   }
      // },

      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
          case 1:
            this.currentType = 'new';
          case 2:
            this.currentType = 'sell';
        }
        // 让两个导航同步
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // console.log('backClick');
        // 500ms返回到指定位置
        // 一步一步的取到方法

        // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
        // 调用组件封装的方法
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        // 1判断BackTop是否显示
        // console.log(position);
        this.isShowBackTop = -position.y > 100;
         
        // 2决定tabControl是否吸顶（position:fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop;

      },
      loadMore() {
        console.log('更多');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 2获取tabControl的offsetTop
        // 所有的组件都有一个属性$el-用于获取组件中的元素
        // 此时图片可能没有加载完毕
        // console.log(this.$refs.tabControl2);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关的方法
       */
      // 具体实现
      
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // 保存数据
          // this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      // 接口不再开放-这里就不请求数据了
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          // 数据请求完毕，允许再次加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      
    },
   }
</script>

<style scoped>
  /* scoped-作用域-仅针对当前文件 */
  #home {
    /* padding-top: 44px; */
    /* vh-视口高度 100-100%的视口高度 
      padding 会影响视口高度
    */
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器的原生滚动时，为了让导航不跟随滚动，但采用BScroll，这里就没必要脱标 */
    /* position: fixed; 
    left: 0;
    right: 0;
    top: 0;
    z-index: 10; */
  }
  .tab-control {
    /* sticky定位-没有到位置-sticky 到位置-fixed */
    /* 用了BScroll，这个属性就用不了了 */
    /* 这个属性的兼容性也不高 */
    /* position: sticky;
    top: 44px; */
    position: relative;
    /* z-index 要配合定位 */
    z-index: 9;
  }
  .content {
    /* 定位 */
    background-color: #fff;
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .fixed { 这样不好实现
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  /* .content { */
    /* 动态计算 */
    /* margin-top: 44px; */
    /* C3-通过calc来计算 */
    /* height: calc(100% - 93px); */
    /* overflow: hidden; */
  /* } */
</style>