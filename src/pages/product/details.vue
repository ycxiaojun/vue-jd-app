<template>
  <div class="productDetail">
    <div class="detail-tab">
      <ul class="detail-tab-ul">
        <li class="detail-tab-item" v-for="(item, index) in detailTabData" :key="index" :class="{detailTabSelect: detailTabSelectIndex == index}" @click="detailsTabSelect(index)">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="prod-intro" :class="{tabShow: detailTabSelectIndex == 0}">
      <ul>
        <li v-for="(item, index) in introData" :key="index">
          <img v-lazy="item" alt="">
        </li>
      </ul>
      <img src="static/img/product/intro-5.jpg" alt="">
    </div>
    <div class="prod-param" :class="{tabShow: detailTabSelectIndex == 1}">
      <table class="table-border" width="100%">
        <tbody>
          <tr>
            <td colspan="2">
              <strong>存储</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[0]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>基本信息</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[1]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>手机特性</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[2]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>后置摄像头</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[3]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>数据接口</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[4]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>辅助功能</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[5]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>屏幕</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[6]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>主芯片</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[7]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>前置摄像头</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[8]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>网络支持</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[9]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>电池信息</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[10]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>主体</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[11]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
          <tr>
            <td colspan="2">
              <strong>操作系统</strong>
            </td>
          </tr>
          <tr v-for="(value, key) in paramData[12]" :key="key">
            <td>{{key}}</td>
            <td>{{value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="prod-pack" :class="{tabShow: detailTabSelectIndex == 2}">
      <div class="pack-gray"></div>
      <div class="pack-content">
        <div class="pack-box-title">
          <span class="pack-box-title-text">包装清单</span>
        </div>
        <div class="pack-box-content">
          采用 Lightning 接头的 EarPods *1，iPhone *1，Lightning 至 USB 连接线*1，5W USB 电源适配器*1，Lightning 至3.5毫米耳机插孔转换器*1
        </div>
      </div>
      <div class="pack-gray"></div>
      <div class="pack-content">
        <div class="pack-box-title">
          <span class="pack-box-title-text">售后服务</span>
        </div>
        <div class="pack-box-content">
          本产品全国联保，享受三包服务，质保期为：一年质保
          <br>
          如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，15日内换货，15日以上在质保期内享受免费保修等三包服务！
          <br>
          售后服务电话：400-666-8800
          <br>
          品牌官方网站：https://www.apple.com/cn/
          <br>
        </div>
      </div>
      <div class="pack-gray"></div>
      <div class="pack-content">
          <div class="pack-box-title">
            <span class="pack-box-title-text">价格说明</span>
          </div>
          <div class="pack-box-content">
            1、京东价：京东价为商品的销售价，是您最终决定是否购买商品的依据。
            <br>
            2、划线价：商品展示的划横线价格为参考价，并非原价，该价格可能是品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价（如厂商指导价、建议零售价等）或该商品在京东平台上曾经展示过的销售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价等可能会与您购物时展示的不一致，该价格仅供您参考。
            <br>
            3、折扣：如无特殊说明，折扣指销售商在原价、或划线价（如品牌专柜标价、商品吊牌价、厂商指导价、厂商建议零售价）等某一价格基础上计算出的优惠比例或优惠金额；如有疑问，您可在购买前联系销售商进行咨询。
            <br>
            4、异常问题：商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。
            <br>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Lazyload } from 'mint-ui'
export default {
  data () {
    return {
      toJSON: '',
      detailTabData: ['商品介绍', '规格参数', '包装售后'],
      detailTabSelectIndex: 0,
      introData: ['static/img/product/intro-1.jpg', 'static/img/product/intro-2.jpg', 'static/img/product/intro-3.jpg', 'static/img/product/intro-4.jpg'],
      paramData: [
        {'ROM': '64GB', 'RAM': '其他', '存储卡': '不支持'},
        {'机身长度 (mm）': '158.4', '机身宽度 (mm）': '78.1', '机身厚度 (mm）': '7.5', '机身重量 (g）': '202', '输入方式': '触控', '运营商标志或内容': '其他', '机身材质分类': '其他', '机身颜色': '红色'},
        {'指纹识别': '支持', 'GPS': '支持', '陀螺仪': '其他'},
        {'摄像头数量': '2个', '后置摄像头': '1200万像素'},
        {'数据传输接口1': 'WIFI', '数据传输接口2': '蓝牙', '数据传输接口3': 'WiFi热点', 'NFC/NFC模式': '其他', '耳机接口类型': 'Lightning', '充电接口类型': 'Lightning（iPhone）'},
        {'常用功能': '其他'},
        {'主屏幕尺寸(英寸）': '5.5英寸', '分辨率': '其他', '屏幕材质类型': '其他'},
        {'CPU品牌': '以官网信息为准', 'CPU核数': '其他', 'CPU型号': '其他', 'CPU频率': '以官网信息为准'},
        {'前摄光圈大小': 'f/2.2', '前置摄像头': '700万像素'},
        {'双卡机类型': '单卡', '最大支持SIM卡数量': '1个', 'SIM卡类型': 'Nano SIM', '4G网络1': '4G：移动（TD-LTE)', '4G网络2': '4G：电信(FDD-LTE)', '4G网络3': '4G：联通(TD-LTE)', '3G/2G网络': '--', '网络频率 (2G/3G）': '--', '是否支持同时使用联通卡': '不支持'},
        {'电池容量 (mAh）': '以官网信息为准', '电池是否可拆卸': '否', '充电器': '其他'},
        {'品牌': 'Apple', '型号': 'iPhone 8 Plus', '上市年份': '2018年', '上市月份': '4月', '入网型号': 'A1864'},
        {'操作系统': 'ios'}
      ]
    }
  },
  methods: {
    detailsTabSelect (index) {
      this.detailTabSelectIndex = index
    }
  }
}
</script>
<style>
.productDetail{
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
.productDetail>div{
  width: 100%;
  overflow: hidden;
}
.detail-tab{
  height: 40px;
  border-bottom: 1px solid #e0e0e0;
}
.detail-tab-ul{
  width: 100%;
  height: 100%;

}
.detail-tab-item{
  width: 33.33%;
  height: 100%;
  float: left;
  font-size: 14px;
  line-height: 40px;
  color: #707070;
}
.detailTabSelect{
  color: #f23030;
}
.tabShow{
  display: block !important;
}
.prod-intro,.prod-param,.prod-pack{
  padding: 10px;
  box-sizing: border-box;
  display: none;
  color: #5a5a5a;
  overflow: hidden;
  text-align: left !important;
  font-size: 14px;
  position: relative;
}
.prod-intro img{
  width: 100%;
  height: auto;
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.table-border{
  border-spacing: 0;
  border-collapse: collapse;
  border-bottom: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  min-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
}
tbody{
  margin: 0;
  padding: 0;
}
.table-border td:first-child {
  padding-left: 5%;
  width: 66px;
}
.table-border td {
  font-size: 12px;
  color: #848689;
}
.table-border td, .table-border th {
  border-top: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  padding: 10px;
}
.table-border td strong {
  font-weight: 700;
  color: #848689;
}
.prod-pack{
  padding: 0 !important;
}
.pack-gray{
  width: 100%;
  height: 8px;
  background-color: #f0f2f5;
}
.pack-content{
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  font-size: 12px;
  color: #868489;
  line-height: 16px;
}
.pack-box-title{
  position: relative;
  text-align: center;
}
.pack-box-title-text{
  position: relative;
  z-index: 10;
  padding: 0 16px;
  background-color: #fff;
}
.pack-box-title::after{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #d7d7d7;
  -webkit-transform: scaleY(.5);
  -ms-transform: scaleY(.5);
  transform: scaleY(.5);
  content: "";
}
.pack-box-content{
  margin-top: 10px;
}
.pack-content:last-child{
  padding-bottom: 20px;
}
</style>
