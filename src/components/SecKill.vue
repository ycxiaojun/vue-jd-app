<template>
  <div class="seckill-floor">
    <div class="seckill-floor-title">
      <div class="seckill-floor-title-text">
        京东秒杀
      </div>
      <div class="seckill-floor-title-time">
        <span>{{hour}}</span>
        : <span>{{min}}</span>
        : <span>{{sec}}</span>
      </div>
    </div>
    <div class="seckill-floor-swipe">
      <div class="seckillWrapper" ref="seckillWrapper">
        <ul class="seckillContent" :style="{width: 70*secData.length+'px'}">
          <li v-for="(item, index) in secData" :key="index" @click="linkToast()">
            <img :src="'static/img/sec/'+item.img" alt="">
            <p class="newprice">￥<span>{{item.newprice}}</span></p>
            <p class="oldprice">￥<span>{{item.oldprice}}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui'
export default{
  data () {
    return {
      hour: '',
      min: '',
      sec: '',
      secData: [
        {'oldprice': '145', 'newprice': '1', 'img': 'seckill-1.jpg'}, {'oldprice': '279', 'newprice': '99', 'img': 'seckill-2.jpg'},
        {'oldprice': '4499', 'newprice': '3988', 'img': 'seckill-3.jpg'}, {'oldprice': '6999', 'newprice': '6688', 'img': 'seckill-4.jpg'},
        {'oldprice': '68.1', 'newprice': '51.1', 'img': 'seckill-5.jpg'}, {'oldprice': '258', 'newprice': '89', 'img': 'seckill-6.jpg'},
        {'oldprice': '999', 'newprice': '798', 'img': 'seckill-7.jpg'}, {'oldprice': '3699', 'newprice': '3649', 'img': 'seckill-8.jpg'},
        {'oldprice': '799', 'newprice': '478', 'img': 'seckill-9.jpg'}, {'oldprice': '99', 'newprice': '59.9', 'img': 'seckill-10.jpg'},
        {'oldprice': '329', 'newprice': '99', 'img': 'seckill-11.jpg'}, {'oldprice': '729', 'newprice': '559', 'img': 'seckill-12.jpg'},
        {'oldprice': '2299', 'newprice': '1949', 'img': 'seckill-13.jpg'}, {'oldprice': '93', 'newprice': '69.9', 'img': 'seckill-14.jpg'},
        {'oldprice': '125', 'newprice': '99', 'img': 'seckill-15.jpg'}, {'oldprice': '99', 'newprice': '62.5', 'img': 'seckill-16.jpg'}]
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.interval = setInterval(() => {
        if (this.sec > 0) {
          this.sec--
        } else {
          this.sec = 60
          if (this.min > 0) {
            this.min--
          } else {
            this.min = 60
            this.hour--
          }
        }
        if (this.hour === 0 && this.min === 0 && this.sec === 0) {
          clearInterval(this.interval)
        }
      }, 1000)
    })
  },
  filters: {
  },
  mounted: function () {
    this.$nextTick(function () {
      this.secscroll = new BScroll(this.$refs.seckillWrapper, {
        scrollX: true,
        click: true
      })
      this.getDate()
    })
  },
  methods: {
    linkToast: function () {
      Toast({
        message: '暂无链接，待后续完成！',
        position: 'middle',
        duration: 1200
      })
    },
    getDate: function () {
      let date = new Date()
      this.hour = 24 - date.getHours()
      this.min = 60 - date.getMinutes()
      this.sec = 60 - date.getSeconds()
    }
  }
}
</script>
<style>
.seckill-floor{
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
.seckill-floor-title{
  width: 100%;
  height: 46px;
  padding: 10px;
  box-sizing: border-box;
}
.seckill-floor-title>div{
  float: left;
  height: 100%;
}
.seckill-floor-title-text{
  width: 30%;
  color: #f23030;
  font-size: 16px;
  font-weight: 600;
  line-height: 26px;
}
.seckill-floor-title-time{
  width: 70%;
  text-align: left !important;
  line-height: 26px;
}
.seckill-floor-title-time span{
  padding: 2px;
  border: 1px solid #dddddd;
}
.seckill-floor-swipe{
  width: 100%;
  height: 120px;
}
.seckillWrapper{
  width: 100%;
  height: 100%;
}
.seckillContent{
  height: 100%;
  overflow-x: hidden;
}
.seckillContent li{
  width: 70px;
  height: 100%;
  float: left;
}
.seckillContent li img{
  width: 60px;
  height: auto;
}
.seckillContent li p{
  padding: 3px 0 0;
}
.newprice{
  color: #f23030;
}
.oldprice{
  text-decoration: line-through;
  color: #686868;
}
</style>
