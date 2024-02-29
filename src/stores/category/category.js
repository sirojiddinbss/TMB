import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const categoryStore = defineStore('categoryStore', () => {
  const categorys = ref([])
  const categoryCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_category = async (payload) => {
    let res = await api.post({
      url: `instruments/category/`,
      data: payload.data
    })
    if (res.status == 201) {
      categorys.value = [{ ...res.data }, ...categorys.value]
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
      url: `instruments/category/`,
      params
    })
    if (res.status == 200) {
      categorys.value = [...res.data.results]
      categoryCount.value = res.data.count
      console.log(res)
    }
    loading.setLoad(false)
  }

  const delete_category = async (id) => {
    await api.remove({
      url: `instruments/category/${id}`
    })
    categorys.value = [...categorys.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Kategorya o'chirildi"
    })
  }

  const edit_category = async (payload) => {
    let res = await api.patch({
      url: `instruments/category/${payload.id}/`,
      data: payload.data
      // type: payload.type
    })
    categorys.value = [
      ...categorys.value.map((sec) => {
        if (sec.id == res.data.id) return res.data
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Kategorya o'zgartirildi"
    })
  }

  const get_category = async (id) => {
    return await api.get({
      url: `instruments/category/${id}`
    })
  }

  return {
    categorys,
    create_category,
    get_all,
    delete_category,
    edit_category,
    get_category,
    categoryCount
  }
})
