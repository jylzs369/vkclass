import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Course from '@/components/course'
import Point from '@/components/point'
import Exam from '@/components/exam'
import Start from '@/components/start'
import Test from '@/components/test'
import Library from '@/components/library'
import Result from '@/components/result'
import Wrong from '@/components/wrong'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/course', name: 'course', component: Course },
    { path: '/point', name: 'point', component: Point },
    { path: '/exam', name: 'exam', component: Exam },
    { path: '/start', name: 'start', component: Start },
    { path: '/test', name: 'test', component: Test },
    { path: '/result', name: 'result', component: Result },
    { path: '/library', name: 'library', component: Library },
    { path: '/wrong', name: 'wrong', component: Wrong }
  ]
})
