<template>
  <div class="login">
    <div class="pass">
      <div>
        <h1>Web</h1>
      </div>
    </div>
    <div class="form">
      <el-form 
        label-position="top" 
        ref="form" 
        :model="user" 
        :rules="rules" 
        @submit.prevent
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input v-model="user.password" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="logUser"> Kirish </el-button>
          <el-button @click="resetForm"> Tozalash </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/auth/user'
const user_store = userStore()

const form = ref()
const user = ref({})

const rules = ref({
  username: {
    required: true,
    message: 'Username kiritilmadi',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: 'Parol kiritilmadi',
    trigger: 'blur'
  }
})

const resetForm = () => {
  if (!form.value) return
  form.value.resetFields()
}

const logUser = async () => {
  await form.value.validate((valid, fields) => {
    if (valid) {
      user_store.login({ ...user.value })
    } else {
      console.log(fields)
    }
  })
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/auth/login.scss';
</style>
