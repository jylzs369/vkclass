<template>
  <div class="list-item flex">
    <span class="list-title tl">{{ title }}</span>
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
