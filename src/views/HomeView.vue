<script setup lang="ts">
import { ref } from 'vue'
import SlideShow from '../components/SlideShow.vue'
import Category from '../components/Category.vue'
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
getSlideshow()

let category = ref([])
async function getCategory() {
  try {
    category.value = (await $api.getCategory()).data.groups
  }catch(err) {
    console.log(err)
  }
}
getCategory()
</script>

<template>
  <main>
    <div class="main-content">
      <SlideShow :slideshowDatas="slideshowDatas" />
      <Category :category="category" />
    </div>
  </main>
</template>

<style scoped>
.main-content {
  width: 1080px;
  margin: 20px auto 0;
}
</style>
