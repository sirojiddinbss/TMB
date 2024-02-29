export const selfMenu = [
    {
        path: '',
        name: 'self-home',
        component: ()=> import ('@/views/home/self-home-page.vue'),
        meta: {
          secure: true
        },
        title: "Bosh sahifa"
    },
    {
        path: 'self-product',
        name: 'self-product',
        component: ()=> import ('@/views/home/selfList.vue'),
        meta: {
            secure: true
        },
        title: "Biriktirilgan "
    },
    
]