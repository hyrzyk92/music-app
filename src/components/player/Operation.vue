<script setup lang="ts">
import { ref } from "vue";
import { downloadAudio } from "@/utils/index";
import { useStore } from "@/stores/index";

const props = defineProps<{
  rate: string;
  showAlbumList: boolean;
  loopType: number;
}>();

const emits = defineEmits<{
  (e: "update:rate", v: string): void;
  (e: "update:showAlbumList", flag: boolean): void;
  (e: "changeLoopType"): void;
}>();

const store = useStore();

const rateList = ref<string[]>(["3.0", "2.0", "1.5", "1.0", "0.5"]);
const showRateList = ref<boolean>(false);

function chooseRate(v: string) {
  emits("update:rate", v);
  showRateList.value = false;
}

function toggleAlbumList() {
  emits("update:showAlbumList", !props.showAlbumList);
}
//点赞
const like = ref<boolean>(false);

//下载
function download() {
  if (store.player.audioUrl) {
    downloadAudio(store.player.audioUrl, store.player.trackName);
  }
}

</script>

<template>
  <div>
    <div class="player-operations fl">
      <div v-show="showRateList" class="play-rate-wrapper">
        <div v-for="item in rateList" :key="item" @click="chooseRate(item)">
          {{ item }}
        </div>
      </div>
      <a
        class="btn play-rate"
        href="javascript: void(0);"
        @click="showRateList = !showRateList"
        >x {{ rate }}</a
      >
      <a class="btn" @click="like = !like">
        <v-icon v-if="!like" type="dianzan" class="font-icon-18" />
        <v-icon v-else type="xihuan" class="font-icon-18 like" />
      </a>
      <a class="btn" @click="download">
        <v-icon type="xiazai" class="font-icon-18" />
      </a>
      <a class="btn">
        <v-icon type="fenxiang" class="font-icon-18" />
      </a>
    </div>
    <div class="player-controls fl">
      <a class="btn">
        <v-icon type="shengyin_shiti" class="font-icon-18" />
      </a>
      <a class="btn" @click="$emit('changeLoopType')">
        <v-icon v-if="loopType === 1" type="xunhuan" class="font-icon-18" />
        <v-icon v-else-if="loopType === 2" type="danquxunhuan" class="font-icon-18" />
        <v-icon v-else type="xunhuan1" class="font-icon-18" />
      </a>
      <a class="btn">
        <v-icon
          type="24gf-playlist2"
          class="font-icon-18"
          @click="toggleAlbumList"
        />
      </a>
    </div>
  </div>
</template>

<style scoped lang="less">
//控件
.player-operations {
  margin-left: 41px;
  margin-top: 17px;
  position: relative;
  &::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: #72727b;
  }
  .btn {
    color: #fff;
    margin-right: 18px;
    &:hover {
      color: #f86442;
    }
  }

  .play-rate {
    width: 40px;
    text-align: center;
    display: inline-block;
    color: #e8e8e8;
    line-height: 20px;
  }
}
.player-controls {
  margin-top: 17px;
  .btn {
    color: #fff;
    margin-left: 14px;
    &:hover {
      color: #f86442;
    }
  }
}
.play-rate-wrapper {
  background-image: linear-gradient(
    -180deg,
    rgba(51, 51, 51, 0.75) 0,
    rgba(0, 0, 0, 0.85) 100%
  );
  padding: 5px 10px;
  text-align: center;
  border-radius: 3px;
  position: absolute;
  top: -125px;
  color: #e8e8e8;
  div {
    cursor: pointer;
    &:hover {
      color: #f86442;
    }
  }
}
.like {
  color: #f86442;
}
</style>
