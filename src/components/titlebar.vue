<template>
  <div class="titlebar-bg">
    <div class="titlebar-content">
      {{title}}
    </div>
    <div class="titlebar-back" v-show="isShowBack" @click="goback()">
      <img src="static/img/arrow_left.png" alt="">
    </div>
  </div>
</template>
<script>
export default{
  props: {
    title: String,
    isShowBack: Boolean
  },
  methods: {
    goback: function () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
<style>
.titlebar-bg{
  width: 100%;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #d6d6d6;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 2000;
}
.titlebar-content{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #454545;
  font-size: 18px;
}
.titlebar-back{
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.titlebar-back img{
  width: 32px;
  height: auto;
  vertical-align: middle;
}
</style>
