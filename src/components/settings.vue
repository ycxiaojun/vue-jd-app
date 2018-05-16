<template>
  <div class="settingbg">
    <mt-popup position="right" class="setting_page" v-model="isSettingShow">
      <header class="settingHeader">
        <div class="settingHeaderContent">
          账号设置
          <div class="settingBack" @click="goBack()">
            <img src="static/img/arrow_left.png" alt="">
          </div>
        </div>
      </header>
      <div class="settingContent">
        <section class="account_section">
          <h3 class="account_title">当前登录账号</h3>
          <div class="account_card">
            <div class="account_card_profile">
              <img src="static/img/head.png" alt="">
            </div>
            <div class="account_card_info">
              <p class="account_card_name">
                <span class="account_card_name_text">
                  {{userName}}
                </span>
              </p>
              <p class="account_card_email">邮箱：未设置</p>
            </div>
          </div>
          <ul class="account_manage">
            <li v-for="(item, index) in accountList" :key="index">
              <a href="javascript:;" class="account_manage_item">{{item}}</a>
            </li>
          </ul>
        </section>
        <div class="footerNav">
          <a href="javascript:;">
            <img src="static/img/footerNav-1.png" alt="">
            <span>意见反馈</span>
          </a>
          <a href="javascript:;">
            <img src="static/img/footerNav-2.png" alt="">
            <span>京东客户端</span>
          </a>
          <a href="javascript:;" class="login_out" @click="loginOut()">
            <img src="static/img/footerNav-3.png" alt="">
            <span>退出登陆</span>
          </a>
        </div>
        <div class="footerLogoImg"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import titlebar from '@/components/titlebar.vue'
import { Indicator } from 'mint-ui'
export default{
  data () {
    return {
      isSettingShow: false,
      accountList: ['修改登录密码', '绑定手机号码', '支付密码管理', '收货地址管理', '切换站点', '实名认证', '关联账号']
    }
  },
  computed: {
    settingShow: function () {
      return this.$store.state.settingShow
    },
    userName: function () {
      return this.$store.state.userName
    }
  },
  watch: {
    settingShow: function () {
      this.isSettingShow = this.settingShow
    }
  },
  components: {
    titlebar
  },
  methods: {
    goBack: function () {
      this.$store.state.settingShow = false
    },
    loginOut: function () {
      let storage = window.localStorage
      let _this = this
      _this.$store.state.settingShow = false
      Indicator.open({
        text: '正在退出登录...',
        spinnerType: 'fading-circle'
      })
      setTimeout(function () {
        Indicator.close()
        storage.removeItem('loginUserName')
        _this.$store.state.isLogin = false
        _this.$store.state.selectTab = 'mine'
        _this.$store.state.titleName = '京东登陆'
        _this.$store.state.loginTab = true
      }, 2000)
    }
  }
}
</script>
<style>
.settingbg,.setting_page{
  width: 100%;
  height: 100%;
}
.setting_page{
  background-color: #efefef;
}
.settingHeader{
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #efefef;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2000;
}
.settingHeaderContent{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #454545;
  font-size: 18px;
}
.settingBack{
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.settingBack img{
  width: 32px;
  height: auto;
  vertical-align: middle;
}
.settingContent{
  widows: 100%;
  overflow: hidden;
  margin: 44px 0 50px;
  background-color: #efefef;
  text-align: left;
}
.account_section{
  background: #fff;
  position: relative;
  margin: -1px 0 15px;
  overflow: hidden;
}
.account_title{
  font-size: 14px;
  font-weight: 400;
  margin: 0 10px;
  padding: 12px 0;
  position: relative;
}
.account_title::after{
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #e5e5e5;
  height: 1px;
  left: 0;
  right: 0;
  bottom: 0;
}
.account_card{
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 12px 10px;
  font-size: 14px;
}
.account_card_profile{
  margin-top: -2px;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
}
.account_card_profile img{
  display: block;
  width: 100%;
  border-radius: 100%;
}
.account_card_info{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
}
.account_card_name{
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.account_card_name_text{
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 1;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.account_card_email{
  margin-top: 5px;
  color: #999;
}
.account_manage{
  position: relative;
}
.account_manage_item{
  display: block;
  position: relative;
  height: 44px;
  line-height: 44px;
  margin-left: 10px;
  padding-right: 40px;
  font-size: 14px;
  color: #999;
}
.account_manage_item::before{
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #e5e5e5;
  height: 1px;
  left: 0;
  right: 0;
  top: 0;
}
.account_manage_item::after{
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  border-top: 1px solid #666;
  border-left: 1px solid #666;
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  position: absolute;
  top: 50%;
  margin-top: -6px;
  right: 20px;
}
.footerNav{
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 10px 0 0;
}
.footerNav a{
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #666;
  background-color: white;
  margin-left: 10px;
  padding: 6px 0;
  position: relative;
}
.footerNav a img{
  width: 18px;
  height: 18px;
  padding-right: 3px;
  display: inline-block;
}
.footerNav a span{
  position: relative;
  top: -4px;
  right: 0px;
}
.login_out{
  margin-right: 10px;
}
.footerLogoImg{
  display: block;
  margin: 30px auto 20px;
  width: 100px;
  height: 20px;
  background: url('../../static/img/footerLogo.png') no-repeat;
  background-size: 100%;
}
</style>
