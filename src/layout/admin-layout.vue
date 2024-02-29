<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px"><AsidePart/></el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
    </div> 
</template>
<script setup>
import AsidePart from '@/components/aside-part.vue'
</script>
<style lang="scss"></style>