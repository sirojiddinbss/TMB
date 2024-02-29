import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '../utils/api'
import cookies from 'vue-cookies'
import router from '@/router'
import { ElMessage } from 'element-plus'

export const userStore = defineStore('userStore', () => {
  const user = ref({})
  
  const api = apiStore()

  const login = async (data) => {
    let res = await api.post({
      url: 'auth/login/',
      data
    })
    console.log(res)

    if (res.status == 200) {
      user.value = { ...res.data.user }
      cookies.set('user-token', res.data.access)
      cookies.set('user-role', res.data.user.role)
      if (res.data.user.role == 'super_admin') {
        user.value = res.data.user
        router.push('/')
      } else if (['staff', 'staff_admin', 'chief'].includes(res.data.user.role)) {
        user.value = res.data.user
        router.push({ name: 'self-home' })
      }
      ElMessage({
        message: 'Xush kelibsiz',
        type: 'success'
      })
    }
  }

  const checkUser = async () => {
    if (cookies.isKey('user-token')) {
      cookies.set('user-token', cookies.get('user-token'))
      let res = await api.get({ url: 'auth/checkuser' })
      user.value = res.data
    } else {
      logout()
      ElMessage({
        type: 'warning',
        message: 'Bu sahifaga kriishga sizga ruxsat yo`q'
      })
    }
  }

  const logout = () => {
    cookies.remove('user-token')
    cookies.remove('user-role')
    user.value = {}
    router.push({ name: 'login' })
  }

  return {
    login,
    checkUser,
    logout
  }
})
