<template>
  <div>
    <el-table :data="selfs" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />

      <el-table-column label="Xodimning F.I.Sh" min-width="190">
        <template #default="prop">
          <p>
            {{ prop.row.user?.last_name }} {{ prop.row.user?.first_name.slice(0, 1) }}.{{
              prop.row.user?.middle_name.slice(0, 1)
            }}
          </p>
        </template>
      </el-table-column>

      <el-table-column
        v-if="role == 'chief'"
        label="Bo'lim"
        prop="user.section.name"
        min-width="200"
      />

      <el-table-column label="Kategoriyasi" prop="instrument.category.name" min-width="150" />

      <el-table-column label="Nomlanishi" prop="instrument.name" min-width="150" />

      <el-table-column label="INV raqami" prop="inventory_number" width="150" />

      <el-table-column label="I.CH.Sana" prop="instrument.manufactured_date" width="150" />

      <el-table-column label="Narxi" prop="instrument.total_price" width="100" />

      <el-table-column width="140">
        <template #default="custom">
          <div>
            <el-button type="success" @click="output(custom.row.id)">
              <el-icon><InfoFilled /></el-icon> batafsil
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { selfStore } from '@/stores/self/self'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'
import cookies from 'vue-cookies'

const role = cookies.get('user-role')
const dialog_store = dialogStore()

const { detail_id } = storeToRefs(dialog_store)

const output = (_id) => {
  detail_id.value = _id
  dialog_store.editDialogVisible(true)
}

const store = selfStore()
const loading = loadingStore()

const { selfs } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
