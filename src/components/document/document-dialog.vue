<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detailDialog == true ? 'Kategorya ma`lumotlerini o`zgartirish' : 'Kategorya yaratish'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="documentForm" :model="documentData" :rules="rules">
      <el-form-item label="Xujjat nomi" prop="name">
        <el-input v-model="documentData.name" />
      </el-form-item>

      <el-form-item label="Xujjat raqami" prop="number">
        <el-input v-model="documentData.number" />
      </el-form-item>

      <el-form-item label="Imzolangan sana " prop="signed_at">
        <el-date-picker
          type="date"
          placeholder="yil-oy-kun"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          v-model="documentData.signed_at"
        />
      </el-form-item>

      <el-form-item label="Xujjat turi " prop="type">
        <el-select v-model="documentData.type" clearable filterable placeholder="tanlang">
          <el-option v-for="item of types" :key="item.id" :label="item.label" :value="item.type" />
        </el-select>
      </el-form-item>

      <el-form-item label="Xujjat shakli " prop="form">
        <el-select v-model="documentData.form" clearable filterable placeholder="tanlang">
          <el-option v-for="item of forms" :key="item.id" :label="item.label" :value="item.form" />
        </el-select>
      </el-form-item>

      <el-form-item label="Ilova qilinuvchi fayl">
        <input type="file" @change="uloadFile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Bekor qilish</el-button>
        <el-button type="primary" @click="savedocument"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { documentStore } from '@/stores/document/document'
import { storeToRefs } from 'pinia'
import { types, forms } from '@/stores/utils/env'

const store = documentStore()
const dialog_store = dialogStore()

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const documentForm = ref()

const handleClose = () => {
  dialog_store.editDialogVisible(false)
  dialog_store.editDetailDialog(false)
  if (!documentForm.value) return
  documentForm.value.resetFields()
  detail_id.value = ''
}
const documentData = ref({})
const rules = ref({
  name: [
    {
      required: true,
      message: 'Xujjat nomi kiritilmadi',
      trigger: 'blur'
    }
  ],
  number: [
    {
      required: true,
      message: 'Xujjat raqami kiritilmadi',
      trigger: 'blur'
    }
  ],
  signed_at: [
    {
      required: true,
      message: 'Imzolangan sana kiritilmadi',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: 'Xujjat turi kiritilmadi',
      trigger: 'blur'
    }
  ],
  form: [
    {
      required: true,
      message: 'Xujjat shakli kiritilmadi',
      trigger: 'blur'
    }
  ]
})

const savedocument = async () => {
  if (!documentForm.value) return
  await documentForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
        store.edit_document({
          id: detail_id.value,
          data: { ...documentData.value, file: file.value?.[0] },
          type: 'multipart/form-data'
        })
      } else {
        store.create_document({
          data: { ...documentData.value, file: file.value?.[0] },
          type: 'multipart/form-data'
        })
      }
      console.log(documentData.value)
    } else {
      console.log(fields)
    }
  })
  handleClose()
}

const file = ref(null)

const uloadFile = (event) => {
  file.value = event.target.files
  console.log(file.value)
}

watch(detailDialog, async () => {
  if (detailDialog.value && detail_id.value !== '') {
    let res = await store.get_document(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      documentData.value = { ...res.data }
    }
  }
})
</script>
<style lang=""></style>
