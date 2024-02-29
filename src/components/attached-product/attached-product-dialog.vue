<template>
  <el-dialog
    v-model="outputDialog"
    title="Hisobdan chiqarish"
    width="60%"
    :before-close="handleClose"
  >
   
  <div 
      class="product__content"
    >
      <div>
        <p>Xodimning F.I.SH: <b> {{ product_data.user?.last_name }} {{ product_data.user?.first_name.slice(0,1) }}.{{ product_data.user?.middle_name.slice(0,1) }}</b></p><br>
        <p>Bo'lim: <b>{{ product_data.user?.section?.name }}</b></p>
        <br>
      </div>

      <div>
        <p>Kategoryasi: <b>{{ product_data.instrument?.category?.name }}</b></p>
        <br>
        <p>Nomlanishi: <b>{{ product_data.instrument?.name }}</b></p>
        <br>
        <p>INV raqami: <b>{{ product_data.inventory_number }}</b></p>
      </div>

      <div>
        <p>I.CH.Sanasi: <b>{{ product_data.instrument?.manufactured_date }}</b></p>
        <br>
        <p>Narxi: <b>{{ product_data.instrument?.total_price }}</b></p>
        <br>
      </div>
      
      
    </div>

    <el-form ref="attachForm" :model="attachData" :rules="rules">
      <el-form-item label="Biriktiriluvchi xodim" prop="document">
        <el-select v-model="attachData.document">
          <el-option v-for="item of documents" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
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
import { attachedProductStore } from '@/stores/attached-product/attached-product'
import { storeToRefs } from 'pinia'
import { documentStore } from '@/stores/document/document'

const document_store = documentStore()
const { documents } = storeToRefs(document_store)

const store = attachedProductStore()
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
})

const saveattach = async () => {
  if (!attachForm.value) return
  await attachForm.value.validate((valid, fields) => {
    if (valid) {
      store.output_good({
        data: { ...attachData.value, user_instrument: detail_id.value },
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
