import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const instrumentsStore = defineStore('instrumentsStore', () => {
  const instruments = ref([])
  const instrumentCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_instruments = async (payload) => {
    let res = await api.post({
      url: `instruments/`,
      data: payload.data,
      type: payload.type
    })
    if (res.status == 201) {
      instruments.value = [{ ...res.data }, ...instruments.value]
      ElMessage({
        type: 'success',
        message: 'Xujjat qo`shildi'
      })
    }
    console.log(res)
  }

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `instruments/`,
      params
    })
    if (res.status == 200) {
      instruments.value = [...res.data.results]
      instrumentCount.value = res.data.count
      console.log(res.data.results)
    }
    loading.setLoad(false)
  }

  const delete_instruments = async (id) => {
    await api.remove({
      url: `instruments/${id}`
    })
    instruments.value = [...instruments.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Xujjat o'chirildi"
    })
  }

  const edit_instruments = async (payload) => {
    let res = await api.patch({
      url: `instruments/${payload.id}/`,
      data: payload.data,
      type: payload.type
    })
    instruments.value = [
      ...instruments.value.map((sec) => {
        if (sec.id == res.data.id) return {...res.data}
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Xujjat o'zgartirildi"
    })
  }

  const get_instruments = async (id) => {
    return await api.get({
      url: `instruments/${id}`
    })
  }

  return {
    instruments,
    create_instruments,
    get_all,
    delete_instruments,
    edit_instruments,
    get_instruments,
    instrumentCount
  }
})
