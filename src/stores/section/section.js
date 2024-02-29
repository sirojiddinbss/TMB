import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiStore } from '@/stores/utils/api'
import { ElMessage } from 'element-plus'
import { loadingStore } from '@/stores/utils/loading'

export const sectionStore = defineStore('sectionStore', () => {
  const sections = ref([])
  const sectionCount = ref()

  const loading = loadingStore()
  const api = apiStore()
  const create_section = async (payload) => {
    let res = await api.post({
      url: `common/section/`,
      data: payload.data
    })
    if (res.status == 201) {
      sections.value = [{ ...res.data }, ...sections.value]
      ElMessage({
        type: 'success',
        message: 'Bo`lim kiritildi'
      })
    }
    console.log(res)
  }

  const get_all = async (params) => {
    loading.setLoad(true)
    let res = await api.get({
      url: `common/section/`,
      params
    })
    if (res.status == 200) {
      sections.value = [...res.data.results]
      sectionCount.value = res.data.count
      console.log(res)
    }
    loading.setLoad(false)
  }

  const delete_section = async (id) => {
    await api.remove({
      url: `common/section/${id}`
    })
    sections.value = [...sections.value.filter((sec) => sec.id != id)]
    ElMessage({
      type: 'success',
      message: "Bo'lim o'chirildi"
    })
  }

  const edit_section = async (payload) => {
    let res = await api.patch({
      url: `common/section/${payload.id}/`,
      data: payload.data
      // type: payload.type
    })
    sections.value = [
      ...sections.value.map((sec) => {
        if (sec.id == res.data.id) return res.data
        return sec
      })
    ]
    ElMessage({
      type: 'success',
      message: "Bo'lim nomi o'zgartirildi"
    })
  }

  const get_section = async (id) => {
    return await api.get({
      url: `common/section/${id}`
    })
  }

  return {
    sections,
    create_section,
    get_all,
    delete_section,
    edit_section,
    get_section,
    sectionCount
  }
})
