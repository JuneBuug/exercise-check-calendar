import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueMomentJs from 'vue-momentjs'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Seoul')

Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(VueMomentJs)


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:nickname',
    name: 'calendar',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cal.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
