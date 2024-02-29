<template>
  <div>
    <el-table :data="instruments" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column label="Tovar nomi" prop="name" min-width="150" />
      <el-table-column label="Tavsifi" prop="description" width="150" />
      <el-table-column label="Ishlab chiqarilgan sana" prop="manufactured_date" width="150" />
      <el-table-column label="Inventor raqami" prop="inventory_number" width="150" />
      <el-table-column label="Miqdori" prop="amount" width="150" />
      <el-table-column label="Kategoryasi" prop="category.name" width="150" />
      <el-table-column label="Kategoryasi" prop="document[0].name" width="150" />
      <el-table-column label="Kategoryasi" prop="document[0].number" width="150" />
      <el-table-column label="Tasdiqlangan sana" prop="document[0].signed_at" width="150" />
      <el-table-column label="Summasi" prop="total_price" width="150" />

      <el-table-column label="dona/komplekt"  min-width="150" >
          <template #default="custom">
            <div>
                {{ choisesMeasurement_type(custom.row.measurement_type) }}
            </div>
          </template>
        </el-table-column>
      
      <el-table-column width="70">
        <template #default="custom">
          <div>
            <el-dropdown>
              <span>
                <el-button>
                  <el-icon>
                    <CaretBottom />
                  </el-icon>
                </el-button>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="edit(custom.row.id)">
                    <el-icon><Edit /></el-icon>
                    O'zgartirish
                  </el-dropdown-item>
                  <el-dropdown-item @click="remove(custom.row.id)">
                    <el-icon><DeleteFilled /></el-icon>
                    O'chirish
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="removeDialog" title="Tips" width="500">
      <span>Tovarni o'chirmoqchimisiz?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="removeDialog = false">Yo'q</el-button>
          <el-button type="primary" @click="store.delete_instruments(id), (removeDialog = false)">
            Xa o'chiraman</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { instrumentsStore } from '@/stores/instruments/instruments'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'
import { choisesMeasurement_type } from '@/stores/utils/func'
import { ref } from 'vue'

const dialog_store = dialogStore()
const { detail_id } = storeToRefs(dialog_store)

const removeDialog = ref(false)

const id = ref('')
const remove = (_id) => {
  id.value = _id
  removeDialog.value = true
}

const edit = (id) => {
  dialog_store.editDetailDialog(true)
  dialog_store.editDialogVisible(true)
  detail_id.value = id
}

const store = instrumentsStore()
const loading = loadingStore()

const { instruments } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
