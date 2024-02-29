<template>
  <main class="main">
    <div class="all__list">
      <h2 class="page__title">Bo'limlar sahifasi</h2>
      <el-button @click="dialog_store.editDialogVisible(true)">
        <el-icon> <OfficeBuilding /> </el-icon> bo'lim kiritish
      </el-button>
    </div>

    <sectionDialog />

    <div class="search__list">
      <div class="search__item">
        <el-select
          v-model="search.section"
          placeholder="bo'lim nomi bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"
        >
          <el-option v-for="item of sections" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>

    <div class="table__list">
      <sectionTable />
    </div>

    <div class="pagination_list">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="sectionCount"
        background
        @current-change="handleChange"
        v-if="sectionCount > pageSize"
        small
      />
      <p>
        Jami: <b>{{ sectionCount }}</b>
      </p>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import sectionDialog from '@/components/section/section-dialog.vue'
import sectionTable from '@/components/section/section-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { sectionStore } from '@/stores/section/section'

const store = sectionStore()
const dialog_store = dialogStore()
const { sections } = storeToRefs(store)
const { sectionCount } = storeToRefs(store)
const pageSize = ref(10)

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value }) // section.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
}

onMounted(() => {
  store.get_all({ limit: pageSize.value })
})
</script>

<style lang="scss"></style>
