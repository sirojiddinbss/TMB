import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const documentStore = defineStore('documentStore', () => {
  const documents = ref([])
  const documentCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_document = async (payload) => {
    let res = await api.post({
      url: `instruments/document/`,
      data: payload.data,
      type: payload.type
    })
    if (res.status == 200) {
      documents.value = [{ ...res.data }, ...documents.value]
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
      url: `instruments/document/`,
      params
    })
    if (res.status == 200) {
      documents.value = [...res.data.results]
      documentCount.value = res.data.count
      console.log(res.data.results)
    }
    loading.setLoad(false)
  }

  const delete_document = async (id) => {
    await api.remove({
      url: `instruments/document/${id}`
    })
    documents.value = [...documents.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Xujjat o'chirildi"
    })
  }

  const edit_document = async (payload) => {
    let res = await api.patch({
      url: `instruments/document/${payload.id}/`,
      data: payload.data,
      type: payload.type
    })
    documents.value = [
      ...documents.value.map((sec) => {
        if (sec.id == res.data.id) return {...res.data}
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Xujjat o'zgartirildi"
    })
  }

  const get_document = async (id) => {
    return await api.get({
      url: `instruments/document/${id}`
    })
  }

  return {
    documents,
    create_document,
    get_all,
    delete_document,
    edit_document,
    get_document,
    documentCount
  }
})
