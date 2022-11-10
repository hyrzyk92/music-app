<script setup lang="ts">
import { ref, watchEffect } from "vue";
import AlbumItem from "./AlbumItem.vue";
import RankItem from "./RankItem.vue";
import { XMLY_DOMAIN } from '@/utils/const'
import { genRandom } from '@/utils'

const props = defineProps<{
  albumList: any[];
  rankList?: any[];
  title: string;
  like?: number;
  moreUrl?: string;
  hotword?: string;
}>();

let mainDatas = ref<any[]>([]);
watchEffect(() => {
  if (props.albumList.length) {
    if (props.like) {
      mainDatas.value = [...genRandom(props.albumList, 5)];
    } else {
      mainDatas.value = props.albumList;
    }
  }
});
//换一批
function onRefresh() {
  mainDatas.value = [...genRandom(props.albumList, 5)];
}

//解析关键词
let words = ref<string[]>([])
if (props.like === 0) {
  words.value = props.hotword.split(',')
}
</script>

<template>
  <div class="wrap">
    <div class="list">
      <div class="head">
        <div class="title">{{ title }}</div>
        <div class="hotword">
          <a
            v-for="wd in words"
            :key="wd"
            :href="`${XMLY_DOMAIN}/so/${wd}`"
            :title="wd"
            >{{ wd }}</a
          >
        </div>
        <div class="head-rt">
          <span v-if="like" class="refresh" @click="onRefresh">
            <i class="iconfont icon-shuaxin"></i>换一批
          </span>
          <a v-else class="more" :href="moreUrl">更多</a>
        </div>
      </div>
      <div class="content">
        <ul class="album-wrap">
          <AlbumItem
            v-for="item in mainDatas"
            :key="item.albumId"
            :data="item"
          />
        </ul>
      </div>
    </div>
    <div v-if="!like" class="rank">
      <div class="rank-title">{{ title }}新书榜</div>
      <ul>
        <li class="rank-item" v-for="(item, index) in rankList" :key="item.albumId">
          <a :href="item.url">
            <RankItem
              v-if="index < 3"
              :title="item.title"
              :cover="item.cover"
              :nickname="item.nickname"
            />
            <div v-else>
              <div class="index-order">
                {{index + 1}}
              </div>
              <div class="order-content">{{item.title}}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap {
  overflow: hidden;
}
.list {
  width: 800px;
  float: left;
}
.head {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.title {
  font-size: 20px;
  line-height: 1.4;
  color: #40404c;
  padding-left: 16px;
  position: relative;
  &::before {
    content: "";
    width: 5px;
    height: 15px;
    background-color: #f86442;
    border-radius: 6px;
    position: absolute;
    left: 0;
    top: 6px;
  }
}
.head-rt {
  margin-left: auto;
  padding-right: 20px;
}
.refresh, .more {
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #f86442;
  }
}
.icon-shuaxin {
  font-size: 20px;
  margin-right: 10px;
  vertical-align: -3px;
}
.more {
  color: #72727b;
}
.hotword {
  position: relative;
  top: 3px;
  a {
    display: inline-block;
    font-size: 12px;
    &:first-child {
      padding-left: 20px;
    }
    &:not(:last-child) {
      &::after {
        content: '|';
        width: 1px;
        height: 10px;
        color: #e8e8e8;
        padding: 0 10px;
      }
    }
  }
}
.rank {
  width: 260px;
  margin-left: 20px;
  float: left;
}
.rank-title {
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
  color: #333;
}
.rank-item {
  padding: 10px 0;
}
.index-order {
  width: 15px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  color: #a3a3ac;
  text-align: left;
  display: inline-block;
  vertical-align: middle;
}
.order-content {
  max-width: 235px;
  text-align: right;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #40404c;
  font-weight: 700;
  line-height: 20px;
  vertical-align: middle;
}
</style>
