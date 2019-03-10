import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken, setMenu, setUser, removeMenu, removeUser} from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log(data)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          setMenu(data.menus);
          setUser(data);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        removeToken();
        removeUser();
        removeMenu();
        resolve();
      })
    },
  }
}

export default user
