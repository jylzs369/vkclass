<template>
  <div>
      <header-bar :title="title"></header-bar>
      <section>
        <router-link tag="div" class="block" to="/course">
          <h3>必学课程</h3>
        </router-link>
      </section>
      <section>已完成</section>
      <section>
          <img :src="finishedLessons[0].banner" alt="">
      </section>
  </div>
</template>

<script>
import headerBar from './partials/header'
export default {
  data () {
    return {
      title: '必学课程',
      processing: [],
      finished: []
    }
  },
  components: {
    headerBar
  },
  created () {
    var Random = this.$mock.Random
    var data = this.$mock.mock({
      'validLessons|2': [
        {
          'id|+1': 0,
          'title': '@sentence(5)',
          'banner': Random.image('375x60')
        }
      ],
      'finishedLessons|5': [
        {
          'id|+1': 0,
          'title': '@sentence(5)',
          'banner': Random.image('375x60')
        }
      ]
    })
    console.log(data)
    this.$axios('/course').then(function (response) {
      let result = response.data
      this.processing = result.processing
      this.finished = result.finished
    })
  }
}
</script>
