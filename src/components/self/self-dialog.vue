<template>
  <el-dialog
    v-model="dialogVisible"
    title="Hisobdan chiqarish"
    width="50%"
    :before-close="handleClose"
  >
    <div class="product__content">
      <div>
        <p>
          Xodimning F.I.SH:
          <b
            >{{ product_data.user?.last_name }} {{ product_data.user?.first_name.slice(0, 1) }}.{{
              product_data.user?.middle_name.slice(0, 1)
            }}</b
          >
        </p>
        <br />
        <p>
          Bo'lim: <b>{{ product_data.user?.section?.name }}</b>
        </p>
        <br />
      </div>

      <div>
        <p>
          Kategoryasi: <b>{{ product_data.instrument?.category?.name }}</b>
        </p>
        <br />
        <p>
          Nomlanishi: <b>{{ product_data.instrument?.name }}</b>
        </p>
        <br />
        <p>
          INV raqami: <b>{{ product_data.inventory_number }}</b>
        </p>
      </div>

      <div>
        <p>
          I.CH.Sanasi: <b>{{ product_data.instrument?.manufactured_date }}</b>
        </p>
        <br />
        <p>
          Narxi: <b>{{ product_data.instrument?.total_price }}</b>
        </p>
        <br />
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Orqaga</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { attachedProductStore } from '@/stores/attached-product/attached-product'
import { storeToRefs } from 'pinia'

const store = attachedProductStore()

const dialog_store = dialogStore()
const { dialogVisible, detail_id } = storeToRefs(dialog_store)

const handleClose = () => {
  if (!dialogVisible) return
  detail_id.value = ''
  dialog_store.editDialogVisible(false)
}

const product_data = ref({})

watch(dialogVisible, async () => {
  if (dialogVisible.value && detail_id.value !== '') {
    let res = await store.get_product(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      product_data.value = { ...res.data }
    }
  }
})
</script>
<style scopped>
.product__content {
  display: flex;
  justify-content: space-between;
  gap: 25px;
}
</style>
