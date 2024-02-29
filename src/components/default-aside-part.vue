<template>
    <div class="aside">
      <div>
        <h3>TMB TIZIMI</h3>
        <ul class="menu">
          <li 
            v-for="item of selfMenu"
            :key="item.title"
          >
            <router-link 
              :to="{name: item.name}"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
      <el-button
        size="small"
        @click="store.logout"
        class="btn__logout"
      >
          <el-icon><ArrowLeftBold /></el-icon>
          chiqish
      </el-button>
    </div>
</template>
<script setup>
import { userStore} from '@/stores/auth/user'
import { selfMenu } from "@/stores/utils/self-menu"
const store = userStore()


</script>
<style lang="scss" scoped>
@import '@/assets/styles/main/aside.scss';
</style>
  