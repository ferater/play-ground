import axios from 'axios';

export default {
    getItemList(query) {
        return axios({
            method: 'get',
            url: query.url,
            params: query.params
        })
    },


    fetchJson(jsonurl) {
      return fetch('statics' + jsonurl + '.json');
    }
}