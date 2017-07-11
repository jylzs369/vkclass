import Vue from 'vue'
import Router from 'vue-router'
import Axios from 'axios'
import store from '../store'
import Home from '@/components/home'
import Course from '@/components/course'
import Point from '@/components/point'
import Exam from '@/components/exam'
import Start from '@/components/start'
import Test from '@/components/test'
import Library from '@/components/library'
import Result from '@/components/result'
import Wrong from '@/components/wrong'
import Error from '@/components/error'

const checkAuthority = (to, from, next) => {
  const name = to.name
  let user = {}
  if (process.env.NODE_ENV === 'development') {
    user = {
      name: '夏炳南',
      employeeId: 1000
    }
    store.dispatch('state')
  } else {
    Axios.get('/').then(res => {
      user = res
      store.dispatch('state')
    })
  }
  if (name === 'home' || name === 'course' || name === 'exam' || name === 'library') {
    !user.employeeId && to.name !== 'error' ? next({ path: '/error' }) : next()
  } else {
    from.name && from.name.length <= 0 && to.name !== 'error' ? next({ path: '/error' }) : next()
  }
}

const router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/course', name: 'course', component: Course },
    { path: '/point', name: 'point', component: Point },
    { path: '/exam', name: 'exam', component: Exam },
    { path: '/start', name: 'start', component: Start },
    { path: '/test', name: 'test', component: Test },
    { path: '/result', name: 'result', component: Result },
    { path: '/library', name: 'library', component: Library },
    { path: '/wrong', name: 'wrong', component: Wrong },
    { path: '/error', name: 'error', component: Error }
  ]
})

router.beforeEach((to, from, next) => {
  checkAuthority(to, from, next)
})

Vue.use(Router)

export default router
