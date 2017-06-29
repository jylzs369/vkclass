<template>
  <div class="pagination flex">
    <a @click="prev" class="prev arrow-left" :class="prevBtn.disabled ? 'disabled' : '' ">{{ prevBtn.text || '&nbsp;' }}</a>
    <span class="pagea">{{ current }} / {{ total }}</span>
    <a @click="next" class="next arrow-right" :class="{ disabled: nextBtn.disabled }">{{ nextBtn.text || '&nbsp;' }}</a>
  </div>
</template>

<script>
export default {
  props: {
    prevBtn: {
      type: Object,
      default () {
        return {
          text: '',
          disabled: false
        }
      }
    },
    nextBtn: {
      type: Object,
      default () {
        return {
          text: '',
          disabled: false
        }
      }
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  methods: {
    prev () {
      this.$emit('prev')
    },
    next () {
      this.$emit('next')
    }
  }
}
</script>
