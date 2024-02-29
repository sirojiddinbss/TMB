import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const roomStore = defineStore('roomStore', () => {
  const rooms = ref([])
  const roomCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_room = async (payload) => {
    let res = await api.post({
      url: `common/room/`,
      data: payload.data
    })
    if (res.status == 201) {
      rooms.value = [{ ...res.data }, ...rooms.value]
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
      url: `common/room/`,
      params
    })
    if (res.status == 200) {
      rooms.value = [...res.data.results]
      roomCount.value = res.data.count
      console.log(res)
    }
    loading.setLoad(false)
  }

  const delete_room = async (id) => {
    await api.remove({
      url: `common/room/${id}`
    })
    rooms.value = [...rooms.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Xona o'chirildi"
    })
  }

  const edit_room = async (payload) => {
    let res = await api.patch({
      url: `common/room/${payload.id}/`,
      data: payload.data
      // type: payload.type
    })
    rooms.value = [
      ...rooms.value.map((sec) => {
        if (sec.id == res.data.id) return res.data
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Xonanomi o'zgartirildi"
    })
  }

  const get_room = async (id) => {
    return await api.get({
      url: `common/room/${id}`
    })
  }

  return {
    rooms,
    create_room,
    get_all,
    delete_room,
    edit_room,
    get_room,
    roomCount
  }
})
