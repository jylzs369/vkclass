<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="result">
        <div v-if="exam" class="score tc" :class="{ full: result.full || result.pass }">
          <div>
            <p><span class="font-large">{{ result.score }}</span>分</p>
            <p v-if="result.full || result.pass">恭喜你完成考试</p>
            <p v-else>还要多多学习</p>
          </div>
        </div>
        <div class="correct-wrong flex">
          <div class="tc">
            <h5>正确</h5>
            <p><span class="font-large">{{ result.correct }}</span>题</p>
          </div>
          <div class="tc">
            <h5>错误</h5>
            <p><span class="font-large">{{ result.wrong }}</span>题</p>
          </div>
        </div>
        <p v-if="result.full || result.pass" class="tc">学习很认真，继续保持哦！</p>
        <p v-else class="tc">偷懒了吧？没认真学习吧~</p>
      </section>
      <footer-bar class="tc">
        <div slot="footer">
          <p v-if="exam">达到{{ scoreline }}分及格</p>
          <router-link v-if="result.full || result.pass" tag="button" class="btn warning" :to="{ name: 'home'}">返回首页</router-link>
          <router-link v-else-if="point" tag="button" class="btn warning" :to="{ name: 'point', params: params }">重新学习</router-link>
          <router-link v-else-if="exam && state" tag="button" class="btn warning" :to="{ name: 'exam', params: this.params}">重新考试</router-link>
          <router-link v-else tag="button" class="btn warning" :to="{ name: 'wrong', params: params}">错题查看</router-link>
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
      point: false,
      exam: false,
      questions: [],
      scoreline: 0,
      state: 0,
      result: {
        correct: 0,
        wrong: 0,
        full: false,
        pass: false,
        score: 0
      },
      params: {}
    }
  },
  components: {
    headerBar,
    footerBar
  },
  created () {
    this.params = this.$route.params
    console.log(this.params)
    this.header.title = this.params.title
    this.state = this.params.state
    switch (this.params.from) {
      case 'point':
        this.point = true
        this.questions = this.params.questions
        this.getPointResult(this)
        break
      case 'exam':
        this.exam = true
        this.getExamResult()
        break
      default:
        break
    }
  },
  methods: {
    back () {
      this.$router.push({
        name: 'home'
      })
    },
    getPointResult (context) {
      var _this = context
      _this.questions.forEach(function (item, index, arr) {
        if (item.correct === item.selected) {
          item.state = 1
          _this.result.correct++
        } else {
          _this.result.wrong++
        }
        _this.result.full = !_this.result.wrong
      })
    },
    getExamResult () {
      let employeeId = 1022023
      // let courseId = this.params.id
      // this.$axios.get('/exam/finished/' + courseId).then(res => {
      this.$axios.get('/exam/finished', {params: {id: this.params.id, employeeId: employeeId}}).then(res => {
        let result = res.data
        this.scoreline = result.scoreline
        this.result.correct = result.correct
        this.result.wrong = result.wrong
        this.result.score = result.score
        if (this.result.score >= this.scoreline) this.result.pass = true
        if (this.result.score === 100) this.result.full = true
      })
    }
  }
}
</script>
