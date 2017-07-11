<template>
  <div class="count-down color-danger font-small tc bg-white border-bottom">【限时考试】{{ time }} 后自动提交</div>
</template>

<script>
export default {
  props: {
    timelimit: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.time = this.timelimit + ':00'
    this.countdown()
  },
  data () {
    return {
      time: ''
    }
  },
  methods: {
    countdown () {
      if (this.time === '00:00') {
        this.$parent.getResults(this.$parent)
        clearTimeout(timer)
      }
      this.changeTime()
      var timer = setTimeout(() => {
        this.countdown()
      }, 1000)
    },
    changeTime () {
      let time = this.time.split(':')
      if (time[1] === '00') {
        time[1] = 59
        time[0] = parseInt(time[0]) <= 10 ? '0' + (time[0] - 1) : time[0] - 1
      } else {
        time[1] = time[1] - 0
        time[1] = parseInt(time[1]) <= 10 ? '0' + (time[1] - 1) : time[1] - 1
      }
      this.time = time.join(':')
    }
  }
}
</script>
