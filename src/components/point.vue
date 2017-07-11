<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section>
        <div class="points">
          <h3>{{ title }}</h3>
          <p>{{ paragraph }}</p>
        </div>
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
        title: '知识点学习'
      },
      pagination: {
        prev: {
          text: '上一个',
          disabled: true
        },
        next: {
          text: '下一个',
          disabled: false
        },
        total: 1,
        current: 1
      },
      title: '',
      points: []
    }
  },
  components: {
    headerBar,
    pagination
  },
  computed: {
    paragraph () {
      if (this.points.length > 0) {
        return this.points[this.pagination.current - 1].content
      }
    }
  },
  watch: {
    'pagination.current' (value) {
      if (value >= 2 && value < this.pagination.total) {
        this.pagination.prev.disabled = false
        this.pagination.next.text = '下一个'
      }
    }
  },
  created () {
    this.params = this.$route.params
    this.title = this.params.title
    // let courseId = this.params.id
    // this.$axios.get('/point/' + courseId).then(res => {
    this.$axios.get('/point', {params: {id: this.params.id}}).then(res => {
      this.points = res.data.points
      this.pagination.total = this.points.length
    })
  },
  methods: {
    back () {
      this.$router.push({
        name: 'course'
      })
    },
    test () {
      this.params = Object.assign(this.params, {from: 'point'})
      this.$router.replace({
        name: 'test',
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
      if (this.pagination.next.text === '知识点验收') {
        this.test()
      }
      if (this.pagination.current >= this.points.length - 1) {
        this.pagination.current = this.points.length
        this.pagination.next.text = '知识点验收'
      } else {
        this.pagination.current++
      }
    }
  }
}
</script>
