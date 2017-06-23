import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Course from '@/components/course'
import Exam from '@/components/exam'
import Library from '@/components/library'
import Point from '@/components/point'
import Test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/course', name: 'course', component: Course },
    { path: '/exam', name: 'exam', component: Exam },
    { path: '/library', name: 'library', component: Library },
    { path: '/point', name: 'point', component: Point },
    { path: '/test', name: 'test', component: Test }
  ]
})
