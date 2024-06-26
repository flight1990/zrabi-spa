import DefaultLayout from "../layouts/default.vue";

import Dashboard from "../pages/index.vue";

import UsersIndex from "../pages/users/index.vue";
import UsersModify from "../pages/users/modify.vue";

import PagesIndex from "../pages/pages/index.vue";
import PagesModify from "../pages/pages/modify.vue";

import TagsIndex from "../pages/tags/index.vue";

const routes = [
    {
        path: '',
        component: DefaultLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/users',
                children: [
                    {
                        path: '',
                        name: 'users.index',
                        component: UsersIndex
                    },
                    {
                        path: 'create',
                        name: 'users.create',
                        component: UsersModify
                    },
                    {
                        path: ':id/edit',
                        name: 'users.edit',
                        component: UsersModify
                    }
                ]
            },
            {
                path: '/pages',
                children: [
                    {
                        path: '',
                        name: 'pages.index',
                        component: PagesIndex
                    },
                    {
                        path: 'create',
                        name: 'pages.create',
                        component: PagesModify
                    },
                    {
                        path: ':id/edit',
                        name: 'pages.edit',
                        component: PagesModify
                    }
                ]
            },
            {
                path: '/tags',
                name: 'tags.index',
                component: TagsIndex
            },
        ]
    }
];

export default routes;