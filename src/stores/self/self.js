 import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { loadingStore } from '@/stores/utils/loading'

export const selfStore = defineStore('selfStore', () => {
  const selfs = ref([])
  const selfsCount = ref()

  const loading = loadingStore()
  const api = apiStore()

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `instruments/user_role_instruments/`,
      params
    })
    if (res.status == 200) {
      selfs.value = [...res.data.results]
      selfsCount.value = res.data.count
      console.log(res.data.results)
    }
    loading.setLoad(false)
  }

  const get_self = async (id) => {
    return await api.get({
      url: `instruments/user_role_instruments/${id}`
    })
  }

  return {
    get_all,
    get_self,
    selfsCount,
    selfs
  }
})
