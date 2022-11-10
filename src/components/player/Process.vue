<script lang="ts" setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { parseTime } from "@/utils/index";
import { XMLY_DOMAIN, STATIC_DOMAIN } from "@/utils/const";

const props = defineProps(['player', 'playing', 'rate', 'loopType'])
const emits = defineEmits<{
  (e: 'update:playing', flag: boolean): void;
  (e: 'onNext'): void;
  (e: 'onRandom'): void;
}>()

const percent = ref<number>(0) //进度百分比
const curTime = ref<number>(0) //播放至时间
const flag = ref<boolean>(false) //控制进度条是否移动
const audio = new Audio()
audio.autoplay = true
//鼠标按下
const processRef = ref<HTMLDivElement | null>(null)
const processWidth = ref<number>(0)
function onProcessDown(e: MouseEvent) {
  if (!props.player?.audioUrl) return;
  flag.value = true
  let x = e.offsetX
  if (x > processWidth.value) return;
  calculateProcess(x)
}
//鼠标抬起
function onProcessUp() {
  flag.value = false
  audio.play()
}
//拖动
function onProcessMove(e: MouseEvent) {
  e.preventDefault()
  if(!flag.value) return
  audio.pause()
  let x = e.offsetX
  if (x > processWidth.value) return;
  calculateProcess(x)
}
//计算进度
function calculateProcess(x: number, auto?: boolean) {
  if (auto) { //音频自动控制的播放进度
    percent.value = Number.parseFloat(
      (Number(x) / Number(props.player.duration)).toFixed(6)
    );
    curTime.value = x
  } else { //手动选择进度
    percent.value = Number.parseFloat(
      (Number(x) / Number(processWidth.value)).toFixed(6)
    );
    curTime.value = Number.parseFloat(
      (props.player.duration * percent.value).toFixed(6)
    );
    audio.currentTime = curTime.value
  }
}
//获取进度条宽度
watchEffect(() => {
  if (processRef.value) {
    processWidth.value = processRef.value.offsetWidth
  } 
})
//获取音源
watchEffect(() => {
  if (props.player?.audioUrl) {
    audio.pause()
    audio.currentTime = 0
    audio.src = props.player.audioUrl
  }
})
watchEffect(() => {
  if (props.playing) {
    audio.play()
  } else {
    audio.pause()
  }
})
//改变播放速度
watchEffect(() => {
  audio.playbackRate = Number(props.rate)
})
audio.addEventListener('canplay', function() {
  emits("update:playing", true);
})
//音频播放进度
audio.addEventListener('timeupdate', function() {
  let time = Number.parseInt(audio.currentTime.toString())
  if (curTime.value === time) return;
  if(time > props.player.duration) {
    time = props.player.duration
  }
  calculateProcess(time, true)
})
//播放结束
audio.addEventListener('ended', function() {
  if(props.loopType === 1) {//列表
    emits('onNext')
  } else if(props.loopType === 2) { //单曲
    audio.currentTime = 0
    audio.play()
  }else {//随机
    emits('onRandom')
  }
})
</script>

<template>
  <div class="player-body">
    <div class="player-body-title">
      <a
        :href="player.trackUrl ? XMLY_DOMAIN + player.trackUrl : XMLY_DOMAIN"
        >{{ player.trackName || "喜马拉雅" }}</a
      >
    </div>
    <div>
      <div class="player-process" ref="processRef" @mousedown="onProcessDown" @mousemove="onProcessMove" @mouseup="onProcessUp">
        <div class="player-process-cur" :style="{ width: `${percent * 100}%` }"></div>
      </div>
      <div class="player-playtime">
        {{ parseTime(curTime) }}
        <span>{{
          ` / ${player.duration ? parseTime(player.duration) : "00:00:00"}`
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
//进度条
.player-body {
  display: inline-block;
  margin-left: 20px;
  width: 612px;
  position: relative;
}
.player-body-title {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  a {
    color: #fff;
    &:hover {
      color: #f86442;
    }
  }
}
.player-process {
  background: transparent
    linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95));
  width: 490px;
  height: 2px;
  cursor: pointer;
}
.player-process-cur {
  height: 2px;
  background: #f86442;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    right: -5px;
    top: -5px;
  }
}
.player-playtime {
  color: #e8e8e8;
  position: absolute;
  right: -5px;
  bottom: -5px;
  font-size: 12px;
  span {
    color: #a3a3ac;
  }
}
</style>
