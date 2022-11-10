<script setup lang="ts">
import { useStore } from "@/stores/index";
const store = useStore();

interface AlbumListType {
  trackId: number;
  trackName: string;
  albumName: string;
  createTime: string;
  [propName: string]: any;
}
const props = defineProps<{
  showAlbumList: boolean;
  albumList: AlbumListType[];
  playing: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:playing', flag: boolean): void
}>()

function onPlayTrack(trackId: number) {
  if (trackId === store.player.trackId) {
    emits("update:playing", !props.playing);
  }else {
    store.getTrack(trackId)
  }
}
</script>

<template>
  <div v-show="showAlbumList" class="player-list-wrapper">
    <div class="list-head">
      <h4 class="list-title">播放列表({{ albumList.length }})</h4>
      <span class="reset">清空列表</span>
    </div>
    <div class="list-body">
      <ul>
        <li
          v-for="(item, index) in albumList"
          :key="item.trackId"
          @click="onPlayTrack(item.trackId)"
          :class="{ 'active': store.player.trackId === item.trackId }"
        >
          <div class="col-1 fl">{{ index + 1 }}</div>
          <div class="col-2 fl">{{ item.trackName }}</div>
          <div class="col-3 fl">{{ item.albumName }}</div>
          <div class="col-4 fr">{{ item.createTime }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 播放列表
.player-list-wrapper {
  width: 1080px;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 4px 4px 0 0;
  left: 50%;
  margin-left: -540px;
  bottom: 50px;
  z-index: 10;
}
.list-head {
  margin: 0 20px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid rgba(163, 163, 172, 0.2);
}
.list-title {
  font-size: 20px;
  font-weight: 400;
}
.reset {
  cursor: pointer;
  &:hover {
    color: #f86442;
  }
}
.list-body {
  height: 260px;
  overflow: auto;
  &::-webkit-scrollbar {
    background-color: #000;
  }
  ul {
    overflow: hidden;
  }
  li {
    min-height: 42px;
    line-height: 42px;
    cursor: pointer;
    padding: 0 20px 0 45px;
    color: #a3a3ac;

    &:hover {
      background-color: rgba(64, 64, 76, 0.5);
    }
  }
}
.col-1 {
  width: 34px;
  text-align: center;
}
.col-2 {
  margin-left: 5px;
  width: 560px;
  color: #fff;
}
.col-3 {
  width: 300px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.active {
  .col-1, .col-2 {
    color: #f86442;
  }
}
</style>
