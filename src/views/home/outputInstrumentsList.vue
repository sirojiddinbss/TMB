<template>
  <main class="main">
    <div class="search__list">
      <div class="search__item">
        <el-input
          placeholder="tovar nomi yoki INV bo'yicha"
          v-model="search.search"
          @keypress.enter="searching"
          size="small"
        />
      </div>

      <div class="search__item">
        <el-select
          v-model="search.instrument__category"
          placeholder="kategoryasi bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"
        >
          <el-option v-for="item of category" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="search__item">
        <el-select
          v-model="search.form"
          placeholder="kirim chiqim"
          @change="searching"
          filterable
          clearable
          size="small"
        >
          <el-option v-for="item of forms" :key="item.id" :label="item.label" :value="item.form" />
        </el-select>
      </div>
    </div>

    <div class="table__list">
      <instrumentOutputTable />
    </div>

    <div class="pagination_list">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="outputInstrumentCount"
        background
        @current-change="handleChange"
        v-if="outputInstrumentCount > pageSize"
        small
      />
      <p>
        Jami: <b>{{ outputInstrumentCount }}</b>
      </p>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import instrumentOutputTable from '@/components/instrument-output/instrument-output-table.vue'
import { outputInstrumentStore } from '@/stores/outputInstrument/outputInstrument'
import { documentStore } from '@/stores/document/document'
import { categoryStore } from '@/stores/category/category'
import { forms } from '@/stores/utils/env'

const store = outputInstrumentStore()
const category_store = categoryStore()
const { category } = storeToRefs(category_store)
const document_store = documentStore()
const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value })
}

const pageSize = ref(10)
const page = ref(1)
const { outputInstrumentCount } = storeToRefs(store)

const handleChange = (val) => {
  if (val == page.value) {
    store.get_all({ limit: pageSize.value, offset: 0 })
  } else {
    store.get_all({ limit: pageSize.value, offset: (val - 1) * pageSize.value })
  }
}

onMounted(() => {
  store.get_all()
  category_store.get_all({ limit: 50 })
  document_store.get_all({ limit: 50, form: 'income' })
})
</script>

<style lang="scss"></style>
