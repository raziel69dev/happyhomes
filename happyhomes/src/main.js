import { createApp } from 'vue'
import './style.scss'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import axios from 'axios'
import VueAxios from 'vue-axios'
import HomePage from './components/HomePage.vue'
import AllHomes from './components/AllHomes.vue'
import Sales from './components/Sales.vue'
import Services from './components/Services.vue'
import Contacts from './components/Contacts.vue'
import villageMap from "./components/assets/VillageMap.vue";
import villageList from "./components/assets/VillageList.vue";
import allVillages from "./components/AllVillages.vue";
import villageReleasedSingle from "./components/assets/VillageReleasedSingle.vue";
import loginPage from "./components/admin/loginPage.vue";
import villageInstockSingle from "./components/assets/VillageInstockSingle.vue";
import addVillage from "./components/admin/addVillage.vue";
import changeContactInfo from "./components/admin/changeContactInfo.vue";
import deleteProject from "./components/admin/deleteProject.vue";
import breadcrumbs from "vue-3-breadcrumbs";



const app = createApp(App);

const router = createRouter({
    routes: [{
        path: '/',
        component: villageMap,
        meta: {
            breadcrumb: 'Home'
        }
    }, {
        path: '/all-villages',
        component: allVillages,
        children: [{
            path: '/all-villages/',
            component: villageMap
        },{
            path: '/all-villages-list',
            component: villageList
        },{
            path: '/all-villages/village-single/:id',
            component: villageReleasedSingle
        },{
            path: '/all-villages/village-instock-single/:id',
            component: villageInstockSingle
        }]
    }, {
        path: '/all-homes',
        component: AllHomes
    }, {
        path: '/services',
        component: Services
    }, {
        path: '/sales',
        component: Sales
    }, {
        path: '/contacts',
        component: Contacts
    }, {
        path: '/admin',
        component: loginPage
    }, {
        path: '/admin/add-village',
        component: addVillage
    }, {
        path: '/admin/change-contacts',
        component: changeContactInfo
    }, {
        path: '/admin/delete-village',
        component: deleteProject
    }],
    history: createWebHistory()
})

app.use(router, axios, VueAxios, breadcrumbs)
app.mount('#app')
console.log()