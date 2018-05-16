<template>
  <div id="app">
    <router-view></router-view>
    <tabbar id="tabbar" v-show="isTab"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar.vue'
export default {
  data () {
    return {
      toJSON: ''
    }
  },
  name: 'App',
  components: {
    tabbar
  },
  created () {
    this.$router.push('/')
  },
  computed: {
    isTab () {
      return this.$store.state.tabShow
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
}
@font-face {font-family: "iconfont";
  src: url('../static/fonts/iconfont.eot'); /* IE9*/
  src: url('../static/fonts/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('../static/fonts/iconfont.woff') format('woff'), /* chrome, firefox */
  url('../static/fonts/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('../static/fonts/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family:"iconfont" !important;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
