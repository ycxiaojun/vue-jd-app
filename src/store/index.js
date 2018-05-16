import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  selectTab: 'index',
  tabShow: true,
  productListIndex: 0,
  productIndex: 0,
  toProduct: '',
  productSwipeShow: true,
  sortSelected: 0,
  isLogin: false,
  titleName: '京东登录',
  loginTab: true,
  settingShow: false,
  userName: '',
  loginStorage: false
}

export default new Vuex.Store({
  state
})
