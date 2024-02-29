<template>
    <el-dialog
      v-model="dialogVisible"
      :title="detailDialog == true ? 'Kategorya ma`lumotlerini o`zgartirish' : 'Kategorya yaratish'"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="categoryForm" :model="categoryData" :rules="rules">
        <el-form-item label="Kategoriyani kiriting" prop="name">
          <el-input v-model="categoryData.name" />
        </el-form-item>
        

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">Bekor qilish</el-button>
          <el-button type="primary" @click="savecategory"> Saqlash </el-button>
        </div>
      </template>
    </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { categoryStore } from '@/stores/category/category'
import { storeToRefs } from 'pinia'


const store = categoryStore()
const dialog_store = dialogStore()

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const categoryForm = ref()

const handleClose = () => {
dialog_store.editDialogVisible(false)
dialog_store.editDetailDialog(false)
if (!categoryForm.value) return
  categoryForm.value.resetFields()
  detail_id.value = ''
}
const categoryData = ref({})
const rules = ref({
name: [
    {
    required: true,
    message: 'Kategorya nomi kiritilmadi',
    trigger: 'blur'
    }
]
})

const savecategory = async () => {
if (!categoryForm.value) return
await categoryForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
          store.edit_category({
          id: detail_id.value,
          data: { ...categoryData.value }
          // type: 'multipart/form-data'
          })
      } else {
          store.create_category({
          data: { ...categoryData.value }
          // type: 'multipart/form-data'
          })
      }
    console.log(categoryData.value)
    } else {
    console.log(fields)
    }
})
handleClose()
}

watch(detailDialog, async () => {
if (detailDialog.value && detail_id.value !== '') {
      let res = await store.get_category(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      categoryData.value = { ...res.data }
    }
}
})
</script>
<style lang=""></style>
  