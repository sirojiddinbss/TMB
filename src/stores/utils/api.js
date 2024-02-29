import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/stores/utils/env'
import cookies from 'vue-cookies'
import { ElMessage } from 'element-plus'
import { userStore } from '../auth/user'

export const apiStore = defineStore('apiStore', () => {
  const user_store = userStore()
  const post = async (payload) => {
    return await axios
      .post(`${url}/${payload.url}`, payload.data, {
        headers: {
          Authorization: `Bearer ${cookies.get('user-token')}`,
          'Content-Type': payload.type
        }
      })
      .catch((e) => {
        if (e.response.status == 401) {
          ElMessage({
            message: "Sizga bu sahifaga ruxsat yo'q",
            type: 'warning'
          })
        }
        user_store.logout()
        console.log(e)
      })
  }

  const get = async (payload) => {
    return await axios
      .get(`${url}/${payload.url}`, {
        params: payload.params,
        headers: {
          Authorization: `Bearer ${cookies.get('user-token')}`
          // 'ngrok-skip-browser-warning': true
        }
      })
      .catch((e) => {
        if (e.response.status == 401) {
          ElMessage({
            message: "Sizga bu sahifaga ruxsat yo'q",
            type: 'warning'
          })
        }
        user_store.logout()
        console.log(e)
      })
  }

  const remove = async (payload) => {
    return await axios
      .delete(`${url}/${payload.url}/`, {
        headers: {
          Authorization: `Bearer ${cookies.get('user-token')}`
          // 'ngrok-skip-browser-warning': true
        }
      })
      .catch((e) => {
        if (e.response.status == 401) {
          ElMessage({
            message: "Sizga bu sahifaga ruxsat yo'q",
            type: 'warning'
          })
        }
        user_store.logout()
        console.log(e)
      })
  }

  const patch = async (payload) => {
    return await axios
      .patch(`${url}/${payload.url}`, payload.data, {
        headers: {
          Authorization: `Bearer ${cookies.get('user-token')}`,
          'Content-Type': payload.type
        }
      })
      .catch((e) => {
        if (e.response.status == 401) {
          ElMessage({
            message: "Sizga bu sahifaga ruxsat yo'q",
            type: 'warning'
          })
        }
        user_store.logout()
        console.log(e)
      })
  }

  return {
    post,
    get,
    remove,
    patch
  }
})
