<template>
  <header>
    <a @click="back" class="back arrow-left tl">&nbsp;</a>
    <h1>{{ title }}</h1>
    <a class="tr" :class="{ 'arrow-right': next }">&nbsp;</a>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '导航栏'
    },
    next: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>
