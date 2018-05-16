<template>
  <div id="shopcart-floor">
    <titlebar title="购物车" v-bind:isShowBack="false"></titlebar>
    <div id="shop-bg">
      <div class="nologin" v-show="!hasStorage">
        <img src="static/img/enpty-cart.png" alt="" class="empty_img">
        <p class="empty_txt" v-show="!islogin">{{cartTextData[0]}}</p>
        <p class="empty_txt" v-show="islogin">{{cartTextData[1]}}</p>
        <div class="tologin_btn" v-show="!islogin" @click="toLogin()">登录</div>
        <img src="static/img/5aa9d5a0N17c36092.jpg" alt="" class="">
      </div>
      <div class="shopCartList" v-show="hasStorage">
        <div class="shopcart_login_bar" v-show="!islogin">
          登录后可同步账户购物车中的商品
          <div class="shopcart_login_bar_btn" @click="toLogin()">登录</div>
        </div>
        <div class="cartList_content">
          <div class="cart_item" v-for="(item, index) in cartListData" :key="index">
            <div class="cart_item_info">
              <div class="icon_select" :class="{selected: item.select}" @click="selecteGoods(item)"></div>
              <div class="cart_item_img">
                <img :src="'static/products/' + item.img" alt="">
              </div>
              <span class="cart_item_title">{{item.title}}</span>
            </div>
            <div class="goods_line">
              <div class="goods_price">
                <span>
                  ￥
                  <em class="int">{{item.price | formatPrice}}</em>
                  .00
                </span>
              </div>
              <div class="num_and_more">
                <div class="num_wrap">
                  <span class="minus" @click="changeNum(item, -1)"></span>
                  <div class="input_wrap">
                    <input type="text" class="num" value="1" v-model="item.amount">
                  </div>
                  <span class="plus" @click="changeNum(item, 1)"></span>
                </div>
              </div>
            </div>
            <p class="cart_item_del" @click="delConfirm(item)">删除</p>
          </div>
        </div>
      </div>
    </div>
    <SecKill></SecKill>
    <div class="payBar" v-show="hasStorage">
      <div class="payBar_content">
        <div class="icon_select_all" :class="{selected: selectAllFlag}" @click="selectAll()"></div>
        <div class="pay_txt">总计：
          <strong class="total_price">￥{{totalPrice}}.00</strong>
        </div>
        <div class="pay_btn" :disabled="btn" :class="{buy: !btn}" @click="subitBtn()">
          去结算
          <em>({{selectNum}}件)</em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titlebar from '@/components/titlebar.vue'
