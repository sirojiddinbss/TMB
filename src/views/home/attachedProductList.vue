<template>
  <main class="main">
    <h2 class="page__title">Tovarlarni biriktirish sahifasi</h2>

    <attachDialog />

    <div class="search__list">
      <div class="search__item">
        <el-input
          placeholder="xodim familiyasi, INV raqami yoki tovar nomi"
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
          v-model="search.user__section"
          placeholder="bo'lim bo'yicha qidiruv"
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
      <attachTable />
    </div>

    <div class="pagination_list">
      <el-pagination
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="attachedProductCount"
        background
        @current-change="handleChange"
        v-if="attachedProductCount > pageSize"
        small
      />
      <p>
        Jami tovarlar: <b>{{ attachedProductCount }}</b>
      </p>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import attachDialog from '@/components/attached-product/attached-product-dialog.vue'
import attachTable from '@/components/attached-product/attached-product-table.vue'
import { attachedProductStore } from '@/stores/attached-product/attached-product'
import { documentStore } from '@/stores/document/document'
import { categoryStore } from '@/stores/category/category'
import { sectionStore } from '@/stores/section/section'

const store = attachedProductStore()

const document_store = documentStore()

const category_store = categoryStore()

const { category } = storeToRefs(category_store)
const { attachedProductCount } = storeToRefs(store)

const search = ref({})

const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value })
}

const pageSize = ref(10)
const page = ref(1)

const handleChange = (val) => {
  if (val == page.value) {
    store.get_all({ limit: pageSize.value, offset: 0 })
  } else {
    store.get_all({ limit: pageSize.value, offset: (val - 1) * pageSize.value })
  }
}
const section_store = sectionStore()
const { sections } = storeToRefs(section_store)

onMounted(() => {
  store.get_all()
  category_store.get_all({ limit: 50 })
  document_store.get_all({ limit: 50, form: 'output' })
})
</script>

<style lang="scss"></style>
