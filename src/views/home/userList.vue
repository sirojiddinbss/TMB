<template>
  <main class="main">
    <div class="all__list">
      <h2 class="page__title">Xodimlar sahifasi</h2>
      <el-button @click="dialog_store.editDialogVisible(true)">
        <el-icon> <OfficeBuilding /> </el-icon> xodim qo'shish
      </el-button>
    </div>

    <userDialog />

    <div class="search__list">
      <div class="search__item">
        <el-input 
          placeholder="F.I.Sh yoki telefon raqamini kiriting"
          v-model="search.search"
          @keypress.enter="searching"
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

      <div class="search__item">
        <el-select
          v-model="search.room"
          placeholder="Xona bo'yicha qidiruv"
          @change="searching"
          filterable
          clearable
          size="small"

        >
          <el-option
            v-for="item of rooms"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>

    <el-pagination
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="userCount"
      background
      @current-change="handleChange"
      v-if="userCount>pageSize"
      small
    />

    <div class="table__list">
      <userTable />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import userDialog from '@/components/users/user-dialog.vue'
import userTable from '@/components/users/user-table.vue'
import { dialogStore } from '@/stores/utils/dialog'
import { staffStore } from '@/stores/users/users'
import { roomStore } from '@/stores/room/room'
import { sectionStore } from '@/stores/section/section'
import { storeToRefs } from 'pinia'

const room_store = roomStore()
const store = staffStore()
const section_store = sectionStore()
const dialog_store = dialogStore()
const { sections } = storeToRefs(section_store)
const { rooms } = storeToRefs(room_store)
const { userCount } = storeToRefs(store)

const search = ref({})
const searching = () => {
  store.get_all({ limit: pageSize.value, ...search.value }) // section.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
  //limit deyabmiz va :pageSize.value = 10 ga teng (92 qatordagi ref) va 86-qatordagi ref obektini yoyib yuboryabmiz
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

onMounted(() => {
  store.get_all()
  section_store.get_all({ limit: 50 })
  room_store.get_all({ limit: 50 })
})
</script>

<style lang="scss"></style>
