<template>
  <div class="comment_box">
    <div class="assess-flat assess-flat-flex" v-for="(item, index) in commentList" :key="index">
      <span class="assess-wrapper">
        <div class="assess-top">
          <span class="user-portrait">
            <img src="static/img/comment/6a645f3636316238376361613139316331353035383738323835353630_sma.jpg" alt="">
          </span>
          <div class="info">
            <span class="user-name">ab****</span>
            <a href="javascript:;" class="plus-icon-wrap">
              <img src="static/img/comment/plus-icon.png" alt="" class="plus-icon">
            </a>
            <span class="comment-item-star">
              <span class="real-star comment-stars-width5"></span>
            </span>
          </div>
        </div>
        <div class="assess-bottom">
          <p class="assess-content">
            第二个iphone了，从5到8iphone一路走来变化甚大，之前没用苹果机觉得国产机也不错，当你用了之后就会爱上他的系统，其它的系统都不足为谈，网上都说iphone只是在卖系统，可就是这样依然有不少人为之动然，都说7plus性价比超高，那也不无道理，众所周知8plus的只是外观改变和多了无线充电，不得不说8plus拿到手上的份量足矣，系统真的好，运行速度超快那是没得说，个别软件有点闪退还是要说一下，还有前后屏幕因为是玻璃材质所以必须十分小心，外观设计风格独特魅力十足确实让人心动震撼，下定决心血本入手一台并且第一次到京东买手机，都说京东买电器不错，想着手机应该也有保障吧
            激活并验证了，而且是新发售的新机觉得应该是正品，快递小哥很准时送达，当天付款第二天就能送达，因为城市不在北上广所以隔天送达也能理解，包装用的红色盒子很高大上啊，唯一遗憾的是没有打白条免单，不过能在发售的第一天抢到实乃欣慰，64G还是觉得不够用，索性256G一步到位，用上两三年没毛病，三年以后的iphone会是啥样期待中！希望苹果
          </p>
          <div class="product-img-module">
            <ul class="jd-slider-container jd-slider-flex">
              <li class="jd-slider-item product-imgs-li js-item" v-for="(item, index) in commentImg" :key="index">
                <img :src="'static/img/comment/'+item" alt="">
              </li>
            </ul>
          </div>
          <p class="pay-date">购买日期：2017-11-03 00:43:22</p>
          <p class="product-type">颜色：深空灰色 型号：64GB</p>
        </div>
      </span>
      <div class="assess-btns-box">
        <div class="assess-btns">
          <a href="javascript:;" class="assess-like-btn">
            <i class="jd-detail-icons btn-like-icon like-grey"></i>
            <span class="assess-btns-num">999</span>
          </a>
          <a href="javascript:;" class="assess-reply-btn">
            <i class="jd-detail-icons btn-reply-icon"></i>
            <span class="assess-btns-num">999</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data () {
    return {
      toJSON: '',
      commentList: [1, 2, 3, 4, 5, 6, 7, 8],
      commentImg: ['comment_1.jpg', 'comment_2.jpg', 'comment_3.jpg', 'comment_4.jpg', 'comment_5.jpg', 'comment_6.jpg', 'comment_7.jpg', 'comment_8.jpg']
    }
  },
  mounted: function () {
    this.$nextTick(function () {
    })
  }
}
</script>

<style type="text/css">
.comment_box{
  width: 100%;
  overflow: hidden;
}
.assess-flat {
  position: relative;
  -webkit-font-smoothing: antialiased;
}
.assess-wrapper {
  display: block;
  padding-left: 10px;
  background-color: #fff;
}
.assess-top {
  position: relative;
  padding: 11px 10px 0 0;
  background-color: #fff;
}
.user-portrait {
  float: left;
  margin-right: 10px;
}
.user-portrait img {
  display: block;
  border-radius: 50px;
  width: 30px;
  height: 30px;
}
.assess-top .info {
  overflow: hidden;
  text-align: left;
}
.user-name {
  display: inline-block;
  overflow: hidden;
  margin-top: 1px;
  max-width: 100px;
  height: 16px;
  font-size: 14px;
  line-height: 16px;
  white-space: nowrap;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  color: #252525;
}
.plus-icon-wrap {
  display: inline-block;
  margin-top: 2px;
  margin-left: 4px;
  font-size: 0;
  vertical-align: top;
}
.plus-icon {
  border-radius: 2px;
  width: 45px;
  height: 14px;
}
.comment-item-star {
  display: block;
  overflow: hidden;
  margin-top: 2px;
  margin-bottom: -6px;
  width: 60px;
  height: 16px;
  background: url(../../../static/img/comment/comment-star-7.0.png) repeat-x 0 -11px;
  background-size: 12px 22px;
}
.comment-item-star .real-star {
  display: block;
  height: 22px;
  background: url(../../../static/img/comment/comment-star-7.0.png) repeat-x 0 0;
  background-size: 12px 22px;
}
.assess-content {
  overflow: hidden;
  margin-top: 7px;
  margin-right: 10px;
  font-size: 12px;
  line-height: 18px;
  text-align: justify;
  word-wrap: break-word;
  color: #333;
}
.assess-flat-flex .product-img-module {
  padding: 0;
  width: 100%;
}
.product-img-module {
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 9px;
  padding-right: 10px;
  font-size: 0;
  white-space: nowrap;
}
.jd-slider-container {
  -webkit-transition: .5s;
}
.jd-slider-flex .product-imgs-li {
  overflow: hidden;
  position: relative;
  margin-right: 3px;
  margin-bottom: 3px;
  border-radius: 1px;
  width: 86px;
  width: 22.933333333333334vw;
  height: 86px;
  height: 22.933333333333334vw;
}
.product-imgs-li {
  float: left;
  overflow: hidden;
}
.jd-slider-flex .product-imgs-li img {
  display: block;
  width: 100%;
  min-height: 100%;
  opacity: 1;
}
.pay-date, .product-type {
  margin-top: 5px;
  font-size: 12px;
  line-height: 12px;
  color: #999;
  text-align: left;
}
.product-type {
  margin-right: 110px;
}
.assess-bottom:after {
  position: absolute;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(.5);
  -ms-transform: scaleY(.5);
  transform: scaleY(.5);
  content: "";
}
.assess-btns-box {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.assess-btns-icon, .assess-like-btn, .assess-reply-btn {
  display: inline-block;
}
.assess-like-btn {
  min-width: 70px;
  height: 16px;
}
.jd-detail-icons {
  background-image: url(../../../static/img/comment/detail-icons-7.0.png);
  background-repeat: no-repeat;
  background-size: 15px 50px;
}
.like-grey {
  background-position: 0 -15px;
}
.btn-like-icon {
  display: inline-block;
  margin-right: 4px;
  width: 15px;
  height: 16px;
  vertical-align: middle;
}
em, i {
  font-style: normal;
  text-decoration: none;
}
.assess-btns-num {
  height: 16px;
  font-size: 12px;
  color: #999;
}
.jd-detail-icons {
  background-image: url(../../../static/img/comment/detail-icons-7.0.png);
  background-repeat: no-repeat;
  background-size: 15px 50px;
}
.btn-reply-icon {
  display: inline-block;
  margin-right: 4px;
  width: 14px;
  height: 16px;
  vertical-align: middle;
  background-position: 0 2px;
}
</style>
