<template>
  <div class="row align-items-center">
    <div class="col-md-8">
      <h2>{{ village.name }}<span class="id">Номер проекта: {{ village.id }}</span></h2>

    </div>
    <div class="col-md-4 text-end price">{{ village.description.price }}</div>
    <div class="row g-5">
      <div class="col-md-5 col-12">
        <img :src="village.description.photos.left" class="w-100">
      </div>
      <div class="col-md-5 col-12">
        <img :src="village.description.photos.middle" class="w-100">
      </div>

      <div class="col-md-2 col-12">
        <img :src="village.description.photos.right_one" class="w-100 mb-5">
        <img :src="village.description.photos.right_two" class="w-100 mt-1">
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 col-12">
        <h2>Преимущества</h2>
        <ul>
          <li class="item" v-for="item in village.description.features">
            {{ item }}
          </li>
        </ul>
        <h2>Как проехать</h2>
        <div class="item">
          <h4>На общественном транспорте</h4>
          <li v-for="item in village.description.howToRide.all">
            {{ item }}
          </li>
          <h4>На личном автотранспорте</h4>
          <li v-for="item in village.description.howToRide.Personal">
            {{ item }}
          </li>

        </div>
      </div>
      <div class="col-md-6 col-12">
        <h2>О поселке</h2>
        <li class="item" v-for="item in village.description.about">
          {{ item }}
        </li>
      </div>
    </div>

    <div class="row g-5">
      <div class="col-md-6 col-12">
        <h2>Категория обустройства посёлка</h2>
        <li class="item" v-for="item in village.description.category">
          {{ item }}
        </li>
      </div>
      <div class="col-md-6 col-12">
        <h2>Интерактивная планировка и цены</h2>
        <p>{{ village.description.interactive }}</p>
      </div>
    </div>


  </div>
</template>

<script>
import axios from "axios";



export default {
  data() {
    return {
      loading: true,
      village: {
        name: '',
        description: '',
        price: '',
        id: ''
      }

    }
  },
  name: "VillageReleasedSingle.vue",
  created() {
    this.loadAsyncData();
  },
  methods: {
    async loadAsyncData() {
      const urlParams = new URL(document.location)

      let currentItem = urlParams.pathname;

      const headers = {"X-Master-Key": "$2a$10$ojh2onZQ2OOm/TNDxD5aq.6XI4UUa8jL6aLIW7LTTlt19t6qWr.a2"}
      let response = await axios.get('https://api.jsonbin.io/v3/b/6535327812a5d376598f082d', { headers });
      let villages = response.data.record.villages;
      for(let item of villages) {

        if(item.link === currentItem) {
          this.village.name = item.name;
          this.village.id = item.id;
          this.village.description = item.description;
          console.log(item.description.howToRide)

        }

      }
    },
  }

}
</script>

<style scoped>
.id {
  font-size: 12px;
  line-height: 0;
  margin-left: 2rem;
  font-weight: 300;
}
.price {
  font-weight: 600;
  font-size: 24px;
}
</style>