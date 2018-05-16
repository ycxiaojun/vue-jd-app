<template lang="html">
  <mt-tabbar v-model="selected" fixed>
    <mt-tab-item id="index">
        <img slot="icon" :src="img1" class="tabImg">
    </mt-tab-item>
    <mt-tab-item id="class">
        <img slot="icon" :src="img2" class="tabImg">
    </mt-tab-item>
    <mt-tab-item id="cart">
        <img slot="icon" :src="img3" class="tabImg">
    </mt-tab-item>
    <mt-tab-item id="mine">
        <img slot="icon" :src="img4" class="tabImg">
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
export default{
  data () {
    return {
      selected: this.$store.state.selectTab,
      toJSON: '',
      img1: 'static/img/indexchoose.png',
      img2: 'static/img/class.png',
      img3: 'static/img/cart.png',
      img4: 'static/img/mine.png'
    }
  },
  computed: {
    otherSelect () {
      return this.$store.state.selectTab
    }
  },
  watch: {
    // 监听 是否从其他的页面跳转过来的数据
    'otherSelect' () {
      this.selected = this.otherSelect
    },
    'selected': {
      handler (val, oldval) {
        if (this.selected === 'index') {
          this.$router.push('/')
          this.$store.state.selectTab = 'index'
          this.img1 = '../static/img/indexchoose.png'
        } else {
          this.img1 = '../static/img/index.png'
        }
        if (val === 'class') {
          this.$router.push('/catagory')
          this.$store.state.selectTab = 'class'
          this.img2 = '../static/img/classchoose.png'
        } else {
          this.img2 = '../static/img/class.png'
        }
        if (val === 'cart') {
          this.$router.push('/shopcart')
          this.$store.state.selectTab = 'cart'
          this.img3 = '../static/img/cartchoose.png'
        } else {
          this.img3 = '../static/img/cart.png'
        }
        if (val === 'mine') {
          this.$router.push('/mine')
          this.$store.state.selectTab = 'mine'
          this.img4 = '../static/img/minechoose.png'
        } else {
          this.img4 = '../static/img/mine.png'
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style type="text/css">
.mint-tabbar{
  width: 100%;
  border-top: 1px solid #ccc;
}
.mint-tab-item-icon{
  width: 100%;
  height: 50px;
  margin: 0;
}
.mint-tabbar .mint-tab-item{
  padding: 0;
  background-color: #fff !important;
  width: 25%;
}
.tabImg{
  width: auto;
  height: 100%;
  margin: 0 auto;
}
</style>