import SecKill from '@/components/SecKill.vue'
import {productListData} from '../productList/productListData.js'
import { MessageBox } from 'mint-ui'
export default{
  data () {
    return {
      cartTextData: ['登录后可同步购物车中商品', '购物车空空如也,去逛逛吧~'],
      cartListData: '',
      totalPrice: 0,
      storageList: '',
      selectAllFlag: false,
      selectNum: 0,
      selectedNum: 0,
      curProduct: '',
      btn: true
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.getCartListData()
      let storage = window.localStorage
      if (storage.getItem('cartList')) {
        this.storageList = storage.getItem('cartList').split(',')
      }
      this.renewRender()
      if (storage.getItem('loginUserName')) {
        this.$store.state.isLogin = true
      }
    })
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  },
  filters: {
    formatPrice: function (value) {
      return value.split('.')[0]
    }
  },
  computed: {
    islogin: function () {
      return this.$store.state.isLogin
    },
    hasStorage: function () {
      return this.$store.state.loginStorage
    }
  },
  components: {
    titlebar,
    SecKill
  },
  methods: {
    toLogin: function () {
      this.$store.state.selectTab = 'mine'
      this.$router.push('/mine')
    },
    getCartListData: function () {
      let _this = this
      let storage = window.localStorage
      let cartListStr = storage.getItem('cartList')
      let list = []
      if (cartListStr) {
        let cartList = cartListStr.split(',')
        for (let i = 0; i < cartList.length; i++) {
          let itemList = cartList[i].split('-')
          let typeId = itemList[0]
          let goodsId = itemList[1]
          let goodsAmount = itemList[2]
          productListData[typeId][goodsId].amount = goodsAmount
          list.push(productListData[typeId][goodsId])
        }
        _this.cartListData = list
      }
    },
    changeNum: function (item, way) {
      if (way > 0) {
        item.amount++
      } else {
        item.amount--
        if (item.amount < 1) {
          item.amount = 1
        }
      }
      this.countTotalPrice()
    },
    selecteGoods: function (item) {
      var _this = this
      if (typeof item.select === 'undefined') {
        _this.$set(item, 'select', true)
      } else {
        item.select = !item.select
      }
      this.countTotalPrice()
      this.selectProductNum()
      this.checkAllNum()
      this.checkBtn()
    },
    countTotalPrice: function () {
      let _this = this
      _this.totalPrice = 0
      _this.cartListData.forEach(function (item, index) {
        if (item.select) {
          _this.totalPrice += item.price * item.amount
        }
      })
    },
    selectAll: function () {
      this.selectAllFlag = !this.selectAllFlag
      let _this = this
      _this.cartListData.forEach(function (item, index) {
        if (typeof item.select === 'undefined') {
          _this.$set(item, 'select', _this.selectAllFlag)
        } else {
          item.select = _this.selectAllFlag
        }
      })
      this.countTotalPrice()
      this.selectProductNum()
      this.checkBtn()
    },
    checkBtn: function () {
      for (var i = 0; i < this.cartListData.length; i++) {
        if (this.cartListData[i].select) {
          this.btn = false
          break
        } else {
          this.btn = true
        }
      }
    },
    checkAllNum: function () {
      this.selectedNum = 0
      for (var i = 0; i < this.cartListData.length; i++) {
        if (this.cartListData[i].select) {
          this.selectedNum++
        }
      }
      if (this.selectedNum === this.cartListData.length) {
        this.selectAllFlag = true
      } else {
        this.selectAllFlag = false
      }
    },
    selectProductNum: function () {
      var _this = this
      _this.selectNum = 0
      _this.cartListData.forEach(function (item, index) {
        if (item.select) {
          _this.selectNum++
        }
      })
    },
    delConfirm: function (item) {
      this.curProduct = item
      MessageBox.confirm('是否确认删除此商品?').then(action => {
        this.delProduct()
      }).catch(() => {
      })
    },
    delProduct: function () {
      let index = this.cartListData.indexOf(this.curProduct)
      this.cartListData.splice(index, 1)
      this.storageList.splice(index, 1)
      this.renewStorage()
      this.renewRender()
    },
    renewStorage: function () {
      var _this = this
      localStorage.removeItem('cartList')
      localStorage.setItem('cartList', _this.storageList)
    },
    renewRender: function () {
      let storage = window.localStorage
      let cartListStr = storage.getItem('cartList')
      if (cartListStr) {
        this.$store.state.loginStorage = true
      } else {
        this.$store.state.loginStorage = false
      }
    },
    subitBtn: function () {
      if (!this.btn) {
        MessageBox.alert('恭喜你结算成功,请等待收货！').then(action => {
          let storage = window.localStorage
          storage.removeItem('cartList')
          this.cartListData = ''
          this.$store.state.loginStorage = false
        }).catch(() => {
        })
      }
    }
  }
}
</script>
<style>
#shopcart-floor{
  padding-bottom: 110px;
  background-color: #f7f7f7;
}
#shop-bg{
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
  background-color: #f7f7f7;
}
.nologin{
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding: 30px 0 20px;
}
.empty_img{
  width: 90px !important;
  height: 90px !important;
}
.nologin img{
  width: 100%;
  height: 90px;
}
.empty_txt{
  font-size: 16px;
  color: rgba(51,51,51,.66);
  line-height: 24px;
  margin: 11px 0;
}
.tologin_btn{
  width: 60px;
  height: 30px;
  border: 1px solid #e4393c;
  color: #e4393c;
  font-size: 14px;
  line-height: 30px;
  border-radius: 4px;
  margin: 0 auto 30px;
}
.shopCartList,.cartList_content,.cart_item{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.shopcart_login_bar{
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
}
.shopcart_login_bar_btn{
  display: inline-block;
  margin-left: 10px;
  padding: 0 21px;
  height: 30px;
  border-radius: 4px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-color: #e4393c;
}
.cartList_content{
  margin-bottom: 10px;
  background-color: #fff;
}
.cart_item{
  height: 150px;
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #ececec;
}
.icon_select{
  width: 50px;
  height: 85px;
  position: absolute;
  top: 0;
  left: 0;
}
.icon_select::after{
  content: "";
  position: absolute;
  left: 25px;
  top: 30px;
  display: block;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  background-image: url('../../../static/img/notSelect.png');
  background-size: 20px;
}
.selected::after{
  background-image: url('../../../static/img/selected.png') !important;
}
.cart_item_img{
  height: 85px;
  width: 75px;
  position: absolute;
  top: 0;
  left: 50px;
}
.cart_item_img img{
  width: 75px;
  height: 75px;
}
.cart_item_info{
  width: 100%;
  height: 85px;
  padding-left: 135px;
  box-sizing: border-box;
  position: relative;
}
.cart_item_title{
  text-align: left;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-weight: 700;
  font-size: 14px;
}
.goods_line{
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding-left: 135px;
}
.goods_line>div{
  float: left;
  height: 100%;
}
.goods_price{
  width: 40%;
  line-height: 30px;
  color: #e4393c;
  font-size: 10px;
  text-align: left;
}
.int{
  font-size: 16px;
  font-style: normal;
}
.num_and_more{
  width: 60%;
}
.num_wrap{
  position: relative;
  display: block;
  width: 107px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f7f7f7;
}
.minus{
  position: relative;
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.minus::after{
  position: absolute;
  left: 50%;
  top: 50%;
  content: "";
  display: block;
  width: 16px;
  height: 2px;
  margin: -1px 0 0 -8px;
  background: #999;
  border-radius: 1px;
}
.disabled::after{
  background: hsla(0,0%,80%,.3);
}
.input_wrap{
  float: left;
  position: relative;
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
}
.num{
  height: 30px;
  font-size: 12px;
  color: #999;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
  -webkit-appearance: none;
  border: none;
  width: 45px;
  font-size: 14px;
  text-align: center;
  background: none;
  -webkit-border-radius: 0;
}
.plus{
  float: right;
  position: relative;
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.num_wrap .plus:before {
  width: 2px;
  height: 16px;
  margin: -8px 0 0 -1px;
  border-radius: 1px;
}
.plus::before{
  position: absolute;
  left: 50%;
  top: 50%;
  content: "";
  display: block;
  width: 16px;
  height: 2px;
  margin: -1px 0 0 -8px;
  background: #999;
  border-radius: 1px;
}
.plus::after{
  position: absolute;
  left: 50%;
  top: 50%;
  content: "";
  display: block;
  width: 16px;
  height: 2px;
  margin: -1px 0 0 -8px;
  background: #999;
  border-radius: 1px;
}
.cart_item_del{
  text-align: right;
  padding-top: 10px;
  padding-right: 20px;
  font-size: 12px;
  color: #808080;
}
.payBar{
  width: 100%;
  height: 50px;
  background: hsla(0,0%,100%,.95);
  position: fixed;
  bottom: 50px;
  color: #333;
  font-size: 14px;
  z-index: 99;
  border-bottom: 1px solid #d8d8d8;
  box-sizing: border-box;
}
.payBar::before{
  content: "";
  height: 0;
  display: block;
  border-top: 1px solid #ddd;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
.payBar_content{
  position: relative;
  height: 100%;
  padding-left: 70px;
  padding-right: 100px;
  box-sizing: border-box;
}
.icon_select_all{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 100%;
}
.icon_select_all::after{
  content: "";
  position: absolute;
  left: 25px;
  top: 15px;
  display: block;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  background-image: url('../../../static/img/notSelect.png');
  background-size: 20px;
}
.pay_btn{
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #d7d7d7;
  line-height: 50px;
  color: #999;
  font-size: 16px;
}
.buy{
  background-color: #f23030;
  color: #fff;
}
.pay_btn em{
  font-size: 12px !important;
}
.pay_txt{
  width: 100%;
  height: 100%;
  font-size: 16px;
  text-align: left;
  font-weight: 700;
  line-height: 50px;
}
.total_price{
  color: #f23030;
}
.mask{
  width: 100%;
  background-color: rgba(0,0,0,.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
}
</style>
