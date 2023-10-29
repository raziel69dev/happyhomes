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
          <router-link :to=" '/all-villages/village-single/' + village.id ">{{ village.name }} </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from "axios";


export default{
  name: 'villages',

  data() {
    return {
      loading: true,
      villages: [],
    }
  },

  created() {
    this.getVillages();
  },
  methods: {
    async getVillages() {
      const API_URL = "http://127.0.0.1:3000/villages_released"

      try {
        const result = await axios(API_URL).then(res => res.data)

        this.loading = false;
        return this.villages = result;

      } catch (err) {

      }

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