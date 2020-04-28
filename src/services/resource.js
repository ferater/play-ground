import axios from 'axios';

export default {
    getItemList(query) {
        return axios({
            method: 'get',
            url: '/api/' + query.url,
            params: query.params
        })
    },

    getItemWithRelation(query) {
        return axios({
            method: 'get',
            url: '/api/' + query.url + '/' + query.id + '/' + query.relation
        })
    },


    storeItem(resource) {
        return axios({
            method: 'post',
            url: '/api/' + resource.url,
            data: resource.data
        })
    },


    updateItem(resource) {
        return axios({
            method: 'put',
            url: '/api/' + resource.url + '/' + resource.data.id,
            data: resource.data
        })
    },


    deleteItem(query) {
        return axios({
            method: 'delete',
            url: '/api/' + query.url + '/' + query.id,
        })
    },


    fetchJson(query) {
      return fetch('statics/' + query.jsonName + '.json');
    }
}