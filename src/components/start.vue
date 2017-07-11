<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="start fullscreen">
        <h3 class="title">{{ title }}</h3>
        <div class="score tc">
          <score :pass="score.pass" :progress="score.progress"></score>
          <div><span class="font-large">{{ data.scoreline }}</span>分</div>
          <p class="font-smaller">合格标准</p>
        </div>
        <div class="correct-wrong flex font-smaller">
          <div class="tc">考试次数<strong class="font-larger">{{ data.chance }}</strong><span class="font-smallest">/ {{ data.totalChance }}次</span></div>
          <div class="tc">考试时长<strong class="font-larger">{{ data.timelimit }}</strong><span class="font-smallest">分钟</span></div>
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
import score from './partials/score'
export default {
  data () {
    return {
      header: {
        title: '考试说明'
      },
      score: {
        pass: true
      },
      title: '',
      data: {}
    }
  },
  components: {
    headerBar,
    score
  },
  created () {
    this.params = this.$route.params
    this.title = this.params.title
    this.$axios.get('/exam/start', {params: {id: this.params.id, employeeId: 10000}}).then(res => {
      let result = res.data
      this.data = result
      this.params.timelimit = result.timelimit
      this.score.progress = this.data.scoreline
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
