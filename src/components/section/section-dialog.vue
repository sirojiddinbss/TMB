<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detailDialog == true ? 'Bo`lim malumotlerini o`zgartirish' : 'Bo`lim yaratish'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="sectionForm" :model="secData" :rules="rules">
      <el-form-item label="Bo'lim nomini kiriting" prop="name">
        <el-input v-model="secData.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Bekor qilish</el-button>
        <el-button type="primary" @click="saveSection"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { sectionStore } from '@/stores/section/section'
import { storeToRefs } from 'pinia'

const store = sectionStore()
const dialog_store = dialogStore()

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const sectionForm = ref()

const handleClose = () => {
  dialog_store.editDialogVisible(false)
  dialog_store.editDetailDialog(false)
  if (sectionForm.value) return
  sectionForm.value.resetFields()
  detail_id.value = ''
}
const secData = ref({})
const rules = ref({
  name: [
    {
      required: true,
      message: 'Bo`lim nomi kiritilmadi',
      trigger: 'blur'
    }
  ]
})

const saveSection = async () => {
  if (!sectionForm.value) return
  await sectionForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
        store.edit_section({
          id: detail_id.value,
          data: { ...secData.value }
          // type: 'multipart/form-data'
        })
      } else {
        store.create_section({
          data: { ...secData.value }
          // type: 'multipart/form-data'
        })
      }
      console.log(secData.value)
    } else {
      console.log(fields)
    }
  })
  handleClose()
}

watch(detailDialog, async () => {
  if (detailDialog.value && detail_id.value != '') {
    let res = await store.get_section(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      secData.value = { ...res.data }
      dialog_store.editDialogVisible(true)
    }
  }
})
</script>
<style lang=""></style>
