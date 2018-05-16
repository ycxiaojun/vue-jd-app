<template>
  <div class="myself">
    <div class="header-wrap">
      <div class="header-wrap-bg">
        <div class="header-wrap-main">
          <div class="my-header-avatar">
            <div class="my-header-avatar-img">
              <img src="static/img/596dd62bN7a8affc5.png" alt="">
            </div>
          </div>
          <div class="my-header-msg">
            <div class="my-header-nickname">
              <span class="my-header-nickname-txt">
                {{userName}}
              </span>
              <i class="my-header-nickname-edit"></i>
            </div>
            <div class="my-header-username">用户名：{{userName}}</div>
            <div class="my-header-info">
              <a href="javascript:;" class="my-header-level"></a>
              <a href="javascript:;" class="my-header-link">京享值：0</a>
              <a href="javascript:;" class="my-header-vipplusitem">
                <div class="my-header-plus-btn">尊享8大特权</div>
              </a>
            </div>
          </div>
          <a href="javascript:;" class="my-header-settings" @click="toSetting()">账号管理</a>
        </div>
      </div>
    </div>
    <section class="my_section" id="myOrderList">
      <div class="my_order">
        <a href="javascript:;" class="my_order_entrances" v-for="(item, index) in orderListData" :key="index" :style="{backgroundImage: 'url(static/img/'+item.img+')'}" @click="nolink()">
          <span>{{item.text}}</span>
        </a>
      </div>
    </section>
    <section class="my_section" id="myWallet">
      <div class="my_assets">
        <a href="javascript:;" class="my_assets_entrances" v-for="(item, index) in assetsData" :key="index" @click="nolink()">
          <p class="my_assets_entrances_detail">
            <span class="my_assets_entrances_detail_num">0</span>
            {{item.text}}
          </p>
          <p class="my_assets_entrances_title">{{item.title}}</p>
        </a>
        <a href="javascript:;" class="my_assets_entrances all_assets" @click="nolink()">
          <p class="my_assets_entrances_title">全部资产</p>
        </a>
      </div>
    </section>
    <section class="my_section">
      <div class="my_lnks">
        <a href="javascript:;" class="my_lnks_item" @click="nolink()">
          <span class="my_lnks_num">0</span>
          关注的商品
        </a>
        <a href="javascript:;" class="my_lnks_item" @click="nolink()">
          <span class="my_lnks_num">0</span>
          关注的店铺
        </a>
        <a href="javascript:;" class="my_lnks_item" @click="nolink()">
          <span class="my_lnks_num">0</span>
          浏览记录
        </a>
      </div>
    </section>
    <section class="my_section">
      <ul class="my_cate">
        <li class="my_cate_item" v-for="(item, index) in myCataData" :key="index">
          <a href="javascript:;" class="my_cate_item_url" @click="nolink()">
            <span class="my_cate_item_logo">
              <img :src="'static/img/'+item.img" alt="">
            </span>
            <p class="my_cate_item_name">{{item.text}}</p>
          </a>
        </li>
      </ul>
    </section>
    <section class="my_section">
      <a href="javascript:;" class="head_help" @click="nolink()">
        <em class="help">客户服务</em>
      </a>
    </section>
    <settings></settings>
  </div>
