<script setup lang="ts">
defineProps<{
  title: string;
  nickname: string;
  cover: string;
}>();
</script>

<template>
  <div class="cover">
    <img :src="cover" alt="" />
  </div>
  <div class="content">
    <div>{{ title }}</div>
    <div>{{ nickname }}</div>
  </div>
</template>

<style scoped>
.cover {
  display: inline-block;
  margin-right: 20px;
}
.cover img {
  width: 80px;
  height: 80px;
  border-radius: 4px;
}
.content {
  display: inline-block;
  max-width: 160px;
}
.content div:first-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #40404c;
  font-weight: 700;
  line-height: 20px;
}
.cover div:last-child {
  color: #a3a3ac;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.4;
}
</style>
