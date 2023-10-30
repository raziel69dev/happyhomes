<template>
  <div class="container mx-auto my-5">
    <div class="row align-items-center mt-5" v-if="loading === true">
      <div class="spinner-grow col-3 mx-auto text-center" role="status">
        <span class="visually-hidden">Загрузка объектов</span>
      </div>
    </div>
    <div class="row align-items-center" v-else>
      <div class="col-md-9" >
        <h2>{{ village.name }}
          <span class="id py-3 ms-3">
          <router-link to="/">Главная</router-link> //
            <router-link to="/all-villages-list">Поселки</router-link> //
          Поселок {{ village.name }} </span>
        </h2>

      </div>
      <div class="col-md-3 text-end price">

        от {{ village.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}р.
      </div>
      <div class="col-12 my-3">

      </div>
      <div class="container">
        <div class="row" >
          <div class="col-md-4" v-for="(item, index) in village.photos.split('\n')">
            <a :href="item" data-fancybox="gallery" :data-index="village.photos.length">
              <img :src="item" class="w-100 rounded">
            </a>


          </div>

        </div>
      </div>


      <div class="row">
        <div class="col-md-6 col-12">
          <h2>Преимущества</h2>
          <ul>
            <li class="item" v-for="item in village.description.split('\n')">
              {{ item }}
            </li>
          </ul>
          <h2>Как проехать</h2>
          <div class="item">
            <h4>На общественном транспорте</h4>
            <li v-for="item in village.howtoride_all.split('\n')">
              {{ item }}
            </li>
            <h4>На личном автотранспорте</h4>
            <li v-for="item in village.howtoride_personal.split('\n')">
              {{ item }}
            </li>

          </div>
        </div>
        <div class="col-md-6 col-12">
          <h2>О поселке</h2>
          <li class="item" v-for="item in village.about.split('\n')">
            {{ item }}
          </li>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-6 col-12">
          <h2>Категория обустройства посёлка</h2>
          <li class="item" v-for="item in village.category.split('\n')" style="list-style: none">
            {{ item }}
          </li>
        </div>
        <div class="col-md-6 col-12">
          <h2>Интерактивная планировка и цены</h2>
          <p>{{ village.interactive }}</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";


export default {
  name: "VillageInstockSingle.vue",


  data() {
    return {
      loading: true,
      village: {},
    }
  },

  created() {

    this.getVillage();
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  },
  methods: {
    async getVillage() {
      const need_id = window.location.pathname.replace('/all-villages/village-instock-single/', '');
      const API_URL = "http://127.0.0.1:3000/single_village_instock"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: need_id })
        }).then(res => res.json())
        this.village = result[0];
        this.loading = false;

      } catch (err) {
      }

    }
  }

}
</script>

<style lang="scss">
h2 {
  padding: 0;
}
.id {
  font-size: 14px;
  line-height: 0;
  font-weight: 300;
  a {
    padding: 5px 0px;
    color: rgba(0,0,0, .5);
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid rgba(0,0,0, .3);
    transition: all 0.2s ease;
    &:hover {
      color: #000000;
      border-bottom-color: #000000;
    }
  }
}
.price {
  font-weight: 700;
  font-size: 30px;
  margin-top: -5px;
}

</style>