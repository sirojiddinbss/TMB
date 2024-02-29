export const adminMenu = [
    {
        path: '',
        name: 'home',
        component: () => import('@/views/home/home-page.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'section-list',
        name: 'section-list',
        component: () => import('@/views/home/sectionList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'room-list',
        name: 'room-list',
        component: () => import('@/views/home/roomList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'user-list',
        name: 'user-list',
        component: () => import('@/views/home/userList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'category-list',
        name: 'category-list',
        component: () => import('@/views/home/categoryList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'document-list',
        name: 'document-list',
        component: () => import('@/views/home/documentList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'instruments-list',
        name: 'instruments-list',
        component: () => import('@/views/home/instrumentsList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'attachs-list',
        name: 'attachs-list',
        component: () => import('@/views/home/attachList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'attached-product-list',
        name: 'attached-product-list',
        component: () => import('@/views/home/attachedProductList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
      {
        path: 'attached-output-list',
        name: 'attached-output-list',
        component: () => import('@/views/home/outputInstrumentsList.vue'),
        meta: {
          secure: true
        },
        role: 'super_admin'
      },
]