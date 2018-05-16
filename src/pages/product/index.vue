<template>
  <div class="product-box">
    <header class="productHeader">
      <div class="goback" @click="back()">
        <img src="static/img/arrow_left.png" alt="">
      </div>
      <div class="productSelectTitle">
        <ul class="productSelectTitleUl">
          <li class="header-tab-item" v-for="(item, index) in productTitleData" :key="index" @click="selectTitle(index)">
            <p :class="{selectTab: selectTitleIndex == index}">{{item}}</p>
          </li>
        </ul>
      </div>
    </header>
    <div class="gray-box"></div>
    <router-view class="productBody"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toJSON: '',
      productTitleData: ['商品', '详情', '评价'],
      selectTitleIndex: 0
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  methods: {
    back: function () {
      let checkRoute = this.$store.state.toProduct
      if (checkRoute === 'productList') {
        this.$router.push('/productList')
      } else {
        this.$router.push('/')
        this.$store.state.tabShow = true
      }
    },
    selectTitle: function (index) {
      this.selectTitleIndex = index
      if (index === 0) {
        this.$router.push('/product/info')
        this.$store.state.productSwipeShow = true
      } else if (index === 1) {
        this.$router.push('/product/details')
        this.$store.state.productSwipeShow = false
      } else {
        this.$router.push('/product/comment')
        this.$store.state.productSwipeShow = false
      }
    }
  }
}
</script>
<style>
.product-box{
  margin-bottom: 44px;
}
.productHeader{
  width: 100%;
  height: 44px;
  background-color: #fff;
  box-sizing: border-box;
  position: fixed;
  line-height: 44px;
  z-index: 2000;
  overflow-y: auto;
  max-width: 640px;
}
.goback{
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 100%;
}
.goback>img{
  height: 32px;
  width: auto;
  vertical-align: middle;
}
.productSelectTitle{
  width: 100%;
  height: 100%;
  padding: 0 70px;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.productBody{
  width: 100%;
  background-color: #f0f2f5;
}
.productSelectTitleUl{
  box-sizing: border-box;
  padding: 0 30px;
  overflow: hidden;
  -webkit-tap-highlight-color: rgba(255,0,0,0);
  width: 100%;
  height: 100%;
  line-height: 44px;
}
.header-tab-item{
  width: 30%;
  height: 100%;
  float: left;
}
.header-tab-item>p{
  font-size: 15px;
  line-height: 41px;
  text-align: center;
  color: #000;
}
.selectTab{
  border-bottom: 2px solid #222;
  font-weight: 600;
}
.gray-box{
  width: 100%;
  height: 44px;
}
</style>
