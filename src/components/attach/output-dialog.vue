<template>
    <el-dialog
      v-model="outputDialog"
      title="Tovarni biriktirish"
      width="60%"
      :before-close="handleClose"
    >
      <div class="product__content">
        <img :src="product_data.avatar" alt="" width="200" />
      </div>
  
      <div>
        <p>Tovar nomi: <b>{{ product_data.name }}</b></p><br>
        <p>Kategoryasi: <b>{{ product_data.category?.name }}</b></p><br>
        <p>INV raqami: <b>{{ product_data.inventory_number }}</b></p><br>
      </div>
  
      <div>
        <p>Texnik xususiyatlari: <b>{{ product_data.description }}</b></p>
        <p>Jami tovarlar: <b>{{ product_data?.count?.at(0)?.all }}</b></p>
      </div>
  
      <el-form ref="attachForm" :model="attachData" :rules="rules">
        <el-form-item label="Biriktiriluvchi xodim" prop="document">
          <el-select v-model="attachData.document">
            <el-option v-for="item of documents" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
  
        <el-form-item label="Biriktiriladigan sonni kiriting" prop="count">
          <el-input-number
            v-model="attachData.count"
            :min="1"
            :max="product_data?.count?.at(0)?.all"
          />
        </el-form-item>

        <el-form-item prop="description">
            <el-input
                v-model="attachData.description"
                :rows="2"
                type="textarea"
                placeholder="Hisobdan chiqarish bo'yicha ma'lumot yozing..."
            />
        </el-form-item>
      </el-form>
  
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">Bekor qilish</el-button>
          <el-button type="primary" @click="saveattach"> Saqlash </el-button>
        </div>
      </template>
    </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { attachStore } from '@/stores/attach/attach'
import { storeToRefs } from 'pinia'
import { documentStore } from '@/stores/document/document'

const document_store = documentStore()
const { documents } = storeToRefs(document_store)

const store = attachStore()
const dialog_store = dialogStore()

const { outputDialog, detail_id } = storeToRefs(dialog_store)
const attachForm = ref()

const handleClose = () => {
dialog_store.editOutput(false)
if (!attachForm.value) return
attachForm.value.resetFields()
detail_id.value = ''
}
const attachData = ref({})

const rules = ref({
document: [
    {
    required: true,
    message: 'Tovar nomi kiritilmadi',
    trigger: 'blur'
    }
],
count: [
    {
    required: true,
    message: 'Soni kiritilmadi',
    trigger: 'blur'
    }
],
description: [
    {
    required: true,
    message: 'Ma`lumot kiritilmadi',
    trigger: 'blur'
    }
],
})

const saveattach = async () => {
if (!attachForm.value) return
await attachForm.value.validate((valid, fields) => {
    if (valid) {
    store.output_good({
        data:{...attachData.value, instrument: detail_id.value},
        type: 'multipart/form-data'
    })
    handleClose()
    } else {
    console.log(fields)
    }
})
}
const product_data = ref({})

watch(outputDialog, async () => {
console.log('start watch')
if (outputDialog.value && detail_id.value !== '') {
    let res = await store.get_product(detail_id.value)
    console.log(res)
    if (res.status == 200) {
        product_data.value = { ...res.data }
    }
}
})
</script>
<style lang=""></style>
  