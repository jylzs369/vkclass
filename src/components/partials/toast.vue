<template>
  <transition name='fade'>
  <div class="toast" :class="visible ? 'fade-in' : 'fade-out'">
    <i v-if="icon" class="icon" :class="icon.type"></i>
    <span :class="">{{ content }}</span>
  </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    icon: {
      type: Object,
      default () {
        return {
          type: ''
        }
      }
    }
  },
  watch: {
    'visible' (value) {
      if (value) {
        setTimeout(() => {
          document.querySelect('.toast').style.display = 'none'
        }, 2000)
      }
    }
  }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 30%;
    left: 50%;
    max-width: 80%;
    transform: translateX(-50%);
    word-wrap: break-word;
    text-align: center;
    font-size: 80%;
    color: #fff;
    background: rgba(0, 0, 0, .7);
    padding: .5em 1em;
    border-radius: .5em;
  }
</style>
