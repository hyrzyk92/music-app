<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/index'
import { storeToRefs } from 'pinia'

interface Data {
  albumId: number;
  url: string;
  cover: string;
  playCount: string;
  title: string;
  nickname: string;
}

const store = useStore()
const { getAlbumList }  = store

const props = defineProps<{
  data: Data;
}>();
//处理播放量 万、亿
const playCount = computed(() => {
  let count = props.data.playCount.toString()
  if (count.length < 5) {
    return count
  } else if (count.length < 9) {
    return (Number(count) / 10000).toFixed(2) + '万'
  } else {
    return (Number(count) / 100000000).toFixed(2) + '亿'
  }
})

//点击播放
function onPlay(e: Event, id: number) {
  e.preventDefault()
  getAlbumList()
}
</script>

<template>
  <li class="album">
    <a :href="data.url">
      <div class="cover">
        <img v-lazy="data.cover" src="https://s1.xmcdn.com/yx/ximalaya-web-static/last/dist/images/default-album_c73995d.jpg" class="img" alt="" :title="data.title" />
        <div class="listen-count">
          <span>
            <i class="iconfont icon-erji"></i>
            {{ playCount }}
          </span>
        </div>
        <div class="player-wrapper">
          <i class="player" @click="onPlay($event, data.albumId)"></i>
        </div>
      </div>
      <div class="title">{{ data.title }}</div>
      <div class="author">{{ data.nickname }}</div>
    </a>
  </li>
</template>

<style lang="less" scoped>
.album {
  width: 140px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 20px;
  &:nth-child(n + 2) {
    margin-left: 20px;
  }
  &:nth-child(6n) {
    margin-left: 0;
  }
  
}
.cover {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  &:hover {
    .img {
      transform: scale(1.2);
    }
    .player {
      transform: scale(1);
      opacity: .95;
    }
  }
}
.player {
  display: block;
  width: 54px;
  height: 54px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAA/FBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5g2j+6eT5jHL6k3v+9PH+7ur9yb37o4//+ff+5N790Mb7s6L6moT5hWr//Pv+7Of93dX7qJT5h27+8O38wbP8uar7rJr8vK36non939j6oIuNLd5VAAAAOHRSTlMABo2JSPAE/NTE89vRIgjuzMjmv6ihSxr1TkRCPR4XDbiRj1Lou7SrJNmFbiquaVZ1Wy4U4pmANT4TenoAAAPzSURBVHja1duHehJBFAXgu4WFpUivAULHmJjEfhCCqElM0Wj0/d/FEv0msgiz0xb/Jziwd+bOzsySkExl3x4XE4VsEkhmC4ni2N6vZMiI6lHXT2KlpN87qpJOD9zuHjbY67kWaWFVyjFwiZUr6jM8dAYIYdA9IJWaI4Tm10mVfhpCcmoiuDkIy7nyz34EKcMDuXFnxyEp7jwgYY0UFEjtiP58Jw41Xgj9CU8TUCYtUAlPklCo9oTC8XpQzPYoBKsE5R6HKITdDjQo7hKndg5a5NrEJZOCJqkMcXi2B21SbY7nn4NG6Y11YA2hVdGitbwxNHvs0To9aOesnX9hQH1N/6nBgGzrn/03DSPyFq3WhQz5MmjAmObKB5CCMQmLgmwYdEwBB3EYVAuOhA6MGtMSF4Ytr9XzMMynv/QhRX4opmFcR3gOujy9nd3ezCHrldgQmN9Ofjk/PYGcx/fewcHtYjr5Y/oectgS1QGvD7PJPd9eQ8Yj+s0agNebyV/OP32AuIFFd+rgdjZZMruEOJfulMHr7SRIohjLv/twDLzmE0ZBMcassG3g9WSlxQXENMKsxFiAoGvBYrTppxSYkAGYs3cQkKAfqmDCB2BO3yK8KhEdgREIwMwEirEfKAGBAMzVRzDcReCDEQvAXL9BOD6RlwQTMoB8McZYJ5QLwJzfhCrGFmsEwgGk2oNL+2DkAjCfT8DrkGwoC8BMuYvRobHKAMyCc0SWqKg0ADPlGw5FSqgNwEzn4JCmguIAzBU4FCimOgAzx2ZZqukLwDMUahTXF+ALNotHHyDyR6CxCD/yFKHGYfgZHJ7rm4iu+SYifVPxV/AYamtGc3ApRd+OI1+QVABEuiTLgIlkUcpmokiW5VvwYkI9MOZfzbbh5TTS1/M2/bAHxvwGRaAIjG7ROFFuUrFTCysGXheqt+lCb1SeK92ofEF3KuC2CIy9rxDXoDteAbwulyb+L0o2q8kBt4XK7XqRA4uTmY4DCxqB28kVW3XIGRGzgxDe3SzOrj5dQFaT7snBuDzdV4dxlYiPbvPbdnhNIxhVomUP4zAoWaUABwYdb+MlFtqBKfGmrptsobpQkBX1VS46SMKAbJX+qQ8D6rSGDe0e0TpeCZqVPFrL6kCroRXttd7c7vZfbNZ6tbtFXJ7loUWuHe31/uHu//OBA5HnQLFHHoXTGEChbIVCq/pQJp8hAd7LONToWiSmmYAC6SYJ8/aTkFR7aZGMahlSRi2SteNLFN8OqdDsQEi+Qqo8LccR1rBOKrWOnyOEgpMh1TyX98PnbNn1SAurYSewQcJuWKRTu2/7MawU8+1+m4zIuIdOqZj+8/l/ulhyDl2xEf8dLVX8/WrSz1AAAAAASUVORK5CYII=");
  background-size: 100%;
  transition: transform .3s;
  transform: scale(.1);
  opacity: 0;
  z-index: 10;
}
.player-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  width: 100%;
  height: 100%;
  transition: transform .3s;
}
.listen-count {
  position: absolute;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(90deg,rgba(0,0,0,0.8) 0,#000 97%);
  padding: 2px 5px;
  line-height: 1.4;
  font-size: 12px;
  color: #fff;
}
.icon-erji {
  font-size: 14px;
  margin-right: 5px;
}
.title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 6px 0 3px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
  color: #40404c;
}
.author {
  font-size: 14px;
  color: #a3a3ac;
  line-height: 1.4;
}
</style>
