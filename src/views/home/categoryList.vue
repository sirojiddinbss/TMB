<template>
    <main class="main">
      <div class="all__list">
        <h2 class="page__title">Kategoryalar sahifasi</h2>
        <el-button @click="dialog_store.editDialogVisible(true)">
          <el-icon> <OfficeBuilding /> </el-icon> kategorya kiritish
        </el-button>
      </div>
      
      <categoryDialog />

      <div class="search__list">
        <div class="search__item">
          <el-input 
            v-model="search.instruments" 
            @keypress.enter="searching" 
            size="small"
          />
        </div>
      </div>

      <div class="table__list">
        <categoryTable />
      </div>

      <div class="pagination_list">
        <el-pagination 
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="categoryCount"
          background
          @current-change="handleChange"
          v-if="categoryCount>pageSize"
          small
        />
        <p>Kategoryalar soni: <b>{{ categoryCount }}</b></p>
      </div>
      
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import categoryDialog from '@/components/category/category-dialog.vue'
import categoryTable from '@/components/category/category-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { categoryStore } from '@/stores/category/category'
import { storeToRefs } from 'pinia'
const store = categoryStore()
const dialog_store = dialogStore()
const { categoryCount } = storeToRefs(store)

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value }) // instruments.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
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
})

</script>

<style lang="scss"></style>
  