<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { XMLY_DOMAIN, STATIC_DOMAIN } from "@/utils/const";
import PlayList from "./PlayList.vue";
import Process from "./Process.vue";
import Operation from "./Operation.vue";

const store = useStore();
const { albumList, player } = storeToRefs(store);
//播放状态
const playing = ref<boolean>(false);
//暂停
function onPause(e: Event) {
  e.preventDefault();
  playing.value = false;
}
//播放
function onPlay(e: Event) {
  e.preventDefault();
  playing.value = true;
}
//播放速率
const rate = ref<string>("1.0");

//展示、隐藏播放列表
const showAlbumList = ref<boolean>(false);

//改变循环
const loopType = ref<number>(1); //1循环 2单曲循环 3随机播放
function changeLoopType() {
  let v = loopType.value;
  if (v < 3) {
    v++;
  } else {
    v = 1;
  }
  loopType.value = v;
}

//下一首
function onNext() {
  let idx = albumList.value.findIndex(item => item.trackId === player.value.trackId)
  if(idx === albumList.value.length - 1) {
    idx = 0
  }else {
    idx = idx + 1
  }
  store.getTrack(albumList.value[idx].trackId)
}
//随机
function onRandom() {
  let idx = Math.floor(Math.random() * albumList.value.length)
  store.getTrack(albumList.value[idx].trackId)
}
</script>

<template>
  <div class="wrapper">
    <div class="player-wrapper">
      <div class="player-main">
        <!-- 图 -->
        <a
          :href="player.trackUrl ? XMLY_DOMAIN + player.trackUrl : XMLY_DOMAIN"
          class="player-cover fl"
        >
          <img
            v-if="player.trackCoverPath"
            :src="STATIC_DOMAIN + player.trackCoverPath"
            alt=""
          />
        </a>
        <!-- 播放按钮 -->
        <div class="player-btns fl">
          <a href="#" class="prev">
            <i class="iconfont icon-shangyishou font-icon-12"></i>
          </a>
          <a href="javascript: void(0);" :class="[playing ? 'pause' : 'play']">
            <i
              v-if="playing"
              class="iconfont icon-zanting"
              @click="onPause"
            ></i>
            <i v-else class="iconfont icon-bofang" @click="onPlay"></i>
          </a>
          <a href="#" class="next">
            <i class="iconfont icon-xiayishou font-icon-12"></i>
          </a>
        </div>
        <!-- 进度条 -->
        <Process
          class="fl"
          :player="player"
          v-model:playing="playing"
          v-model:rate="rate"
          :loopType="loopType"
          @onNext="onNext"
          @onRandom="onRandom"
        />
        <!-- 控件 -->
        <Operation
          v-model:rate="rate"
          v-model:showAlbumList="showAlbumList"
          :loopType="loopType"
          @changeLoopType="changeLoopType"
        />
      </div>
    </div>
    <!-- 播放列表 -->
    <PlayList
      :albumList="albumList"
      v-model:showAlbumList="showAlbumList"
      v-model:playing="playing"
    />
  </div>
</template>

