<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="start fullscreen">
        <h3 class="title">{{ title }}</h3>
        <div class="score tc full">
          <div>
            <p><span class="font-large">{{ data.scoreline }}</span>分</p>
          </div>
          <p class="clear">合格标准</p>
        </div>
        <div class="correct-wrong flex font-smaller">
          <div class="tc">考试次数<strong class="font-larger">{{ data.chance }}</strong><span class="font-smallest">{{ data.totalChance }}题次</span></div>
          <div class="tc">考试时长<strong class="font-larger">{{ data.timelimit }}</strong><span class="font-smallest">题</span></div>
        </div>
        <p class="tips tc">超时自动提交考卷，请保持良好的网络环境</p>
        <router-link tag="button" :to="{ name: 'test', params: this.params }" class="btn success start-btn" replace>
          开始考试
        </router-link>
      </section>
  </div>
</template>

<script>
import headerBar from './partials/header'
import footerBar from './partials/footer'
export default {
  data () {
    return {
      header: {
        title: '考试说明'
      },
      title: '',
      data: {}
    }
  },
  components: {
    headerBar,
    footerBar
  },
  created () {
    this.params = this.$route.params
    this.title = this.params.title
    this.$axios.get('/exam/start', {params: {id: this.params.id, employeeId: 10000}}).then(res => {
      let result = res.data
      this.data = result
    })
  },
  methods: {
    back () {
      this.$router.push({
        name: 'exam'
      })
    }
  }
}
</script>
