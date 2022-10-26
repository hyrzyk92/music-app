<script lang="ts" setup>
import { ref } from 'vue'
interface SlideShowItem {
  id: number;
  url: string;
  coverPath: string;
  longTitle: string;
  [propName: string]: any;
}

const props = defineProps<{
  slideshowDatas: SlideShowItem[];
}>()

let len = props.slideshowDatas.length
let styles = ref([
  {
    zIndex: -1,
    opacity: 0,
    transform: "translate(-160px, 0) scale(0.87)",
  },
  {
    zIndex: 1,
    opacity: 0.8,
    transform: "translate(0, 0) scale(0.87)",
    transformOrigin: '0% 50%'
  },
  {
    zIndex: 3,
    opacity: 1,
    transform: "translate(165px, 0) scale(1)",
  },
  {
    zIndex: 1,
    opacity: 0.8,
    transform: "translate(330px, 0) scale(0.87)",
    transformOrigin: '100% 50%'
  },
]);
let i = 4
while (i < len) {
  styles.value.push({
    zIndex: -1,
    opacity: 0,
    transform: `translate(${330 + (i - 3) * 160}px, 0) scale(0.87)`,
  })
}
let timer;
function start() {
  timer = setInterval(function() {
    styles.value.push(styles.value.shift());
  }, 3000);
}
start()
function onPrev() {
  clearInterval(timer)
  styles.value.unshift(styles.value.pop())
  start()
}
function onNext() {
  clearInterval(timer)
  styles.value.push(styles.value.shift());
  start()
}
</script>

<template>
  <div class="slider-wrap">
    <i class="operation-left-btn" @click="onPrev"></i>
    <i class="operation-right-btn" @click="onNext"></i>
    <ul class="slider-list">
      <li
        v-for="(item, index) in slideshowDatas"
        :key="item.id"
        class="slider-item"
        :style="styles[index]"
      >
        <a :href="item.url">
          <img
            class="slider-pic"
            :src="item.coverPath"
            :title="item.longTitle"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.slider-wrap {
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.slider-list {
  width: 100%;
  position: relative;
  height: 300px;
  overflow: hidden;
}
.slider-item {
  width: 750px;
  height: 300px;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
  border-radius: 6px;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.slider-pic {
  width: 750px;
  height: 300px;
}
.operation-left-btn {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAyBAMAAAC5cHbcAAAALVBMVEUAAAA9PT3v7+/n5+d5eXkAAAAAAAAAAADh4eEAAADz8/PGxsaSkpJiYmIODg4PHZa/AAAAD3RSTlMzP8u3UgAmEKsb1oZeSTWj9cjKAAAAQklEQVQoz2NAAemhDKhgKhqfHY3PxkABYGlE5TsZokorC4xIaYauA6h8YRVUPqORw8hUoIumYB/JSY6NQHqeip4fAEVoEJ7rSjzcAAAAAElFTkSuQmCC);
  left: 0;
}
.operation-right-btn {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAyBAMAAAC5cHbcAAAAKlBMVEUAAAA9PT3v7+/n5+d5eXkAAAAAAAAAAADh4eEAAADz8/PGxsaSkpJiYmLK2R3YAAAADnRSTlMzP8u3UgAmEKsb1oZeSUaiznEAAABESURBVCjPYwgtY0ABkQyooACNn8BAKZBwQOULq6DyGY1GFYAAzwpUvpMhCpdFWWBkSF9ClWbgBkoTDxIw0jPe9I6eHwCyMxDqoi0N+AAAAABJRU5ErkJggg==);
  right: 0;
}
.operation-left-btn, .operation-right-btn {
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
  width: 30px;
  height: 50px;
  cursor: pointer;
}
</style>