<style lang="less" scoped>
.player-wrapper {
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 20;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAyCAYAAADsg90UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0RGNkM1N0QxODQzMTFFOEE1NzJGMDkxNkQ5NTc0OEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0RGNkM1N0UxODQzMTFFOEE1NzJGMDkxNkQ5NTc0OEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3REY2QzU3QjE4NDMxMUU4QTU3MkYwOTE2RDk1NzQ4QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3REY2QzU3QzE4NDMxMUU4QTU3MkYwOTE2RDk1NzQ4QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PocCwbcAAAMjSURBVHja5FpRqhsxDLSEIF+5x7v/HXqBUmgvk7hxkLazs/Lr++zQhZB9liYPBnkkS46Pj49vc85hZgOfWlvf62E7+6jioxzye3lNdIDHJi3gmio+ns/nQc2LpeVj7v7++2Vj0t6+yw42aXwUa8DgYYTQsj+kzredbLL4yJcKHRv4a0kphBWyffJTxUcxls6nUEFWWTyAOGl8gHB0IjGIydM7R48iPh6Px6woWgJS6aJJI0ZppxiXxi+59AQYhkcyyuHEtqGOj5m0UYgMzKcQSSUw77ArnDI+dkyReKC6GhUa0vigggIdJlVWq8Cwlz/6GKUYObzn3jHaR7Pe02ZVQDSMS+ODa2YwGu6Xxm+3LoV3ZKjbT5BbDT/J8lDHB+bSYgzXiDlk1CDPyuKP02AKxEk9QTSQwdEIjSzei7VXRXiEUK2RaGAxMSHkpPHeObxCw+HHLj+S9tamhvfu5LTCBsEoNPjZnbyU8CWCnpFxaiisPQT58/035tsVdtl9kcVXJXhSx2wZzSWQ+Q9qT13q61yTxTur46IRxOP0vlFSaXxwD2EJBJys2nduLCjjnRnpztOYWij0TB0fKSRHziyhyLxaLWRsNRuuLZwy3gHMzJ5SyPKBSutQW3n86glyVVV982ISBaSEpTDq+Eg9QJXkAmJSD+5y8lLGryzQGQe1kPgbBxPSeKcGweBuC5eT5Z9hZOr4IPZ4wGBQYs7PBg6qeE/RuFRXpayNeh6fOoIq4+1+v38f//ETNECczTCxW9vZ5fA4GDlNWKHfZjWA7GaPhJHD+yc99tNEhfptOz85vONBgXpteMQ8ig3sq/FBQxF/mQs0ZeSAw8WuBy+Lt9vt9qPu0UwcsEOvvdZwEktrsvjAiwOdIPLVE15TxzsWDFhM4E2rTQf2UnAo4gPZqJEShMzAKyc0kuILCZL49n7AZvLKSmpd3a2G9+Z2xcWpSTFjk2/l8BYRP79QMu5sfytD/3m8Q8/McKCIJ6myscjAuix+dUZ/NR2TiTcxscECS9YwLIcP2iucLgwLDey8UINBFo8ETO6wcDVFF48HNSMl8b8FGAAkj11Y6WBqEQAAAABJRU5ErkJggg==")
    center repeat-x;
}
.player-main {
  width: 1080px;
  height: 100%;
  margin: 0 auto;
}
//图
.player-cover {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  display: inline-block;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUdwTP8xAPooAPopAPspAP8tAPopAPooAPooAPooAPooAPooAP7+/vtvVfo+G/pAHfyciv3DuftiRf7h3PyKdftPL/tdP/7Ty/7s6fymlftoTfx9ZfozDfo/HP24q4bX9WMAAAALdFJOUwAatptOHNls8/3yOBb+cAAAAR5JREFUeNrtl9tugzAMQA0UkjRdt5Zwbcv/f+a8EtXQCKm2pT1xnmInR5HyENsQKU1eWf8BtspNCUuywnkGrsjIPVjP5HiAiHGejTPxXnQF9vPuzHoRxwzlwgspAEonlV0JxosxkMvlHCq5XIGVyxZWYahPkTrMmVvMED0dh5W7PBSe7ilh2JBXt9SUWTLdN2Tc68YWGTtcxkx/uy54eCKRm3nVkBx8wpb8Pa/OJH/t8j/K088bDDmh08gtR+4uLzCaGtmDxWiXd3mXeXIjkqnc/PkPpkxlDX+pFgsdUw6vX2rCGsWQqbj343mIxZ1egaJETqDjl7eIIffDPYkIVUOjaqVUTZyqfVQ1rpqWWdWsa8YEzYCiGY3UQ5lqHPwFuPGboDCx3UAAAAAASUVORK5CYII=")
    center no-repeat;
  background-size: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
//播放按钮
.player-btns {
  display: inline-block;
  margin-top: 10px;
  a {
    display: inline-block;
    margin-left: 20px;
    color: #fff;
    vertical-align: middle;
    &:hover {
      color: #f86442;
    }
  }
}
.play,
.pause {
  i {
    font-size: 30px;
  }
}

.font-icon-12 {
  font-size: 12px;
}
.font-icon-18 {
  font-size: 18px;
}
</style>
