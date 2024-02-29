<template>
    <div>
      <el-table :data="rooms" border v-loading="load">
        <el-table-column label="#" type="index" width="50" />
        <el-table-column label="Xona nomi" prop="name" min-width="200" />
        <el-table-column label="Biriktirilgan bo'lim" prop="section.name" min-width="200" />
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
  
      <el-dialog v-model="removeDialog"  width="500">
        <span>Xonani o'chirmoqchimisiz?</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="removeDialog = false">Yo'q</el-button>
            <el-button type="primary" @click="store.delete_room(id), (removeDialog = false)">
              Xa o'chiraman</el-button
            >
          </div>
        </template>
      </el-dialog>
    </div>
</template>
<script setup>
import { roomStore } from '@/stores/room/room'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'
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

const store = roomStore()
const loading = loadingStore()

const { rooms } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
  