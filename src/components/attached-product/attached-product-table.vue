<template>
  <div>
    <el-table :data="attachedProducts" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column min-width="150" label="F.I.SH">
        <template #default="custom">
          <div>
            <p>
              {{ custom.row.user?.last_name }} {{ custom.row.user?.first_name.slice(0, 1) }}.{{
                custom.row.user?.middle_name.slice(0, 1)
              }}
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Bo'lim" prop="user.section.name" width="200" />
      <el-table-column label="Kategoryasi" prop="instrument.category.name" min-width="200" />
      <el-table-column label="Nomlanishi" prop="instrument.name" width="150" />
      <el-table-column label="Inventor raqami" prop="inventory_number" width="150" />
      <el-table-column label="I.Ch sana" prop="instrument.manufactured_date" width="150" />
      <el-table-column label="Summasi" prop="price" width="150" />

      <el-table-column min-width="200">
        <template #default="custom">
          <div>
            <el-button type="danger" @click="output(custom.row.id)">
              <el-icon><Failed /></el-icon>
              hisobdan chiqarish
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { attachedProductStore } from '@/stores/attached-product/attached-product'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'

const dialog_store = dialogStore()
const { detail_id } = storeToRefs(dialog_store)

const output = (_id) => {
  detail_id.value = _id
  dialog_store.editOutput(true)
}

const store = attachedProductStore()
const loading = loadingStore()

const { attachedProducts } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
