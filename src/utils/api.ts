import axios from '@/plugins/axios'

class Api {
    getSlideshow() {
        return axios.get('/song/slideshow')
    }
    getCategory() {
        return axios.get('/song/line')
    }
}

export default new Api()