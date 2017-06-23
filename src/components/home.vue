<template>
  <div>
      <header-bar :title="title"></header-bar>
      <router-link tag="div" class="block" to="/course">
        <h3>必学课程</h3>
      </router-link>
      <router-link tag="div" class="block" to="/exam">
        <h3>每月考试</h3>
      </router-link>
      <router-link tag="div" class="block" to="/library">
        <h3>知识库</h3>
      </router-link>  
  </div>
</template>

<script>
import headerBar from './partials/header'
export default {
  data () {
    return {
      title: '万科课堂'
    }
  },
  components: {
    headerBar
  }
}
</script>
