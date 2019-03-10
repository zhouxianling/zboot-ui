import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const menu = 'Admin-Menu'

const user = 'Admin-User'

const remote = 'Remote-cookie'


// token
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

// menu
export function getMenu() {
    return JSON.parse(localStorage.getItem(menu))
}

export function setMenu(data) {
    localStorage.setItem(menu, JSON.stringify(data))
}

export function removeMenu() {
    localStorage.removeItem(menu)
}

// user
export function getUser() {
    return JSON.parse(localStorage.getItem(user))
}

export function setUser(data) {
    localStorage.setItem(user, JSON.stringify(data))
}

export function removeUser() {
    localStorage.removeItem(user)
}

// remote
export function setCookie(){
    Cookies.set(remote, '')
}
export function getCookie(){
    Cookies.get(remote)
}
export function removeCookie(){

    Cookies.remove(remote)
}
