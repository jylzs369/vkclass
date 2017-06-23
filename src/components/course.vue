<template>
  <div>
      <header-bar :title="header.title"></header-bar>
      <section>
        <div v-for="item in processing">
          <router-link tag="div" :to="{ name: 'point', params: { employeeId: item.id}}" class="flex">
            <div><img :src="item.banner" alt=""></div>
            <h3>{{ item.title }}</h3>
          </router-link>
        </div>
      </section>
      <section>已完成</section>
      <section>
        <div v-for="item in finished">
          <router-link tag="div" :to="{ name: 'point', params: { employeeId: item.id}}" class="flex">
            <div><img :src="item.banner" alt=""></div>
            <h3>{{ item.title }}</h3>
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
      let result = res.data
      console.log(result)
      this.processing = result.processing
      this.finished = result.finished
      console.log(this.processing)
      console.log(this.finished)
    })
  }
}
</script>
