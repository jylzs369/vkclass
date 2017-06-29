<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="result">
        <div class="score tc full">
          <div>
            <p><span class="font-large">{{ scoreline }}</span>分</p>
            <p>合格标准</p>
          </div>
        </div>
        <div class="correct-wrong flex">
          <div class="tc">
            <h5>考试次数</h5>
            <p><span class="font-large">{{ chance }}</span>次剩余</p>
          </div>
          <div class="tc">
            <h5>考试时长</h5>
            <p><span class="font-large">{{ timelimit }}</span>分钟</p>
          </div>
        </div>
        <p class="tc">超时自动提交考卷，请保持良好的网络环境</p>
      </section>
      <footer-bar class="tc">
        <div slot="footer">
          <router-link tag="button" :to="{ name: 'test', params: this.params }" class="btn warning">
            开始考试
          </router-link>
        </div>
      </footer-bar>
  </div>
</template>

<script>
import headerBar from './partials/header'
import footerBar from './partials/footer'
export default {
  data () {
    return {
      header: {
        title: ''
      },
      scoreline: 0,
      timelimit: 0,
      chance: 0
    }
  },
  components: {
    headerBar,
    footerBar
  },
  created () {
    this.params = this.$route.params
    this.header.title = this.params.title
    this.$axios.get('/exam/start', {params: {id: this.params.id, employeeId: 10000}}).then(res => {
      let result = res.data
      this.scoreline = result.scoreline
      this.timelimit = result.timelimit
      this.chance = result.chance
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
