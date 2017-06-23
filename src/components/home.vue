<template>
  <div>
      <header-bar :title="header.title"></header-bar>
      <section class="border summary">
        <div class="flex tc">
          <div class="days">
            <h4>已学习</h4>
            <p>{{ summary.days }} 天</p>
          </div>
          <div class="points">
            <h4>学习知识点</h4>
            <p>{{ summary.points }} 条</p>
          </div>
        </div>
        <div class="ranking tc">已经打败了{{ summary.ranking }}%的万科人</div>
      </section>
      <router-link tag="section" to="/course">
        <list-item class="arrow-right" :title="'必学课程'" :subTitle="summary.course"></list-item>
        <img src="http://dummyimage.com/375x80/894FC4/FFF.png&text=!" alt="">
      </router-link>
      <router-link tag="section" to="/exam">
        <list-item class="arrow-right" :title="'每月考试'" :subTitle="summary.exam"></list-item>
        <img src="http://dummyimage.com/375x80/894FC4/FFF.png&text=!" alt="">
      </router-link>
      <router-link tag="section" to="/library">
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
      summary: {}
    }
  },
  components: {
    headerBar,
    listItem
  },
  created () {
    this.$axios.get('/home').then(res => {
      this.summary = res.data
    })
  }
}
</script>
