<template>
  <div class="login-floor">
    <div class="login-tab">
      <div>
        <span :class="{loginTabChoose: isLoginTab}" @click="chooseLoginTab(0)">账号密码登陆</span>
      </div>
      <div>
        <span :class="{loginTabChoose: !isLoginTab}" @click="chooseLoginTab(1)">手机号注册</span>
      </div>
    </div>
    <div class="login-page">
      <div class="login-input" v-show="isLoginTab">
        <div class="input-container">
          <div class="txt-input">账号</div>
          <input type="text" id="username" class="acc-input" placeholder="用户名/邮箱/已验证手机" @focus="clearShow(0)" @blur="clearClose(0)" v-model="usernameValue">
          <i class="icon-clear" v-show="usernameIcon" @click="clearValue(0)"></i>
        </div>
        <div class="input-container">
          <div class="txt-input">密码</div>
          <input type="password" id="password" class="acc-input" placeholder="请输入密码" @focus="clearShow(1)" @blur="clearClose(1)" v-model="passwordValue">
          <i class="icon-clear" v-show="passwordIcon" @click="clearValue(1)"></i>
        </div>
        <div class="input-container">
          <div class="verificateCode">
            <div class="txt-input">验证码</div>
            <input type="text" class="ver-input" id="verificateCode" placeholder="请输入验证码" @focus="clearShow(2)" @blur="clearClose(2)" v-model="verificateValue">
            <i class="icon-clear ver-icon" v-show="verificateIcon" @click="clearValue(2)"></i>
          </div>
          <div class="ver-msg">
            <div class="ver-msg-txt">
              <span @click="setVerificateCode()">{{verificateCodeNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="register-input" v-show="!isLoginTab">
        <div class="input-container">
          <div class="txt-input">手机号</div>
          <input type="text" class="ver-input" id="phone" placeholder="请输入11位手机号" @focus="clearShow(3)" @blur="clearClose(3)" v-model="phoneNum">
          <i class="icon-clear" v-show="phoneIcon" @click="clearValue(3)"></i>
        </div>
        <div class="input-container">
          <div class="txt-input">密码</div>
          <input type="password" class="ver-input" id="loginPsd" placeholder="请输入密码" @focus="clearShow(4)" @blur="clearClose(4)" v-model="loginPsdValue">
          <i class="icon-clear" v-show="loginPsdIcon" @click="clearValue(4)"></i>
        </div>
        <div class="input-container">
          <div class="txt-input">确认密码</div>
          <input type="password" class="ver-input" id="loginConfirmPsd" placeholder="请确认密码" @focus="clearShow(5)" @blur="clearClose(5)" v-model="loginConfirmPsdValue">
          <i class="icon-clear" v-show="loginConfirmPsdIcon" @click="clearValue(5)"></i>
        </div>
        <div class="input-container">
          <div class="verificateCode">
            <div class="txt-input">验证码</div>
            <input type="text" class="ver-input" id="loginVerificate" placeholder="请输入验证码" @focus="clearShow(6)" @blur="clearClose(6)" v-model="loginVerificateValue">
            <i class="icon-clear ver-icon" v-show="loginVerificateIcon" @click="clearValue(6)"></i>
          </div>
          <div class="ver-msg">
            <div class="ver-msg-txt">
              <span @click="setVerificateCode()">{{verificateCodeNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="formBtn" id="loginbtn" :class="{loginbtnShow: isLoginbtnShow}" v-show="isLoginTab" @click="checkLoginForm()">登陆</div>
      <div class="formBtn" id="registerbtn" :class="{loginbtnShow: isRegisterBtnShow}" v-show="!isLoginTab" @click="checkRegisterForm()">注册</div>
      <div class="quick-nav" v-show="isLoginTab">
        <span @click="alertToast()">忘记密码</span>
      </div>
      <div class="quick-login" v-show="isLoginTab">
        <h4 class="txt-otherLogin">其他登陆方式</h4>
        <div class="otherLoginIcon">
          <div>
            <img src="static/img/QQ.png" alt="qq登录"  @click="alertToast()">
          </div>
          <div>
            <img src="static/img/wx.png" alt="微信登录"  @click="alertToast()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui'
export default{
  data () {
    return {
      usernameIcon: false,
      passwordIcon: false,
      verificateIcon: false,
      phoneIcon: false,
      loginPsdIcon: false,
      loginConfirmPsdIcon: false,
      loginVerificateIcon: false,
      usernameValue: '',
      passwordValue: '',
      verificateValue: '',
      verificateCodeNum: '',
      phoneNum: '',
      loginPsdValue: '',
      loginConfirmPsdValue: '',
      loginVerificateValue: '',
      loginbtnShow: false
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.setVerificateCode()
    })
  },
  computed: {
    isLoginbtnShow: function () {
      if (this.usernameValue !== '' && this.passwordValue !== '' && this.verificateValue !== '') {
        return true
      } else {
        return false
      }
    },
    isRegisterBtnShow: function () {
      if (this.phoneNum !== '' && this.loginPsdValue !== '' && this.loginConfirmPsdValue !== '' && this.loginVerificateValue !== '') {
        return true
      } else {
        return false
      }
    },
    isLoginTab: function () {
      return this.$store.state.loginTab
    }
  },
  watch: {
    isLoginbtnShow: function () {
      if (this.isLoginbtnShow) {
        this.loginbtnShow = this.isLoginbtnShow
      } else {
        this.loginbtnShow = false
      }
    }
  },
  methods: {
    chooseLoginTab: function (index) {
      if (index === 0) {
        this.$store.state.loginTab = true
        this.$store.state.titleName = '京东登录'
      } else {
        this.$store.state.loginTab = false
        this.$store.state.titleName = '京东注册'
      }
    },
    clearShow: function (name) {
      if (name === 0) {
        this.usernameIcon = true
      } else if (name === 1) {
        this.passwordIcon = true
      } else if (name === 2) {
        this.verificateIcon = true
      } else if (name === 3) {
        this.phoneIcon = true
      } else if (name === 4) {
        this.loginPsdIcon = true
      } else if (name === 5) {
        this.loginConfirmPsdIcon = true
      } else {
        this.loginVerificateIcon = true
      }
    },
    clearClose: function (name) {
      if (name === 0) {
        this.usernameIcon = false
      } else if (name === 1) {
        this.passwordIcon = false
      } else if (name === 2) {
        this.verificateIcon = false
      } else if (name === 3) {
        this.phoneIcon = false
      } else if (name === 4) {
        this.loginPsdIcon = false
      } else if (name === 5) {
        this.loginConfirmPsdIcon = false
      } else {
        this.loginVerificateIcon = false
      }
    },
    clearValue: function (name) {
      if (name === 0) {
        this.usernameValue = ''
      } else if (name === 1) {
        this.passwordValue = ''
      } else if (name === 2) {
        this.verificateValue = ''
      } else if (name === 3) {
        this.phoneNum = ''
      } else if (name === 4) {
        this.loginPsdValue = ''
      } else if (name === 5) {
        this.loginConfirmPsdValue = ''
      } else {
        this.loginVerificateValue = ''
      }
    },
    clearAllValue: function () {
      this.usernameValue = this.passwordValue = this.verificateValue = this.verificateCodeNum = this.phoneNum = this.loginPsdValue = this.loginConfirmPsdValue = this.loginVerificateValue = ''
      this.setVerificateCode()
    },
    setVerificateCode: function () {
      this.verificateCodeNum = ''
      for (let i = 0; i < 6; i++) {
        this.verificateCodeNum += Math.floor(Math.random() * 10)
      }
    },
    alertToast: function () {
      Toast({
        message: '暂无此功能',
        position: 'middle',
        duration: 1200
      })
    },
    checkLoginForm: function () {
      if (this.isLoginbtnShow) {
        this.checkVerificate(this.verificateValue)
      }
    },
    checkVerificate: function (item) {
      if (item !== this.verificateCodeNum) {
        Toast({
          message: '验证码错误',
          position: 'middle',
          duration: 1500
        })
        this.setVerificateCode()
      } else {
        if (item === this.verificateValue) {
          this.checkLoginName()
        } else {
          this.checkRegisterName()
        }
      }
    },
    checkLoginName: function () {
      let storage = window.localStorage
      let username = storage.getItem('userData')
      if (this.usernameValue !== username) {
        Toast({
          message: '登录名错误或未注册',
          position: 'middle',
          duration: 1500
        })
        this.setVerificateCode()
      } else {
        this.checkLoginPassword()
      }
    },
    checkLoginPassword: function () {
      let storage = window.localStorage
      let password = storage.getItem('passwordData')
      let _this = this
      if (this.passwordValue !== password) {
        Toast({
          message: '密码错误',
          position: 'middle',
          duration: 1500
        })
        this.setVerificateCode()
      } else {
        Indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        })
        setTimeout(function () {
          Indicator.close()
          Toast({
            message: '登录成功',
            position: 'middle',
            duration: 1500
          })
          _this.$store.state.isLogin = true
          _this.$store.state.selectTab = 'mine'
          _this.$store.state.titleName = '我的京东'
          storage.setItem('loginUserName', _this.usernameValue)
          _this.$store.state.userName = _this.usernameValue
          _this.clearAllValue()
        }, 2000)
      }
    },
    checkRegisterForm: function () {
      if (this.isRegisterBtnShow) {
        this.checkVerificate(this.loginVerificateValue)
      }
    },
    checkRegisterName: function () {
      let len = this.phoneNum.length
      if (len !== 11) {
        Toast({
          message: '手机号码长度应为11位',
          position: 'middle',
          duration: 1500
        })
        this.setVerificateCode()
      } else {
        this.checkRegisterPassword()
      }
    },
    checkRegisterPassword: function () {
      let len = this.loginPsdValue.length
      let storage = window.localStorage
      let _this = this
      if (len < 6 || len > 18) {
        Toast({
          message: '密码长度应为6~18位',
          position: 'middle',
          duration: 1500
        })
        this.setVerificateCode()
      } else {
        if (this.loginPsdValue !== this.loginConfirmPsdValue) {
          Toast({
            message: '两次输入的密码不相等',
            position: 'middle',
            duration: 1500
          })
          this.setVerificateCode()
        } else {
          Indicator.open({
            text: '注册中...',
            spinnerType: 'fading-circle'
          })
          setTimeout(function () {
            Indicator.close()
            Toast({
              message: '注册成功',
              position: 'middle',
              duration: 1500
            })
            _this.$store.state.isLogin = true
            _this.$store.state.selectTab = 'mine'
            _this.$store.state.titleName = '我的京东'
            storage.setItem('loginUserName', _this.phoneNum)
            storage.setItem('userData', _this.phoneNum)
            storage.setItem('passwordData', _this.loginPsdValue)
            _this.$store.state.userName = _this.phoneNum
            _this.clearAllValue()
          }, 2000)
        }
      }
    }
  }
}
</script>
<style>
.login-floor{
  margin-top: 50px;
  width: 100%;
  overflow: hidden;
}
.login-tab{
  display: block;
  border-bottom: 1px solid #d7d7d7;
  width: 100%;
  height: 45px;
  line-height: 42px;
  font-size: 14px;
}
.login-tab div{
  width: 50%;
  height: 100%;
  float: left;
}
.login-tab div span{
  padding: 14px;
}
.loginTabChoose{
  border-bottom: 2px solid #f23030;
}
.login-page{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.login-input,.register-input{
  display: block;
}
.input-container{
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  overflow: hidden;
  background-color: #fff;
  border-bottom: 1px solid #d7d7d7;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.txt-input{
  position: absolute;
  width: 60px;
  display: inline-block;
  text-align: left;
  left: 10px;
  font-size: 14px;
}
.acc-input{
  width: 100%;
  padding: 0 30px 0 60px;
  height: 19px;
}
input{
  border-radius: 0;
  border: 0;
  display: inline-block;
  box-sizing: border-box;
  outline: 0;
  font-size: 13px;
}
.icon-clear{
  width: 22px;
  height: 22px;
  display: block;
  position: absolute;
  top: 12px;
  right: 8px;
  background: url("../../static/img/clear.png") center no-repeat;
  background-size: 22px;
}
.verificateCode{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 90px 0 10px;
  position: relative;
}
.ver-input{
  width: 100%;
  height: 20px;
  vertical-align: middle;
  padding-left: 80px;
}
.ver-msg{
  width: 90px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  box-sizing: border-box;
  padding: 10px;
}
.ver-msg-txt{
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  line-height: 28px;
  font-size: 16px;
  font-weight: 600;
}
.ver-icon{
  right: 95px;
}
input::-webkit-input-placeholder{
  color: #ccc;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color: #ccc;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color: #ccc;
}
.formBtn{
  margin-top: 20px;
  width: 100%;
  height: 45px;
  background-color: #e2e2e2;
  border-radius: 2px;
  border: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 45px;
  color: #848689;
  letter-spacing: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.loginbtnShow{
  color: #fff !important;
  background-color: #f23030 !important;
}
.quick-nav{
  overflow: hidden;
  margin-top: 20px;
}
.quick-login{
  margin-top: 50px;
  width: 100%;
  border-top: 1px solid #d7d7d7;
  position: relative;
}
.txt-otherLogin{
  position: absolute;
  top: -14px;
  left: 50%;
  font-size: 13px;
  background-color: #f2f2f2;
  color: #bfbfbf;
  padding: 5px 15px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.otherLoginIcon{
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding: 20px 30px;
  margin-top: 40px;
}
.otherLoginIcon div{
  width: 50%;
  overflow: hidden;
  float: left;
}
.otherLoginIcon div img{
  height: 30px;
  width: auto;
}
</style>
