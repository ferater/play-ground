import axios from 'axios';

export default {
    getItemList(query) {
        return axios({
            method: 'get',
            url: '/api/' + query.url,
            params: query.params
        })
    },


    storeItem(query) {
        return axios({
            method: 'post',
            url: '/api/' + query.url,
            data: query.data
        })
    },


    updateItem(query) {
        return axios({
            method: 'put',
            url: '/api/' + query.url + '/' + query.data.id,
            data: query.data
        })
    },


    deleteItem(query) {
        return axios({
            method: 'delete',
            url: '/api/' + query.url + '/' + query.id,
        })
    },


    fetchJson(jsonurl) {
      return fetch('statics/' + jsonurl + '.json');
    }
}