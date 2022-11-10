import axios from '@/plugins/axios'

interface GetTrackParamsType {
  id: number
}

class Api {
  //轮播图
  getSlideshow() {
    return axios.get("/song/slideshow");
  }
  //频道
  getCategory() {
    return axios.get("/song/line");
  }
  //猜你喜欢
  getLike() {
    return axios.get("/song/like");
  }
  //推荐
  getRecommend() {
    return axios.get("/song/getRecommend");
  }

  //album子集
  getAlbumList() {
    return axios.get("/song/albumList");
  }

  //获取声源
  getTrack({ id }: GetTrackParamsType) {
    return axios.get("/song/track", {
      params: {
        id
      }
    });
  }
}

export default new Api()