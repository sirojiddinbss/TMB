<template>
    <div class="common-layout">
        <el-container>
        <el-aside width="200px"><AsidePart/></el-aside>
        <el-container>
            <el-main class="mainn">
                <router-view/>
            </el-main>
        </el-container>
        </el-container>
  </div>
</template>
<script setup>
import AsidePart from '@/components/default-aside-part.vue'
</script>
<style lang="scss" scoped>
.mainn{
    background-size: 45% ;
    background-image: url('@/assets/img/home_img.png');
    background-repeat: no-repeat;
    background-position: right;
    
}
</style>