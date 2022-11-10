<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SlideShow from '../components/SlideShow.vue'
import Category from '../components/Category.vue'
import HomeCard from '../components/HomeCard.vue'
import Player from '../components/player/Container.vue'
import $api from '@/utils/api'

//获取轮播图
let slideshowDatas = ref([])
async function getSlideshow() {
  try {
    slideshowDatas.value = (await $api.getSlideshow()).data
  }catch(err) {
    console.log(err)
  }
}

//频道
let category = ref([])
async function getCategory() {
  try {
    category.value = (await $api.getCategory()).data.groups
  }catch(err) {
    console.log(err)
  }
}

//猜你喜欢
let like = ref([])
async function getLike() {
  try {
    like.value = (await $api.getLike()).data.list
  }catch(err) {
    console.log(err)
  }
}

//获取推荐
let recommend = ref([])
async function getRecommend() {
  try {
    recommend.value = (await $api.getRecommend()).data.list
  }catch(err) {
    console.log(err)
  }
}


onMounted(() => {
  getSlideshow()
  getCategory()
  getLike()
  getRecommend()
})
</script>

<template>
  <main>
    <div class="main-content">
      <!-- 轮播图 -->
      <SlideShow :slideshowDatas="slideshowDatas" />
      <!-- 频道 -->
      <Category :categoryDatas="category" />
      <!-- 猜你喜欢 -->
      <HomeCard :albumList="like" title="猜你喜欢" :like="1" />
      <!-- 推荐 -->
      <HomeCard
        v-for="item in recommend"
        :key="item.id"
        :albumList="item.albumList"
        :title="item.title"
        :moreUrl="item.moreUrl"
        :hotword="item.hotword"
        :rankList="item.soar"
      />
      <!-- 播放器 -->
      <Player />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 1080px;
  margin: 20px auto 60px;
}
</style>
