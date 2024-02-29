import { defineStore } from "pinia";
import {ref} from 'vue'
import {apiStore} from '@/stores/utils/api'
import {loadingStore} from "@/stores/utils/loading"

export const outputInstrumentStore = defineStore('outputInstrumentStore', ()=>{
    const outputInstrument = ref([]) // bu *****
    const outputInstrumentCount = ref(0)

    const api = apiStore() // funksiyani ichidan yana bitta funksiya chaqirilgan (hamma funksiyani ichida ishlatilgan)
    const loading = loadingStore() // bu get_all uchun kerak


    const get_all = async params =>{ // bu yerda 
        loading.setLoad(true) // loading ishga tushirildi
        let res = await api.get ({
            url: 'instruments/output_instrument/',
            params
        })
        if(res.status ==200 ){
            outputInstrument.value = [...res.data.results] // bu yerda outputInstrument massiviga bekenddan kelgan malumotlar saqlandi
            outputInstrumentCount.value = res.data.count // bu yerda satffCont(0) ga teng edi. Biz unga bekenddagi countni tamiladik
            console.log(res.data.results);
        }
        loading.setLoad(false) // loading to'xtatildi

    }

    // aynan bitta xonani frontga chaqirish uchun funksiya
    const get_instrument = async id =>{
        console.log('start func');
        return await api.get({
            url: `instruments/user_instrument/${id}`
        })
    }

    return{
        outputInstrument,
        outputInstrumentCount,
        get_all,
        get_instrument,
    }
})