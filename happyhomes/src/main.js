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
import ReleasedProjects from "./components/ReleasedProjects.vue";

const app = createApp(App);

const router = createRouter({
    routes: [{
        path: '/',
        component: HomePage
    }, {
        path: '/all-villages',
        component: allVillages,
        children: [{
            path: '/all-villages-map',
            component: villageMap
        },{
            path: '/all-villages-list',
            component: villageList
        },{
            path: '/village-single/:id',
            component: villageReleasedSingle
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
    }],
    history: createWebHistory()
})

app.use(router, axios, VueAxios)
app.mount('#app')
