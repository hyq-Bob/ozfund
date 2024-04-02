import Cookies from 'js-cookie'

// 获取
export function getToken(key) {
  return Cookies.get(key)
}

// 设置
export function setToken(key, value) {
  return Cookies.set(key, value)
}

// 删除
export function removeToken(key) {
  return Cookies.remove(key)
}