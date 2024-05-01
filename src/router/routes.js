const DefaultLayout = () => import("../layouts/default.vue");
const Dashboard = () => import("../pages/index.vue");
const UsersIndex = () => import("../pages/users/index.vue");
const UsersModify = () => import("../pages/users/modify.vue");
const PagesIndex = () => import("../pages/pages/index.vue");
const PagesModify = () => import("../pages/pages/modify.vue");
const TagsIndex = () => import("../pages/tags/index.vue");
const CategoriesIndex = () => import("../pages/categories/index.vue");
const ServicesIndex = () => import("../pages/services/index.vue");
const ServicesModify = () => import("../pages/services/modify.vue");

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
                path: '/services',
                children: [
                    {
                        path: '',
                        name: 'services.index',
                        component: ServicesIndex
                    },
                    {
                        path: 'create',
                        name: 'services.create',
                        component: ServicesModify
                    },
                    {
                        path: ':id/edit',
                        name: 'services.edit',
                        component: ServicesModify
                    }
                ]
            },
            {
                path: '/tags',
                name: 'tags.index',
                component: TagsIndex
            },
            {
                path: '/categories',
                name: 'categories.index',
                component: CategoriesIndex
            },
        ]
    }
];

export default routes;