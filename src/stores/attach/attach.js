import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const attachStore = defineStore('attachStore', () => {
  const attachs = ref([])
  const attachCount = ref()


  const loading = loadingStore()
  const api = apiStore()

  const create_attach = async (data) => {
    let res = await api.post({
      url: `instruments/user_instrument/`,
      data
    })
    if(res.status==201){
      ElMessage({
          type: 'success',
          message: "Tovar biriktirildi"
      })
      get_all()
    }
    console.log(res);
  }

  const output_good = async (payload) => {
    let res = await api.post({
      url: `instruments/output_instrument/`,
      data: payload.data,
      type: payload.type
    })
    if (res.status == 201) {
      attachs.value = [...res.data.results]
      ElMessage({
        type: 'success',
        message: 'Tovar hisobdan chiqarildi'
      })
    }
  }

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `instruments/attach/list/`,
      params
    })
    if (res.status == 200) {
      attachs.value = [...res.data.results]
      attachCount.value = res.data.count
      console.log(res.data.results)
    }
    loading.setLoad(false)
  }

  const get_product = async (id) => {
    console.log('start func');
    return await api.get({
      url: `instruments/attach/${id}`
    })
  }

  return {
    create_attach,
    output_good,
    attachs,
    get_all,
    get_product,
    attachCount
  }
})
