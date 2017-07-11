<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <two-tabs class="border-bottom" :active="twotabs.active" :leftBtn="twotabs.leftBtn" :rightBtn="twotabs.rightBtn" @leftTabClick="leftTabClick" @rightTabClick="rightTabClick"></two-tabs>
      <section v-if="processing.length === 0 && finished.length === 0">暂无数据</section>
      <section v-if="processing.length > 0" class="exam bg-gray no-padding" v-show="twotabs.active === 'left'">
        <div v-for="item in processing" class="item bg-white">
          <router-link tag="div" :to="{ name: 'start', params: { id: item.id, title: item.title, state: item.state, from: 'exam'} }" class="box-list flex border-vertical">
            <div class="banner"><img :src="item.banner" alt=""></div>
            <div class="brief">
              <h3 class="title">{{ item.title }}</h3>
              <p>共计：{{ item.questions }}知识点</p>
              <p>截止：{{ item.deadline }}</p>
            </div>
          </router-link>
        </div>
      </section>
      <section v-if="finished.length > 0" class="exam bg-gray no-padding" v-show="twotabs.active === 'right'">
        <div v-for="item in finished" class="item bg-white">
          <router-link tag="div" :to="{ name: 'result', params: { id: item.id, title: item.title, state: item.state, from: 'exam'} }" class="box-list flex border-vertical">
            <div class="banner"><img :src="item.banner" alt=""></div>
            <div class="brief">
              <h3 class="title">{{ item.title }}<i class="icon" :class="item.pass ? 'pass' : 'fail'">{{ item.pass ? '已通过' : '未通过' }}</i></h3>
              <p>共计：{{ item.questions }}知识点</p>
              <p>截止：{{ item.deadline }}</p>
            </div>
          </router-link>
        </div>
      </section>
  </div>
</template>

<script>
import headerBar from './partials/header'
import twoTabs from './partials/twoTabs'
export default {
  data () {
    return {
      header: {
        title: '考试'
      },
      twotabs: {
        active: 'left',
        leftBtn: {
          text: '未完成'
        },
        rightBtn: {
          text: '已完成'
        }
      },
      processing: [],
      finished: []
    }
  },
  components: {
    headerBar,
    twoTabs
  },
  created () {
    this.$axios.get('/exam').then(res => {
      let exams = res.data.exams
      let _this = this
      exams.forEach(function (item, index, arr) {
        if (item.state) {
          _this.processing.push(item)
        } else {
          _this.finished.push(item)
        }
      })
    })
  },
  methods: {
    back () {
      this.$router.push({
        name: 'home'
      })
    },
    leftTabClick () {
      this.twotabs.active = 'left'
    },
    rightTabClick () {
      this.twotabs.active = 'right'
    }
  }
}
</script>
