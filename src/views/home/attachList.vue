<template>
  <main class="main">
    <h2 class="page__title">Tovar biriktirish sahifasi</h2>

    <attachDialog />
    <outputDialog/>

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
          v-model="search.category"
          placeholder="kategoryasi bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"
        >
          <el-option
            v-for="item of category"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
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
          :total="attachCount"
          background
          @current-change="handleChange"
          v-if="attachCount>pageSize"
          small
        />
        <p>Jami tovarlar: {{ attachCount }}</p>
      </div>
    
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import attachDialog from '@/components/attach/attach-dialog.vue'
import attachTable from '@/components/attach/attach-table.vue'
import outputDialog from '@/components/attach/output-dialog.vue'
import { attachStore } from '@/stores/attach/attach'
import { staffStore } from '@/stores/users/users'
import { documentStore } from '@/stores/document/document'
import { categoryStore } from '@/stores/category/category'

const store = attachStore()
const document_store = documentStore()
const category_store = categoryStore()
const staff_store = staffStore()
const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value })
}
const { category } = storeToRefs(category_store)
const { attachCount } = storeToRefs(store)

const pageSize = ref(10)
const page = ref(1)

const handleChange = val =>{
    if(val == page.value){
        store.get_all({limit: pageSize.value, offset: 0})
    } else{
        store.get_all({limit: pageSize.value, offset: (val-1) * pageSize.value})
    }
}

onMounted(() => {
  store.get_all()
  category_store.get_all({ limit: 50 })
  staff_store.get_all({ limit: 50 })
  document_store.get_all({ limit: 50, form: 'output' })
})
</script>

<style lang="scss"></style>
