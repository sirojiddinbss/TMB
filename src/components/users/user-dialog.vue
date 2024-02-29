<template>
  <el-dialog
    v-model="dialogVisible"
    :title="detailDialog == true ? 'Xodim malumotlarini o`zgartirish' : 'Bo`lim yaratish'"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="userForm" :model="userData" :rules="rules">
      <div class="dis">
        <el-form-item label="Ismi" prop="first_name">
          <el-input v-model="userData.first_name" />
        </el-form-item>

        <el-form-item label="Familyasi" prop="last_name">
          <el-input v-model="userData.last_name" />
        </el-form-item>
      </div>

      <el-form-item label="Otasining ismi" prop="middle_name">
        <el-input v-model="userData.middle_name" />
      </el-form-item>

      <el-form-item label="Telefon raqami" prop="phone_number">
        <el-input v-model="userData.phone_number" />
      </el-form-item>

      <el-form-item label="Username" prop="username">
        <el-input v-model="userData.username" />
      </el-form-item>

      <el-form-item label="Parol" prop="password">
        <el-input v-model="userData.password" />
      </el-form-item>

      <el-form-item label="Takrorlanuvchi parol" prop="password2">
        <el-input v-model="userData.password2" />
      </el-form-item>

      <el-form-item label="Tegishli bo'lim" prop="section">
        <el-select v-model="userData.section" placeholder="tanlang">
          <el-option v-for="item of sections" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Tegishli xona" prop="room">
        <el-select v-model="userData.room" multiple placeholder="tanlang">
          <el-option v-for="item of rooms" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Roli" prop="role">
        <el-select v-model="userData.role" placeholder="tanlang">
          <el-option v-for="item of roles" :key="item.id" :label="item.label" :value="item.role">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Bekor qilish</el-button>
        <el-button type="primary" @click="saveuser"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import { dialogStore } from '@/stores/utils/dialog'
import { staffStore } from '@/stores/users/users'
import { storeToRefs } from 'pinia'
import { sectionStore } from '@/stores/section/section'
import { roomStore } from '@/stores/room/room'
import { roles } from '@/stores/utils/env'

const room_store = roomStore()
const { rooms } = storeToRefs(room_store)

const section_store = sectionStore()
const { sections } = storeToRefs(section_store)

const store = staffStore()
const dialog_store = dialogStore()

const { dialogVisible, detailDialog, detail_id } = storeToRefs(dialog_store)
const userForm = ref()

const handleClose = () => {
  dialog_store.editDialogVisible(false)
  dialog_store.editDetailDialog(false)
  if (!userForm.value) return
  userForm.value.resetFields()
  detail_id.value = ''
}
const userData = ref({})
const rules = ref({
  first_name: [
    {
      required: true,
      message: 'Ism kiritilmadi',
      trigger: 'blur'
    }
  ],
  last_name: [
    {
      required: true,
      message: 'Familya kiritilmadi',
      trigger: 'blur'
    }
  ],
  middle_name: [
    {
      required: true,
      message: 'Otasining ismi kiritilmadi',
      trigger: 'blur'
    }
  ],
  phone_number: [
    {
      required: true,
      message: 'Telefon raqam kiritilmadi',
      trigger: 'blur',
      max: 13,
      min: 13
    }
  ],
  username: [
    {
      required: true,
      message: 'Username kiritilmadi',
      trigger: 'blur'
    }
  ],
  section: [
    {
      required: true,
      message: 'Bo`lim tanlanmadi',
      trigger: 'blur'
    }
  ],
  room: [
    {
      required: true,
      message: 'Xona tanlanmadi',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: 'Role tanlanmadi',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Parol kiritilmadi',
      trigger: 'blur'
    }
  ],
  password2: [
    {
      required: true,
      message: 'Ikinchi parol kiritilmadi',
      trigger: 'blur'
    }
  ]
})

const saveuser = async () => {
  if (!userForm.value) return
  await userForm.value.validate((valid, fields) => {
    if (valid) {
      if (detailDialog.value) {
        store.edit_user({
          id: detail_id.value,
          data: { ...userData.value }
          // type: 'multipart/form-data'
        })
      } else {
        store.create_user({
          data: { ...userData.value }
          // type: 'multipart/form-data'
        })
      }
      console.log(userData.value)
    } else {
      console.log(fields)
    }
  })
  handleClose()
}

watch(detailDialog, async () => {
  if (detailDialog.value && detail_id.value !== '') {
    let res = await store.get_user(detail_id.value)
    console.log(res)
    if (res.status == 200) {
      userData.value = { ...res.data }
      userData.value.section = res.data.section.id
      userData.value.room = userData.value.room.map((item) => {
        return item.id
      })
    }
  }
})
</script>
<style lang=""></style>
