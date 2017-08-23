import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
        children: [

            {
                path: '/search', //个人主页
                meta: {title: '搜索'},
                component: resolve => require(['../pages/search.vue'], resolve)
            },
            {
                path: '/upload',
                meta: {title: '上传'},

                component: resolve => require(['../pages/upload.vue'], resolve)
            },
            {
                path: '*',
                redirect: '/upload'
            }
        ]
    }
]