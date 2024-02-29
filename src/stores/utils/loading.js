import { defineStore } from 'pinia'
import { ref } from 'vue'

export const loadingStore = defineStore('loadingStore',()=>{
    const load = ref(false)

    const setLoad = val =>{
        load.value = val
    }

    return{
        load,
        setLoad
    }
})