<template>
  <div id="jd-index">
    <header>
      <div class="header-left" @click="modalToast()">
        <img src="static/img/qrcode.png" alt="">
      </div>
      <div class="header-content">
        <div class="searchbar" @click="popupVisible=true">
          <img src="static/img/search.png" class="searchicon" alt="">
        </div>
      </div>
      <div class="header-right" @click="modalToast()">
        <img src="static/img/msg.png" alt="">
      </div>
    </header>
    <mt-swipe :auto="4000" class="banner">
      <mt-swipe-item v-for="item in swipeData" :key="item">
        <img :src="'static/img/'+item" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <ul class="quick-entry">
      <li>
        <ul class="qe-list">
          <li v-for="item in quickEntryDataLine1" :key="item.name">
            <img :src="'static/img/'+item.img" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </li>
      <li>
        <ul class="qe-list">
          <li v-for="item in quickEntryDataLine2" :key="item.name">
            <img :src="'static/img/'+item.img" alt="">
            <p>{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <div class="welfare">
      <img src="static/img/welfare.jpg" alt="">
    </div>
    <SecKill></SecKill>
    <mt-popup v-model="popupVisible" position="right" class="searchPage">
      <div class="searchBox">
        <div class="searchBoxLeft" @click="popupVisible=false">
          <img src="static/img/arrow_left.png" alt="">
        </div>
        <div class="searchBoxContent">
          <div class="searchview">
            <img src="static/img/search.png" alt="">
            <input type="text" class="searchinput">
          </div>
        </div>
        <div class="searchBoxRight">
          <button>搜索</button>
        </div>
      </div>
      <div class="hot-search">
        <p class="hot-search-title">热门搜索</p>
        <div class="hot-word-list">
          <span v-for="item in hotWord" :key="item">{{item}}</span>
        </div>
      </div>
    </mt-popup>
    <div class="floor">
      <div class="floor-img">
        <img src="static/img/598c3fdcN04406a90.jpg!q70.jpg" alt="">
      </div>
      <div class="floor-line-1 floor-line">
        <div class="col-2" v-for="item in recommendData1" :key="item.id">
          <h2>{{item.h2}}</h2>
          <p>{{item.p}}</p>
          <div class="floor-line-img">
            <img :src="'static/img/product/'+item.imgleft" alt="">
            <img :src="'static/img/product/'+item.imgright" alt="">
          </div>
        </div>
      </div>
      <div class="floor-line-2 floor-line">
        <div class="col-1" v-for="item in recommendData2" :key="item.id">
          <h2>{{item.h2}}</h2>
          <p>{{item.p}}</p>
          <div class="floor-line-img">
            <img :src="'static/img/product/'+item.img" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="recommend_floor">
      <div class="gray-text">
        <span class="gray-layout">为您推荐</span>
      </div>
      <ul>
        <li class="similar-li" v-for="(item, index) in guessList" :key="index">
          <a href="javascript:;" @click="toProduct(index)">
            <div class="similar-product">
              <div class="similar-posre">
                <img :src="'static/products/'+item.img" alt="">
              </div>
              <span class="similar-product-text">{{item.title}}</span>
              <p class="similar-product-info">
                <span class="similar-product-price">
                  ￥&nbsp;
                  <span class="big_price">{{item.price | formatBigmoney}}</span>
                  <span class="small_price">{{item.price | formatSmallmoney}}</span>
                </span>
              </p>
              <p class="praise-info">
                <span class="praise-num">
                  <span>好评率100%</span>
                </span>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SecKill from '@/components/SecKill.vue'
import { Toast } from 'mint-ui'
import {productListData} from '../productList/productListData.js'
export default{
  data () {
    return {
      toJson: '',
      ismobile: false,
      swipeData: ['banner1.jpg', 'banner2.jpg', 'banner3.jpg', 'banner4.jpg', 'banner5.jpg', 'banner6.jpg', 'banner7.jpg'],
      quickEntryDataLine1: [
        {'name': '京东超市', 'img': 'quick-entry1.png'},
        {'name': '全球购', 'img': 'quick-entry2.png'},
        {'name': '京东服饰', 'img': 'quick-entry3.png'},
        {'name': '京东生鲜', 'img': 'quick-entry4.png'},
        {'name': '京东到家', 'img': 'quick-entry5.png'}
      ],
      quickEntryDataLine2: [
        {'name': '充值缴费', 'img': 'quick-entry6.png'},
        {'name': '9.9元拼', 'img': 'quick-entry7.png'},
        {'name': '领券', 'img': 'quick-entry8.png'},
        {'name': '省钱', 'img': 'quick-entry9.png'},
        {'name': '物流查询', 'img': 'quick-entry10.png'}
      ],
      popupVisible: false,
      hotWord: ['便携座椅', '电脑写字板', '因特尔i9CPU', '金士顿内存', '华硕主板', '厨房碗柜', '美的电饭锅', '保湿护手霜'],
      recommendData1: [
        {'id': 'recommend-1', 'imgleft': 'recommend1-1.jpg', 'imgright': 'recommend1-2.jpg', 'h2': '好吃不停', 'p': '让你流口水的美食'},
        {'id': 'recommend-2', 'imgleft': 'recommend2-1.jpg', 'imgright': 'recommend2-2.jpg', 'h2': '下午茶点', 'p': '莫负午后好时光'}
      ],
      recommendData2: [
        {'id': 'recommend-3', 'img': 'recommend3.jpg', 'h2': '追剧先锋', 'p': '看剧少不了'},
        {'id': 'recommend-4', 'img': 'recommend4.jpg', 'h2': '派对动物', 'p': '派对如何筹备'},
        {'id': 'recommend-5', 'img': 'recommend5.jpg', 'h2': '女神心经', 'p': '变身女神必备'},
        {'id': 'recommend-6', 'img': 'recommend6.jpg', 'h2': '接驾姨妈', 'p': '轻松过生理期'}
      ],
      guessList: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.guessList = productListData[0]
    })
  },
  filters: {
    formatBigmoney: function (value) {
      return Number(value).toFixed(0)
    },
    formatSmallmoney: function (value) {
      return '.' + value.split('.')[1]
    }
  },
  watch: {
  },
  components: {
    SecKill
  },
  methods: {
    backtoindex: function () {
      this.popupVisible = false
    },
    toCatagory: function () {
      this.$router.push('/catagory')
    },
    toJSON: function () {
    },
    modalToast: function () {
      Toast({
        message: '暂无此功能！',
        position: 'middle',
        duration: 1200
      })
    },
    toProduct: function (index) {
      this.$router.push('/product')
      this.$store.state.productIndex = index
      this.$store.state.toProduct = 'index'
      this.$store.state.tabShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  margin: 0;
  width: 100%;
}
#jd-index{
  width: 100%;
  position: relative;
  margin-bottom: 60px;
}
#jd-index>header{
  width: 100%;
  height: 44px;
  background-color: #e02020;
  position: fixed;
  top: 0;
  z-index: 99;
  max-width: 640px;
  color: #fff;
  opacity: .9;
}
.header-content{
  width: 100%;
  height: 100%;
  padding: 0 50px;
  position: relative;
  padding-top: 9px;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.header-left,.header-right{
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 9;
  padding-top: 10px;
}
.header-left{
  left: 0;
}
.header-right{
  right: 0;
}
.header-left>img,.header-right>img{
  height: 26px;
  width: auto;
}
.searchbar{
  box-sizing: border-box;
  z-index: 2;
  width: 100%;
  background-color: #fff;
  height: 28px;
  border-radius: 20px;
  text-align: left;
  padding: 4px 0 0 8px;
  position: relative;
}
.searchicon{
  display: inline-block;
  width: 20px;
  height: 20px;
}
.banner{
  height: 4.875rem;
  margin-bottom: 10px;
}
.banner img{
  width: 100%;
}
.quick-entry{
  width: 100%;
  height: 4.4rem;
}
.quick-entry *{
  box-sizing: border-box;
}
.quick-entry>li{
  width: 100%;
  height: 50%;
}
.qe-list{
  width: 100%;
  height: 100%;
  padding-top: 0.3rem;
}
.qe-list>li{
  width: 20%;
  height: 100%;
  float: left;
  font-size: 0.3rem;
}
.qe-list>li>img{
  width: 60%;
  height: auto;
  margin: 0 auto;
  vertical-align: middle;
  padding-bottom: 0.1rem;
}
.welfare{
  width: 100%;
  padding-top: 30px;
}
.welfare>img{
  width: 100%;
}
.searchPage{
  width: 100%;
  height: 100%;
}
.searchBox{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  line-height: 50px;
  position: relative;
  margin-bottom: 15px;
}
.searchBoxLeft{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 40px;
  height: 50px;
  padding-left: 5px;
}
.searchBoxLeft>img{
  position: relative;
  top: 7px;
}
.searchBoxContent{
  width: 100%;
  height: 100%;
  text-align: left;
  padding-left: 40px;
  padding-right: 70px;
  padding-top: 10px;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.searchview{
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding-left: 10px;
  position: relative;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.searchview>img{
  position: relative;
  top: -2px;
  left: 3px;
  height: 24px;
  width: auto;
}
.searchinput{
  border: 0;
  outline: 0;
  width: 70%;
  height: 16px;
  position: relative;
  top: -11px;
  padding-left: 10px;
  z-index: 99;
}
.searchBoxRight{
  position: absolute;
  top: 0px;
  right: 0px;
  width: 70px;
  height: 50px;
}
.searchBoxRight>button{
  width: 50px;
  height: 30px;
  border: 0;
  border-radius: 4px;
  background-color: #e93b3d;
  color: #fff;
}
.hot-word-list{
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
}
.hot-search-title{
  font-size: 22px;
  margin-bottom: 10px;
}
.hot-word-list>span{
  display: block;
  max-width: 100%;
  height: 1rem;
  background-color: #ececec;
  overflow: hidden;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  line-height: 1rem;
  padding: 0 12px;
  margin-right: 15px;
  margin-bottom: 15px;
  font-size: 0.4rem;
  float: left;
  border-radius: 5px;
}
.qrcodePage{
  width: 100%;
  height: 100px;
  background-color: #000;
  opacity: 0.8;
  position: fixed;
  top: 0;
  line-height: 100px;
  color: #fff;
  font-size: 22px;
}
.floor{
  width: 100%;
  overflow: hidden;
}
.floor-img{
  height: 1.11rem;
  margin-bottom: 10px;
  background-color: #f6f6f6;
}
.floor-img>img{
  width: auto;
  max-height: 100%;
}
.floor-line{
  width: 100%;
  overflow: hidden;
  margin-bottom: 15px;
}
.col-2{
  width: 50%;
  float: left;
}
.col-1{
  width: 25%;
  float: left;
}
.floor-line h2{
  font-size: 0.45rem;
  margin-bottom: 5px;
}
.floor-line p{
  font-size: 0.34rem;
  color: #648EFF;
}
.floor-line-img{
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  padding: 0 10px;
}
.floor-line-img>img{
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.3rem 0.3rem 0;
}
.recommend_floor{
  background-color: #f0f2f5;
  overflow: hidden;
  margin-top: 8px;
  font-size: 0;
  width: 100%;
}
.gray-text{
  position: relative;
  display: -webkit-box;
  margin: 14px 5px;
  color: #848689;
  font-size: 14px;
  -webkit-box-pack: center;
}
.gray-layout{
  padding: 0 10px;
  background-color: #f0f2f5;
  z-index: 10;
  position: relative;
  display: block;
}
.gray-text::after{
  content: "";
  height: 1px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  background-color: #cbcbcb;
}
.similar-li{
  float: left;
  width: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 4px;
  position: relative;
}
.similar-li:nth-child(odd) {
  padding-right: 1px;
}
.similar-li:nth-child(even) {
  padding-left: 1px;
}
.similar-li a {
  text-decoration: none;
  text-decoration: none;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
}
.similar-product{
  background-color: #fff;
  padding-bottom: 6px;
  font-size: 0;
  width: 100%;
}
.similar-posre{
  position: relative;
  width: 100%;
}
.similar-posre img{
  width: 100%;
  height: auto;
}
.similar-product-text{
  height: 33px;
  font-size: 13px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
  color: #232326;
  margin-top: 5px;
  line-height: 17px;
  margin-bottom: 3px;
  padding: 0 4px;
}
.similar-product-info{
  height: 23px;
  font-size: 13px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
  text-align: left;
}
.similar-product-price{
  color: #f23030;
  display: inline-block;
  padding: 0 5px 0 4px;
  position: relative;
  top: 1px;
  height: 25px;
  line-height: 25px;
}
.big_price{
  font-size: 16px;
}
.praise-info{
  display: block;
  padding: 0 4px;
  position: relative;
  top: 1px;
  height: 25px;
  line-height: 25px;
  text-align: left;
}
.praise-num{
  display: block;
  overflow: hidden;
  font-size: 20px;
  color: #999;
  height: 25px;
  width: 100%;
  padding-right: 60px;
}
.praise-num span{
  position: relative;
  top: 6px;
  width: 200%;
  -webkit-transform: scale(.5);
  -ms-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform-origin: left top;
  white-space: nowrap;
  display: block;
  overflow: hidden;
}
</style>
