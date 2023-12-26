<template>
  <div class="container mx-auto my-1">
    <div class="row align-items-center mt-5" v-if="loading === true">
      <div class="spinner-grow col-3 mx-auto text-center" role="status">
        <span class="visually-hidden">Загрузка объектов</span>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row align-items-center">

        <div class="col-12 my-4">
        <span class="id py-3 d-flex align-items-center">
          <router-link to="/" class="me-2">Главная</router-link> //
          <div class="mx-2" >Поселки</div> //
         </span>
        </div>
        <div class="col-md-8">
          <h2>Все поселки списком</h2>
        </div>
        <div class="col-md-4 text-end">
          <router-link to="/">Поселки на карте</router-link>
        </div>

      </div>

      <div class="row my-5">

        <div class="col-lg-4 col-md-6 col-12" v-for="village in villages">
          <div class="p-3 card shadow">
            <div class="images-slider-wrapper">
              <div class="images-slider">
                <div class="village-image" v-for="(item) in village.photos.split(',')">
                  <img :src="item" alt="" class="w-100" data-fancybox="gallery" :data-index="village.photos.length">

                </div>

              </div>
              <div class="arrows-slide">
                <div class="next" @click="slide('left')">&#8250;</div>
                <div class="prev" @click="slide('right')">&#8249;</div>
              </div>
            </div>

            <div class="village-heading align-items-center d-flex justify-content-between">
              <div class="village-header">{{ village.name }}</div>
              <div class="village-price">от {{ village.price }} р.</div>
            </div>
            <div class="separator"></div>
            <div class="village-short-description">
              <ul >
                <li v-for="item in village.description.split('\n')">{{ item.toString() }}</li>
              </ul>
            </div>
            <router-link class="more" :to=" '/all-villages/village-instock-single/' + village.id ">
              Подробнее
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>


  <released-projects></released-projects>


</template>


<script>
import releasedProjects from "../ReleasedProjects.vue";
import axios from "axios";



export default {
  name: "VillageList.vue",
  components: {releasedProjects},
  data () {
    return {
      loading: true,
      villages: []
    }
  },
  created () {
    this.getAllVillagesInstock()
  },

  methods: {
    async getAllVillagesInstock () {
      const API_URL = "http://83.147.245.251:3000/villages_instock"

      try {
        const result = await axios(API_URL).then(res => res.data)
        this.loading = false;
        console.log(result)
        return this.villages = result;

      } catch (err) {

      }
    },
    slide(dest) {
      const slides = document.querySelector('.images-slider')
      const marginLeft = parseInt(slides.style.left.replace('%', '')) || 0;

      switch (dest) {
        case 'left':
          marginLeft === -300 ? slides.style.left = 0 : slides.style.left = marginLeft - 100 + '%'
            console.log(marginLeft)
          break;
        case 'right':
          marginLeft === 0 ? slides.style.left = -300 + '%' : slides.style.left = marginLeft + 100 + '%'
          console.log(marginLeft)
          break;
      }

    }

  }
}
</script>

<style lang="scss">
.card {
  .images-slider-wrapper {
    width: calc(100%);


    overflow: hidden;
    .images-slider {
      position: relative;
      width: 400%;
      display: flex;
      transition: .15s all ease!important;
    }


    .village-image {
      width: 100% ;
    }
    .arrows-slide {

      font-size: 100px;
      color: rgba(255,255,255,.5);
      transition: .15s ease;
      cursor: pointer;

      &:hover {
        color: #ffffff;
      }
      .prev {
        position: absolute;
        top: 30px;
        left: 20px;
        z-index: 2;
      }
      .next {
        position: absolute;
        top: 30px;
        right: 20px;
        z-index: 2;
      }
    }
  }

}
a.list-item {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  transition: all 0.2s ease;

}
a.list-item:hover {
  padding-left: 10px;
}
.card {
  .village-image {

  }
  .village-header {
    font-size: 22px;
    font-weight: 700;
  }
  .village-price {
    font-size: 18px;
    font-weight: 600;
  }
  .separator {
    width: 100%;
    height: 1px;
    background-color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      font-size: 12px;
    }
  }
  .more {
    margin-bottom: 10px;
    text-align: center;
    border: 2px solid #2055E5;
    border-radius: 10px;
    text-decoration: none;
    color: #2055E5;
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.15s ease;
    &:hover {
      color: #13379e;
      border-color: #13379e;
    }
  }
}
</style>