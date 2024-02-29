<template>
  <div>
    <el-table :data="documents" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column label="Xujjat nomi" prop="name" min-width="200" />
      <el-table-column label="Imzolangan sana" prop="signed_at" width="150" />
      <el-table-column label="Xujjat raqami" prop="number" width="150" />

      <el-table-column label="Roli">
        <template #default="custom">
          <div>
            {{ choisesType(custom.row.type) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Turi">
        <template #default="custom">
          <div>
            {{ choisesForm(custom.row.form) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Fayl">
        <template #default="custom">
          <div>
            <el-button @click="openFile(custom.row.file)">
              <el-icon><UploadFilled /></el-icon>
            </el-button>
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

    <el-dialog v-model="removeDialog" width="500">
      <span>Xujjatni o'chirmoqchimisiz?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="removeDialog = false">Yo'q</el-button>
          <el-button type="primary" @click="store.delete_document(id), (removeDialog = false)">
            Xa o'chiraman</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { documentStore } from '@/stores/document/document'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'
import { ref } from 'vue'
import { choisesType, choisesForm, openFile } from '@/stores/utils/func'

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

const store = documentStore()
const loading = loadingStore()

const { documents } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
