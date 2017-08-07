import Vue from 'vue';

export const APP_STATUS_UPDATE = 'APP_STATUS_UPDATE'; //登录成功

const STORE_KEY = 'APP_STATUS';

export  default  {
    state: {},
    mutations: {
        [APP_STATUS_UPDATE](state, status){
            Object.assign(state, status);
        }

    },
    actions: {
        [APP_STATUS_UPDATE]({commit}, status) {
            commit(APP_STATUS_UPDATE, status)
        }
    }
}

