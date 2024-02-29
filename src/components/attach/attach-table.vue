<template>
  <div>
    <el-table :data="attachs" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column label="Tovar nomi" prop="name" min-width="150" />
      <el-table-column label="Kategoryasi" prop="category.name" width="150" />
      <el-table-column label="Inventor raqami" prop="inventory_number" width="150" />
      <el-table-column label="Jami" prop="count[0].all" width="150" />
      <el-table-column label="Biriktirilgan" prop="count[1].attached" width="150" />
      <el-table-column label="Chiqim" prop="count[2].outputs" width="150" />
      <el-table-column label="Umumiy summasi" prop="total_price" width="150" />

      <el-table-column min-width="150">
        <template #default="custom">
          <div>
            <el-button 
              type="success" 
              @click="attached(custom.row.id)"
              :disabled="custom.row.count?.at(0)?.all == 0"
            >
              <el-icon><CollectionTag /></el-icon>
              biriktirish
            </el-button>
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="200">
        <template #default="custom">
          <div>
            <el-button 
            type="danger" 
            @click="output(custom.row.id)"
            :disabled="custom.row.count?.at(0)?.all == 0"
          >
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
import { attachStore } from '@/stores/attach/attach'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'

const dialog_store = dialogStore()
const { detail_id } = storeToRefs(dialog_store)

const output = (_id) => {
  detail_id.value = _id
  dialog_store.editOutput(true)
}

const attached = (id) => {
  dialog_store.editDialogVisible(true)
  detail_id.value = id
  console.log('table start');
}

const store = attachStore()
const loading = loadingStore()

const { attachs } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
