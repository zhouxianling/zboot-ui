import {constantRouterMap} from '@/router'
import {getMenu} from '@/utils/auth.js'

const route = {
    state: {
        routers: [],
    },
    getters: {

    },
    mutations: {
        setRoute(state) {
            state.routers = handleMenu(getMenu());//动态路由
        },

    },
    actions: {},
}

function handleMenu(data) {
    let arr = [];
    if (!data) return [];
    data.forEach(item => {
        if (item.children && item.children.length) {
            arr.push({
                meta: {
                    title: item.name,
                    icon: item.icon
                },
                path: item.path,
                children: handleMenu(item.children)
            })
        } else {
            arr.push({
                meta: {
                    title: item.name,
                    icon: item.icon
                },
                path: item.path
            })
        }
    })
    return arr;
}

export default route
