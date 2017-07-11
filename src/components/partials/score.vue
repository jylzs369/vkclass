<template>
  <svg class="circle" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="47.5" fill="transparent" stroke="#CCCCCC" stroke-width="1" stroke-linecap="round" />
    <path class="animate" :d="path" fill="transparent" :stroke="pass ? '#009949': '#E55346'" stroke-width="5" stroke-linecap="round" />
  </svg>
</template>

<script>
export default {
  props: {
    pass: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      path: ''
    }
  },
  watch: {
    'progress' (value) {
      let progress = value / 100
      if (progress === 1) {
        this.path = 'M 49 96.5 A 47 47, 0, 1, 1, 49.6 96.5'
      } else if (progress === 0) {
      } else {
        let degrees = progress * 360
        let rad = degrees * (Math.PI / 180)
        let x = (50 - Math.sin(rad) * 47.5).toFixed(1)
        let y = (50 + Math.cos(rad) * 47.5).toFixed(1)
        if (progress <= 0.5) {
          this.path = 'M 50 97.5 A 47.5 47.5, 0, 0, 1, ' + x + ' ' + y
        } else {
          this.path = 'M 50 97.5 A 47.5 47.5, 0, 1, 1, ' + x + ' ' + y
        }
      }
    }
  }
}
</script>

<style scoped>
  .circle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  path.animate {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash 2s linear 1 forwards;
  }
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
