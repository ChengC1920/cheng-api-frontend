export default [
    { name: '主页', icon: 'smile', path: '/', component: './Index' },
    {
        name: '查看接口',
        icon: 'smile',
        path: '/interface_info/:id',
        component: './InterfaceInfo',
        hideInMenu: true,
    },
    {
        path: '/user',
        layout: false,
        routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
    },
    // { path: '/welcome', name: '欢迎', icon: 'smile', component: './Index' },
    {
        path: '/admin',
        name: '管理页',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
            {
                name: '接口管理',
                icon: 'table',
                path: '/admin/interface_info',
                component: './Admin/InterfaceInfo',
            },
        ],
    },
    // {name: '接口管理', icon: 'table', path: '/list', component: './InterfaceInfo'},
    // {path: '/', redirect: '/welcome'},
    { path: '*', layout: false, component: './404' },
];
