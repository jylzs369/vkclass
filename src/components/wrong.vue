<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="test border-bottom">
        <div class="title border-bottom">
            <p>{{ paragraph }}</p>
        </div>
        <ul class="list">
          <li v-for="(item, index) in options" class="border-top" :class="{'icon-correct': question.correct === item, 'icon-wrong': question.answer === item}">
            <input type="radio" :id="'question-'+ index" :value="item" disabled name="question">
            <label :for="'question-' + index" class="flex"><span>{{ String.fromCharCode(startNumber + index) }}、</span><p>{{ item }}</p>
            </label>
          </li>
        </ul>
      </section>
      <pagination :current="pagination.current" :total="pagination.total" :prevBtn="pagination.prev" :nextBtn="pagination.next" @prev="prev" @next="next"></pagination>
  </div>
</template>

<script>
import headerBar from './partials/header'
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
      startNumber: 65
    }
  },
  components: {
    headerBar,
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
    },
    question () {
      if (this.questions.length > 0) {
        return this.questions[this.pagination.current - 1]
      }
    }
  },
  watch: {
    'pagination.current' (value) {
      if (value >= 2 && value < this.pagination.total) {
        this.pagination.prev.disabled = false
        this.pagination.next.text = '下一题'
      }
    }
  },
  created () {
    let employeeId = 10000
    this.params = this.$route.params
    this.header.title = this.params.title
    // let examId = this.params.id
    // this.$axios.get(this.apiUrl + '/' + courseId).then(res => {
    this.$axios.get('/exam/wrong', {params: {id: this.params.id, employeeId: employeeId}}).then(res => {
      this.questions = res.data.questions
      this.pagination.total = this.questions.length
    })
  },
  methods: {
    back () {
      this.$router.replace({
        name: 'result',
        params: this.params
      })
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
      // 如果到最后一题，返回
      if (this.pagination.next.text === '返回') {
        this.back()
      }
      if (this.pagination.current >= this.questions.length - 1) {
        this.pagination.current = this.questions.length
        this.pagination.next.text = '返回'
      } else {
        this.pagination.current++
      }
    }
  }
}
</script>
