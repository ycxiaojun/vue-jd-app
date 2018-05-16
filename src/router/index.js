import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index/index'], resolve)
    },
    {
      path: '/catagory',
      name: 'catagory',
      component: resolve => require(['@/pages/catagory/catagory'], resolve)
    },
    {
      path: '/productList',
      name: 'productList',
      component: resolve => require(['@/pages/productList/productList'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component: resolve => require(['@/pages/product/index'], resolve),
      redirect: '/product/info',
      children: [
        {
          path: 'info',
          name: 'productInfo',
          component: resolve => require(['@/pages/product/info'], resolve)
        },
        {
          path: 'details',
          name: 'productDetails',
          component: resolve => require(['@/pages/product/details'], resolve)
        },
        {
          path: 'comment',
          name: 'productComment',
          component: resolve => require(['@/pages/product/comment'], resolve)
        }
      ]
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: resolve => require(['@/pages/shopcart/index'], resolve)
    },
    {
      path: '/mine',
      name: 'mine',
      component: resolve => require(['@/pages/mine/index'], resolve)
    }
  ]
})
