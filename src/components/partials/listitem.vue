<template>
  <div class="list-item list-title flex">
    <span class="tl">{{ title }}</span>
    <span class="subtitle tr">{{ subTitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      default: ''
    }
  }
}
</script>

<style scoped>
  .list-item .subtitle {
    padding-right: 1em;
  }
</style>
