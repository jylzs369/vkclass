<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="result fullscreen" :class="{ point: point, exam: exam }">
        <h3 class="title">{{ title }}</h3>
        <div class="score tc">
          <score :pass="score.pass" :progress="score.progress"></score>
          <div><span class="font-large">{{ result.score }}</span>分</div>
        </div>
        <p v-if="exam" class="scoreline tc">合格标准：{{ scoreline }}分</p>
        <div class="correct-wrong flex">
          <div class="correct tc">正确<strong class="font-large">{{ result.correct }}</strong><span class="font-smallest">题</span></div>
          <div class="wrong tc">错误<strong class="font-large">{{ result.wrong }}</strong><span class="font-smallest">题</span></div>
        </div>
        <p v-if="result.full || result.pass" class="tips tc">恭喜您完成测试！</p>
        <div class="btns">
          <router-link v-if="result.full || result.pass" tag="button" class="btn success" :to="{ name: 'home'}">返回首页</router-link>
          <router-link v-else-if="point" tag="button" class="btn success" :to="{ name: 'point', params: params }" replace>重新学习</router-link>
          <router-link v-else-if="exam && state" tag="button" class="btn success" :to="{ name: 'test', params: params}" replace>重新考试</router-link>
          <router-link v-else tag="button" class="btn success" :to="{ name: 'wrong', params: params}">错题查看</router-link>
        </div>
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
        title: ''
      },
      score: {
        pass: false
      },
      title: '',
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
    score
  },
  created () {
    this.header.title = '测试结果'
  },
  beforeRouteEnter  (to, from, next) {
    if (from.name === 'wrong') {
      const { params } = from
      next(vm => {
        vm.params = params
        vm.state = vm.params.state
        vm.title = vm.params.title
        vm.getExamResult()
        vm.wrong = true
      })
    } else {
      next(vm => {
        vm.params = vm.$route.params
        vm.state = vm.params.state
        switch (vm.params.from) {
          case 'point':
            vm.point = true
            vm.questions = vm.params.questions
            vm.getPointResult(vm)
            break
          case 'exam':
            vm.exam = true
            vm.getExamResult()
            break
          default:
            break
        }
      })
    }
  },
  methods: {
    back () {
      if (this.wrong) {
        this.$router.push({
          name: 'exam'
        })
      } else {
        this.$router.go(-1)
      }
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
      this.$axios.get('/exam/finished', {params: {id: this.params.id, employeeId: employeeId}}).then(res => {
        let result = res.data
        this.scoreline = result.scoreline
        this.result.correct = result.correct
        this.result.wrong = result.wrong
        this.result.score = result.score
        this.score.progress = this.result.score
        console.log(this.score.progress)
        if (this.result.score >= this.scoreline) {
          if (this.result.score === 100) this.result.full = true
          this.result.pass = true
          this.score.pass = this.result.pass
        }
      })
    }
  }
}
</script>
