<template>
  <div>
    <el-table :data="outputInstrument" border v-loading="load">
      <el-table-column label="#" type="index" width="50" />
      <el-table-column label="Tovar nomlanishi" prop="instrument.name" width="150" />
      <el-table-column label="Chiqim xujjati" prop="document.name" min-width="350" />
      <el-table-column
        label="INV raqami"
        prop="user_instrument.instrument.inventory_number"
        width="150"
      />
      <el-table-column label="Chiqim soni" prop="count" width="100" />
      <el-table-column label="Texnik xususiyatlari" prop="instrument.description" width="200" />
    </el-table>
  </div>
</template>
<script setup>
import { outputInstrumentStore } from '@/stores/outputInstrument/outputInstrument'
import { storeToRefs } from 'pinia'
import { loadingStore } from '@/stores/utils/loading'

const store = outputInstrumentStore()
const loading = loadingStore()

const { outputInstrument } = storeToRefs(store)
const { load } = storeToRefs(loading)
</script>
<style lang=""></style>
