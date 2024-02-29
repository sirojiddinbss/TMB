<template>
  <main class="main">
    
    <div class="all__list">
      <h2 class="page__title">Xonalar sahifasi</h2>
      <el-button @click="dialog_store.editDialogVisible(true)">
        <el-icon> <OfficeBuilding /> </el-icon> xona kiritish
      </el-button>
    </div>

    <roomDialog />

    <div class="search__list">
      <div class="search__1">
        <el-input 
        placeholder="Xona nomi yoki raqami"
        v-model="search.search"
        @keypress.enter="searching"
        clearable
        size="small"

      />
      </div>
      <div class="search__item">
        <el-select
          v-model="search.section"
          placeholder="Bo'lim bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"

        >
          <el-option
            v-for="item of sections"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>

    <div class="table__list">
      <roomTable />
    </div>
    
    <el-pagination 
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="roomCount"
        background
        @current-change="handleChange"
        v-if="roomCount>pageSize"
        small
      />

    <h3>Jami xonalar: <b>{{ roomCount }}</b></h3>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import roomDialog from '@/components/room/room-dialog.vue'
import roomTable from '@/components/room/room-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { roomStore } from '@/stores/room/room'
import { sectionStore } from '@/stores/section/section'
import { storeToRefs } from 'pinia'

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value }) // section.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
  //limit deyabmiz va :pageSize.value = 10 ga teng (92 qatordagi ref) va 86-qatordagi ref obektini yoyib yuboryabmiz
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

const section_store = sectionStore()
const { sections } = storeToRefs(section_store)
const store = roomStore()
const { roomCount } = storeToRefs(store)
const dialog_store = dialogStore()

onMounted(() => {
store.get_all()
section_store.get_all({ limit: pageSize })
})

</script>

<style lang="scss"></style>
  