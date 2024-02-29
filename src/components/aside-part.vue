<template>
  <div class="aside">
    <div>
      <h3>Tizim</h3>
      <ul>
        <li>
          <router-link to="/">Bosh sahifa</router-link>
        </li>
        <li>
          <router-link to="section-list">Bo'lim yaratish</router-link>
        </li>
        <li>
          <router-link to="room-list">Xona yaratish</router-link>
        </li>
        <li>
          <router-link to="user-list">Xodimlar</router-link>
        </li>
        <li>
          <router-link to="category-list">Kategoryalar</router-link>
        </li>
        <li>
          <router-link to="document-list">Xujjatlar</router-link>
        </li>
        <li>
          <router-link to="instruments-list">Tovarlar</router-link>
        </li>
        <li>
          <router-link to="attachs-list">TMB biriktirish</router-link>
        </li>
        <li>
          <router-link to="attached-product-list">Biriktirilgan</router-link>
        </li>
        <li>
          <router-link to="attached-output-list">His.chiqarilgan</router-link>
        </li>
      </ul>
    </div>
    
    <el-button class="btn__logout" @click="store.logout" size="small">
      <el-icon ><ArrowLeftBold /> </el-icon> Chiqish
    </el-button>
  </div>
</template>
<script setup>
import { userStore } from '@/stores/auth/user'
const store = userStore()
</script>
<style lang="scss">
@import '@/assets/styles/main/aside.scss';
</style>
