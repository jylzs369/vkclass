<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section v-if="processing.length === 0 && finished.length === 0">暂无数据</section>
      <section v-if="processing.length > 0">
        <div v-for="item in processing">
          <router-link tag="div" :to="{ name: 'point', params: { id: item.id, title: item.title, state: item.state} }" class="box-list flex">
            <div class="banner"><img :src="item.banner" alt=""></div>
            <div class="brief">
              <h3 class="title">{{ item.title }}</h3>
              <p>共计：{{ item.points }}知识点</p>
              <p>截止日期：{{ item.deadline }}</p>
            </div>
          </router-link>
        </div>
      </section>
      <section v-if="finished.length > 0">
        <div>已完成</div>
        <div v-for="item in finished">
          <router-link tag="div" :to="{ name: 'point', params: { id: item.id, title: item.title, state: item.state} }" class="box-list flex">
            <div class="banner"><img :src="item.banner" alt=""></div>
            <div class="brief">
              <h3 class="title">{{ item.title }}</h3>
              <p>共计：{{ item.points }}知识点</p>
              <p>截止日期：{{ item.deadline }}</p>
            </div>
          </router-link>
        </div>
      </section>
  </div>
</template>

<script>
import headerBar from './partials/header'
export default {
  data () {
    return {
      header: {
        title: '必学课程'
      },
      processing: [],
      finished: []
    }
  },
  components: {
    headerBar
  },
  created () {
    this.$axios.get('/course').then(res => {
      let courses = res.data.courses
      let _this = this
      courses.forEach(function (item, index, arr) {
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
    }
  }
}
</script>
