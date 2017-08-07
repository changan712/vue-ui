import App from '../App.vue'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login', //登录
                meta: {auth: false},
                title: 'login',
                component: resolve => require(['../pages/login.vue'], resolve)
            },
            {
                path: '/signout', //退出
                title: 'signout',
                component: resolve => require(['../pages/signout.vue'], resolve)
            },
            {
                path: '/home', //个人主页
                title: 'home',
                component: resolve => require(['../pages/home.vue'], resolve)
            },
            {
                path: '/', //首页
                meta: {auth: false},
                title: 'index',
                component: resolve => require(['../pages/index.vue'], resolve)
            },
            {
                path: '*', //其他页面，强制跳转到登录页面
                redirect: '/login'
            }
        ]
    }
]