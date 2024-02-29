import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const attachedProductStore = defineStore('attachedProductStore', () => {
  const attachedProducts = ref([])
  const attachedProductCount = ref()

  const loading = loadingStore()
  const api = apiStore()

  const output_good = async (payload) => {
    let res = await api.post({
      url: `instruments/user_instrument_output/`,
      data: payload.data,
      type: payload.type
    })
    if (res.status == 201) {
      ElMessage({
        type: 'success',
        message: 'Tovar hisobdan chiqarildi'
      })
    }
  }

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `instruments/user_instrument/`,
      params
    })
    if (res.status == 200) {
        attachedProducts.value = [...res.data.results]
        attachedProductCount.value = res.data.count
      console.log(res.data.results)
    }
    loading.setLoad(false)
  }

  const get_product = async (id) => {
    console.log('start func');
    return await api.get({
      url: `instruments/user_instrument/${id}`
    })
  }

  return {
    output_good,
    attachedProducts,
    get_all,
    get_product,
    attachedProductCount
  }
})
