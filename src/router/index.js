import Vue from 'vue'
import Router from 'vue-router'
import EmonCms from '@/components/EmonSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EmonCms',
      component: EmonCms
    }
  ]
})
