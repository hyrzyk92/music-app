import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import $api from '@/utils/api'

export const useStore = defineStore('main', () => {
  const albumList = ref([])
  const player = ref({})

  async function getAlbumList() {
    try {
      albumList.value = (await $api.getAlbumList()).data.tracksAudioPlay
      getTrack(albumList.value[0].trackId)
    } catch (err) {
      console.log(err)
    }
  } 
  
  async function getTrack(id: number) {
    console.log(88)
    player.value = albumList.value.find((item) => item.trackId === id) || {};
    try {
      player.value.audioUrl = (await $api.getTrack({ id })).data.src
    } catch (err) {
      console.log(err)
    }
  }

  return { albumList, player, getAlbumList, getTrack }
})
