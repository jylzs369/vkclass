<template>
  <div>
      <header-bar :title="header.title" @back="back"></header-bar>
      <section class="summary border-bottom">
        <div class="greeting">
          <h3>您好，{{ user.name }}</h3>
          <p class="motto">{{ motto }}</p>
        </div>
        <div class="detail flex tc">
          <div class="days">学习{{ summary.days }} 天</div>
          <div class="points">掌握知识点{{ summary.points }} 条</div>
        </div>
        <div class="ranking">已经打败了{{ summary.ranking }}%的万科人</div>
      </section>
      <router-link tag="section" to="/course" class="sub-summary no-padding border-vertical">
        <list-item class="arrow-right" :title="'必学课程'" :subTitle="summary.course"></list-item>
        <img src="http://dummyimage.com/375x80/894FC4/FFF.png&text=!" alt="">
      </router-link>
      <router-link tag="section" to="/exam" class="sub-summary no-padding border-vertical">
        <list-item class="arrow-right" :title="'每月考试'" :subTitle="summary.exam"></list-item>
        <img src="http://dummyimage.com/375x80/894FC4/FFF.png&text=!" alt="">
      </router-link>
      <router-link tag="section" to="/library" class="sub-summary no-padding border-vertical">
        <list-item class="arrow-right" :title="'知识库'"></list-item>
        <img src="http://dummyimage.com/375x80/894FC4/FFF.png&text=!" alt="">
      </router-link>  
  </div>
</template>

<script>
import headerBar from './partials/header'
import listItem from './partials/listitem'
export default {
  data () {
    return {
      header: {
        title: '万物课堂'
      },
      user: {},
      summary: {},
      motto: ''
    }
  },
  components: {
    headerBar,
    listItem
  },
  created () {
    this.user.name = this.$store.state.name || '亲爱的用户'
    this.motto = '趁时光未老，想着理想与未来放肆折腾。'
    this.$axios.get('/home').then(res => {
      this.summary = res.data.summary
    })
  },
  methods: {
    back () {
      this.$close()
    }
  }
}
</script>
