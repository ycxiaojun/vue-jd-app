<template>
  <div class="catagory">
    <titlebar title="商品分类" v-bind:isShowBack="false"></titlebar>
    <div class="catagoryBody">
      <div class="rootList">
        <div class="leftWrapper" ref="leftWrapper" :style="{height: wrapperHeight + 'px'}">
          <ul class="leftContent">
            <li v-for="(item,index) in cataData" :key="item" class="wrapli" :class="{cataSelected:selectIndex == index}" @click="leftListSelect(index)">
              {{item}}
            </li>
          </ul>
        </div>
      </div>
      <div class="branchList" :style="{width: branchWidth + 'px'}">
        <div class="branchWrapper" ref="branchWrapper" :style="{height: wrapperHeight + 'px'}">
          <ul class="branchContent">
            <p class="branchTitle">{{cataData[selectIndex]}}</p>
            <li v-for="(item,index) in branchList" :key="item.id" class="branchLi" @click="toProductList(index)">
              <img :src="item.img" alt="">
              <p>{{item.id}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <tabbar id="tabbar" ref="tab"></tabbar>
  </div>
</template>

<script type="text/javascript">
import tabbar from '@/components/tabbar.vue'
import BScroll from 'better-scroll'
import {catagoryData} from './catagoryData.js'
import titlebar from '@/components/titlebar.vue'
export default{
  data () {
    return {
      cataData: ['热门推荐', '手机数码', '家用电器', '电脑办公', '美妆个护', '汽车用品', '京东超市', '男装', '男鞋', '女装', '母婴童装', '女鞋', '运动户外', '内衣配饰', '食品生鲜', '酒水饮料', '家具家装', '家居厨具', '箱包手袋', '钟表珠宝', '图书音像', '玩具乐器', '医药保健', '宠物生活', '礼品鲜花', '农资绿植', '生活旅行', '奢侈品', '全球购', '国际名牌', '艺术邮币', '二手商品', '特产馆', '京东金融', '拍卖', '房产'],
      selected: true,
      wrapperHeight: '',
      branchWidth: '',
      selectIndex: 0,
      toJSON: '',
      branchList: '',
      branchData: catagoryData
    }
  },
  created: function () {
    this.$nextTick(function () {
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.setWrapperHeight()
      this.setWrapperWidth()
      this.branchList = this.branchData[this.selectIndex]
      this.leftscroll = new BScroll(this.$refs.leftWrapper, {
        scrollY: true,
        click: true
      })
      this.branchscroll = new BScroll(this.$refs.branchWrapper, {
        scrollY: true,
        click: true
      })
    })
  },
  components: {
    tabbar,
    titlebar
  },
  computed: {
    isTab () {
      return this.$store.state.tabShow
    }
  },
  methods: {
    setWrapperHeight: function () {
      let clientHeight = document.documentElement.clientHeight
      this.wrapperHeight = clientHeight - 90
    },
    setWrapperWidth: function () {
      let clientWidth = document.documentElement.clientWidth
      if (clientWidth > 640) {
        clientWidth = 640
      }
      this.branchWidth = clientWidth - 86
    },
    leftListSelect: function (index) {
      this.selectIndex = index
      if (index < 5) {
        this.branchList = this.branchData[index]
      } else {
        this.branchList = this.branchData[index % 5]
      }
    },
    toProductList: function (index) {
      this.$store.state.productListIndex = 0
      this.$router.push('/productList')
    }
  }
}
</script>

<style type="text/css">
.catagoryBody{
  height: auto;
  min-height: 100%;
  margin-top: 45px;
}
.rootList{
  width: 86px;
  background-color: #f3f3f3;
  float: left;
  min-width: 76px;
  height: auto;
  overflow-y: auto;
  min-height: 100%;
}
.leftWrapper{
  width: 100%;
  height: 500px;
}
.wrapli{
  width: 100%;
  height: 46px;
  text-align: center;
  line-height: 46px;
}
.cataSelected{
  background-color: #fff !important;
  color: #e02020;
}
.branchList{
  float: right;
  background-color: #fff;
  overflow-y: auto;
  min-height: 100%;
}
.branchLi{
  float: left;
  width: 33.33%;
  padding: 10px;
  box-sizing: border-box;
}
.branchLi>img{
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.branchContent{
  overflow: hidden;
  padding: 10px 0 20px;
}
.branchTitle{
  font-size: 16px;
}
.branchLi>p{
  font-size: 12px;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
