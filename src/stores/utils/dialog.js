import { defineStore } from 'pinia'
import { ref } from 'vue'
export const dialogStore = defineStore('dialogStore', () => {
  const dialogVisible = ref(false)

  const editDialogVisible = (val) => {
    dialogVisible.value = val
  }

  const detail_id = ref('')

  const detailDialog = ref(false)
  
  const editDetailDialog = (val) => {
    detailDialog.value = val
  }
  const outputDialog = ref(false)

  const editOutput = val =>{
    outputDialog.value = val
  }

  return {
    dialogVisible,
    editDialogVisible,
    detail_id,
    editOutput,

    outputDialog,
    detailDialog,
    editDetailDialog
  }
})
