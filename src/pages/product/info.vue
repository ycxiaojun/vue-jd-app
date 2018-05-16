<template>
  <div>
    <div class="productInfo">
      <div class="swipeImgBox" :style="{height: swipeImgBoxHeight + 'px'}">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(item, index) in swipeData" :key="index">
            <img :src="'static/products/'+item" alt="" class="swipeBigImg">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="goodsInfo">
        <div class="title-text">
          <span class="self-sale inline">自营</span>
          <span>{{goodsData.title}}</span>
          <div class="addLove" :class="{addLoveChoose: loveChoose}" @click="love()">
            <img :src="'static/img/'+addLoveImg" alt="">
            <p>关注</p>
          </div>
        </div>
        <div class="pro-act">
          勾选[保障服务][原厂保2年]，添购原厂保障服务，意外损坏不用愁。
          <em class="knowmore" @click="moreToast('这是个假链接')">了解更多保障服务产品！</em>
        </div>
        <div class="goods-price">
          <span>
            <b>￥</b>
            <strong>{{goodsData.price | formatBigmoney}}</strong>
            <b>{{goodsData.price | formatSmallmoney}}</b>
          </span>
        </div>
      </div>
      <div class="goods-activity">
        <div class="whiteBarInfo">
          <span>
            白条
            <b>【白条支付】即享3/6/12期息费8折</b>
          </span>
        </div>
        <div class="goods-Promotion">
          <span>
            促销
            <span class="self-sale inline mar">优惠套装</span>
            <em>最高省</em>
            <b>30元</b>
          </span>
          <img src="static/img/more.png" alt="" @click="moreToast('暂无此功能')">
        </div>
      </div>
      <div class="chooseSize">
        <div class="chooseSize-text">
          数量
        </div>
        <div class="choose-box">
          <div id="reduce" class="choose-border" @click="changeNum(-1)">
            <img src="static/img/reduce.png" alt="">
          </div>
          <div id="input-num">
            <input type="text" value="1" id="choose-input" v-model="goodsNum">
          </div>
          <div id="plus" class="choose-border" @click="changeNum(1)">
            <img src="static/img/plus.png" alt="">
          </div>
        </div>
      </div>
      <div class="prod-service">
        <span>
          <div class="service-tip-module" v-for="(item, index) in serviceTextData" :key="index">
            <img src="static/img/service-icon.png" alt="" class="service-icon">
            <span class="service-icon-text">{{item}}</span>
          </div>
        </span>
      </div>
    </div>
    <div class="prod-tab">
      <div class="prod-tab-icon">
        <div @click="moreToast('暂无此功能')">
          <img src="static/img/shop.png" alt="">
          <p>进店</p>
        </div>
        <div @click="toShopCart()">
          <img src="static/img/shopcart.png" alt="">
          <p>购物车</p>
          <i class="cartAmount">{{cartAmount}}</i>
        </div>
      </div>
      <div class="prod-tab-btn">
        <div class="join-cart-btn" @click="addCart()">加入购物车</div>
        <div class="buy-btn" @click="toShopCart()">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import {productListData} from '../productList/productListData.js'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      toJSON: '',
      goodsData: productListData[this.$store.state.productListIndex][this.$store.state.productIndex],
      addLoveImg: 'love.png',
      loveChoose: false,
      serviceTextData: ['京东发货&售后', '货到付款', '京准达', '211限时达', '自提', '7天无理由退货', '99元免基础运费（20kg内）'],
      goodsNum: 1,
      swipeImgBoxHeight: '',
      swipeData: productListData[this.$store.state.productListIndex][this.$store.state.productIndex].imglist,
      cartList: [],
      cartAmount: 0
    }
  },
  filters: {
    formatBigmoney: function (value) {
      return Number(value).toFixed(0)
    },
    formatSmallmoney: function (value) {
      return '.' + value.split('.')[1]
    }
  },
  computed: {
    buyNum: function () {
      return this.goodsNum
    }
  },
  watch: {
  },
  mounted: function () {
    this.$nextTick(function () {
      this.setSwipeImgBoxHeight()
      let storage = window.localStorage
      let cartListStr = storage.getItem('cartList')
      if (cartListStr) {
        let cartList = cartListStr.split(',')
        this.cartAmount = cartList.length
      }
    })
  },
  methods: {
    setSwipeImgBoxHeight: function () {
      let clientWidth = document.documentElement.clientWidth
      this.swipeImgBoxHeight = clientWidth
    },
    moreToast: function (msg) {
      Toast({
        message: msg,
        position: 'middle',
        duration: 1000,
        className: 'moreToast'
      })
    },
    toShopCart: function () {
      this.$router.push('/shopcart')
      this.$store.state.tabShow = true
      this.$store.state.selectTab = 'cart'
    },
    love: function () {
      if (!this.loveChoose) {
        this.addLoveImg = 'lovechoose.png'
        Toast({
          message: '关注成功',
          position: 'middle',
          duration: 1000,
          className: 'moreToast'
        })
      } else {
        this.addLoveImg = 'love.png'
        Toast({
          message: '取消关注成功',
          position: 'middle',
          duration: 1000,
          className: 'moreToast'
        })
      }
      this.loveChoose = !this.loveChoose
    },
    changeNum: function (way) {
      if (way > 0) {
        this.goodsNum++
      } else {
        this.goodsNum--
        if (this.goodsNum < 1) {
          this.goodsNum = 1
        }
      }
    },
    addCart: function () {
      let _this = this
      let storage = window.localStorage
      let cartList = storage.getItem('cartList')
      if (cartList) {
        _this.checkCartItem()
      } else {
        let goodsItem = _this.$store.state.productListIndex + '-' + _this.$store.state.productIndex + '-' + _this.buyNum
        storage.setItem('cartList', goodsItem)
        this.cartAmount = 1
      }
    },
    checkCartItem: function () {
      let _this = this
      let storage = window.localStorage
      let cartList = storage.getItem('cartList')
      let itemList = cartList.split(',')
      _this.removeEmptyArrayEle(itemList)
      let checkItemList = []
      for (var i = 0; i < itemList.length; i++) {
        let item = Number(itemList[i].split('-')[1])
        checkItemList.push(item)
      }
      let checkItemIndex = checkItemList.indexOf(_this.$store.state.productIndex)
      if (checkItemIndex === -1) {
        let goodsItem = _this.$store.state.productListIndex + '-' + _this.$store.state.productIndex + '-' + _this.buyNum
        itemList.push(goodsItem)
        storage.setItem('cartList', itemList)
        this.cartAmount = itemList.length
      } else {
        let oldNum = itemList[checkItemIndex].split('-')[2]
        let curNum = Number(oldNum) + Number(_this.buyNum)
        itemList[checkItemIndex] = _this.$store.state.productListIndex + '-' + _this.$store.state.productIndex + '-' + curNum
        storage.removeItem('cartList')
        storage.setItem('cartList', itemList)
        this.cartAmount = itemList.length
      }
    },
    removeEmptyArrayEle: function (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
          arr.splice(i, 1)
          i = i - 1
        }
      }
      return arr
    },
    directBuy: function () {
      this.addCart()
      this.toShopCart()
    }
  }
}
</script>
<style>
.productInfo{
  width: 100%;
  overflow: hidden;
  border-top: 1px solid #f0f0f0;
}
.swipeBigImg{
  width: 100%;
  height: auto;
}
.goodsInfo{
  background-color: #fff;
  padding: 10px;
  position: relative;
}
.basicInfo,.goods-title{
  position: relative;
}
.title-text{
  min-height: 40px;
  line-height: 24px;
  text-align: left;
  color: #232326;
  font-size: 16px;
  padding-right: 50px;
}
.addLove{
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 12px;
  color: #848484;
  line-height: 18px;
  padding-top: 12px;
}
.addLoveChoose{
  color: #f23030;
}
.addLove img{
  width: 20px;
  height: auto;
}
.inline{
  display: inline-block !important;
}
.pro-act{
  margin: 6px 10px 0 0;
  font-size: 13px;
  line-height: 20px;
  text-align: justify;
  color: #81838e;
}
.knowmore{
  color: #f23030;
  border-bottom: 1px solid #f23030;
}
.moreToast{
  width: 200px;
  height: 60px;
  line-height: 40px;
}
.goods-price{
  text-align: left !important;
  padding: 5px 0;
  color: #f23030;
}
.goods-price b{
  font-size: 16px;
}
.goods-price strong{
  font-size: 22px;
}
.goods-activity{
  margin-top: 10px;
  padding-left: 10px;
  background-color: #fff;
}
.whiteBarInfo,.goods-Promotion{
  width: 100%;
  text-align: left !important;
  font-size: 14px;
  line-height: 45px;
}
.whiteBarInfo{
  border-bottom: 1px solid #f0f0f0;
}
.mar{
  margin-left: 10px;
  margin-right: 10px;
}
.goods-Promotion b{
  color: #f23030;
}
.goods-Promotion img{
  float: right;
  width: 26px;
  height: auto;
  margin-right: 10px;
  margin-top: 19px;
}
.chooseSize{
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 60px;
  background-color: #fff;
  margin-top: 10px;
  height: 60px;
}
.chooseSize-text{
  float: left;
}
.choose-box{
  float: right;
  margin-top: 14px;
  margin-right: 30px;
}
.choose-box div{
  float: left;
  width: 30px;
  height: 30px;

}
.choose-border{
  border: 1px solid #ccc;
  position: relative;
}
.choose-border img{
  width: 14px;
  height: auto;
  position: absolute;
  top: 8px;
  left: 8px;
}
#input-num{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  width: 45px;
  position: relative;
}
#choose-input{
  width: 40px;
  height: 20px;
  position: absolute;
  border: 0;
  top: 5px;
  left: 2px;
  outline: 0;
  text-align: center;
  color: #000;
}
.chooseNum{
  margin-left: 10px;
  text-align: right !important;
}
.chooseNum em{
  padding: 5px 10px;
  border: 1px solid #aaa;
}
.chooseNum span{
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  padding: 5px 15px;
  margin-left: -3px;
}
.prod-service{
  margin-top: 10px;
  padding: 5px 15px 15px;
  font-size: 0;
  word-wrap: break-word;
  word-break: break-all;
  background-color: #fff;
  text-align: left !important;
}
.service-tip-module{
  display: inline-block;
  margin-top: 8px;
  margin-right: 14px;
  font-size: 0;
}
.service-icon{
  display: inline-block;
  margin-right: 5px;
  white-space: 12px;
  height: 12px;
}
.service-icon-text{
  font-size: 12px;
  line-height: 12px;
  vertical-align: top;
  color: #81838e;
}
.prod-tab{
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 10px -6px #000;
  background-color: #fff;
  max-width: 640px;
}
.prod-tab-icon{
  width: 100px;
  height: 100%;
  padding-top: 7px;
  box-sizing: border-box;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
}
.prod-tab-icon div{
  float: left;
  width: 50%;
  height: 100%;
  position: relative;
}
.prod-tab-icon img{
  width: 20px;
  height: auto;
}
.prod-tab-btn{
  box-sizing: border-box;
  width: 100%;
  padding-left: 100px;
  height: 100%;
  z-index: 9;
}
.prod-tab-btn div{
  width: 50%;
  height: 100%;
  float: left;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
}
.join-cart-btn{
  background-color: #ffb03f;
}
.buy-btn{
  background-color: #f23030;
}
.cartAmount{
  display: inline-block;
  position: absolute;
  top: -5px;
  right: 2px;
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 0 4px;
  font-size: 8px;
  font-style: normal;
  line-height: 10px;
  color: #fff;
  background-color: #f23030;
}
</style>
