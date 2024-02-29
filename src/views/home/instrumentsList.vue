<template>
  <main class="main">
    <div class="all__list">
      <h2 class="page__title">Tovarlar sahifasi</h2>
      <el-button @click="dialog_store.editDialogVisible(true)">
        <el-icon> <OfficeBuilding /> </el-icon> tovar kiritish
      </el-button>
    </div>

    <instrumentsDialog />

    <div class="search__list">
      <div class="search__item">
        <el-input 
          placeholder="nomi yoki xujjat raqamini kiriting"
          v-model="search.search"
          @keypress.enter="searching"
          size="small"
        />
      </div>

      <div class="search__item">
        <el-select
          v-model="search.measurement_type"
          placeholder="dona yoki komplekt bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"

        >
          <el-option
            v-for="item of measurement_types"
            :key="item.id"
            :label="item.label"
            :value="item.type"
          />
      </el-select>
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
      <instrumentsTable />
    </div>

    <div class="pagination_list">
        <el-pagination 
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="selfsCount"
          background
          @current-change="handleChange"
          v-if="instrumentCount>pageSize"
          small
        />
        <p>Jami tovarlar: <b>{{ instrumentCount }}</b></p>
      </div>
    
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import instrumentsDialog from '@/components/instruments/instruments-dialog.vue'
import instrumentsTable from '@/components/instruments/instruments-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { instrumentsStore } from '@/stores/instruments/instruments'
import { documentStore } from '@/stores/document/document'
import { measurement_types } from '@/stores/utils/env'
import { categoryStore } from '@/stores/category/category'

const store = instrumentsStore()
const dialog_store = dialogStore()
const category_store = categoryStore()
const document_store = documentStore()
const { category } = storeToRefs(category_store)
const { instrumentCount } = storeToRefs(store)

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value })
}

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
  document_store.get_all({ limit: 50, form: 'income' })
})
</script>

<style lang="scss"></style>
