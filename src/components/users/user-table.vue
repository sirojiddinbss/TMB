<template>
  <div>
    <el-table :data="users" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column min-width="150" label="F.I.SH">
        <template #default="custom">
          <div>
            <p>
              {{ custom.row.last_name }} {{ custom.row.first_name.slice(0, 1) }}.{{
                custom.row.middle_name.slice(0, 1)
              }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Username" prop="username" min-width="200" />
      <el-table-column label="Xona raqami" min-width="200">
        <template #default="prop">
          <div>
            <ul>
              <li v-for="item of prop.row.room" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Roli" min-width="200">
        <template #default="prop">
          <div>
            {{ choisesRole(prop.row.role) }}
          </div>
        </template>
      </el-table-column>
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

    <el-dialog v-model="removeDialog" width="500">
      <span>Xodimni o'chirmoqchimisiz?</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="removeDialog = false">Yo'q</el-button>
          <el-button type="primary" @click="store.delete_user(id), (removeDialog = false)">
            Xa o'chiraman</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { staffStore } from '@/stores/users/users'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'
import { dialogStore } from '@/stores/utils/dialog'
import { choisesRole } from '@/stores/utils/func'
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

const store = staffStore()
const loading = loadingStore()

const { users } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
