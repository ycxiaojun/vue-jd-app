<template>
  <div id="page-mine">
    <titlebar :title="titleName" v-bind:isShowBack="false"></titlebar>
    <login v-show="!isLogin"></login>
    <myself v-show="isLogin"></myself>
  </div>
</template>
<script>
import titlebar from '@/components/titlebar.vue'
import login from '@/components/login.vue'
import myself from '@/components/myself.vue'
export default{
  data () {
    return {
    }
  },
  created: function () {
    this.$nextTick(function () {
      var storage = window.localStorage
      let username = storage.getItem('loginUserName')
      if (username) {
        this.$store.state.isLogin = true
        this.$store.state.titleName = '我的京东'
        this.$store.state.userName = username
      } else {
        this.$store.state.isLogin = false
      }
    })
  },
  computed: {
    isLogin: function () {
      return this.$store.state.isLogin
    },
    titleName: function () {
      return this.$store.state.titleName
    }
  },
  components: {
    titlebar,
    login,
    myself
  }
}
</script>
<style>
#page-mine{
  width: 100%;
  overflow: hidden;
  padding-bottom: 60px;
  background-color: #f2f2f2;
}
</style>
