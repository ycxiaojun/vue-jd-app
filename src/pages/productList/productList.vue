<template>
  <div>
    <header class="productListHeader">
      <div class="back" @click="back()">
        <img src="static/img/arrow_left.png" alt="">
      </div>
      <div class="sortbar">
        <ul>
          <li class="sortli" v-for="(item, index) in sortData"  :key="item.id" :class="{sortselected: sortselected == index}" @click="sortselect(index)">
            <span>
              {{item.name}}
              <img :src="'static/img/'+item.img" alt="">
            </span>
          </li>
        </ul>
      </div>
    </header>
    <div class="productsBody">
      <ul>
        <li class="productli" v-for="(item, index) in productdata" :key="index" @click="toProduct(index)">
          <img :src="'static/products/'+item.img" alt="" class="productImg">
          <div class="productInfoBox">
            <div class="productName">
              {{item.title}}
            </div>
            <div class="gray-icon"></div>
            <div class="product-price-m">
              <em>
                <span class="big-price">{{item.price | formatBigmoney}}</span>
                <span class="small-price">{{item.price | formatSmallmoney}}</span>
              </em>
            </div>
            <div class="gray-pro-info">
              <span class="self-sale">自营</span>
              <span>{{item.comment}}条评论</span>
              <span>99%好评</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import {productListData} from './productListData.js'
export default{
  name: 'productList',
  data () {
    return {
      sortData: [
        {'id': '1', 'name': '综合', 'img': 'trianglechoose.png'},
        {'id': '2', 'name': '销量', 'img': 'triangle.png'},
        {'id': '3', 'name': '价格', 'img': 'triangle.png'},
        {'id': '4', 'name': '价格', 'img': 'up.png'}
      ],
      sortselected: 0,
      productListIndex: this.$store.state.productListIndex,
      toJSON: '',
      productdata: ''
    }
  },
  created: function () {
    this.$nextTick(function () {
      this.$store.state.tabShow = false
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.productdata = productListData[this.productListIndex]
      this.sortselected = this.$store.state.sortSelected
    })
  },
  filters: {
    formatBigmoney: function (value) {
      return '￥' + Number(value).toFixed(0)
    },
    formatSmallmoney: function (value) {
      return '.' + value.split('.')[1]
    }
  },
  computed: {
    otherSortSelected () {
      return this.$store.state.otherSortSelected
    }
  },
  watch: {
    'otherSortSelected' () {
      this.sortselected = this.otherSortSelected
    },
    'sortselected': {
      handler (val, oldval) {
        if (this.sortselected === 0) {
          this.sortData[0].img = 'trianglechoose.png'
          this.$store.state.sortSelected = 0
        } else {
          this.sortData[0].img = 'triangle.png'
        }
        if (this.sortselected === 1) {
          this.sortData[1].img = 'trianglechoose.png'
          this.$store.state.sortSelected = 1
        } else {
          this.sortData[1].img = 'triangle.png'
        }
        if (this.sortselected === 2) {
          this.sortData[2].img = 'trianglechoose.png'
          this.$store.state.sortSelected = 2
        } else {
          this.sortData[2].img = 'triangle.png'
        }
        if (this.sortselected === 3) {
          this.sortData[3].img = 'upchoose.png'
          this.$store.state.sortSelected = 3
        } else {
          this.sortData[3].img = 'up.png'
        }
      }
    }
  },
  methods: {
    back: function () {
      this.$store.state.tabShow = true
      this.$router.push('/catagory')
      this.productSort(0)
      this.$store.state.sortSelected = 0
    },
    sortselect: function (index) {
      this.sortselected = index
      this.productSort(index)
      this.$store.state.sortSelected = index
    },
    productSort: function (index) {
      switch (index) {
        case 0:
          this.productdata.sort(this.defaultSort)
          break
        case 1:
          this.productdata.sort(this.salesSort)
          break
        case 2:
          this.productdata.sort(this.downSort)
          break
        case 3:
          this.productdata.sort(this.upSort)
          break
      }
    },
    defaultSort: function (a, b) {
      return a.id - b.id
    },
    salesSort: function (a, b) {
      return b.comment - a.comment
    },
    downSort: function (a, b) {
      return b.price - a.price
    },
    upSort: function (a, b) {
      return a.price - b.price
    },
    toProduct: function (index) {
      this.$router.push('/product')
      this.$store.state.productIndex = index
      this.$store.state.toProduct = 'productList'
    }
  }
}
</script>

<style type="text/css">
  .productListHeader{
    width: 100%;
    height: 44px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5e5;
    color: #666;
    font-size: 20px;
    line-height: 44px;
    position: fixed;
    z-index: 2000;
  }
  .back{
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 100%;
  }
  .back>img{
    height: 32px;
    width: auto;
    vertical-align: middle;
  }
  .sortbar{
    width: 100%;
    padding-left: 40px;
    padding-right: 20px;
    height: 100%;
    box-sizing: border-box;
  }
  .sortli{
    width: 25%;
    height: 100%;
    float: left;
    line-height: 44px;
    font-size: 14px;
  }
  .sortli>span{
    display: block;
  }
  .sortli img{
    vertical-align: middle;
  }
  .sortselected{
    color: #e02020;
  }
  .productsBody{
    width: 100%;
    overflow: hidden;
    padding-top: 50px;
  }
  .productli{
    width: 100%;
    height: 131px;
    position: relative;
  }
  .productImg{
    width: 125px;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .productInfoBox{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px 10px 10px 140px;
  }
  .productName{
    color: #232326;
    font-size: 15px;
    line-height: 20px;
    height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    display: box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    text-align: left;
  }
  .gray-icon{
    height: 29px;
    margin: 0px;
    overflow: hidden;
    line-height: 29px;
  }
  .product-price-m{
    height: 20px;
    overflow: hidden;
    width: 100%;
    line-height: 20px;
    margin-right: 10px;
  }
  .product-price-m>em{
    font-size: 15px;
    color: #f23030;
    margin-right: 3px;
    display: block;
    height: 20px;
    overflow: hidden;
    float: left;
  }
  .big-price{
    font-size: 19px;
  }
  .gray-pro-info{
    color: #848689;
    font-size: 13px;
    display: -webkit-box;
    display: box;
    margin-top: 8px;
    overflow: hidden;
    height: 15px;
    line-height: 16px;
    -webkit-box-align: center;
    box-align: center;
  }
  .self-sale{
    color: #f23030;
    font-size: 9px;
    line-height: 10px;
    height: 10px;
    padding: 1px 2px 0px 3px;
    margin-right: 4px;
    position: relative;
    top: -1px;
    display: block;
  }
  .self-sale::after{
    content: '';
    height: 200%;
    width: 200%;
    position: absolute;
    left: 0;
    top: 0;
    right: auto;
    bottom: auto;
    background-color: transparent;
    border: 1px solid #f23030;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    transform-origin: top left;
    -webkit-transform-origin: top left;
  }
</style>
