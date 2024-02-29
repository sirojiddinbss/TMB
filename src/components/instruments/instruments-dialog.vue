<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detailDialog == true ? 'Tovar ma`lumotlarini o`zgartirish' : 'Tovar yaratish'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="instrumentsForm" :model="instrumentsData" :rules="rules">
      <el-form-item label="Tovar nomi" prop="name">
        <el-input v-model="instrumentsData.name" />
      </el-form-item>

      <el-form-item label="Inventar raqami kiritilmadi" prop="inventory_number">
        <el-input v-model="instrumentsData.inventory_number" />
      </el-form-item>

      <el-form-item label="Ma'lumoti" prop="description">
        <el-input v-model="instrumentsData.description" />
      </el-form-item>

      <el-form-item label="Imzolangan sana " prop="manufactured_date">
        <el-date-picker
          type="date"
          placeholder="yil-oy-kun"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          v-model="instrumentsData.manufactured_date"
        />
      </el-form-item>

      <el-form-item label="Xujjat turi " prop="document">
        <el-select v-model="instrumentsData.document" clearable filterable placeholder="tanlang">
          <el-option v-for="item of documents" :key="item.id" :label="`${item.number} ${item.name}`" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="Xujjat shakli " prop="category">
        <el-select v-model="instrumentsData.category" clearable filterable placeholder="tanlang">
          <el-option v-for="item of categorys" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="Miqdori" prop="amount">
        <el-input v-model="instrumentsData.amount" />
      </el-form-item>

      <el-form-item label="Dona/komlekt" prop="measurement_type">
        <el-select
          v-model="instrumentsData.measurement_type"
          clearable
          filterable
          placeholder="tanlang"
        >
        <el-option
        v-for="item of measurement_types"
          :key="item.id"
          :label="item.label"
          :value="item.type"
      />
        </el-select>
      </el-form-item>

      <el-form-item label="Summasi" prop="total_price">
        <el-input v-model="instrumentsData.total_price" />
      </el-form-item>

      <el-form-item
        label="Tovar rasmi"
      >
        <input type="file"
          @change="uploadFile"
        >
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Bekor qilish</el-button>
        <el-button type="primary" @click="saveinstruments"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { instrumentsStore } from '@/stores/instruments/instruments'
import { documentStore } from '@/stores/document/document'
import { categoryStore } from '@/stores/category/category'
import { storeToRefs } from 'pinia'
import { measurement_types } from '@/stores/utils/env'


const store = instrumentsStore()
const dialog_store = dialogStore()

const document_store = documentStore()
const category_store = categoryStore()

const { documents } = storeToRefs(document_store)
const { categorys } = storeToRefs(category_store)

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const instrumentsForm = ref()

const handleClose = () => {
  dialog_store.editDialogVisible(false)
  dialog_store.editDetailDialog(false)
  if (!instrumentsForm.value) return
  instrumentsForm.value.resetFields()
  detail_id.value = ''
}
const instrumentsData = ref({})

const file = ref(null)
const uploadFile = (event) =>{
  file.value = event.target.files[0]
  console.log(file.value);
}

const rules = ref({
  name: [
    {
      required: true,
      message: 'Tovar nomi kiritilmadi',
      trigger: 'blur'
    }
  ],
  description: [
    {
      required: true,
      message: 'Tavsifi kiritilmadi',
      trigger: 'blur'
    }
  ],
  manufactured_date: [
    {
      required: true,
      message: 'Ishlab chiqarilgan sana tanlanmadi',
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: 'Kategoriyasi tanlanmadi',
      trigger: 'blur'
    }
  ],
  amount: [
    {
      required: true,
      message: 'Miqdori kiritilmadi',
      trigger: 'blur'
    }
  ],
  total_price: [
    {
      required: true,
      message: 'Summasi kiritilmadi',
      trigger: 'blur'
    }
  ],
  type: [
    {
      required: true,
      message: 'Xujjat turi tanlanmadi',
      trigger: 'blur'
    }
  ],
  form: [
    {
      required: true,
      message: 'Xujjat shakli tanlanmadi',
      trigger: 'blur'
    }
  ],
  measurement_type: [
    {
      required: true,
      message: 'Dona/komplekt tanlanmadi',
      trigger: 'blur'
    }
  ],
  inventory_number: [
    {
      required: true,
      message: 'Inventar raqami tanlanmadi',
      trigger: 'blur'
    }
  ],
})

const saveinstruments = async () => {
  if (!instrumentsForm.value) return
  await instrumentsForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
        store.edit_instruments({
          id: detail_id.value,
          data: { ...instrumentsData.value, avatar: file.value },
          type: 'multipart/form-data'
        })
      } else {
        store.create_instruments({
          data: { ...instrumentsData.value, avatar: file.value},
          type: 'multipart/form-data'
        })
      }
      console.log(instrumentsData.value)
    } else {
      console.log(fields)
    }
  })
  handleClose()
}

watch(detailDialog, async () => {
  if (detailDialog.value && detail_id.value !== '') {
    let res = await store.get_instruments(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      instrumentsData.value = { ...res.data }
      instrumentsData.value.document = res.data.document[0].id 

    }
  }
})
</script>
<style lang=""></style>
  