</template>
<script>
import settings from '@/components/settings.vue'
import { Toast } from 'mint-ui'
export default{
  data () {
    return {
      orderListData: [{'text': '代付款', 'img': 'orderList-1.png'}, {'text': '待收货', 'img': 'orderList-2.png'}, {'text': '退换/售后', 'img': 'orderList-3.png'}, {'text': '全部订单', 'img': 'orderList-4.png'}],
      assetsData: [{'text': '张', 'title': '京东券'}, {'text': '元', 'title': '白条额度'}, {'text': '个', 'title': '京豆'}, {'text': '张', 'title': '礼品卡'}],
      myCataData: [{'text': '用户福利', 'img': 'my_cata-1.png'}, {'text': '京东火车票', 'img': 'my_cata-2.png'}, {'text': '我的预约', 'img': 'my_cata-3.png'}, {'text': '应用推荐', 'img': 'my_cata-4.png'}, {'text': '京东通讯营业厅', 'img': 'my_cata-5.png'}, {'text': '京东机票', 'img': 'my_cata-6.png'}, {'text': '京东酒店', 'img': 'my_cata-7.png'}],
      nickName: ''
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  computed: {
    userName: function () {
      return this.$store.state.userName
    }
  },
  components: {
    settings
  },
  methods: {
    toSetting: function () {
      this.$store.state.settingShow = true
    },
    nolink: function () {
      Toast({
        message: '暂无此功能！',
        position: 'middle',
        duration: 1200
      })
    }
  }
}
</script>
<style>
.myself{
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
}
.header-wrap{
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
}
.header-wrap-bg{
  overflow: hidden;
  position: relative;
  border-radius: 6px;
  font-size: 12px;
  color: #fff;
  background: -webkit-linear-gradient(left,#eb3c3c,#ff7459);
  background: linear-gradient(90deg,#eb3c3c,#ff7459);
  box-shadow: 0 2px 5px rgba(255,98,98,.4);
}
.header-wrap-main{
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 25px 15px;
}
.my-header-avatar{
  position: relative;
  margin-right: 10px;
  width: 60px;
  height: 60px;
  border: 1px solid hsla(0,0%,100%,.4);
  border-radius: 60px;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
}
.my-header-msg{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  min-width: 0;
  text-align: left !important;
}
.my-header-avatar-img{
  overflow: hidden;
  border-radius: 60px;
  padding-top: 100%;
}
.my-header-avatar-img img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 60px;
  border: 0 none;
  vertical-align: top;
}
.my-header-nickname{
  position: relative;
  font-size: 14px;
  margin-right: 20px;
  white-space: nowrap;
}
.my-header-nickname-txt{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
}
.my-header-nickname-edit{
  display: inline-block;
  margin: 0 0 0 4px;
  width: 12px;
  height: 12px;
  vertical-align: middle;
  background: url('../../static/img/edit.png');
  background-size: 12px;
}
.my-header-username{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 3px;
  color: hsla(0,0%,100%,.7);
}
.my-header-info{
  margin-top: 6px;
}
.my-header-level{
  position: relative;
  display: inline-block;
  vertical-align: middle;
  padding: 0 6px 0 10px;
  height: 16px;
  line-height: 16px;
  margin: 0 3px 0 8px;
  font-size: 10px;
  color: #fff;
  border-radius: 0 12px 12px 0;
  background-color: #9f3838;
}
.my-header-level::before{
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  left: -10px;
  top: 50%;
  margin-top: -10px;
  background: url('../../static/img/icon_vip.png') no-repeat 0 0;
  background-size: 100px 20px;
}
a{
  text-decoration: none;
}
a:hover{
  text-decoration: none;
}
.my-header-level::after{
  content: "铜牌";
}
.my-header-link{
  max-width: 120px;
  position: relative;
  display: inline-block;
  margin-right: 3px;
  padding: 0 16px 0 7px;
  height: 15px;
  line-height: 15px;
  vertical-align: middle;
  border-radius: 15px;
  font-size: 10px;
  color: #fff;
  background-color: rgba(180,50,27,.3);
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.my-header-link::before{
  content: "";
  position: relative;
  top: 2px;
  margin-right: 4px;
  display: inline-block;
  width: 11px;
  height: 10px;
  background: url('../../static/img/enjoy.png');
  background-size: 100% 100%;
}
.my-header-link::after{
  content: "";
  display: block;
  width: 4px;
  height: 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  position: absolute;
  right: 8px;
  top: 5px;
}
.my-header-vipplusitem{
  padding: 18px 10px 15px 4px;
  background-position: 4px 4px;
  position: absolute;
  right: -2px;
  bottom: -8px;
  -webkit-transform: rotate(11deg);
  transform: rotate(11deg);
  padding: 18px 15px 15px 8px;
  border-top-left-radius: 4px;
  box-shadow: -1px -1px 6px #c6934d;
  background: #333 url('../../static/img/vipplus.png') no-repeat 8px 4px;
  background-size: 50px;
}
.my-header-plus-btn{
  position: relative;
  padding: 0 8px 0 5px;
  height: 12px;
  line-height: 12px;
  border-radius: 12px;
  font-size: 7px;
  color: #cead68;
  background-color: hsla(0,0%,85%,.1);
}
.my-header-plus-btn::before{
  right: -100%;
  bottom: -100%;
  -webkit-transform: scale(.5);
  -webkit-transform-origin: 0 0;
  border-radius: 24px;
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #535353;
  border: 1px solid #ddd;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: none;
  border-color: #535353;
  border-radius: 12px;
}
.my-header-plus-btn::after{
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-top: 1px solid #cead68;
  border-left: 1px solid #cead68;
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
  position: absolute;
  right: 4px;
  top: 4px;
}
.my-header-settings{
  position: absolute;
  top: 12px;
  right: 15px;
  padding-left: 18px;
  color: rgba(76,0,0,.7);
  background: url('../../static/img/settings.png') no-repeat 0;
  background-size: 13px;
}
.my_section{
  position: relative;
  margin: 15px 0;
  background: #fff;
}
.my_order,.my_assets{
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.my_order_entrances{
  position: relative;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 42px 0 12px;
  text-align: center;
  font-size: 12px;
  color: #666;
  background: no-repeat center 16px;
  background-size: 20px;
  text-decoration: none;
}
.my_assets_entrances{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  position: relative;
  padding: 16px 0 11px;
  text-align: center;
}
.my_assets_entrances_detail{
  margin-bottom: 8px;
  line-height: 18px;
  font-size: 10px;
  color: #e93b3d;
  vertical-align: baseline;
}
.my_assets_entrances_detail_num{
  font-size: 16px;
}
.my_assets_entrances_title{
  font-size: 12px;
  color: #666;
}
.all_assets{
  padding: 43px 0 11px !important;
  -webkit-background-size: 20px !important;
  background-size: 20px !important;
  background: url('../../static/img/allAssets.png') no-repeat center 14px;
}
.my_lnks{
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #fff;
}
.my_lnks_item{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 11px 0 12px;
  text-align: center;
  font-size: 12px;
  color: #666;
}
.my_lnks_num{
  position: relative;
  display: block;
  width: -webkit-fit-content;
  width: fit-content;
  height: 24px;
  margin: 0 auto 3px;
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.my_cate{
  position: relative;
  padding-top: 13px;
  overflow: hidden;
}
ul, li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.my_cate_item{
  box-sizing: border-box;
  float: left;
  width: 25%;
}
.my_cate_item_url{
  position: relative;
  display: block;
  padding-bottom: 10px;
}
.my_cate_item_logo{
  display: block;
  margin: 0 auto 7px;
  width: 20px;
  height: 20px;
}
.my_cate_item_logo img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}
.my_cate_item_name{
  font-size: 12px;
  color: #666;
  text-align: center;
}
.head_help{
  position: relative;
  display: block;
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  padding: 0 10px;
  text-align: left;
}
.help{
  font-style: normal;
  color: #333;
}
.head_help::after{
  content: "";
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
  width: 25px;
  height: 25px;
  background-image: url('../../static/img/arrow_left.png');
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -13px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -webkit-transform: rotate(180deg); /* Safari and Chrome */
}
</style>
