<template>
  <div class="row align-items-center">
    <div class="col-md-12">
      <h2>Реализованные проекты </h2>
    </div>
    <div class="container" >
      <div class="row align-items-center" v-if="loading === true">
        <div class="spinner-grow col-3 mx-auto text-center" role="status">
          <span class="visually-hidden">Загрузка объектов</span>
        </div>
      </div>

        <ul class="row" v-else>
          <li v-for="village in villages" class="col-md-3 col-12">
            <router-link :to=" village.link ">{{ village.name }} </router-link>
          </li>
        </ul>
    </div>

  </div>
</template>

<script>
import axios from "axios";


export default {

  data() {
    return {
      loading: true,
      villages: [],
      asyncDataHolder: [],
      selectedVillage: {}

    }
  },
  created() {
    this.loadAsyncData();
  },
  methods: {
    async loadAsyncData() {
      const headers = {"X-Master-Key": "$2a$10$ojh2onZQ2OOm/TNDxD5aq.6XI4UUa8jL6aLIW7LTTlt19t6qWr.a2"}
      let response = await axios.get('https://api.jsonbin.io/v3/b/6535327812a5d376598f082d', { headers });

      this.villages = response.data.record.villages
      this.loading = false;

    }
  }
}


</script>

<style scoped>
a {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  transition: all 0.2s ease;

}
a:hover {
  padding-left: 10px;
}
</style>