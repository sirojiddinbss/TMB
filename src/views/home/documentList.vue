<template>
  <main class="main">
    <div class="all__list">
      <h2 class="page__title">Xujjatlar sahifasi</h2>
      <el-button @click="dialog_store.editDialogVisible(true)">
        <el-icon> <Plus /> </el-icon> xujjat kiritish
      </el-button>
    </div>


    <documentDialog />

    <div class="search__list">
      <div class="search__item">
        <el-input 
          placeholder="xujjat raqami yoki nomi"
          v-model="search.search"
          @keypress.enter="searching"
          size="small"
        />
      </div>

     <div class="search__item">
      <el-form-item >
        <el-date-picker
          type="date"
          placeholder="yil-oy-kun"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          v-model="search.signed_at"
          @change="searching"
          size="small"

        />
        </el-form-item>
     </div>

      <div class="search__item">
        <el-select
          v-model="search.form"
          placeholder="xujjat shakli bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"

        >
          <el-option
            v-for="item of forms"
            :key="item.id"
            :label="item.label"
            :value="item.form"
          />
      </el-select>
      </div>

    </div>

    <div class="table__list">
      <documentTable />
    </div>

    <div class="pagination_list">
        <el-pagination 
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="documentCount"
          background
          @current-change="handleChange"
          v-if="documentCount>pageSize"
          small
        />
        <p>Jami xujjatlar: <b>{{ documentCount }}</b></p>
      </div>
    
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import documentDialog from '@/components/document/document-dialog.vue'
import documentTable from '@/components/document/document-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { documentStore } from '@/stores/document/document'
import { forms } from '@/stores/utils/env'
import { storeToRefs } from 'pinia'
const store = documentStore()
const dialog_store = dialogStore()

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value }) // section.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
  //limit deyabmiz va :pageSize.value = 10 ga teng (92 qatordagi ref) va 86-qatordagi ref obektini yoyib yuboryabmiz
}

const { documentCount } = storeToRefs(store)

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
