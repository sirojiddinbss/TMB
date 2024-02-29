<template>
    <main class="main">
      <div class="all__list">
        <h2 
          class="page__title"
          v-if="role=='chief'"
        >
          Markaz xodimlariga biriktirilgan tovarlar
        </h2>  
  
        <h2 
          class="page__title"
          v-if="role=='staff_admin'"
        >
          Bo'lim xodimlariga biriktirilgan tovarlar
        </h2>     
          
        <h2 
          class="page__title"
          v-if="role=='staff'"
        >
          Xodimga biriktirilgan tovarlar
        </h2>  
      </div>      
  
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
            size="small"
            filterable
            clearable
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
        <selfTable />
      </div>

      <selfDialog/>
  
      <div class="pagination_list">
        <el-pagination 
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="selfsCount"
          background
          @current-change="handleChange"
          v-if="selfsCount>pageSize"
          small
        />
        <p>Jami: <b>{{ selfsCount }}</b></p>
      </div>
    </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import selfTable from '@/components/self/self-table.vue'
import selfDialog from '@/components/self/self-dialog.vue'
import { selfStore } from '@/stores/self/self'
import { staffStore } from '@/stores/users/users'
import { categoryStore } from '@/stores/category/category'
import cookies from 'vue-cookies'

const role = cookies.get('user-role')
const store = selfStore()
const { selfsCount } = storeToRefs(store)

const category_store = categoryStore()
const { category } = storeToRefs(category_store)

const staff_store = staffStore()

const search = ref({})
const searching = ()=>{
    store.get_all({limit: pageSize.value, ...search.value}) // section.js ichidagi get_all funksiyaga search obektidagi malumotlarni jo'natyabmiz
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
    store.get_all({limit: pageSize.value})
    category_store.get_all({limit: 50})
    staff_store.get_all({limit: 50})
})
</script>
<style lang="scss">
.all__list{
display: flex;
justify-content: space-between;
margin-bottom: 10px;
}
.search__list{
display: flex;
gap: 50px;
}
.table__list{
margin: 10px 0 10px 0;
}

.search__item{
width: 250px;
}
.pagination_list{
display: flex;
justify-content: space-between;
}
</style>
    