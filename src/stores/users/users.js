import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const staffStore = defineStore('staffStore', () => {
  const users = ref([])
  const userCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_user = async (payload) => {
    let res = await api.post({
      url: `users/`,
      data: payload.data
    })
    if (res.status == 201) {
      users.value = [{ ...res.data }, ...users.value]
      ElMessage({
        type: 'success',
        message: 'Xona kiritildi'
      })
    }
    console.log(res)
  }

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `users`,
      params
    })
    if (res.status == 200) {
      users.value = [...res.data.results]
      userCount.value = res.data.count
      console.log(res)
    }
    loading.setLoad(false)
  }

  const delete_user = async (id) => {
    await api.remove({
      url: `users/${id}`
    })
    users.value = [...users.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Xona o'chirildi"
    })
  }

  const edit_user = async (payload) => {
    let res = await api.patch({
      url: `users/${payload.id}/`,
      data: payload.data
      // type: payload.type
    })
    users.value = [
      ...users.value.map((sec) => {
        if (sec.id == res.data.id) return res.data
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Xonanomi o'zgartirildi"
    })
  }

  const get_user = async (id) => {
    return await api.get({
      url: `users/${id}`
    })
  }

  return {
    users,
    create_user,
    get_all,
    delete_user,
    edit_user,
    get_user,
    userCount
  }
})
