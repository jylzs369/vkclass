<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <countdown v-if="from === 'exam'" :timelimit="timelimit"></countdown>
      <section class="test border-bottom">
        <div class="title border-bottom">
            <p>{{ paragraph }}</p>
        </div>
        <ul class="list">
          <li v-for="(item, index) in options" class="border-top" :class="selected === item ? 'icon-selected' : 'icon-unselect'">
            <input type="radio" :id="'question-'+ index" :value="item" v-model="selected" name="question">
            <label :for="'question-' + index" class="flex"><span>{{ String.fromCharCode(startNumber + index) }}、</span><p>{{ item }}</p></label>
          </li>
        </ul>
      </section>
      <pagination :current="pagination.current" :total="pagination.total" :prevBtn="pagination.prev" :nextBtn="pagination.next" @prev="prev" @next="next"></pagination>
  </div>
</template>

<script>
import headerBar from './partials/header'
import countdown from './partials/countdown'
import pagination from './partials/pagination'
export default {
  data () {
    return {
      header: {
        title: ''
      },
      pagination: {
        prev: {
          text: '上一题',
          disabled: true
        },
        next: {
          text: '下一题',
          disabled: false
        },
        total: 1,
        current: 1
      },
      questions: [],
      selected: '',
      timelimit: 0,
      startNumber: 65
    }
  },
  components: {
    headerBar,
    countdown,
    pagination
  },
  computed: {
    paragraph () {
      if (this.questions.length > 0) {
        return this.pagination.current + '、' + this.questions[this.pagination.current - 1].content
      }
    },
    options () {
      if (this.questions.length > 0) {
        return this.questions[this.pagination.current - 1].options
      }
    }
  },
  watch: {
    'pagination.current' (value) {
      if (value >= 2 && value < this.pagination.total) {
        this.pagination.prev.disabled = false
        this.pagination.next.text = '下一题'
      }
    },
    'selected' (value) {
      this.questions[this.pagination.current - 1].selected = value
    }
  },
  created () {
    this.params = this.$route.params
    this.from = this.params.from
    this.timelimit = this.params.timelimit
    this.apiUrl = '/' + this.from + '/test'
    if (this.from === 'point') {
      this.header.title = '知识点验收'
    }
    if (this.from === 'exam') {
      this.header.title = '每月必考'
    }
    this.$axios.get(this.apiUrl, {params: {id: this.params.id}}).then(res => {
      let result = res.data
      this.questions = result.questions
      this.pagination.total = this.questions.length
    })
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    submit (params) {
      this.$axios.post(this.apiUrl, {params: params}).catch(error => {
        this.$toast(error)
      })
    },
    result () {
      if (this.pass) {
        this.params = Object.assign(this.params, {pass: this.pass})
      }
      this.params = Object.assign(this.params, {questions: this.questions})
      this.$router.replace({
        name: 'result',
        params: this.params
      })
    },
    getResults (context) {
      if (context.params.state) {
        let params = {
          id: context.params.id
        }
        if (context.from === 'point') {
          params.corrects = []
          context.questions.forEach(function (item, index, arr) {
            if (item.selected === item.correct) {
              params.corrects.push(item.id)
            }
          })
        } else {
          params.questions = []
          context.questions.forEach(function (item, index, arr) {
            params.questions.push({
              id: item.id,
              answer: item.selected
            })
          })
        }
        context.submit(params)
      }
      context.result()
    },
    prev () {
      if (this.pagination.current < 3) {
        this.pagination.current = 1
        this.pagination.prev.disabled = true
      } else {
        this.pagination.prev.disabled ? this.pagination.prev.disabled = false : ''
        this.pagination.current--
      }
    },
    next () {
      // 判断是否选择答案
      if (this.selected.length <= 0) {
        this.$toast('请选择答案')
        return
      }
      // 如果到最后一题，提交测试
      if (this.pagination.next.text === '提交测试' || this.pagination.next.text === '交卷') {
        this.getResults(this)
      }
      if (this.pagination.current >= this.questions.length - 1) {
        this.pagination.current = this.questions.length
        this.pagination.next.text = '提交测试'
      } else {
        this.pagination.current++
      }
      this.selected = ''
    }
  }
}
</script>
