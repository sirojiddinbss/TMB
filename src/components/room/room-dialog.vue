<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detailDialog == true ? 'Bo`lim malumotlerini o`zgartirish' : 'Bo`lim yaratish'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="roomForm" :model="roomData" :rules="rules">
      <el-form-item label="Xona nomi" prop="name">
        <el-input v-model="roomData.name" />
      </el-form-item>
      <el-form-item label="Tegishli bo'lim" prop="section">
        <el-select v-model="roomData.section" placeholder="tanlang">
          <el-option v-for="item of sections" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Bekor qilish</el-button>
        <el-button type="primary" @click="saveroom"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { roomStore } from '@/stores/room/room'
import { storeToRefs } from 'pinia'
import { sectionStore } from '@/stores/section/section'

const section_store = sectionStore()
const { sections } = storeToRefs(section_store)

const store = roomStore()
const dialog_store = dialogStore()

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const roomForm = ref()

const handleClose = () => {
  dialog_store.editDialogVisible(false)
  dialog_store.editDetailDialog(false)
  if (!roomForm.value) return
  roomForm.value.resetFields()
  detail_id.value = ''
}
const roomData = ref({})
const rules = ref({
  name: [
    {
      required: true,
      message: 'Bo`lim nomi kiritilmadi',
      trigger: 'blur'
    }
  ]
})

const saveroom = async () => {
  if (!roomForm.value) return
  await roomForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
        store.edit_room({
          id: detail_id.value,
          data: { ...roomData.value }
          // type: 'multipart/form-data'
        })
      } else {
        store.create_room({
          data: { ...roomData.value }
          // type: 'multipart/form-data'
        })
      }
      console.log(roomData.value)
    } else {
      console.log(fields)
    }
  })
  handleClose()
}

watch(detailDialog, async () => {
  if (detailDialog.value && detail_id.value !== '') {
    let res = await store.get_room(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      roomData.value = { ...res.data }
      roomData.value.section = res.data.section.id
    }
  }
})
</script>
<style lang=""></style>
