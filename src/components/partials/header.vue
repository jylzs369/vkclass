<template>
  <header>
    <a @click="back" class="back">&lt;</a>
    <h1>{{ title }}</h1>
    <a>&gt;</a>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '导航栏'
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>
