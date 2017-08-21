import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: {auth: false, title: 'login'},
                component: resolve => require(['../pages/login.vue'], resolve)
            },
            {
                path: '/signout', //退出
                meta: {title: 'signout'},
                component: resolve => require(['../pages/signout.vue'], resolve)
            },
            {
                path: '/search', //个人主页
                meta: {title: '搜索'},
                component: resolve => require(['../pages/search.vue'], resolve)
            },
            {
                path: '/', //首页
                meta: {auth: false, title: 'index'},

                component: resolve => require(['../pages/index.vue'], resolve)
            },
            {
                path: '*',
                redirect: '/'
            }
        ]
    }
]